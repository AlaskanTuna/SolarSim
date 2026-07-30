import { env } from '../config/env.js'
import type { RenderedEmail } from './types.js'

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      default:
        return character
    }
  })

export const renderInviteEmail = (url: string): RenderedEmail => {
  const escapedUrl = escapeHtml(url)
  const logoUrl = `${env.EMAIL_ASSET_BASE_URL}/email-logo.png`

  return {
    subject: "You've been invited to Solar Layout Generator",
    html: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You have been invited</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      body { margin: 0; padding: 0; background: #fdf9f4; font-family: 'Work Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1c1917; }
      table { border-collapse: collapse; }.wrapper { background: #fdf9f4; padding: 40px 16px; }.card { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #efe5d9; border-radius: 18px; overflow: hidden; box-shadow: 0 18px 48px rgba(154, 52, 18, 0.1); }.header { position: relative; background: radial-gradient(circle at 18% 28%, rgba(251, 146, 60, 0.32) 0, rgba(251, 146, 60, 0) 34%), linear-gradient(135deg, #fff7ed 0%, #ffedd5 48%, #ffffff 100%); border-bottom: 1px solid #fed7aa; padding: 30px 32px; }.header::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 3px; background: linear-gradient(90deg, #ea580c 0%, #f59e0b 48%, #16a34a 100%); }.brand { display: table; text-decoration: none; }.brand-cell { display: table-cell; vertical-align: middle; }.brand-gap { width: 12px; }.brand-mark { display: inline-block; width: 42px; height: 42px; line-height: 0; }.brand-name { color: #1c1917; font-family: 'Outfit', 'Segoe UI', system-ui, sans-serif; font-size: 22px; font-weight: 800; letter-spacing: 0; }.eyebrow { margin: 0; color: #9a3412; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }.hero { position: relative; padding: 34px 32px 18px; }h1 { margin: 10px 0 0; color: #1c1917; font-family: 'Outfit', 'Segoe UI', system-ui, sans-serif; font-size: 30px; font-weight: 800; line-height: 1.18; letter-spacing: 0; }.body { padding: 0 32px 34px; color: #57534e; font-size: 15px; line-height: 1.65; }.body p { margin: 0 0 16px; }.lead { color: #44403c; font-size: 16px; }.btn { display: inline-block; background: #ea580c; color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 8px; font-weight: 800; font-size: 15px; box-shadow: 0 12px 24px rgba(234, 88, 12, 0.22); }.btn:hover { background: #c2410c; }.cta { text-align: center; margin: 28px 0; }.notice { margin-top: 26px; padding: 16px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; color: #78716c; font-size: 13px; }.fallback { margin-top: 20px; color: #78716c; font-size: 12px; line-height: 1.6; }.fallback a { color: #c2410c; word-break: break-all; }.footer { max-width: 560px; margin: 18px auto 0; text-align: center; color: #a8a29e; font-size: 12px; line-height: 1.6; }.preheader { display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent; }
    </style>
  </head>
  <body>
    <div class="preheader">You have been invited to join SolarSim.</div>
    <div class="wrapper"><div class="card"><div class="header"><div class="brand"><span class="brand-cell"><span class="brand-mark"><img src="${logoUrl}" width="42" height="42" alt="" style="display:block;border:0;" /></span></span><span class="brand-cell brand-gap"></span><span class="brand-cell brand-name">SolarSim</span></div></div><div class="hero"><p class="eyebrow">Invitation</p><h1>You have been invited</h1></div><div class="body"><p class="lead">You have been invited to join Solar Layout Generator. Click the button below to accept the invitation and set up your account.</p><div class="cta"><a class="btn" href="${escapedUrl}">Accept Invitation</a></div><div class="notice">If you were not expecting this invitation, you can safely ignore this email.</div><p class="fallback">If the button does not work, copy and paste this link into your browser:<br /><a href="${escapedUrl}">${escapedUrl}</a></p></div></div><div class="footer">You received this email because you were invited to SolarSim.</div></div>
  </body>
</html>`
  }
}
