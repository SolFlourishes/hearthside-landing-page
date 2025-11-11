import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Zap, Check, Type } from "lucide-react"

export default function ProjectCohesionPage() {
  const coreIntents = [
    "ATTACK",
    "DEFEND",
    "BIND",
    "DOMINATE",
    "EMBRACE",
    "GIFT",
    "STUDY",
    "TRANSCEND",
    "MANIFEST",
    "ADJUST",
    "FORGE",
    "REPAIR",
    "DECONSTRUCT",
    "NEGOTIATE",
    "OBSERVE",
    "SUBVERT",
    "CULTIVATE",
    "EXILE",
    "AUDIT",
    "RESOLVE",
    "SACRIFICE",
    "UNBIND",
    "RECALL",
    "GATHER",
    "COMMUNICATE",
    "EXPERIENCE",
    "WITNESS",
    "ENDURE",
    "INTERACT",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-slate-900/20" />
          <div className="absolute inset-0 bg-[url('/abstract-digital-fragmented-identity.jpg')] bg-cover bg-center opacity-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
                Project: Cohesion
              </Badge>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
                The World is Waiting for Your True Self
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed text-balance">
                A <span className="text-purple-400 font-semibold">Text-Based</span> Conceptual Sandbox RPG where your{" "}
                <span className="text-purple-400 font-semibold">Identity</span> is the only class.
              </p>
              <p className="text-lg text-slate-400 mb-8 text-balance">
                Type your thoughts, questions, and actions in natural language. The world responds to who you truly are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Pre-Order Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-200 hover:bg-slate-800 text-lg px-8 py-6 bg-transparent"
                >
                  Learn About HearthCore Pass
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Identity Engine Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                  The Most Reactive RPG Ever Created
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Forget predefined dialogue trees. In Project: Cohesion, you communicate with the world using natural,
                  free-form text. Every question, every statement, and every spontaneous thought is analyzed by our
                  cutting-edge Natural Language Processor.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <Card className="bg-slate-800/50 border-purple-500/30">
                  <CardHeader>
                    <Type className="w-12 h-12 text-purple-400 mb-4" />
                    <CardTitle className="text-white">Text-Based</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      Type your actions and dialogue in natural language. No menus, no limitations.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-blue-500/30">
                  <CardHeader>
                    <Brain className="w-12 h-12 text-blue-400 mb-4" />
                    <CardTitle className="text-white">True Cohesion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      Your choices directly shape your in-game identity and the fate of the world.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-teal-500/30">
                  <CardHeader>
                    <MessageSquare className="w-12 h-12 text-teal-400 mb-4" />
                    <CardTitle className="text-white">200+ Verbs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      Over 200 verbs map to nearly 30 core intents, translating your natural language into meaningful
                      actions.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-amber-500/30">
                  <CardHeader>
                    <Zap className="w-12 h-12 text-amber-400 mb-4" />
                    <CardTitle className="text-white">Infinite Reactivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      NPCs remember everything. The world evolves based on your unique approach to every situation.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-8 mb-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Battle-Tested System</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div>
                      <div className="text-5xl font-bold text-purple-400 mb-2">2,000+</div>
                      <div className="text-slate-300">Simulations Completed</div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-blue-400 mb-2">50,000+</div>
                      <div className="text-slate-300">Unique Events Generated</div>
                    </div>
                  </div>
                  <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
                    Our Natural Language Processor has been rigorously tested through thousands of simulations,
                    generating tens of thousands of unique narrative events to ensure deep reactivity.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">The Core Intent System</h3>
                <p className="text-slate-300 mb-6">
                  Your natural language is translated into one of nearly 30 core intents that drive the narrative:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {coreIntents.map((intent) => (
                    <Badge
                      key={intent}
                      variant="outline"
                      className="border-slate-600 text-slate-300 justify-center py-2 font-mono text-xs"
                    >
                      {intent}
                    </Badge>
                  ))}
                </div>
                <p className="text-slate-400 text-sm mt-6 italic">
                  Over 200 different verbs and phrases map to these core intents, allowing for natural, expressive
                  communication with the game world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* World of Cohesion Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                    A World on the Edge of Collapse
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    Reality itself is fragmenting. The world of Cohesion is a place where the boundaries between thought
                    and matter, self and other, are breaking down. Your identity—who you truly are—becomes the key to
                    understanding and perhaps saving this world.
                  </p>
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    Navigate philosophical dilemmas, forge alliances with complex NPCs, and discover the truth behind
                    the fragmentation. Every interaction reveals more about yourself and the nature of reality.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Philosophical</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Choice-Driven</Badge>
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Identity-Based</Badge>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src="/fragmented-reality-digital-world.jpg"
                      alt="Fragmented reality visualization"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HearthCore Service Pass Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">Optional Enhancement</Badge>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">HearthCore Service Pass</h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Experience the world at your own pace with accelerated NLP processing
                </p>
              </div>

              <Card className="bg-gradient-to-br from-amber-900/20 to-slate-800/50 border-amber-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-8 h-8 text-amber-400" />
                    <CardTitle className="text-2xl text-white">HearthCore Pass</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300 text-lg">
                    Reduce wait times and maintain narrative flow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Priority NLP processing for faster response times</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Maintain immersion with reduced latency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Support ongoing development of the trilogy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Cancel anytime—no commitment required</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-400 mt-6 italic">
                    Note: The base game is fully playable without the HearthCore Pass. This subscription only enhances
                    processing speed for those who prefer a faster-paced experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-12 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      What makes Project: Cohesion different from other RPGs?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      Project: Cohesion is a text-based RPG that uses natural language processing to understand your
                      free-form text input. Unlike traditional RPGs with predefined dialogue options, you type exactly
                      what you want to say or do. Your identity—shaped by your choices—becomes your character class,
                      making every playthrough unique.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Do I need the HearthCore Service Pass to play?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      No. The base game is fully playable and includes all content. The HearthCore Pass only provides
                      faster NLP processing for those who prefer reduced wait times between interactions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">How does the text-based gameplay work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      You type your actions, dialogue, and thoughts in natural language. Our NLP system analyzes your
                      input and maps it to one of nearly 30 core intents, which then drives the narrative forward. There
                      are no menus or predefined choices—just you and the story.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">How long is the game?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      Project: Cohesion offers 15-25 hours of gameplay for a single playthrough, with significant
                      replayability due to the branching narrative and identity-based outcomes. Your choices create a
                      unique experience each time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Is this part of a series?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      Yes. Project: Cohesion is the first game in a planned trilogy, followed by Project: Conversion and
                      Project: Completion. Each game tells a complete story while contributing to a larger narrative.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">When will the game be released?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      Project: Cohesion is currently in active development. Pre-orders are available now, and we'll
                      announce the release date soon. Join our mailing list to stay updated on development progress.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Your Identity Awaits</h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Step into a world where your words shape reality and your choices define who you truly are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Pre-Order Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-200 hover:bg-slate-800 text-lg px-8 py-6 bg-transparent"
                >
                  Join the Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
