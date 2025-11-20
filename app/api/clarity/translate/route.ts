import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { retrieveRelevantDocuments, formatContextForPrompt } from "@/lib/rag-system"
import { checkContentSafety, generateSafetyResponse, getSafetySystemPrompt } from "@/lib/content-safety"
import { checkRateLimitWithTier } from "@/lib/rate-limiter"
import { validateOutput } from "@/lib/output-validator"
import {
  getNeurotypeGuidance,
  getGenerationGuidance,
  getRelationshipGuidance,
  type Neurotype,
  type Generation,
  type RelationshipContext,
} from "@/lib/communication-profiles"
import {
  getPoliticalIdentityGuidance,
  getPoliticalValuesGuidance,
  type PoliticalIdentity,
} from "@/lib/political-profiles"
import { getVertexAIModel } from "@/lib/vertex-ai-client"

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
      senderRelationship,
      receiverRelationship,
      analyzeContext,
      interpretation,
      attachedFiles,
      audience = "adult-to-adult",
      communicationMode = "personal",
      senderPolitical,
      receiverPolitical,
      senderPoliticalValues = [],
      receiverPoliticalValues = [],
    } = body

    const inputText =
      mode === "draft" ? `${context || ""} ${text}` : `${analyzeContext || ""} ${text} ${interpretation || ""}`
    const safetyCheck = checkContentSafety(inputText, audience)

    if (safetyCheck.shouldBlock) {
      return NextResponse.json({
        explanation: generateSafetyResponse(safetyCheck),
        response: "",
        attachmentGuidance: null,
        success: true,
        safetyBlocked: true,
      })
    }

    const showSafetyResources = !safetyCheck.isSafe && !safetyCheck.shouldBlock

    const queryText = mode === "draft" ? `${context || ""} ${text}` : `${analyzeContext || ""} ${text}`

    const relevantDocs = await retrieveRelevantDocuments(queryText, 2)
    const expertContext = formatContextForPrompt(relevantDocs)

    let filesContext = ""
    if (attachedFiles && attachedFiles.length > 0) {
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

    let senderProfile = ""
    let receiverProfile = ""

    if (communicationMode === "political") {
      senderProfile = `
=== SENDER POLITICAL PROFILE ===
${senderPolitical ? getPoliticalIdentityGuidance(senderPolitical as PoliticalIdentity) : ""}
${senderPoliticalValues && senderPoliticalValues.length > 0 ? `\n**Additional Communication Values:**\n${getPoliticalValuesGuidance(senderPoliticalValues)}` : ""}
`
      receiverProfile = `
=== RECEIVER POLITICAL PROFILE ===
${receiverPolitical ? getPoliticalIdentityGuidance(receiverPolitical as PoliticalIdentity) : ""}
${receiverPoliticalValues && receiverPoliticalValues.length > 0 ? `\n**Additional Communication Values:**\n${getPoliticalValuesGuidance(receiverPoliticalValues)}` : ""}
`
    } else {
      senderProfile = `
=== SENDER COMMUNICATION PROFILE ===
${senderNeurotype ? getNeurotypeGuidance(senderNeurotype as Neurotype) : ""}
${senderGeneration ? getGenerationGuidance(senderGeneration as Generation) : ""}
${senderRelationship ? `**Relationship Context:** ${senderRelationship}\n${getRelationshipGuidance(senderRelationship as RelationshipContext)}` : ""}
`

      receiverProfile = `
=== RECEIVER COMMUNICATION PROFILE ===
${receiverNeurotype ? getNeurotypeGuidance(receiverNeurotype as Neurotype) : ""}
${receiverGeneration ? getGenerationGuidance(receiverGeneration as Generation) : ""}
${receiverRelationship ? `**Relationship Context:** ${receiverRelationship}\n${getRelationshipGuidance(receiverRelationship as RelationshipContext)}` : ""}
`
    }

    if (mode === "draft") {
      systemPrompt = `You are the Clarity Coach, an expert communication translator. Your role is to help people communicate more clearly by translating their messages to match their audience's communication style.

${safetyGuidelines}

**Your task:**
1. Analyze the sender's actual communication style FROM THEIR MESSAGE (don't rely on self-assessment)
2. ${communicationMode === "political" ? "Consider the sender's and receiver's political identities, moral foundations, and values" : "Consider the sender's neurotype, generation, and relationship to the receiver"}
3. ${communicationMode === "political" ? "Identify shared values and bridge-building strategies to find common ground across political differences" : "Consider the receiver's neurotype, generation, and relationship to the sender"}
4. **CRITICAL: Each aspect of their profile MUST visibly influence your translation**
5. If documents are attached, you MUST analyze them and provide guidance on revisions
6. Provide a detailed translation that bridges specific communication gaps
7. Explain thoroughly how the original might be misinterpreted based on SPECIFIC DIFFERENCES in their profiles
8. For attachments: Explain whether they should be revised, integrated into the message, or kept separate

**IMPORTANT:** Your translation must demonstrably reflect:
${
  communicationMode === "political"
    ? `
- Political identity differences (e.g., reframing in terms of shared values, avoiding dogwhistles and charged language)
- Moral foundation differences (e.g., appealing to loyalty/authority for conservatives, care/fairness for liberals)
- Bridge-building strategies (e.g., finding common ground, acknowledging legitimate concerns, using inclusive language)
- Communication values (e.g., respecting traditional/populist/progressive preferences for evidence, tone, and framing)
`
    : `
- Neurotype differences (e.g., making implicit expectations explicit for autistic receivers, adding structure for ADHD receivers)
- Generational differences (e.g., adding context for Boomers, being more concise for Gen Z)
- Relationship dynamics (e.g., appropriate formality for boss, collaborative tone for colleagues)
`
}

Do NOT provide generic advice. Show how EACH selected profile aspect changes your translation.

When relevant expert knowledge is provided below, use it to inform your translations and explanations. Don't cite sources - just naturally incorporate the insights.

${expertContext}

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "detectedStyle": "brief description of the detected communication style (e.g., 'direct and task-focused', 'indirect with emotional context')",
  "explanation": "your detailed explanation showing how EACH profile aspect influenced your analysis",
  "translation": "your improved message that reflects the specific profile differences",
  "attachmentGuidance": "if attachments exist, provide specific guidance. If none, set to null"
}`

      userPrompt = `Intent: ${context || ""}
Original Draft: ${text}

${senderProfile}

${receiverProfile}

Audience Type: ${audience}
Communication Mode: ${communicationMode}

${filesContext}

**Remember:** Your translation MUST show visible changes based on:
${
  communicationMode === "political"
    ? `
1. Political identity and moral foundation differences
2. Shared values and common ground opportunities
3. Bridge-building language that respects both perspectives
4. Communication values that reflect their specific preferences (e.g., anti-establishment, traditional conservative, social justice, etc.)
`
    : `
1. Neurotype differences between sender and receiver
2. Generational communication preferences  
3. Relationship power dynamics and context
`
}

Explain SPECIFICALLY how each of these factors influenced your translation.`
    } else if (mode === "analyze") {
      systemPrompt = `You are the Clarity Coach, an expert communication analyst. Your role is to help people understand messages they've received by analyzing tone, subtext, and potential misinterpretations.

${safetyGuidelines}

**Your task:**
1. Analyze the sender's actual communication style FROM THEIR MESSAGE
2. ${communicationMode === "political" ? "Consider how the sender's political identity and values might have influenced their word choices" : "Consider how the sender's neurotype, generation, and relationship might have influenced their word choices"}
3. ${communicationMode === "political" ? "Consider how the receiver's political identity might cause misinterpretation due to different moral foundations or values" : "Consider how the receiver's neurotype, generation, and relationship might cause misinterpretation"}
4. **CRITICAL: Each aspect of their profiles MUST visibly influence your analysis**
5. If documents are attached, you MUST analyze them and explain their significance
6. Explain potential misinterpretations based on SPECIFIC PROFILE DIFFERENCES
7. Provide a suggested response that bridges the gap
8. For attachments: Explain how they affect interpretation and whether your response should reference them

**IMPORTANT:** Your analysis must demonstrably address:
${
  communicationMode === "political"
    ? `
- How political identity differences might cause misinterpretation (e.g., same words meaning different things to liberals vs conservatives)
- How moral foundation differences create confusion (e.g., appeals to loyalty/authority vs care/fairness)
- How communication values affect interpretation (e.g., populist distrust of institutions vs traditional conservative respect for norms)
- How to craft a response that finds common ground and respects both value systems
`
    : `
- How neurotype differences might cause misinterpretation (e.g., autistic sender being "too blunt" to neurotypical receiver)
- How generational norms might create confusion (e.g., Gen Z brevity seeming rude to Boomer)
- How relationship context affects meaning (e.g., boss's "suggestion" actually being a directive)
`
}

Do NOT provide generic advice. Show how EACH selected profile aspect changes your interpretation and suggested response.

When relevant expert knowledge is provided below, use it to inform your analysis and suggestions. Don't cite sources - just naturally incorporate the insights.

${expertContext}

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "detectedStyle": "brief description of the detected communication style from the message (e.g., 'casual and friendly', 'formal and reserved')",
  "explanation": "what they likely meant, showing how EACH profile aspect influenced your interpretation",
  "translation": "suggested response that accounts for the specific profile differences",
  "attachmentGuidance": "if attachments exist, explain significance. If none, set to null"
}`

      userPrompt = `Message Received: ${text}
Situation Context: ${analyzeContext || ""}
How I Interpreted It: ${interpretation}

${senderProfile}

${receiverProfile}

Audience Type: ${audience}
Communication Mode: ${communicationMode}

${filesContext}

**Remember:** Your analysis MUST explain:
${
  communicationMode === "political"
    ? `
1. How sender's political identity/values influenced their message
2. How receiver's political identity might cause misinterpretation
3. How their communication values affect understanding (e.g., populist vs traditional conservative language)
4. How to bridge these SPECIFIC gaps with a response that finds common ground
`
    : `
1. How sender's neurotype/generation/relationship influenced their message
2. How receiver's neurotype/generation/relationship might cause misinterpretation
3. How to bridge these SPECIFIC gaps in your suggested response
`
}`
    } else {
      throw new Error("Invalid mode. Must be 'draft' or 'analyze'")
    }

    const { text: aiText } = await generateText({
      model: getVertexAIModel("gemini-2.0-flash-thinking-exp"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })

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

    let parsed
    try {
      parsed = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      throw new Error(`Invalid JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
    }

    if (!parsed.explanation || !parsed.translation) {
      console.error("Missing required fields in response:", parsed)
      throw new Error("Response missing required fields (explanation or translation)")
    }

    const outputValidation = validateOutput(parsed.explanation + " " + parsed.translation, audience)

    if (!outputValidation.isSafe) {
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
      detectedStyle: parsed.detectedStyle || "communication style analyzed from message",
      explanation: parsed.explanation,
      response: parsed.translation,
      attachmentGuidance: parsed.attachmentGuidance || null,
      success: true,
      safetyWarning: showSafetyResources ? safetyCheck : null,
    })
  } catch (error) {
    console.error("Translation API error:", error)
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
