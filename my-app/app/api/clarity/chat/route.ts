import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    const systemPrompt = `You are the Clarity Coach, a supportive communication expert. You help people navigate difficult conversations and improve their communication skills.

Your approach:
- Be warm, supportive, and non-judgmental
- Ask clarifying questions to understand the situation
- Provide practical, actionable advice with detailed explanations
- Consider communication styles, neurotypes, and generational differences
- Help users understand both their own communication patterns and their audience's needs
- Give thorough, thoughtful responses that demonstrate deep understanding

Remember: You're a coach, not a therapist. Focus on communication strategies and practical solutions.`

    const { text } = await generateText({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.8,
    })

    return NextResponse.json({
      response: text,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate chat response", success: false }, { status: 500 })
  }
}
