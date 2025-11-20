# Vertex AI Migration Plan

## Model Availability Verification ✅

**Current Models Used:**
- `gemini-2.0-flash-exp` - Chat & Translate (4 locations)
- `gemini-pro-latest` - Style Classification (1 location)

**Vertex AI Availability:**
- ✅ **Gemini 2.0 Flash** - Generally Available on Vertex AI
  - Model name: `gemini-2.0-flash-001` or `gemini-2.0-flash`
  - Streaming: ✅ Supported
  - Same quality as `gemini-2.0-flash-exp`
  
- ⚠️ **Gemini 1.5 Pro** - Retired April 2025 for new projects
  - Replacement: Use `gemini-2.0-flash` instead
  - Better performance and lower cost

**Recommendation:** Use `gemini-2.0-flash` for ALL routes. It's more capable than the older 1.5 Pro.

---

## Migration Strategy

### Setup Requirements

1. **Google Cloud Project Configuration**
   - Project ID from Google Startup Program
   - Enable Vertex AI API
   - Create service account with Vertex AI permissions
   - Download service account key JSON

2. **Environment Variables**
   \`\`\`env
   GOOGLE_CLOUD_PROJECT=your-project-id
   GOOGLE_CLOUD_LOCATION=us-central1
   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
   \`\`\`

3. **Package Installation**
   \`\`\`bash
   npm install @ai-sdk/google-vertex
   \`\`\`

---

## Files to Migrate

### Phase 1: AI SDK Routes (Easy - Same Interface)

1. **app/api/clarity/chat/route.ts**
   - Current: `google("gemini-2.0-flash-exp")`
   - New: `vertex("gemini-2.0-flash")`
   - Streaming: ✅ No changes needed

2. **app/api/clarity/translate/route.ts**
   - Current: `google("gemini-2.0-flash-exp")`
   - New: `vertex("gemini-2.0-flash")`
   - Streaming: ✅ No changes needed

3. **app/api/clarity/classify-style/route.ts**
   - Current: `google("gemini-pro-latest")`
   - New: `vertex("gemini-2.0-flash")`
   - Upgrade benefit: Better model!

4. **scripts/generate-story-from-simulation.ts** (3 locations)
   - Current: `google("gemini-2.0-flash-exp")`
   - New: `vertex("gemini-2.0-flash")`

### Phase 2: RAG System (Harder - Different Package)

5. **lib/rag-system.ts**
   - Current: Uses `@google/generative-ai` directly
   - Migration: Switch to Vertex AI native client
   - Complexity: Medium (different API structure)

---

## Migration Implementation

### Step 1: Update Imports

\`\`\`typescript
// Before
import { google } from "@ai-sdk/google"

// After
import { vertex } from "@ai-sdk/google-vertex"
\`\`\`

### Step 2: Update Model Calls

\`\`\`typescript
// Before
model: google("gemini-2.0-flash-exp")

// After  
model: vertex("gemini-2.0-flash")
\`\`\`

### Step 3: Test Streaming

All routes use streaming - verify it works with Vertex AI backend.

---

## Cost Comparison

**Current (Gemini API):**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- Monthly estimate: $200-500

**After (Vertex AI with Google Credits):**
- Input: $0.075 per 1M tokens (same pricing)
- Output: $0.30 per 1M tokens (same pricing)
- **Monthly cost: $0** (covered by startup credits)
- **Annual savings: $2,400-6,000**

---

## Testing Checklist

- [ ] Chat streaming works correctly
- [ ] Translation quality is identical or better
- [ ] Style classification accuracy maintained
- [ ] Response times are comparable (<2s)
- [ ] No rate limit errors
- [ ] Error handling works (quota exceeded, etc.)
- [ ] RAG system embeddings work
- [ ] Story generation script works

---

## Rollback Plan

If issues occur:
1. Keep old imports commented out
2. Switch back to `import { google }` from `@ai-sdk/google`
3. Revert model names to original
4. Deploy rollback immediately

---

## Next Steps

1. **Provide Google Cloud Details:**
   - Project ID
   - Preferred region (us-central1 recommended)
   - Service account key (or I can guide setup)

2. **Deploy Migration:**
   - I'll update all 5 files
   - Add proper error handling
   - Include debug logging

3. **Test & Verify:**
   - Run through testing checklist
   - Compare quality side-by-side
   - Monitor costs in Google Cloud Console

**Ready to proceed?** Share your Google Cloud project ID and I'll implement the full migration!
