import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveRelevantDocuments, formatContextForPrompt } from "@/lib/rag-system"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("[v0] Chat API error: GOOGLE_GENERATIVE_AI_API_KEY is not set")
      return NextResponse.json(
        {
          error: "API key not configured",
          details: "GOOGLE_GENERATIVE_AI_API_KEY environment variable is missing",
          success: false,
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { history } = body

    console.log("[v0] Chat request received:", {
      historyLength: history?.length,
      historyType: Array.isArray(history) ? "array" : typeof history,
      firstMessage: history?.[0],
    })

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid messages format", success: false }, { status: 400 })
    }

    console.log("[v0] Chat request received with", history.length, "messages")

    const lastUserMessage = history.filter((msg: any) => msg.role === "user").pop()?.content || ""

    console.log("[v0] Retrieving relevant expert knowledge for query:", lastUserMessage.substring(0, 100))

    const relevantDocs = await retrieveRelevantDocuments(lastUserMessage, 3)
    const expertContext = formatContextForPrompt(relevantDocs)

    console.log("[v0] Retrieved", relevantDocs.length, "relevant documents:")
    relevantDocs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ${doc.title} (similarity: ${doc.similarity?.toFixed(3) || "N/A"})`)
    })

    const systemPrompt = `You are the Clarity Coach, a supportive communication expert who helps people navigate difficult conversations and build identity cohesion.

Your communication style:
- Keep responses SHORT and conversational (150-200 words max)
- Focus on ONE key insight or action per response
- Use a warm, supportive tone like talking to a friend
- Ask follow-up questions to go deeper rather than covering everything at once
- Be direct and actionable - no long explanations or multiple numbered sections
- Use simple language and short paragraphs

When relevant expert knowledge is provided below, use it to inform your responses, but maintain your conversational style. Don't cite sources or say "according to the documents" - just naturally incorporate the insights.

Remember: You're having a conversation, not writing a manual. Keep it brief, focused, and engaging. Users can always ask follow-up questions if they want more detail.

Format your responses in HTML with proper paragraph tags for readability.${expertContext}`

    console.log("[v0] Calling Google AI with model: gemini-pro-latest")

    const { text } = await generateText({
      model: google("gemini-pro-latest"),
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((msg: any) => ({
          role: msg.role === "model" ? "assistant" : "user",
          content: typeof msg.content === "string" ? msg.content.replace(/<[^>]*>/g, "") : msg.content,
        })),
      ],
      temperature: 0.8,
    })

    console.log("[v0] Chat response generated, length:", text.length)

    const formattedResponse = text
      .split("\n\n")
      .map((para) => `<p>${para}</p>`)
      .join("")

    return NextResponse.json({
      reply: formattedResponse,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      fullError: error,
    })

    return NextResponse.json(
      {
        error: "Failed to generate chat response",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 },
    )
  }
}
