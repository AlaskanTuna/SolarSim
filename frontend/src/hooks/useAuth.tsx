/**
 * Auth provider + hook backed by Better Auth.
 *
 * Wraps `authClient` and exposes the current user/session, loading state,
 * and helpers for email-password and Google OAuth sign-in/out. Also handles
 * two cross-cutting concerns:
 *   - Surfaces OAuth callback errors that come back in the URL. Without this
 *     the user lands silently with no idea why sign-in failed.
 *   - Wipes the React Query cache on sign-out so a subsequent sign-in cannot
 *     briefly render the previous user's cached data.
 */

import { createContext, useCallback, useContext, useEffect, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { notify } from '@/components/ui/toastConfig'

type AuthSessionData = typeof authClient.$Infer.Session
type AuthError = { message: string }

/**
 * Value exposed by `useAuth`.
 *
 * - `user`              — current user, or `null` if signed out
 * - `session`           — current session, or `null`
 * - `loading`           — `true` while the initial session request is pending
 * - `signIn`            — email-password sign-in; returns `{ error }`
 * - `signUp`            — email-password sign-up; returns `{ error }`
 * - `signInWithGoogle`  — Google OAuth sign-in; returns `{ error }`
 * - `signOut`           — sign out and clear the React Query cache
 */
type AuthContextValue = {
  user: AuthSessionData['user'] | null
  session: AuthSessionData['session'] | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function toAuthError(error: unknown): AuthError | null {
  if (!error) return null
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return { message: error.message }
  }
  return { message: 'Authentication failed' }
}

/**
 * Wraps the React tree with auth context. Mount once near the root, above any
 * component that calls `useAuth`.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { data, isPending } = authClient.useSession()
  const user = data?.user ?? null
  const session = data?.session ?? null

  // Strip callback errors after toasting so a page refresh does not re-fire them.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : ''
    const search = window.location.search.startsWith('?') ? window.location.search.slice(1) : ''
    const params = new URLSearchParams(hash || search)
    const errorCode = params.get('error')
    const errorDescription = params.get('error_description')
    if (!errorCode && !errorDescription) return

    notify.error(errorDescription ?? errorCode ?? 'Authentication failed')

    const url = new URL(window.location.href)
    url.hash = ''
    url.searchParams.delete('error')
    url.searchParams.delete('error_code')
    url.searchParams.delete('error_description')
    window.history.replaceState({}, '', url.toString())
  }, [])

  useEffect(() => {
    if (!isPending && !session) queryClient.clear()
  }, [isPending, queryClient, session])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await authClient.signIn.email({ email, password })
    return { error: toAuthError(error) }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await authClient.signUp.email({ email, name: email, password })
    return { error: toAuthError(error) }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    // Absolute, not relative: Better Auth resolves a relative callbackURL against
    // its own baseURL (the API origin), which in dev is the backend on :3001 and
    // does not serve the SPA. Matches the origin-based redirect this replaced.
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${window.location.origin}/dashboard`
    })
    return { error: toAuthError(error) }
  }, [])

  const signOut = useCallback(async () => {
    await authClient.signOut()
    queryClient.clear()
  }, [queryClient])

  return (
    <AuthContext.Provider value={{ user, session, loading: isPending, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook that returns the current auth context. Must be called inside
 * `AuthProvider`; throws otherwise.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
