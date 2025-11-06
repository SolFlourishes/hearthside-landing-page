import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_KV_KV_REST_API_URL!,
  token: process.env.UPSTASH_KV_KV_REST_API_TOKEN!,
})

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Rate limiter using Upstash Redis
 * Implements sliding window rate limiting
 */
export async function checkRateLimit(identifier: string, limit = 10, windowMs = 60000): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`
  const now = Date.now()
  const windowStart = now - windowMs

  try {
    // Remove old entries outside the window
    await redis.zremrangebyscore(key, 0, windowStart)

    // Count requests in current window
    const requestCount = await redis.zcard(key)

    if (requestCount >= limit) {
      // Get the oldest request timestamp to calculate reset time
      const oldestRequests = await redis.zrange(key, 0, 0, { withScores: true })
      const oldestTimestamp = oldestRequests.length > 0 ? Number(oldestRequests[1]) : now
      const resetTime = oldestTimestamp + windowMs

      return {
        success: false,
        limit,
        remaining: 0,
        reset: resetTime,
      }
    }

    // Add current request
    await redis.zadd(key, { score: now, member: `${now}:${Math.random()}` })

    // Set expiry on the key
    await redis.expire(key, Math.ceil(windowMs / 1000))

    return {
      success: true,
      limit,
      remaining: limit - requestCount - 1,
      reset: now + windowMs,
    }
  } catch (error) {
    console.error("[v0] Rate limit check failed:", error)
    // On error, allow the request (fail open)
    return {
      success: true,
      limit,
      remaining: limit,
      reset: now + windowMs,
    }
  }
}

/**
 * Get rate limit for different access tiers
 */
export function getRateLimitForTier(tier: "anonymous" | "authenticated" | "premium"): {
  limit: number
  windowMs: number
} {
  switch (tier) {
    case "anonymous":
      return { limit: 10, windowMs: 3600000 } // 10 requests per hour
    case "authenticated":
      return { limit: 100, windowMs: 3600000 } // 100 requests per hour
    case "premium":
      return { limit: 1000, windowMs: 3600000 } // 1000 requests per hour
    default:
      return { limit: 10, windowMs: 3600000 }
  }
}
