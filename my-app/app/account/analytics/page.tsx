import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsCharts } from "./analytics-charts"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get communication history stats
  const { data: history } = await supabase.from("communication_history").select("*").eq("user_id", user.id)

  // Get analytics aggregations
  const { data: analytics } = await supabase
    .from("user_analytics")
    .select("*")
    .eq("user_id", user.id)
    .order("period_start", { ascending: false })
    .limit(30)

  const totalInteractions = history?.length || 0
  const draftCount = history?.filter((h) => h.interaction_type === "draft").length || 0
  const analyzeCount = history?.filter((h) => h.interaction_type === "analyze").length || 0
  const chatCount = history?.filter((h) => h.interaction_type === "chat").length || 0
  const avgRating =
    history && history.length > 0
      ? (
          history.filter((h) => h.rating).reduce((sum, h) => sum + (h.rating || 0), 0) /
          history.filter((h) => h.rating).length
        ).toFixed(1)
      : "N/A"

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Communication Analytics</h1>
        <p className="text-muted-foreground">Track your growth and communication patterns</p>
      </div>

      {profile?.tier !== "premium" && (
        <Card className="mb-6 border-amber-500">
          <CardHeader>
            <CardTitle>Premium Feature</CardTitle>
            <CardDescription>Upgrade to Premium for detailed analytics, charts, and insights</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalInteractions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{draftCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analyzeCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgRating}</p>
          </CardContent>
        </Card>
      </div>

      {profile?.tier === "premium" && analytics && analytics.length > 0 && (
        <AnalyticsCharts analytics={analytics} history={history || []} />
      )}

      {profile?.tier === "premium" && (!analytics || analytics.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle>No Analytics Data Yet</CardTitle>
            <CardDescription>Keep using Clarity Coach and analytics will be generated over time</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
