import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  // Check if the request is from the clarity subdomain
  if (hostname.startsWith("clarity.")) {
    // Get the pathname (e.g., "/" or "/chat" or "/draft")
    const pathname = request.nextUrl.pathname

    // Rewrite to /apps/clarity while preserving the path
    // clarity.hearthsideworks.com/ → /apps/clarity
    // clarity.hearthsideworks.com/chat → /apps/clarity/chat
    const rewritePath = pathname === "/" ? "/apps/clarity" : `/apps/clarity${pathname}`

    return NextResponse.rewrite(new URL(rewritePath, request.url))
  }

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
