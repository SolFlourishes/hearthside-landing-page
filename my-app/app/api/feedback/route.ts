import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"

export async function POST(request: Request) {
  try {
    const { rating, feedback, page, userAgent } = await request.json()

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

    const docRef = await db.collection("site_feedback").add(feedbackData)

    return NextResponse.json({
      success: true,
      feedbackId: docRef.id,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    console.error("Error saving feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to save feedback" }, { status: 500 })
  }
}
