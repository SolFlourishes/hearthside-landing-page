import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      mode,
      text,
      context,
      sender,
      receiver,
      senderNeurotype,
      receiverNeurotype,
      senderGeneration,
      receiverGeneration,
      analyzeContext,
      interpretation,
    } = body

    console.log("[v0] Translation request received:", { mode, text, context, sender, receiver })

    let systemPrompt = ""
    let userPrompt = ""

    if (mode === "draft") {
      systemPrompt = `You are the Clarity Coach, an expert communication translator. Your role is to help people communicate more clearly by translating their messages to match their audience's communication style.

Communication Styles:
- Direct: Prefers concise, straightforward communication with clear action items
- Indirect: Prefers context, relationship-building, and softer language

Your task:
1. Analyze the user's intent and draft
2. Consider the communication styles, neurotypes, and generational differences
3. Provide a detailed translation that bridges the gap
4. Explain thoroughly how the original might be misinterpreted and why the translation is better

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{"explanation": "your detailed explanation here", "translation": "your improved message here"}`

      userPrompt = `Intent: ${context || ""}
Original Draft: ${text}
My Style: ${sender}
Audience Style: ${receiver}
${senderNeurotype ? `My Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `Audience Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `My Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `Audience Generation: ${receiverGeneration}` : ""}`
    } else if (mode === "analyze") {
      systemPrompt = `You are the Clarity Coach, an expert communication analyst. Your role is to help people understand messages they've received by analyzing tone, subtext, and potential misinterpretations.

Communication Styles:
- Direct: Says what they mean clearly and concisely
- Indirect: Uses context, subtext, and softer language

Your task:
1. Analyze what the sender likely meant
2. Consider communication styles, neurotypes, and generational differences
3. Explain potential misinterpretations
4. Provide a suggested response that bridges the gap

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{"explanation": "what they likely meant and why", "translation": "suggested response"}`

      userPrompt = `Message Received: ${text}
Situation Context: ${analyzeContext || ""}
How I Interpreted It: ${interpretation}
Their Style: ${sender}
My Style: ${receiver}
${senderNeurotype ? `Their Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `My Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `Their Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `My Generation: ${receiverGeneration}` : ""}`
    } else {
      throw new Error("Invalid mode. Must be 'draft' or 'analyze'")
    }

    const { text: aiText } = await generateText({
      model: google("gemini-pro-latest"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

    console.log("[v0] AI response received, length:", aiText.length)
    console.log("[v0] Raw AI response:", aiText)

    let cleanedText = aiText.trim()

    // Remove markdown code blocks
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    // Try to extract JSON object if there's extra text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }

    console.log("[v0] Cleaned text for parsing:", cleanedText)

    let parsed
    try {
      parsed = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      console.error("[v0] Failed to parse text:", cleanedText)
      throw new Error(`Invalid JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
    }

    // Validate the response has required fields
    if (!parsed.explanation || !parsed.translation) {
      console.error("[v0] Missing required fields in response:", parsed)
      throw new Error("Response missing required fields (explanation or translation)")
    }

    return NextResponse.json({
      explanation: parsed.explanation,
      response: parsed.translation,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate translation",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 },
    )
  }
}
