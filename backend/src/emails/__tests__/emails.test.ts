import { describe, expect, it, vi } from 'vitest'

const { emailAssetBaseUrl } = vi.hoisted(() => ({
  emailAssetBaseUrl: 'https://assets.example'
}))

vi.mock('../../config/env.js', () => ({
  env: { EMAIL_ASSET_BASE_URL: emailAssetBaseUrl }
}))

import {
  renderEmailChangeEmail,
  renderInviteEmail,
  renderPasswordResetEmail,
  renderVerificationEmail,
  resolveEmailLocale
} from '../index.js'
import { emailCopy } from '../copy.js'

const testUrl = 'https://app.example/auth?next=dashboard&mode="new"<finish>'
const escapedUrl = 'https://app.example/auth?next=dashboard&amp;mode=&quot;new&quot;&lt;finish&gt;'

const renderers = [
  {
    render: renderVerificationEmail,
    template: 'verification',
    subject: 'Confirm your SolarSim account'
  },
  {
    render: renderPasswordResetEmail,
    template: 'passwordReset',
    subject: 'Reset your SolarSim password'
  },
  {
    render: renderEmailChangeEmail,
    template: 'emailChange',
    subject: 'Confirm your new email address'
  },
  {
    render: renderInviteEmail,
    template: 'invite',
    subject: "You've been invited to SolarSim"
  }
] as const

const locales = ['en', 'ms', 'zh'] as const

describe('email renderers', () => {
  it.each(renderers)('returns the English subject and escaped URL by default', ({ render, subject }) => {
    const email = render(testUrl)

    expect(email.subject).toBe(subject)
    expect(email.html).toContain(escapedUrl)
  })

  it.each(renderers)('uses the configured public logo asset', ({ render }) => {
    const email = render(testUrl)

    expect(email.html).toContain('src="https://assets.example/email-logo.png"')
  })

  // Most clients block images by default, so the logo is decorative: an empty alt
  // lets a blocked load collapse to nothing instead of rendering clipped alt text
  // in a 42px box, and the adjacent wordmark still carries the brand.
  it.each(renderers)('keeps the logo decorative with the wordmark carrying meaning', ({ render }) => {
    const email = render(testUrl)

    expect(email.html).toContain('alt=""')
    expect(email.html).not.toContain('alt="SolarSim logo"')
    expect(email.html).toContain('SolarSim</span>')
  })

  it.each(renderers)('does not leave template tokens behind', ({ render }) => {
    const email = render(testUrl)

    expect(email.html).not.toMatch(new RegExp('\\{\\{\\s*.+?\\s*\\}\\}'))
  })
})

describe('locale rendering', () => {
  const cases = renderers.flatMap(({ render, template }) => locales.map((locale) => ({ render, template, locale })))

  it.each(cases)('renders the $locale copy for the $template template', ({ render, template, locale }) => {
    const copy = emailCopy[locale][template]
    const email = render(testUrl, locale)

    expect(email.subject).toBe(copy.subject)
    expect(email.html).toContain(`<html lang="${copy.lang}">`)
    expect(email.html).toContain(copy.heading)
    expect(email.html).toContain(copy.button)
    expect(email.html).toContain(copy.footer)
    expect(email.html).toContain(escapedUrl)
  })

  it.each(cases.filter(({ locale }) => locale !== 'en'))(
    'does not leak the English subject into the $locale $template email',
    ({ render, template, locale }) => {
      const email = render(testUrl, locale)

      expect(email.subject).not.toBe(emailCopy.en[template].subject)
    }
  )
})

describe('resolveEmailLocale', () => {
  it.each([
    { value: 'en', expected: 'en' },
    { value: 'ms', expected: 'ms' },
    { value: 'zh', expected: 'zh' },
    { value: undefined, expected: 'en' },
    { value: null, expected: 'en' },
    { value: 'fr', expected: 'en' },
    { value: 'ms-MY', expected: 'en' },
    { value: 7, expected: 'en' }
  ])('maps $value to $expected', ({ value, expected }) => {
    expect(resolveEmailLocale(value)).toBe(expected)
  })
})
