import { Card } from "@/components/ui/card"
import { Check, Circle } from "lucide-react"

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Application Roadmap</h1>
        <p className="text-muted-foreground mb-8">
          We believe in transparency. This page outlines our current state and future vision, divided into Beta
          (Stabilization and Free Features) and Gamma (Premium Features) phases.
        </p>

        <div className="space-y-6">
          {/* Beta 4.0 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 4.0</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">User Accounts & Personalization</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>User authentication system with email/password and OAuth (Google, LinkedIn)</li>
                  <li>User profiles with neurotype, generation, and bio customization</li>
                  <li>Avatar upload with Vercel Blob integration</li>
                  <li>
                    Communication Style Quiz to discover your archetype (Analyzer, Harmonizer, Strategist, Advocate,
                    Adapter)
                  </li>
                  <li>Comprehensive results page explaining your communication preferences and strengths</li>
                  <li>
                    Auto-populated context in Clarity Coach - your profile data automatically loads in Draft, Analyze,
                    and Chat modes
                  </li>
                  <li>Visual indicators showing when profile data is being used vs. manual selection</li>
                  <li>User dashboard with quick access to profile, quiz, settings, and Clarity Coach</li>
                  <li>Secure session management and authentication state persistence</li>
                  <li>Cross-platform access to all Hearthside Works apps and games</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.10 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.10</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Quality of Life Improvements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Fixed critical loading errors and type safety issues in political identity system</li>
                  <li>Added comprehensive error boundaries for graceful error recovery</li>
                  <li>Removed debug console logs and improved production error handling</li>
                  <li>
                    Implemented admin authentication for secure admin API routes (temporary until Beta 4.0 role system)
                  </li>
                  <li>Added privacy consent banner and age verification for COPPA compliance</li>
                  <li>Created reusable EmptyState and LoadingState components for consistent UX</li>
                  <li>Enhanced security, performance, and user experience across the application</li>
                  <li>Prepared codebase for Beta 4.0 accounts and role-based permissions system</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.9 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.9</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Positionality & Lived Experience (Part 1)</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Integrated 3 foundational documents on socioeconomic class, trauma, and lived experience</li>
                  <li>
                    Added Ruby Payne's Framework for Understanding Poverty - understanding "hidden rules" of economic
                    classes, language registers (casual vs. formal), and resource inequalities
                  </li>
                  <li>
                    Added critical analysis of class-based deficit perspectives - recognizing systemic classism,
                    structural barriers in education, and the harm of stereotyping people in poverty
                  </li>
                  <li>
                    Added The Body Keeps the Score framework - understanding how trauma is stored in the body,
                    fragmented memory systems, and the neurobiology of PTSD
                  </li>
                  <li>
                    Enhanced AI responses with awareness of socioeconomic communication differences, trauma-informed
                    approaches, and class-based power dynamics
                  </li>
                  <li>
                    Improved sensitivity to how poverty, class background, and trauma history shape communication
                    patterns and expectations
                  </li>
                  <li>Part 2 will add Global & Non-Western communication frameworks</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.8 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.8</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Politalk: Cross-Political Communication</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Added political identity context selectors (Conservative, Moderate, Progressive) to Draft and
                    Analyze modes
                  </li>
                  <li>
                    Integrated 5 expert documents on political discourse, polarization, and cross-ideological
                    communication
                  </li>
                  <li>
                    Grounded AI advice in research on moral foundations, political psychology, and epistemic differences
                    across the political spectrum
                  </li>
                  <li>
                    Enhanced translations to bridge political divides with empathy, shared values discovery, and
                    de-escalation strategies
                  </li>
                  <li>
                    Added foundational research on Moral Foundations Theory (care, fairness, loyalty, authority,
                    sanctity)
                  </li>
                  <li>
                    Integrated Political Discourse Analysis frameworks for detecting framing, presuppositions, and
                    rhetorical strategies
                  </li>
                  <li>
                    Added psychological research on political identity, motivated reasoning, and in-group/out-group
                    dynamics
                  </li>
                  <li>
                    Included epistemic frameworks explaining how conservatives and progressives prioritize different
                    sources of knowledge
                  </li>
                  <li>
                    Added practical de-polarization strategies: shared values discovery, affective empathy,
                    perspective-taking, and collaborative problem-solving
                  </li>
                  <li>
                    Extended Double Empathy Problem framework to cross-political communication challenges and mutual
                    misunderstanding
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.7 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.7</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  RAG Phase 3: Advanced Frameworks - Power, Culture & Cognition
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Integrated 8 new expert documents covering advanced communication frameworks, cognitive biases, and
                    social theory
                  </li>
                  <li>
                    Added Foucault's Discipline and Punish - power dynamics, institutional communication, and the shift
                    from body to soul in modern discourse
                  </li>
                  <li>
                    Added Double Empathy Problem and Mutual Misunderstanding - Relevance Theory, mutual manifestness,
                    and bidirectional communication failures
                  </li>
                  <li>
                    Added Nonverbal Communication framework - channels (face, voice, gesture), functions
                    (identification, relationship, emotion), and cultural variations
                  </li>
                  <li>
                    Added Kahneman's Thinking, Fast and Slow - System 1/System 2 thinking, cognitive biases, heuristics,
                    and decision-making under uncertainty
                  </li>
                  <li>
                    Added Neurodiverse Relationships research - facilitators, challenges, and successful strategies in
                    neurodiverse intimate partnerships
                  </li>
                  <li>
                    Added Missing Responses analysis - communication disruptions, adjacency pairs, and
                    neurotype-specific coping strategies
                  </li>
                  <li>
                    Added Hofstede's Cultural Dimensions - Power Distance, Uncertainty Avoidance,
                    Individualism/Collectivism, Masculinity/Femininity, Long-term Orientation
                  </li>
                  <li>
                    Added Accepting Boundaries framework - reciprocity, barrier-free communication, and mutual
                    adaptation in neurodiverse interactions
                  </li>
                  <li>
                    Enhanced AI responses with deeper understanding of power structures, cultural mental programs,
                    cognitive shortcuts, and cross-neurotype communication dynamics
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.6 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.6</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">The UX Redesign</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Redesigned interface with progressive disclosure - core inputs immediately visible, context options
                    collapsible
                  </li>
                  <li>
                    Removed unreliable "Direct/Indirect" self-assessment selector - AI now auto-detects communication
                    style from actual message
                  </li>
                  <li>
                    Added meaningful communication profiles for neurotypes (Autism, ADHD, Neurotypical) with specific
                    behavioral guidance
                  </li>
                  <li>
                    Added generation-specific profiles (Boomer through Gen Alpha) with cultural and communication
                    context
                  </li>
                  <li>
                    Added relationship context selector (colleague, manager, friend, etc.) for situational guidance
                  </li>
                  <li>
                    Implemented informative tooltips explaining what neurotypes mean and generation year ranges (e.g.,
                    "Gen Z: 1997-2012")
                  </li>
                  <li>
                    Added AnalysisInfoCard showing detected communication style and selected context after
                    translation/analysis
                  </li>
                  <li>
                    Reduced cognitive load with clearer information hierarchy and "Add Context for Better Results"
                  </li>
                  <li>
                    Added helpful intro text to Draft and Analyze pages with links to "How to Use" for detailed guidance
                  </li>
                  <li>
                    Updated "How to Use" page to reflect new simplified interface and explain context options clearly
                  </li>
                  <li>Maintained all accessibility features with proper ARIA labels and semantic HTML</li>
                  <li>All safety features remain fully intact (content filtering, crisis intervention, reporting)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.5 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.5</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">The Safety Update</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Implemented comprehensive multi-layered safety system with content filtering and crisis intervention
                  </li>
                  <li>
                    Added tiered access model: Anonymous (no age gate), Authenticated (13+), and Supervised (under 13
                    with consent)
                  </li>
                  <li>
                    Trauma-informed content safety that supports sensitive conversations while providing appropriate
                    resources
                  </li>
                  <li>Rate limiting using Upstash Redis to prevent abuse and ensure fair usage</li>
                  <li>Output validation to catch potentially harmful AI responses before delivery</li>
                  <li>User reporting system allowing users to flag concerning AI responses</li>
                  <li>Comprehensive Terms of Service and Privacy Policy with COPPA compliance</li>
                  <li>Crisis resources integration (988 Suicide & Crisis Lifeline, Crisis Text Line)</li>
                  <li>
                    Professional disclaimers clarifying tool limitations and encouraging professional help when needed
                  </li>
                  <li>Enhanced safety for Clarity Coach Junior with age-appropriate content filtering</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.4 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.4</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Clarity Coach Junior</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Audience selector for kid-friendly communication (Parent-to-Kid, Kid-to-Parent, Kid-to-Kid)</li>
                  <li>Age-appropriate language and explanations tailored for children</li>
                  <li>Integrated 8 new expert documents on child development and communication</li>
                  <li>Emotion regulation strategies for children with autism (whole-brain integration)</li>
                  <li>Comprehensive neurodiversity resources for families and educators</li>
                  <li>Social Stories intervention framework for explaining social situations</li>
                  <li>Parent-child communication strategies (How to Talk So Kids Will Listen)</li>
                  <li>Understanding autism characteristics, strengths, and support needs</li>
                  <li>Explaining ADHD to kids using relatable analogies and strengths-based language</li>
                  <li>Parent-mediated early intervention evidence and best practices</li>
                  <li>Enhanced support for family communication across all neurotypes</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.3 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.3</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">RAG Phase 2: Social Dynamics and Learning</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Expanded knowledge base with 10 new expert documents on social dynamics</li>
                  <li>Growth mindset and psychological safety frameworks (Dweck, Edmondson)</li>
                  <li>Generational communication patterns and Gen Z workplace dynamics</li>
                  <li>Gender communication differences and rapport-building (Tannen)</li>
                  <li>Cultural communication contexts and time systems (Hall)</li>
                  <li>Impression management and social performance theory (Goffman)</li>
                  <li>Interactional expertise and inclusive communication strategies</li>
                  <li>Double empathy theory in expository contexts</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.2 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.2</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">RAG Phase 1: Neurodiversity and Empathy</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Integration of Retrieval-Augmented Generation (RAG)</li>
                  <li>Ground AI advice in factual, evidence-based knowledge base</li>
                  <li>Expert documents on autism, ADHD, and the Double Empathy Problem</li>
                  <li>Enhanced accuracy and reliability of translations</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.1 - Completed (formerly 3.2) */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.1</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">General Polish</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>UI/UX enhancements and refinements</li>
                  <li>Power-user features and shortcuts</li>
                  <li>Accessibility improvements (WCAG 2.1 Level AA compliance)</li>
                  <li>Quality-of-life improvements based on user feedback</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 3.0 - Completed */}
          <Card className="p-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.0</h2>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Core Infrastructure Redesign</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Complete re-design of backend infrastructure</li>
                  <li>UI redesign with Tailwind CSS</li>
                  <li>Implementation of the Golden Feedback Loop</li>
                  <li>Enhanced user experience and performance</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma Phase Header */}
          <div className="pt-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Gamma Phase (Premium Features)</h2>
            <p className="text-muted-foreground mb-6">
              The Gamma phase introduces premium features and monetization, enabling sustainable growth while
              maintaining our commitment to universal access through the Elder Program.
            </p>
          </div>

          {/* Gamma 1.0 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.0</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Monetization / Personalization</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>User profiles and authentication</li>
                  <li>Conversation history and saved drafts</li>
                  <li>Premium tier launch</li>
                  <li>Elder Program implementation</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.1 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.1</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Generational & Professionalism Analysis</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>The Professionalism Lens: Analyze perceived professionalism</li>
                  <li>Enhanced generational context awareness</li>
                  <li>Hierarchical communication patterns analysis</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.2 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.2</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Advanced Cross-Cultural Analysis</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>International & Cultural Translation</li>
                  <li>Multiple language support</li>
                  <li>Cultural context awareness</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.3 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.3</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Skill Building</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Practice Conversation Simulator</li>
                  <li>Real-time conversation with AI personas</li>
                  <li>Skill development and practice scenarios</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.4 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.4</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Workflow Integration</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Browser & App Extension</li>
                  <li>Integration with email clients</li>
                  <li>Direct integration into web browsers and applications</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.5 */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.5</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Workflow Integration</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Browser & App Extension</li>
                  <li>Integration with email clients</li>
                  <li>Direct integration into web browsers and applications</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
