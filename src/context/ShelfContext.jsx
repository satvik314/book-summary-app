import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from './AuthContext.jsx'

const ShelfContext = createContext(null)

/**
 * The signed-in reader's shelf and reading progress. Both live in Postgres and are
 * loaded once per session; writes are optimistic so paging never waits on the network.
 */
export function ShelfProvider({ children }) {
  const { user } = useAuth()
  const [shelf, setShelf] = useState([])
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!supabase || !user) {
      setShelf([])
      setProgress({})
      return undefined
    }
    let active = true
    setLoading(true)

    Promise.all([
      supabase.from('gist_shelf_items').select('book_id, created_at').order('created_at', { ascending: false }),
      supabase.from('gist_progress').select('book_id, idea_index, finished, updated_at'),
    ]).then(([shelfResult, progressResult]) => {
      if (!active) return
      if (shelfResult.error) console.warn('shelf load failed:', shelfResult.error.message)
      if (progressResult.error) console.warn('progress load failed:', progressResult.error.message)
      setShelf((shelfResult.data || []).map((row) => row.book_id))
      setProgress(Object.fromEntries((progressResult.data || []).map((row) => [row.book_id, row])))
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [user])

  const toggleShelf = useCallback(
    async (bookId) => {
      if (!supabase || !user) return
      const saved = shelf.includes(bookId)
      setShelf((prev) => (saved ? prev.filter((id) => id !== bookId) : [bookId, ...prev]))

      const { error } = saved
        ? await supabase.from('gist_shelf_items').delete().eq('user_id', user.id).eq('book_id', bookId)
        : await supabase.from('gist_shelf_items').insert({ user_id: user.id, book_id: bookId })

      if (error) {
        console.warn('shelf write failed:', error.message)
        setShelf((prev) => (saved ? [bookId, ...prev] : prev.filter((id) => id !== bookId)))
      }
    },
    [shelf, user]
  )

  const saveProgress = useCallback(
    async (bookId, ideaIndex, finished = false) => {
      if (!supabase || !user) return
      const row = { user_id: user.id, book_id: bookId, idea_index: ideaIndex, finished }
      setProgress((prev) => ({ ...prev, [bookId]: { ...prev[bookId], ...row } }))
      const { error } = await supabase.from('gist_progress').upsert(row, { onConflict: 'user_id,book_id' })
      if (error) console.warn('progress write failed:', error.message)
    },
    [user]
  )

  const value = useMemo(
    () => ({
      shelf,
      progress,
      loading,
      isSaved: (bookId) => shelf.includes(bookId),
      toggleShelf,
      saveProgress,
    }),
    [shelf, progress, loading, toggleShelf, saveProgress]
  )

  return <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>
}

export function useShelf() {
  const context = useContext(ShelfContext)
  if (!context) throw new Error('useShelf must be used inside <ShelfProvider>')
  return context
}
