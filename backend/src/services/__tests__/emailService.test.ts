import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const {
  emailsSendMock,
  renderVerificationEmailMock,
  renderPasswordResetEmailMock,
  renderEmailChangeEmailMock,
  renderInviteEmailMock
} = vi.hoisted(() => ({
  emailsSendMock: vi.fn(),
  renderVerificationEmailMock: vi.fn(),
  renderPasswordResetEmailMock: vi.fn(),
  renderEmailChangeEmailMock: vi.fn(),
  renderInviteEmailMock: vi.fn()
}))

vi.mock('../../config/env.js', () => ({
  env: {
    RESEND_API_KEY: 're_test_key',
    EMAIL_FROM: 'SolarSim <noreply@solarsim.tech>'
  }
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: (...args: unknown[]) => emailsSendMock(...args) }
  }
}))

vi.mock('../../emails/index.js', () => ({
  renderVerificationEmail: (...args: unknown[]) => renderVerificationEmailMock(...args),
  renderPasswordResetEmail: (...args: unknown[]) => renderPasswordResetEmailMock(...args),
  renderEmailChangeEmail: (...args: unknown[]) => renderEmailChangeEmailMock(...args),
  renderInviteEmail: (...args: unknown[]) => renderInviteEmailMock(...args)
}))

import {
  EMAIL_RATE_LIMIT,
  sendEmail,
  sendEmailChangeEmail,
  sendInviteEmail,
  sendPasswordResetEmail,
  sendVerificationEmail
} from '../emailService.js'

const EMAIL_FROM = 'SolarSim <noreply@solarsim.tech>'
const RECIPIENT = 'homeowner@example.com'
let testTime = new Date('2026-07-30T00:00:00.000Z')
let consoleErrorSpy: ReturnType<typeof vi.spyOn>

describe('emailService', () => {
  beforeEach(() => {
    testTime = new Date(testTime.getTime() + 3_600_001)
    vi.useFakeTimers()
    vi.setSystemTime(testTime)
    emailsSendMock.mockReset()
    emailsSendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })
    renderVerificationEmailMock.mockReset()
    renderPasswordResetEmailMock.mockReset()
    renderEmailChangeEmailMock.mockReset()
    renderInviteEmailMock.mockReset()
    renderVerificationEmailMock.mockReturnValue({ subject: 'Verify your email', html: '<p>Verify</p>' })
    renderPasswordResetEmailMock.mockReturnValue({ subject: 'Reset your password', html: '<p>Reset</p>' })
    renderEmailChangeEmailMock.mockReturnValue({ subject: 'Confirm your email change', html: '<p>Change</p>' })
    renderInviteEmailMock.mockReturnValue({ subject: 'You are invited', html: '<p>Invite</p>' })
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    vi.useRealTimers()
  })

  it('renders and sends a verification email to the supplied recipient', async () => {
    const url = 'https://solarsim.tech/verify?token=verification-token'

    await sendVerificationEmail(RECIPIENT, url)

    expect(renderVerificationEmailMock).toHaveBeenCalledWith(url, undefined)
    expect(emailsSendMock).toHaveBeenCalledWith({
      from: EMAIL_FROM,
      to: RECIPIENT,
      subject: 'Verify your email',
      html: '<p>Verify</p>'
    })
  })

  it('renders and sends a password-reset email to the supplied recipient', async () => {
    const url = 'https://solarsim.tech/reset?token=reset-token'

    await sendPasswordResetEmail(RECIPIENT, url)

    expect(renderPasswordResetEmailMock).toHaveBeenCalledWith(url, undefined)
    expect(emailsSendMock).toHaveBeenCalledWith({
      from: EMAIL_FROM,
      to: RECIPIENT,
      subject: 'Reset your password',
      html: '<p>Reset</p>'
    })
  })

  it('renders and sends an email-change confirmation to the supplied recipient', async () => {
    const url = 'https://solarsim.tech/email-change?token=change-token'

    await sendEmailChangeEmail(RECIPIENT, url)

    expect(renderEmailChangeEmailMock).toHaveBeenCalledWith(url, undefined)
    expect(emailsSendMock).toHaveBeenCalledWith({
      from: EMAIL_FROM,
      to: RECIPIENT,
      subject: 'Confirm your email change',
      html: '<p>Change</p>'
    })
  })

  it('renders and sends an invite email to the supplied recipient', async () => {
    const url = 'https://solarsim.tech/invite?token=invite-token'

    await sendInviteEmail(RECIPIENT, url)

    expect(renderInviteEmailMock).toHaveBeenCalledWith(url, undefined)
    expect(emailsSendMock).toHaveBeenCalledWith({
      from: EMAIL_FROM,
      to: RECIPIENT,
      subject: 'You are invited',
      html: '<p>Invite</p>'
    })
  })

  it('throws a greppable error when Resend reports a failure', async () => {
    emailsSendMock.mockResolvedValue({ data: null, error: { message: 'Sender domain is unavailable' } })

    await expect(sendEmail({ to: RECIPIENT, subject: 'Subject', html: '<p>Body</p>' })).rejects.toThrow(
      `Email send failed for ${RECIPIENT}: Sender domain is unavailable`
    )
  })

  it('allows sends below the hourly limit and blocks the next one', async () => {
    for (let index = 0; index < EMAIL_RATE_LIMIT; index += 1) {
      await sendEmail({ to: `homeowner-${index}@example.com`, subject: 'Subject', html: '<p>Body</p>' })
    }

    await expect(sendEmail({ to: RECIPIENT, subject: 'Subject', html: '<p>Body</p>' })).rejects.toThrow(
      `Email rate limit exceeded for ${RECIPIENT}: maximum ${EMAIL_RATE_LIMIT} emails per hour`
    )
    expect(emailsSendMock).toHaveBeenCalledTimes(EMAIL_RATE_LIMIT)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[Email] rate limit exceeded for ${RECIPIENT}: maximum ${EMAIL_RATE_LIMIT} emails per hour`
    )
  })
})
