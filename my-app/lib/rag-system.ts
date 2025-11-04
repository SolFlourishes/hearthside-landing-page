import { GoogleGenerativeAI } from "@google/generative-ai"
import { getDb } from "./firebase-admin"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)

export interface ExpertDocument {
  id: string
  title: string
  content: string
  embedding?: number[]
  metadata?: {
    source?: string
    category?: string
    tags?: string[]
  }
}

/**
 * Generate embeddings for text using Google AI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" })
  const result = await model.embedContent(text)
  return result.embedding.values
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Retrieve relevant documents from Firestore based on query
 */
export async function retrieveRelevantDocuments(query: string, topK = 3): Promise<ExpertDocument[]> {
  try {
    const db = getDb()

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    // Fetch all expert documents from Firestore
    const snapshot = await db.collection("expert_documents").get()

    if (snapshot.empty) {
      console.log("[RAG] No expert documents found in Firestore")
      return []
    }

    // Calculate similarity scores for each document
    const documentsWithScores = snapshot.docs.map((doc) => {
      const data = doc.data() as ExpertDocument
      const similarity = data.embedding ? cosineSimilarity(queryEmbedding, data.embedding) : 0

      return {
        ...data,
        id: doc.id,
        similarity,
      }
    })

    // Sort by similarity and return top K
    const topDocuments = documentsWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(({ similarity, ...doc }) => doc)

    console.log(`[RAG] Retrieved ${topDocuments.length} relevant documents for query`)

    return topDocuments
  } catch (error) {
    console.error("[RAG] Error retrieving documents:", error)
    return []
  }
}

/**
 * Format retrieved documents as context for the LLM
 */
export function formatContextForPrompt(documents: ExpertDocument[]): string {
  if (documents.length === 0) {
    return ""
  }

  const contextParts = documents.map((doc, index) => {
    return `[Expert Knowledge ${index + 1}: ${doc.title}]\n${doc.content}`
  })

  return `\n\nRelevant Expert Knowledge:\n${contextParts.join("\n\n---\n\n")}`
}
