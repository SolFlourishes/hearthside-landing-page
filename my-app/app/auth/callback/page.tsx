"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = useSupabase()

  useEffect(() => {
    const handleCallback = async () => {
      const redirectTo = searchParams.get("redirectTo") || "/account/dashboard"

      // The session is automatically handled by Supabase
      // Just redirect to the intended destination
      router.push(redirectTo)
      router.refresh()
    }

    handleCallback()
  }, [router, searchParams, supabase])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}
