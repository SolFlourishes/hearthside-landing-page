import { Card } from "@/components/ui/card"
import { Check, Circle, Clock } from "lucide-react"

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

          {/* Beta 3.5 - Planning */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 3.5</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planning
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  RAG Phase 3: Advanced Frameworks - Power, Culture & Cognition
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Power dynamics and hierarchical communication</li>
                  <li>Cultural communication patterns and cross-cultural understanding</li>
                  <li>Cognitive diversity and thinking styles</li>
                  <li>Organizational and institutional communication frameworks</li>
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
                <h3 className="text-lg font-semibold text-primary mb-3">Advanced Ideological Translation</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Politalk: Translate discourse between different ideological viewpoints</li>
                  <li>Bridge political and cultural divides</li>
                  <li>Foster understanding across perspectives</li>
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
                <h3 className="text-lg font-semibold text-primary mb-3">Generational & Professionalism Analysis</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>The Professionalism Lens: Analyze perceived professionalism</li>
                  <li>Generational context awareness</li>
                  <li>Hierarchical communication patterns</li>
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
                <h3 className="text-lg font-semibold text-primary mb-3">Advanced Cross-Cultural Analysis</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>International & Cultural Translation</li>
                  <li>Multiple language support</li>
                  <li>Cultural context awareness</li>
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
                <h3 className="text-lg font-semibold text-primary mb-3">Skill Building</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Practice Conversation Simulator</li>
                  <li>Real-time conversation with AI personas</li>
                  <li>Skill development and practice scenarios</li>
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
