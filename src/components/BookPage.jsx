import { navigate } from '../hooks/useHashRoute.js'
import Cover from './Cover.jsx'

export default function BookPage({ book }) {
  return (
    <main className="page">
      <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ marginBottom: 26 }}>
        ← {book.categoryName}
      </button>

      <div className="book">
        <aside className="book__aside">
          <Cover book={book} className="book__cover" />
          <button className="btn btn-primary btn-block" onClick={() => navigate(`/book/${book.id}/ideas`)}>
            Read the key ideas
          </button>
          <button
            className="btn btn-secondary btn-block"
            onClick={() => navigate(`/book/${book.id}/chapters`)}
          >
            Chapter by chapter
          </button>
        </aside>

        <div className="book__main">
          <div className="book__tags">
            <span className="tag tag-accent">{book.categoryName}</span>
            <span className="tag tag-neutral">{book.year}</span>
            <span className="tag tag-accent-2">{book.minutes} read</span>
          </div>
          <h1>{book.title}</h1>
          <p className="book__author">{book.author}</p>
          <p className="book__blurb">{book.blurb}</p>

          <h6 className="book__kicker">The key ideas</h6>
          <div className="ideas">
            {book.ideas.map((idea, index) => (
              <button
                key={idea.title}
                className="ideas__row"
                onClick={() => navigate(`/book/${book.id}/ideas/${index}`)}
              >
                <span className="ideas__num">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="ideas__title">{idea.title}</span>
                  <span className="ideas__teaser">{idea.body}</span>
                </span>
              </button>
            ))}
          </div>

          <h6 className="book__kicker">Chapters</h6>
          <div className="chapters-grid">
            {book.chapters.map((chapter, index) => (
              <button
                key={chapter.title}
                className="card"
                onClick={() => navigate(`/book/${book.id}/chapters`)}
              >
                <span className="card-kicker">Chapter {index + 1}</span>
                <span className="card-title">{chapter.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
