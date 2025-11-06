import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveRelevantDocuments, formatContextForPrompt } from "@/lib/rag-system"

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
      attachedFiles,
    } = body

    console.log("[v0] Translation request received:", {
      mode,
      text,
      context,
      sender,
      receiver,
      filesCount: attachedFiles?.length || 0,
    })

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
          // For PDFs and Word docs, include the base64 content
          filesContext += `[${file.type} document - ${(file.size / 1024).toFixed(1)}KB]\n`
          filesContext += `Content (base64): ${file.content.substring(0, 500)}...\n`
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

    if (mode === "draft") {
      systemPrompt = `You are the Clarity Coach, an expert communication translator. Your role is to help people communicate more clearly by translating their messages to match their audience's communication style.

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
${senderNeurotype ? `My Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `Audience Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `My Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `Audience Generation: ${receiverGeneration}` : ""}${filesContext}`
    } else if (mode === "analyze") {
      systemPrompt = `You are the Clarity Coach, an expert communication analyst. Your role is to help people understand messages they've received by analyzing tone, subtext, and potential misinterpretations.

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
${senderNeurotype ? `Their Neurotype: ${senderNeurotype}` : ""}
${receiverNeurotype ? `My Neurotype: ${receiverNeurotype}` : ""}
${senderGeneration ? `Their Generation: ${senderGeneration}` : ""}
${receiverGeneration ? `My Generation: ${receiverGeneration}` : ""}${filesContext}`
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
      attachmentGuidance: parsed.attachmentGuidance || null,
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
