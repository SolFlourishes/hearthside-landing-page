import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import * as fs from "fs"
import * as path from "path"

async function main() {
  console.log("============================================================")
  console.log("EXPERT DOCUMENTS UPLOADER")
  console.log("============================================================\n")

  // Check environment variables
  const hasServiceAccountKey = !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  const hasIndividualKeys =
    !!process.env.FIREBASE_PROJECT_ID && !!process.env.FIREBASE_PRIVATE_KEY && !!process.env.FIREBASE_CLIENT_EMAIL

  if (!hasServiceAccountKey && !hasIndividualKeys) {
    console.error("Error: Firebase credentials not found in .env.local")
    console.error("Please set FIREBASE_SERVICE_ACCOUNT_KEY or individual Firebase credentials")
    process.exit(1)
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("Error: GOOGLE_GENERATIVE_AI_API_KEY not found in .env.local")
    process.exit(1)
  }

  console.log("[Upload] Environment variables loaded successfully\n")

  const { getDb } = await import("../lib/firebase-admin.js")
  const { generateEmbedding } = await import("../lib/rag-system.js")
  const db = getDb()

  const documentsPath = path.join(process.cwd(), "rag-documents")

  console.log(`[Upload] Reading documents from: ${documentsPath}\n`)

  if (!fs.existsSync(documentsPath)) {
    console.error(`Error: Directory not found: ${documentsPath}`)
    console.error("Please make sure the path is correct.")
    process.exit(1)
  }

  const files = fs.readdirSync(documentsPath).filter((file) => file.endsWith(".md"))

  if (files.length === 0) {
    console.error("Error: No .md files found in the directory")
    process.exit(1)
  }

  console.log(`[Upload] Found ${files.length} markdown files\n`)

  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    const filePath = path.join(documentsPath, filename)

    console.log(`[${i + 1}/${files.length}] Processing: ${filename}`)

    try {
      // Read the markdown file
      const content = fs.readFileSync(filePath, "utf-8")

      // Extract title from filename (remove .md extension)
      const title = filename.replace(".md", "").replace(/_/g, " ")

      console.log(`  - Content length: ${content.length} characters`)
      console.log("  - Generating embedding...")

      // Generate embedding for the document
      const embedding = await generateEmbedding(content)

      // Upload to Firestore
      console.log("  - Uploading to Firestore...")
      const docRef = await db.collection("expert_documents").add({
        title,
        content,
        embedding,
        metadata: {
          filename,
          category: "expert-knowledge",
          tags: [],
        },
        createdAt: new Date().toISOString(),
      })

      console.log(`  ✓ Uploaded successfully (ID: ${docRef.id})\n`)
    } catch (error) {
      console.error(`  ✗ Error processing document:`, error)
    }
  }

  console.log("============================================================")
  console.log("UPLOAD COMPLETE")
  console.log("============================================================")
  console.log(`\nSuccessfully uploaded ${files.length} expert documents to Firestore.`)
  console.log("These documents will now be used for RAG-based responses in the Clarity Coach chat.")
}

main().catch(console.error)
