import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TranslationTester } from "./translation-tester"

export default async function TranslationTesterPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/admin/translation-tester")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  // Check if user has admin role
  if (!profile || profile.role !== "admin") {
    redirect("/admin")
  }

  return <TranslationTester />
}
