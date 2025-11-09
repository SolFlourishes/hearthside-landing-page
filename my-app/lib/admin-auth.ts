import type { NextRequest } from "next/server"

export interface AdminAuthResult {
  isAuthenticated: boolean
  error?: string
}

/**
 * Simple admin authentication check using environment variable
 * In production, replace with proper auth service (e.g., Clerk, Auth0, Firebase Auth)
 */
export function checkAdminAuth(request: NextRequest): AdminAuthResult {
  const authHeader = request.headers.get("authorization")

  if (!authHeader) {
    return {
      isAuthenticated: false,
      error: "Missing authorization header",
    }
  }

  // Expected format: "Bearer <admin_token>"
  const [bearer, token] = authHeader.split(" ")

  if (bearer !== "Bearer" || !token) {
    return {
      isAuthenticated: false,
      error: "Invalid authorization format. Expected: Bearer <token>",
    }
  }

  const adminToken = process.env.ADMIN_AUTH_TOKEN

  if (!adminToken) {
    console.error("ADMIN_AUTH_TOKEN environment variable is not set")
    return {
      isAuthenticated: false,
      error: "Admin authentication is not configured",
    }
  }

  if (token !== adminToken) {
    return {
      isAuthenticated: false,
      error: "Invalid admin token",
    }
  }

  return {
    isAuthenticated: true,
  }
}

/**
 * Get admin credentials from environment for initial setup
 * This is a temporary solution - in production, use proper user management
 */
export function getAdminInstructions(): string {
  const adminToken = process.env.ADMIN_AUTH_TOKEN

  if (!adminToken) {
    return `
Admin authentication is not configured. To set up admin access:

1. Add ADMIN_AUTH_TOKEN environment variable in your Vercel project settings
2. Set it to a secure random string (e.g., use a password generator)
3. When making admin API requests, include the header:
   Authorization: Bearer YOUR_ADMIN_TOKEN

For local development, add to .env.local:
ADMIN_AUTH_TOKEN=your-secure-token-here
`
  }

  return `
Admin authentication is configured. To access admin endpoints:

Include this header in your API requests:
Authorization: Bearer ${adminToken.substring(0, 8)}...

Keep this token secure and never commit it to version control.
`
}
