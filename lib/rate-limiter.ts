import { Redis } from "@upstash/redis"

const isRedisConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  allowed: boolean
  resetIn: number
}

/**
 * Rate limiter using Upstash Redis
 * Implements sliding window rate limiting
 */
export async function checkRateLimit(identifier: string, limit = 10, windowMs = 60000): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`
  const now = Date.now()
  const windowStart = now - windowMs

  if (!redis) {
    console.warn("[v0] Redis not configured, allowing request without rate limiting")
    return {
      success: true,
      allowed: true,
      limit,
      remaining: limit,
      reset: now + windowMs,
      resetIn: windowMs,
    }
  }

  try {
    // Remove old entries outside the window
    await redis.zremrangebyscore(key, 0, windowStart)

    // Count requests in current window
    const requestCount = await redis.zcard(key)

    if (requestCount >= limit) {
      const oldestRequests = await redis.zrange(key, 0, 0, { withScores: true })
      const oldestTimestamp = oldestRequests.length > 0 ? Number(oldestRequests[1]) : now
      const resetTime = oldestTimestamp + windowMs

      return {
        success: false,
        allowed: false,
        limit,
        remaining: 0,
        reset: resetTime,
        resetIn: resetTime - now,
      }
    }

    // Add current request
    await redis.zadd(key, { score: now, member: `${now}:${Math.random()}` })

    // Set expiry on the key
    await redis.expire(key, Math.ceil(windowMs / 1000))

    return {
      success: true,
      allowed: true,
      limit,
      remaining: limit - requestCount - 1,
      reset: now + windowMs,
      resetIn: windowMs,
    }
  } catch (error) {
    console.error("[v0] Rate limit check failed:", error)
    return {
      success: true,
      allowed: true,
      limit,
      remaining: limit,
      reset: now + windowMs,
      resetIn: windowMs,
    }
  }
}

/**
 * Get rate limit for different access tiers
 */
export function getRateLimitForTier(tier: "anonymous" | "authenticated" | "supervised" | "premium"): {
  limit: number
  windowMs: number
} {
  switch (tier) {
    case "anonymous":
      return { limit: 30, windowMs: 3600000 } // 30 requests per hour
    case "authenticated":
    case "supervised":
      return { limit: 200, windowMs: 3600000 } // 200 requests per hour
    case "premium":
      return { limit: 1000, windowMs: 3600000 } // 1000 requests per hour
    default:
      return { limit: 30, windowMs: 3600000 }
  }
}

export async function checkRateLimitWithTier(
  identifier: string,
  tier: "anonymous" | "authenticated" | "supervised" | "premium" = "anonymous",
): Promise<RateLimitResult> {
  const { limit, windowMs } = getRateLimitForTier(tier)
  return checkRateLimit(identifier, limit, windowMs)
}
