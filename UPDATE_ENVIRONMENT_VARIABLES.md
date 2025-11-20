# Update Environment Variables in Vercel

## Step 1: Locate Your Service Account Key

Find the JSON file you downloaded from Google Cloud (Step 4 in the Firebase setup). It looks like:

\`\`\`json
{
  "type": "service_account",
  "project_id": "hearthside-works-production",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "firebase-adminsdk-xxxxx@hearthside-works-production.iam.gserviceaccount.com",
  ...
}
\`\`\`

## Step 2: Update Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Update these three variables:

### Variable 1: FIREBASE_SERVICE_ACCOUNT_KEY
- **Name**: `FIREBASE_SERVICE_ACCOUNT_KEY`
- **Value**: Copy and paste the ENTIRE JSON content from your service account key file
- **Environments**: Production, Preview, Development (check all three)

### Variable 2: GOOGLE_CLOUD_PROJECT
- **Name**: `GOOGLE_CLOUD_PROJECT`
- **Value**: `hearthside-works-production`
- **Environments**: Production, Preview, Development (check all three)

### Variable 3: GOOGLE_CLOUD_LOCATION
- **Name**: `GOOGLE_CLOUD_LOCATION`
- **Value**: `us-central1` (recommended) or choose from:
  - `us-central1` (Iowa) - Best for US users
  - `us-east4` (Virginia) - East coast
  - `europe-west1` (Belgium) - EU users
  - `asia-northeast1` (Tokyo) - Asia users
- **Environments**: Production, Preview, Development (check all three)

## Step 3: Redeploy

After updating all three variables:
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the three dots (...) → **Redeploy**
4. Check "Use existing Build Cache" and click **Redeploy**

## Step 4: Verify

After redeployment completes (2-3 minutes):
1. Visit your app
2. Try using Clarity Coach (translate or chat)
3. Check that it works without errors

## What Changed?

✅ Now using Vertex AI (free Google credits) instead of paid Gemini API
✅ Firebase connected to your business account
✅ Clean infrastructure foundation for Leadership Leader

## If You See Errors

Check the Vercel deployment logs for:
- "Invalid service account" → Double-check the JSON is complete
- "Project not found" → Verify project ID is exactly `hearthside-works-production`
- "Region not supported" → Change GOOGLE_CLOUD_LOCATION to `us-central1`

---

**Estimated Time**: 5 minutes
**Cost Savings**: $200-500/month now covered by Google Startup credits
