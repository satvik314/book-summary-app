import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/** Reading works without an account; the account features need these two values. */
export const isSupabaseConfigured = Boolean(url && key)

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    })
  : null

/** Supabase error messages are decent, but a few are worth rewriting for readers. */
export function readableError(error) {
  if (!error) return null
  const message = error.message || 'Something went wrong.'
  if (/invalid login credentials/i.test(message)) return 'That email and password do not match an account.'
  if (/already registered/i.test(message)) return 'There is already an account with that email — sign in instead.'
  if (/password should be at least/i.test(message)) return 'Passwords need to be at least 6 characters.'
  if (/rate limit|too many/i.test(message)) return 'Too many attempts just now. Try again in a minute.'
  if (/failed to fetch|network|load failed/i.test(message))
    return 'Could not reach the server. Check your connection and try again.'
  return message
}
