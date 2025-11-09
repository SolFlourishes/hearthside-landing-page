import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  // If Supabase middleware returned a redirect, use it
  if (supabaseResponse.status === 307 || supabaseResponse.status === 308) {
    return supabaseResponse
  }

  const hostname = request.headers.get("host") || ""
  const pathname = request.nextUrl.pathname

  // Check if the request is from the clarity subdomain
  if (hostname.startsWith("clarity.")) {
    if (pathname.startsWith("/apps/clarity")) {
      return NextResponse.next()
    }

    // Rewrite root and other paths to /apps/clarity
    const rewritePath = pathname === "/" ? "/apps/clarity" : `/apps/clarity${pathname}`
    return NextResponse.rewrite(new URL(rewritePath, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
