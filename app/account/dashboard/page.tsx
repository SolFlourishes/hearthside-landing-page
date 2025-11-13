import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { User, MessageSquare, BookOpen, TrendingUp, Clock, CheckCircle2, Brain, Sparkles } from "lucide-react"
import { getCommunicationArchetype } from "@/lib/communication-profiles"
import { OnboardingTutorial } from "@/components/onboarding-tutorial"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/dashboard")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  const archetype = profile?.communication_style ? getCommunicationArchetype(profile.communication_style) : null
  const hasCompletedQuiz = !!profile?.communication_style

  const recentActivity = [
    { action: "Drafted message", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { action: "Analyzed communication", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { action: "Used PoliTalk Explorer", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <OnboardingTutorial userId={user.id} />

      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome Back, {profile?.display_name || user.email?.split("@")[0] || "Friend"}!
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your communication journey</p>
        </div>

        {hasCompletedQuiz ? (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Your Communication Profile
              </CardTitle>
              <CardDescription>Based on your Communication Style Quiz results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                {archetype && (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-lg">{archetype}</span>
                  </div>
                )}
                {profile?.neurotype && (
                  <Badge variant="secondary" className="text-sm">
                    {profile.neurotype}
                  </Badge>
                )}
                {profile?.generation && (
                  <Badge variant="secondary" className="text-sm">
                    {profile.generation}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/account/communication-quiz/results">View Full Results</Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/account/communication-quiz">Retake Quiz</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Discover Your Communication Style
              </CardTitle>
              <CardDescription>Take the quiz to unlock personalized Clarity Coach features</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/account/communication-quiz">Take Communication Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Clarity Coach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/apps/clarity/draft">Draft Message</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/apps/clarity/analyze">Analyze Message</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/apps/clarity/politalk-explorer">PoliTalk Explorer</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/account/profile">Update Profile</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/account/communication-quiz">Retake Quiz</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/account/settings">Account Settings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/apps/clarity/how-to-use">How to Use</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/becoming-elder">Becoming an Elder</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/account/conversations">Conversations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Clarity Coach Usage
              </CardTitle>
              <CardDescription>Your communication insights this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Messages Drafted</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Messages Analyzed</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">PoliTalk Explorations</span>
                <span className="font-semibold">3</span>
              </div>
              <Button asChild variant="link" className="w-full p-0 h-auto">
                <Link href="/account/analytics">View Detailed Analytics →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest Clarity Coach sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 py-2 border-b last:border-0">
                  <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Display Name</span>
              <span className="font-medium">{profile?.display_name || "Not set"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
