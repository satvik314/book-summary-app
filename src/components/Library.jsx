import { bookMeta, categories } from '../data/books.js'
import { navigate } from '../hooks/useHashRoute.js'
import Cover from './Cover.jsx'

function ShelfItem({ book }) {
  return (
    <button
      className="shelf__item"
      disabled={book.soon}
      onClick={() => navigate(`/book/${book.id}`)}
      aria-label={book.soon ? `${book.title} — summary coming soon` : `Open ${book.title}`}
    >
      <Cover book={book} />
      <span className="shelf__caption">
        <h3>{book.title}</h3>
        <span className="shelf__meta">{bookMeta(book)}</span>
      </span>
    </button>
  )
}

export default function Library() {
  return (
    <main className="page">
      <header className="hero">
        <h1>
          The books you
          <br />
          meant to finish.
        </h1>
        <p>
          Three shelves. Five titles each. Every summary comes two ways — a short deck of key ideas,
          or a chapter-by-chapter walk through the argument.
        </p>
      </header>

      <div className="shelves">
        {categories.map((category) => (
          <section key={category.id}>
            <div className="shelf__head">
              <h2>{category.name}</h2>
              <span className="shelf__count">{category.books.length} books</span>
            </div>
            <p className="shelf__blurb">{category.blurb}</p>
            <div className="shelf__grid">
              {category.books.map((book) => (
                <ShelfItem key={book.id} book={book} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
