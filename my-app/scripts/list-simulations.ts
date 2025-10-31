import dotenv from "dotenv"
import { resolve } from "path"

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") })

console.log("============================================================")
console.log("SIMULATION LISTER SCRIPT")
console.log("============================================================\n")

async function listSimulations() {
  try {
    // Dynamic import after env vars are loaded
    const { getDb } = await import("../lib/firebase-admin.js")

    console.log("[Simulation Lister] Connecting to database...")
    const db = getDb()

    console.log("[Simulation Lister] Fetching simulations from master_compendium_v12...\n")

    const snapshot = await db.collection("master_compendium_v12").get()

    if (snapshot.empty) {
      console.log("❌ No simulations found in master_compendium_v12 collection")
      return
    }

    console.log(`✓ Found ${snapshot.size} simulation(s):\n`)
    console.log("─".repeat(80))

    snapshot.forEach((doc) => {
      const data = doc.data()
      console.log(`\nDocument ID: ${doc.id}`)
      console.log(`  Persona: ${data.persona_name || "N/A"}`)
      console.log(`  Part 1 Complete: ${data.P1_COMPLETE ? "✓" : "✗"}`)
      console.log(`  Part 2 Complete: ${data.P2_COMPLETE ? "✓" : "✗"}`)
      console.log(`  Constraint: ${data.constraint || "N/A"}`)
      console.log(`  Last Updated: ${data.last_updated || "N/A"}`)
    })

    console.log("\n" + "─".repeat(80))
    console.log("\nTo generate a story, use:")
    console.log('npx tsx scripts/generate-story-from-simulation.ts "<document_id>"\n')
  } catch (error) {
    console.error("\n❌ ERROR:", error)
    throw error
  }
}

// Run the script
listSimulations()
