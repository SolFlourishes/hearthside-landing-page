import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { POLITICAL_PROFILES, type PoliticalIdentity, getPoliticalGuidance } from "@/lib/political-profiles"

export async function POST(req: NextRequest) {
  try {
    const { position, politicalIdentity, politicalValues, yourIdentity, yourValues } = await req.json()

    if (!position || !politicalIdentity || politicalIdentity === "unsure") {
      return NextResponse.json({ error: "Position and political identity required" }, { status: 400 })
    }

    const profile = POLITICAL_PROFILES[politicalIdentity as PoliticalIdentity]

    const crossPoliticalGuidance =
      yourIdentity !== "unsure" && yourIdentity !== politicalIdentity
        ? getPoliticalGuidance(
            politicalIdentity as PoliticalIdentity,
            yourIdentity as PoliticalIdentity,
            politicalValues || [],
            yourValues || [],
          )
        : ""

    const prompt = `You are a political psychology expert helping people understand the moral frameworks and worldviews that underlie political positions.

${crossPoliticalGuidance ? `**Cross-Political Context:**\n${crossPoliticalGuidance}\n\n` : ""}

A person with ${profile.name} political identity has expressed this position:

"${position}"

${politicalValues && politicalValues.length > 0 && !politicalValues.includes("none") ? `Their specific values include: ${politicalValues.join(", ")}\n` : ""}
${yourIdentity !== "unsure" ? `\nYou are explaining this to someone who identifies as ${yourIdentity}.${yourValues && yourValues.length > 0 && !yourValues.includes("none") ? ` Their values include: ${yourValues.join(", ")}` : ""} Tailor your explanation to help them understand how this position differs from their moral framework and where bridge-building might be possible.\n` : ""}

Your task is to explain the INTERNAL LOGIC of this position from within their moral framework. Do NOT judge or critique the position. Instead, help someone from a different worldview understand:

1. **Underlying Moral Framework**: What moral metaphors and worldview make this position internally consistent? Reference concepts like Strict Father vs. Nurturant Parent morality (from George Lakoff) and Moral Foundations Theory.

2. **Core Values at Play**: What specific values drive this position? Examples: personal responsibility, sanctity of life, individual liberty, community care, justice, order, autonomy, fairness, loyalty, etc.

3. **Why They Believe What They Believe**: Walk through their reasoning step-by-step. Show how their position follows logically from their values and worldview, even if it seems contradictory from outside.

4. **Common Misunderstandings**: Where do people from other worldviews typically misinterpret this position? What are they missing about the underlying framework?${yourIdentity !== "unsure" ? ` Specifically address how someone from a ${yourIdentity} perspective might misunderstand this.` : ""}

5. **Bridging Questions**: Suggest 4-5 genuine, curious questions someone could ask to understand this worldview better.${yourIdentity !== "unsure" ? ` Frame these questions in a way that a ${yourIdentity} person might ask them.` : ""}

Respond ONLY with valid JSON (no markdown, no code blocks, just the raw JSON object). Use this exact structure:
{
  "moralFramework": "string with 2-3 paragraphs",
  "underlyingValues": "string with 1-2 paragraphs",
  "whyTheyBelieve": "string with 2-3 paragraphs",
  "commonMisunderstandings": "string with 1-2 paragraphs",
  "bridgingQuestions": ["question 1", "question 2", "question 3", "question 4", "question 5"]
}

IMPORTANT: Ensure all text is properly escaped for JSON. Do not include line breaks within the strings - use spaces instead. Your entire response must be valid, parseable JSON.`

    const { text } = await generateText({
      model: "openai/gpt-4o",
      prompt,
      maxTokens: 2000,
    })

    let cleanedText = text.trim()

    // Remove markdown code blocks if present
    cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "")

    // Extract JSON object
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error("[v0] No JSON found in response:", text)
      throw new Error("Failed to extract JSON from response")
    }

    let analysis
    try {
      analysis = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      console.error("[v0] Attempted to parse:", jsonMatch[0])
      throw new Error("Failed to parse JSON response")
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in politalk-explore:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze position" },
      { status: 500 },
    )
  }
}
