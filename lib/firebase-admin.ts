import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let firestoreInstance: Firestore | null = null

function initializeFirebaseAdmin(): Firestore {
  // Return existing instance if already initialized
  if (firestoreInstance) {
    return firestoreInstance
  }

  // Check if Firebase is already initialized
  let serviceAccount: any

  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Option 1: Use the entire service account JSON (RECOMMENDED)
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      } catch (error) {
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
      serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      }
    } else {
      throw new Error(
        "Firebase is not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY (recommended) or all of FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in your Vercel environment variables.",
      )
    }

    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    })
  }

  const databaseId = process.env.FIRESTORE_DATABASE_ID || "(default)"
  console.log("[v0] Connecting to Firestore database:", databaseId)

  if (databaseId !== "(default)") {
    // For non-default databases, we need to construct the path explicitly
    firestoreInstance = getFirestore(undefined, databaseId)
  } else {
    firestoreInstance = getFirestore()
  }

  firestoreInstance.settings({
    ignoreUndefinedProperties: true,
  })

  console.log("[v0] Firestore instance created and configured")
  return firestoreInstance
}

export function getDb(): Firestore {
  return initializeFirebaseAdmin()
}

export const db = getDb()
export const adminDb = getDb()
