"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { SupabaseClient } from "@supabase/ssr"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

type SupabaseContext = {
  supabase: SupabaseClient | null
}

const Context = createContext<SupabaseContext>({ supabase: null })

let browserClient: SupabaseClient | null = null

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("[v0] SupabaseProvider - URL exists:", !!url, "Key exists:", !!key)

    if (!url || !key) {
      console.warn("[Supabase] Missing environment variables, auth features disabled")
      return
    }

    if (!browserClient) {
      try {
        browserClient = createBrowserClient(url, key, {
          cookies: {
            getAll() {
              const cookies = document.cookie.split(";").map((cookie) => {
                const [name, ...rest] = cookie.trim().split("=")
                return { name, value: rest.join("=") }
              })
              console.log("[v0] Getting cookies, count:", cookies.length)
              return cookies
            },
            setAll(cookiesToSet) {
              console.log("[v0] Setting cookies, count:", cookiesToSet.length)
              cookiesToSet.forEach(({ name, value, options }) => {
                let cookie = `${name}=${value}`
                if (options?.path) cookie += `; path=${options.path}`
                if (options?.maxAge) cookie += `; max-age=${options.maxAge}`
                if (options?.domain) cookie += `; domain=${options.domain}`
                if (options?.sameSite) cookie += `; samesite=${options.sameSite}`
                if (options?.secure) cookie += "; secure"
                document.cookie = cookie
                console.log("[v0] Set cookie:", name)
              })
            },
          },
          auth: {
            detectSessionInUrl: true,
            flowType: "pkce",
            persistSession: true,
            autoRefreshToken: true,
            storageKey: "sb-auth-token",
          },
          cookieOptions: {
            name: "sb-auth-token",
            domain: process.env.NODE_ENV === "production" ? ".hearthsideworks.com" : undefined,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          },
        })
        console.log("[v0] Supabase browser client created")
      } catch (error) {
        console.error("[Supabase] Failed to create client:", error)
        return
      }
    }

    setSupabase(browserClient)

    browserClient.auth.getSession().then(({ data: { session } }) => {
      console.log("[v0] Initial session check:", session ? `User ${session.user.id}` : "No session")
    })

    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange((event, session) => {
      console.log("[v0] Auth state change:", event, session ? "Session exists" : "No session")
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        console.log("[v0] Refreshing router after auth change")
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useSupabase must be used within SupabaseProvider")
  }
  return context.supabase
}
