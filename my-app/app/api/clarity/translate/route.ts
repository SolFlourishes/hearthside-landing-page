import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"

const translationSchema = z.object({
  explanation: z
    .string()
    .describe(
      "A detailed explanation of how the original message might be interpreted and why it could cause confusion",
    ),
  translation: z.string().describe("The improved message that better conveys the intent to the audience"),
})

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
4. Explain thoroughly how the original might be misinterpreted and why the translation is better`

    const userPrompt = `Intent: ${intent}
Original Draft: ${draft}
My Style: ${myStyle}
Audience Style: ${audienceStyle}
${myNeurotype ? `My Neurotype: ${myNeurotype}` : ""}
${audienceNeurotype ? `Audience Neurotype: ${audienceNeurotype}` : ""}
${myGeneration ? `My Generation: ${myGeneration}` : ""}
${audienceGeneration ? `Audience Generation: ${audienceGeneration}` : ""}`

    const { object } = await generateObject({
      model: "google/gemini-2.5-flash-image",
      schema: translationSchema,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

    return NextResponse.json({
      explanation: object.explanation,
      response: object.translation,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return NextResponse.json({ error: "Failed to generate translation", success: false }, { status: 500 })
  }
}
