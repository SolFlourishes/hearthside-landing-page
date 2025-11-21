# Fix Vertex AI Permissions

## Problem
Your service account authenticates successfully but gets a 403 error:
\`\`\`
Permission 'aiplatform.endpoints.predict' denied
\`\`\`

This means the service account doesn't have permission to use Vertex AI.

## Solution: Add Vertex AI User Role

### Step 1: Go to IAM & Admin
1. Open: https://console.cloud.google.com/iam-admin/iam?project=hearthside-works-production
2. Find your service account: `hearthside-works-admin@hearthside-works-production.iam.gserviceaccount.com`

### Step 2: Add Vertex AI User Role
1. Click the **pencil/edit icon** next to your service account
2. Click **"+ ADD ANOTHER ROLE"**
3. Search for and select: **"Vertex AI User"**
4. Click **"Save"**

### Step 3: Verify Permissions
After adding the role, your service account should have at least these roles:
- **Vertex AI User** (to call Vertex AI APIs)
- **Firebase Admin** (to access Firestore)
- **Service Account Token Creator** (for authentication)

### Step 4: Test
Wait 1-2 minutes for permissions to propagate, then try a translation in Clarity Coach again.

## Alternative: Use a More Permissive Role (Not Recommended for Production)
If "Vertex AI User" doesn't work, you can temporarily use:
- **Vertex AI Administrator** (has all Vertex AI permissions)

But this gives more permissions than needed, so use "Vertex AI User" if possible.

## Verification
Once permissions are added, you should see successful translations and the Vercel logs will show:
\`\`\`
Translation completed successfully
\`\`\`

Instead of the 403 permission error.
