import { useState, useEffect } from 'react'
import { useTheme } from '../../context/theme'

const STORAGE_KEY = 'hub-auth'
const CREDENTIALS = {
  user: 'hub',
  password: 'hub2026',
}

export default function AuthGate({ children }) {
  const { dark } = useTheme()
  const [authed, setAuthed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'ok'
    } catch {
      return false
    }
  })
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authed) document.body.style.overflow = ''
    else document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [authed])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 350))
    if (user.trim() === CREDENTIALS.user && password === CREDENTIALS.password) {
      try { localStorage.setItem(STORAGE_KEY, 'ok') } catch {}
      setAuthed(true)
    } else {
      setError('Credenciales incorrectas')
    }
    setLoading(false)
  }

  if (authed) return children

  return (
    <div className="fixed inset-0 z-[9999] bg-theme font-body flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(2,42,58,0.15) 0%, transparent 70%)' }}
      />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm bg-theme-card border border-theme p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3 items-center">
          <img
            src="/hub-logo-oficial.png"
            alt="HUB"
            style={{
              height: '3.5rem',
              width: 'auto',
              filter: dark ? 'brightness(0) invert(79%)' : 'none',
            }}
          />
          <div className="text-theme-muted text-[10px] font-semibold tracking-[0.25em] uppercase font-condensed">
            Acceso restringido
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-theme-muted text-[10px] font-semibold tracking-[0.2em] uppercase font-condensed">
              Usuario
            </label>
            <input
              type="text"
              autoComplete="username"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-theme border border-theme text-theme text-sm px-3 py-2.5 focus:outline-none focus:border-theme-accent transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-theme-muted text-[10px] font-semibold tracking-[0.2em] uppercase font-condensed">
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme border border-theme text-theme text-sm px-3 py-2.5 focus:outline-none focus:border-theme-accent transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400/80 text-xs text-center -my-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-xs font-semibold tracking-[0.2em] uppercase py-3 transition-opacity hover:opacity-90 disabled:opacity-50 font-condensed"
          style={{ backgroundColor: 'var(--text-accent)', color: 'var(--bg-primary)' }}
        >
          {loading ? 'Verificando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
