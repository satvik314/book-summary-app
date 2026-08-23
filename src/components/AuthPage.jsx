import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { readableError } from '../lib/supabase.js'
import { navigate } from '../hooks/useHashRoute.js'

export default function AuthPage() {
  const { enabled, signUp, signIn } = useAuth()
  const [mode, setMode] = useState('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)

    const { data, error: failure } =
      mode === 'signup' ? await signUp(email.trim(), password) : await signIn(email.trim(), password)

    setBusy(false)
    if (failure) {
      setError(readableError(failure))
      return
    }
    if (data?.session) {
      navigate('/shelf')
      return
    }
    // Sign-up with email confirmation switched on returns a user but no session.
    setNotice(`Check ${email.trim()} for a confirmation link, then sign in.`)
    setMode('signin')
    setPassword('')
  }

  if (!enabled) {
    return (
      <main className="page page--narrow">
        <div className="auth">
          <h1>Accounts are switched off</h1>
          <p className="auth__lede">
            Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in{' '}
            <code>.env.local</code> to enable sign-up. Reading works without them.
          </p>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/')}>
            Back to the library
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <div className="auth">
        <h1>{mode === 'signup' ? 'Make a shelf of your own.' : 'Welcome back.'}</h1>
        <p className="auth__lede">
          Reading is free. An account remembers the books you save and the idea you stopped on.
        </p>

        <div className="seg auth__seg">
          <button
            type="button"
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => {
              setMode('signup')
              setError(null)
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            className={mode === 'signin' ? 'is-active' : ''}
            onClick={() => {
              setMode('signin')
              setError(null)
            }}
          >
            Sign in
          </button>
        </div>

        <form className="auth__form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
            />
          </div>

          {error && <p className="auth__msg auth__msg--error">{error}</p>}
          {notice && <p className="auth__msg auth__msg--ok">{notice}</p>}

          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? 'One moment…' : mode === 'signup' ? 'Create my account' : 'Sign in'}
          </button>
        </form>

        <button className="btn btn-ghost auth__skip" onClick={() => navigate('/')}>
          Keep reading without an account
        </button>
      </div>
    </main>
  )
}
