/**
 * User tier and project quota service.
 *
 * Reads subscription tier metadata and calculates daily project usage against
 * UTC reset windows.
 */

import { prisma } from '../config/prisma.js'
import { TIER_DAILY_LIMITS, type UserTier, type QuotaSummary } from '@shared/types'

/**
 * Calculates the start of the UTC day for a reference time.
 *
 * @param now - Reference instant; defaults to the current time
 * @returns New Date set to 00:00:00.000 UTC on the same day
 */
export function startOfUtcDay(now: Date = new Date()): Date {
  const d = new Date(now)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

/**
 * Calculates the next UTC midnight after a reference time.
 *
 * @param now - Reference instant; defaults to the current time
 * @returns New Date set to the next 00:00:00.000 UTC
 */
export function nextUtcMidnight(now: Date = new Date()): Date {
  const d = startOfUtcDay(now)
  d.setUTCDate(d.getUTCDate() + 1)
  return d
}

/**
 * Reads the user's subscription tier from the application user record.
 *
 * @param userId - Authenticated user id matching the user record
 * @returns User tier, defaulting to `FREE` when the user is missing
 */
export async function getUserTier(userId: string): Promise<UserTier> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { tier: true } })
  if (!user) {
    console.warn(`[UserTier] profile missing for user=${userId}, defaulting to FREE`)
    return 'FREE'
  }
  return user.tier
}

/**
 * Counts projects created since the current UTC day started.
 *
 * @param userId - Authenticated user whose quota usage is counted
 * @param now - Reference instant for the UTC day boundary
 * @returns Number of quota-tracked projects created today
 */
export async function countProjectsSinceUtcMidnight(userId: string, now: Date = new Date()): Promise<number> {
  return prisma.projectQuotaUsage.count({
    where: {
      userId,
      createdAt: { gte: startOfUtcDay(now) }
    }
  })
}

/**
 * Builds the user's daily quota summary.
 *
 * @param userId - Authenticated user whose quota should be reported
 * @param now - Reference instant for usage and reset calculations
 * @returns Tier, usage count, limit, and next UTC reset timestamp
 */
export async function getQuotaSummary(userId: string, now: Date = new Date()): Promise<QuotaSummary> {
  const [tier, used] = await Promise.all([getUserTier(userId), countProjectsSinceUtcMidnight(userId, now)])
  const rawLimit = TIER_DAILY_LIMITS[tier]
  const limit = Number.isFinite(rawLimit) ? rawLimit : null
  return {
    tier,
    used,
    limit,
    resetsAt: nextUtcMidnight(now).toISOString()
  }
}
