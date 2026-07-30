/**
 * Better Auth session authentication middleware.
 *
 * Verifies API requests against Better Auth and attaches the authenticated
 * user identity to Express requests for downstream route ownership checks.
 */

import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../config/auth.js'

declare global {
  namespace Express {
    // Declared here because this middleware is the source of truth for req.user.
    interface Request {
      user?: { id: string; email: string }
    }
  }
}

/**
 * Verifies the Better Auth session and stores the authenticated
 * user id/email on `req.user`.
 *
 * @param req - Incoming request carrying Better Auth session cookies
 * @param res - Response used for unauthorised JSON failures
 * @param next - Continuation called after successful authentication
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  if (!session?.user) {
    console.warn(`[Auth] Invalid session for ${req.method} ${req.originalUrl}`)
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  req.user = { id: session.user.id, email: session.user.email ?? '' }
  console.info(`[Auth] user=${req.user.id} ${req.method} ${req.originalUrl}`)
  next()
}
