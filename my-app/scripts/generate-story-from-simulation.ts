/**
 * Generate a story from a Project Cohesion simulation
 *
 * Usage: tsx scripts/generate-story-from-simulation.ts <docId>
 *
 * Example: tsx scripts/generate-story-from-simulation.ts The_Accountant_RUN_01
 *
 * This script:
 * 1. Fetches simulation data from master_compendium_v12 collection
 * 2. Parses events and intents from the simulation
 * 3. Uses Google AI to generate an engaging narrative
 * 4. Generates a cover image (placeholder for now)
 * 5. Saves the story to the stories collection with status "published"
 */

import { getDb } from "../lib/firebase-admin"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, "../.env.local") })

console.log("[Story Generator] Environment check:")
console.log(`- FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID ? "✓" : "✗"}`)
console.log(`- GOOGLE_GENERATIVE_AI_API_KEY: ${process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "✓" : "✗"}`)

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

    const db = getDb()
    console.log(`[Story Generator] Database connection established`)

    const simDoc = await db.collection("master_compendium_v12").doc(docId).get()
    console.log(`[Story Generator] Fetched simulation document`)

    if (!simDoc.exists) {
      throw new Error(`Simulation ${docId} not found in master_compendium_v12`)
    }

    const simulation = simDoc.data()
    console.log(`[Story Generator] Found simulation for persona: ${simulation?.persona_name}`)

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
    const allEvents = simulationReport.events || []

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
      model: google("gemini-pro-latest"),
      prompt: storyPrompt,
      temperature: 0.85,
      maxTokens: 2500,
    })

    const titlePrompt = `Based on this story about ${personaName}, create a compelling, mysterious title (4-7 words) that captures the essence of their journey:

${storyContent.substring(0, 600)}...

The title should evoke the themes of identity, choice, and fragmented reality. Make it poetic and intriguing.

Respond with ONLY the title, nothing else.`

    const { text: title } = await generateText({
      model: google("gemini-pro-latest"),
      prompt: titlePrompt,
      temperature: 0.8,
    })

    console.log(`[Story Generator] Generated title: ${title}`)

    // Create excerpt from first paragraph
    const firstParagraph = storyContent.split("\n\n")[0]
    const excerpt = firstParagraph.length > 250 ? firstParagraph.substring(0, 247) + "..." : firstParagraph

    const storyData = {
      title: title.trim().replace(/^["']|["']$/g, ""), // Remove quotes if present
      content: storyContent,
      excerpt,
      imageUrl: `/placeholder.svg?height=600&width=800&query=white+room+fragmented+reality+${personaName}`,
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
