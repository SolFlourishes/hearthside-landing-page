import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const type = searchParams.get("type") // "ai-generated" | "player-submitted" | null (all)

    const db = getDb()

    // Build query based on whether type filter is present
    let query = db.collection("stories")

    if (type) {
      // When filtering by type, we need both status and type filters
      query = query
        .where("status", "==", "published")
        .where("type", "==", type)
        .orderBy("publishedAt", "desc")
        .limit(limit)
    } else {
      // When not filtering by type, just use status
      query = query.where("status", "==", "published").orderBy("publishedAt", "desc").limit(limit)
    }

    const snapshot = await query.get()

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      stories,
      count: stories.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching stories:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stories",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
