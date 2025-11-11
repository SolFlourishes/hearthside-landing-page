"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { SupabaseClient } from "@supabase/ssr"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter, usePathname } from "next/navigation"

type SupabaseContext = {
  supabase: SupabaseClient | null
}

const Context = createContext<SupabaseContext>({ supabase: null })

let browserClient: SupabaseClient | null = null

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.warn("[Supabase] Missing environment variables, auth features disabled")
      return
    }

    if (!browserClient) {
      try {
        browserClient = createBrowserClient(url, key, {
          cookies: {
            getAll() {
              return document.cookie.split(";").map((cookie) => {
                const [name, ...rest] = cookie.trim().split("=")
                return { name, value: rest.join("=") }
              })
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                let cookie = `${name}=${value}`
                if (options?.path) cookie += `; path=${options.path}`
                if (options?.maxAge) cookie += `; max-age=${options.maxAge}`
                if (options?.domain) cookie += `; domain=${options.domain}`
                if (options?.sameSite) cookie += `; samesite=${options.sameSite}`
                if (options?.secure) cookie += "; secure"
                document.cookie = cookie
              })
            },
          },
          auth: {
            detectSessionInUrl: true,
            flowType: "pkce",
            persistSession: true,
            autoRefreshToken: true,
          },
        })
      } catch (error) {
        console.error("[Supabase] Failed to create client:", error)
        return
      }
    }

    setSupabase(browserClient)

    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    if (!browserClient) return

    const timer = setTimeout(() => {
      browserClient.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.refresh()
        }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, router])

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useSupabase must be used within SupabaseProvider")
  }
  return context.supabase
}
