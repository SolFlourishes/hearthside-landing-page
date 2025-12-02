"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = (formData.get("redirectTo") as string) || "/account/dashboard"

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
            console.error("Error setting auth cookies:", error)
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
    return { error: error.message }
  }

  if (!data.session) {
    return { error: "No session created" }
  }

  // Ensure profile exists
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", data.user.id)
    .single()

  if (profileError && profileError.code === "PGRST116") {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
      role: "user",
    })
    if (insertError) {
      console.error("Error creating user profile:", insertError.message)
    }
  }

  redirect(redirectTo)
}
