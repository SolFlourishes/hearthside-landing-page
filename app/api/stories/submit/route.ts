import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, submittedBy, metadata } = body

    // Validate required fields
    if (!title || !content || !submittedBy?.name || !submittedBy?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, content, submittedBy (name, email)",
        },
        { status: 400 },
      )
    }

    // Create excerpt from content (first 200 chars)
    const excerpt = content.substring(0, 200).trim() + (content.length > 200 ? "..." : "")

    const db = getDb()
    const storyData = {
      title,
      content,
      excerpt,
      type: "player-submitted",
      status: "pending-review",
      submittedBy,
      metadata: metadata || {},
      createdAt: new Date(),
      views: 0,
      likes: 0,
    }

    const docRef = await db.collection("stories").add(storyData)

    return NextResponse.json({
      success: true,
      message: "Story submitted successfully! It will be reviewed before publication.",
      storyId: docRef.id,
    })
  } catch (error) {
    console.error("[v0] Error submitting story:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit story",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
