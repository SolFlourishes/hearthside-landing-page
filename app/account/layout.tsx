import type React from "react"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  console.log(
    "[v0] Account Layout - Cookies:",
    allCookies.map((c) => ({
      name: c.name,
      hasValue: !!c.value,
      length: c.value?.length || 0,
      preview: c.value?.substring(0, 20) + "...",
    })),
  )

  const supabase = await createServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log("[v0] Account Layout - User check:", {
    hasUser: !!user,
    userId: user?.id,
    userEmail: user?.email,
    error: error?.message,
    cookieCount: allCookies.length,
  })

  // Redirect to login if not authenticated
  if (!user) {
    console.log("[v0] Account Layout - No user found, redirecting to login")
    redirect("/auth/login?redirectTo=/account/dashboard")
  }

  console.log("[v0] Account Layout - User authenticated, rendering children")
  return <>{children}</>
}
