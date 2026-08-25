/**
 * Locale copy for the transactional email templates.
 *
 * The four templates are Gmail-hardened HTML skeletons; only these strings
 * change per locale. Keep every translation at the same register as
 * `frontend/src/locales/{en,ms,zh}/` — the app and its emails read as one voice.
 */

import type { SupportedEmailLocale } from './types.js'

/** The text slots one rendered email fills, in template order. */
export type EmailCopy = {
  /** Value for the `<html lang>` attribute. */
  lang: string
  subject: string
  preheader: string
  eyebrow: string
  heading: string
  lead: string
  button: string
  notice: string
  fallbackIntro: string
  footer: string
}

export const emailCopy = {
  en: {
    verification: {
      lang: 'en',
      subject: 'Confirm your SolarSim account',
      preheader: 'Confirm your email address to finish setting up your SolarSim account.',
      eyebrow: 'Account confirmation',
      heading: 'Confirm your SolarSim account',
      lead: 'Welcome to SolarSim. Please confirm your email address to finish setting up your account.',
      button: 'Confirm Account',
      notice: 'If you did not create a SolarSim account, you can safely ignore this email.',
      fallbackIntro: 'If the button does not work, copy and paste this link into your browser:',
      footer: 'You received this email because you signed up for SolarSim.'
    },
    passwordReset: {
      lang: 'en',
      subject: 'Reset your SolarSim password',
      preheader: 'Reset your SolarSim password securely.',
      eyebrow: 'Password reset',
      heading: 'Reset your password',
      lead: 'We received a request to reset your password. Click the button below to choose a new one.',
      button: 'Reset Password',
      notice:
        'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.',
      fallbackIntro: 'If the button does not work, copy and paste this link into your browser:',
      footer: 'You received this email because a password reset was requested for your SolarSim account.'
    },
    emailChange: {
      lang: 'en',
      subject: 'Confirm your new email address',
      preheader: 'Confirm your new SolarSim email address.',
      eyebrow: 'Email change',
      heading: 'Confirm your new email address',
      lead: 'Please confirm your new email address by clicking the button below.',
      button: 'Confirm Email Change',
      notice: 'If you did not request this change, please contact support immediately.',
      fallbackIntro: 'If the button does not work, copy and paste this link into your browser:',
      footer: 'You received this email because an email address change was requested for your SolarSim account.'
    },
    invite: {
      lang: 'en',
      subject: "You've been invited to SolarSim",
      preheader: 'You have been invited to join SolarSim.',
      eyebrow: 'Invitation',
      heading: 'You have been invited',
      lead: 'You have been invited to join SolarSim. Click the button below to accept the invitation and set up your account.',
      button: 'Accept Invitation',
      notice: 'If you were not expecting this invitation, you can safely ignore this email.',
      fallbackIntro: 'If the button does not work, copy and paste this link into your browser:',
      footer: 'You received this email because you were invited to SolarSim.'
    }
  },
  ms: {
    verification: {
      lang: 'ms',
      subject: 'Sahkan akaun SolarSim anda',
      preheader: 'Sahkan alamat e-mel anda untuk melengkapkan pendaftaran akaun SolarSim anda.',
      eyebrow: 'Pengesahan akaun',
      heading: 'Sahkan akaun SolarSim anda',
      lead: 'Selamat datang ke SolarSim. Sila sahkan alamat e-mel anda untuk melengkapkan pendaftaran akaun anda.',
      button: 'Sahkan Akaun',
      notice: 'Jika anda tidak mendaftar akaun SolarSim, anda boleh mengabaikan e-mel ini.',
      fallbackIntro: 'Jika butang tidak berfungsi, salin dan tampal pautan ini ke dalam pelayar anda:',
      footer: 'Anda menerima e-mel ini kerana anda mendaftar untuk SolarSim.'
    },
    passwordReset: {
      lang: 'ms',
      subject: 'Tetapkan semula kata laluan SolarSim anda',
      preheader: 'Tetapkan semula kata laluan SolarSim anda dengan selamat.',
      eyebrow: 'Penetapan semula kata laluan',
      heading: 'Tetapkan semula kata laluan anda',
      lead: 'Kami telah menerima permintaan untuk menetapkan semula kata laluan anda. Klik butang di bawah untuk memilih kata laluan baharu.',
      button: 'Tetapkan Semula Kata Laluan',
      notice:
        'Jika anda tidak meminta penetapan semula kata laluan, anda boleh mengabaikan e-mel ini. Kata laluan anda tidak akan berubah.',
      fallbackIntro: 'Jika butang tidak berfungsi, salin dan tampal pautan ini ke dalam pelayar anda:',
      footer: 'Anda menerima e-mel ini kerana penetapan semula kata laluan telah diminta untuk akaun SolarSim anda.'
    },
    emailChange: {
      lang: 'ms',
      subject: 'Sahkan alamat e-mel baharu anda',
      preheader: 'Sahkan alamat e-mel SolarSim baharu anda.',
      eyebrow: 'Pertukaran e-mel',
      heading: 'Sahkan alamat e-mel baharu anda',
      lead: 'Sila sahkan alamat e-mel baharu anda dengan klik butang di bawah.',
      button: 'Sahkan Pertukaran E-mel',
      notice: 'Jika anda tidak meminta pertukaran ini, sila hubungi sokongan dengan segera.',
      fallbackIntro: 'Jika butang tidak berfungsi, salin dan tampal pautan ini ke dalam pelayar anda:',
      footer: 'Anda menerima e-mel ini kerana pertukaran alamat e-mel telah diminta untuk akaun SolarSim anda.'
    },
    invite: {
      lang: 'ms',
      subject: 'Anda telah dijemput ke SolarSim',
      preheader: 'Anda telah dijemput untuk menyertai SolarSim.',
      eyebrow: 'Jemputan',
      heading: 'Anda telah dijemput',
      lead: 'Anda telah dijemput untuk menyertai SolarSim. Klik butang di bawah untuk menerima jemputan dan menyediakan akaun anda.',
      button: 'Terima Jemputan',
      notice: 'Jika anda tidak menjangkakan jemputan ini, anda boleh mengabaikan e-mel ini.',
      fallbackIntro: 'Jika butang tidak berfungsi, salin dan tampal pautan ini ke dalam pelayar anda:',
      footer: 'Anda menerima e-mel ini kerana anda dijemput ke SolarSim.'
    }
  },
  zh: {
    verification: {
      lang: 'zh',
      subject: '确认您的 SolarSim 账号',
      preheader: '请确认您的邮箱地址，以完成 SolarSim 账号设置。',
      eyebrow: '账号确认',
      heading: '确认您的 SolarSim 账号',
      lead: '欢迎使用 SolarSim。请确认您的邮箱地址，以完成账号设置。',
      button: '确认账号',
      notice: '如果您没有注册 SolarSim 账号，可以安全地忽略此邮件。',
      fallbackIntro: '如果按钮无法使用，请将此链接复制并粘贴到浏览器中：',
      footer: '您收到此邮件是因为您注册了 SolarSim。'
    },
    passwordReset: {
      lang: 'zh',
      subject: '重置您的 SolarSim 密码',
      preheader: '安全地重置您的 SolarSim 密码。',
      eyebrow: '密码重置',
      heading: '重置您的密码',
      lead: '我们收到了重置您密码的请求。点击下方按钮以设置新密码。',
      button: '重置密码',
      notice: '如果您没有请求重置密码，可以安全地忽略此邮件，您的密码将保持不变。',
      fallbackIntro: '如果按钮无法使用，请将此链接复制并粘贴到浏览器中：',
      footer: '您收到此邮件是因为您的 SolarSim 账号请求了密码重置。'
    },
    emailChange: {
      lang: 'zh',
      subject: '确认您的新邮箱地址',
      preheader: '请确认您的新 SolarSim 邮箱地址。',
      eyebrow: '邮箱变更',
      heading: '确认您的新邮箱地址',
      lead: '请点击下方按钮以确认您的新邮箱地址。',
      button: '确认邮箱变更',
      notice: '如果您没有请求此变更，请立即联系支持团队。',
      fallbackIntro: '如果按钮无法使用，请将此链接复制并粘贴到浏览器中：',
      footer: '您收到此邮件是因为您的 SolarSim 账号请求了邮箱地址变更。'
    },
    invite: {
      lang: 'zh',
      subject: '您受邀加入 SolarSim',
      preheader: '您受邀加入 SolarSim。',
      eyebrow: '邀请',
      heading: '您已收到邀请',
      lead: '您受邀加入 SolarSim。点击下方按钮接受邀请并设置您的账号。',
      button: '接受邀请',
      notice: '如果您没有预期收到此邀请，可以安全地忽略此邮件。',
      fallbackIntro: '如果按钮无法使用，请将此链接复制并粘贴到浏览器中：',
      footer: '您收到此邮件是因为您受邀加入 SolarSim。'
    }
  }
} satisfies Record<SupportedEmailLocale, Record<'verification' | 'passwordReset' | 'emailChange' | 'invite', EmailCopy>>
