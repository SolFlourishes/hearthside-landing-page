# Leadership Leader + Clarity Coach: Database Consolidation Plan

## Executive Summary

Leadership Leader will be built alongside Clarity Coach as a **separate app with its own versioning and roadmap**:
- **Clarity Coach:** Currently Beta 4.5 (mature product in beta)
- **Leadership Leader:** Will start at Alpha 0.1 (new product in alpha)

Both apps share core infrastructure (users, contacts, neurotype data) while maintaining independent feature releases, roadmaps, and changelogs.

---

## Current Infrastructure Analysis

### Supabase (Primary Database)
**User & Account Data:**
- `user_profiles` - Core user identity, preferences, communication profiles
- `contacts` - People users communicate with (includes neurotypes, generations, political identities)
- `contact_interactions` - History of interactions with each contact
- `conversations` - Saved Clarity Coach conversations
- `translations` - Saved translations from Draft/Analyze
- `quiz_history` - Communication quiz results over time
- `notification_preferences` - Email/notification settings
- `notification_history` - Admin-sent notifications

**Subscriptions:**
- `subscriptions` - User tier management (Free, Premium, Elder)

### Firebase/Firestore (Secondary - Needs Consolidation)
**Current Usage:**
- `feedback` - User feedback submissions
- `stories` - Tales from the White Room submissions
- RAG documents for expert knowledge retrieval

**Problems:**
- Duplicate database connections increase complexity
- No unified view of user data
- Separate authentication flows

---

## Shared Data Models (Used by Both Apps)

### 1. User Profiles (`user_profiles`)
**Shared Fields:**
- `id`, `email`, `full_name`, `created_at`, `updated_at`
- `neurotype` - Applies to both communication and leadership
- `generation` - Impacts both communication style and leadership approach
- `political_identity` - Relevant for both apps
- `theme`, `accent_color`, `font_size` - UI preferences
- `notification_preferences` - Applies to both apps
- `subscription_tier` - Access control for both apps

**Clarity Coach Specific:**
- `communication_style`
- `quiz_completed`, `quiz_score`, `archetype`
- `tutorial_completed`

**Leadership Leader Specific (New):**
- `leadership_theories` (JSONB) - Which theories they align with
- `leadership_style` - Discovered through assessments
- `leadership_quiz_completed`, `leadership_score`

### 2. Contacts (`contacts`)
**100% Shared - Critical for Both Apps:**
- User's frequently communicated people
- Neurotype, generation, political identity of each contact
- Communication preferences and history

**Why This Matters:**
- Clarity Coach: Improves translations over time with same person
- Leadership Leader: Informs AI scenario simulations based on real people's communication styles

### 3. Contact Interactions (`contact_interactions`)
**Shared tracking:**
- Both apps track interactions with the same contacts
- New field: `app_type` (enum: 'clarity_coach', 'leadership_leader')
- Shared metrics: `interaction_count`, `success_rate`, `progress_score`

---

## Leadership Leader Specific Data Models

### 1. `leadership_assessments`
Tracks completed leadership assessments (DISC, Leadership Circles, custom surveys)

