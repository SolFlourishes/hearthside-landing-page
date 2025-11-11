"use client"

export type AccessTier = "anonymous" | "authenticated" | "supervised"

const ACCESS_STORAGE_KEY = "clarity_coach_access_tier"
const ACCESS_TIMESTAMP_KEY = "clarity_coach_access_timestamp"

/**
 * Store the selected access tier
 * Anonymous tier uses sessionStorage (cleared when browser closes)
 * Other tiers use localStorage (persists across sessions)
 */
export function setAccessTier(tier: AccessTier): void {
  if (typeof window === "undefined") return // Guard for SSR

  const timestamp = Date.now().toString()

  if (tier === "anonymous") {
    // Anonymous users: use sessionStorage for privacy
    sessionStorage.setItem(ACCESS_STORAGE_KEY, tier)
    sessionStorage.setItem(ACCESS_TIMESTAMP_KEY, timestamp)
    // Clear localStorage if it exists
    localStorage.removeItem(ACCESS_STORAGE_KEY)
    localStorage.removeItem(ACCESS_TIMESTAMP_KEY)
  } else {
    // Authenticated/Supervised: use localStorage to persist
    localStorage.setItem(ACCESS_STORAGE_KEY, tier)
    localStorage.setItem(ACCESS_TIMESTAMP_KEY, timestamp)
    // Clear sessionStorage if it exists
    sessionStorage.removeItem(ACCESS_STORAGE_KEY)
    sessionStorage.removeItem(ACCESS_TIMESTAMP_KEY)
  }
}

/**
 * Get the stored access tier
 * Checks both localStorage and sessionStorage
 */
export function getAccessTier(): AccessTier | null {
  if (typeof window === "undefined") return null // Guard for SSR

  // Check sessionStorage first (for anonymous users)
  const sessionTier = sessionStorage.getItem(ACCESS_STORAGE_KEY)
  if (sessionTier) {
    return sessionTier as AccessTier
  }

  // Check localStorage (for authenticated/supervised users)
  const localTier = localStorage.getItem(ACCESS_STORAGE_KEY)
  if (localTier) {
    return localTier as AccessTier
  }

  return null
}

/**
 * Check if user has granted access
 */
export function hasAccessGranted(): boolean {
  return getAccessTier() !== null
}

/**
 * Clear the stored access tier (logout/reset)
 */
export function clearAccessTier(): void {
  if (typeof window === "undefined") return // Guard for SSR

  localStorage.removeItem(ACCESS_STORAGE_KEY)
  localStorage.removeItem(ACCESS_TIMESTAMP_KEY)
  sessionStorage.removeItem(ACCESS_STORAGE_KEY)
  sessionStorage.removeItem(ACCESS_TIMESTAMP_KEY)
}

/**
 * Get when access was granted (for analytics/debugging)
 */
export function getAccessTimestamp(): number | null {
  if (typeof window === "undefined") return null // Guard for SSR

  const sessionTimestamp = sessionStorage.getItem(ACCESS_TIMESTAMP_KEY)
  if (sessionTimestamp) {
    return Number.parseInt(sessionTimestamp, 10)
  }

  const localTimestamp = localStorage.getItem(ACCESS_TIMESTAMP_KEY)
  if (localTimestamp) {
    return Number.parseInt(localTimestamp, 10)
  }

  return null
}
