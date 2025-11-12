import { Card } from "@/components/ui/card"

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Changelog</h1>
        <p className="text-muted-foreground mb-8">Track updates, improvements, and new features.</p>

        <div className="space-y-6">
          {/* Beta v4.0 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v4.0</h2>
              <span className="text-sm text-muted-foreground">Current Version</span>
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
