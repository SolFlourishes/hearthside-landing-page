# Conversation Tips Feature - Design Guide

## Overview
When Clarity Coach recommends a verbal medium (phone, video, or in-person), it provides actionable conversation tips to help the user navigate the conversation successfully.

## When to Show Tips

**Show conversation tips when:**
- Primary recommendation is: Phone Call, Video Chat, or In-Person
- The conversation involves emotional sensitivity, conflict, or complexity
- The user might benefit from structured guidance

**Don't show tips when:**
- Primary recommendation is Email (provide writing tips instead)
- Conversation is straightforward with low emotional stakes

## Types of Conversation Tips

### 1. Opening Strategies
- How to start the conversation
- Setting the right tone
- Acknowledging the other person's perspective

**Examples:**
- "Start by thanking them for making time to talk"
- "Acknowledge that this might be difficult to hear"
- "Begin with your shared goals before addressing disagreements"

### 2. Communication Techniques
- Active listening cues
- "I" statements vs "You" accusations
- Asking clarifying questions
- Validating emotions

**Examples:**
- "Use 'I feel' statements instead of 'You always...'"
- "Pause to ask 'What are your thoughts?' before proposing solutions"
- "Reflect back what you hear: 'So it sounds like you're concerned about...'"

### 3. Non-Verbal Awareness (Video/In-Person)
- Reading body language
- Managing your own non-verbals
- Creating psychological safety

**Examples:**
- "Watch for crossed arms or breaking eye contact as signs of discomfort"
- "Maintain open body language and occasional eye contact"
- "If you notice tension, pause and check in: 'Are you comfortable continuing?'"

### 4. De-escalation Tactics
- Managing emotional reactions
- Taking breaks when needed
- Reframing conflicts

**Examples:**
- "If emotions run high, suggest a 5-minute break to gather thoughts"
- "Reframe disagreements as shared problems: 'How can we solve this together?'"
- "Acknowledge valid points even when you disagree overall"

### 5. Closing & Follow-Up
- Summarizing agreements
- Setting next steps
- Documentation after verbal conversations

**Examples:**
- "End by summarizing what you both agreed to"
- "Set a specific date for the next check-in"
- "Follow up with a brief email confirming what you discussed"

## AI Prompt Enhancement

Add to all mode prompts when generating medium recommendations:

\`\`\`
If you recommend a verbal medium (phone, video, or in-person), provide 3-5 specific conversation tips tailored to this situation. Tips should cover:
1. How to open the conversation effectively
2. Communication techniques to use (active listening, I-statements, etc.)
3. Non-verbal cues to watch for (if video/in-person)
4. De-escalation tactics if emotions run high
5. How to close the conversation and follow up

Make tips specific to the context, not generic advice.
\`\`\`

## UI Design

### Conversation Tips Card

\`\`\`
┌─────────────────────────────────────────────┐
│  💡 CONVERSATION TIPS                       │
├─────────────────────────────────────────────┤
│  ✓ Start by acknowledging their heavy       │
│    workload before discussing the timeline  │
│                                             │
│  ✓ Use "I'm concerned about..." rather than │
│    "You didn't plan properly"               │
│                                             │
│  ✓ Watch for signs of defensiveness (tense  │
│    shoulders, short responses) and pause to │
│    validate their perspective               │
│                                             │
│  ✓ If they push back, ask "What would make  │
│    this work for you?" to collaborate       │
│                                             │
│  ✓ End with clear next steps and send a     │
│    follow-up email confirming the new plan  │
└─────────────────────────────────────────────┘
\`\`\`

### Placement
- Show immediately after medium recommendation
- Collapsible section if user wants to hide it
- Option to email the tips to user along with translation

## Example Scenarios

### Scenario 1: Difficult Conversation with Boss
**Situation:** Need to tell boss you can't meet deadline  
**Medium:** Video Call  
**Tips Provided:**
1. "Start with context: 'I want to be upfront about the timeline so we can plan together'"
2. "Use specific examples of what's blocking progress, not vague excuses"
3. "Watch for frustration signals and acknowledge them: 'I know this creates challenges for you'"
4. "Propose a solution before they have to: 'Here's what I can deliver by when'"
5. "End with commitment: 'I'll send you a revised timeline today'"

### Scenario 2: Giving Critical Feedback to Peer
**Situation:** Team member's work quality dropping  
**Medium:** In-Person  
**Tips Provided:**
1. "Choose a private setting and ask if they have 15 minutes to talk"
2. "Lead with care: 'I noticed some changes and wanted to check in with you'"
3. "Focus on specific behaviors, not character: 'The last two reports had incomplete data'"
4. "Create safety to share: 'Is everything okay? Can I support you somehow?'"
5. "Follow up in a few days to see how they're doing"

### Scenario 3: Negotiating with Client
**Situation:** Client wants more work for same price  
**Medium:** Phone Call  
**Tips Provided:**
1. "Start with appreciation: 'I value our partnership and want to find something that works'"
2. "Be clear about boundaries without being defensive: 'Here's what's included in the current scope'"
3. "Listen for the underlying need: Are they budget-constrained or unclear on value?"
4. "Offer alternatives: 'We could do X within budget, or Y with an additional investment'"
5. "Give them time to decide: 'Take a day to think it over and let me know'"

## Implementation Considerations

### Context-Aware Tips
Tips should vary based on:
- **Relationship** (boss vs peer vs direct report)
- **Emotional stakes** (high conflict vs routine update)
- **Power dynamics** (asking for something vs giving feedback)
- **Communication style** (their preferred style from profile)

### Personalization
Use Clarity Coach profile data when available:
- User's communication style
- Recipient's known communication preferences
- Past conversation history
- Cultural context

### Learn & Improve
Track which tips users find helpful:
- "Was this tip helpful?" thumbs up/down
- Use feedback to improve tip generation
- Build library of proven effective tips

## Success Metrics

- % of users who view conversation tips
- % who email tips to themselves
- Feedback ratings on tip helpfulness
- Correlation between tip usage and conversation success (survey)

## Development Effort

- Prompt engineering: 3-4 hours
- UI component: 4-6 hours
- Testing with various scenarios: 3-4 hours
- **Total: ~1-1.5 days**

Can be built as part of Phase 3 (Medium Recommendations) without adding significant time.