\`\`\`sql
CREATE TABLE leadership_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type VARCHAR(50) NOT NULL, -- 'disc', 'leadership_circles', 'custom'
  assessment_name VARCHAR(255),
  results JSONB NOT NULL, -- Flexible structure for different assessment types
  theories_identified TEXT[], -- ['transformational', 'servant', 'inclusive']
  strengths TEXT[],
  growth_areas TEXT[],
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 2. `leadership_scenarios`
Pre-built and custom scenarios for leadership practice

\`\`\`sql
CREATE TABLE leadership_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'conflict_resolution', 'team_motivation', 'change_management'
  difficulty VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
  is_common BOOLEAN DEFAULT FALSE, -- Pre-built common scenarios
  created_by UUID REFERENCES auth.users(id), -- NULL for system scenarios
  scenario_data JSONB NOT NULL, -- Context, stakeholders, challenges
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 3. `scenario_simulations`
User's practice runs through scenarios with AI

\`\`\`sql
CREATE TABLE scenario_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES leadership_scenarios(id),
  contact_ids UUID[], -- Which contacts' neurotypes were used
  user_actions JSONB[], -- Array of decisions made
  ai_responses JSONB[], -- AI feedback on each action
  outcome_summary TEXT,
  leadership_theories_used TEXT[],
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 4. `action_plans`
Growth plans created from scenarios or reflections

\`\`\`sql
CREATE TABLE action_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  goals TEXT[],
  actions JSONB[], -- { action: string, completed: boolean, target_date: date }
  related_scenario_id UUID REFERENCES scenario_simulations(id),
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'archived'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 5. `leadership_reflections`
Diary-style entries about real-world leadership challenges

\`\`\`sql
CREATE TABLE leadership_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  situation TEXT NOT NULL, -- What happened
  actions_taken TEXT NOT NULL, -- What they did
  outcome TEXT, -- What resulted
  later_thoughts TEXT, -- Reflection after time passed
  theories_applied TEXT[], -- Which leadership theories they used
  lessons_learned TEXT[],
  related_contacts UUID[], -- Which contacts were involved
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 6. `leadership_growth_metrics`
Aggregate growth tracking over time

\`\`\`sql
CREATE TABLE leadership_growth_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_date DATE DEFAULT CURRENT_DATE,
  scenarios_completed INTEGER DEFAULT 0,
  action_plans_active INTEGER DEFAULT 0,
  action_plans_completed INTEGER DEFAULT 0,
  reflections_count INTEGER DEFAULT 0,
  theory_alignment JSONB, -- { transformational: 0.8, servant: 0.6, ... }
  growth_score DECIMAL(3,2), -- 0.00 to 1.00
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, metric_date)
);
\`\`\`

---

## Database Consolidation Recommendations

### Phase 1: Migrate Firebase Data to Supabase (Optional - Can Do Later)
1. Create `feedback` table in Supabase
2. Create `stories` table in Supabase
3. Migrate existing Firebase data
4. Update API routes to use Supabase
5. Remove Firebase dependency

**Benefits:** Unified database, simpler queries, better RLS security

**Timeline:** Can be deferred; not blocking Leadership Leader launch

### Phase 2: Extend Shared Tables for Both Apps
1. Add Leadership Leader fields to `user_profiles`
2. Add `app_type` to `contact_interactions`
3. Update RLS policies to support both apps

### Phase 3: Create Leadership Leader Tables
1. Run SQL migration for all Leadership Leader tables
2. Set up RLS policies
3. Create API routes for new features

---

## Shared Infrastructure Components

### 1. Authentication
- **Supabase Auth** (already implemented)
- Same login works for both apps
- Same user_profiles table

### 2. Contact Management
- **Single contacts system** used by both apps
- Clarity Coach populates contact neurotypes through communication
- Leadership Leader uses those neurotypes for scenario simulations

### 3. Dashboard Integration
- **Unified Hearthside Works Dashboard** at `/account/dashboard`
- Shows activity from both apps
- Separate widgets for Clarity Coach and Leadership Leader metrics

### 4. Navigation
- **App Switcher** in header/navigation
- Quick toggle between Clarity Coach and Leadership Leader
- Shared user menu and settings

---

## Leadership Leader Build Phases

### Alpha 0.1 - Phase 1: Foundation (Week 1-2)
**Goal:** Basic structure and navigation

- [ ] Create `/apps/leadership` directory structure  
- [ ] Leadership Leader landing page (`/apps/leadership/page.tsx`)
- [ ] Navigation header with Alpha 0.1 badge
- [ ] Separate roadmap and changelog (starting at Alpha 0.1)
- [ ] Database migration script with all tables
- [ ] Basic RLS policies

### Alpha 0.2 - Phase 2: Leadership Assessment System (Week 3-4)
**Goal:** Users can discover their leadership style

- [ ] Assessment selection page
- [ ] DISC profile assessment
- [ ] Leadership theory alignment quiz
- [ ] Results page showing theories, strengths, growth areas
- [ ] Save results to `leadership_assessments` table
- [ ] Update user profile with leadership style

### Alpha 0.3 - Phase 3: Scenario System (Week 5-6)
**Goal:** Users can practice leadership through AI scenarios

- [ ] Scenario library page (common scenarios)
- [ ] Custom scenario creator
- [ ] AI simulation engine (integrates contact neurotypes)
- [ ] Real-time AI feedback during scenarios
- [ ] Scenario completion summary
- [ ] Save to `scenario_simulations` table

### Alpha 0.4 - Phase 4: Growth Tracking (Week 7-8)
**Goal:** Users track progress and create action plans

- [ ] Growth Tracker dashboard
- [ ] Action plan creator (from scenarios or standalone)
- [ ] Action plan management (mark actions complete)
- [ ] Leadership reflection journal
- [ ] Growth metrics visualization
- [ ] Progress over time charts

### Alpha 0.5 - Phase 5: Dashboard Integration (Week 9)
**Goal:** Unified Hearthside Works experience

- [ ] Update main dashboard with Leadership Leader widgets
- [ ] Cross-app analytics (communication + leadership)
- [ ] Shared contact insights (how they impact both apps)
- [ ] Unified growth trajectory view

---

## Versioning Strategy

### Clarity Coach (Beta 4.5)
- Mature product with established features
- Beta indicates feature-complete but still gathering user feedback
- Roadmap focuses on refinement and optimization
- Independent release schedule

### Leadership Leader (Alpha 0.1 → Alpha 0.5)
- New product in early development
- Alpha indicates core features being built and tested
- Rapid iteration and feature additions
- Will move to Beta 1.0 after all core features proven

### Shared Infrastructure
- Database schema updates (scripts) are versioned independently
- Shared components maintain backward compatibility
- Breaking changes require coordination between both apps

---

## Technical Architecture

### Shared Libraries
\`\`\`
lib/
  supabase/
    client.ts        # Used by both apps
    server.ts        # Used by both apps
  email-templates.ts # Used by both apps for notifications
  export-utils.ts    # Export functionality for both apps
\`\`\`

### App-Specific Code
\`\`\`
app/
  apps/
    clarity/         # Clarity Coach (existing)
    leadership/      # Leadership Leader (new)
      page.tsx       # Landing page
      dashboard/     # Leadership dashboard
      assess/        # Assessment system
      scenarios/     # Scenario library & simulator
      growth/        # Growth tracker & action plans
      reflections/   # Leadership journal
      roadmap/       # Leadership Leader roadmap
      changelog/     # Leadership Leader changelog
\`\`\`

### API Routes
\`\`\`
app/api/
  leadership/
    assessments/     # CRUD for assessments
    scenarios/       # Scenario management
    simulations/     # Run AI simulations
    action-plans/    # Action plan CRUD
    reflections/     # Reflection journal CRUD
    growth/          # Growth metrics
\`\`\`

---

## Data Flow Example: AI Scenario Simulation

1. **User starts scenario:** "Team conflict resolution"
2. **System fetches:**
   - User's leadership style from `user_profiles`
   - User's leadership theories from `leadership_assessments`
   - Contact neurotypes from `contacts` (for simulated team members)
3. **AI generates:** Scenario context with team members matching contact profiles
4. **User makes decisions:** Each choice recorded in `scenario_simulations.user_actions`
5. **AI responds:** Based on leadership theories + contact neurotypes
6. **Scenario completes:** Summary generated, growth areas identified
7. **Optional:** User creates action plan in `action_plans`

This flow demonstrates how Leadership Leader leverages Clarity Coach contact data to create realistic, personalized scenarios.

---

## Migration Script Checklist

### Script 020: Leadership Leader Foundation
\`\`\`sql
-- Extend user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS leadership_theories JSONB;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS leadership_style VARCHAR(50);
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS leadership_quiz_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS leadership_score INTEGER;

-- Extend contact_interactions
ALTER TABLE contact_interactions ADD COLUMN IF NOT EXISTS app_type VARCHAR(20) DEFAULT 'clarity_coach';

-- Create new tables (as shown above)
CREATE TABLE leadership_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type VARCHAR(50) NOT NULL, -- 'disc', 'leadership_circles', 'custom'
  assessment_name VARCHAR(255),
  results JSONB NOT NULL, -- Flexible structure for different assessment types
  theories_identified TEXT[], -- ['transformational', 'servant', 'inclusive']
  strengths TEXT[],
  growth_areas TEXT[],
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leadership_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'conflict_resolution', 'team_motivation', 'change_management'
  difficulty VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
  is_common BOOLEAN DEFAULT FALSE, -- Pre-built common scenarios
  created_by UUID REFERENCES auth.users(id), -- NULL for system scenarios
  scenario_data JSONB NOT NULL, -- Context, stakeholders, challenges
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE scenario_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES leadership_scenarios(id),
  contact_ids UUID[], -- Which contacts' neurotypes were used
  user_actions JSONB[], -- Array of decisions made
  ai_responses JSONB[], -- AI feedback on each action
  outcome_summary TEXT,
  leadership_theories_used TEXT[],
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE action_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  goals TEXT[],
  actions JSONB[], -- { action: string, completed: boolean, target_date: date }
  related_scenario_id UUID REFERENCES scenario_simulations(id),
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'archived'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leadership_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  situation TEXT NOT NULL, -- What happened
  actions_taken TEXT NOT NULL, -- What they did
  outcome TEXT, -- What resulted
  later_thoughts TEXT, -- Reflection after time passed
  theories_applied TEXT[], -- Which leadership theories they used
  lessons_learned TEXT[],
  related_contacts UUID[], -- Which contacts were involved
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leadership_growth_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_date DATE DEFAULT CURRENT_DATE,
  scenarios_completed INTEGER DEFAULT 0,
  action_plans_active INTEGER DEFAULT 0,
  action_plans_completed INTEGER DEFAULT 0,
  reflections_count INTEGER DEFAULT 0,
  theory_alignment JSONB, -- { transformational: 0.8, servant: 0.6, ... }
  growth_score DECIMAL(3,2), -- 0.00 to 1.00
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, metric_date)
);

-- RLS policies for all new tables
\`\`\`

---

## Success Metrics

### Technical Success
- Zero database conflicts between apps
- Single authentication system
- Shared contact data flows correctly
- No duplicate API calls or connections

### User Experience Success
- Seamless switching between Clarity Coach and Leadership Leader
- Contact data from Clarity Coach enhances Leadership Leader scenarios
- Unified dashboard shows holistic growth
- Single notification system works for both apps

---

## Next Steps

1. **Review this plan** - Confirm separate versioning aligns with vision
2. **Decision: Vertex AI Migration** - Complete before Leadership Leader or during?
3. **Create migration script 020** - All Leadership Leader database tables
4. **Build Alpha 0.1** - Basic structure and navigation with Alpha badge
5. **Iterate through Alpha phases** - Building one feature set at a time

**Current Priority Questions:**
1. Should we complete Vertex AI migration (to use Google credits) before starting Leadership Leader?
2. Defer Firebase consolidation to Beta 6.0 as planned?
3. Ready to begin Alpha 0.1 foundation?
