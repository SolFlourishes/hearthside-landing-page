import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { storyId } = await request.json()

    if (!storyId) {
      return NextResponse.json({ success: false, error: "Story ID is required" }, { status: 400 })
    }

    const storyRef = adminDb.collection("stories").doc(storyId)
    const storyDoc = await storyRef.get()

    if (!storyDoc.exists) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 })
    }

    await storyRef.delete()

    return NextResponse.json({
      success: true,
      message: "Story deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting story:", error)
    return NextResponse.json({ success: false, error: "Failed to delete story" }, { status: 500 })
  }
}
