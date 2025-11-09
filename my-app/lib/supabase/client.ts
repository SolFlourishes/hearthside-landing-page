import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("createClient should only be called in browser context")
  }

  if (!(globalThis as any).__supabase) {
    ;(globalThis as any).__supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  return (globalThis as any).__supabase
}
