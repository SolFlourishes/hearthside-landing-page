"use client"

import Link from "next/link"
import { PenLine, Search, MessageCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function ClarityCoachPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pt-4">
        <section className="container mx-auto px-4 py-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Welcome to the <span className="text-primary">Clarity Coach</span>
            </h1>
            <p className="text-base text-muted-foreground mb-4">
              Bridge communication gaps, understand political worldviews, and say what you truly mean. Now with
              personalized accounts and PoliTalk Explorer.
            </p>

            {/* Quote */}
            <div className="mb-6 p-4 border border-border rounded-lg bg-card/50 backdrop-blur">
              <blockquote className="text-base italic text-foreground">
                "The most important thing in communication is hearing what isn't said."
              </blockquote>
              <cite className="block mt-1 text-xs text-muted-foreground">— Peter Drucker</cite>
            </div>
          </div>
        </section>

        {/* Product Status Section */}
        <section className="container mx-auto px-4 pb-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-background border-2 border-primary/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-lg font-bold">Clarity Coach: Beta 4.5</h2>
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    LIVE & FUNCTIONAL
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Clarity Coach is Hearthside Works' flagship SaaS application—a fully functional AI-powered
                  communication tool currently in public beta. We're actively gathering user feedback to refine features
                  and enhance the user experience.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Technology:</strong> Next.js 16, React 19, AI SDK, Supabase
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Users:</strong> Active beta testers with saved profiles
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Business Model:</strong> Freemium SaaS with Elder sponsorship
                      tier
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Roadmap:</strong> Public & updated regularly
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Modes */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {/* Draft Mode */}
            <Link
              href="/apps/clarity/draft"
              className="group bg-gradient-to-br from-[#E28A6D]/10 to-card border-2 border-[#E28A6D]/30 rounded-lg p-6 hover:border-[#E28A6D] hover:shadow-2xl hover:shadow-[#E28A6D]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-[#E28A6D]/20 rounded-full mb-3 group-hover:bg-[#E28A6D]/30 transition-colors">
                  <PenLine className="w-7 h-7 text-[#E28A6D]" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#E28A6D] mb-2">Draft a Message</h2>
                <p className="text-sm text-muted-foreground">
                  Translate your intent into a clear message tailored for any audience.
                </p>
              </div>
            </Link>

            {/* Analyze Mode */}
            <Link
              href="/apps/clarity/analyze"
              className="group bg-gradient-to-br from-primary/10 to-card border-2 border-primary/30 rounded-lg p-6 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/20 rounded-full mb-3 group-hover:bg-primary/30 transition-colors">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-serif text-xl font-bold text-primary mb-2">Analyze a Message</h2>
                <p className="text-sm text-muted-foreground">
                  Decode the likely intent behind a message you've received.
                </p>
              </div>
            </Link>

            {/* Chat Mode */}
            <Link
              href="/apps/clarity/chat"
              className="group bg-gradient-to-br from-[#FFC72C]/10 to-card border-2 border-[#FFC72C]/30 rounded-lg p-6 hover:border-[#FFC72C] hover:shadow-2xl hover:shadow-[#FFC72C]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-[#FFC72C]/20 rounded-full mb-3 group-hover:bg-[#FFC72C]/30 transition-colors">
                  <MessageCircle className="w-7 h-7 text-[#FFC72C]" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#FFC72C] mb-2">Chat with the Coach</h2>
                <p className="text-sm text-muted-foreground">
                  Get real-time advice on navigating a tricky conversation.
                </p>
              </div>
            </Link>

            {/* PoliTalk Explorer */}
            <Link
              href="/apps/clarity/politalk-explorer"
              className="group bg-gradient-to-br from-purple-500/10 to-card border-2 border-purple-500/30 rounded-lg p-6 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-500/20 rounded-full mb-3 group-hover:bg-purple-500/30 transition-colors">
                  <Lightbulb className="w-7 h-7 text-purple-500" />
                </div>
                <h2 className="font-serif text-xl font-bold text-purple-500 mb-2">PoliTalk Explorer</h2>
                <p className="text-sm text-muted-foreground">
                  Understand the moral frameworks behind political positions.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Example Scenarios Section */}
        <section className="container mx-auto px-4 py-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-center mb-2">Try an Example</h2>
            <p className="text-center text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
              Not sure where to start? Click an example to see how Clarity Coach works.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Draft Example */}
              <a
                href="/apps/clarity/draft?example=promotion"
                className="group bg-card border border-border rounded-lg p-4 hover:border-[#E28A6D] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 bg-[#E28A6D]/10 rounded-lg">
                    <PenLine className="w-4 h-4 text-[#E28A6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#E28A6D] mb-1">Asking for a Promotion</h3>
                    <p className="text-xs text-muted-foreground">Turn your thoughts into a professional request</p>
                  </div>
                </div>
              </a>

              {/* Analyze Example */}
              <a
                href="/apps/clarity/analyze?example=feedback"
                className="group bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-primary mb-1">Understanding Feedback</h3>
                    <p className="text-xs text-muted-foreground">Decode what your manager really means</p>
                  </div>
                </div>
              </a>

              {/* Chat Example */}
              <a
                href="/apps/clarity/chat?example=conflict"
                className="group bg-card border border-border rounded-lg p-4 hover:border-[#FFC72C] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 bg-[#FFC72C]/10 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-[#FFC72C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#FFC72C] mb-1">Resolving Conflict</h3>
                    <p className="text-xs text-muted-foreground">Get advice on handling difficult conversations</p>
                  </div>
                </div>
              </a>

              {/* PoliTalk Example */}
              <a
                href="/apps/clarity/politalk-explorer"
                className="group bg-card border border-border rounded-lg p-4 hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 bg-purple-500/10 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-purple-500 mb-1">Political Worldviews</h3>
                    <p className="text-xs text-muted-foreground">Explore why people believe what they believe</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-center mb-6">How Clarity Coach Helps You Flourish</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mx-auto mb-2">
                  1
                </div>
                <h3 className="font-serif text-base font-bold mb-1">Hear Me</h3>
                <p className="text-xs text-muted-foreground">Ensure your literal intent is accurately received.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mx-auto mb-2">
                  2
                </div>
                <h3 className="font-serif text-base font-bold mb-1">See Me</h3>
                <p className="text-xs text-muted-foreground">Validate your unique communication style and strengths.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mx-auto mb-2">
                  3
                </div>
                <h3 className="font-serif text-base font-bold mb-1">Know Me</h3>
                <p className="text-xs text-muted-foreground">
                  Foster authentic connection through better understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-lg p-6">
            <h2 className="font-serif text-xl font-bold mb-2">Ready to Get Started?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Choose a mode above to begin improving your communication today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/apps/clarity/draft">Start Drafting</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/elder-program">Learn About Elder Program</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
