import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { getVertexAIProvider } from "@/lib/vertex-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    console.log("[v0] Classify style request received, text length:", text?.length)

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

    const vertex = getVertexAIProvider()

    const { text: aiResponse } = await generateText({
      model: vertex("gemini-pro-latest"), // Updated to gemini-pro-latest
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    })

    console.log("[v0] Classification response:", aiResponse)

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
    return NextResponse.json(
      {
        error: "Failed to classify style",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 },
    )
  }
}
