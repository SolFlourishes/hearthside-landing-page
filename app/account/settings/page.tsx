import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AccountSettingsForm } from "@/components/account-settings-form"

export default async function SettingsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/settings")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your profile, security, and preferences</p>
        </div>

        <AccountSettingsForm user={user} />
      </div>
    </div>
  )
}
