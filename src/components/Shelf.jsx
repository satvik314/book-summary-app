import { readStored } from '../hooks/useLocalStorage.js'
import { navigate } from '../hooks/useHashRoute.js'

function BookCover({ book, categoryIndex, onOpen }) {
  const spreads = book.slides.length + 1
  const progress = Math.min(readStored(`progress:${book.id}`, 0), spreads - 1)
  const started = progress > 0

  return (
    <article className={`cover cover--tone-${categoryIndex}`}>
      <button className="cover__hit" onClick={onOpen} aria-label={`Open ${book.title} by ${book.author}`}>
        <span className="cover__spine" aria-hidden="true" />
        <span className="cover__body">
          <span className="cover__rule" aria-hidden="true" />
          <h3 className="cover__title">{book.title}</h3>
          <p className="cover__author">{book.author}</p>
          <p className="cover__spineline">{book.spine}</p>
          <span className="cover__rule" aria-hidden="true" />
          <p className="cover__blurb">{book.blurb}</p>
          <span className="cover__meta">
            <span>{book.slides.length} interactive slides</span>
            <span aria-hidden="true">·</span>
            <span>{book.deepDive.length} deep dives</span>
            <span aria-hidden="true">·</span>
            <span>{book.minutes} min</span>
          </span>
          <span className="cover__cta">
            {started ? `Continue — page ${progress + 1} of ${spreads}` : 'Open the book'}
            <span aria-hidden="true"> →</span>
          </span>
        </span>
      </button>
    </article>
  )
}

export default function Shelf({ categories }) {
  return (
    <div className="shelf">
      <header className="masthead">
        <p className="masthead__mark">✦ Bindery</p>
        <h1 className="masthead__title">Big books, five slides at a time.</h1>
        <p className="masthead__sub">
          Six popular books, each distilled into five interactive slides and three questions worth
          sitting with. Turn the pages, not the pile on your nightstand.
        </p>
        <dl className="masthead__stats">
          <div>
            <dt>Categories</dt>
            <dd>{categories.length}</dd>
          </div>
          <div>
            <dt>Books</dt>
            <dd>{categories.reduce((n, c) => n + c.books.length, 0)}</dd>
          </div>
          <div>
            <dt>Slides</dt>
            <dd>{categories.reduce((n, c) => n + c.books.reduce((m, b) => m + b.slides.length, 0), 0)}</dd>
          </div>
        </dl>
      </header>

      {categories.map((category, categoryIndex) => (
        <section className="shelf__section" key={category.id}>
          <div className="shelf__heading">
            <span className={`shelf__glyph shelf__glyph--tone-${categoryIndex}`} aria-hidden="true">
              {category.glyph}
            </span>
            <div>
              <h2>{category.name}</h2>
              <p>{category.tagline}</p>
            </div>
          </div>
          <div className="shelf__row">
            {category.books.map((book) => (
              <BookCover
                key={book.id}
                book={book}
                categoryIndex={categoryIndex}
                onOpen={() => navigate(`/book/${book.id}`)}
              />
            ))}
          </div>
        </section>
      ))}

      <footer className="shelf__footer">
        <p>Summaries are original interpretations written for this app. Read the originals — they are better.</p>
      </footer>
    </div>
  )
}
