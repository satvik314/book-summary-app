import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { navigate } from '../hooks/useHashRoute.js'

function AccountMenu() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onClick = (event) => {
      if (!wrap.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div className="account" ref={wrap}>
      <button
        className="nav__avatar"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Account"
      >
        {user.email[0].toUpperCase()}
      </button>
      {open && (
        <div className="account__menu">
          <p className="account__email">{user.email}</p>
          <button
            className="btn btn-secondary btn-block"
            onClick={() => {
              setOpen(false)
              navigate('/shelf')
            }}
          >
            My shelf
          </button>
          <button
            className="btn btn-secondary btn-block"
            onClick={async () => {
              setOpen(false)
              await signOut()
              navigate('/')
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default function TopNav({ current }) {
  const { enabled, user } = useAuth()

  return (
    <nav className="nav">
      <button className="nav__brand" onClick={() => navigate('/')}>
        <span className="nav__dot" aria-hidden="true" />
        Gist
      </button>
      <button
        className={`nav__link ${current === 'library' ? 'is-current' : ''}`}
        onClick={() => navigate('/')}
      >
        Library
      </button>
      <button
        className={`nav__link ${current === 'shelf' ? 'is-current' : ''}`}
        onClick={() => navigate(user ? '/shelf' : '/auth')}
      >
        My shelf
      </button>
      {enabled && !user && (
        <button className="btn btn-secondary nav__cta" onClick={() => navigate('/auth')}>
          Sign up
        </button>
      )}
      {user ? (
        <AccountMenu />
      ) : (
        !enabled && <span className="nav__avatar nav__avatar--empty" aria-hidden="true" />
      )}
    </nav>
  )
}
