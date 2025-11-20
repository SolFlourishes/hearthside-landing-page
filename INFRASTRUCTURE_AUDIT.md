# Hearthside Works Infrastructure Audit
**Date:** January 2025  
**Purpose:** Pre-Leadership Leader integration analysis  
**Status:** Preliminary (awaiting Leadership Leader primer document)

---

## Executive Summary

Hearthside Works currently uses a **dual-database architecture**:
- **Supabase (PostgreSQL)** - Primary database for user profiles, authentication, contacts, conversations
- **Firebase Firestore** - Secondary storage for feedback, stories, contact forms

**Critical Finding:** This dual-database setup creates complexity and potential data inconsistencies. Before building Leadership Leader, we should consolidate to a single database system.

---

## 1. Current Database Architecture

### 1.1 Supabase (PostgreSQL) - Primary Database

**Tables:**
1. **`user_profiles`** - Core user data
   - Authentication linked (auth.users)
   - Profile information, preferences, avatar
   - Quiz history and reference data
   - Notification preferences
   - Theme preferences (theme, accent_color, font_size)
   - Tutorial completion status

2. **`contacts`** - Relationship management
   - User's communication partners
   - Neurotype, generation, political identity
   - Communication style preferences
   - Progress tracking (total_interactions, first/last interaction dates)

3. **`contact_interactions`** - Interaction history
   - Tracks every Draft, Analyze, Chat, Politalk interaction with a contact
   - Clarity scores and effectiveness ratings
   - Links to specific contacts for progress tracking

4. **`conversations`** - Saved conversations
   - Chat, Draft, Analyze, Politalk sessions
   - Messages and metadata
   - Favoriting support

5. **`translations`** - Saved translations
   - Original and translated text
   - Recipient context
   - Favoriting support

6. **`scheduled_notifications`** - Notification system
   - Admin-scheduled notifications
   - Audience targeting
   - Status tracking

