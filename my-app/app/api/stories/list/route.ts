import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const type = searchParams.get("type") // "ai-generated" | "player-submitted" | null (all)

    const db = getDb()
    let query = db.collection("stories").where("status", "==", "published").orderBy("publishedAt", "desc").limit(limit)

    if (type) {
      query = query.where("type", "==", type)
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
