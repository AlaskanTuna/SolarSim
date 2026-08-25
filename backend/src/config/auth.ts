/**
 * Better Auth server configuration — the single source of identity for the app.
 *
 * Replaces Supabase Auth. Sessions and accounts live in the same Neon database
 * as application data, so there is no external identity provider that can pause
 * or change terms underneath us.
 */

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { env } from './env.js'
import { prisma } from './prisma.js'
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService.js'
import { resolveEmailLocale } from '../emails/index.js'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  trustedOrigins: [env.FRONTEND_URL],

  emailAndPassword: {
    enabled: true,
    // Matches the retired Supabase `enable_confirmations = true`: a new account
    // cannot sign in until its address is verified.
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user.email, url, resolveEmailLocale('locale' in user ? user.locale : undefined))
    }
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url, resolveEmailLocale('locale' in user ? user.locale : undefined))
    }
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_SECRET
    }
  },

  account: {
    // Google access/refresh tokens are stored in the `account` table; encrypt
    // them at rest rather than accepting the plaintext default.
    encryptOAuthTokens: true,
    accountLinking: {
      // Mirrors the retired `enable_manual_linking = false`: signing in with
      // Google using an address that already has a password account lands on
      // that same account instead of creating a duplicate.
      enabled: true,
      trustedProviders: ['google']
    }
  },

  user: {
    additionalFields: {
      // Subscription tier drives daily project quota. Server-owned: `input: false`
      // stops a client from promoting itself by posting a tier on signup.
      tier: {
        type: 'string',
        required: false,
        defaultValue: 'FREE',
        input: false
      },
      // UI language, persisted server-side so the choice follows the user
      // across devices. Client-writable, unlike tier.
      locale: {
        type: 'string',
        required: false,
        input: true
      }
    }
  }
})
