import { checkContentSafety, type SafetyCheckResult } from "./content-safety"

/**
 * Validate AI output for safety issues
 * Ensures the AI doesn't provide harmful advice
 */
export function validateOutput(output: string, audience = "adult-to-adult"): SafetyCheckResult {
  // Check for harmful advice patterns
  const harmfulAdvicePatterns = [
    /you should (hurt|harm|kill)/i,
    /it's okay to (hurt|harm|attack)/i,
    /try (cutting|overdosing|suicide)/i,
    /here's how to (make a bomb|hurt someone)/i,
  ]

  for (const pattern of harmfulAdvicePatterns) {
    if (pattern.test(output)) {
      return {
        isSafe: false,
        category: "violence",
        severity: "critical",
        message: "AI output contained harmful advice",
        shouldBlock: true,
      }
    }
  }

  // Check if crisis resources are mentioned when they should be
  const hasCrisisLanguage = /\b(suicide|self-harm|kill myself|want to die)\b/i.test(output)
  const hasCrisisResources = /988|crisis text line|741741/i.test(output)

  if (hasCrisisLanguage && !hasCrisisResources) {
    return {
      isSafe: false,
      category: "crisis",
      severity: "high",
      message: "AI discussed crisis topics without providing resources",
      shouldBlock: true,
    }
  }

  // Run standard content safety check
  return checkContentSafety(output, audience)
}
