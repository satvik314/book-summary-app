# Gist — book summaries

A Vite + React app for reading the books you meant to finish. Every summary comes two ways: a
short deck of **key ideas** you page through, or a **chapter-by-chapter** walk through the
argument.

## Running it

```bash
npm install
cp .env.example .env.local   # Supabase project URL + publishable key
npm run dev                  # http://localhost:5173
npm run build                # production bundle in dist/
npm run preview              # serve the built bundle
```

The content ships with the app and the two typefaces are served from `public/fonts`, so the
only network calls the app makes are to Supabase. Without `.env.local` the app still runs —
reading works exactly the same, and the account features switch themselves off.

## Accounts and data

Sign-up is email + password through Supabase Auth, in the project **inkwell**. An account is
optional: it saves a shelf and remembers the idea you stopped on.

| Table | Holds |
| --- | --- |
| `gist_profiles` | one row per account — email and display name, written from the client on first sign-in |
| `gist_shelf_items` | `(user_id, book_id)` — the books you saved |
| `gist_progress` | `(user_id, book_id)` — the idea you reached, and whether you finished |

Every table has row level security on, with policies scoped to `auth.uid()`, so a signed-in
reader can only ever see and write their own rows. The schema lives in
`supabase/migrations/` and is already applied to the project.

Two things to know about the setup:

- The tables are `gist_`-prefixed because `inkwell` also holds an unrelated table. Nothing
  touches `auth.users` — no trigger — so sign-ups for anything else sharing that project are
  unaffected.
- The values in `.env.example` are publishable by design: the key only ever reaches the
  browser and RLS is what actually protects the data. Real secrets do not belong here.

If Supabase has **Confirm email** switched on for the project, sign-up returns no session and
the form says to check your inbox; switch it off in Authentication → Providers → Email to have
sign-up log people straight in.

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
    AuthPage.jsx         sign up / sign in
    ShelfPage.jsx        still reading, and the books you saved
  context/
    AuthContext.jsx      session, sign up / in / out, profile upsert
    ShelfContext.jsx     shelf and progress, loaded once and written optimistically
  lib/supabase.js        client, configured flag, readable error messages
  hooks/useHashRoute.js  '#/', '#/auth', '#/shelf', '#/book/:id', '#/book/:id/ideas[/:n]', …
  styles.css             design tokens, component classes, screens
public/fonts/            Caprasimo and Figtree (woff2, latin + latin-ext)
supabase/migrations/     the schema above
```

## Design

Ported from the Gist design file: blush `#f8e3e1` ground, `#ebddc5` reading surface, rust
`#c67139` accent and an olive second accent, with Caprasimo for display and Figtree for text.
The tokens at the top of `styles.css` are the source of truth — the neutral, accent and
accent-2 ramps, the three radii and the three shadows all come from the design system, and
everything below is built from them.

Details worth knowing about:

- Progress is written a beat after you settle on an idea, so holding an arrow key down does
  not write a row per frame; shelf writes are optimistic and roll back if the server refuses.
- The reader's idea index lives in the URL, so an idea is linkable; stepping replaces the
  history entry, so Back leaves the deck rather than walking it backwards.
- ← and → move through ideas, and the card takes horizontal swipes on touch.
- The five-across shelf becomes three, then two; the book page collapses to a single column;
  animation is dropped under `prefers-reduced-motion`.

## A note on the content

The summaries are original interpretations written for this app, not extracts from the books.
Read the originals — they are better.
