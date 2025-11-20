import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, rating, comment, sessionId, timestamp } = body

    // Validate input
    if (!type || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating data", success: false }, { status: 400 })
    }

    const feedbackData = {
      type,
      rating,
      comment: comment || "",
      sessionId: sessionId || "anonymous",
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date(),
    }

    await getDb().collection("feedback_ratings").add(feedbackData)

    return NextResponse.json({
      success: true,
      message: "Feedback received successfully",
    })
  } catch (error) {
    console.error("Rating API error:", error)
    return NextResponse.json({ error: "Failed to submit rating", success: false }, { status: 500 })
  }
}
