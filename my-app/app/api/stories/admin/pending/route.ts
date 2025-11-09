import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"
import { checkAdminAuth } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  try {
    const authResult = checkAdminAuth(request)

    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          details: authResult.error,
        },
        { status: 401 },
      )
    }

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
    console.error("Error fetching pending stories:", error)
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
