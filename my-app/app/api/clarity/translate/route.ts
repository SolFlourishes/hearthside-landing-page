import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { intent, draft, myStyle, audienceStyle, myNeurotype, audienceNeurotype, myGeneration, audienceGeneration } =
      body

    console.log("[v0] Translation request received:", { intent, draft, myStyle, audienceStyle })

    const systemPrompt = `You are the Clarity Coach, an expert communication translator. Your role is to help people communicate more clearly by translating their messages to match their audience's communication style.

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

    const userPrompt = `Intent: ${intent}
Original Draft: ${draft}
My Style: ${myStyle}
Audience Style: ${audienceStyle}
${myNeurotype ? `My Neurotype: ${myNeurotype}` : ""}
${audienceNeurotype ? `Audience Neurotype: ${audienceNeurotype}` : ""}
${myGeneration ? `My Generation: ${myGeneration}` : ""}
${audienceGeneration ? `Audience Generation: ${audienceGeneration}` : ""}`

    const { text } = await generateText({
      model: google("gemini-1.5-pro"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

    console.log("[v0] AI response received, length:", text.length)

    let cleanedText = text.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    console.log("[v0] Cleaned text:", cleanedText.substring(0, 100))

    const parsed = JSON.parse(cleanedText)

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
