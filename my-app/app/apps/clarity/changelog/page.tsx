import { Card } from "@/components/ui/card"

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Changelog</h1>
        <p className="text-muted-foreground mb-8">Track updates, improvements, and new features.</p>

        <div className="space-y-6">
          {/* Beta v3.7 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.7</h2>
              <span className="text-sm text-muted-foreground">Current Version</span>
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
