# Gist — book summaries

A Vite + React app for reading the books you meant to finish. Every summary comes two ways: a
short deck of **key ideas** you page through, or a **chapter-by-chapter** walk through the
argument.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

No backend and no third-party requests — the content ships with the app and the two typefaces
are served from `public/fonts`.

## What is in it

Three shelves of five titles each. Two summaries are written:

| Shelf | Written up | Metadata only |
| --- | --- | --- |
| Business | *Zero to One*, *The Lean Startup* | Good to Great · The Hard Thing About Hard Things · The Innovator's Dilemma |
| Psychology | — | Thinking, Fast and Slow · Influence · Mindset · Flow · Predictably Irrational |
| Biography | — | Shoe Dog · Steve Jobs · Long Walk to Freedom · The Diary of a Young Girl · Einstein |

Books without a summary still appear on the shelf — that is where the design puts them — but
they carry a `Soon` mark, show their author instead of a chapter count, and cannot be opened.
Writing one is a data change: give the book a `blurb`, three `ideas` and four `chapters` in
`src/data/books.js` and drop the `soon` flag.

## Screens

- **Library** — hero, then a shelf per category: five covers on a rotating five-colour palette,
  each with its number, title, author and a caption line.
- **Book** — sticky cover and the two entry points, beside the blurb, the three key ideas with
  their teasers, and the four chapters as cards. Any idea or chapter opens the reader at that
  spot.
- **Reader** — one surface for both modes, switched by the segmented control. *Key ideas* is a
  deck: a progress bar per idea, one big card, and the next idea's title shown before you get
  to it. *Chapters* is an accordion, first chapter open.

## Layout

```
src/
  data/books.js          content — categories → books → ideas[3] + chapters[4]
  components/
    TopNav.jsx           brand, links, avatar
    Library.jsx          hero and the three shelves
    Cover.jsx            the cover block, shared by shelf and book page
    BookPage.jsx         cover, entry points, ideas list, chapter cards
    Reader.jsx           idea deck and chapter accordion
  hooks/useHashRoute.js  '#/', '#/book/:id', '#/book/:id/ideas[/:n]', '#/book/:id/chapters'
  styles.css             design tokens, component classes, screens
public/fonts/            Caprasimo and Figtree (woff2, latin + latin-ext)
```

## Design

Ported from the Gist design file: blush `#f8e3e1` ground, `#ebddc5` reading surface, rust
`#c67139` accent and an olive second accent, with Caprasimo for display and Figtree for text.
The tokens at the top of `styles.css` are the source of truth — the neutral, accent and
accent-2 ramps, the three radii and the three shadows all come from the design system, and
everything below is built from them.

Details worth knowing about:

- The reader's idea index lives in the URL, so an idea is linkable; stepping replaces the
  history entry, so Back leaves the deck rather than walking it backwards.
- ← and → move through ideas, and the card takes horizontal swipes on touch.
- The five-across shelf becomes three, then two; the book page collapses to a single column;
  animation is dropped under `prefers-reduced-motion`.

## A note on the content

The summaries are original interpretations written for this app, not extracts from the books.
Read the originals — they are better.
