import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // For now, this is unprotected - you should add auth before deploying

    const db = getDb()
    const snapshot = await db
      .collection("stories")
      .where("status", "==", "pending-review")
      .orderBy("createdAt", "desc")
      .get()

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
    console.error("[v0] Error fetching pending stories:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch pending stories",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
