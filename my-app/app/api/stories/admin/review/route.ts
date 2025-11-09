import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"
import { checkAdminAuth } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { storyId, action, reviewNotes, reviewedBy } = body

    if (!storyId || !action || !reviewedBy) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: storyId, action, reviewedBy",
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
    const updateData: any = {
      status: action === "approve" ? "published" : "rejected",
      reviewedBy,
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
