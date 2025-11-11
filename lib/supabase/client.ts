import { createBrowserClient } from "@supabase/ssr"
import { useSupabase } from "@/components/supabase-provider"

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("createClient should only be called in browser context")
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn("[Supabase] Missing environment variables. Client creation deferred.")
    return null
  }

  if (!(globalThis as any).__supabase) {
    ;(globalThis as any).__supabase = createBrowserClient(url, key, {
      cookies: {
        get(name: string) {
          const cookies = document.cookie.split(";")
          const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`))
          return cookie?.split("=")[1]
        },
        set(name: string, value: string, options: any) {
          document.cookie = `${name}=${value}; path=/; ${options?.maxAge ? `max-age=${options.maxAge};` : ""} ${options?.sameSite ? `samesite=${options.sameSite};` : ""}`
        },
        remove(name: string, options: any) {
          document.cookie = `${name}=; path=/; max-age=0`
        },
      },
      cookieOptions: {
        name: "sb-auth-token",
        domain: typeof window !== "undefined" ? window.location.hostname : undefined,
        path: "/",
        sameSite: "lax",
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
        storageKey: "sb-auth-token",
      },
    })
  }

  return (globalThis as any).__supabase
}

export { useSupabase }
