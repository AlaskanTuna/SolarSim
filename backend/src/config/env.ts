/**
 * Runtime environment configuration.
 *
 * Loads `.env`, expands references, validates required backend settings with
 * Zod, and exports the normalized values consumed by the server.
 */

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { z } from 'zod'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenvExpand.expand(dotenv.config({ path: path.resolve(__dirname, '../../../.env') }))

const envSchema = z
  .object({
    PORT: z.coerce.number().optional(),
    BACKEND_PORT: z.coerce.number().default(3001),
    NODE_ENV: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(['development', 'production', 'test']).default('development')
    ),
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    R2_ACCOUNT_ID: z.string().min(1),
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    R2_BUCKET: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
    RESEND_API_KEY: z.string().min(1),
    // Sender identity must stay on the DKIM-verified solarsim.tech domain, or
    // deliverability and existing inbox reputation are lost.
    EMAIL_FROM: z.string().min(1).default('SolarSim <noreply@solarsim.tech>'),
    // Absolute base for images referenced in email — clients cannot resolve
    // relative paths. Falls back to the public site origin.
    EMAIL_ASSET_BASE_URL: z.string().url().default('https://solarsim.tech'),
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_SECRET: z.string().min(1),
    FRONTEND_URL: z.string().url().optional().default('http://localhost:5173'),
    PDF_TOKEN_SECRET: z.string().min(32),
    GEMINI_API_KEY: z.preprocess((val) => (val === '' ? undefined : val), z.string().min(1).optional()),
    GOOGLE_CLOUD_PROJECT: z.preprocess((val) => (val === '' ? undefined : val), z.string().min(1).optional()),
    GOOGLE_CLOUD_LOCATION: z.string().min(1).default('global'),
    CHAT_MODEL: z.string().min(1).default('gemini-3.1-flash-lite-preview'),
    APEX_DOMAIN: z.preprocess((val) => (val === '' ? undefined : val), z.string().min(1).optional())
  })
  .superRefine((value, ctx) => {
    if (!value.GEMINI_API_KEY && !value.GOOGLE_CLOUD_PROJECT) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one of GEMINI_API_KEY or GOOGLE_CLOUD_PROJECT must be set for the chat assistant.',
        path: ['GEMINI_API_KEY']
      })
    }
  })

const parsed = envSchema.parse(process.env)

/**
 * Parsed and validated runtime configuration.
 *
 * `PORT` can override `BACKEND_PORT` for deployment platforms that inject a
 * single conventional port variable.
 */
export const env = {
  ...parsed,
  port: parsed.PORT ?? parsed.BACKEND_PORT
}
