import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { editedResponse, newExplanation, newTranslation, sessionId, timestamp } = body

    // Validate input
    if (!editedResponse || !newExplanation || !newTranslation) {
      return NextResponse.json({ error: "Missing required fields", success: false }, { status: 400 })
    }

    const reanalysisData = {
      editedResponse,
      newExplanation,
      newTranslation,
      sessionId: sessionId || "anonymous",
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date(),
    }

    await getDb().collection("feedback_reanalysis").add(reanalysisData)

    return NextResponse.json({
      success: true,
      message: "Reanalysis saved successfully",
    })
  } catch (error) {
    console.error("[v0] Reanalysis API error:", error)
    return NextResponse.json({ error: "Failed to save reanalysis", success: false }, { status: 500 })
  }
}
