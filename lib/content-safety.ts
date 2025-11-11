/**
 * Content Safety System for Clarity Coach
 * Multi-layered approach to protect users from harmful content
 */

export interface SafetyCheckResult {
  isSafe: boolean
  category?: "crisis" | "self-harm" | "violence" | "illegal" | "sexual" | "harassment" | "age-inappropriate"
  severity: "low" | "medium" | "high" | "critical"
  message?: string
  resources?: CrisisResource[]
  shouldBlock: boolean
}

export interface CrisisResource {
  name: string
  phone: string
  text?: string
  website: string
  description: string
  available: string
}

// Crisis resources that should be shown immediately
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    text: "Text 988",
    website: "https://988lifeline.org",
    description: "Free, confidential support 24/7 for people in distress",
    available: "24/7",
  },
  {
    name: "Crisis Text Line",
    phone: "",
    text: "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    description: "Free, 24/7 support via text message",
    available: "24/7",
  },
  {
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    text: "Text START to 88788",
    website: "https://www.thehotline.org",
    description: "Support for domestic violence situations",
    available: "24/7",
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    description: "Treatment referral and information service for mental health and substance use",
    available: "24/7",
  },
]

const CRISIS_PATTERNS = [
  // Immediate danger - self-harm with intent
  /\b(going to (die|kill myself|end (it|my life)) (tonight|today|now|soon))\b/i,
  /\b(plan to (die|kill myself))\b/i,
  /\b(goodbye (forever|cruel world))\b/i,

  // Self-harm ideation (support but don't block)
  /\b(want to (die|kill myself|end (it|my life)))\b/i,
  /\b(suicidal thoughts|thinking about suicide)\b/i,
  /\b(cutting myself|self harm|self-harm)\b/i,
  /\b(no reason to live|better off dead)\b/i,

  // Violence toward others with intent
  /\b(going to (kill|hurt|attack) (someone|them|him|her))\b/i,
  /\b(plan to (attack|shoot|stab))\b/i,
]

const LEGITIMATE_SENSITIVE_TOPICS = [
  /\b(being bullied|bullying me|kids are mean)\b/i,
  /\b(parents (fighting|arguing|divorcing))\b/i,
  /\b(scared|afraid|anxious|worried)\b/i,
  /\b(don't fit in|feel different|feel alone)\b/i,
  /\b(coming out|lgbtq|gay|trans|identity)\b/i,
  /\b(grief|loss|died|passed away)\b/i,
  /\b(struggling with|having trouble with)\b/i,
  /\b(mental health|therapy|counselor)\b/i,
]

// Patterns that indicate concerning content (should be flagged but not necessarily blocked)
const CONCERNING_PATTERNS = [
  // Mental health struggles
  /\b(depressed|depression|anxious|anxiety|panic attack)\b/i,
  /\b(can't cope|overwhelmed|breaking down)\b/i,
  /\b(therapy|therapist|counselor|psychiatrist)\b/i,

  // Substance use
  /\b(drinking too much|drug use|addiction)\b/i,

  // Relationship issues
  /\b(abusive relationship|toxic relationship)\b/i,
  /\b(controlling|manipulative|gaslighting)\b/i,
]

// Patterns for illegal activities
const ILLEGAL_PATTERNS = [
  /\b(how to (make|build) (a bomb|explosives))\b/i,
  /\b(buy (drugs|weapons) (online|illegally))\b/i,
  /\b(hack into|steal (credit cards|identity))\b/i,
  /\b(child (abuse|exploitation|pornography))\b/i,
]

// Patterns for sexual/inappropriate content
const SEXUAL_PATTERNS = [
  /\b(explicit sexual|pornographic|nude photos)\b/i,
  /\b(sexual (harassment|assault|abuse))\b/i,
  /\b(sexting|dick pic|send nudes)\b/i,
]

// Age-inappropriate content for Clarity Coach Jr.
const AGE_INAPPROPRIATE_PATTERNS = [
  /\b(sex|sexual|porn|pornography)\b/i,
  /\b(drugs|marijuana|cocaine|meth)\b/i,
  /\b(alcohol|drinking|drunk|wasted)\b/i,
  /\b(violence|violent|kill|murder)\b/i,
]

/**
 * Check content for safety issues with trauma-informed approach
 */
export function checkContentSafety(content: string, audience = "adult-to-adult"): SafetyCheckResult {
  const lowerContent = content.toLowerCase()

  for (const pattern of LEGITIMATE_SENSITIVE_TOPICS) {
    if (pattern.test(content)) {
      // This is a legitimate difficult topic - allow it
      return {
        isSafe: true,
        severity: "low",
        shouldBlock: false,
        message: "This is a sensitive topic. I'm here to help you think through how to communicate about it.",
      }
    }
  }

  // Check for crisis situations (provide resources but don't block unless immediate danger)
  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(content)) {
      const isImmediateDanger = /\b(going to|plan to|tonight|today|now|soon|goodbye forever)\b/i.test(content)

      return {
        isSafe: !isImmediateDanger,
        category: content.match(/\b(suicide|kill myself|die)\b/i) ? "self-harm" : "violence",
        severity: isImmediateDanger ? "critical" : "high",
        message: isImmediateDanger
          ? "I'm very concerned about your immediate safety. Please reach out to crisis support right now."
          : "I hear that you're going through something really difficult. Let me share some resources that can help.",
        resources: CRISIS_RESOURCES,
        shouldBlock: false, // Never block - always allow conversation with resources
      }
    }
  }

  // Check for illegal activities
  for (const pattern of ILLEGAL_PATTERNS) {
    if (pattern.test(content)) {
      return {
        isSafe: false,
        category: "illegal",
        severity: "high",
        message:
          "This content appears to involve illegal activities. Clarity Coach cannot provide assistance with illegal activities.",
        shouldBlock: true,
      }
    }
  }

  // Check for sexual/inappropriate content
  for (const pattern of SEXUAL_PATTERNS) {
    if (pattern.test(content)) {
      return {
        isSafe: false,
        category: "sexual",
        severity: "high",
        message:
          "This content contains inappropriate sexual content. Clarity Coach is designed for communication coaching, not sexual content.",
        shouldBlock: true,
      }
    }
  }

  // Check age-appropriate content for Clarity Coach Jr.
  if (audience !== "adult-to-adult") {
    for (const pattern of AGE_INAPPROPRIATE_PATTERNS) {
      if (pattern.test(content)) {
        return {
          isSafe: false,
          category: "age-inappropriate",
          severity: "high",
          message:
            "This content may not be appropriate for Clarity Coach Junior. Please switch to Adult mode or rephrase your message.",
          shouldBlock: true,
        }
      }
    }
  }

  // Check for concerning patterns (flag but don't block)
  for (const pattern of CONCERNING_PATTERNS) {
    if (pattern.test(content)) {
      return {
        isSafe: true,
        category: "crisis",
        severity: "medium",
        message:
          "It sounds like you may be going through a difficult time. While Clarity Coach can help with communication, please consider reaching out to a mental health professional for additional support.",
        resources: CRISIS_RESOURCES.filter((r) => r.name.includes("988") || r.name.includes("SAMHSA")),
        shouldBlock: false,
      }
    }
  }

  // Content appears safe
  return {
    isSafe: true,
    severity: "low",
    shouldBlock: false,
  }
}

