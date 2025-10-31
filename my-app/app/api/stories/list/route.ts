import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const type = searchParams.get("type") // "ai-generated" | "player-submitted" | null (all)

    const db = getDb()

    try {
      let query = db.collection("stories")

      if (type) {
        query = query
          .where("status", "==", "published")
          .where("type", "==", type)
          .orderBy("publishedAt", "desc")
          .limit(limit)
      } else {
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
    } catch (indexError) {
      console.log("[v0] Index not found, using fallback query")

      let query = db.collection("stories").where("status", "==", "published")

      if (type) {
        query = query.where("type", "==", type)
      }

      const snapshot = await query.get()

      let stories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort in memory by publishedAt
      stories.sort((a: any, b: any) => {
        const aTime = a.publishedAt?.seconds || 0
        const bTime = b.publishedAt?.seconds || 0
        return bTime - aTime
      })

      // Apply limit
      stories = stories.slice(0, limit)

      return NextResponse.json({
        success: true,
        stories,
        count: stories.length,
        usingFallback: true,
      })
    }
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
