import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id || typeof id !== "string" || id.trim() === "") {
      console.error("[v0] Invalid story ID:", id)
      return NextResponse.json({ success: false, error: "Invalid story ID" }, { status: 400 })
    }

    console.log("[v0] Fetching story with ID:", id)

    const db = getDb()
    const storyDoc = await db.collection("stories").doc(id).get()

    if (!storyDoc.exists) {
      console.log("[v0] Story not found:", id)
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 })
    }

    const story = {
      id: storyDoc.id,
      ...storyDoc.data(),
    }

    // Increment view count
    await db
      .collection("stories")
      .doc(id)
      .update({
        views: (story.views || 0) + 1,
      })

    console.log("[v0] Story fetched successfully:", id)
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
