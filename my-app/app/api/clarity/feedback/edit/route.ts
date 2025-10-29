import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Edit feedback request received")

    const body = await request.json()
    console.log("[v0] Edit feedback body:", JSON.stringify(body, null, 2))

    const { originalResponse, editedResponse, intent, draft, sessionId, timestamp } = body

    // Validate input
    if (!originalResponse || !editedResponse) {
      console.log("[v0] Edit feedback validation failed: missing required fields")
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

    console.log("[v0] Attempting to save edit to Firestore...")

    try {
      const db = getDb()
      console.log("[v0] Firestore instance obtained")

      const docRef = await db.collection("feedback_edits").add(editData)
      console.log("[v0] Edit saved successfully with ID:", docRef.id)
    } catch (firestoreError) {
      console.error("[v0] Firestore operation failed:", firestoreError)
      throw firestoreError
    }

    return NextResponse.json({
      success: true,
      message: "Edit saved successfully",
    })
  } catch (error) {
    console.error("[v0] Edit feedback API error:", error)
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    })

    return NextResponse.json(
      {
        error: "Failed to save edit",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
