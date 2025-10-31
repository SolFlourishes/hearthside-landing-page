/**
 * Generate a story from a Project Cohesion simulation
 *
 * Usage: tsx scripts/generate-story-from-simulation.ts <docId>
 *
 * Example: tsx scripts/generate-story-from-simulation.ts The_Accountant_RUN_01
 */

// Load environment variables FIRST before any other imports
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, "../.env.local") })

console.log("=".repeat(60))
console.log("STORY GENERATOR SCRIPT STARTED")
console.log("=".repeat(60))
console.log(`[Story Generator] Script executing at: ${new Date().toISOString()}`)
console.log(`[Story Generator] Working directory: ${process.cwd()}`)
console.log(`[Story Generator] Script location: ${__dirname}`)

console.log("\n[Story Generator] Environment check:")
const hasServiceAccountKey = !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY
const hasIndividualKeys =
  !!process.env.FIREBASE_PROJECT_ID && !!process.env.FIREBASE_CLIENT_EMAIL && !!process.env.FIREBASE_PRIVATE_KEY

if (hasServiceAccountKey) {
  console.log("- FIREBASE_SERVICE_ACCOUNT_KEY: ✓ (present)")
} else {
  console.log(
    `- FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID ? "✓ " + process.env.FIREBASE_PROJECT_ID : "✗ MISSING"}`,
  )
  console.log(`- FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL ? "✓" : "✗ MISSING"}`)
  console.log(`- FIREBASE_PRIVATE_KEY: ${process.env.FIREBASE_PRIVATE_KEY ? "✓ (present)" : "✗ MISSING"}`)
}
console.log(`- GOOGLE_GENERATIVE_AI_API_KEY: ${process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "✓ (present)" : "✗ MISSING"}`)

const missingVars = []
if (!hasServiceAccountKey && !hasIndividualKeys) {
  if (!process.env.FIREBASE_PROJECT_ID) missingVars.push("FIREBASE_PROJECT_ID")
  if (!process.env.FIREBASE_CLIENT_EMAIL) missingVars.push("FIREBASE_CLIENT_EMAIL")
  if (!process.env.FIREBASE_PRIVATE_KEY) missingVars.push("FIREBASE_PRIVATE_KEY")
}
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) missingVars.push("GOOGLE_GENERATIVE_AI_API_KEY")

if (missingVars.length > 0) {
  console.error("\n❌ ERROR: Missing required environment variables:")
  missingVars.forEach((v) => console.error(`   - ${v}`))
  console.error("\nMake sure you have a .env.local file in the project root with all required variables.")
  console.error("The file should contain EITHER:")
  console.error("  FIREBASE_SERVICE_ACCOUNT_KEY={...json...}")
  console.error("  GOOGLE_GENERATIVE_AI_API_KEY=your-api-key")
  console.error("\nOR:")
  console.error("  FIREBASE_PROJECT_ID=your-project-id")
  console.error("  FIREBASE_CLIENT_EMAIL=your-client-email")
  console.error("  FIREBASE_PRIVATE_KEY=your-private-key")
  console.error("  GOOGLE_GENERATIVE_AI_API_KEY=your-api-key")
  process.exit(1)
}

console.log("\n✓ All required environment variables present")
console.log("\n[Story Generator] Loading Firebase and AI modules...")

const INTENT_NAMES: Record<number, string> = {
  0: "ATTACK",
  1: "DEFEND",
  2: "BIND",
  3: "DOMINATE",
  4: "EMBRACE",
  5: "GIFT",
  6: "STUDY",
  7: "TRANSCEND",
  8: "MANIFEST",
  9: "ADJUST",
  10: "FORGE",
  11: "REPAIR",
  12: "DECONSTRUCT",
  13: "NEGOTIATE",
  14: "OBSERVE",
  15: "SUBVERT",
  16: "CULTIVATE",
  17: "EXILE",
  18: "AUDIT",
  19: "RESOLVE",
  20: "SACRIFICE",
  21: "UNBIND",
  22: "RECALL",
  23: "GATHER",
  24: "COMMUNICATE",
  25: "EXPERIENCE",
  26: "WITNESS",
  27: "ENDURE",
  28: "INTERACT",
}

