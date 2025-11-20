import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "NOT SET",
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || "NOT SET",
    GOOGLE_CLOUD_LOCATION: process.env.GOOGLE_CLOUD_LOCATION || "NOT SET",
    FIRESTORE_DATABASE_ID: process.env.FIRESTORE_DATABASE_ID || "NOT SET",
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID || "NOT SET",
    GCP_SERVICE_ACCOUNT_EMAIL: process.env.GCP_SERVICE_ACCOUNT_EMAIL || "NOT SET",
    GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY ? "***HIDDEN (copy from Vercel)***" : "NOT SET",
    GOOGLE_VERTEX_PROJECT: process.env.GOOGLE_VERTEX_PROJECT || "NOT SET",
    GOOGLE_VERTEX_LOCATION: process.env.GOOGLE_VERTEX_LOCATION || "NOT SET",
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "***HIDDEN***" : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "***HIDDEN***" : "NOT SET",
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? "***HIDDEN***" : "NOT SET",
    KV_REST_API_URL: process.env.KV_REST_API_URL || "NOT SET",
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? "***HIDDEN***" : "NOT SET",
  }

  return NextResponse.json(envVars, { status: 200 })
}
