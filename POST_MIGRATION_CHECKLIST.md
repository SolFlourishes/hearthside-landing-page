# Post-Migration Verification Checklist

**Complete this after Firebase setup is done**

---

## Environment Variables to Verify

In Vercel Project Settings → Environment Variables:

### New/Updated Variables
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` - New JSON from hearthside-works-production
- [ ] `GOOGLE_CLOUD_PROJECT` - Set to: hearthside-works-production  
- [ ] `GOOGLE_CLOUD_LOCATION` - Set to: us-central1

### Existing Variables (Keep As-Is)
- [ ] `GOOGLE_GENERATIVE_AI_API_KEY` - (Will remove after Vertex AI migration)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `RESEND_API_KEY`
- [ ] All other existing variables

---

## Features to Test

### Contact Form
- [ ] Submit contact form at /contact
- [ ] Verify submission appears in new Firestore console
- [ ] Check email notification works

### Stories Submission
- [ ] Submit a test story at /stories/tales-from-the-white-room/submit
- [ ] Verify it appears in new Firestore
- [ ] Test admin review functionality

### Clarity Coach (After Vertex AI Migration)
- [ ] Chat works and streams properly
- [ ] Draft translations work
- [ ] Analyze works
- [ ] No console errors

---

## Firebase Console Checks

In https://console.firebase.google.com (hearthside-works-production):

- [ ] Firestore shows contact_submissions collection
- [ ] Firestore shows story_submissions collection (if data migrated)
- [ ] Firestore shows expert_documents collection (if data migrated)

---

## Google Cloud Console Checks

In https://console.cloud.google.com (hearthside-works-production):

- [ ] Vertex AI API is enabled
- [ ] Service account exists with correct roles
- [ ] Billing shows startup credits being used

---

## Old Project Cleanup (Do Last)

**Only after everything works for 1 week:**

- [ ] Download final backup of old Firebase data
- [ ] Disable old Firebase project
- [ ] Remove old service account key from Vercel
- [ ] Archive old Google Cloud project

---

## Rollback Plan (If Something Goes Wrong)

1. Keep old `FIREBASE_SERVICE_ACCOUNT_KEY` saved somewhere safe
2. If new setup fails, revert to old key in Vercel
3. Redeploy
4. Contact v0 for debugging
