export type PoliticalIdentity = "progressive" | "liberal" | "moderate" | "conservative" | "libertarian" | "unsure"
export type PoliticalValue =
  | "anti-establishment"
  | "populist"
  | "traditional-conservative"
  | "social-justice"
  | "economic-freedom"
  | "law-and-order"
  | "environmentalist"
  | "religious-values"
  | "secular-humanist"
  | "nationalist"
  | "globalist"
  | "none"

export interface PoliticalProfile {
  name: string
  description: string
  communicationPatterns: string[]
  values: string[]
  dogwhistles: string[]
}

export interface PoliticalValueProfile {
  name: string
  description: string
  communicationNotes: string[]
}

export const POLITICAL_PROFILES: Record<PoliticalIdentity, PoliticalProfile> = {
  progressive: {
    name: "Progressive",
    description: "Prioritizes social justice, equity, and systemic change",
    communicationPatterns: [
      "Uses identity-first language and emphasizes inclusivity",
      "Focuses on systemic issues and structural inequality",
      "Values lived experience and intersectional perspectives",
      "May use academic or activist terminology",
    ],
    values: ["Equity", "Justice", "Inclusion", "Empathy", "Community care", "Liberation"],
    dogwhistles: ["Woke", "Identity politics", "Cancel culture", "Virtue signaling"],
  },
  liberal: {
    name: "Liberal",
    description: "Emphasizes individual rights, fairness, and incremental reform",
    communicationPatterns: [
      "Focuses on individual rights and equal opportunity",
      "Values evidence-based policy and expert consensus",
      "Emphasizes compassion and social responsibility",
      "Appeals to fairness and universal principles",
    ],
    values: ["Fairness", "Rights", "Opportunity", "Compassion", "Progress", "Democracy"],
    dogwhistles: ["Coastal elites", "Out of touch", "Tax and spend", "Big government"],
  },
  moderate: {
    name: "Moderate/Centrist",
    description: "Seeks pragmatic solutions and common ground",
    communicationPatterns: [
      "Emphasizes practical solutions over ideology",
      "Values compromise and bipartisan cooperation",
      "Focuses on economic stability and incremental change",
      "May express frustration with 'extremes on both sides'",
    ],
    values: ["Pragmatism", "Compromise", "Stability", "Common sense", "Unity", "Balance"],
    dogwhistles: ["Both sides", "Common sense", "Silent majority"],
  },
  conservative: {
    name: "Conservative",
    description: "Prioritizes tradition, order, and limited government",
    communicationPatterns: [
      "Emphasizes personal responsibility and self-reliance",
      "Values tradition, faith, and established institutions",
      "Focuses on moral character and individual accountability",
      "May reference founding principles and constitutional originalism",
    ],
    values: ["Tradition", "Order", "Responsibility", "Faith", "Liberty", "Family"],
    dogwhistles: ["Real Americans", "Traditional values", "Law and order", "Inner city"],
  },
  libertarian: {
    name: "Libertarian",
    description: "Prioritizes individual liberty and minimal government",
    communicationPatterns: [
      "Emphasizes individual freedom and personal choice",
      "Values free markets and voluntary association",
      "Focuses on limiting government power",
      "May reference economic and civil liberties equally",
    ],
    values: ["Liberty", "Autonomy", "Free markets", "Non-aggression", "Voluntary exchange"],
    dogwhistles: ["Nanny state", "Statist", "Overreach"],
  },
  unsure: {
    name: "Unsure",
    description: "Political identity unknown or mixed",
    communicationPatterns: [],
    values: [],
    dogwhistles: [],
  },
}

export const POLITICAL_VALUES: Record<PoliticalValue, PoliticalValueProfile> = {
  "anti-establishment": {
    name: "Anti-Establishment",
    description: "Skeptical of traditional political institutions and elite consensus",
    communicationNotes: [
      "Questions mainstream narratives and 'expert' authority",
      "Uses rhetoric about 'draining the swamp' or 'fighting the system'",
      "May distrust mainstream media and institutional sources",
      "Values authenticity and 'telling it like it is' over diplomatic language",
    ],
  },
  populist: {
    name: "Populist",
    description: "Emphasizes 'ordinary people' vs. corrupt elites",
    communicationNotes: [
      "Frames issues as 'us vs. them' (people vs. elites)",
      "Appeals to common sense and everyday experience",
      "May use 'real Americans' or 'working families' language",
      "Skeptical of complex policy explanations",
    ],
  },
  "traditional-conservative": {
    name: "Traditional Conservative",
    description: "Emphasizes established institutions, gradual change, and civic norms",
    communicationNotes: [
      "Values institutional respect and procedural norms",
      "Emphasizes constitutional principles and founding documents",
      "Prefers incremental reform over radical change",
      "Uses formal, respectful political discourse",
    ],
  },
  "social-justice": {
    name: "Social Justice Focused",
    description: "Prioritizes equity, systemic change, and marginalized voices",
    communicationNotes: [
      "Centers intersectionality and lived experience",
      "Uses identity-conscious language (BIPOC, LGBTQ+, etc.)",
      "Emphasizes systemic oppression and structural inequality",
      "May use academic or activist terminology",
    ],
  },
  "economic-freedom": {
    name: "Economic Freedom",
    description: "Prioritizes free markets, entrepreneurship, and limited regulation",
    communicationNotes: [
      "Focuses on economic growth and job creation",
      "Emphasizes individual opportunity and success",
      "Skeptical of government intervention in markets",
      "Uses business and economic language",
    ],
  },
  "law-and-order": {
    name: "Law and Order",
    description: "Emphasizes public safety, strong enforcement, and respect for authority",
    communicationNotes: [
      "Prioritizes crime prevention and punishment",
      "Strong support for police and military",
      "May use 'tough on crime' language",
      "Values clear rules and consequences",
    ],
  },
  environmentalist: {
    name: "Environmentalist",
    description: "Prioritizes climate action and ecological protection",
    communicationNotes: [
      "Emphasizes climate urgency and environmental justice",
      "Uses scientific data and expert consensus",
      "May frame issues in moral/existential terms",
      "Values sustainability and future generations",
    ],
  },
  "religious-values": {
    name: "Religious/Faith-Based Values",
    description: "Guided by religious principles and faith community",
    communicationNotes: [
      "References scripture or religious teachings",
      "Emphasizes moral character and spiritual growth",
      "Values faith community and religious freedom",
      "May see politics through theological lens",
    ],
  },
  "secular-humanist": {
    name: "Secular Humanist",
    description: "Emphasizes reason, science, and human flourishing without religion",
    communicationNotes: [
      "Appeals to evidence, data, and rational argument",
      "Values separation of church and state",
      "Focuses on human rights and dignity",
      "Skeptical of religious justifications in policy",
    ],
  },
  nationalist: {
    name: "Nationalist",
    description: "Prioritizes national sovereignty and cultural identity",
    communicationNotes: [
      "Emphasizes borders, immigration control, and national security",
      "Values cultural cohesion and national traditions",
      "Skeptical of international agreements and globalization",
      "Uses 'America First' or similar framing",
    ],
  },
  globalist: {
    name: "Globalist/Internationalist",
    description: "Values international cooperation and interconnectedness",
    communicationNotes: [
      "Emphasizes shared global challenges",
      "Values international institutions and agreements",
      "Sees issues through lens of global interdependence",
      "May reference universal human rights",
    ],
  },
  none: {
    name: "None Selected",
    description: "No specific political values selected",
    communicationNotes: [],
  },
}

