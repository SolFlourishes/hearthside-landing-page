import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const pathname = request.nextUrl.pathname

  // Check if the request is from the clarity subdomain
  if (hostname.startsWith("clarity.")) {
    if (pathname.startsWith("/apps/clarity")) {
      return NextResponse.next()
    }

    // Rewrite root and other paths to /apps/clarity
    // clarity.hearthsideworks.com/ → /apps/clarity
    // clarity.hearthsideworks.com/draft → /apps/clarity/draft
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
