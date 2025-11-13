import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationPreferencesForm } from "./notification-preferences-form"

export default async function NotificationPreferencesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/settings/notifications")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("notification_preferences")
    .eq("id", user.id)
    .single()

  const defaultPreferences = {
    email_enabled: true,
    saved_items: "never",
    quiz_reminders: true,
    communication_tips: "monthly",
    feature_updates: true,
    connection_reminders: true,
    digest_frequency: "weekly",
  }

  const currentPreferences = profile?.notification_preferences || defaultPreferences

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold mb-2">Notification Preferences</h1>
        <p className="text-muted-foreground">Choose how we support your journey of connection and growth</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stay Connected</CardTitle>
          <CardDescription>
            Notifications are designed to support meaningful connection—never to interrupt or overwhelm. Adjust these
            settings to match your rhythm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferencesForm initialPreferences={currentPreferences} />
        </CardContent>
      </Card>
    </div>
  )
}
