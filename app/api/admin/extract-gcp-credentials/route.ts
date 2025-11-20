import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

    if (!serviceAccountKey) {
      return NextResponse.json(
        {
          error: "FIREBASE_SERVICE_ACCOUNT_KEY not found",
        },
        { status: 500 },
      )
    }

    const credentials = JSON.parse(serviceAccountKey)

    return NextResponse.json(
      {
        instructions: "Copy these values into Vercel environment variables:",
        environmentVariables: {
          GCP_PROJECT_ID: credentials.project_id,
          GCP_SERVICE_ACCOUNT_EMAIL: credentials.client_email,
          GCP_PRIVATE_KEY: credentials.private_key,
        },
        note: "After adding these to Vercel, redeploy and the Vertex AI authentication will work",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Failed to extract credentials:", error)
    return NextResponse.json(
      {
        error: "Failed to parse service account key",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
