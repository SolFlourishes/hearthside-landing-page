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
    // Parse the service account from environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : {
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }

    // Validate required fields
    if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
      throw new Error(
        "Firebase configuration is incomplete. Please set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL environment variables.",
      )
    }

    initializeApp({
      credential: cert(serviceAccount),
    })
  }

  firestoreInstance = getFirestore()
  return firestoreInstance
}

export function getDb(): Firestore {
  return initializeFirebaseAdmin()
}
