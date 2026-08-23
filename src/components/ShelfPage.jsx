import { findBook } from '../data/books.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useShelf } from '../context/ShelfContext.jsx'
import { navigate } from '../hooks/useHashRoute.js'
import Cover from './Cover.jsx'

function ShelfCard({ book, caption, onOpen }) {
  return (
    <button className="shelf__item" onClick={onOpen} aria-label={`Open ${book.title}`}>
      <Cover book={book} />
      <span className="shelf__caption">
        <h3>{book.title}</h3>
        <span className="shelf__meta">{caption}</span>
      </span>
    </button>
  )
}

export default function ShelfPage() {
  const { user } = useAuth()
  const { shelf, progress, loading } = useShelf()

  const saved = shelf.map(findBook).filter(Boolean)
  const reading = Object.values(progress)
    .filter((row) => !row.finished)
    .map((row) => ({ row, book: findBook(row.book_id) }))
    .filter((entry) => entry.book)
  const finished = Object.values(progress).filter((row) => row.finished).length

  return (
    <main className="page">
      <header className="hero">
        <h1>My shelf</h1>
        <p>
          {user.email} · {saved.length} saved · {finished} finished
        </p>
      </header>

      {loading && <p className="shelf__blurb">Fetching your shelf…</p>}

      {!loading && reading.length > 0 && (
        <section className="shelf__section">
          <div className="shelf__head">
            <h2>Still reading</h2>
            <span className="shelf__count">{reading.length}</span>
          </div>
          <div className="shelf__grid">
            {reading.map(({ book, row }) => (
              <ShelfCard
                key={book.id}
                book={book}
                caption={`Idea ${Math.min(row.idea_index + 1, book.ideas.length)} of ${book.ideas.length}`}
                onOpen={() => navigate(`/book/${book.id}/ideas/${row.idea_index}`)}
              />
            ))}
          </div>
        </section>
      )}

      {!loading && (
        <section className="shelf__section">
          <div className="shelf__head">
            <h2>Saved</h2>
            <span className="shelf__count">{saved.length} books</span>
          </div>
          {saved.length === 0 ? (
            <p className="shelf__blurb">
              Nothing here yet. Open a book and press <em>Save to shelf</em> — it will be waiting on
              any device you sign in from.
            </p>
          ) : (
            <div className="shelf__grid">
              {saved.map((book) => (
                <ShelfCard
                  key={book.id}
                  book={book}
                  caption={book.author}
                  onOpen={() => navigate(`/book/${book.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  )
}
