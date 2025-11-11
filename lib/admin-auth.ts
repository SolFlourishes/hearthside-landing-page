import { createClient } from "@/lib/supabase/server"
import type { UserRole } from "./user-management"

export interface AdminAuthResult {
  isAuthenticated: boolean
  user?: {
    id: string
    email: string
    role: UserRole
  }
  error?: string
}

/**
 * Check if the current user has the required role
 * Role hierarchy: admin (4) > moderator (3) > author (2) > elder (1) > user (0)
 */
export async function checkRoleAuth(requiredRole: UserRole): Promise<AdminAuthResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      isAuthenticated: false,
      error: "Not authenticated",
    }
  }

  let { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("role, email")
    .eq("id", user.id)
    .single()

  // If profile doesn't exist, try to create it
  if (!profile && profileError?.code === "PGRST116") {
    const { data: newProfile } = await supabase
      .from("user_profiles")
      .insert({
        id: user.id,
        email: user.email,
        display_name: user.email?.split("@")[0] || "User",
        role: "user",
      })
      .select("role, email")
      .single()

    profile = newProfile
  }

  if (!profile) {
    return {
      isAuthenticated: false,
      error: "User profile not found",
    }
  }

  const roleHierarchy: Record<UserRole, number> = {
    user: 0,
    elder: 1,
    author: 2,
    moderator: 3,
    admin: 4,
  }

  const userLevel = roleHierarchy[profile.role as UserRole] || 0
  const requiredLevel = roleHierarchy[requiredRole]

  if (userLevel < requiredLevel) {
    return {
      isAuthenticated: false,
      error: `Insufficient permissions. Required: ${requiredRole}, Current: ${profile.role}`,
    }
  }

  return {
    isAuthenticated: true,
    user: {
      id: user.id,
      email: profile.email,
      role: profile.role as UserRole,
    },
  }
}

/**
 * Check if current user is an admin
 */
export async function checkAdminAuth(): Promise<AdminAuthResult> {
  return checkRoleAuth("admin")
}

/**
 * Check if current user is a moderator or higher
 */
export async function checkModeratorAuth(): Promise<AdminAuthResult> {
  return checkRoleAuth("moderator")
}

/**
 * Check if current user is an author or higher
 */
export async function checkAuthorAuth(): Promise<AdminAuthResult> {
  return checkRoleAuth("author")
}
