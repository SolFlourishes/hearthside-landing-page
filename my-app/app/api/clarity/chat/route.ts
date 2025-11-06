import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveRelevantDocuments, formatContextForPrompt } from "@/lib/rag-system"
import { checkContentSafety, generateSafetyResponse, getSafetySystemPrompt } from "@/lib/content-safety"
import { checkRateLimit } from "@/lib/rate-limiter"
import { validateOutput } from "@/lib/output-validator"

export async function POST(request: NextRequest) {
  try {
    const clientId = request.headers.get("x-forwarded-for") || "anonymous"
    const rateLimitResult = await checkRateLimit(clientId, "chat")

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          details: `Please wait ${Math.ceil(rateLimitResult.resetIn / 1000)} seconds before trying again.`,
          success: false,
        },
        { status: 429 },
      )
    }

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
    const { history, audience = "adult-to-adult" } = body // Get audience for safety checks

    console.log("[v0] Chat request received:", {
      historyLength: history?.length,
      historyType: Array.isArray(history) ? "array" : typeof history,
      audience,
      firstMessage: history?.[0],
    })

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid messages format", success: false }, { status: 400 })
    }

    console.log("[v0] Chat request received with", history.length, "messages")

    const lastUserMessage = history.filter((msg: any) => msg.role === "user").pop()?.content || ""
    const lastUserFiles = history.filter((msg: any) => msg.role === "user").pop()?.files || []

    const safetyCheck = checkContentSafety(lastUserMessage, audience)

    if (safetyCheck.shouldBlock) {
      console.log("[v0] Content blocked due to safety concerns:", safetyCheck.category)
      return NextResponse.json({
        reply: generateSafetyResponse(safetyCheck),
        success: true,
        safetyBlocked: true,
      })
    }

    const showSafetyResources = !safetyCheck.isSafe && !safetyCheck.shouldBlock

    console.log("[v0] Retrieving relevant expert knowledge for query:", lastUserMessage.substring(0, 100))

    const relevantDocs = await retrieveRelevantDocuments(lastUserMessage, 3)
    const expertContext = formatContextForPrompt(relevantDocs)

    console.log("[v0] Retrieved", relevantDocs.length, "relevant documents:")
    relevantDocs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ${doc.title} (similarity: ${doc.similarity?.toFixed(3) || "N/A"})`)
    })

    let filesContext = ""
    if (lastUserFiles.length > 0) {
      console.log("[v0] Processing", lastUserFiles.length, "attached files in chat")
      filesContext = "\n\n=== ATTACHED DOCUMENTS (MUST BE ANALYZED) ===\n"
      filesContext += "The user has attached documents. You MUST:\n"
      filesContext += "1. Acknowledge the attachments in your response\n"
      filesContext += "2. Analyze their content and provide feedback\n"
      filesContext += "3. Suggest improvements or revisions if relevant\n"
      filesContext += "4. Explain how they relate to the conversation\n\n"

      for (const file of lastUserFiles) {
        filesContext += `\n--- ATTACHMENT: ${file.name} ---\n`

        if (file.type === "text/plain") {
          filesContext += file.content + "\n"
        } else if (file.type === "application/pdf" || file.type.includes("word")) {
          filesContext += `[${file.type} document - ${(file.size / 1024).toFixed(1)}KB]\n`
          filesContext += `Content preview: ${file.content.substring(0, 500)}...\n`
          filesContext += "Note: Analyze this document and provide specific feedback.\n"
        } else if (file.type.startsWith("image/")) {
          filesContext += `[Image file - ${(file.size / 1024).toFixed(1)}KB]\n`
          filesContext += "Note: Describe what you observe and how it relates to the conversation.\n"
        }
      }
      filesContext += "\n=== END ATTACHED DOCUMENTS ===\n"
    }

    const safetyGuidelines = getSafetySystemPrompt(audience)

    const systemPrompt = `You are the Clarity Coach, a supportive communication expert who helps people navigate difficult conversations and build identity cohesion.

${safetyGuidelines}

Your communication style:
- Keep responses SHORT and conversational (150-200 words max)
- Focus on ONE key insight or action per response
- Use a warm, supportive tone like talking to a friend
- Ask follow-up questions to go deeper rather than covering everything at once
- Be direct and actionable - no long explanations or multiple numbered sections
- Use simple language and short paragraphs

**CRITICAL: If the user has attached documents, you MUST:**
- Acknowledge them specifically by name
- Analyze their content and provide feedback
- Suggest improvements or revisions if relevant
- Explain how they relate to the conversation

When relevant expert knowledge is provided below, use it to inform your responses, but maintain your conversational style. Don't cite sources or say "according to the documents" - just naturally incorporate the insights.

Remember: You're having a conversation, not writing a manual. Keep it brief, focused, and engaging. Users can always ask follow-up questions if they want more detail.

Format your responses in HTML with proper paragraph tags for readability.${expertContext}${filesContext}`

    console.log("[v0] Calling Google AI with model: gemini-2.0-flash-exp")

    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
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

    const outputValidation = validateOutput(formattedResponse, audience)

    if (outputValidation.hasIssues) {
      console.log("[v0] Output validation found issues:", outputValidation.issues)
      // Log but don't block - the AI should have already handled this appropriately
    }

    return NextResponse.json({
      reply: formattedResponse,
      success: true,
      safetyWarning: showSafetyResources ? safetyCheck : null,
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
