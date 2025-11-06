import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_KV_REST_API_URL!,
  token: process.env.UPSTASH_KV_KV_REST_API_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, reason, category, userMessage, aiResponse } = body

    // Generate report ID
    const reportId = `report:${Date.now()}:${Math.random().toString(36).substring(7)}`

    // Store report in Redis
    const report = {
      id: reportId,
      timestamp: new Date().toISOString(),
      content,
      reason,
      category,
      userMessage,
      aiResponse,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    await redis.set(reportId, JSON.stringify(report), { ex: 2592000 }) // 30 days expiry

    // Add to reports list
    await redis.zadd("reports:all", { score: Date.now(), member: reportId })

    console.log("[v0] User report submitted:", reportId)

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error("[v0] Error submitting report:", error)
    return NextResponse.json({ success: false, error: "Failed to submit report" }, { status: 500 })
  }
}
