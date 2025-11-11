# Supabase Authentication Setup

## Expected Behavior

When running the application, you may see this warning in the console:

\`\`\`
GoTrueClient@sb-[project-id]-auth-token:1 Multiple GoTrueClient instances detected in the same browser context.
\`\`\`

**This is expected and safe.** It occurs because:

1. Next.js middleware creates a Supabase client to refresh auth sessions
2. Server components create their own clients to fetch user data
3. Both run during the same request, triggering the informational warning

This is the **recommended architecture** per Supabase SSR documentation and does not affect functionality or security.

## Why This Happens

- React's `cache()` function doesn't work across middleware and server component boundaries
- Middleware needs its own client instance to set cookies and refresh sessions
- Server components need their own client to read user data
- Both clients use the same storage key, triggering the warning

## Impact

- **No functional impact** - Authentication works correctly
- **No security impact** - Each client properly manages its own session
- **Development only** - This is a debug-level log from Supabase's internal logger

## References

- [Supabase SSR Documentation](https://supabase.com/docs/guides/auth/server-side)
- [Next.js Middleware with Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)
