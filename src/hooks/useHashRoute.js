import { useEffect, useState } from 'react'

/**
 * Tiny hash router — no dependency, and the browser back button keeps working.
 * Routes: '#/', '#/auth', '#/shelf', '#/book/:id',
 * '#/book/:id/ideas[/:index]', '#/book/:id/chapters'.
 */
const BOOK = /^\/book\/([\w-]+)(?:\/(ideas|chapters))?(?:\/(\d+))?$/

function parse() {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === '/auth') return { name: 'auth' }
  if (hash === '/shelf') return { name: 'shelf' }
  const match = BOOK.exec(hash)
  if (!match) return { name: 'library' }
  const [, bookId, mode, index] = match
  if (!mode) return { name: 'book', bookId }
  return { name: 'reader', bookId, mode, ideaIndex: index ? Number(index) : 0 }
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/**
 * `replace` swaps the current entry instead of adding one — used when stepping
 * through ideas, so Back returns to the book rather than walking the deck.
 */
export function navigate(path, { replace = false } = {}) {
  if (!replace) {
    window.location.hash = path
    return
  }
  window.history.replaceState(null, '', `#${path}`)
  window.dispatchEvent(new Event('hashchange'))
}
