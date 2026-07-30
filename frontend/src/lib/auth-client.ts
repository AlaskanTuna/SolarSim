/**
 * Better Auth client singleton.
 *
 * Uses the same-origin `/api/auth` mount in development and production, so
 * browser session cookies work without a separate base URL.
 *
 * `inferAdditionalFields` is declared with a literal schema rather than the
 * server's `typeof auth`, which would drag backend types across the workspace
 * boundary. Keep this in sync with `user.additionalFields` in
 * `backend/src/config/auth.ts` — `tier` is server-owned and not client-writable.
 */

import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  basePath: '/api/auth',
  plugins: [
    inferAdditionalFields({
      user: {
        tier: { type: 'string', required: false, input: false },
        locale: { type: 'string', required: false }
      }
    })
  ]
})
