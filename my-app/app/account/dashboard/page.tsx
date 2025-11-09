import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const roleBadgeColors: Record<string, string> = {
    admin: "bg-red-500",
    moderator: "bg-blue-500",
    author: "bg-purple-500",
    elder: "bg-amber-500",
    user: "bg-gray-500",
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Account Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile?.display_name || user.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className={roleBadgeColors[profile?.role || "user"]}>{profile?.role?.toUpperCase()}</Badge>
              <Badge variant={profile?.tier === "premium" ? "default" : "secondary"}>
                {profile?.tier?.toUpperCase()}
              </Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/account/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Style</CardTitle>
            <CardDescription>Discover your style</CardDescription>
          </CardHeader>
          <CardContent>
            {profile?.communication_style ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quiz completed! View your results.</p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/account/communication-quiz">Retake Quiz</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Take a quick quiz to discover your communication style.</p>
                <Button asChild className="w-full">
                  <Link href="/account/communication-quiz">Take Quiz</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipient Profiles</CardTitle>
            <CardDescription>People you communicate with</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/account/recipients">Manage Recipients</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication History</CardTitle>
            <CardDescription>View past interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/account/history">View History</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track your growth</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/account/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Your rate limit status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile?.tier === "premium" ? (
                <p className="text-sm font-medium text-green-600">Unlimited requests</p>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {profile?.requests_this_hour || 0} / 200 requests this hour
                  </p>
                  <Button asChild variant="outline" className="w-full mt-2 bg-transparent">
                    <Link href="/account/upgrade">Upgrade to Premium</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
