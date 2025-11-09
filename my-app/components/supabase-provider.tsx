"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { createBrowserClient, type SupabaseClient } from "@supabase/ssr"

type SupabaseContext = {
  supabase: SupabaseClient | null
}

const Context = createContext<SupabaseContext>({ supabase: null })

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!),
  )

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useSupabase must be used within SupabaseProvider")
  }
  return context.supabase
}
