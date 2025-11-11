"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = (formData.get("redirectTo") as string) || "/account/dashboard"

  console.log("[v0] Login attempt for:", email)

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error("[v0] Error setting cookies:", error)
          }
        },
      },
    },
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("[v0] Login error:", error.message)
    return { error: error.message }
  }

  console.log("[v0] Login success for user:", data.user.id)
  console.log("[v0] Session token set:", !!data.session?.access_token)

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
