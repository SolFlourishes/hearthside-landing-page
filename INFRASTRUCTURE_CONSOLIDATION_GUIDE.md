# Infrastructure Consolidation Guide
**Moving from Personal to Business Google Cloud Account**

## Current State Analysis

### What You Have Now (Personal Email)
- **Firebase Project**: Connected via `FIREBASE_SERVICE_ACCOUNT_KEY`
  - Used for: Contact form submissions, Stories submissions, RAG system
  - Project ID: Hidden in service account JSON
- **Gemini API**: Connected via `GOOGLE_GENERATIVE_AI_API_KEY`
  - Used for: All AI features in Clarity Coach
  - Direct API key (not Vertex AI)
  
### What You Need (Business Account + Startup Program)
- **New Google Cloud Project** under business account
- **Vertex AI** enabled (uses startup program credits)
- **Firebase** migrated or consolidated
- **Service accounts** properly configured

---

## Step 1: Identify Current Project

Let's figure out what project you're using now:

### Action Required:
1. Decode your current Firebase service account to see project ID:
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Find `FIREBASE_SERVICE_ACCOUNT_KEY`
   - Copy the value (it's JSON)
   - Look for the `project_id` field

2. Check your Gemini API key source:
   - Visit https://aistudio.google.com/app/apikey
   - See which Google account it's under (personal vs business)

**Please share:**
- Current Firebase project ID: `___________`
- Gemini API key account: Personal or Business?

---

## Step 2: Google Startup Program Setup

### What You Should Have Received:
- Email confirmation of acceptance
- $200,000+ in Google Cloud credits
- Access to Google Cloud Console under your business email

### Action Required:
1. Log into https://console.cloud.google.com with your **business email**
2. Look for your startup program project (or create one)
3. Note the Project ID and Project Number

**Project Details:**
- Business Project ID: `___________`
- Project Number: `___________`
- Region preference: `us-central1` (recommended) or `___________`

---

## Step 3: Migration Strategy

You have two options:

### Option A: Fresh Start (RECOMMENDED)
✅ Clean architecture
✅ Everything uses startup credits
✅ No legacy baggage
⚠️ Need to migrate existing Firebase data

**Steps:**
1. Create new Firebase project under business account
2. Set up Vertex AI in same project
3. Migrate contact forms + stories from old Firebase
4. Update all environment variables
5. Disable old project

### Option B: Hybrid Approach
⚠️ More complex
⚠️ Split between personal and business
✅ Faster initial setup
✅ Can migrate data gradually

**Steps:**
1. Keep existing Firebase (personal)
2. Add Vertex AI in business account
3. Gradually migrate Firebase data later

---

## Step 4: What Needs to Change

### Environment Variables to Update:

#### If Option A (Fresh Start):
\`\`\`bash
# Remove these (personal account):
GOOGLE_GENERATIVE_AI_API_KEY=xxx  # Remove - switching to Vertex AI
FIREBASE_SERVICE_ACCOUNT_KEY=xxx  # Replace with business account

# Add these (business account):
GOOGLE_CLOUD_PROJECT=your-business-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_VERTEX_SERVICE_ACCOUNT={"type":"service_account",...}  # New service account
\`\`\`

#### If Option B (Hybrid):
\`\`\`bash
# Keep these for now:
FIREBASE_SERVICE_ACCOUNT_KEY=xxx  # Keep old Firebase

# Add these:
GOOGLE_CLOUD_PROJECT=your-business-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_VERTEX_SERVICE_ACCOUNT={"type":"service_account",...}  # New for Vertex AI
\`\`\`

---

## Step 5: Service Account Setup

Once you choose your path, I'll guide you through:

1. **Creating a service account** in your business project
2. **Assigning roles:**
   - Vertex AI User
   - Firebase Admin (if using new Firebase)
   - Storage Admin (if using Cloud Storage)
3. **Generating JSON key**
4. **Adding to Vercel environment variables**

---

## Step 6: Code Changes Required

### For Vertex AI Migration:
- `app/api/clarity/translate/route.ts` - Switch to Vertex AI
- `app/api/clarity/chat/route.ts` - Switch to Vertex AI
- `app/api/clarity/classify-style/route.ts` - Switch to Vertex AI
- `lib/rag-system.ts` - Switch to Vertex AI
- `scripts/generate-story-from-simulation.ts` - Switch to Vertex AI

### For Firebase Migration (Option A only):
- `lib/firebase-admin.ts` - Update service account
- Test all Firebase-dependent features

---

## My Recommendation

**Go with Option A (Fresh Start)** because:
1. Your Firebase usage is minimal (just contact forms and stories)
2. Starting clean avoids future confusion
3. Everything runs on startup credits
4. Better organization for multiple apps (Clarity Coach + Leadership Leader)

---

## Next Steps - What I Need From You:

1. **Current state audit:**
   - [ ] What's your current Firebase project ID?
   - [ ] Is your Gemini API key from personal or business account?

2. **Business account info:**
   - [ ] What's your Google Startup Program project ID?
   - [ ] Preferred region (us-central1 recommended)?

3. **Migration decision:**
   - [ ] Option A (Fresh Start) or Option B (Hybrid)?

4. **Timeline:**
   - [ ] Do you want to do this consolidation before building anything else?
   - [ ] Or should we build Leadership Leader Alpha on personal infrastructure first?

Once you provide these answers, I'll create step-by-step instructions for the migration and make all necessary code changes.

---

## Estimated Timeline

- **Fresh Start (Option A)**: 2-3 hours
  - 1 hour: Google Cloud setup
  - 30 min: Service account creation
  - 1 hour: Code migration and testing
  - 30 min: Data migration

- **Hybrid (Option B)**: 1 hour
  - 30 min: Vertex AI setup
  - 30 min: Code migration and testing

---

## Cost Savings After Migration

**Before:** $200-500/month in Gemini API costs
**After:** $0/month (covered by $200k startup credits)
**Annual Savings:** $2,400-6,000
