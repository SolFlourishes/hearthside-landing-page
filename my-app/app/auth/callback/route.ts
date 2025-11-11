import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/account/dashboard"

  console.log("[v0] Auth callback - code:", !!code, "error:", error, "redirectTo:", redirectTo)

  if (error) {
    console.log("[v0] Auth callback error:", error, error_description)
    return NextResponse.redirect(
      new URL(`/auth/error?error=${error}&error_description=${error_description || ""}`, requestUrl.origin),
    )
  }

  if (code) {
    const supabase = await createServerClient()

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.log("[v0] Code exchange error:", exchangeError)
      return NextResponse.redirect(
        new URL(`/auth/error?error=exchange_failed&error_description=${exchangeError.message}`, requestUrl.origin),
      )
    }

    console.log("[v0] Session established for user:", data.user?.id)

    const redirectUrl = new URL(redirectTo, requestUrl.origin)
    const response = NextResponse.redirect(redirectUrl)

    if (data.session) {
      response.cookies.set({
        name: "sb-access-token",
        value: data.session.access_token,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      response.cookies.set({
        name: "sb-refresh-token",
        value: data.session.refresh_token,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
    }

    return response
  }

  console.log("[v0] No code provided, redirecting to login")
  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin))
}
