import { useEffect, useRef, useState } from 'react'
import { navigate } from '../hooks/useHashRoute.js'

function IdeaDeck({ book, index }) {
  const total = book.ideas.length
  const current = book.ideas[Math.min(index, total - 1)]
  const isLast = index >= total - 1
  const touchX = useRef(null)

  const go = (next) => {
    const clamped = Math.min(total - 1, Math.max(0, next))
    navigate(`/book/${book.id}/ideas/${clamped}`, { replace: true })
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(index + 1)
      if (event.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div>
      <div className="dots">
        {book.ideas.map((idea, i) => (
          <button
            key={idea.title}
            className={i <= index ? 'is-seen' : ''}
            onClick={() => go(i)}
            aria-label={`Idea ${i + 1}: ${idea.title}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>

      <article
        className="idea"
        key={index}
        onTouchStart={(event) => {
          touchX.current = event.changedTouches[0].clientX
        }}
        onTouchEnd={(event) => {
          if (touchX.current === null) return
          const dx = event.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
          touchX.current = null
        }}
      >
        <p className="idea__label">
          IDEA {index + 1} / {total}
        </p>
        <h2>{current.title}</h2>
        <p className="idea__body">{current.body}</p>
        <div className="idea__foot">
          <button className="btn btn-secondary" onClick={() => go(index - 1)} disabled={index === 0}>
            ← Back
          </button>
          <p className="idea__next">
            {isLast ? 'End of the summary' : book.ideas[index + 1].title}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => (isLast ? navigate(`/book/${book.id}`) : go(index + 1))}
          >
            {isLast ? 'Finish' : 'Next idea →'}
          </button>
        </div>
      </article>

      <p className="reader__hint">Swipe, or use ← → on the keyboard</p>
    </div>
  )
}

function ChapterList({ book }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="chapter-list">
      {book.chapters.map((chapter, index) => (
        <section className="chapter" key={chapter.title}>
          <h3 style={{ margin: 0 }}>
            <button
              className="chapter__head"
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
            >
              <span className="chapter__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="chapter__title">{chapter.title}</span>
              <span className="chapter__caret" aria-hidden="true">
                {open === index ? '−' : '+'}
              </span>
            </button>
          </h3>
          {open === index && <p className="chapter__body">{chapter.body}</p>}
        </section>
      ))}
    </div>
  )
}

export default function Reader({ book, mode, ideaIndex }) {
  return (
    <main className="page page--reader">
      <div className="reader__bar">
        <button className="btn btn-secondary" onClick={() => navigate(`/book/${book.id}`)}>
          ✕ Close
        </button>
        <p className="reader__title">
          {book.title} · {book.author}
        </p>
        <div className="seg">
          <button
            className={mode === 'ideas' ? 'is-active' : ''}
            onClick={() => navigate(`/book/${book.id}/ideas`)}
          >
            Key ideas
          </button>
          <button
            className={mode === 'chapters' ? 'is-active' : ''}
            onClick={() => navigate(`/book/${book.id}/chapters`)}
          >
            Chapters
          </button>
        </div>
      </div>

      {mode === 'ideas' ? <IdeaDeck book={book} index={ideaIndex} /> : <ChapterList book={book} />}
    </main>
  )
}