/**
 * Generate a trauma-informed, supportive response
 */
export function generateSafetyResponse(result: SafetyCheckResult): string {
  if (result.category === "crisis" || result.category === "self-harm" || result.category === "violence") {
    return `I hear that you're going through something really difficult right now. While I can help you think through how to communicate about what you're experiencing, I want to make sure you have support from people who are trained to help with crisis situations.

**These resources have trained counselors available right now:**

${result.resources
  ?.map(
    (r) => `
**${r.name}** (${r.available})
${r.phone ? `📞 ${r.phone}` : ""}
${r.text ? `💬 ${r.text}` : ""}
🌐 ${r.website}
`,
  )
  .join("\n")}

You don't have to go through this alone. These counselors are there specifically to help people in difficult situations like yours.

**If you'd like, we can also talk about:**
- How to reach out to a trusted adult about what you're experiencing
- Ways to communicate your feelings to someone who can help
- Strategies for getting through difficult moments

What would be most helpful for you right now?`
  }

  if (result.category === "illegal") {
    return `I cannot provide assistance with illegal activities. Clarity Coach is designed to help with communication and relationship challenges within legal and ethical boundaries.

If you're facing a difficult situation, please consider reaching out to:
- A trusted adult, counselor, or mentor
- Legal aid services in your area
- Law enforcement if you or someone else is in danger`
  }

  if (result.category === "sexual") {
    return `Clarity Coach is designed for communication coaching and cannot provide assistance with sexual content. 

If you're experiencing sexual harassment or assault, please reach out to:
- **RAINN National Sexual Assault Hotline**: 1-800-656-4673 or visit https://www.rainn.org
- Local law enforcement if you're in immediate danger
- A trusted counselor or therapist`
  }

  if (result.category === "age-inappropriate") {
    return `This topic may not be appropriate for Clarity Coach Junior mode. 

If you're an adult discussing adult topics, please switch to "Adult to Adult" mode.

If you're a young person with questions about sensitive topics, please talk to:
- A trusted parent or guardian
- A school counselor
- A healthcare provider

They can provide age-appropriate guidance and support.`
  }

  return result.message || "This content cannot be processed. Please rephrase your message."
}

/**
 * Add safety context to AI system prompts
 */
export function getSafetySystemPrompt(audience = "adult-to-adult"): string {
  const basePrompt = `
**CRITICAL SAFETY GUIDELINES:**

1. **Crisis Situations**: If the user mentions self-harm, suicide, violence, or abuse:
   - Express concern for their safety
   - Provide crisis resources (988 Lifeline, Crisis Text Line)
   - Encourage them to seek immediate professional help
   - Do NOT attempt to provide therapy or crisis counseling

2. **Professional Boundaries**: You are a communication coach, NOT:
   - A therapist or mental health professional
   - A medical doctor
   - A lawyer
   - A crisis counselor
   - Always encourage users to seek appropriate professional help for serious issues

3. **Illegal Activities**: Do NOT provide advice on:
   - How to harm others
   - How to engage in illegal activities
   - How to evade law enforcement
   - Anything that could cause harm

4. **Inappropriate Content**: Do NOT engage with:
   - Explicit sexual content
   - Harassment or bullying advice
   - Hate speech or discrimination
   - Child safety violations

5. **Scope of Service**: Focus on:
   - Communication strategies
   - Understanding different communication styles
   - Building healthy relationships
   - Conflict resolution within healthy boundaries
`

  if (audience !== "adult-to-adult") {
    return (
      basePrompt +
      `
6. **Age-Appropriate Content** (Clarity Coach Junior):
   - Use simple, age-appropriate language
   - Avoid adult topics (sex, drugs, violence, alcohol)
   - If a child mentions abuse or danger, provide crisis resources immediately
   - Encourage kids to talk to trusted adults about serious issues
   - Keep explanations positive and constructive
`
    )
  }

  return basePrompt
}
