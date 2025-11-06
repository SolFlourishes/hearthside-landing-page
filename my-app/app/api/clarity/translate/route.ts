import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveRelevantDocuments, formatContextForPrompt } from "@/lib/rag-system"
import { checkContentSafety, generateSafetyResponse, getSafetySystemPrompt } from "@/lib/content-safety"
import { checkRateLimitWithTier } from "@/lib/rate-limiter"
import { validateOutput } from "@/lib/output-validator"

export async function POST(request: NextRequest) {
  try {
    const clientId = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous"
    const body = await request.json()
    const { accessTier = "anonymous" } = body

    const rateLimitResult = await checkRateLimitWithTier(clientId, accessTier)

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
      attachedFiles,
      audience = "adult-to-adult", // Get audience for safety checks
    } = body

    console.log("[v0] Translation request received:", {
      mode,
      text,
      context,
      sender,
      receiver,
      audience,
      filesCount: attachedFiles?.length || 0,
    })

    const inputText =
      mode === "draft" ? `${context || ""} ${text}` : `${analyzeContext || ""} ${text} ${interpretation || ""}`
    const safetyCheck = checkContentSafety(inputText, audience)

    if (safetyCheck.shouldBlock) {
      console.log("[v0] Content blocked due to safety concerns:", safetyCheck.category)
      return NextResponse.json({
        explanation: generateSafetyResponse(safetyCheck),
        response: "",
        attachmentGuidance: null,
        success: true,
        safetyBlocked: true,
      })
    }

    // If concerning but not blocking, we'll still process but may add resources
    const showSafetyResources = !safetyCheck.isSafe && !safetyCheck.shouldBlock

    const queryText = mode === "draft" ? `${context || ""} ${text}` : `${analyzeContext || ""} ${text}`
    console.log("[v0] Retrieving expert knowledge for translation:", queryText.substring(0, 100))

    const relevantDocs = await retrieveRelevantDocuments(queryText, 2)
    const expertContext = formatContextForPrompt(relevantDocs)

    console.log("[v0] Retrieved", relevantDocs.length, "relevant documents for translation:")
    relevantDocs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ${doc.title} (similarity: ${doc.similarity?.toFixed(3) || "N/A"})`)
    })

    let filesContext = ""
    if (attachedFiles && attachedFiles.length > 0) {
      console.log("[v0] Processing", attachedFiles.length, "attached files")
      filesContext = "\n\n=== ATTACHED DOCUMENTS (MUST BE ANALYZED) ===\n"
      filesContext += "The user has attached the following documents. You MUST:\n"
      filesContext += "1. Acknowledge each attachment in your explanation\n"
      filesContext += "2. Analyze how the attachment content relates to the main message\n"
      filesContext += "3. Suggest revisions to the attachment content if needed to match the communication style\n"
      filesContext += "4. Indicate whether the attachment should remain separate or be integrated into the message\n\n"

      for (const file of attachedFiles) {
        filesContext += `\n--- ATTACHMENT: ${file.name} ---\n`

        if (file.type === "text/plain") {
          filesContext += file.content + "\n"
        } else if (file.type === "application/pdf" || file.type.includes("word")) {
          filesContext += `[${file.type} document - ${(file.size / 1024).toFixed(1)}KB]\n`
          filesContext += `Content preview: ${file.content.substring(0, 500)}...\n`
          filesContext +=
            "Note: This document contains additional context that MUST be analyzed and potentially revised.\n"
        } else if (file.type.startsWith("image/")) {
          filesContext += `[Image file - ${(file.size / 1024).toFixed(1)}KB]\n`
          filesContext +=
            "Note: This image may contain relevant visual information that should be described and considered.\n"
        }
      }
      filesContext += "\n=== END ATTACHED DOCUMENTS ===\n"
    }

    let systemPrompt = ""
    let userPrompt = ""

    const safetyGuidelines = getSafetySystemPrompt(audience)

    if (mode === "draft") {
      systemPrompt = `You are the Clarity Coach, an expert communication translator. Your role is to help people communicate more clearly by translating their messages to match their audience's communication style.

${safetyGuidelines}

Communication Styles:
- Direct: Prefers concise, straightforward communication with clear action items
- Indirect: Prefers context, relationship-building, and softer language

Your task:
1. Analyze the user's intent and draft
2. Consider the communication styles, neurotypes, and generational differences
3. **CRITICAL: If documents are attached, you MUST analyze them and provide guidance on revisions**
4. Provide a detailed translation that bridges the gap
5. Explain thoroughly how the original might be misinterpreted and why the translation is better
6. **For attachments: Explain whether they should be revised, integrated into the message, or kept separate**

When relevant expert knowledge is provided below, use it to inform your translations and explanations. Don't cite sources - just naturally incorporate the insights.

${expertContext}

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "explanation": "your detailed explanation here - MUST mention and analyze any attachments",
  "translation": "your improved message here",
  "attachmentGuidance": "if attachments exist, provide specific guidance on how to revise them or whether to integrate them into the main message. If no attachments, set this to null"
}`

      userPrompt = `Intent: ${context || ""}
