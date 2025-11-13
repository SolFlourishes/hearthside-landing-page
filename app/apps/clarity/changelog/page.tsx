import { Card } from "@/components/ui/card"

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Changelog</h1>
        <p className="text-muted-foreground mb-8">Track updates, improvements, and new features.</p>

        <div className="space-y-6">
          {/* Beta v4.5 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v4.5</h2>
              <span className="text-sm text-muted-foreground">Current Version</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Relationships & Growth: Connection-Focused Features
            </h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Contacts & Relationship Management</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built comprehensive Contacts/Recipients Management system - save frequent communication partners with
                their full context (neurotype, generation, political identity, relationship type)
              </li>
              <li>
                Contacts management page at /account/contacts with add, edit, delete, and view functionality for saved
                communication partners
              </li>
              <li>
                Enhanced RelationshipSelector component to load and display saved contacts for logged-in users with
                auto-population of communication preferences
              </li>
              <li>
                Integrated contact selection into Draft, Analyze, and Chat pages - one-click selection auto-fills all
                context fields
              </li>
              <li>
                Added interaction tracking system that logs each conversation/translation with a contact to build
                communication history
              </li>
              <li>
                Progress tracking shows improvement trends: interaction count, communication effectiveness, response
                quality, and reduced reliance on tool over time
              </li>
              <li>
                Contact Progress Card displays relationship-building journey with visual indicators of growth and
                learning
              </li>
              <li>
                Database schema includes contacts, contact_interactions, and progress metrics with proper RLS policies
                and triggers
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Onboarding & Tutorial System</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created warm, connection-focused Welcome Tutorial that emphasizes building bridges between people over
                product features
              </li>
              <li>
                Multi-step onboarding: Introduction to Clarity Coach mission → Communication Quiz for self-understanding
                → Understanding Others (Draft, Analyze, Chat) → Bridging Divides (PoliTalk Explorer)
              </li>
              <li>Tutorial automatically appears for new users after account creation with skip and replay options</li>
              <li>
                Database trigger ensures new user profiles are created with tutorial_completed: false for seamless
                onboarding experience
              </li>
              <li>
                Frames each feature in terms of empathy, curiosity, and genuine human connection rather than technical
                functionality
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Notification Preferences & Management</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built comprehensive Notification Preferences system at /account/settings/notifications with granular
                user controls
              </li>
              <li>
                Four categories: Communication Activity (saved items, weekly digests), Personal Growth (quiz reminders,
                communication tips), Platform Updates (features, newsletter), Connection Reminders (practice prompts)
              </li>
              <li>
                Master email toggle plus frequency controls (instant, daily, weekly, monthly, never) for each
                notification type
              </li>
              <li>
                Created Admin Notification Management interface at /admin/notifications for creating, scheduling, and
                sending communications
              </li>
              <li>
                Admin scheduler supports immediate sends, scheduled future sends, and draft saving with audience
                targeting options
              </li>
              <li>
                Notification history view shows all sent notifications with recipient counts, delivery status, and
                timestamps
              </li>
              <li>
                Branded email templates using BaseEmailTemplate with Hearthside Works orange gradients, arch logo, and
                connection-focused messaging
              </li>
              <li>
                Email templates for: welcome new users, saved items confirmation, communication tips, feature
                announcements, connection reminders, weekly digests
              </li>
              <li>All emails emphasize relationships and growth, never feeling like spam or product marketing</li>
              <li>Integration with Resend API for reliable email delivery with proper error handling and logging</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Export Functionality</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Implemented comprehensive export system for conversations, translations, and progress reports in
                multiple formats
              </li>
              <li>
                Export formats: Plain Text (.txt), Markdown (.md), JSON (.json) - each optimized for different use cases
              </li>
              <li>
                Individual export buttons on each conversation and translation item with dropdown format selection
              </li>
              <li>
                Batch export functionality to download all conversations or all translations at once as organized
                archives
              </li>
              <li>
                Export files include metadata (timestamp, participants, context), conversation/translation content, and
                Hearthside Works attribution
              </li>
              <li>
                Clean formatting preserves readability for offline reference, sharing with therapists/coaches, or
                documentation purposes
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Dashboard Enhancements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Redesigned dashboard with prominent "Your Communication Profile" card displaying quiz results,
                archetype, neurotype, and generation
              </li>
              <li>
                Added Usage Statistics card showing Clarity Coach activity: translations completed, conversations held,
                saved items, and current streak
              </li>
              <li>
                Created Recent Activity feed displaying latest Clarity Coach sessions with mode indicators and
                timestamps
              </li>
              <li>
                Reorganized Quick Actions into three categories: Clarity Coach (Draft, Analyze, Chat, PoliTalk), Profile
                & Settings, Resources
              </li>
              <li>
                Resources section updated to feature "Becoming an Elder" and "Conversations" links replacing individual
                program links
              </li>
              <li>Dashboard now provides comprehensive at-a-glance view of communication journey and progress</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Save Features & Organization</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Added "Save Conversation" button to Chat page (appears after first exchange) for storing meaningful
                dialogues
              </li>
              <li>
                Added "Save Translation" buttons to Draft and Analyze pages (appear with results) for preserving
                communication insights
              </li>
              <li>All save features require authentication with helpful prompts to log in if user is not signed in</li>
              <li>
                Reorganized Conversations page into tabbed interface: Conversations, Translations, and Drafts sections
              </li>
              <li>
                ConversationsList and TranslationsList components with expand/collapse functionality for clean browsing
              </li>
              <li>Delete functionality for managing saved items with confirmation prompts</li>
              <li>
                Each saved item displays metadata (date, participants, mode) and can be exported individually or in
                batch
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Content & Documentation</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created "Becoming an Elder" page at /becoming-elder explaining mentorship role, community values, and
                linking to Elder Program
              </li>
              <li>
                Updated About page with comprehensive Founder section including professional background, LinkedIn
                profile, and leadership experience
              </li>
              <li>
                Enhanced Clarity Coach product page with clear "Product Status: Beta 4.5" indicator and technology stack
                details
              </li>
              <li>
                Refocused Credits page to "Product & Technical Information" with comprehensive technology architecture,
                AI infrastructure, security measures, and research foundation
              </li>
              <li>Updated Services component with prominent Clarity Coach showcase featuring current version badge</li>
              <li>Comprehensive How to Use page updates documenting all new features with easy-to-access guidance</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Technical Improvements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Fixed archetype consistency between dashboard and quiz results page using standardized
                getCommunicationArchetype() function
              </li>
              <li>
                Created Supabase client singleton patterns to reduce multiple instance warnings and improve performance
              </li>
              <li>
                Database migrations for contacts, notifications, quiz history, tutorial completion, and interaction
                tracking
              </li>
              <li>Comprehensive RLS policies ensuring user data privacy and security across all new tables</li>
              <li>
                Database triggers for automatic profile creation, interaction tracking, and progress metric updates
              </li>
              <li>
                Optimized tutorial loading by removing retry delays and implementing direct profile creation when needed
              </li>
            </ul>

            <p className="mt-4 text-sm text-muted-foreground italic">
              Beta 4.5 transforms Clarity Coach from a one-off translation tool into a relationship-building companion
              that tracks progress, helps users genuinely improve communication skills, and reduces reliance on the tool
              over time through authentic understanding and connection.
            </p>
          </Card>

          {/* Beta v4.1 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v4.1</h2>
              <span className="text-sm text-muted-foreground">Current Version</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">PoliTalk Explorer & Validity Testing</h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">PoliTalk Explorer</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created conversational PoliTalk Explorer tool that goes beyond message translation to explore the
                underlying moral frameworks, value hierarchies, and worldviews that shape political beliefs
              </li>
              <li>
                Implemented granular political identity selection matching Draft/Analyze modes - Progressive, Liberal,
                Moderate, Conservative, Libertarian identities plus additional values (anti-establishment,
                social-justice, law-and-order, nationalist, globalist, etc.)
              </li>
              <li>
                Added "About You" section where users specify their own political identity so AI can tailor explanations
                to bridge the specific gap between their moral framework and the speaker's perspective
              </li>
              <li>
                Built curated topic library with 20+ common divisive political positions organized into six categories:
                Life & Ethics, Immigration & Security, Economy & Welfare, Rights & Freedoms, Environment & Energy, and
                Justice & Policing
              </li>
              <li>
                Users can click "Browse Topic Library" to select pre-written controversial statements and automatically
                populate the exploration field
              </li>
              <li>
                Enhanced AI responses using research from George Lakoff's Moral Politics and Moral Foundations Theory to
                explain how seemingly contradictory positions (e.g., "pro-life" but opposing welfare) are internally
                consistent within different moral frameworks
              </li>
              <li>
                Added intelligent validation that detects mismatches between selected position and political identity
                (e.g., conservative position paired with liberal identity) and prompts user to confirm or swap
              </li>
              <li>
                Clear visual distinction with color-coded cards - blue for "The Person Holding This Belief" and green
                for "Your Perspective"
              </li>
              <li>
                PoliTalk Explorer accessible from main Clarity Coach page alongside Draft, Analyze, and Chat modes
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">
              Translation Consistency Tester (Admin Tool)
            </h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built Translation Consistency Tester in admin panel for validity research and quality assurance testing
              </li>
              <li>
                Performs bidirectional translation testing: forward translation (sender→receiver) followed by reverse
                translation (receiver→sender) to measure semantic preservation
              </li>
              <li>
                Calculates word overlap percentage between original message and final reverse-translated message as
                quantitative consistency metric
              </li>
              <li>
                Provides manual review checklist evaluating core meaning preservation, intent accuracy,
                tone/relationship maintenance, and style appropriateness
              </li>
              <li>
                Displays all three versions (original, forward translation, reverse translation) for qualitative
                comparison
              </li>
              <li>Added to admin dashboard with easy access for administrators</li>
              <li>Admin users now see "Admin Panel" link in profile dropdown menu with shield icon</li>
              <li>
                Validates that Clarity Coach maintains semantic consistency across translation cycles while
                appropriately adapting communication styles
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">UX Improvements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Fixed Draft mode to display original draft message alongside translation results for easy comparison
              </li>
              <li>
                Added prominent "Your Original Draft" card showing the exact message user submitted before seeing AI
                translation
              </li>
              <li>Optimized UserMenu component to reduce excessive re-renders and eliminate ResizeObserver warnings</li>
              <li>Removed redundant pathname-based auth checks that were causing layout thrashing</li>
              <li>Cleaned up debug logging throughout the application for better performance</li>
            </ul>

            <p className="mt-4 text-sm text-muted-foreground italic">
              Beta 4.1 introduces PoliTalk Explorer for understanding political worldviews and the Translation
              Consistency Tester for research validation, advancing Clarity Coach's mission to bridge communication gaps
              across diverse perspectives.
            </p>
          </Card>

          {/* Beta v4.0 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v4.0</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">User Accounts & Personalization</h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Authentication System</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Implemented full user authentication with email/password and OAuth support (Google, LinkedIn)</li>
              <li>
                Fixed critical session persistence issues - authentication state now properly maintained across page
                navigation
              </li>
              <li>
                Resolved cookie synchronization problems between browser, server, and middleware for consistent session
                handling
              </li>
              <li>
                Added secure session management using Supabase SSR with proper cookie chunking for large session data
              </li>
              <li>User menu in header now correctly displays logged-in state with profile avatar</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">User Profiles</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created comprehensive user profile system with neurotype (Autism, ADHD, Neurotypical), generation
                (Boomer through Gen Alpha, including Xennial), and bio fields
              </li>
              <li>
                Implemented avatar upload using Vercel Blob with image validation, size limits, and secure storage
              </li>
              <li>
                Added database migrations to create user_profiles table with all necessary fields including
                communication_style JSONB column
              </li>
              <li>Profile editing interface with communication context section for neurotype and generation</li>
              <li>Back buttons on profile, settings, and quiz pages for easy navigation to dashboard</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Communication Style Quiz</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built interactive 5-question quiz analyzing communication preferences across formality, directness,
                detail level, emotional expression, and conflict style
              </li>
              <li>
                Created comprehensive results page displaying your communication archetype (Analyzer, Harmonizer,
                Strategist, Advocate, or Adapter)
              </li>
              <li>
                Results show strengths, considerations, detailed dimension breakdowns, and impact on Clarity Coach
              </li>
              <li>Quiz results saved to user profile and automatically applied to all Clarity Coach interactions</li>
              <li>Personalized examples showing how your style affects message translations</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Auto-Population in Clarity Coach</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Draft, Analyze, and Chat modes now automatically load user profile data (neurotype, generation,
                communication style)
              </li>
              <li>
                Added prominent profile indicator banners showing which information is being used from your saved
                profile
              </li>
              <li>Visual badges on section headers display "From your profile" when fields are auto-populated</li>
              <li>
                Communication archetype (e.g., "The Analyzer") displayed alongside neurotype and generation for full
                transparency
              </li>
              <li>Users can still manually override any auto-populated fields for specific scenarios</li>
              <li>Link to edit profile directly from Clarity Coach for quick updates to communication preferences</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">User Dashboard</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created user dashboard with quick access cards for Profile, Account Settings, Clarity Coach, Elder
                Program, and Stories
              </li>
              <li>
                Added Communication Quiz card to dashboard for easy access to discover or retake communication style
                quiz
              </li>
              <li>Dashboard displays current user information including email, display name, and member since date</li>
              <li>
                Protected account routes with authentication checks and proper redirects for unauthenticated users
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Bug Fixes & Technical Improvements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Fixed "Could not find table 'public.profiles'" error by standardizing on user_profiles table name</li>
              <li>
                Fixed "Could not find column 'communication_style'" and 'generation' errors by adding missing database
                columns
              </li>
              <li>Resolved avatar upload failures by implementing correct Vercel Blob API integration</li>
              <li>
                Fixed session loss during navigation by ensuring consistent cookie handling across all Supabase clients
              </li>
              <li>Enhanced error handling with detailed logging for debugging authentication and profile issues</li>
              <li>Improved form validation and user feedback throughout profile management flows</li>
            </ul>

            <p className="mt-4 text-sm text-muted-foreground italic">
              Beta 4.0 introduces full user account functionality, enabling personalized Clarity Coach experiences with
              saved preferences and communication profiles. This foundation prepares for subscription management and
              premium features in the Gamma phase.
            </p>
          </Card>

          {/* Beta v3.10 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.10</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Quality of Life Improvements</h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Critical Fixes</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Fixed critical loading error in political values selector that caused application crashes when selecting
                political identities
              </li>
              <li>
                Resolved type safety issues with RadioPillGroup components - added proper null checks and default values
              </li>
              <li>
                Enhanced error handling with proper default parameters and type guards throughout political identity
                system
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Error Handling & Debugging</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Added comprehensive ErrorBoundary component to Clarity layout for graceful error recovery with
                user-friendly fallback UI
              </li>
              <li>
                Removed 80+ debug console.log statements across the application to improve performance and security
              </li>
              <li>
                Preserved error console.error statements for production debugging while cleaning up development-only
                logs
              </li>
              <li>
                ErrorBoundary shows detailed error info in development and clean error message in production with
                refresh option
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Security Improvements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Implemented admin authentication system using environment variable tokens and Bearer auth for secure
                admin API routes
              </li>
              <li>Protected admin endpoints (pending stories, review system) from unauthorized access</li>
              <li>
                Added admin auth middleware that will be replaced with role-based permissions in Beta 4.0 account system
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Privacy & Compliance</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Added comprehensive consent banner for cookie and analytics preferences with "Accept All" and "Essential
                Only" options
              </li>
              <li>
                Implemented age verification modal for COPPA compliance with content filtering for children, teens, and
                adults
              </li>
              <li>
                Created consent manager utility for handling user privacy preferences with localStorage persistence
              </li>
              <li>Integrated consent flow into Clarity Coach layout for full privacy law compliance</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">User Experience Enhancements</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created reusable EmptyState component with icon, title, description, and action button for consistent
                empty state UX
              </li>
              <li>
                Added LoadingState component with spinner for improved loading feedback throughout the application
              </li>
              <li>Enhanced Tales from the White Room page with polished empty state when no stories are available</li>
              <li>Improved error messages and user feedback across all forms and interactions</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Code Quality & Maintenance</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Standardized error handling patterns across API routes and client components</li>
              <li>
                Cleaned up TODO comments and implemented missing functionality (admin auth, feedback widget planning)
              </li>
              <li>Improved type safety throughout political identity and communication profile systems</li>
              <li>Enhanced code documentation and added change comments for better maintainability</li>
            </ul>

            <p className="mt-4 text-sm text-muted-foreground italic">
              Beta 3.10 focused on production readiness, addressing critical bugs, security vulnerabilities, and UX
              polish before moving to the Beta 4.0 accounts phase. All improvements maintain backward compatibility and
              accessibility standards.
            </p>
          </Card>

          {/* Beta v3.9 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.9</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Positionality & Lived Experience</h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Part 1: Socioeconomic Class & Trauma</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Integrated 3 foundational research documents on socioeconomic class, trauma, and lived experience to
                deepen AI understanding of positionality
              </li>
              <li>
                Added Ruby Payne's "A Framework for Understanding Poverty" - comprehensive analysis of economic class
                "hidden rules," language registers (casual vs. formal/consultative), narrative structures (circular vs.
                linear), and multi-dimensional resources (financial, emotional, mental, social capital)
              </li>
              <li>
                Added Paul Gorski's critical analysis "The Classist Underpinnings of Ruby Payne's Framework" -
                understanding systemic classism, deficit perspectives, educational disparities, and how poverty is often
                blamed on individuals rather than structural inequality
              </li>
              <li>
                Added Bessel van der Kolk's "The Body Keeps the Score" - neurobiology of trauma (amygdala, prefrontal
                cortex, vagus nerve), polyvagal theory (social engagement, mobilization, immobilization), traumatic
                memory fragmentation, ACE study findings, epigenetics, and trauma-informed recovery pathways
              </li>
              <li>
                Enhanced AI responses with nuanced understanding of how socioeconomic background shapes communication
                expectations, priorities, and language use
              </li>
              <li>
                Improved trauma-informed communication guidance - recognizing triggers, supporting safety and
                empowerment, avoiding re-traumatization
              </li>
              <li>
                Added awareness of class-based power dynamics in workplace and institutional communication, challenging
                deficit narratives about people experiencing poverty
              </li>
              <li>
                Integrated understanding of how trauma affects communication capacity - speechlessness (Broca's area
                shutdown), loss of context (thalamus shutdown), and body disconnection
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">
              Part 2: Global & Non-Western Perspectives
            </h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Integrated 4 foundational documents on Indigenous research methodologies, African philosophy, and
                intergenerational trauma
              </li>
              <li>
                Added Shawn Wilson's "Research Is Ceremony" - Indigenous research paradigm grounded in relationality,
                where reality itself is relationships, knowledge is relational and shared with all creation, and
                methodology is the process of building more relations through respect, reciprocity, and responsibility
              </li>
              <li>
                Added Ubuntu philosophy framework - African communal ethics based on "A person is a person through other
                persons," emphasizing identity (sharing a way of life through coordinated interaction) and solidarity
                (caring for others' well-being through mutual aid)
              </li>
              <li>
                Added Maria Yellow Horse Brave Heart's Historical Trauma framework - understanding cumulative emotional
                and psychological wounding across generations from massive group trauma, historical unresolved grief,
                loyalty to ancestral suffering, and the intergenerational transmission of trauma through biological,
                psychological, and cultural pathways
              </li>
              <li>
                Enhanced AI responses with understanding of circular discourse patterns (Indigenous storytelling),
                synthesis-first thinking (building relationships before breaking down details), collective knowledge
                ownership, and non-interference communication styles
              </li>
              <li>
                Improved trauma-informed communication guidance - recognizing triggers from historical trauma, building
                trust slowly with marginalized communities, honoring cultural protocols, acknowledging ongoing impacts
                of colonialism and genocide, and supporting community-based healing
              </li>
              <li>
                Added awareness of how Ubuntu values shape communication - prioritizing relationship preservation over
                directness, consensus-seeking over individual positions, and collective responsibility language ("we"
                over "I")
              </li>
              <li>
                Integrated understanding of Western vs. non-Western epistemologies - linear logic vs. circular thinking,
                individual autonomy vs. relational identity, objectivity vs. relational accountability, deconstruction
                vs. synthesis
              </li>
              <li>
                Knowledge base now contains 37 expert documents covering neurodiversity, social dynamics, child
                development, advanced frameworks, political communication, positionality, and global perspectives
              </li>
            </ul>
          </Card>

          {/* Beta v3.8 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.8</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Politalk: Cross-Political Communication</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Added political identity context selectors to Draft and Analyze modes - users can now specify their own
                and their audience's political orientation (Conservative, Moderate, Progressive, Unsure)
              </li>
              <li>
                Integrated 5 comprehensive expert documents on political psychology, discourse analysis, and
                depolarization strategies
              </li>
              <li>
                Added Moral Foundations Theory framework - understanding how conservatives prioritize loyalty,
                authority, and sanctity while progressives emphasize care and fairness
              </li>
              <li>
                Added Political Discourse Analysis - recognizing framing devices, presuppositions, rhetorical
                strategies, and ideological positioning in communication
              </li>
              <li>
                Added Political Identity Psychology - understanding motivated reasoning, identity-protective cognition,
                in-group favoritism, and confirmation bias across the political spectrum
              </li>
              <li>
                Added Conservative vs. Progressive Epistemology - recognizing how different political orientations
                prioritize different knowledge sources (tradition, authority, lived experience, empirical research)
              </li>
              <li>
                Added Depolarization Strategies - practical techniques for shared values discovery, affective empathy,
                perspective-taking, and collaborative problem-solving
              </li>
              <li>
                Extended Double Empathy Problem framework to political communication - recognizing that cross-political
                misunderstanding is bidirectional, not a deficit in either side
              </li>
              <li>
                Enhanced AI responses to bridge ideological divides with empathy, find common ground, and de-escalate
                politically charged conversations
              </li>
              <li>
                Added transparency features showing detected political framing and selected political context in
                AnalysisInfoCard
              </li>
              <li>
                Knowledge base now contains 31 expert documents covering neurodiversity, social dynamics, child
                development, advanced frameworks, and political communication
              </li>
            </ul>
          </Card>

          {/* Beta v3.7 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.7</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              RAG Phase 3: Advanced Frameworks - Power, Culture & Cognition
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Integrated 8 new expert documents expanding the knowledge base with advanced communication theory,
                cognitive psychology, and social frameworks
              </li>
              <li>
                Added Michel Foucault's "Discipline and Punish" - understanding power dynamics in communication, the
                shift from physical to psychological control, and institutional discourse patterns that shape
                professional and hierarchical communication
              </li>
              <li>
                Added Double Empathy Problem and Mutual Misunderstanding research - Relevance Theory framework for
                understanding cross-neurotype communication, mutual manifestness breakdowns, and bidirectional empathy
                failures
              </li>
              <li>
                Added comprehensive Nonverbal Communication framework - covering channels (face, voice, gesture, space),
                functions (identification, relationship, emotion, delivery), cultural variations, and interpretation
                challenges
              </li>
              <li>
                Added Daniel Kahneman's "Thinking, Fast and Slow" - System 1 (fast, automatic, intuitive) vs. System 2
                (slow, deliberate, analytical) thinking, cognitive biases (availability, anchoring, WYSIATI),
                heuristics, and decision-making under risk
              </li>
              <li>
                Added "At the End of the Day, It's Love" research on neurodiverse intimate relationships - understanding
                facilitators (strength-based roles, genuine support), challenges (communication differences, emotional
                interpretation), and successful coping strategies
              </li>
              <li>
                Added Missing Responses analysis - understanding communication disruptions through Conversation
                Analysis, neurotype-specific reasons for missing responses (prioritization, attention patterns), and
                differentiated coping strategies (NT: modification and attention-drawing; ND: repetition and waiting)
              </li>
              <li>
                Added Geert Hofstede's "Culture's Consequences" - five cultural dimensions (Power Distance, Uncertainty
                Avoidance, Individualism/Collectivism, Masculinity/Femininity, Long-term Orientation) and their impact
                on emotional expressivity, proxemics, and communication norms
              </li>
              <li>
                Added Accepting Boundaries framework - reciprocity requirements for barrier-free communication, mutual
                effort balancing, specific adaptations for autistic and non-autistic boundaries, and the role of
                patience and kind attitude
              </li>
              <li>
                Enhanced AI responses with deeper understanding of power structures in communication, cultural "mental
                programs," cognitive shortcuts and biases, relationship dynamics across neurotypes, and the importance
                of accepting diverse communication boundaries
              </li>
              <li>
                Improved context-aware suggestions for hierarchical communication, cross-cultural interactions,
                decision-making scenarios, and neurodiverse relationship contexts
              </li>
              <li>
                Knowledge base now contains 26 expert documents covering neurodiversity, social dynamics, child
                development, and advanced frameworks - providing comprehensive, evidence-based communication guidance
              </li>
            </ul>
          </Card>

          {/* Beta v3.6 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.6</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">The UX Redesign</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Redesigned interface with progressive disclosure pattern - core inputs (goal, message, interpretation)
                immediately visible, context options collapsed by default
              </li>
              <li>
                Removed unreliable "Direct/Indirect/Unsure" self-assessment selector that caused false baselines - AI
                now automatically detects communication style from actual message content
              </li>
              <li>
                Implemented meaningful communication profiles with specific behavioral guidance for each neurotype:
                Autism (literal, direct communication preferences), ADHD (extra context, jumping between ideas),
                Neurotypical (comfortable with social hints)
              </li>
              <li>
                Added generation-specific profiles with cultural communication context for Boomer (1946-1964), Gen X
                (1965-1980), Xennial (1977-1983), Millennial (1981-1996), Gen Z (1997-2012), and Gen Alpha (2013+)
              </li>
              <li>
                Added relationship context selector (colleague, manager, friend, family, romantic partner, etc.) to
                account for power dynamics and situational appropriateness
              </li>
              <li>
                Implemented InfoTooltip component with helpful explanations: neurotype definitions, generation year
                ranges, and how context selections improve results
              </li>
              <li>
                Added AnalysisInfoCard component displaying detected communication style and all selected context
                factors after translation/analysis for full transparency
              </li>
              <li>
                Reduced cognitive load with clearer visual hierarchy: primary inputs in bordered card, optional context
                in collapsible "Add Context for Better Results" section
              </li>
              <li>
                Added concise, helpful introductory text to Draft and Analyze pages explaining core purpose with links
                to "How to Use" for detailed guidance
              </li>
              <li>
                Completely updated "How to Use" page to reflect simplified interface, explain new context options, and
                provide clear guidance on when to use each feature
              </li>
              <li>
                Maintained all accessibility features: proper ARIA labels, semantic HTML, keyboard navigation support,
                screen reader compatibility
              </li>
              <li>
                All safety features remain fully functional: content filtering, crisis intervention, user reporting,
                rate limiting, output validation
              </li>
            </ul>
          </Card>

          {/* Beta v3.5 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.5</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">The Safety Update</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Implemented comprehensive multi-layered safety system with content filtering for crisis situations,
                violence, abuse, illegal activities, and inappropriate content
              </li>
              <li>
                Added tiered access model with three levels: Anonymous (no account, limited features, no data
                collection), Authenticated (13+, full features), and Supervised (under 13 with parental consent)
              </li>
              <li>
                Trauma-informed content safety approach that supports legitimate sensitive conversations (bullying,
                family conflict, identity, mental health) while providing appropriate crisis resources
              </li>
              <li>
                Crisis intervention system that provides immediate resources (988 Suicide & Crisis Lifeline, Crisis Text
                Line) without blocking conversations
              </li>
              <li>
                Rate limiting using Upstash Redis to prevent abuse and ensure fair usage (10 requests per day for
                anonymous users, higher limits for authenticated users)
              </li>
              <li>
                Output validation system that checks AI responses for harmful advice or inappropriate content before
                delivery
              </li>
              <li>
                User reporting system allowing users to flag concerning AI responses with detailed feedback mechanism
              </li>
              <li>
                Comprehensive Terms of Service covering acceptable use, prohibited activities, and user responsibilities
              </li>
              <li>
                Privacy Policy with COPPA compliance, data collection transparency, and user rights (access, deletion,
                portability)
              </li>
              <li>
                Professional disclaimers clarifying that Clarity Coach is not a substitute for professional therapy,
                medical advice, or legal counsel
              </li>
              <li>
                Enhanced safety for Clarity Coach Junior with stricter age-appropriate content filtering and parental
                control options
              </li>
              <li>
                Anonymous access mode allows kids in difficult situations to get communication support without parental
                consent barriers
              </li>
            </ul>
          </Card>

          {/* Beta v3.4 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.4</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Clarity Coach Junior</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Introduced Audience Selector across all modes (Draft, Analyze, Chat) with options for Adult-to-Adult,
                Parent-to-Kid, Kid-to-Parent, and Kid-to-Kid communication
              </li>
              <li>
                AI now adjusts language complexity, tone, and examples based on selected audience for age-appropriate
                communication
              </li>
              <li>Added visual indicators (sparkle icon and amber accent) when using kid-friendly modes</li>
              <li>
                Integrated 8 new expert documents focused on child development, neurodiversity, and family communication
              </li>
              <li>
                Added emotion regulation strategies for children with autism, including whole-brain integration
                techniques (The Whole-Brain Child)
              </li>
              <li>
                Added comprehensive neurodiversity resources including books, organizations, and support materials for
                families
              </li>
              <li>Added Social Stories framework for explaining social situations to children with autism</li>
              <li>Added evidence-based parent-child communication strategies (How to Talk So Kids Will Listen)</li>
              <li>Added detailed autism characteristics, strengths, and understanding resources (What is Autism)</li>
              <li>Added ADHD explanation guide using relatable analogies and strengths-based language for kids</li>
              <li>
                Added parent-mediated early intervention research and best practices for families with young children
              </li>
              <li>Enhanced AI responses to support family communication across all neurotypes and age groups</li>
            </ul>
          </Card>

          {/* Beta v3.3 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.3</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">RAG Phase 2: Social Dynamics and Learning</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Integrated 10 new expert documents covering social dynamics, learning theory, and communication patterns
              </li>
              <li>
                Added Growth Mindset framework (Carol Dweck) - understanding fixed vs. growth mindsets in communication
              </li>
              <li>
                Added Psychological Safety research (Amy Edmondson) - creating fearless organizations and safe
                communication environments
              </li>
              <li>
                Added Generation Z workplace research - understanding Gen Z communication preferences, expectations, and
                intergenerational dynamics
              </li>
              <li>
                Added Generational Differences framework - communication patterns across Baby Boomers, Gen X,
                Millennials, and Gen Z
              </li>
              <li>
                Added Gender Communication research (Deborah Tannen) - rapport-talk vs. report-talk and bridging gender
                communication gaps
              </li>
              <li>
                Added Cultural Communication theory (Edward T. Hall) - high-context vs. low-context communication,
                monochronic vs. polychronic time systems
              </li>
              <li>
                Added Impression Management theory (Erving Goffman) - understanding social performance and the
                presentation of self
              </li>
              <li>
                Added Interactional Expertise strategies - supporting diverse communication styles in mixed neurotype
                conversations
              </li>
              <li>
                Added Inclusive Communication Model - neurodiversity-friendly practices for recruitment, onboarding, and
                retention
              </li>
              <li>
                Added Double Empathy research in expository contexts - understanding communication accuracy across
                neurotypes
              </li>
              <li>Enhanced AI responses with broader social and cultural communication insights</li>
              <li>
                Improved context-aware suggestions for workplace, generational, and cultural communication scenarios
              </li>
            </ul>
          </Card>

          {/* Beta v3.2 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.2</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Document Upload & Analysis</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Added file upload capability across all modes (Draft, Analyze, and Chat)</li>
              <li>Support for PDFs, Word documents, text files, and images (up to 10MB per file)</li>
              <li>AI now analyzes attached documents alongside your message text</li>
              <li>
                Attachment guidance feature provides specific feedback on whether documents should be revised,
                integrated, or kept separate
              </li>
              <li>Enhanced context understanding by combining message intent with document content</li>
              <li>Improved style matching for both message text and attachment content</li>
            </ul>

            <h3 className="text-lg font-semibold text-primary mb-3 mt-6">RAG Phase 1: Neurodiversity and Empathy</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Integrated Retrieval-Augmented Generation (RAG) system with expert knowledge base</li>
              <li>Added 10 expert documents covering autism, ADHD, communication, and the Double Empathy Problem</li>
              <li>Enhanced chat responses with evidence-based, scholarly research</li>
              <li>Improved translation quality with context-aware expert knowledge retrieval</li>
              <li>Implemented semantic search for relevant document retrieval</li>
              <li>Fixed markdown rendering in explanations and translations</li>
            </ul>
          </Card>

          {/* Beta v3.0.2 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.0.2</h2>
              <span className="text-sm text-muted-foreground">January 2025</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Integrated Clarity Coach into main Hearthside Works website</li>
              <li>Added dedicated Clarity Coach navigation header</li>
              <li>Improved mobile responsiveness across all modes</li>
              <li>Enhanced feedback system with separate ratings for explanation and response</li>
              <li>Added edit and re-analyze functionality for AI suggestions</li>
              <li>Fixed API endpoint configuration for better reliability</li>
            </ul>
          </Card>

          {/* Beta v3.0.0 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.0.0</h2>
              <span className="text-sm text-muted-foreground">December 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Launched Beta phase with improved AI model</li>
              <li>Added Advanced Options with neurotype and generation selectors</li>
              <li>Implemented Golden Feedback Loop for user-edited translations</li>
              <li>Enhanced explanation quality with more detailed analysis</li>
              <li>Added loading tips to educate users during translation</li>
            </ul>
          </Card>

          {/* Alpha v1.0 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Alpha v1.0</h2>
              <span className="text-sm text-muted-foreground">October 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Initial release with Draft and Analyze modes</li>
              <li>Intent-first design for accurate message translation</li>
              <li>Communication style selectors (direct/indirect)</li>
              <li>Basic feedback system with star ratings</li>
              <li>Copy-to-clipboard functionality</li>
              <li>Dark mode support</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
