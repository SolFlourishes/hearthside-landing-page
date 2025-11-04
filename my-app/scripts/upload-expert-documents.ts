import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import * as fs from "fs"
import * as path from "path"
import { generateEmbedding } from "../lib/rag-system"

// Load Firebase Admin dynamically after env vars are loaded
async function main() {
  console.log("============================================================")
  console.log("EXPERT DOCUMENTS UPLOADER")
  console.log("============================================================\n")

  // Dynamically import Firebase after env vars are loaded
  const { getDb } = await import("../lib/firebase-admin.js")
  const db = getDb()

  const documentsPath = "D:\\Projects\\clarity_coach_brain\\RAG_Documents"

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
