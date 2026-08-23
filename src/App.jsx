import { useEffect } from 'react'
import { findBook } from './data/books.js'
import { navigate, useHashRoute } from './hooks/useHashRoute.js'
import { useAuth } from './context/AuthContext.jsx'
import TopNav from './components/TopNav.jsx'
import Library from './components/Library.jsx'
import BookPage from './components/BookPage.jsx'
import Reader from './components/Reader.jsx'
import AuthPage from './components/AuthPage.jsx'
import ShelfPage from './components/ShelfPage.jsx'

export default function App() {
  const route = useHashRoute()
  const { ready, user } = useAuth()
  const book = route.bookId ? findBook(route.bookId) : null
  const readable = book && !book.soon

  useEffect(() => {
    // An unknown id, or a book whose summary is not written yet, goes home.
    if (route.bookId && !readable) navigate('/')
  }, [route.bookId, readable])

  useEffect(() => {
    // The shelf is nobody's until you sign in.
    if (route.name === 'shelf' && ready && !user) navigate('/auth')
  }, [route.name, ready, user])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.name, route.bookId, route.mode])

  useEffect(() => {
    document.title = readable ? `${book.title} — Gist` : 'Gist — Book Summaries'
  }, [readable, book])

  let view = <Library />
  if (route.name === 'auth') view = <AuthPage />
  if (route.name === 'shelf') view = ready && user ? <ShelfPage /> : <main className="page" />
  if (readable && route.name === 'book') view = <BookPage book={book} />
  if (readable && route.name === 'reader') {
    const ideaIndex = Math.min(Math.max(route.ideaIndex, 0), book.ideas.length - 1)
    view = <Reader book={book} mode={route.mode} ideaIndex={ideaIndex} />
  }

  return (
    <div className="app">
      <TopNav current={route.name} />
      {view}
    </div>
  )
}
