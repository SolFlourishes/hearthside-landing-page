import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let firestoreInstance: Firestore | null = null

function initializeFirebaseAdmin(): Firestore {
  // Return existing instance if already initialized
  if (firestoreInstance) {
    console.log("[v0] Using existing Firestore instance")
    return firestoreInstance
  }

  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    console.log("[v0] Initializing Firebase Admin SDK...")
    let serviceAccount: any

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Option 1: Use the entire service account JSON (RECOMMENDED)
      console.log("[v0] Using FIREBASE_SERVICE_ACCOUNT_KEY")
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        console.log("[v0] Connected to project:", serviceAccount.project_id)
      } catch (error) {
        console.error("[v0] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error)
        throw new Error(
          "Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it contains valid JSON from your Firebase service account file.",
        )
      }
    } else if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    ) {
      // Option 2: Use individual environment variables
      console.log("[v0] Using individual Firebase environment variables")
      serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      }
      console.log("[v0] Configured for project:", serviceAccount.project_id)
    } else {
      console.error("[v0] No Firebase credentials found in environment variables")
      throw new Error(
        "Firebase is not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY (recommended) or all of FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in your Vercel environment variables.",
      )
    }

    console.log("[v0] Initializing Firebase with credentials...")
    initializeApp({
      credential: cert(serviceAccount),
    })
    console.log("[v0] Firebase initialized successfully")
  } else {
    console.log("[v0] Firebase already initialized")
  }

  firestoreInstance = getFirestore()
  console.log("[v0] Firestore instance created")
  return firestoreInstance
}

export function getDb(): Firestore {
  return initializeFirebaseAdmin()
}

export const db = getDb()
export const adminDb = getDb()
