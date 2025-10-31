import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb()
    const storyDoc = await db.collection("stories").doc(params.id).get()

    if (!storyDoc.exists) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 })
    }

    const story = {
      id: storyDoc.id,
      ...storyDoc.data(),
    }

    // Increment view count
    await db
      .collection("stories")
      .doc(params.id)
      .update({
        views: (story.views || 0) + 1,
      })

    return NextResponse.json({
      success: true,
      story,
    })
  } catch (error) {
    console.error("[v0] Error fetching story:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch story",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
