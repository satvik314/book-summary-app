import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function Quiz({ interaction }) {
  const [picked, setPicked] = useState(null)
  const chosen = picked === null ? null : interaction.options[picked]

  return (
    <div className="ix">
      <p className="ix__prompt">{interaction.prompt}</p>
      <ul className="ix__options">
        {interaction.options.map((option, i) => {
          const isPicked = picked === i
          const state = isPicked ? (option.correct ? 'right' : 'wrong') : ''
          return (
            <li key={option.label}>
              <button
                className={`ix__option ${state}`}
                onClick={() => setPicked(isPicked ? null : i)}
                aria-pressed={isPicked}
              >
                <span className="ix__bullet" aria-hidden="true">
                  {isPicked ? (option.correct ? '✓' : '✕') : String.fromCharCode(65 + i)}
                </span>
                <span>{option.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {chosen && (
        <p className={`ix__feedback ${chosen.correct ? 'right' : 'wrong'}`}>{chosen.feedback}</p>
      )}
    </div>
  )
}

function Flip({ interaction }) {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <div className="ix">
      <p className="ix__prompt">{interaction.prompt}</p>
      <div className="ix__cards">
        {interaction.cards.map((card, i) => (
          <button
            key={card.front}
            className={`flipcard ${flipped.has(i) ? 'is-flipped' : ''}`}
            onClick={() => toggle(i)}
            aria-pressed={flipped.has(i)}
          >
            <span className="flipcard__inner">
              <span className="flipcard__face flipcard__face--front">
                <span className="flipcard__label">{card.front}</span>
                <span className="flipcard__hint">tap to turn</span>
              </span>
              <span className="flipcard__face flipcard__face--back">{card.back}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Slider({ interaction }) {
  const [value, setValue] = useState(0)
  const stop = interaction.stops[value]
  const last = interaction.stops.length - 1

  return (
    <div className="ix">
      <p className="ix__prompt">{interaction.prompt}</p>
      <div className="dial">
        <input
          type="range"
          min="0"
          max={last}
          step="1"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label={interaction.prompt}
          aria-valuetext={stop.label}
        />
        <div className="dial__ticks" aria-hidden="true">
          {interaction.stops.map((s, i) => (
            <span key={s.label} className={i === value ? 'is-active' : ''} />
          ))}
        </div>
      </div>
      <p className="dial__label">{stop.label}</p>
      <p className="dial__text">{stop.text}</p>
    </div>
  )
}

function Steps({ interaction }) {
  const [shown, setShown] = useState(1)
  const total = interaction.steps.length

  return (
    <div className="ix">
      <p className="ix__prompt">{interaction.prompt}</p>
      <ol className="steps">
        {interaction.steps.slice(0, shown).map((step, i) => (
          <li key={step.title}>
            <span className="steps__num">{i + 1}</span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="steps__controls">
        {shown < total ? (
          <button className="btn btn--ghost" onClick={() => setShown(shown + 1)}>
            Reveal next <span aria-hidden="true">↓</span>
          </button>
        ) : (
          <button className="btn btn--ghost" onClick={() => setShown(1)}>
            Start over <span aria-hidden="true">↺</span>
          </button>
        )}
        <span className="steps__count">
          {Math.min(shown, total)} / {total}
        </span>
      </div>
    </div>
  )
}

function Checklist({ interaction, storageKey }) {
  const [ticked, setTicked] = useLocalStorage(`check:${storageKey}`, [])
  const toggle = (i) =>
    setTicked((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]))
  const allDone = interaction.items.every((_, i) => ticked.includes(i))

  return (
    <div className="ix">
      <p className="ix__prompt">{interaction.prompt}</p>
      <ul className="checklist">
        {interaction.items.map((item, i) => (
          <li key={item}>
            <button
              className={`checklist__item ${ticked.includes(i) ? 'is-done' : ''}`}
              onClick={() => toggle(i)}
              aria-pressed={ticked.includes(i)}
            >
              <span className="checklist__box" aria-hidden="true">
                {ticked.includes(i) ? '✓' : ''}
              </span>
              <span>{item}</span>
            </button>
          </li>
        ))}
      </ul>
      {allDone && <p className="ix__feedback right">{interaction.done}</p>}
    </div>
  )
}

const RENDERERS = { quiz: Quiz, flip: Flip, slider: Slider, steps: Steps, checklist: Checklist }

export default function Interaction({ interaction, storageKey }) {
  const Renderer = RENDERERS[interaction.type]
  if (!Renderer) return null
  return (
    <div className="ix-shell">
      <p className="ix__eyebrow">
        <span aria-hidden="true">✦</span> Try it
      </p>
      <Renderer interaction={interaction} storageKey={storageKey} />
    </div>
  )
}
