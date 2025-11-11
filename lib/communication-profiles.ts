export type Neurotype = "Autism" | "ADHD" | "Neurotypical" | "Unsure"
export type Generation = "Boomer" | "Gen X" | "Xennial" | "Millennial" | "Gen Z" | "Gen Alpha" | "unsure"
export type RelationshipContext =
  | "boss"
  | "colleague"
  | "direct-report"
  | "client"
  | "friend"
  | "family"
  | "romantic-partner"
  | "teacher"
  | "student"
  | "stranger"
  | "other"

export const getNeurotypeGuidance = (neurotype: Neurotype): string => {
  switch (neurotype) {
    case "Autism":
      return `
**Autistic Communication Style:**
- Prefers explicit, literal language without ambiguity
- Values directness and precision over social niceties
- May miss or not prioritize social subtext and implied meanings
- Appreciates clear expectations and structured communication
- May interpret figurative language literally
- Values honesty even if socially uncomfortable
- May need extra processing time for complex social dynamics`

    case "ADHD":
      return `
**ADHD Communication Style:**
- May provide extensive context or tangential information
- Can jump between topics or struggle with linear organization
- May be highly direct when hyperfocused, or scattered when overwhelmed
- Often communicates with high energy and enthusiasm
- May interrupt or finish others' sentences due to racing thoughts
- Appreciates patience with tangents and non-linear thinking
- Can miss details in long messages; benefits from bullet points`

    case "Neurotypical":
      return `
**Neurotypical Communication Style:**
- Generally picks up on social subtext and implied meanings
- Comfortable with conventional social niceties and indirect language
- May use hints or suggestions rather than direct requests
- Expects others to "read between the lines"
- Values politeness protocols and relationship preservation
- May interpret very direct communication as rude or aggressive`

    case "Unsure":
      return `
**No Neurotype Specified:**
- Will analyze the actual communication style demonstrated in the message
- Will not make assumptions about neurological processing differences`
  }
}

export const getGenerationGuidance = (generation: Generation): string => {
  switch (generation) {
    case "Boomer":
      return `
**Baby Boomer Communication Context (1946-1964):**
- Values face-to-face or phone communication over text
- Expects formal greetings and closings in written communication
- May interpret brief messages as curt or disrespectful
- Appreciates detailed explanations and context
- Values hierarchy and titles in professional settings
- May be less comfortable with casual, emoji-heavy communication`

    case "Gen X":
      return `
**Gen X Communication Context (1965-1980):**
- Bridge generation: comfortable with both formal and informal styles
- Values efficiency but appreciates context when needed
- Skeptical of authority; prefers peer-to-peer communication
- Direct and pragmatic; dislikes unnecessary fluff
- Comfortable with email and text, but may prefer calls for complex topics
- May use dry humor or sarcasm that younger generations miss`

    case "Xennial":
      return `
**Xennial Communication Context (1977-1983):**
- Micro-generation with foot in both analog and digital worlds
- Highly adaptable; can code-switch between formal and casual
- Comfortable with all communication mediums
- Values authenticity but understands professional norms
- May over-explain to bridge generational gaps
- Appreciates both efficiency and relationship-building`

    case "Millennial":
      return `
**Millennial Communication Context (1981-1996):**
- Prefers text-based communication (email, messaging) over phone calls
- Values authenticity and transparency over corporate speak
- Comfortable with informal communication even in professional settings
- May use emojis to convey tone in text
- Expects quick responses and ongoing digital availability
- Values collaboration and consensus over top-down directives
- May soften requests with questions or qualifying language`

    case "Gen Z":
      return `
**Gen Z Communication Context (1997-2012):**
- Extremely comfortable with rapid, informal digital communication
- Prefers short, visual messages over long text
- Values directness and authenticity; dislikes performative professionalism
- May use humor, memes, or references to convey complex ideas
- Expects real-time communication and may perceive email as slow/formal
- Comfortable discussing mental health, boundaries, and identity openly
- May interpret formal language as insincere or out-of-touch`

    case "Gen Alpha":
      return `
**Gen Alpha Communication Context (2013-present):**
- Digital natives who have never known a world without smartphones
- Extremely visual communicators; may prefer video over text
- Values speed, brevity, and entertainment value in messages
- May have limited experience with formal communication norms
- Learning to navigate social nuance in digital spaces
- May need explicit guidance on context-appropriate communication`

    case "unsure":
      return `
**No Generation Specified:**
- Will analyze communication for generational markers
- Will not make assumptions about age-based preferences`
  }
}

