import dotenv from "dotenv"

// Load environment variables FIRST before any other imports
dotenv.config({ path: ".env.local" })

console.log("============================================================")
console.log("COLLECTION LISTER SCRIPT")
console.log("============================================================")

async function main() {
  try {
    // Dynamically import Firebase after env vars are loaded
    const { getDb } = await import("../lib/firebase-admin.js")

    console.log("[Collection Lister] Connecting to database...")
    const db = getDb()

    console.log("[Collection Lister] Fetching all collections...")
    const collections = await db.listCollections()

    if (collections.length === 0) {
      console.log("\n❌ No collections found in database")
      return
    }

    console.log(`\n✅ Found ${collections.length} collection(s):\n`)

    for (const collection of collections) {
      const snapshot = await collection.limit(5).get()
      console.log(`📁 ${collection.id}`)
      console.log(`   Documents: ${snapshot.size > 0 ? `${snapshot.size}+ documents` : "Empty"}`)

      if (snapshot.size > 0) {
        console.log(`   Sample doc IDs:`)
        snapshot.docs.forEach((doc, index) => {
          console.log(`     ${index + 1}. ${doc.id}`)
        })
      }
      console.log()
    }
  } catch (error) {
    console.error("\n❌ Error:", error)
    process.exit(1)
  }
}

main()
