import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AppearanceSettingsForm } from "./appearance-settings-form"

export const metadata = {
  title: "Appearance Settings - Hearthside Works",
  description: "Customize your theme, colors, and display preferences",
}

export default async function AppearanceSettingsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("theme_preferences").eq("id", user.id).single()

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Appearance</h1>
        <p className="mt-2 text-muted-foreground">Customize how Hearthside Works looks and feels for you.</p>
      </div>

      <AppearanceSettingsForm
        initialPreferences={
          profile?.theme_preferences || {
            mode: "light",
            accentColor: "orange",
            fontSize: "medium",
          }
        }
      />
    </div>
  )
}
