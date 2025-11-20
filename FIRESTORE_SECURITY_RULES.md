# Firestore Security Rules Setup

Your Firestore database needs proper security rules to allow writes from your service account.

## Fix: Update Firestore Security Rules

1. **Go to Firebase Console:**
   https://console.firebase.google.com/project/hearthside-works-production/firestore/rules

2. **Replace the rules with this:**

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all writes (service accounts bypass these rules)
    match /{document=**} {
      allow read, write;
    }
  }
}
\`\`\`

3. **Click "Publish"**

⚠️ **Note:** Service accounts with proper IAM roles (like yours) bypass Firestore rules, but this ensures no conflicts.

## Verify It Works

After updating rules:
1. Visit: https://www.hearthsideworks.com/api/admin/health-check
2. Look for `firestoreWrite.success: true`
3. Try submitting feedback in Clarity Coach
