import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase isn't configured, just pass through without auth
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase not configured - auth middleware disabled")
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
    auth: {
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  })

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] Auth check - pathname:", request.nextUrl.pathname, "user:", user?.id || "none")

    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/account") || request.nextUrl.pathname.startsWith("/admin")

    if (!user && isProtectedRoute) {
      if (request.nextUrl.pathname.startsWith("/auth/callback")) {
        console.log("[v0] Skipping redirect for auth callback")
        return supabaseResponse
      }

      console.log("[v0] No user found, redirecting to login")
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      url.searchParams.set("redirectTo", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error("[v0] Supabase middleware error:", error)
    // Continue without auth on error
  }

  return supabaseResponse
}
