import Link from "next/link"
import { Sparkles, Gamepad2 } from "lucide-react"
import { Footer } from "@/components/footer"

export default function AppsPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Hearthside Apps</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Powerful tools designed to help you flourish through connection, clarity, and understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Clarity Coach */}
            <Link
              href="/apps/clarity"
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Clarity Coach
                  </h2>
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full mb-3">
                    Beta v3.5
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Bridge communication gaps, say what you mean, and understand what others truly mean. Draft messages,
                analyze intent, and get real-time coaching.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                  Draft Mode
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                  Analyze Mode
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">Chat Mode</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">Kids Mode</span>
              </div>
            </Link>

            {/* Project Cohesion - Coming Soon */}
            <div className="bg-card border border-border rounded-lg p-8 opacity-60">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Gamepad2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">More Apps Coming Soon</h2>
                  <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full mb-3">
                    In Development
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">
                We're working on additional tools to help you connect, learn, and flourish. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
