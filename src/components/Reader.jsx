import { useCallback, useEffect, useRef, useState } from 'react'
import { navigate } from '../hooks/useHashRoute.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import Interaction from './Interaction.jsx'
import DeepDive from './DeepDive.jsx'

function SlideSpread({ book, slide, index }) {
  return (
    <>
      <div className="page page--left">
        <p className="page__kicker">{slide.kicker}</p>
        <h2 className="page__title">{slide.title}</h2>
        {slide.body.map((paragraph) => (
          <p className="page__body" key={paragraph.slice(0, 40)}>
            {paragraph}
          </p>
        ))}
        {slide.pullQuote && (
          <blockquote className="pullquote">
            <p>{slide.pullQuote}</p>
            <cite>{book.author}</cite>
          </blockquote>
        )}
        <p className="page__folio">{index * 2 + 1}</p>
      </div>
      <div className="page page--right">
        <Interaction interaction={slide.interaction} storageKey={`${book.id}:${index}`} />
        <p className="page__folio page__folio--right">{index * 2 + 2}</p>
      </div>
    </>
  )
}

function DeepDiveSpread({ book }) {
  return (
    <>
      <div className="page page--left">
        <p className="page__kicker">Deep dive</p>
        <h2 className="page__title">Three questions to sit with</h2>
        <p className="page__body">
          The summary is the easy half. These are the questions that make <em>{book.title}</em>{' '}
          expensive — the ones that ask something of you rather than of the author.
        </p>
        <p className="page__body">
          Answer one properly rather than three quickly. Your notes are saved on this device, so you
          can come back and disagree with yourself later.
        </p>
        <blockquote className="pullquote">
          <p>{book.spine}</p>
          <cite>
            {book.title}, {book.author}
          </cite>
        </blockquote>
        <p className="page__folio">11</p>
      </div>
      <div className="page page--right page--scroll">
        <DeepDive book={book} />
        <p className="page__folio page__folio--right">12</p>
      </div>
    </>
  )
}

export default function Reader({ book }) {
  const total = book.slides.length + 1
  const [stored, setStored] = useLocalStorage(`progress:${book.id}`, 0)
  const [index, setIndex] = useState(() => Math.min(Math.max(stored, 0), total - 1))
  const [turn, setTurn] = useState(null)
  const timer = useRef(null)

  useEffect(() => setStored(index), [index, setStored])
  useEffect(() => () => clearTimeout(timer.current), [])

  const go = useCallback(
    (next) => {
      if (next < 0 || next > total - 1) return
      setTurn(next > index ? 'forward' : 'back')
      setIndex(next)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setTurn(null), 620)
    },
    [index, total]
  )

  useEffect(() => {
    const onKey = (event) => {
      // Let form controls (the slider, note fields) keep their own arrow keys.
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return
      if (event.key === 'ArrowRight') go(index + 1)
      if (event.key === 'ArrowLeft') go(index - 1)
      if (event.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  const isDeepDive = index === book.slides.length

  return (
    <div className="reader">
      <header className="reader__bar">
        <button className="btn btn--back" onClick={() => navigate('/')}>
          <span aria-hidden="true">←</span> Shelf
        </button>
        <div className="reader__id">
          <h1>{book.title}</h1>
          <p>
            {book.author} · {book.year > 1000 ? book.year : `c. ${book.year} AD`} · {book.categoryName}
          </p>
        </div>
        <p className="reader__count">
          {index + 1} <span aria-hidden="true">/</span> {total}
        </p>
      </header>

      <div className="book">
        <div className={`spread ${turn ? `is-turning-${turn}` : ''}`} key={index}>
          {isDeepDive ? (
            <DeepDiveSpread book={book} />
          ) : (
            <SlideSpread book={book} slide={book.slides[index]} index={index} />
          )}
          <div className="spread__gutter" aria-hidden="true" />
          {turn && <div className={`leaf leaf--${turn}`} aria-hidden="true" />}
        </div>
      </div>

      <nav className="reader__nav" aria-label="Pages">
        <button className="btn" onClick={() => go(index - 1)} disabled={index === 0}>
          <span aria-hidden="true">←</span> Previous
        </button>
        <ol className="pips">
          {Array.from({ length: total }, (_, i) => (
            <li key={i}>
              <button
                className={`pip ${i === index ? 'is-current' : ''} ${i === total - 1 ? 'pip--dive' : ''}`}
                onClick={() => go(i)}
                aria-current={i === index ? 'page' : undefined}
                aria-label={i === total - 1 ? 'Deep dive questions' : `Slide ${i + 1}`}
              />
            </li>
          ))}
        </ol>
        {index === total - 1 ? (
          <button className="btn btn--primary" onClick={() => navigate('/')}>
            Finish <span aria-hidden="true">✦</span>
          </button>
        ) : (
          <button className="btn btn--primary" onClick={() => go(index + 1)}>
            {index === book.slides.length - 1 ? 'Deep dive' : 'Next'} <span aria-hidden="true">→</span>
          </button>
        )}
      </nav>
    </div>
  )
}
