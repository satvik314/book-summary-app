# Bindery — interactive book summaries

A small Vite + React app for reading the big ideas from popular books. Three categories, two
books each, and every book is one **five-slide interactive summary** plus **three deep-dive
questions**. The whole thing is presented as a book: a two-page spread, a gutter shadow, page
edges, folios, and a leaf that turns when you move between pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

No backend, no API keys — the content ships with the app and reading state lives in
`localStorage`.

## What is in it

| Category | Books |
| --- | --- |
| Mind & Habits | *Atomic Habits* (James Clear) · *Thinking, Fast and Slow* (Daniel Kahneman) |
| Business & Innovation | *Zero to One* (Peter Thiel) · *The Lean Startup* (Eric Ries) |
| Philosophy & Meaning | *Meditations* (Marcus Aurelius) · *Man's Search for Meaning* (Viktor Frankl) |

Each book has 5 slides + 3 deep-dive questions — 30 slides and 18 questions in total.

## The five interaction types

Every slide carries exactly one interaction, and each book uses all five:

| Type | What the reader does |
| --- | --- |
| `quiz` | Picks an answer and gets tailored feedback for the option chosen |
| `flip` | Taps cards that turn over in 3D to reveal the idea behind a term |
| `slider` | Drags through labelled stops — a year of compounding, a widening frame, a distribution |
| `steps` | Reveals a sequence one beat at a time |
| `checklist` | Ticks off a practice; a closing note appears when the list is complete |

Adding a slide is a data change only — drop an object into `src/data/books.js` with one of the
five interaction shapes and it renders.

## Layout

```
src/
  data/books.js          content — categories → books → slides[5] + deepDive[3]
  components/
    Shelf.jsx            home: category rows of book covers, with resume state
    Reader.jsx           the book: spread, page-turn, keyboard nav, progress
    Interaction.jsx      the five interaction renderers
    DeepDive.jsx         accordion of questions, notes, and a perspective to reveal
  hooks/
    useHashRoute.js      tiny hash router (`#/`, `#/book/:id`) so Back works
    useLocalStorage.js   persistence that degrades gracefully when storage is blocked
  styles.css             design tokens and all styling
```

## Design

Purple on white paper. Ink and furniture come from a token set in `styles.css`
(`--plum-950` through `--mist`), with Fraunces for display type and Inter for text.

Details worth knowing about:

- The spread is a real two-column layout with a gutter gradient and stacked page edges; below
  860px it stacks and the navigation becomes a floating bar.
- Page turns animate a leaf rotating about the spine; everything animated is disabled under
  `prefers-reduced-motion`.
- Reading position, checklist ticks, and deep-dive notes persist per book in `localStorage`,
  so the shelf shows "Continue — page 3 of 6" when you come back.
- Arrow keys turn pages, Escape returns to the shelf, and form controls keep their own key
  handling so the slider still works with a keyboard.

## A note on the content

The summaries are original interpretations written for this app, not extracts from the books.
Quotations are short and attributed. Read the originals — they are better.
