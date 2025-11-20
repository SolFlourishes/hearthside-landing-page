import { vertex } from "@ai-sdk/google-vertex"
import { GoogleAuth } from "google-auth-library"

let cachedAuth: GoogleAuth | null = null

export function getVertexAIModel(modelName: string) {
  const project = process.env.GOOGLE_VERTEX_PROJECT || process.env.GOOGLE_CLOUD_PROJECT
  const location = process.env.GOOGLE_VERTEX_LOCATION || process.env.GOOGLE_CLOUD_LOCATION || "us-central1"

  if (!project) {
    throw new Error("Google Cloud project ID is not configured")
  }

  // Parse the service account key from environment
  let credentials
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    if (serviceAccountKey) {
      credentials = JSON.parse(serviceAccountKey)
    }
  } catch (error) {
    console.error("[v0] Failed to parse service account key:", error)
  }

  // Create GoogleAuth instance with credentials
  if (!cachedAuth && credentials) {
    cachedAuth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    })
  }

  return vertex(modelName, {
    project,
    location,
    // Pass the auth instance
    googleAuthOptions: cachedAuth
      ? {
          authClient: cachedAuth,
        }
      : undefined,
  })
}