async function generateStoryFromSimulation(docId: string) {
  try {
    console.log(`[Story Generator] Starting story generation for: ${docId}`)

    const { getDb } = await import("../lib/firebase-admin.js")
    const { generateText } = await import("ai")
    const { google } = await import("@ai-sdk/google")

    console.log(`[Story Generator] Modules loaded successfully`)

    const db = getDb()
    console.log(`[Story Generator] Database connection established`)

    const simDoc = await db.collection("master_compendium_v12").doc(docId).get()
    console.log(`[Story Generator] Fetched simulation document`)

    if (!simDoc.exists) {
      throw new Error(`Simulation ${docId} not found in master_compendium_v12`)
    }

    const simulation = simDoc.data()
    console.log(`[Story Generator] Found simulation for persona: ${simulation?.persona_name}`)

    console.log(
      `[Story Generator] Debug - simulation_report structure:`,
      JSON.stringify(simulation?.simulation_report, null, 2).substring(0, 500),
    )
    console.log(
      `[Story Generator] Debug - part_i_data structure:`,
      JSON.stringify(simulation?.part_i_data, null, 2).substring(0, 500),
    )

    const personaName = simulation?.persona_name || "Unknown"
    const constraint = simulation?.constraint || "Unknown"
    const origin = simulation?.simulation_report?.origin || "Unknown"

    // Extract Part I data
    const partIData = simulation?.part_i_data || {}
    const narrativeLog = partIData.narrative_log || ""
    const partIEvents = partIData.simulation_report?.events || []

    // Extract Part II data
    const p2Log = simulation?.p2_log || ""

    // Get final state
    const simulationReport = simulation?.simulation_report || {}
    const endState = simulationReport.end_state || "Unknown"
    const identityCohesion = simulationReport.identity_cohesion || 0
    const reputationalField = simulationReport.reputational_field || {}

    let allEvents = []

    // Try to get events from simulation_report
    if (simulationReport.events && Array.isArray(simulationReport.events)) {
      allEvents = simulationReport.events
    }
    // Try to get events from part_i_data.simulation_report
    else if (partIData.simulation_report?.events && Array.isArray(partIData.simulation_report.events)) {
      allEvents = partIData.simulation_report.events
    }
    // If events is an object, try to convert it to an array
    else if (simulationReport.events && typeof simulationReport.events === "object") {
      allEvents = Object.values(simulationReport.events)
    }

    console.log(
      `[Story Generator] Debug - allEvents type: ${typeof allEvents}, isArray: ${Array.isArray(allEvents)}, length: ${allEvents?.length || 0}`,
    )

    if (!Array.isArray(allEvents)) {
      console.error(`[Story Generator] ERROR: allEvents is not an array. Type: ${typeof allEvents}`)
      console.error(`[Story Generator] allEvents value:`, JSON.stringify(allEvents).substring(0, 200))
      allEvents = [] // Fallback to empty array
    }

    const eventsWithIntents = allEvents.map((event: any) => ({
      text: event.event_text || event.text || "",
      intent: INTENT_NAMES[event.recovered_intent_id] || "UNKNOWN",
      intentId: event.recovered_intent_id,
    }))

    console.log(`[Story Generator] Parsed ${eventsWithIntents.length} events`)

    const storyPrompt = `You are a master storyteller crafting an immersive, engaging narrative from a Project Cohesion playthrough.

PROJECT COHESION is a text-based RPG where players navigate a fragmenting reality. Their identity and choices shape the world around them. The "White Room" is where consciousness and reality intersect.

SIMULATION DATA:
Persona: ${personaName}
Origin: ${origin}
Constraint: ${constraint}
Final State: ${endState}
Identity Cohesion: ${identityCohesion}

KEY EVENTS (with player intents):
${eventsWithIntents
  .slice(0, 15)
  .map((e: any, i: number) => `${i + 1}. [${e.intent}] ${e.text}`)
  .join("\n")}

NARRATIVE LOGS:
Part I: ${narrativeLog.substring(0, 500)}
Part II: ${p2Log.substring(0, 500)}

REPUTATIONAL FIELD:
${Object.entries(reputationalField)
  .map(([key, value]) => `${key}: ${value}`)
  .join(", ")}

IMPORTANT: The narrative logs above may contain technical metadata like "P1 State Post-R016 Trigger" or rule references. DO NOT include any of this technical metadata in your story. Focus only on the narrative content and character actions. Filter out anything that looks like:
- Rule triggers (e.g., "Post-R016 Trigger", "R001", etc.)
- State markers (e.g., "P1 State", "P2 State")
- System messages or technical annotations
- Any text in brackets or parentheses that looks like metadata

YOUR TASK:
Write a compelling 1000-1500 word story titled "Tales from the White Room" that:

1. **Opens with a hook** - Draw readers in immediately with vivid imagery or tension
2. **Show character through action** - Let ${personaName}'s choices reveal their personality
3. **Build tension progressively** - Each scene should raise stakes
4. **Use sensory details** - Make the White Room feel real and unsettling
5. **Include key moments** - Weave in the most dramatic events from the simulation
6. **End with impact** - Leave readers thinking about identity, choice, and reality

STYLE GUIDELINES:
- Write in third person, past tense
- Use short, punchy sentences for action; longer ones for reflection
- Create atmosphere: the White Room is liminal, shifting, uncertain
- Show emotional depth without being melodramatic
- Make it feel like a complete story arc, not a summary

Write ONLY the story. No meta-commentary, no explanations, no titles.`

    console.log(`[Story Generator] Generating story content...`)

    const { text: storyContent } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: storyPrompt,
      temperature: 0.85,
      maxTokens: 2500,
    })

    const titlePrompt = `Based on this story about ${personaName}, create a compelling, mysterious title (4-7 words) that captures the essence of their journey:

${storyContent.substring(0, 600)}...

The title should evoke the themes of identity, choice, and fragmented reality. Make it poetic and intriguing.

Respond with ONLY the title, nothing else.`

    const { text: title } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: titlePrompt,
      temperature: 0.8,
    })

    console.log(`[Story Generator] Generated title: ${title}`)

    console.log(`[Story Generator] Generating story image...`)

    const imagePrompt = `A haunting, atmospheric scene representing "${title.trim()}". 
The White Room: a liminal space where reality fragments and consciousness shifts. 
Persona: ${personaName}, ${origin}
Mood: mysterious, introspective, slightly unsettling
Style: cinematic, dreamlike, with soft lighting and ethereal quality
No text, no UI elements, just pure atmospheric storytelling.`

    let imageUrl = `/placeholder.svg?height=600&width=800&query=white+room+fragmented+reality+${personaName}`

    try {
      // Try to generate image using Google's Imagen model
      const imageResponse = await generateText({
        model: google("gemini-2.0-flash-exp"),
        prompt: `Generate a detailed image prompt for an AI image generator based on this story concept:

Title: ${title.trim()}
Persona: ${personaName}
Story excerpt: ${storyContent.substring(0, 300)}

Create a vivid, detailed prompt (2-3 sentences) for generating a cinematic, atmospheric image that captures the essence of this story. Focus on mood, lighting, and symbolic elements. No text or UI elements.

Respond with ONLY the image prompt, nothing else.`,
      })

      console.log(`[Story Generator] Image prompt generated: ${imageResponse.text.substring(0, 100)}...`)
      console.log(
        `[Story Generator] Note: Using placeholder for now. To enable image generation, integrate with an image API like fal.ai or DALL-E`,
      )

      // For now, use an enhanced placeholder with the generated prompt
      imageUrl = `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(imageResponse.text.substring(0, 100))}`
    } catch (error) {
      console.error(`[Story Generator] Error generating image:`, error)
      console.log(`[Story Generator] Falling back to default placeholder`)
    }

    // Create excerpt from first paragraph
    const firstParagraph = storyContent.split("\n\n")[0]
    const excerpt = firstParagraph.length > 250 ? firstParagraph.substring(0, 247) + "..." : firstParagraph

    const storyData = {
      title: title.trim().replace(/^["']|["']$/g, ""), // Remove quotes if present
      content: storyContent,
      excerpt,
      imageUrl,
      type: "ai-generated",
      status: "published",
      simulationId: docId,
      metadata: {
        personaName,
        origin,
        constraint,
        endState,
        identityCohesion,
        totalEvents: eventsWithIntents.length,
        keyIntents: eventsWithIntents.slice(0, 10).map((e: any) => e.intent),
        reputationalField,
      },
      createdAt: new Date(),
      publishedAt: new Date(),
      views: 0,
      likes: 0,
    }

    const docRef = await db.collection("stories").add(storyData)
    console.log(`[Story Generator] Story saved with ID: ${docRef.id}`)

    console.log(`[Story Generator] ✅ Story generation complete!`)

    return {
      storyId: docRef.id,
      title: title.trim(),
      personaName,
    }
  } catch (error) {
    console.error(`[Story Generator] Error in generateStoryFromSimulation:`, error)
    throw error
  }
}

// CLI execution
const docId = process.argv[2]

if (!docId) {
  console.error("❌ Usage: tsx scripts/generate-story-from-simulation.ts <docId>")
  console.error("Example: tsx scripts/generate-story-from-simulation.ts The_Accountant_RUN_01")
  process.exit(1)
}

generateStoryFromSimulation(docId)
  .then((result) => {
    console.log("\n✅ SUCCESS!")
    console.log(`Story ID: ${result.storyId}`)
    console.log(`Title: ${result.title}`)
    console.log(`Persona: ${result.personaName}`)
    console.log("\nYou can now view this story at:")
    console.log(`https://hearthsideworks.com/stories/tales-from-the-white-room/${result.storyId}`)
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ ERROR:", error.message)
    console.error(error.stack)
    process.exit(1)
  })

export { generateStoryFromSimulation }
