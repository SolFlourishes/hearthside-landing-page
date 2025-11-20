# Fix Service Account Permissions

## Problem
Your service account doesn't have the necessary permissions to access Firebase/Firestore.

## Solution: Grant Required Roles

### Step 1: Go to IAM Settings
1. Visit: https://console.cloud.google.com/iam-admin/iam?project=hearthside-works-production
2. Find your service account in the list (it looks like `firebase-adminsdk-xxxxx@hearthside-works-production.iam.gserviceaccount.com`)

### Step 2: Add Missing Roles
Click the pencil icon next to your service account and add these roles:

**Required Roles:**
- ✅ **Cloud Datastore User** - For Firestore database access
- ✅ **Firebase Admin** - For Firebase operations
- ✅ **Vertex AI User** - For Vertex AI API access (optional but recommended)

### Step 3: Alternative - Create New Service Account with Correct Roles

If you can't edit the existing one, create a new service account:

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=hearthside-works-production
2. Click **"+ CREATE SERVICE ACCOUNT"**
3. Name: `hearthside-works-admin`
4. Click **"CREATE AND CONTINUE"**
5. Add these roles:
   - Cloud Datastore User
   - Firebase Admin  
   - Vertex AI User
6. Click **"CONTINUE"** then **"DONE"**
7. Click on the new service account
8. Go to **"KEYS"** tab
9. Click **"ADD KEY"** → **"Create new key"** → **"JSON"**
10. Save the JSON file
11. Update `FIREBASE_SERVICE_ACCOUNT_KEY` in Vercel with this new JSON

### Step 4: Verify Firestore is Created

Also make sure Firestore database exists:
1. Go to: https://console.firebase.google.com/project/hearthside-works-production/firestore
2. If you see "Create database", click it and follow the wizard
3. Choose **"Start in production mode"**
4. Select location: **nam5 (United States)**
5. Click **"Enable"**

### Step 5: Test Again

After updating permissions/key, redeploy and test feedback submission again.

## Quick Check

Run this to see what roles your service account has:
\`\`\`bash
gcloud projects get-iam-policy hearthside-works-production \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:YOUR_SERVICE_ACCOUNT_EMAIL"
\`\`\`

You should see `roles/datastore.user` and `roles/firebase.admin` in the output.
