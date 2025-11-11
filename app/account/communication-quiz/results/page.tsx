import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function CommunicationQuizResultsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userProfile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  const results = userProfile?.communication_style as Record<string, string> | null

  if (!results) {
    redirect("/account/communication-quiz")
  }

  // Analyze the results to determine communication profile
  const getProfileSummary = (results: Record<string, string>) => {
    const formality = results.formality || ""
    const directness = results.directness || ""
    const detailLevel = results.detail_level || ""
    const emotionalExpression = results.emotional_expression || ""
    const conflictStyle = results.conflict_style || ""

    // Determine primary communication archetype
    let archetype = ""
    let description = ""
    let strengths: string[] = []
    let considerations: string[] = []

    // Logic to determine archetype based on quiz answers
    if (directness.includes("direct") && detailLevel === "minimal") {
      archetype = "The Analyzer"
      description = "You communicate with precision and efficiency, focusing on facts and key points."
      strengths = [
        "Clear and concise communication",
        "Efficient use of time",
        "Direct problem-solving approach",
        "Logical and systematic thinking",
      ]
      considerations = [
        "Some may need more context to feel comfortable",
        "Emotional aspects may need explicit attention",
        "Very indirect communicators may find your style too abrupt",
      ]
    } else if (directness.includes("indirect") && emotionalExpression.includes("expressive")) {
      archetype = "The Harmonizer"
      description = "You prioritize relationships and emotional connection in your communication."
      strengths = [
        "Builds strong interpersonal relationships",
        "Sensitive to others' feelings and needs",
        "Skilled at conflict de-escalation",
        "Creates inclusive, welcoming environments",
      ]
      considerations = [
        "Direct communicators may miss your intended message",
        "May need to be more explicit about needs and boundaries",
        "Risk of over-accommodating others at your own expense",
      ]
    } else if (detailLevel === "detailed" || (detailLevel === "comprehensive" && formality.includes("formal"))) {
      archetype = "The Strategist"
      description = "You provide thorough context and consider multiple perspectives before communicating."
      strengths = [
        "Comprehensive and well-thought-out messages",
        "Considers multiple angles and implications",
        "Provides helpful context for decision-making",
        "Builds credibility through detail",
      ]
      considerations = [
        "Some readers may prefer more concise summaries",
        "Key points can get lost in detail",
        "May need to adapt for time-sensitive situations",
      ]
    } else if (conflictStyle === "collaborate" && directness.includes("direct")) {
      archetype = "The Advocate"
      description = "You communicate assertively while remaining open to others' perspectives."
      strengths = [
        "Balances directness with respect",
        "Stands up for needs and values",
        "Seeks collaborative solutions",
        "Clear about boundaries",
      ]
      considerations = [
        "May come across as too assertive in hierarchical cultures",
        "Some may prefer more indirect approaches",
        "Balance advocacy with flexibility",
      ]
    } else {
      // Balanced/Adaptive profile
      archetype = "The Adapter"
      description = "You balance different communication approaches based on context and audience."
      strengths = [
        "Flexible and context-aware",
        "Can code-switch between styles",
        "Comfortable with ambiguity",
        "Bridges different communication preferences",
      ]
      considerations = [
        "May feel inconsistent if not intentional",
        "Can be exhausting to constantly adapt",
        "Risk of losing authentic voice",
      ]
    }

    return { archetype, description, strengths, considerations, detailLevel, directness }
  }

  const profileSummary = getProfileSummary(results)

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Link href="/account/dashboard">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Your Communication Profile</h1>
        <p className="text-muted-foreground">Understanding how you communicate and how it affects translations</p>
      </div>

      <div className="space-y-6">
        {/* Primary Archetype */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{profileSummary.archetype}</CardTitle>
                <CardDescription className="mt-2 text-base">{profileSummary.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Your Style
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-teal-700 dark:text-teal-400">Your Strengths</h3>
              <ul className="space-y-2">
                {profileSummary.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-amber-700 dark:text-amber-400">Things to Consider</h3>
              <ul className="space-y-2 text-muted-foreground">
                {profileSummary.considerations.map((consideration, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400">•</span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Your Communication Dimensions</CardTitle>
            <CardDescription>How you scored across different communication aspects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Formality Level</span>
                <Badge variant="outline">{results.formality?.replace("_", " ")}</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Directness</span>
                <Badge variant="outline">{results.directness?.replace("_", " ")}</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Detail Level</span>
                <Badge variant="outline">{results.detail_level?.replace("_", " ")}</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Emotional Expression</span>
                <Badge variant="outline">{results.emotional_expression?.replace("_", " ")}</Badge>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-medium">Conflict Approach</span>
                <Badge variant="outline">{results.conflict_style}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Impacts Clarity Coach */}
        <Card className="border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">How This Affects Clarity Coach</CardTitle>
            <CardDescription>Your profile helps us provide better translations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Automatic Detection</h4>
              <p className="text-sm text-muted-foreground">
                Clarity Coach will automatically detect your communication style from your actual message, but knowing
                your baseline helps us understand when you're adapting your style vs. communicating naturally.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Personalized Translations</h4>
              <p className="text-sm text-muted-foreground">
                When translating messages, we'll consider your natural style to help you bridge gaps with people who
                communicate differently. For example:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground ml-4">
                {profileSummary.directness.includes("direct") ? (
                  <li>
                    • We'll help you add context and softening language when communicating with indirect communicators
                  </li>
                ) : (
                  <li>• We'll help you be more concise and direct when needed for efficiency</li>
                )}
                {profileSummary.detailLevel === "minimal" || profileSummary.detailLevel === "moderate" ? (
                  <li>• We can expand your messages with more context when your audience needs it</li>
                ) : (
                  <li>• We can help you distill your detailed thoughts into key points</li>
                )}
                <li>
                  • We'll adapt your tone to match different relationships (professional, casual, cross-generational)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Better Context Understanding</h4>
              <p className="text-sm text-muted-foreground">
                Combined with your neurotype and generation context (if provided), this creates a comprehensive profile
                that helps Clarity Coach give you highly personalized communication guidance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Use Clarity Coach?</CardTitle>
            <CardDescription>Put your communication profile to work</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link href="/apps/clarity/draft" className="flex-1">
              <Button className="w-full">Draft a Message</Button>
            </Link>
            <Link href="/apps/clarity/analyze" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Analyze a Message
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
