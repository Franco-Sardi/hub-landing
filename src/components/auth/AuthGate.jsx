import { useState, useEffect } from 'react'

const STORAGE_KEY = 'hub-auth'
const CREDENTIALS = {
  user: 'hub',
  password: 'hub2026',
}

export default function AuthGate({ children }) {
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
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,63,165,0.15) 0%, transparent 70%)' }}
      />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm bg-theme-card border border-theme p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 text-center">
          <div className="font-display text-5xl tracking-[0.15em] text-theme">HUB</div>
          <div className="text-theme-muted text-[10px] font-semibold tracking-[0.25em] uppercase">
            Acceso restringido
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-theme-muted text-[10px] font-semibold tracking-[0.2em] uppercase">
              Usuario
            </label>
            <input
              type="text"
              autoComplete="username"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-theme border border-theme text-theme text-sm px-3 py-2.5 focus:outline-none focus:border-hub-electric/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-theme-muted text-[10px] font-semibold tracking-[0.2em] uppercase">
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme border border-theme text-theme text-sm px-3 py-2.5 focus:outline-none focus:border-hub-electric/60 transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400/80 text-xs text-center -my-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-hub-electric text-white text-xs font-semibold tracking-[0.2em] uppercase py-3 hover:bg-hub-azure transition-colors disabled:opacity-50"
        >
          {loading ? 'Verificando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
