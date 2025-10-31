import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get("status") // 'all', 'published', 'draft', 'pending'
    const typeFilter = searchParams.get("type") // 'all', 'ai-generated', 'player-submitted'

    let query = adminDb.collection("stories").orderBy("createdAt", "desc")

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      query = query.where("status", "==", statusFilter) as any
    }

    // Apply type filter
    if (typeFilter && typeFilter !== "all") {
      query = query.where("type", "==", typeFilter) as any
    }

    const snapshot = await query.get()

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      stories,
    })
  } catch (error) {
    console.error("Error fetching all stories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 })
  }
}
