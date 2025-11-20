# Firestore Database ID Configuration

**IMPORTANT:** Your database name is `hearthside-production`, NOT `(default)`

## Environment Variable Set

✅ **Variable Name:** `FIRESTORE_DATABASE_ID`  
✅ **Value:** `hearthside-production`

## Why This Matters

When you created your Firestore database in the `hearthside-works-production` project, it was given the custom name "hearthside-production" instead of the standard "(default)" name. The Firebase Admin SDK needs this exact database name to connect properly.

## Verification

The health check at `/api/admin/health-check` confirms the connection is working:
\`\`\`json
"firestoreWrite": {
  "success": true,
  "documentId": "vUPlWVmjrJOCoZchBCQk",
  "message": "Successfully wrote to Firestore"
}
\`\`\`

## For Future Reference

Your Firestore database configuration:
- **Project:** hearthside-works-production
- **Database Name:** hearthside-production
- **Location:** us-central1
