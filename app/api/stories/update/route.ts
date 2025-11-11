import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { storyId, updates } = await request.json()

    if (!storyId) {
      return NextResponse.json({ success: false, error: "Story ID is required" }, { status: 400 })
    }

    const storyRef = adminDb.collection("stories").doc(storyId)
    const storyDoc = await storyRef.get()

    if (!storyDoc.exists) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {
      ...updates,
      updatedAt: new Date(),
    }

    // If status is being changed to published, set publishedAt
    if (updates.status === "published" && storyDoc.data()?.status !== "published") {
      updateData.publishedAt = new Date()
    }

    await storyRef.update(updateData)

    return NextResponse.json({
      success: true,
      message: "Story updated successfully",
    })
  } catch (error) {
    console.error("Error updating story:", error)
    return NextResponse.json({ success: false, error: "Failed to update story" }, { status: 500 })
  }
}
