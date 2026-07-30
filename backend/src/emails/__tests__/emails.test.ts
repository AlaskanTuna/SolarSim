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
  renderVerificationEmail
} from '../index.js'

const testUrl = 'https://app.example/auth?next=dashboard&mode="new"<finish>'
const escapedUrl = 'https://app.example/auth?next=dashboard&amp;mode=&quot;new&quot;&lt;finish&gt;'

const renderers = [
  {
    render: renderVerificationEmail,
    subject: 'Confirm Your SolarSim Account'
  },
  {
    render: renderPasswordResetEmail,
    subject: 'Reset your Solar Layout Generator password'
  },
  {
    render: renderEmailChangeEmail,
    subject: 'Confirm your new email address'
  },
  {
    render: renderInviteEmail,
    subject: "You've been invited to Solar Layout Generator"
  }
]

describe('email renderers', () => {
  it.each(renderers)('returns the configured subject and escaped URL', ({ render, subject }) => {
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
