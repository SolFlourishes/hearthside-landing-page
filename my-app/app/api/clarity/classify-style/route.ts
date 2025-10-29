import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    const systemPrompt = `You are a communication style classifier. Analyze the given text and determine if the communication style is "direct" or "indirect".

Direct style characteristics:
- Gets straight to the point
- Uses clear, explicit language
- Focuses on facts and action items
- Minimal context or relationship-building

Indirect style characteristics:
- Provides context and background
- Uses softer, more diplomatic language
- Focuses on relationships and feelings
- More elaborate explanations

Respond with ONLY a JSON object: {"style": "direct"} or {"style": "indirect"}`

    const { text: aiResponse } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    })

    let cleanedText = aiResponse.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    const result = JSON.parse(cleanedText)

    return NextResponse.json({
      style: result.style,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Classify style API error:", error)
    return NextResponse.json({ error: "Failed to classify style", success: false }, { status: 500 })
  }
}