export const getRelationshipGuidance = (relationship: RelationshipContext): string => {
  switch (relationship) {
    case "boss":
      return `
**Communicating with a Boss/Manager:**
- Power dynamics require extra care with tone and directness
- Consider their communication preferences and adapt accordingly
- Be clear about what you need while being respectful of their time
- Provide context for requests, but be concise
- Use "I statements" for concerns; avoid blaming language
- Acknowledge their perspective and constraints`

    case "colleague":
      return `
**Communicating with a Peer/Colleague:**
- Equal power dynamic allows for more direct collaboration
- Balance assertiveness with respect for their workload
- Can be more casual than with superiors, but maintain professionalism
- Collaborative tone: "we" language rather than "you" demands
- Okay to be direct about needs and boundaries`

    case "direct-report":
      return `
**Communicating with a Direct Report:**
- Your words carry extra weight due to power imbalance
- Be clear about expectations while being supportive
- Provide specific, actionable feedback rather than vague criticism
- Acknowledge their contributions and challenges
- Balance directiveness with autonomy and trust`

    case "client":
      return `
**Communicating with a Client:**
- Professional but warm tone; they're choosing to work with you
- Be responsive and proactive about updates
- Set clear expectations while being flexible to their needs
- Frame recommendations confidently but respect their autonomy
- Acknowledge concerns promptly and thoroughly`

    case "friend":
      return `
**Communicating with a Friend:**
- Informal, authentic communication is expected
- Can be more direct about feelings and needs
- Still important to be respectful, especially during conflict
- Can use humor and references to shared experiences
- Emotional honesty is valued over diplomatic language`

    case "family":
      return `
**Communicating with Family:**
- Complex dynamics with long history and patterns
- May need to navigate differing communication styles across generations
- Set boundaries while maintaining relationship
- Acknowledge family history while asserting adult autonomy
- May need to be more patient with explaining perspectives`

    case "romantic-partner":
      return `
**Communicating with a Romantic Partner:**
- High emotional stakes require extra care and clarity
- Use "I feel" statements rather than "you always" accusations
- Be vulnerable about needs while respecting theirs
- Acknowledge their perspective before stating disagreement
- Repair attempts during conflict are crucial`

    case "teacher":
      return `
**Communicating with a Teacher/Professor:**
- Respectful but can advocate for your needs
- Be clear about challenges while taking responsibility
- Ask for specific help rather than vague requests
- Acknowledge their expertise while expressing your perspective
- Professional tone with appropriate level of formality`

    case "student":
      return `
**Communicating with a Student:**
- Encourage questions and create psychological safety
- Be clear about expectations and reasoning behind them
- Provide specific, constructive feedback
- Acknowledge effort and progress, not just outcomes
- Balance authority with approachability`

    case "stranger":
      return `
**Communicating with a Stranger:**
- Polite, clear, and appropriately formal
- Don't assume shared context or understanding
- Be explicit about your needs and intentions
- Respect boundaries and social norms
- May need extra clarity since no relationship foundation exists`

    case "other":
      return `
**General Relationship Context:**
- Will analyze the power dynamics and emotional stakes from your description
- Will provide guidance appropriate to the specific situation you describe`
  }
}

export function getCommunicationArchetype(communicationStyle: any): string | null {
  if (!communicationStyle) return null

  const { formality, directness, detailLevel, emotionalExpression, conflictStyle } = communicationStyle

  // Calculate archetype based on quiz scores
  const avgDirectness = (directness + conflictStyle) / 2
  const avgDetail = detailLevel
  const avgEmotional = emotionalExpression

  // The Analyzer: Direct, concise, low emotional expression
  if (avgDirectness >= 4 && avgDetail <= 2 && avgEmotional <= 2) {
    return "The Analyzer"
  }

  // The Harmonizer: Indirect, high emotional expression, avoids conflict
  if (avgDirectness <= 2 && avgEmotional >= 4 && conflictStyle <= 2) {
    return "The Harmonizer"
  }

  // The Strategist: Thorough, detailed, methodical
  if (avgDetail >= 4 && formality >= 3) {
    return "The Strategist"
  }

  // The Advocate: Direct but collaborative, moderate emotional expression
  if (avgDirectness >= 3 && conflictStyle >= 3 && avgEmotional >= 3) {
    return "The Advocate"
  }

  // The Adapter: Balanced across dimensions
  return "The Adapter"
}
