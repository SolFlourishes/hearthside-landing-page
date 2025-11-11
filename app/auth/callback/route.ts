import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/account/dashboard"

  console.log("[v0] Auth callback - code:", !!code, "error:", error, "redirectTo:", redirectTo)

  if (error) {
    console.log("[v0] Auth callback error:", error, error_description)
    return NextResponse.redirect(
      new URL(`/auth/error?error=${error}&error_description=${error_description || ""}`, requestUrl.origin),
    )
  }

  if (code) {
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
        auth: {
          detectSessionInUrl: true, // Enable URL detection for callback
          flowType: "pkce",
        },
      },
    )

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.log("[v0] Code exchange error:", exchangeError)
      return NextResponse.redirect(
        new URL(`/auth/error?error=exchange_failed&error_description=${exchangeError.message}`, requestUrl.origin),
      )
    }

    console.log("[v0] Session established for user:", data.user?.id)

    if (data.user) {
      try {
        // Check if profile exists
        const { data: existingProfile, error: fetchError } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("id", data.user.id)
          .single()

        if (fetchError && fetchError.code === "PGRST116") {
          // Profile doesn't exist, create it
          console.log("[v0] Creating profile for user:", data.user.id)
          const { error: insertError } = await supabase.from("user_profiles").insert({
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
            role: "user", // Default role is 'user', not 'admin'
          })

          if (insertError) {
            console.error("[v0] Failed to create profile:", insertError)
          } else {
            console.log("[v0] Profile created successfully")
          }
        } else if (!fetchError) {
          console.log("[v0] Profile already exists")
        } else {
          console.error("[v0] Error checking profile:", fetchError)
        }
      } catch (profileError) {
        console.error("[v0] Profile creation error:", profileError)
      }
    }

    const redirectUrl = new URL(redirectTo, requestUrl.origin)
    return NextResponse.redirect(redirectUrl)
  }

  console.log("[v0] No code provided, redirecting to login")
  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin))
}
