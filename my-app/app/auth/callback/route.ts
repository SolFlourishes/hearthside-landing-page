import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/account/dashboard"

  if (error) {
    console.log("[v0] Auth callback error:", error, error_description)
    return NextResponse.redirect(
      new URL(`/auth/error?error=${error}&error_description=${error_description || ""}`, requestUrl.origin),
    )
  }

  if (code) {
    const supabase = await createServerClient()

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.log("[v0] Code exchange error:", exchangeError)
      return NextResponse.redirect(
        new URL(`/auth/error?error=exchange_failed&error_description=${exchangeError.message}`, requestUrl.origin),
      )
    }

    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin))
}
