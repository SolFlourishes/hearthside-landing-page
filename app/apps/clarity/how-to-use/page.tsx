import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, User, Lightbulb } from "lucide-react"

export default function HowToUsePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">How to Use Clarity Coach</h1>

        <Card className="p-6 bg-primary/5 border-primary/20 mb-6">
          <div className="flex items-start gap-3">
            <User className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-serif text-xl font-bold text-primary mb-2">✨ New: Personalized Accounts</h2>
              <p className="text-muted-foreground mb-3">
                Create an account to save your communication profile and get personalized coaching across all features.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>
                  <strong>Take the Communication Quiz</strong> to discover your style (Analyzer, Harmonizer, etc.)
                </li>
                <li>
                  <strong>Save your profile</strong> (neurotype, generation, communication preferences)
                </li>
                <li>
                  <strong>Auto-populated context</strong> in Draft, Analyze, and Chat modes
                </li>
                <li>
                  <strong>Track your communication growth</strong> over time
                </li>
              </ul>
              <div className="flex gap-2 mt-4">
                <Link href="/account/communication-quiz">
                  <Button size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Take Communication Quiz
                  </Button>
                </Link>
                <Link href="/account/profile">
                  <Button size="sm" variant="outline">
                    Manage Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Draft Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Draft Mode when you need to compose a clear, effective message that will be understood as intended.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>What do you want to achieve?</strong> — Explain your goal or intent (e.g., "I want to ask for a
                promotion")
              </li>
              <li>
                <strong>What are you thinking of saying?</strong> — Write your initial draft or raw thoughts
              </li>
              <li>
                <strong>Add Context (Optional):</strong> Expand "Add Context for Better Results" to provide:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Your neurotype and generation</li>
                  <li>Your audience's neurotype, generation, and your relationship with them</li>
                </ul>
              </li>
              <li>Click "Translate My Message" to receive guidance</li>
              <li>
                Review <strong>"How They Might Hear It"</strong> to understand potential interpretations
              </li>
              <li>
                Use <strong>"The Translation"</strong> as your refined message, or edit it further
              </li>
              <li>Edit and re-analyze if needed to perfect your message</li>
            </ol>
            <Link href="/apps/clarity/draft">
              <Button className="mt-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Draft Mode
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Analyze Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Analyze Mode when you've received a message and want to understand what they really meant.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>What did they say?</strong> — Paste the message you received
              </li>
              <li>
                <strong>How did you interpret it?</strong> — Share your initial reaction or interpretation
              </li>
              <li>
                <strong>Situation Context (Optional)</strong> — Provide background about the situation
              </li>
              <li>
                <strong>Add Conversation History (Optional)</strong> — Upload related documents for full context
              </li>
              <li>
                <strong>Add Context (Optional):</strong> Expand "Add Context for Better Results" to specify:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Their neurotype, generation, and your relationship</li>
                  <li>Your neurotype and generation</li>
                </ul>
              </li>
              <li>Click "Analyze This Message" to decode the intent</li>
              <li>
                Review <strong>"What They Likely Meant"</strong> to understand subtext and potential meanings
              </li>
              <li>
                Use the <strong>"Suggested Response"</strong> to reply effectively
              </li>
            </ol>
            <Link href="/apps/clarity/analyze">
              <Button className="mt-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Analyze Mode
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Chat Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Chat Mode for real-time coaching on navigating tricky conversations.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Describe your communication challenge or question</li>
              <li>Have a back-and-forth conversation with the AI coach</li>
              <li>Get personalized advice, strategies, and examples</li>
              <li>Ask follow-up questions to dive deeper</li>
            </ol>
            <Link href="/apps/clarity/chat">
              <Button className="mt-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Chat Mode
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">PoliTalk Explorer</h2>
            <p className="text-muted-foreground mb-4">
              Use PoliTalk Explorer to understand why people across the political spectrum hold different beliefs and
              what their words really mean.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Select a position</strong> from the topic library or enter your own
              </li>
              <li>
                <strong>Choose their identity</strong> — Political stance and values of the person holding this belief
              </li>
              <li>
                <strong>Choose your identity</strong> — Your own political perspective and values
              </li>
              <li>Click "Explore" to receive an analysis</li>
              <li>
                Review <strong>"The Underlying Framework"</strong> to understand their moral foundations
              </li>
              <li>
                See <strong>"Bridging the Gap"</strong> for connection strategies across worldviews
              </li>
            </ol>
            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> Why might a conservative be "pro-life" yet oppose welfare programs? PoliTalk
                Explorer explains the internal consistency of different moral frameworks using research from George
                Lakoff's Moral Politics and Moral Foundations Theory.
              </p>
            </div>
            <Link href="/apps/clarity/politalk-explorer">
              <Button className="mt-4">
                <Lightbulb className="w-4 h-4 mr-2" />
                Try PoliTalk Explorer
              </Button>
            </Link>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Understanding Context Options</h2>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Neurotypes</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Autism:</strong> Prefers literal, direct language without implied meanings
                  </li>
                  <li>
                    <strong>ADHD:</strong> May provide extra context or jump between ideas
                  </li>
                  <li>
                    <strong>Neurotypical:</strong> Comfortable with social hints and indirect communication
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Generations</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Boomer (1946-1964):</strong> Values formality, hierarchy, and thorough context
                  </li>
                  <li>
                    <strong>Gen X (1965-1980):</strong> Direct, independent, appreciates efficiency
                  </li>
                  <li>
                    <strong>Xennial (1977-1983):</strong> Bridge between analog and digital communication
                  </li>
                  <li>
                    <strong>Millennial (1981-1996):</strong> Collaborative, values authenticity
                  </li>
                  <li>
                    <strong>Gen Z (1997-2012):</strong> Prefers brevity, visual communication, authenticity
                  </li>
                  <li>
                    <strong>Gen Alpha (2013+):</strong> Digital natives, ultra-brief communication
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Why This Matters</h3>
                <p>
                  The AI automatically detects communication style from the actual message. Context about neurotype,
                  generation, and relationship helps provide more nuanced, accurate guidance that accounts for how
                  different people naturally communicate.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Tips for Best Results</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Create an account</strong> — Save your communication profile to get personalized coaching
                automatically
              </li>
              <li>
                <strong>Take the Communication Quiz</strong> — Discover your archetype and how it affects your
                interactions
              </li>
              <li>
                <strong>Be specific about your goal</strong> — The more detail about what you want to achieve, the
                better the guidance
              </li>
              <li>
                <strong>Context is optional but powerful</strong> — Profile data auto-populates if you're logged in
              </li>
              <li>
                <strong>Start simple</strong> — You don't need to fill out every field. The core inputs are enough for
                good results
              </li>
              <li>
                <strong>The AI detects style automatically</strong> — You don't need to self-assess whether you're
                "direct" or "indirect"
              </li>
              <li>
                <strong>Edit and iterate</strong> — Use the edit feature to refine translations and get feedback
              </li>
              <li>Remember: The AI is a coach, not a crutch—use it to build your own skills over time</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
