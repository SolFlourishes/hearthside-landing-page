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
    ;(globalThis as any).__supabase = createBrowserClient(url, key)
  }

  return (globalThis as any).__supabase
}

export { useSupabase }
