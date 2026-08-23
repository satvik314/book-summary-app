import { useEffect, useState } from 'react'

/**
 * Tiny hash router so the browser back button works without pulling in a
 * routing dependency. Routes: '#/' (shelf) and '#/book/:bookId'.
 */
function parse() {
  const hash = window.location.hash.replace(/^#/, '')
  const match = hash.match(/^\/book\/([\w-]+)$/)
  return match ? { name: 'reader', bookId: match[1] } : { name: 'shelf' }
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

export function navigate(path) {
  window.location.hash = path
}
