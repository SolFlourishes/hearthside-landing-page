"use client"

import Link from "next/link"
import { Target, MessageSquare, TrendingUp, AlertCircle, CheckCircle2, Clock, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { LeaderLogo } from "@/components/leader-logo"

export default function LeaderDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-[#10b981]/5 pt-4">
        <section className="container mx-auto px-4 py-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <LeaderLogo className="w-48 h-48" />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Welcome to <span className="text-[#059669]">Leadership Leader</span>
            </h1>
            <p className="text-base text-muted-foreground mb-4">
              Practice difficult conversations, track your leadership growth, and build the skills to lead with clarity
              and empathy. Practice makes perfect—especially with AI-powered coaching.
            </p>

            {/* Quote */}
            <div className="mb-6 p-4 border border-border rounded-lg bg-card/50 backdrop-blur">
              <blockquote className="text-base italic text-foreground">
                "Leadership is not about being in charge. It's about taking care of those in your charge."
              </blockquote>
              <cite className="block mt-1 text-xs text-muted-foreground">— Simon Sinek</cite>
            </div>
          </div>
        </section>

        {/* Product Status Section */}
        <section className="container mx-auto px-4 pb-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#10b981]/5 to-background border-2 border-[#10b981]/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#10b981]/10 rounded-lg">
                <Lightbulb className="w-6 h-6 text-[#10b981]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-lg font-bold">Leadership Leader: Alpha 0.1</h2>
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    EARLY DEVELOPMENT
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Leadership Leader is Hearthside Works' newest application—currently in early alpha development. We're
                  building AI-powered scenario training to help managers practice difficult conversations and track
                  their leadership growth. Your feedback shapes this product.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Technology:</strong> Next.js 16, React 19, AI SDK, Firebase
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Status:</strong> Core infrastructure complete, features in
                      development
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Target Users:</strong> Managers, team leads, aspiring leaders
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full mt-1.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Launch Goal:</strong> Q1 2025 Public Beta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {/* Practice Scenarios */}
            <Link
              href="/apps/leader/scenarios"
              className="group bg-gradient-to-br from-[#10b981]/10 to-card border-2 border-[#10b981]/30 rounded-lg p-6 hover:border-[#10b981] hover:shadow-2xl hover:shadow-[#10b981]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-[#10b981]/20 rounded-full mb-3 group-hover:bg-[#10b981]/30 transition-colors">
                  <MessageSquare className="w-7 h-7 text-[#10b981]" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#10b981] mb-2">Practice Scenarios</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Simulate difficult conversations with AI team members. Practice feedback, conflict resolution, and
                  leadership communication.
                </p>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </Link>

            {/* Growth Tracking */}
            <Link
              href="/apps/leader/growth"
              className="group bg-gradient-to-br from-[#E28A6D]/10 to-card border-2 border-[#E28A6D]/30 rounded-lg p-6 hover:border-[#E28A6D] hover:shadow-2xl hover:shadow-[#E28A6D]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-[#E28A6D]/20 rounded-full mb-3 group-hover:bg-[#E28A6D]/30 transition-colors">
                  <TrendingUp className="w-7 h-7 text-[#E28A6D]" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#E28A6D] mb-2">Track Your Growth</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Measure your leadership development with analytics, 360 feedback, and personalized insights over time.
                </p>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </Link>

            {/* Learning Resources */}
            <Link
              href="/apps/leader/resources"
              className="group bg-gradient-to-br from-[#FFC72C]/10 to-card border-2 border-[#FFC72C]/30 rounded-lg p-6 hover:border-[#FFC72C] hover:shadow-2xl hover:shadow-[#FFC72C]/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-[#FFC72C]/20 rounded-full mb-3 group-hover:bg-[#FFC72C]/30 transition-colors">
                  <Target className="w-7 h-7 text-[#FFC72C]" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#FFC72C] mb-2">Learn & Improve</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Access curated resources on leadership, difficult conversations, and building high-performing teams.
                </p>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                  Planned
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Alpha Development Status */}
        <section className="container mx-auto px-4 py-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-center mb-2">Alpha Development Status</h2>
            <p className="text-center text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
              Track what's working, what's being built, and what's coming next
            </p>

            <div className="grid md:grid-cols-3 gap-3">
              {/* Working */}
              <Card className="border-2 border-[#10b981]/30 bg-gradient-to-br from-[#10b981]/5 to-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                    <CardTitle className="text-base">Working Now</CardTitle>
                  </div>
                  <CardDescription className="text-xs">These features are live and functional</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>✓ Dashboard & Navigation</li>
                    <li>✓ Core Infrastructure</li>
                    <li>✓ Alpha Warning System</li>
                    <li>✓ Responsive Design</li>
                  </ul>
                </CardContent>
              </Card>

              {/* In Progress */}
              <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <CardTitle className="text-base">In Development</CardTitle>
                  </div>
                  <CardDescription className="text-xs">Currently being built</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>⏳ AI Scenario Simulator</li>
                    <li>⏳ Growth Analytics</li>
                    <li>⏳ Firebase Integration</li>
                    <li>⏳ User Profiles</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Planned */}
              <Card className="border-2 border-muted-foreground/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-base">Planned</CardTitle>
                  </div>
                  <CardDescription className="text-xs">Coming in future versions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>○ 360 Feedback System</li>
                    <li>○ Team Insights Dashboard</li>
                    <li>○ Learning Resources</li>
                    <li>○ Certificate System</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-center mb-6">How Leadership Leader Helps You Flourish</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] font-bold mx-auto mb-2">
                  1
                </div>
                <h3 className="font-serif text-base font-bold mb-1">Practice Safely</h3>
                <p className="text-xs text-muted-foreground">
                  Build confidence through AI simulations before real conversations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] font-bold mx-auto mb-2">
                  2
                </div>
                <h3 className="font-serif text-base font-bold mb-1">Track Progress</h3>
                <p className="text-xs text-muted-foreground">
                  See your leadership skills improve with data and insights.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] font-bold mx-auto mb-2">
                  3
                </div>
                <h3 className="font-serif text-base font-bold mb-1">Lead Better</h3>
                <p className="text-xs text-muted-foreground">
                  Apply learnings to become a more effective, empathetic leader.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-lg p-6">
            <h2 className="font-serif text-xl font-bold mb-2">Help Shape This Product</h2>
            <p className="text-sm text-muted-foreground mb-4">
              As an alpha tester, your feedback is invaluable. We're building this for you—let us know what matters
              most.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-[#10b981] hover:bg-[#10b981]/90 text-white">
                <Link href="/apps/leader/scenarios">Explore Scenarios</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/apps/leader/roadmap">View Roadmap</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
