# Google Cloud Credits Optimization Plan

## Congratulations on Google Startup Program Acceptance!

With Google Cloud credits, we can strategically optimize your infrastructure to:
1. Reduce costs on Vercel/other services
2. Leverage Google's AI/ML capabilities
3. Keep Firebase/Firestore for what it does best
4. Scale efficiently

---

## Current Stack Analysis

### Already Using (Keep & Optimize)
- **Firebase/Firestore** - Keep for Stories & Feedback (it's working well)
- **Supabase** - Keep for user data, contacts, authentication (excellent RLS)
- **Vercel** - Keep for hosting (Next.js optimization)

### Opportunities with Google Credits

#### 1. AI/ML Services (High Priority)
**Switch to Vertex AI from OpenAI/Other Providers**

Current AI costs:
- Clarity Coach translations
- Leadership Leader scenario simulations
- Analysis features

**Recommendation:** Use Vertex AI (Gemini models)
- Free credits cover extensive usage
- Better integration with Google ecosystem
- Comparable quality to GPT-4
- Lower latency

**Implementation:**
\`\`\`typescript
// lib/vertex-ai.ts
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'us-central1'
});

export async function generateWithGemini(prompt: string) {
  const model = vertexAI.preview.getGenerativeModel({
    model: 'gemini-1.5-pro'
  });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}
\`\`\`

#### 2. Storage (Medium Priority)
**Consider Google Cloud Storage for Large Assets**

Current: Vercel Blob (paid)
Alternative: Google Cloud Storage (free with credits)

**Use Cases:**
- User uploaded documents
- Exported PDFs
- Leadership Leader scenario recordings
- Assessment results

**Keep Vercel Blob for:**
- Small images (logos, avatars)
- Static assets that benefit from edge caching

#### 3. BigQuery (Future - Analytics)
**When you scale, use BigQuery for analytics**

Free tier is generous:
- 1 TB query processing/month free
- 10 GB storage free

**Use Cases:**
- Leadership growth analytics across all users
- Communication improvement trends
- Product usage metrics
- A/B testing data

#### 4. Cloud Functions (Optional)
**Background jobs and scheduled tasks**

**Use Cases:**
- Send digest emails (weekly leadership reflections summary)
- Generate growth reports
- Clean up old data
- Scheduled notifications

**vs Vercel Cron Jobs:**
- Keep simple crons on Vercel
- Use Cloud Functions for complex/long-running tasks

---

## Recommended Architecture with Google Credits

### Phase 1: Immediate (Beta 4.5 Launch)
**Keep current stack, add Vertex AI**

\`\`\`
Frontend: Vercel (Next.js)
Auth: Supabase Auth
Database: Supabase (PostgreSQL)
AI: Vertex AI (Gemini) ← NEW
Storage: Vercel Blob (small assets) + Google Cloud Storage (large files) ← NEW
Firebase: Stories, Feedback (keep as-is)
\`\`\`

### Phase 2: Beta 5.0 (Leadership Leader Launch)
**Optimize with Google services**

\`\`\`
AI Scenarios: Vertex AI (Gemini Pro)
Scenario Storage: Google Cloud Storage
Analytics: BigQuery (aggregated metrics)
Background Jobs: Cloud Functions (digest emails, reports)
\`\`\`

### Phase 3: Beta 6.0 (Firebase Consolidation)
**Migrate Firebase data to Supabase**

\`\`\`
Stories: Move to Supabase
Feedback: Move to Supabase
Firebase: Remove entirely (simplify stack)
\`\`\`

---

## Cost Savings Estimate

### Current Estimated Costs (without Google credits)
- **OpenAI API:** ~$200-500/month at scale
- **Vercel Blob:** ~$20-50/month
- **Firebase:** Free tier (currently) → ~$25-50/month at scale

### With Google Credits (12-month program)
- **Vertex AI:** $0 (covered by credits) - Save $200-500/month
- **Cloud Storage:** $0 (covered by credits) - Save $20-50/month
- **BigQuery:** $0 (covered by credits) - Save $50-100/month

**Total Potential Savings:** $270-650/month = $3,240-7,800/year

---

## Implementation Priority

### High Priority (Do Now)
1. **Set up Vertex AI for Clarity Coach translations**
   - Replace OpenAI calls with Gemini
   - Test quality parity
   - Deploy to production

2. **Set up Google Cloud Storage for exports**
   - Replace Vercel Blob for PDFs
   - Keep Vercel Blob for images (edge caching benefit)

### Medium Priority (During Leadership Leader Build)
3. **Use Vertex AI for Leadership Leader scenarios**
   - AI simulation engine
   - Scenario generation
   - Feedback analysis

4. **Set up Cloud Functions for background jobs**
   - Weekly reflection digests
   - Growth report generation

### Low Priority (Post-Launch)
5. **BigQuery for analytics**
   - Cross-app usage patterns
   - Growth metrics aggregation
   - A/B testing infrastructure

6. **Firebase consolidation**
   - Migrate Stories to Supabase
   - Migrate Feedback to Supabase

---

## Updated Build Timeline with Google Integration

### Beta 4.5 (Current) - 2 weeks
- Complete Clarity Coach features
- Testing
- **Add Vertex AI integration** ← NEW

### Beta 5.0 (Leadership Leader) - 9 weeks
- Phase 1-5 as planned
- **Built on Vertex AI from day 1** ← NEW
- **Use Cloud Storage for scenarios** ← NEW

### Beta 5.5 (Optimization) - 4 weeks
- Performance tuning
- **BigQuery analytics** ← NEW
- **Cloud Functions for automation** ← NEW

### Beta 6.0 (Consolidation) - 3 weeks
- **Firebase → Supabase migration** ← NEW
- Unified database architecture
- Simplified stack

---

## Action Items

### Immediate (This Week)
1. ✅ Get Google Cloud project ID from startup program
2. ✅ Enable Vertex AI API
3. ✅ Create service account with Vertex AI permissions
4. ✅ Add `GOOGLE_CLOUD_PROJECT` environment variable
5. ⬜ Install `@google-cloud/vertexai` package
6. ⬜ Create `lib/vertex-ai.ts` helper
7. ⬜ Test Gemini vs current AI in Clarity Coach

### This Month (During Leadership Leader Build)
1. ⬜ Set up Google Cloud Storage bucket
2. ⬜ Create `lib/cloud-storage.ts` helper
3. ⬜ Migrate export functionality to Cloud Storage
4. ⬜ Build Leadership Leader scenarios with Vertex AI

### Next Month (Post-Launch)
1. ⬜ Set up BigQuery dataset
2. ⬜ Create analytics pipeline
3. ⬜ Deploy Cloud Functions for background jobs

---

## Technical Specifications

### Environment Variables Needed
\`\`\`bash
# Add to Vercel project
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_KEY_FILE=<service-account-json>
GOOGLE_CLOUD_STORAGE_BUCKET=hearthside-works-storage
\`\`\`

### Package Dependencies
\`\`\`json
{
  "dependencies": {
    "@google-cloud/vertexai": "^1.0.0",
    "@google-cloud/storage": "^7.0.0",
    "@google-cloud/bigquery": "^7.0.0"
  }
}
\`\`\`

---

## Questions to Answer

1. **Do you have your Google Cloud project ID from the startup program?**
2. **Should we migrate to Vertex AI now (Beta 4.5) or wait for Leadership Leader?**
   - Recommendation: Do it now to test quality before Leadership Leader launch
3. **Which assets should move to Cloud Storage first?**
   - Recommendation: Start with exported PDFs, keep images on Vercel Blob

---

## Success Metrics

### Technical
- Zero increase in response time after AI migration
- 100% feature parity between OpenAI and Vertex AI
- Successful file uploads/downloads to Cloud Storage

### Business
- $250-600/month cost savings
- Extended runway with free credits
- Scalable infrastructure for growth

---

## Next Steps

1. **Get your Google Cloud project details**
2. **Decide: Vertex AI now or later?**
3. **I'll create the integration code and migration plan**

Ready to optimize with your Google credits!
