# Clarity Coach - Phase 4: Voice & Communication Medium Intelligence

## Overview
Phase 4 transforms Clarity Coach from a text-only tool into a conversational AI coach that can conduct voice conversations and provide intelligent recommendations about which communication medium to use.

## 4A: Voice Conversations

### Core Features

#### 1. Voice Input/Output System
- **Real-time speech-to-text** using Web Speech API or OpenAI Whisper
- **Text-to-speech output** using browser TTS or ElevenLabs for natural voice
- **Conversation flow:**
  1. User speaks their draft message or situation
  2. AI asks clarifying questions (voice)
  3. User responds (voice)
  4. AI provides translation and explanation (voice)
  5. Written transcript + email delivery

#### 2. Voice-Enabled Modes
- **Draft Mode Voice:** Speak your message, AI refines it conversationally
- **Analyze Mode Voice:** Describe a conversation, AI analyzes verbally
- **Chat Mode Voice:** Full voice conversation with AI coach

#### 3. Conversation Transcript & Email
- Auto-save conversation transcript to user account
- Email summary including:
  - Full conversation transcript
  - Final translation/recommendation
  - Key insights from AI
  - Action items

### Technical Implementation

**Speech-to-Text Options:**
1. **Web Speech API** (Free, browser-native)
   - Pros: Free, no API calls, works offline
   - Cons: Limited browser support, less accurate
   
2. **OpenAI Whisper API** (Paid, via Vertex AI or direct)
   - Pros: Highly accurate, supports many languages
   - Cons: API costs, requires backend processing

3. **Google Cloud Speech-to-Text** (Your free credits!)
   - Pros: Uses your existing Google Cloud credits
   - Cons: Needs setup

**Text-to-Speech Options:**
1. **Browser Web Speech API** (Free)
   - Simple, no API calls
   
2. **ElevenLabs** (Premium voices)
   - Natural, emotional voices
   - $5-$99/month

3. **Google Cloud Text-to-Speech** (Your free credits!)
   - High quality, uses your credits

**Recommended Stack:**
- Google Cloud Speech-to-Text (uses your free credits)
- Google Cloud Text-to-Speech (uses your free credits)
- Gemini 2.5 Flash for conversation management
- Resend API for email delivery (already configured)

### User Experience Flow

\`\`\`
┌─────────────────────────────────────┐
│  User clicks "Start Voice Session"  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   🎤 "Tell me about the message     │
│       you want to draft..."         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  User speaks: "I need to tell my    │
│  boss I can't meet the deadline..." │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   🔊 "I understand. Who is your     │
│   boss and what's your relationship │
│   like with them?"                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  User: "She's supportive but        │
│  values accountability..."          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   🔊 "Here's what I recommend..."   │
│   [Provides translation & advice]   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   ✉️ Transcript emailed to you      │
│   💾 Saved to conversation history  │
└─────────────────────────────────────┘
\`\`\`

---

## 4B: Communication Medium Recommendations

### Core Features

#### Medium Intelligence System
AI analyzes the content and provides recommendation:

**Output Format:**
\`\`\`
📱 RECOMMENDED MEDIUM: Video Call

WHY:
✓ Emotional topic requiring empathy
✓ Complex issue needing real-time clarification  
✓ Strong relationship that benefits from face-to-face
✗ Not urgent enough to require in-person

ALTERNATIVE: In-person conversation if timing allows

💡 CONVERSATION TIPS:
• Start by acknowledging their perspective
• Use "I feel" statements to express your needs
• Listen for their concerns before proposing solutions
• Watch for non-verbal cues about their comfort level
• End with clear next steps and follow up in writing
\`\`\`

#### Recommendation Factors

1. **Emotional Sensitivity**
   - High emotion → Voice/Video/In-Person
   - Low emotion → Email acceptable

2. **Complexity & Back-and-Forth**
   - High complexity → Voice/Video
   - Simple updates → Email

3. **Relationship Dynamics**
   - Close relationship + sensitive topic → In-Person/Video
   - Professional/distant → Email/Phone

4. **Urgency**
   - High urgency → Phone/In-Person
   - Low urgency → Email

5. **Tone & Body Language Needs**
   - Needs to read reactions → Video/In-Person
   - Straightforward info → Email

6. **Documentation Needs**
   - Needs written record → Email (+ follow-up after voice)
   - Informal → Voice

#### UI Integration

**Add to all three modes:**
- Draft: Shows recommendation after generating translation
- Analyze: Shows recommendation as part of analysis
- Chat: Can ask "Should this be an email or voice conversation?"

**Display Design:**
\`\`\`
┌────────────────────────────────────────┐
│  📊 MEDIUM RECOMMENDATION              │
├────────────────────────────────────────┤
│  🎥 Best: Video Call                   │
│  ✅ Good: In-Person                    │
│  ⚠️  Risky: Email (may feel impersonal)│
│                                        │
│  This topic involves [reasons...]      │
└────────────────────────────────────────┘
\`\`\`

### Technical Implementation

**AI Prompt Enhancement:**
Add to all mode prompts:
\`\`\`
Additionally, recommend the best communication medium for this message:
- Email
- Phone Call
- Video Chat
- In-Person Meeting

Consider:
1. Emotional sensitivity
2. Complexity requiring clarification
3. Relationship dynamics
4. Urgency
5. Need for tone/body language
6. Documentation requirements

Provide your recommendation with reasoning.
\`\`\`

**Response Schema:**
\`\`\`typescript
interface ClarityResponse {
  // Existing fields...
  mediumRecommendation: {
    primary: 'email' | 'phone' | 'video' | 'in-person'
    alternatives: Array<'email' | 'phone' | 'video' | 'in-person'>
    reasoning: string
    factors: {
      emotionalSensitivity: 'low' | 'medium' | 'high'
      complexity: 'low' | 'medium' | 'high'
      urgency: 'low' | 'medium' | 'high'
      relationshipCloseness: 'distant' | 'professional' | 'close'
    }
    conversationTips?: string[] // Only present when primary is phone/video/in-person
  }
}
\`\`\`

---

## Implementation Priority

### 4B First (Easier, High Value)
- Can be added quickly to existing modes
- Just requires prompt updates + UI component
- Provides immediate value
- No new infrastructure needed

### 4A Second (Complex, High Impact)
- Requires voice infrastructure setup
- Google Cloud Speech APIs (use your credits!)
- Email delivery system (already have Resend)
- More complex UI/UX
- Game-changing feature once built

---

## Estimated Development Time

**Phase 4B: Medium Recommendations**
- Prompt updates: 2-4 hours
- UI components: 4-6 hours
- Testing: 2-3 hours
- **Total: ~1-2 days**

**Phase 4A: Voice Conversations**
- Google Cloud Speech setup: 4-6 hours
- Voice UI components: 8-12 hours
- Conversation flow logic: 8-12 hours
- Email integration: 3-4 hours
- Testing & polish: 6-8 hours
- **Total: ~1-2 weeks**

---

## User Value

**Medium Recommendations:**
- Prevents communication mode mismatches
- Reduces conflict from wrong medium choice
- Educates users on communication best practices

**Voice Conversations:**
- More accessible (speaking vs typing)
- Natural conversational coaching
- Faster than typing long explanations
- Better for mobile users
- Written record via email

---

## Next Steps

1. Finish Phase 1 (Cleanup) ✓
2. Complete Phase 2 (Leadership Leader Alpha 0.2)
3. Complete Phase 3 (Other Services)
4. **Phase 4B:** Add Medium Recommendations (quick win!)
5. **Phase 4A:** Build Voice Conversation System (major feature)
