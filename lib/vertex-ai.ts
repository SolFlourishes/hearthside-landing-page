import { createVertex } from "@ai-sdk/google-vertex"

export function getVertexAICredentials() {
  // Parse the Firebase service account key
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

  if (!serviceAccountKey) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is required")
  }

  try {
    const credentials = JSON.parse(serviceAccountKey)

    return {
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    }
  } catch (error) {
    console.error("[v0] Failed to parse service account key:", error)
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format")
  }
}

export function getVertexAIConfig() {
  const creds = getVertexAICredentials()

  return {
    project: creds.projectId,
    location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
    // Pass credentials for authentication
    googleAuthOptions: {
      credentials: {
        client_email: creds.clientEmail,
        private_key: creds.privateKey,
      },
      projectId: creds.projectId,
    },
  }
}

export function getVertexAIProvider() {
  const config = getVertexAIConfig()

  return createVertex({
    project: config.project,
    location: config.location,
    googleAuthOptions: config.googleAuthOptions,
  })
}
