/**
 * Locale constants, kept free of side effects.
 *
 * `i18n.ts` calls `i18n.init()` at module scope, so anything importing from it
 * pulls that initialisation in. Modules that only need the locale codes — the
 * shared `Intl` formatters, for instance — import from here instead, and tests
 * that mock i18n are not forced to load the real thing.
 */

/** Locale codes the UI ships translations for. */
export const SUPPORTED_LOCALES = ['en', 'ms', 'zh'] as const

/** Union of every locale code in {@link SUPPORTED_LOCALES}. */
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

/** Locale used before the user expresses a preference. */
export const DEFAULT_LOCALE: SupportedLocale = 'en'

/** localStorage key holding the persisted locale choice. */
export const LOCALE_STORAGE_KEY = 'locale'

/**
 * BCP 47 tags passed to `Intl.NumberFormat` / `Intl.DateTimeFormat`.
 * `zh-Hans-MY` pins the Chinese script to Simplified for the Malaysian audience.
 */
export const LOCALE_TO_INTL: Record<SupportedLocale, string> = {
  en: 'en-MY',
  ms: 'ms-MY',
  zh: 'zh-Hans-MY'
}

/**
 * Type guard for locale codes coming from external sources (URL params, localStorage, Better Auth user record).
 *
 * @param value - Candidate locale string from an untrusted source
 * @returns `true` when `value` is one of {@link SUPPORTED_LOCALES}, narrowing it to `SupportedLocale`
 */
export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return value !== null && value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
