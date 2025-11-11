"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = (formData.get("redirectTo") as string) || "/account/dashboard"

  console.log("[v0] Login attempt for:", email)

  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("[v0] Login error:", error.message)
    return { error: error.message }
  }

  console.log("[v0] Login success for user:", data.user.id)

  // Ensure profile exists
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", data.user.id)
    .single()

  if (profileError && profileError.code === "PGRST116") {
    console.log("[v0] Creating profile for user:", data.user.id)
    await supabase.from("user_profiles").insert({
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
      role: "user",
    })
  }

  redirect(redirectTo)
}
