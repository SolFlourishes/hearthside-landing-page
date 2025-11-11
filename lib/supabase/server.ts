import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  console.log(
    "[v0] createServerClient - All cookies:",
    allCookies.map((c) => ({
      name: c.name,
      valueLength: c.value?.length || 0,
      startsWithSb: c.name.startsWith("sb-"),
    })),
  )

  const client = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = cookieStore.getAll()
          console.log("[v0] Server client getAll() called, returning", cookies.length, "cookies")
          return cookies
        },
        setAll(cookiesToSet) {
          try {
            console.log("[v0] Server client setAll() called with", cookiesToSet.length, "cookies")
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error("[v0] Server client setAll() error:", error)
          }
        },
      },
      auth: {
        detectSessionInUrl: false,
        flowType: "pkce",
        storageKey: "sb-auth-token", // Match middleware and client
      },
    },
  )

  const {
    data: { session },
    error,
  } = await client.auth.getSession()
  console.log("[v0] createServerClient - Session check:", {
    hasSession: !!session,
    userId: session?.user?.id,
    error: error?.message,
    expiresAt: session?.expires_at,
  })

  return client
}

export { createServerClient as createClient }
