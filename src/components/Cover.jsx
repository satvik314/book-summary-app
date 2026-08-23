/** The book cover, shared by the shelf and the book page. */
export default function Cover({ book, className = '' }) {
  return (
    <div
      className={`cover ${className}`}
      style={{ background: book.cover, color: book.coverInk }}
    >
      <div className="cover__top">
        <span className="cover__num">{book.num}</span>
        {book.soon && <span className="cover__soon">Soon</span>}
      </div>
      <div className="cover__mid">
        <div className="cover__title">{book.title}</div>
        <div className="cover__author">{book.author}</div>
      </div>
    </div>
  )
}
