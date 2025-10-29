import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  console.log("[v0] === EDIT FEEDBACK API CALLED ===")

  try {
    const hasFirebaseConfig = !!(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
      (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL)
    )

    if (!hasFirebaseConfig) {
      console.error("[v0] Firebase environment variables are not configured")
      return NextResponse.json(
        {
          error:
            "Firebase is not configured. Please set Firebase environment variables in your Vercel project settings.",
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Firebase config check passed")
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

      return NextResponse.json({
        success: true,
        message: "Edit saved successfully",
        docId: docRef.id,
      })
    } catch (firestoreError) {
      console.error("[v0] Firestore operation failed:", firestoreError)
      console.error(
        "[v0] Firestore error message:",
        firestoreError instanceof Error ? firestoreError.message : "Unknown",
      )
      console.error("[v0] Firestore error stack:", firestoreError instanceof Error ? firestoreError.stack : "No stack")
      throw firestoreError
    }
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
