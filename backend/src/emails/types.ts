/**
 * Contract between rendered email templates and the dispatch service.
 *
 * Templates own subject + HTML; `emailService` owns delivery. Keeping the two
 * apart means a template change cannot break sending, and vice versa.
 */

/** A fully rendered message, ready to hand to the mail provider. */
export type RenderedEmail = {
  subject: string
  html: string
}

/** Locale codes the transactional emails ship translations for. */
export const SUPPORTED_EMAIL_LOCALES = ['en', 'ms', 'zh'] as const

/** Union of every locale code in {@link SUPPORTED_EMAIL_LOCALES}. */
export type SupportedEmailLocale = (typeof SUPPORTED_EMAIL_LOCALES)[number]

/**
 * Maps an untrusted locale value (the client-writable `User.locale`) to a
 * supported code. Anything absent or unrecognised falls back to English so a
 * bad value can never block or break a send.
 */
export const resolveEmailLocale = (value: unknown): SupportedEmailLocale => {
  if (typeof value === 'string' && SUPPORTED_EMAIL_LOCALES.includes(value as SupportedEmailLocale)) {
    return value as SupportedEmailLocale
  }
  return 'en'
}
