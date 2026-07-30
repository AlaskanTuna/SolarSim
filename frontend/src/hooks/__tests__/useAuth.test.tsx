import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { notifyErrorMock, signInEmailMock, signInSocialMock, signOutMock, signUpEmailMock, useSessionMock } = vi.hoisted(
  () => ({
    notifyErrorMock: vi.fn(),
    signInEmailMock: vi.fn(),
    signInSocialMock: vi.fn(),
    signOutMock: vi.fn(),
    signUpEmailMock: vi.fn(),
    useSessionMock: vi.fn()
  })
)

vi.mock('@/components/ui/toastConfig', () => ({
  notify: { error: notifyErrorMock }
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: (...args: unknown[]) => signInEmailMock(...args),
      social: (...args: unknown[]) => signInSocialMock(...args)
    },
    signOut: (...args: unknown[]) => signOutMock(...args),
    signUp: {
      email: (...args: unknown[]) => signUpEmailMock(...args)
    },
    useSession: (...args: unknown[]) => useSessionMock(...args)
  }
}))

import { AuthProvider, useAuth } from '../useAuth'

type SessionState = {
  data: {
    user: { id: string; email: string }
    session: { id: string; userId: string }
  } | null
  isPending: boolean
}

let sessionState: SessionState

function AuthProbe() {
  const { loading, signIn, signInWithGoogle, signOut, signUp, user } = useAuth()
  const [result, setResult] = useState('')

  return (
    <>
      <span data-testid="loading">{loading ? 'loading' : 'ready'}</span>
      <span data-testid="user">{user?.email ?? 'none'}</span>
      <span data-testid="result">{result}</span>
      <button
        onClick={() =>
          void signIn('member@example.com', 'password').then(({ error }) => setResult(error?.message ?? 'ok'))
        }
      >
        Sign in
      </button>
      <button
        onClick={() =>
          void signUp('member@example.com', 'password').then(({ error }) => setResult(error?.message ?? 'ok'))
        }
      >
        Sign up
      </button>
      <button onClick={() => void signInWithGoogle().then(({ error }) => setResult(error?.message ?? 'ok'))}>
        Google
      </button>
      <button onClick={() => void signOut()}>Sign out</button>
    </>
  )
}

function renderAuth(queryClient = new QueryClient()) {
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </QueryClientProvider>
    )
  }
}

describe('AuthProvider', () => {
  beforeEach(() => {
    notifyErrorMock.mockReset()
    signInEmailMock.mockReset()
    signInSocialMock.mockReset()
    signOutMock.mockReset()
    signUpEmailMock.mockReset()
    sessionState = {
      data: {
        user: { id: 'user-a', email: 'a@example.com' },
        session: { id: 'session-a', userId: 'user-a' }
      },
      isPending: false
    }
    useSessionMock.mockImplementation(() => sessionState)
    signInEmailMock.mockResolvedValue({ error: null })
    signInSocialMock.mockResolvedValue({ error: null })
    signOutMock.mockResolvedValue({ error: null })
    signUpEmailMock.mockResolvedValue({ error: null })
    window.history.replaceState({}, '', '/')
  })

  it('keeps routes in the loading state until the initial session resolves', () => {
    sessionState = { data: null, isPending: true }
    renderAuth()

    expect(screen.getByTestId('loading').textContent).toBe('loading')
  })

  it('clears cached projects when an authenticated session is lost', async () => {
    const { queryClient, rerender } = renderAuth()
    queryClient.setQueryData(['projects'], [{ id: 'project-a' }])

    sessionState = { data: null, isPending: false }
    rerender(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </QueryClientProvider>
    )

    await waitFor(() => expect(queryClient.getQueryData(['projects'])).toBeUndefined())
  })

  it('clears cached projects when the user signs out', async () => {
    const { queryClient } = renderAuth()
    queryClient.setQueryData(['projects'], [{ id: 'project-a' }])

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))
    })

    expect(signOutMock).toHaveBeenCalledOnce()
    expect(queryClient.getQueryData(['projects'])).toBeUndefined()
  })

  it('maps email and Google actions to the Better Auth client', async () => {
    renderAuth()

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
      fireEvent.click(screen.getByRole('button', { name: 'Sign up' }))
      fireEvent.click(screen.getByRole('button', { name: 'Google' }))
    })

    expect(signInEmailMock).toHaveBeenCalledWith({ email: 'member@example.com', password: 'password' })
    expect(signUpEmailMock).toHaveBeenCalledWith({
      email: 'member@example.com',
      name: 'member@example.com',
      password: 'password'
    })
    expect(signInSocialMock).toHaveBeenCalledWith({ provider: 'google', callbackURL: '/dashboard' })
  })

  it('surfaces and removes OAuth callback errors', async () => {
    window.history.replaceState({}, '', '/sign-in?error=access_denied&error_description=Provider%20denied')
    renderAuth()

    await waitFor(() => expect(notifyErrorMock).toHaveBeenCalledWith('Provider denied'))
    expect(window.location.search).toBe('')
  })
})
