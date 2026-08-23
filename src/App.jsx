import { useEffect } from 'react'
import { categories, findBook } from './data/books.js'
import { navigate, useHashRoute } from './hooks/useHashRoute.js'
import Shelf from './components/Shelf.jsx'
import Reader from './components/Reader.jsx'

export default function App() {
  const route = useHashRoute()
  const book = route.name === 'reader' ? findBook(route.bookId) : null

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (route.name === 'reader' && !book) navigate('/')
  }, [route.name, route.bookId, book])

  useEffect(() => {
    document.title = book ? `${book.title} — Bindery` : 'Bindery — Interactive Book Summaries'
  }, [book])

  return book ? <Reader key={book.id} book={book} /> : <Shelf categories={categories} />
}