Original Draft: ${text}
My Style: ${sender}
Audience Style: ${receiver}
Audience Type: ${audience}
${senderNeurotype ? `My Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `Audience Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `My Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `Audience Generation: ${receiverGeneration}` : ""}${filesContext}`
    } else if (mode === "analyze") {
      systemPrompt = `You are the Clarity Coach, an expert communication analyst. Your role is to help people understand messages they've received by analyzing tone, subtext, and potential misinterpretations.

${safetyGuidelines}

Communication Styles:
- Direct: Says what they mean clearly and concisely
- Indirect: Uses context, subtext, and softer language

Your task:
1. Analyze what the sender likely meant
2. Consider communication styles, neurotypes, and generational differences
3. **CRITICAL: If documents are attached, you MUST analyze them and explain their significance**
4. Explain potential misinterpretations
5. Provide a suggested response that bridges the gap
6. **For attachments: Explain how they affect the interpretation and whether your response should reference them**

When relevant expert knowledge is provided below, use it to inform your analysis and suggestions. Don't cite sources - just naturally incorporate the insights.

${expertContext}

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "explanation": "what they likely meant and why - MUST mention and analyze any attachments",
  "translation": "suggested response",
  "attachmentGuidance": "if attachments exist, explain their significance and whether your response should reference them. If no attachments, set this to null"
}`

      userPrompt = `Message Received: ${text}
Situation Context: ${analyzeContext || ""}
How I Interpreted It: ${interpretation}
Their Style: ${sender}
My Style: ${receiver}
Audience Type: ${audience}
${senderNeurotype ? `Their Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `My Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `Their Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `My Generation: ${receiverGeneration}` : ""}${filesContext}`
    } else {
      throw new Error("Invalid mode. Must be 'draft' or 'analyze'")
    }

    const { text: aiText } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

    console.log("[v0] AI response received, length:", aiText.length)
    console.log("[v0] Raw AI response:", aiText)

    let cleanedText = aiText.trim()

    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

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

    if (!parsed.explanation || !parsed.translation) {
      console.error("[v0] Missing required fields in response:", parsed)
      throw new Error("Response missing required fields (explanation or translation)")
    }

    const outputValidation = validateOutput(parsed.explanation + " " + parsed.translation, audience)

    if (!outputValidation.isSafe) {
      console.log("[v0] Output validation failed:", outputValidation.issues)
      // Log for review but provide a safe fallback
      return NextResponse.json({
        explanation:
          "I apologize, but I need to reconsider my response to ensure it's helpful and appropriate. Please try rephrasing your request, or contact support if you believe this is an error.",
        response: "",
        attachmentGuidance: null,
        success: true,
        outputValidationFailed: true,
      })
    }

    return NextResponse.json({
      explanation: parsed.explanation,
      response: parsed.translation,
      attachmentGuidance: parsed.attachmentGuidance || null,
      success: true,
      safetyWarning: showSafetyResources ? safetyCheck : null,
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
