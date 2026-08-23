import { navigate } from '../hooks/useHashRoute.js'

export default function TopNav({ onLibrary }) {
  return (
    <nav className="nav">
      <button className="nav__brand" onClick={() => navigate('/')}>
        <span className="nav__dot" aria-hidden="true" />
        Gist
      </button>
      <button className={`nav__link ${onLibrary ? 'is-current' : ''}`} onClick={() => navigate('/')}>
        Library
      </button>
      <button className="nav__link" onClick={() => navigate('/')}>
        My shelf
      </button>
      <button className="nav__link" onClick={() => navigate('/')}>
        Search
      </button>
      <span className="nav__avatar" aria-hidden="true" />
    </nav>
  )
}
