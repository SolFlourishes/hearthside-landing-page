import { createClient } from "@/lib/supabase/server"

export type UserRole = "user" | "elder" | "author" | "moderator" | "admin"
export type UserTier = "free" | "premium"

export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  tier: UserTier
  communication_style: Record<string, unknown> | null
  requests_this_hour: number
  last_request_reset: string
  created_at: string
  updated_at: string
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  const supabase = await createClient()

  // If no userId provided, get current user
  if (!userId) {
    const user = await getCurrentUser()
    if (!user) return null
    userId = user.id
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error || !data) {
    return null
  }

  return data as UserProfile
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, "display_name" | "avatar_url" | "bio" | "communication_style">>,
) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  return data as UserProfile
}

export async function checkUserRole(requiredRole: UserRole): Promise<boolean> {
  const profile = await getUserProfile()
  if (!profile) return false

  const roleHierarchy: Record<UserRole, number> = {
    user: 0,
    elder: 1,
    author: 2,
    moderator: 3,
    admin: 4,
  }

  return roleHierarchy[profile.role] >= roleHierarchy[requiredRole]
}

export async function checkRateLimit(): Promise<{ allowed: boolean; remaining: number }> {
  const profile = await getUserProfile()

  if (!profile) {
    // Anonymous users: use existing rate limiting
    return { allowed: true, remaining: 30 }
  }

  // Premium users: unlimited
  if (profile.tier === "premium") {
    return { allowed: true, remaining: Number.POSITIVE_INFINITY }
  }

  // Free users: 200 requests per hour
  const limit = 200
  const now = new Date()
  const lastReset = new Date(profile.last_request_reset)
  const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60)

  // Reset if more than an hour has passed
  if (hoursSinceReset >= 1) {
    const supabase = await createClient()
    await supabase
      .from("profiles")
      .update({ requests_this_hour: 1, last_request_reset: now.toISOString() })
      .eq("id", profile.id)

    return { allowed: true, remaining: limit - 1 }
  }

  // Check if under limit
  if (profile.requests_this_hour >= limit) {
    return { allowed: false, remaining: 0 }
  }

  // Increment counter
  const supabase = await createClient()
  await supabase
    .from("profiles")
    .update({ requests_this_hour: profile.requests_this_hour + 1 })
    .eq("id", profile.id)

  return { allowed: true, remaining: limit - profile.requests_this_hour - 1 }
}