**Environment Variables:**
\`\`\`
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
\`\`\`

### 1.2 Firebase Firestore - Secondary Database

**Collections:**
1. **`feedback_ratings`** - User feedback on translations
2. **`feedback_edits`** - Edit requests for translations
3. **`feedback_reanalysis`** - Reanalysis requests
4. **`site_feedback`** - General site feedback
5. **`contact-submissions`** - Contact form submissions
6. **`stories`** - "Tales from the White Room" submissions
7. **`expert_documents`** - RAG system documents

**Environment Variables:**
\`\`\`
FIREBASE_SERVICE_ACCOUNT_KEY
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
\`\`\`

---

## 2. Data Models Currently in Use

### 2.1 User Profile Model (Supabase)
\`\`\`typescript
interface UserProfile {
  id: UUID // References auth.users
  display_name: string
  bio: string
  avatar_url: string
  preferences: JSONB
  
  // Communication Quiz Results
  neurotype: string
  generation: string
  political_identity: string
  political_values: string[]
  communication_style: string
  quiz_history: JSONB[]
  quiz_reference: JSONB
  
  // App Preferences
  notification_preferences: JSONB
  theme: 'light' | 'dark' | 'system'
  accent_color: string
  font_size: 'sm' | 'base' | 'lg'
  tutorial_completed: boolean
  
  created_at: timestamp
  updated_at: timestamp
}
\`\`\`

### 2.2 Contact Model (Supabase)
\`\`\`typescript
interface Contact {
  id: UUID
  user_id: UUID
  name: string
  relationship: RelationshipContext
  relationship_other?: string
  
  // Communication preferences (mirrors user profile structure)
  neurotype?: string
  generation?: string
  political_identity?: string
  political_values?: string[]
  communication_style?: string
  notes?: string
  
  // Progress tracking
  total_interactions: number
  first_interaction_at?: timestamp
  last_interaction_at?: timestamp
  
  created_at: timestamp
  updated_at: timestamp
}
\`\`\`

### 2.3 Interaction Model (Supabase)
\`\`\`typescript
interface ContactInteraction {
  id: UUID
  contact_id: UUID
  user_id: UUID
  interaction_type: 'draft' | 'analyze' | 'chat' | 'politalk'
  interaction_data: JSONB
  
  // Progress metrics
  clarity_score?: number (1-10)
  effectiveness_rating?: number (1-5)
  
  created_at: timestamp
}
\`\`\`

---

## 3. Shared Infrastructure

### 3.1 Authentication System
- **Provider:** Supabase Auth
- **Location:** `lib/supabase/server.ts`, `lib/supabase/client.ts`
- **Features:** Email/password, session management, RLS policies
- **Status:** ✅ Unified and working well

### 3.2 Client Patterns
\`\`\`typescript
// Server-side
import { createServerClient } from "@/lib/supabase/server"
const supabase = await createServerClient()

// Client-side
import { createBrowserClient } from "@/lib/supabase/client"
const supabase = createBrowserClient()
\`\`\`

### 3.3 API Route Structure
\`\`\`
app/api/
├── auth/           # Authentication endpoints
├── conversations/  # Supabase - conversation management
├── contacts/       # (Missing! Should exist for contacts CRUD)
├── recipients/     # Supabase - legacy recipient management
├── clarity/        # Clarity Coach specific
│   ├── chat/       # Supabase
│   ├── translate/  # Supabase
│   └── feedback/   # Firebase (should be migrated)
├── contact/        # Firebase - contact form (should be migrated)
├── feedback/       # Firebase - site feedback (should be migrated)
└── stories/        # Firebase - story submissions (should be migrated)
\`\`\`

---

## 4. Problems Identified

### 4.1 Critical Issues
1. **Dual Database Complexity**
   - Two separate database systems for similar data
   - Different query patterns and SDKs
   - Increased maintenance burden
   - No cross-database transactions

2. **Data Duplication Risk**
   - User feedback split between Supabase and Firebase
   - No single source of truth

3. **Inconsistent Naming**
   - API references `clarity_conversations` table
   - Database actually has `conversations` table
   - This has caused deployment errors

4. **Missing API Endpoints**
   - No `/api/contacts` route for contact CRUD operations
   - Contact management happening directly from client components

### 4.2 Medium Issues
1. **Firebase Usage Could Be Eliminated**
   - All Firebase collections could be PostgreSQL tables
   - Would simplify infrastructure
   - Would enable better relational queries

2. **Legacy Code**
   - `recipient_profiles` and `/api/recipients` still exist
   - These are superseded by the new `contacts` system
   - Should be deprecated/removed

---

## 5. Recommendations for Leadership Leader

### 5.1 Pre-Build Consolidation Plan

**Phase 1: Database Consolidation (1-2 days)**
1. Migrate Firebase collections to Supabase tables:
   - `feedback_ratings` → `clarity_feedback` table
   - `site_feedback` → `site_feedback` table
   - `contact-submissions` → `contact_submissions` table
   - `stories` → `user_stories` table
2. Update API routes to use Supabase
3. Remove Firebase dependency from production

**Phase 2: Clean Up Legacy Code (1 day)**
1. Deprecate `recipient_profiles` table
2. Remove `/api/recipients` routes
3. Update all references to use `contacts` system

**Phase 3: Fix Naming Inconsistencies (1 day)**
1. Ensure all table names match between schema and code
2. Add proper TypeScript types for all models
3. Create shared type definitions in `lib/types/`

### 5.2 Shared Infrastructure for Both Apps

**What Leadership Leader Can Reuse:**
1. ✅ **Authentication** - Same Supabase Auth system
2. ✅ **User Profiles** - Same `user_profiles` table
3. ✅ **Contacts System** - Same `contacts` and `contact_interactions` tables
4. ✅ **Notification System** - Same `scheduled_notifications` table
5. ✅ **Theme Preferences** - Same user preferences

**What Leadership Leader Needs (New Tables):**
- `leadership_scenarios` - AI scenario simulations
- `scenario_responses` - User responses to scenarios
- `growth_assessments` - 360° feedback data
- `growth_goals` - User-defined leadership goals
- `scenario_feedback` - Feedback on scenario performance

### 5.3 Application Structure

\`\`\`
app/
├── apps/
│   ├── clarity/          # Clarity Coach (existing)
│   │   ├── chat/
│   │   ├── draft/
│   │   ├── analyze/
│   │   └── politalk/
│   └── leadership/       # Leadership Leader (new)
│       ├── dashboard/
│       ├── scenarios/
│       ├── growth-tracker/
│       ├── roadmap/
│       └── changelog/
├── account/              # Shared user account pages
│   ├── dashboard/        # Main dashboard (links to both apps)
│   ├── profile/          # Shared profile
│   ├── contacts/         # Shared contacts
│   └── settings/         # Shared settings
└── api/
    ├── clarity/          # Clarity Coach endpoints
    ├── leadership/       # Leadership Leader endpoints (new)
    └── shared/           # Shared endpoints (contacts, notifications, etc.)
\`\`\`

---

## 6. Migration Scripts Needed

Before building Leadership Leader, run these consolidation scripts:

1. **`020_consolidate_firebase_to_supabase.sql`**
   - Create tables for feedback, stories, contact submissions
   - Migrate existing Firebase data
   
2. **`021_deprecate_recipients.sql`**
   - Archive recipient_profiles data
   - Remove old API dependencies

3. **`022_fix_table_names.sql`**
   - Ensure naming consistency across codebase

4. **`023_create_leadership_tables.sql`**
   - Create Leadership Leader specific tables
   - Maintain foreign key relationships to shared tables

---

## 7. Next Steps

**Before building Leadership Leader:**

1. ⏳ **Receive Leadership Leader primer document**
   - Understand full feature requirements
   - Identify additional data models needed

2. ⏳ **Get approval for consolidation plan**
   - Confirm Firebase → Supabase migration
   - Confirm timeline for consolidation

3. ⏳ **Execute consolidation**
   - Run migration scripts
   - Test all existing Clarity Coach features
   - Verify no data loss

4. ✅ **Begin Leadership Leader build**
   - Start with shared authentication
   - Build on consolidated database
   - Reuse contact system for scenario personalization

---

## 8. Timeline Estimate

**Consolidation Phase:** 3-4 days
- Day 1: Firebase → Supabase migration
- Day 2: Legacy code cleanup
- Day 3: Testing and verification
- Day 4: Buffer for issues

**Leadership Leader Build:** (TBD based on primer document)

---

## Questions for Sol

1. Do you have the Leadership Leader primer document to share?
2. Are you comfortable migrating away from Firebase completely?
3. Should we keep the `stories` functionality or deprecate it?
4. Do you want Leadership Leader to be a separate app or integrated into Clarity Coach?
5. Should contacts created in Clarity Coach be available in Leadership Leader scenarios?

---

**Status:** Awaiting Leadership Leader primer to complete audit.
