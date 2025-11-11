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
          const allCookies = cookieStore.getAll()
          console.log("[v0] Login getAll - cookies:", allCookies.length)
          return allCookies
        },
        setAll(cookiesToSet) {
          try {
            console.log("[v0] Login setAll - Setting", cookiesToSet.length, "cookies")
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log("[v0] Login - Setting cookie:", name, "value length:", value?.length || 0)
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error("[v0] Login - Error setting cookies:", error)
          }
        },
      },
      auth: {
        flowType: "pkce",
      },
    },
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("[v0] Login error:", error.message, error.status, error.code)
    return { error: error.message }
  }

  if (!data.session) {
    console.log("[v0] Login succeeded but no session returned")
    return { error: "No session created" }
  }

  console.log("[v0] Login success for user:", data.user?.id)
  console.log("[v0] Session created, expires at:", data.session?.expires_at)

  // Ensure profile exists
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", data.user.id)
    .single()

  if (profileError && profileError.code === "PGRST116") {
    console.log("[v0] Creating profile for user:", data.user.id)
    const { error: insertError } = await supabase.from("user_profiles").insert({
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
      role: "user",
    })
    if (insertError) {
      console.log("[v0] Error creating profile:", insertError.message)
    }
  }

  console.log("[v0] Redirecting to:", redirectTo)
  redirect(redirectTo)
}
