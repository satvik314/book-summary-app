import { useEffect } from 'react'
import { findBook } from './data/books.js'
import { navigate, useHashRoute } from './hooks/useHashRoute.js'
import TopNav from './components/TopNav.jsx'
import Library from './components/Library.jsx'
import BookPage from './components/BookPage.jsx'
import Reader from './components/Reader.jsx'

export default function App() {
  const route = useHashRoute()
  const book = route.bookId ? findBook(route.bookId) : null
  const readable = book && !book.soon

  useEffect(() => {
    // An unknown id, or a book whose summary is not written yet, goes home.
    if (route.bookId && !readable) navigate('/')
  }, [route.bookId, readable])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.name, route.bookId, route.mode])

  useEffect(() => {
    document.title = readable ? `${book.title} — Gist` : 'Gist — Book Summaries'
  }, [readable, book])

  let view = <Library />
  if (readable && route.name === 'book') view = <BookPage book={book} />
  if (readable && route.name === 'reader') {
    const ideaIndex = Math.min(Math.max(route.ideaIndex, 0), book.ideas.length - 1)
    view = <Reader book={book} mode={route.mode} ideaIndex={ideaIndex} />
  }

  return (
    <div className="app">
      <TopNav onLibrary={route.name === 'library'} />
      {view}
    </div>
  )
}
