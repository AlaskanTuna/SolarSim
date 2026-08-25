import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '@/locales/en/common.json'
import enNav from '@/locales/en/nav.json'
import enAuth from '@/locales/en/auth.json'
import enLanding from '@/locales/en/landing.json'
import enDashboard from '@/locales/en/dashboard.json'
import enProjects from '@/locales/en/projects.json'
import enMap from '@/locales/en/map.json'
import enWorkbench from '@/locales/en/workbench.json'
import enAnalysis from '@/locales/en/analysis.json'
import enPdf from '@/locales/en/pdf.json'
import enFaq from '@/locales/en/faq.json'
import enSettings from '@/locales/en/settings.json'
import enNotifications from '@/locales/en/notifications.json'
import enChat from '@/locales/en/chat.json'
import enPrivacy from '@/locales/en/privacy.json'

import msCommon from '@/locales/ms/common.json'
import msNav from '@/locales/ms/nav.json'
import msAuth from '@/locales/ms/auth.json'
import msLanding from '@/locales/ms/landing.json'
import msDashboard from '@/locales/ms/dashboard.json'
import msProjects from '@/locales/ms/projects.json'
import msMap from '@/locales/ms/map.json'
import msWorkbench from '@/locales/ms/workbench.json'
import msAnalysis from '@/locales/ms/analysis.json'
import msPdf from '@/locales/ms/pdf.json'
import msFaq from '@/locales/ms/faq.json'
import msSettings from '@/locales/ms/settings.json'
import msNotifications from '@/locales/ms/notifications.json'
import msChat from '@/locales/ms/chat.json'
import msPrivacy from '@/locales/ms/privacy.json'

import zhCommon from '@/locales/zh/common.json'
import zhNav from '@/locales/zh/nav.json'
import zhAuth from '@/locales/zh/auth.json'
import zhLanding from '@/locales/zh/landing.json'
import zhDashboard from '@/locales/zh/dashboard.json'
import zhProjects from '@/locales/zh/projects.json'
import zhMap from '@/locales/zh/map.json'
import zhWorkbench from '@/locales/zh/workbench.json'
import zhAnalysis from '@/locales/zh/analysis.json'
import zhPdf from '@/locales/zh/pdf.json'
import zhFaq from '@/locales/zh/faq.json'
import zhSettings from '@/locales/zh/settings.json'
import zhNotifications from '@/locales/zh/notifications.json'
import zhChat from '@/locales/zh/chat.json'
import zhPrivacy from '@/locales/zh/privacy.json'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_STORAGE_KEY, type SupportedLocale } from './locales'

// Re-exported so existing importers keep working; the declarations live in a
// side-effect-free module because this one calls i18n.init() at module scope.
export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALE_TO_INTL,
  isSupportedLocale,
  type SupportedLocale
} from './locales'

/** Locale codes the app ships translations for. First entry is the i18next fallback. */

/** Default locale used before the language detector resolves. */

/** localStorage key i18next reads/writes the active locale to. */

/** Human-readable label shown in the language switcher, keyed by locale code. */
export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  ms: 'Bahasa Melayu',
  zh: '中文'
}

/**
 * BCP 47 tags passed to `Intl.NumberFormat` / `Intl.DateTimeFormat`.
 * `zh-Hans-MY` pins the Chinese script to Simplified for the Malaysian audience.
 */

const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    auth: enAuth,
    landing: enLanding,
    dashboard: enDashboard,
    projects: enProjects,
    map: enMap,
    workbench: enWorkbench,
    analysis: enAnalysis,
    pdf: enPdf,
    faq: enFaq,
    settings: enSettings,
    notifications: enNotifications,
    chat: enChat,
    privacy: enPrivacy
  },
  ms: {
    common: msCommon,
    nav: msNav,
    auth: msAuth,
    landing: msLanding,
    dashboard: msDashboard,
    projects: msProjects,
    map: msMap,
    workbench: msWorkbench,
    analysis: msAnalysis,
    pdf: msPdf,
    faq: msFaq,
    settings: msSettings,
    notifications: msNotifications,
    chat: msChat,
    privacy: msPrivacy
  },
  zh: {
    common: zhCommon,
    nav: zhNav,
    auth: zhAuth,
    landing: zhLanding,
    dashboard: zhDashboard,
    projects: zhProjects,
    map: zhMap,
    workbench: zhWorkbench,
    analysis: zhAnalysis,
    pdf: zhPdf,
    faq: zhFaq,
    settings: zhSettings,
    notifications: zhNotifications,
    chat: zhChat,
    privacy: zhPrivacy
  }
} as const

/**
 * Type guard for locale codes coming from external sources (URL params, localStorage, Better Auth user record).
 *
 * @param value - Candidate locale string from an untrusted source
 * @returns `true` when `value` is one of {@link SUPPORTED_LOCALES}, narrowing it to `SupportedLocale`
 */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    nonExplicitSupportedLngs: true,
    defaultNS: 'common',
    ns: [
      'common',
      'nav',
      'auth',
      'landing',
      'dashboard',
      'projects',
      'map',
      'workbench',
      'analysis',
      'pdf',
      'faq',
      'settings',
      'notifications',
      'chat',
      'privacy'
    ],
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'locale',
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ['localStorage']
    }
  })

/** Configured i18next instance with all 15 namespaces registered for en/ms/zh. */
export default i18n
