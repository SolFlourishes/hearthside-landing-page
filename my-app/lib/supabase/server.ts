import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

// Store client at module level for reuse within same request context
let cachedServerClient: ReturnType<typeof createServerClient> | null = null

export const createClient = cache(async () => {
  // Return cached client if available in this request context
  if (cachedServerClient) {
    return cachedServerClient
  }

  const cookieStore = await cookies()

  const client = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
    auth: {
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  })

  cachedServerClient = client
  return client
})

export { createClient as createServerClient }
