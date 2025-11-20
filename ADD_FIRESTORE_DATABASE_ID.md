# Add Firestore Database ID Environment Variable

Your Firestore database has a custom name. Add this environment variable to Vercel:

## Environment Variable to Add

**Variable Name:** `FIRESTORE_DATABASE_ID`  
**Value:** `(default)`

## Steps

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add new variable:
   - Name: `FIRESTORE_DATABASE_ID`
   - Value: `(default)`
4. Select all environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy your application

## Why This Fixes It

The Firebase Console screenshot shows a database path, but Firestore Admin SDK needs to know which database to connect to. Setting this explicitly ensures the connection goes to the right place.

After adding this variable and redeploying, visit the health check again to verify the fix.
