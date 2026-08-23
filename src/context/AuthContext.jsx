import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(!isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return undefined
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setReady(true)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setReady(true)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const user = session?.user ?? null

  // The profile row is written from the client on first sign-in, so this project's
  // shared auth.users table needs no trigger of its own.
  useEffect(() => {
    if (!supabase || !user) return
    supabase
      .from('gist_profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || null,
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('profile upsert failed:', error.message)
      })
  }, [user])

  const value = useMemo(
    () => ({
      enabled: isSupabaseConfigured,
      ready,
      session,
      user,
      signUp: (email, password) =>
        supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: email.split('@')[0] } },
        }),
      signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
      signOut: () => supabase.auth.signOut(),
    }),
    [ready, session, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
