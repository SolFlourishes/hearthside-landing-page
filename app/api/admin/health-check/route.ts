export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      firebaseKeyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
      firebaseKeyStartsWith: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.substring(0, 20) || "missing",
      googleCloudProject: process.env.GOOGLE_CLOUD_PROJECT || "missing",
      googleCloudLocation: process.env.GOOGLE_CLOUD_LOCATION || "missing",
    },
    tests: {} as Record<string, any>,
  }

  // Test 1: Parse Firebase Service Account Key
  try {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    if (!key) {
      diagnostics.tests.firebaseKeyParsing = { success: false, error: "FIREBASE_SERVICE_ACCOUNT_KEY not set" }
    } else {
      const parsed = JSON.parse(key)
      diagnostics.tests.firebaseKeyParsing = {
        success: true,
        projectId: parsed.project_id,
        clientEmail: parsed.client_email?.substring(0, 30) + "...",
      }
    }
  } catch (error: any) {
    diagnostics.tests.firebaseKeyParsing = { success: false, error: error.message }
  }

  // Test 2: Initialize Firebase Admin
  try {
    const { getDb } = await import("@/lib/firebase-admin")
    const db = getDb()
    diagnostics.tests.firebaseInit = { success: true, dbExists: !!db }
  } catch (error: any) {
    diagnostics.tests.firebaseInit = { success: false, error: error.message }
  }

  // Test 3: Vertex AI Configuration
  try {
    const hasProject = !!process.env.GOOGLE_CLOUD_PROJECT
    const hasLocation = !!process.env.GOOGLE_CLOUD_LOCATION
    diagnostics.tests.vertexAIConfig = {
      success: hasProject && hasLocation,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    }
  } catch (error: any) {
    diagnostics.tests.vertexAIConfig = { success: false, error: error.message }
  }

  return Response.json(diagnostics, { status: 200 })
}