export function getPoliticalGuidance(
  senderIdentity: PoliticalIdentity,
  receiverIdentity: PoliticalIdentity,
  senderValues: PoliticalValue[] = [],
  receiverValues: PoliticalValue[] = [],
): string {
  if (senderIdentity === "unsure" || receiverIdentity === "unsure") {
    return "Without knowing the political identities, I'll focus on general principles of civil discourse."
  }

  const sender = POLITICAL_PROFILES[senderIdentity]
  const receiver = POLITICAL_PROFILES[receiverIdentity]

  let guidance = `
**Cross-Political Communication Guidance**

**From ${sender.name} to ${receiver.name}:**

${sender.name} communicators typically:
${sender.communicationPatterns.map((p) => `- ${p}`).join("\n")}

${receiver.name} communicators value:
${receiver.values.map((v) => `- ${v}`).join(", ")}
  `.trim()

  if (senderValues.length > 0 && !senderValues.includes("none")) {
    const valuesText = senderValues
      .filter((v) => v !== "none")
      .map((v) => {
        const profile = POLITICAL_VALUES[v]
        return `**${profile.name}:** ${profile.communicationNotes.join(" ")}`
      })
      .join("\n\n")

    guidance += `\n\n**Your Communication Values:**\n${valuesText}`
  }

  if (receiverValues.length > 0 && !receiverValues.includes("none")) {
    const valuesText = receiverValues
      .filter((v) => v !== "none")
      .map((v) => {
        const profile = POLITICAL_VALUES[v]
        return `**${profile.name}:** ${profile.communicationNotes.join(" ")}`
      })
      .join("\n\n")

    guidance += `\n\n**Their Communication Values:**\n${valuesText}`
  }

  guidance += `

**Bridge-Building Strategies:**
- Find shared values (e.g., desire for community wellbeing, personal freedom, fairness)
- Avoid dogwhistles and coded language that trigger defensiveness
- Ask questions to understand their underlying concerns, not just positions
- Acknowledge legitimate differences in moral foundations
- Focus on specific, concrete outcomes rather than abstract ideology
  `.trim()

  return guidance
}

export function getPoliticalIdentityGuidance(identity: PoliticalIdentity, values: PoliticalValue[] = []): string {
  if (identity === "unsure") {
    return "Political identity not specified."
  }

  const profile = POLITICAL_PROFILES[identity]

  let guidance = `
**${profile.name} Communication Profile:**

${profile.description}

**Typical Communication Patterns:**
${profile.communicationPatterns.map((p) => `- ${p}`).join("\n")}

**Core Values:**
${profile.values.map((v) => `- ${v}`).join(", ")}

**Common Dogwhistles to Avoid:**
${profile.dogwhistles.length > 0 ? profile.dogwhistles.map((d) => `- "${d}"`).join(", ") : "None specified"}
  `.trim()

  if (values.length > 0 && !values.includes("none")) {
    const valuesText = values
      .filter((v) => v !== "none")
      .map((v) => {
        const valueProfile = POLITICAL_VALUES[v]
        return `**${valueProfile.name}:** ${valueProfile.description}\n${valueProfile.communicationNotes.map((n) => `  - ${n}`).join("\n")}`
      })
      .join("\n\n")

    guidance += `\n\n**Additional Communication Values:**\n${valuesText}`
  }

  return guidance
}

export function getPoliticalValuesGuidance(values: PoliticalValue[]): string {
  if (!values || values.length === 0 || values.includes("none")) {
    return ""
  }

  const filteredValues = values.filter((v) => v !== "none")

  if (filteredValues.length === 0) {
    return ""
  }

  return filteredValues
    .map((v) => {
      const profile = POLITICAL_VALUES[v]
      return `**${profile.name}:** ${profile.description}\n${profile.communicationNotes.map((n) => `  - ${n}`).join("\n")}`
    })
    .join("\n\n")
}
