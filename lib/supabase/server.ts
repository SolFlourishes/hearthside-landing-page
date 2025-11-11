import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  console.log(
    "[v0] Server createServerClient - Cookies:",
    allCookies.length,
    "sb-cookies:",
    allCookies
      .filter((c) => c.name.startsWith("sb-"))
      .map((c) => ({ name: c.name, valueLength: c.value?.length || 0 })),
  )

  const client = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = cookieStore.getAll()
          console.log("[v0] Server getAll() called, returning", cookies.length, "cookies")
          return cookies
        },
        setAll(cookiesToSet) {
          try {
            console.log("[v0] Server setAll() called with", cookiesToSet.length, "cookies")
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log("[v0] Server setting cookie:", name, "value length:", value?.length || 0)
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error("[v0] Server setAll() error:", error)
          }
        },
      },
      auth: {
        detectSessionInUrl: false,
        flowType: "pkce",
      },
    },
  )

  const {
    data: { session },
    error,
  } = await client.auth.getSession()
  console.log("[v0] Server session check:", {
    hasSession: !!session,
    userId: session?.user?.id,
    error: error?.message,
    expiresAt: session?.expires_at,
  })

  return client
}

export { createServerClient as createClient }
