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
      data: { session },
    } = await supabase.auth.getSession()

    console.log("[v0] Middleware - pathname:", request.nextUrl.pathname, "user:", session?.user?.id || "none")

    // Only refresh if we have a session
    if (session) {
      await supabase.auth.refreshSession()
    }
  } catch (error) {
    console.error("[v0] Middleware error:", error)
  }

  return supabaseResponse
}
