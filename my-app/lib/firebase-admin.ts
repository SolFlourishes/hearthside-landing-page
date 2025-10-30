import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let firestoreInstance: Firestore | null = null

function initializeFirebaseAdmin(): Firestore {
  // Return existing instance if already initialized
  if (firestoreInstance) {
    return firestoreInstance
  }

  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    console.log("[v0] Firebase initialization - checking environment variables:")
    console.log("[v0] FIREBASE_SERVICE_ACCOUNT_KEY:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? "SET" : "NOT SET")
    console.log("[v0] FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID ? "SET" : "NOT SET")
    console.log(
      "[v0] FIREBASE_PRIVATE_KEY:",
      process.env.FIREBASE_PRIVATE_KEY ? "SET (length: " + process.env.FIREBASE_PRIVATE_KEY.length + ")" : "NOT SET",
    )
    console.log("[v0] FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL ? "SET" : "NOT SET")

    // Parse the service account from environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : {
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }

    const missingFields: string[] = []
    if (!serviceAccount.projectId) missingFields.push("FIREBASE_PROJECT_ID")
    if (!serviceAccount.privateKey) missingFields.push("FIREBASE_PRIVATE_KEY")
    if (!serviceAccount.clientEmail) missingFields.push("FIREBASE_CLIENT_EMAIL")

    if (missingFields.length > 0) {
      const errorMsg = `Firebase configuration is incomplete. Missing: ${missingFields.join(", ")}. Please set these environment variables in your Vercel project settings.`
      console.error("[v0] Firebase initialization error:", errorMsg)
      throw new Error(errorMsg)
    }

    console.log("[v0] Firebase initializing with project:", serviceAccount.projectId)
    initializeApp({
      credential: cert(serviceAccount),
    })
    console.log("[v0] Firebase initialized successfully")
  }

  firestoreInstance = getFirestore()
  return firestoreInstance
}

export function getDb(): Firestore {
  return initializeFirebaseAdmin()
}
