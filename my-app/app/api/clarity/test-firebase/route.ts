import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  console.log("[v0] === FIREBASE TEST ENDPOINT CALLED ===")

  try {
    // Check environment variables
    const hasServiceAccountKey = !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    const hasIndividualKeys = !!(
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    )

    console.log("[v0] Environment check:", {
      hasServiceAccountKey,
      hasIndividualKeys,
      projectId: process.env.FIREBASE_PROJECT_ID ? "SET" : "NOT SET",
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? "SET" : "NOT SET",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? "SET" : "NOT SET",
    })

    if (!hasServiceAccountKey && !hasIndividualKeys) {
      return NextResponse.json({
        success: false,
        error: "Firebase environment variables are not configured",
        details: {
          hasServiceAccountKey,
          hasIndividualKeys,
        },
      })
    }

    // Try to initialize Firestore
    console.log("[v0] Attempting to get Firestore instance...")
    const db = getDb()
    console.log("[v0] Firestore instance obtained successfully")

    // Try to perform a simple read operation
    console.log("[v0] Attempting to list collections...")
    const collections = await db.listCollections()
    console.log(
      "[v0] Collections found:",
      collections.map((c) => c.id),
    )

    // Try to write a test document
    console.log("[v0] Attempting to write test document...")
    const testRef = await db.collection("_test").add({
      test: true,
      timestamp: new Date(),
    })
    console.log("[v0] Test document created with ID:", testRef.id)

    // Try to read it back
    console.log("[v0] Attempting to read test document...")
    const testDoc = await testRef.get()
    console.log("[v0] Test document read successfully:", testDoc.exists)

    // Clean up
    console.log("[v0] Cleaning up test document...")
    await testRef.delete()
    console.log("[v0] Test document deleted")

    return NextResponse.json({
      success: true,
      message: "Firebase connection is working correctly",
      details: {
        hasServiceAccountKey,
        hasIndividualKeys,
        collectionsCount: collections.length,
        testDocumentCreated: true,
        testDocumentRead: testDoc.exists,
      },
    })
  } catch (error) {
    console.error("[v0] Firebase test error:", error)
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    })

    return NextResponse.json(
      {
        success: false,
        error: "Firebase connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
