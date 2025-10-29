import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { originalResponse, editedResponse, intent, draft, sessionId, timestamp } = body

    // Validate input
    if (!originalResponse || !editedResponse) {
      return NextResponse.json({ error: "Missing required fields", success: false }, { status: 400 })
    }

    const editData = {
      originalResponse,
      editedResponse,
      intent: intent || "",
      draft: draft || "",
      sessionId: sessionId || "anonymous",
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date(),
    }

    await getDb().collection("feedback_edits").add(editData)

    return NextResponse.json({
      success: true,
      message: "Edit saved successfully",
    })
  } catch (error) {
    console.error("[v0] Edit feedback API error:", error)
    return NextResponse.json({ error: "Failed to save edit", success: false }, { status: 500 })
  }
}
