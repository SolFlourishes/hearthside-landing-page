# Beta 4.5 - Comprehensive Testing Plan
## "Relationships & Growth" Release

This testing plan covers all features added in Beta 4.5, organized by priority and user journey.

---

## 🗄️ Database Migrations (Run First)

Before testing, ensure all SQL scripts have been executed in order:

1. ✅ `scripts/014_add_quiz_and_conversation_history_v2.sql`
2. ✅ `scripts/015_add_tutorial_completed.sql`
3. ✅ `scripts/016_ensure_profile_creation.sql`
4. ✅ `scripts/017_notification_system.sql`
5. ✅ `scripts/018_contacts_and_progress_v2.sql`
6. ⏳ `scripts/019_theme_and_favorites.sql` - **RUN THIS NOW**

---

## 🎯 Priority 1: Core User Journey

### 1.1 New User Onboarding
**Goal**: Verify new users get a welcoming, connection-focused introduction

- [ ] Create a new account (sign up with fresh email)
- [ ] Tutorial should appear within 1-2 seconds of dashboard load
- [ ] Step through all 5 tutorial steps
- [ ] Verify "Skip Tutorial" button works
- [ ] Verify "Start Quiz" button navigates correctly
- [ ] Complete the tutorial and verify `tutorial_completed` is set to `true` in database
- [ ] Refresh page - tutorial should NOT appear again

**Expected Result**: Smooth onboarding that emphasizes connection over features

---

### 1.2 Communication Quiz & Profile
**Goal**: Ensure quiz results save correctly and populate user profile

- [ ] Take the Communication Style Quiz (all 10 questions)
- [ ] Submit quiz and verify results page displays correct archetype
- [ ] Verify archetype matches between Results page and Dashboard
- [ ] Check database: `user_profiles.communication_style` contains quiz results
- [ ] Check database: `quiz_history` array contains timestamp
- [ ] Navigate to Dashboard - verify Communication Profile card shows correct info
- [ ] Click "Retake Quiz" - verify you can update your profile

**Expected Result**: Consistent archetype across all pages, properly stored in database

---

### 1.3 Clarity Coach with Auto-Population
**Goal**: Verify user profile data auto-populates in Draft/Analyze/Chat

- [ ] Navigate to Clarity Coach > Draft
- [ ] Verify "About You" section is pre-filled with your profile data
- [ ] Change communication mode - verify profile stays populated
- [ ] Navigate to Analyze - verify same auto-population
- [ ] Navigate to Chat - verify profile data is used for coaching context

**Expected Result**: Seamless experience where users don't re-enter their information

---

## 🎯 Priority 2: Relationship Features

### 2.1 Contacts Management
**Goal**: Test complete contact creation and usage workflow

**Creating Contacts:**
- [ ] Go to /account/contacts
- [ ] Click "Add New Contact"
- [ ] Fill in: Name, Relationship, Communication preferences (neurotype, generation)
- [ ] Save contact
- [ ] Verify contact appears in list
- [ ] Edit contact - change name or preferences
- [ ] Verify changes save

**Using Contacts in Clarity Coach:**
- [ ] Go to Clarity Coach > Draft
- [ ] In "Who are you talking to?" section, expand "Saved Contacts"
- [ ] Select your saved contact
- [ ] Verify their communication preferences auto-populate
- [ ] Draft a message and translate
- [ ] Save the translation
- [ ] Check database: `contact_interactions` table should have new entry
- [ ] Return to /account/contacts
- [ ] View contact - verify "Last interaction" updated

**Progress Tracking:**
- [ ] Have multiple interactions with same contact (3-5 translations)
- [ ] Check contact card for progress indicators
- [ ] Verify interaction count increases

**Expected Result**: Contact system reduces friction and tracks relationship growth

---

### 2.2 PoliTalk Explorer
**Goal**: Test political worldview bridge-building feature

**Basic Usage:**
- [ ] Navigate to Clarity Coach > PoliTalk Explorer
- [ ] Click "Browse Topic Library"
- [ ] Select a topic (e.g., "I believe immigrants are taking American jobs")
- [ ] Set "Person Holding This Belief" identity (Conservative, Law and Order, etc.)
- [ ] Set "Your Perspective" identity (Liberal, Social Justice, etc.)
- [ ] Click "Help Me Understand"
- [ ] Verify AI response explains the moral framework differences

**Validation:**
- [ ] Try mismatched setup (conservative position with liberal identity)
- [ ] Verify warning appears suggesting you may have swapped identities
- [ ] Correct the setup
- [ ] Verify warning disappears

**Expected Result**: Intelligent tool that helps users genuinely understand opposing viewpoints

---

## 🎯 Priority 3: Personalization & Preferences

### 3.1 Theme Customization
**Goal**: Test theme persistence across sessions

- [ ] Go to /account/settings/appearance
- [ ] Change theme mode (Light ↔ Dark)
- [ ] Change accent color (try 2-3 options)
- [ ] Change font size (Small → Medium → Large)
- [ ] Click "Save Preferences"
- [ ] Verify "Saved!" message appears
- [ ] Navigate to different pages - verify theme persists
- [ ] Log out and log back in
- [ ] Verify theme preferences were remembered

**Expected Result**: Consistent, personalized appearance across sessions

---

### 3.2 Notification Preferences
**Goal**: Test granular notification control

