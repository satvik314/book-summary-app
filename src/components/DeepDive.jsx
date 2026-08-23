import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function Question({ item, index, bookId, isOpen, onToggle }) {
  const [note, setNote] = useLocalStorage(`note:${bookId}:${index}`, '')
  const [showPerspective, setShowPerspective] = useState(false)

  return (
    <li className={`dd ${isOpen ? 'is-open' : ''}`}>
      <h4>
        <button className="dd__head" onClick={onToggle} aria-expanded={isOpen}>
          <span className="dd__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="dd__q">{item.q}</span>
          <span className="dd__chevron" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h4>
      {isOpen && (
        <div className="dd__panel">
          <p className="dd__hint">
            <span aria-hidden="true">✎</span> {item.hint}
          </p>
          <label className="dd__label" htmlFor={`note-${bookId}-${index}`}>
            Your margin note
          </label>
          <textarea
            id={`note-${bookId}-${index}`}
            className="dd__note"
            rows={4}
            value={note}
            placeholder="Write it here — it stays on this device."
            onChange={(event) => setNote(event.target.value)}
          />
          {showPerspective ? (
            <blockquote className="dd__perspective">
              <p>{item.perspective}</p>
            </blockquote>
          ) : (
            <button className="btn btn--ghost" onClick={() => setShowPerspective(true)}>
              Show a perspective from the book
            </button>
          )}
        </div>
      )}
    </li>
  )
}

export default function DeepDive({ book }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <ul className="dd__list">
      {book.deepDive.map((item, index) => (
        <Question
          key={item.q}
          item={item}
          index={index}
          bookId={book.id}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </ul>
  )
}
