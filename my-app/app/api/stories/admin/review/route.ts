import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"
import { checkModeratorAuth } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const authResult = await checkModeratorAuth()

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

    const body = await request.json()
    const { storyId, action, reviewNotes } = body

    if (!storyId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: storyId, action",
        },
        { status: 400 },
      )
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid action. Must be 'approve' or 'reject'",
        },
        { status: 400 },
      )
    }

    const db = getDb()
    const updateData: Record<string, unknown> = {
      status: action === "approve" ? "published" : "rejected",
      reviewedBy: authResult.user?.email || "unknown",
      reviewNotes: reviewNotes || "",
    }

    if (action === "approve") {
      updateData.publishedAt = new Date()
    }

    await db.collection("stories").doc(storyId).update(updateData)

    return NextResponse.json({
      success: true,
      message: `Story ${action === "approve" ? "approved and published" : "rejected"}`,
    })
  } catch (error) {
    console.error("Error reviewing story:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to review story",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
