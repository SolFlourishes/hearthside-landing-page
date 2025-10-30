import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const pathname = request.nextUrl.pathname

  console.log("[v0] Middleware - hostname:", hostname, "pathname:", pathname)

  // Check if the request is from the clarity subdomain
  if (hostname.startsWith("clarity.")) {
    console.log("[v0] Clarity subdomain detected")

    if (pathname.startsWith("/apps/clarity")) {
      console.log("[v0] Path already starts with /apps/clarity, allowing through")
      return NextResponse.next()
    }

    // Rewrite root and other paths to /apps/clarity
    // clarity.hearthsideworks.com/ → /apps/clarity
    // clarity.hearthsideworks.com/draft → /apps/clarity/draft
    const rewritePath = pathname === "/" ? "/apps/clarity" : `/apps/clarity${pathname}`
    console.log("[v0] Rewriting to:", rewritePath)

    return NextResponse.rewrite(new URL(rewritePath, request.url))
  }

  console.log("[v0] Not clarity subdomain, passing through")
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
