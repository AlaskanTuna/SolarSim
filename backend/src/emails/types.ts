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
