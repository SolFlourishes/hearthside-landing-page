import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"

export async function POST(request: Request) {
  try {
    console.log("[v0] Feedback API called")
    const { rating, feedback, page, userAgent } = await request.json()
    console.log("[v0] Feedback data:", { rating, page })

    // Validate required fields
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Invalid rating" }, { status: 400 })
    }

    // Save feedback to Firestore
    const feedbackData = {
      rating,
      feedback: feedback || "",
      page: page || "unknown",
      userAgent: userAgent || "unknown",
      timestamp: new Date(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    }

    console.log("[v0] Attempting to save to Firestore...")
    const docRef = await db.collection("site_feedback").add(feedbackData)
    console.log("[v0] Feedback saved successfully:", docRef.id)

    return NextResponse.json({
      success: true,
      feedbackId: docRef.id,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    console.error("[v0] Error saving feedback:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ success: false, error: "Failed to save feedback" }, { status: 500 })
  }
}
