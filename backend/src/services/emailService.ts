/**
 * Transactional email dispatch through Resend.
 *
 * Templates own message content; this service owns provider delivery and the
 * retired auth service's hourly send guard.
 */

import { Resend } from 'resend'
import { env } from '../config/env.js'
import {
  renderEmailChangeEmail,
  renderInviteEmail,
  renderPasswordResetEmail,
  renderVerificationEmail,
  type SupportedEmailLocale
} from '../emails/index.js'

/** Maximum number of transactional emails accepted in one rolling hour. */
export const EMAIL_RATE_LIMIT = 30

const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const resend = new Resend(env.RESEND_API_KEY)
const sentEmailTimestamps: number[] = []

/**
 * Sends a rendered transactional email through the DKIM-aligned Resend sender.
 *
 * @param message - Recipient and fully rendered message content
 */
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<void> {
  const cutoff = Date.now() - EMAIL_RATE_LIMIT_WINDOW_MS

  while (sentEmailTimestamps[0] !== undefined && sentEmailTimestamps[0] <= cutoff) {
    sentEmailTimestamps.shift()
  }

  if (sentEmailTimestamps.length >= EMAIL_RATE_LIMIT) {
    const message = `Email rate limit exceeded for ${to}: maximum ${EMAIL_RATE_LIMIT} emails per hour`
    console.error(`[Email] rate limit exceeded for ${to}: maximum ${EMAIL_RATE_LIMIT} emails per hour`)
    throw new Error(message)
  }

  // Reserve before the provider call so concurrent requests cannot exceed the quota.
  sentEmailTimestamps.push(Date.now())

  try {
    const { error } = await resend.emails.send({ from: env.EMAIL_FROM, to, subject, html })

    if (error) throw new Error(error.message)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Email send failed for ${to}: ${message}`)
  }
}

/**
 * Sends an address-verification link to a newly registered user.
 *
 * @param email - Recipient address
 * @param url - Better Auth verification link
 * @param locale - Recipient locale; renders English when omitted
 */
export async function sendVerificationEmail(email: string, url: string, locale?: SupportedEmailLocale): Promise<void> {
  const { subject, html } = renderVerificationEmail(url, locale)
  await sendEmail({ to: email, subject, html })
}

/**
 * Sends a password-reset link.
 *
 * @param email - Recipient address
 * @param url - Better Auth password-reset link
 * @param locale - Recipient locale; renders English when omitted
 */
export async function sendPasswordResetEmail(email: string, url: string, locale?: SupportedEmailLocale): Promise<void> {
  const { subject, html } = renderPasswordResetEmail(url, locale)
  await sendEmail({ to: email, subject, html })
}

/**
 * Sends an email-change confirmation link.
 *
 * @param email - Recipient address
 * @param url - Email-change confirmation link
 * @param locale - Recipient locale; renders English when omitted
 */
export async function sendEmailChangeEmail(email: string, url: string, locale?: SupportedEmailLocale): Promise<void> {
  const { subject, html } = renderEmailChangeEmail(url, locale)
  await sendEmail({ to: email, subject, html })
}

/**
 * Sends an invitation link.
 *
 * @param email - Recipient address
 * @param url - Invitation link
 * @param locale - Recipient locale; renders English when omitted
 */
export async function sendInviteEmail(email: string, url: string, locale?: SupportedEmailLocale): Promise<void> {
  const { subject, html } = renderInviteEmail(url, locale)
  await sendEmail({ to: email, subject, html })
}
