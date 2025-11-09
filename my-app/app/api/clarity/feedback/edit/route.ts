import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const hasFirebaseConfig = !!(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
      (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL)
    )

    if (!hasFirebaseConfig) {
      console.error("Firebase environment variables are not configured")
      return NextResponse.json(
        {
          error:
            "Firebase is not configured. Please set Firebase environment variables in your Vercel project settings.",
          success: false,
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { originalResponse, editedResponse, intent, draft, sessionId, timestamp } = body

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

    try {
      const db = getDb()
      const docRef = await db.collection("feedback_edits").add(editData)

      return NextResponse.json({
        success: true,
        message: "Edit saved successfully",
        docId: docRef.id,
      })
    } catch (firestoreError) {
      console.error("Firestore operation failed:", firestoreError)
      throw firestoreError
    }
  } catch (error) {
    console.error("Edit feedback API error:", error)
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
