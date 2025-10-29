import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { intent, draft, myStyle, audienceStyle, myNeurotype, audienceNeurotype, myGeneration, audienceGeneration } =
      body

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
      model: google("gemini-2.0-flash-exp"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

    let cleanedText = text.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    const parsed = JSON.parse(cleanedText)

    return NextResponse.json({
      explanation: parsed.explanation,
      response: parsed.translation,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return NextResponse.json({ error: "Failed to generate translation", success: false }, { status: 500 })
  }
}
