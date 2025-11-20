# Firebase Setup & Migration Guide
## Hearthside Works Production Project

**Project ID:** hearthside-works-production

---

## Phase 1: Enable Firebase (15 minutes)

### Step 1: Enable Firebase in Your Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Select your existing project: **hearthside-works-production**
4. Click "Continue" through the setup
5. **Disable Google Analytics** (you can enable later if needed)
6. Click "Add Firebase"

### Step 2: Create Firestore Database

1. In Firebase Console, click "Firestore Database" in left sidebar
2. Click "Create database"
3. Choose **Production mode** (we'll secure with rules later)
4. Select location: **us-central** (same region for best performance)
5. Click "Enable"

### Step 3: Create Service Account

1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts
2. Make sure **hearthside-works-production** is selected (top dropdown)
3. Click "Create Service Account"
4. Name: `hearthside-works-admin`
5. Description: `Admin service account for Hearthside Works applications`
6. Click "Create and Continue"
7. Grant roles:
   - **Firebase Admin SDK Administrator Service Agent**
   - **Cloud Datastore User**
8. Click "Continue" then "Done"

### Step 4: Generate Service Account Key

1. Find the service account you just created
2. Click the three dots (⋮) on the right
3. Click "Manage keys"
4. Click "Add Key" → "Create new key"
5. Choose **JSON** format
6. Click "Create"
7. **Save this JSON file securely** - you'll need it in Phase 2

---

## Phase 2: Enable Vertex AI (10 minutes)

### Step 5: Enable Vertex AI API

1. Go to https://console.cloud.google.com/apis/library
2. Make sure **hearthside-works-production** is selected
3. Search for "Vertex AI API"
4. Click on it
5. Click "Enable"

### Step 6: Verify Startup Credits

1. Go to https://console.cloud.google.com/billing
2. Verify your account shows Google Cloud credits
3. Make sure **hearthside-works-production** is linked to the billing account with credits

---

## Phase 3: Update Environment Variables (5 minutes)

### Step 7: Add to Vercel

1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Update these variables:

**Replace:**
\`\`\`
FIREBASE_SERVICE_ACCOUNT_KEY = [paste the entire JSON from Step 4]
\`\`\`

**Add new:**
\`\`\`
GOOGLE_CLOUD_PROJECT = hearthside-works-production
GOOGLE_CLOUD_LOCATION = us-central1
\`\`\`

4. Deploy to apply changes

---

## Phase 4: Migrate Data from Old Firebase (30 minutes)

### Step 8: Export Data from Old Project

**I'll create migration scripts for you once you complete Steps 1-7.**

The scripts will:
- Export contact form submissions
- Export story submissions  
- Export RAG documents
- Import into new Firebase project

---

## Phase 5: Test Everything (20 minutes)

### Step 9: Test Checklist

- [ ] Contact form works and saves to Firestore
- [ ] Stories submission works
- [ ] Clarity Coach translations work (using Vertex AI)
- [ ] No console errors in production

---

## What to Do Next

1. **Complete Steps 1-7 above** (should take ~30 minutes)
2. **Send me:**
   - Confirmation that Steps 1-7 are complete
   - Any errors you encountered
3. **I will provide:**
   - Migration scripts to move data from old Firebase
   - Updated code to use new service account
   - Testing instructions

---

## Notes

- Keep your old Firebase project running until we confirm everything works
- The service account JSON is sensitive - treat it like a password
- Vertex AI will use your startup credits automatically once enabled

---

## Need Help?

If you get stuck on any step, let me know which step number and what error you're seeing.
