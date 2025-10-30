import Link from "next/link"
import { PenLine, Search, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function ClarityCoachPage() {
  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pt-32">
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Welcome to the <span className="text-primary">Clarity Coach</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              A tool by <span className="text-accent font-semibold">Hearthside Works</span> to help you bridge
              communication gaps, say what you mean, and understand what others truly mean.
            </p>

            {/* Quote */}
            <div className="my-12 p-8 border border-border rounded-lg bg-card/50 backdrop-blur">
              <blockquote className="text-xl italic text-foreground">
                "The most important thing in communication is hearing what isn't said."
              </blockquote>
              <cite className="block mt-4 text-muted-foreground">— Peter Drucker</cite>
            </div>
          </div>
        </section>

        {/* Three Modes */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Draft Mode */}
            <Link
              href="/apps/clarity/draft"
              className="group bg-gradient-to-br from-[#E28A6D]/10 to-card border-2 border-[#E28A6D]/30 rounded-lg p-8 hover:border-[#E28A6D] hover:shadow-2xl hover:shadow-[#E28A6D]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-[#E28A6D]/20 rounded-full mb-4 group-hover:bg-[#E28A6D]/30 transition-colors">
                  <PenLine className="w-8 h-8 text-[#E28A6D]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#E28A6D] mb-3">Draft a Message</h2>
                <p className="text-muted-foreground">
                  Translate your intent into a clear message tailored for any audience.
                </p>
              </div>
            </Link>

            {/* Analyze Mode */}
            <Link
              href="/apps/clarity/analyze"
              className="group bg-gradient-to-br from-primary/10 to-card border-2 border-primary/30 rounded-lg p-8 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-3">Analyze a Message</h2>
                <p className="text-muted-foreground">Decode the likely intent behind a message you've received.</p>
              </div>
            </Link>

            {/* Chat Mode */}
            <Link
              href="/apps/clarity/chat"
              className="group bg-gradient-to-br from-[#FFC72C]/10 to-card border-2 border-[#FFC72C]/30 rounded-lg p-8 hover:border-[#FFC72C] hover:shadow-2xl hover:shadow-[#FFC72C]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-[#FFC72C]/20 rounded-full mb-4 group-hover:bg-[#FFC72C]/30 transition-colors">
                  <MessageCircle className="w-8 h-8 text-[#FFC72C]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#FFC72C] mb-3">Chat with the Coach</h2>
                <p className="text-muted-foreground">Get real-time advice on navigating a tricky conversation.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Example Scenarios Section */}
        <section className="container mx-auto px-4 py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-4">Try an Example</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Not sure where to start? Click an example below to see how Clarity Coach works.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Draft Example */}
              <a
                href="/apps/clarity/draft?example=promotion"
                className="group bg-card border border-border rounded-lg p-6 hover:border-[#E28A6D] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-[#E28A6D]/10 rounded-lg">
                    <PenLine className="w-5 h-5 text-[#E28A6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#E28A6D] mb-1">Asking for a Promotion</h3>
                    <p className="text-sm text-muted-foreground">
                      See how to turn your thoughts into a professional request
                    </p>
                  </div>
                </div>
              </a>

              {/* Analyze Example */}
              <a
                href="/apps/clarity/analyze?example=feedback"
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Understanding Feedback</h3>
                    <p className="text-sm text-muted-foreground">Decode what your manager really means</p>
                  </div>
                </div>
              </a>

              {/* Chat Example */}
              <a
                href="/apps/clarity/chat?example=conflict"
                className="group bg-card border border-border rounded-lg p-6 hover:border-[#FFC72C] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-[#FFC72C]/10 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-[#FFC72C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#FFC72C] mb-1">Resolving Conflict</h3>
                    <p className="text-sm text-muted-foreground">Get advice on handling a difficult conversation</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">How Clarity Coach Helps You Flourish</h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Hear Me (The Clarity)</h3>
                  <p className="text-muted-foreground">
                    Achieve clarity by ensuring your literal intent is accurately received. No more misunderstandings or
                    ambiguity in your written communication.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">See Me (The Recognition)</h3>
                  <p className="text-muted-foreground">
                    Achieve recognition by validating your unique communication style and strengths. The Coach adapts to
                    different audiences and contexts.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Know Me (The Belonging)</h3>
                  <p className="text-muted-foreground">
                    Foster authentic connection and trust through better understanding. Build psychological safety in
                    all your relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-lg p-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Choose a mode above to begin improving your communication today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
