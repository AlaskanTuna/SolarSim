/**
 * Transactional email dispatch.
 *
 * Placeholder implementation: issue #7 replaces these bodies with direct Resend
 * calls and the branded templates ported out of `supabase/templates/`. Until
 * then the links are logged so local sign-up flows remain completable.
 */

/**
 * Sends an address-verification link to a newly registered user.
 *
 * @param email - Recipient address
 * @param url - Better Auth verification link
 */
export async function sendVerificationEmail(email: string, url: string): Promise<void> {
  console.info(`[Email] verification for ${email}: ${url}`)
}

/**
 * Sends a password-reset link.
 *
 * @param email - Recipient address
 * @param url - Better Auth password-reset link
 */
export async function sendPasswordResetEmail(email: string, url: string): Promise<void> {
  console.info(`[Email] password reset for ${email}: ${url}`)
}
