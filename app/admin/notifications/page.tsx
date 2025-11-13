import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NotificationScheduler } from "./notification-scheduler"
import { NotificationHistory } from "./notification-history"

export default async function AdminNotificationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/admin/notifications")
  }

  const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/admin")
  }

  // Fetch scheduled notifications
  const { data: notifications } = await supabase
    .from("scheduled_notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Notification Management</h1>
          <p className="text-muted-foreground">Schedule and send connection-focused communications</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin">Back to Admin</Link>
        </Button>
      </div>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Notification</CardTitle>
            <CardDescription>
              Craft messages that emphasize connection, growth, and community—never spam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationScheduler />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled & Sent Notifications</CardTitle>
            <CardDescription>View and manage all platform communications</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationHistory notifications={notifications || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