**User Side:**
- [ ] Go to /account/settings/notifications
- [ ] Toggle email notifications master switch
- [ ] Set "Saved Items" to "Daily digest"
- [ ] Enable "Quiz Reminders"
- [ ] Set "Communication Tips" to "Weekly"
- [ ] Disable "Connection Reminders"
- [ ] Save preferences
- [ ] Check database: `user_profiles.notification_preferences` updated

**Admin Side:**
- [ ] Log in as admin
- [ ] Go to /admin/notifications
- [ ] Create a new newsletter
- [ ] Set title, message, audience
- [ ] Schedule for future date
- [ ] Verify scheduled notification appears in history
- [ ] Send a test notification
- [ ] Verify test email arrives (check spam folder)

**Expected Result**: Users have full control over communication frequency

---

## 🎯 Priority 4: Data Management

### 4.1 Saving & Organizing
**Goal**: Test save, favorite, and export features

**Saving Conversations:**
- [ ] Go to Clarity Coach > Chat
- [ ] Have a coaching conversation (3-4 exchanges)
- [ ] Click "Save Conversation"
- [ ] Verify success message
- [ ] Navigate to /account/conversations
- [ ] Verify conversation appears under "Conversations" tab
- [ ] Click star icon to favorite it
- [ ] Click "Favorites Only" filter
- [ ] Verify only favorited conversation shows

**Saving Translations:**
- [ ] Go to Clarity Coach > Draft
- [ ] Write a message and translate
- [ ] Click "Save Translation"
- [ ] Go to /account/conversations > Translations tab
- [ ] Verify translation appears
- [ ] Favorite the translation
- [ ] Filter to "Favorites Only"

**Expected Result**: Users can easily save and organize their communication growth

---

### 4.2 Export Functionality
**Goal**: Test data portability

- [ ] Go to /account/conversations
- [ ] Click export button on a conversation
- [ ] Try export as "Plain Text" - verify file downloads
- [ ] Try export as "Markdown" - verify formatting preserved
- [ ] Try export as "JSON" - verify complete data structure
- [ ] Click "Export All Conversations"
- [ ] Verify batch export downloads
- [ ] Go to Translations tab
- [ ] Export a translation (try all formats)
- [ ] Export all translations

**Expected Result**: Users can download and share their growth journey

---

## 🎯 Priority 5: Edge Cases & Error Handling

### 5.1 Authentication States
- [ ] Access /account/dashboard without logging in
- [ ] Verify redirect to login
- [ ] Access /admin without admin role
- [ ] Verify "Access Denied" message
- [ ] Try to edit another user's conversation
- [ ] Verify 401 Unauthorized

### 5.2 Empty States
- [ ] New user with no contacts - verify friendly empty state
- [ ] No saved conversations - verify helpful message with CTA
- [ ] No translations - verify empty state encourages usage

### 5.3 Data Validation
- [ ] Try to create contact without required fields
- [ ] Verify validation errors
- [ ] Try to save translation without completing translation
- [ ] Verify appropriate error message

### 5.4 Performance
- [ ] Create 20+ contacts - verify list loads quickly
- [ ] Save 50+ conversations - verify pagination or smooth scrolling
- [ ] Test on mobile - verify responsive design works
- [ ] Test with slow network - verify loading states appear

---

## 🎯 Priority 6: Integration Testing

### 6.1 Cross-Feature Workflows

**Workflow 1: Contact-to-Progress Pipeline**
- [ ] Create new contact
- [ ] Use contact in 5 different translations
- [ ] Check contact progress card
- [ ] Verify stats accurately reflect interactions

**Workflow 2: Quiz-to-Clarity Pipeline**
- [ ] Retake quiz with different answers
- [ ] Go to Clarity Coach immediately after
- [ ] Verify updated profile auto-populates
- [ ] Verify coaching adapts to new profile

**Workflow 3: Save-to-Export Pipeline**
- [ ] Save 3 conversations
- [ ] Favorite 2 of them
- [ ] Export only favorited ones
- [ ] Verify export contains correct subset

---

## 📊 Success Criteria

Beta 4.5 is ready for release when:

- ✅ All Priority 1 & 2 tests pass (Core journey and relationships)
- ✅ At least 90% of Priority 3 & 4 tests pass (Personalization and data)
- ✅ No critical bugs in Priority 5 (Edge cases)
- ✅ Website passes Google for Startups requirements (team info visible, product clear)
- ✅ All 6 SQL migrations run without errors
- ✅ Mobile responsive design works smoothly

---

## 🐛 Bug Tracking Template

When you find bugs during testing, document them like this:

**Bug Title**: [Brief description]
**Priority**: Critical / High / Medium / Low
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Bug occurs]

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]
**Screenshots/Console Errors**: [If applicable]

---

## 🚀 Post-Testing Actions

Once testing is complete:

1. [ ] Address all Critical and High priority bugs
2. [ ] Update ANNOUNCEMENT.md with final Beta 4.5 messaging
3. [ ] Prepare social media announcement
4. [ ] Send Google for Startups reapplication email
5. [ ] Deploy to production
6. [ ] Monitor for first 24 hours
7. [ ] Collect initial user feedback

---

## 💡 Testing Notes

- Test with at least 2 different user accounts (regular user + admin)
- Clear browser cache between major test sections
- Check browser console for errors during each test
- Test on both desktop and mobile
- Try both light and dark themes

**Remember**: We're not just testing features - we're validating that Beta 4.5 helps people build genuine connections and grow in their communication journey.
