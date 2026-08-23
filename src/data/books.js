/**
 * Content model
 * -------------
 * categories[] -> books[]
 *
 * A book that has been written up carries a blurb, three key ideas and four
 * chapters. Books still to be written carry metadata only and are marked
 * `soon: true` — the shelf renders them, but they cannot be opened.
 */

/** Cover palette, cycled by a book's position on its shelf: [background, ink]. */
export const COVERS = [
  ['#c67139', '#f5ead8'],
  ['#3d472b', '#f0fae1'],
  ['#ffe1d0', '#643312'],
  ['#474238', '#f9f4ed'],
  ['#8fa073', '#272e1b'],
]

export const categories = [
  {
    id: 'business',
    name: 'Business',
    blurb:
      'Five arguments about how companies actually get built, kept honest by the people who did it.',
    books: [
      {
        id: 'zero-to-one',
        title: 'Zero to One',
        author: 'Peter Thiel',
        year: '2014',
        minutes: '9 min',
        blurb:
          'Thiel argues that competition is for losers: real value comes from building something so new that nobody else is doing it, and then protecting that monopoly long enough to compound.',
        ideas: [
          {
            title: 'Progress is vertical, not horizontal',
            body: 'Copying what works takes the world from 1 to n. Building something that did not exist takes it from 0 to 1, and only the second kind creates new value.',
          },
          {
            title: 'Competition destroys profit',
            body: 'Perfectly competitive markets grind margins to nothing. Every durable business is a monopoly in some small market it defined and then widened.',
          },
          {
            title: 'Start absurdly small',
            body: 'Own a tiny market completely before expanding. A dominant share of a niche funds the move outward; a sliver of a huge market funds nothing.',
          },
        ],
        chapters: [
          {
            title: 'The challenge of the future',
            body: 'Thiel opens with his contrarian interview question — what important truth do very few people agree with you on — and uses it to separate imitation from invention.',
          },
          {
            title: 'Party like it’s 1999',
            body: 'The dot-com crash taught founders four lessons, and Thiel argues all four were the wrong ones.',
          },
          {
            title: 'All happy companies are different',
            body: 'The case that monopoly, not competition, is the condition of a healthy business, and why monopolists lie about it.',
          },
          {
            title: 'Follow the money',
            body: 'Power laws govern venture returns and careers alike: a small number of bets account for nearly everything.',
          },
        ],
      },
      {
        id: 'the-lean-startup',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        year: '2011',
        minutes: '11 min',
        blurb:
          'Ries reframes a startup as an experiment machine under conditions of extreme uncertainty, where the unit of progress is validated learning rather than shipped features.',
        ideas: [
          {
            title: 'Build, measure, learn',
            body: 'Treat every feature as a hypothesis. The loop is not a development process but a way of shortening the time between a guess and evidence.',
          },
          {
            title: 'The minimum viable product',
            body: 'The smallest thing that produces real learning, not the smallest thing you would be proud to launch. Its job is information, not polish.',
          },
          {
            title: 'Pivot or persevere',
            body: 'Schedule the decision. Teams drift because nobody names the moment when the current strategy has to justify itself against the numbers.',
          },
        ],
        chapters: [
          {
            title: 'Start',
            body: 'Entrepreneurship is management, and startups exist inside large companies as much as garages.',
          },
          {
            title: 'Define and learn',
            body: 'Validated learning replaces milestones. Ries recounts IMVU shipping an embarrassing first product and what it taught.',
          },
          {
            title: 'Experiment and steer',
            body: 'How to design an experiment that can fail, and the vanity metrics that quietly prevent failure from registering.',
          },
          {
            title: 'Accelerate',
            body: 'Small batches, the andon cord, and growth engines — the mechanics of speeding the loop up without losing the signal.',
          },
        ],
      },
      { id: 'good-to-great', title: 'Good to Great', author: 'Jim Collins', year: '2001', minutes: '10 min', soon: true },
      { id: 'hard-thing', title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', year: '2014', minutes: '10 min', soon: true },
      { id: 'innovators-dilemma', title: 'The Innovator’s Dilemma', author: 'Clayton Christensen', year: '1997', minutes: '11 min', soon: true },
    ],
  },
  {
    id: 'psychology',
    name: 'Psychology',
    blurb: 'Five books on why the mind reaches the conclusions it does, and what it costs to notice.',
    books: [
      { id: 'thinking-fast-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011', minutes: '14 min', soon: true },
      { id: 'influence', title: 'Influence', author: 'Robert Cialdini', year: '1984', minutes: '11 min', soon: true },
      { id: 'mindset', title: 'Mindset', author: 'Carol Dweck', year: '2006', minutes: '9 min', soon: true },
      { id: 'flow', title: 'Flow', author: 'Mihaly Csikszentmihalyi', year: '1990', minutes: '10 min', soon: true },
      { id: 'predictably-irrational', title: 'Predictably Irrational', author: 'Dan Ariely', year: '2008', minutes: '9 min', soon: true },
    ],
  },
  {
    id: 'biography',
    name: 'Biography',
    blurb: 'Five lives told at length, chosen because the shape of the life is the argument.',
    books: [
      { id: 'shoe-dog', title: 'Shoe Dog', author: 'Phil Knight', year: '2016', minutes: '11 min', soon: true },
      { id: 'steve-jobs', title: 'Steve Jobs', author: 'Walter Isaacson', year: '2011', minutes: '14 min', soon: true },
      { id: 'long-walk-to-freedom', title: 'Long Walk to Freedom', author: 'Nelson Mandela', year: '1994', minutes: '15 min', soon: true },
      { id: 'diary-young-girl', title: 'The Diary of a Young Girl', author: 'Anne Frank', year: '1947', minutes: '10 min', soon: true },
      { id: 'einstein', title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', year: '2007', minutes: '14 min', soon: true },
    ],
  },
]

/* Decorate each book in place with its shelf position, cover colours and shelf
   name, so the shelf and the book page read the same object. */
categories.forEach((category) => {
  category.books.forEach((book, index) => {
    const [cover, coverInk] = COVERS[index % COVERS.length]
    Object.assign(book, {
      index,
      num: String(index + 1).padStart(2, '0'),
      cover,
      coverInk,
      categoryId: category.id,
      categoryName: category.name,
    })
  })
})

export const allBooks = categories.flatMap((category) => category.books)

export function findBook(bookId) {
  return allBooks.find((book) => book.id === bookId) || null
}

/** Shelf caption: counts for a written summary, the author for one still to come. */
export function bookMeta(book) {
  return book.soon
    ? book.author
    : `${book.ideas.length} ideas · ${book.chapters.length} chapters · ${book.minutes}`
}
