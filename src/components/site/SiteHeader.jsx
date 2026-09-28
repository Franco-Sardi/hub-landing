import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { MENU } from './menu'
import logoBlanco from '../../assets/v3/HUB-blanco-positivo.svg'

export default function SiteHeader() {
  const { abrirLead } = useSite()
  const [solido, setSolido] = useState(false)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    const update = () => setSolido(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const cerrar = () => setAbierto(false)

  // Con el menú de celular abierto (pantalla completa) no se scrollea lo de atrás.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', abierto)
    return () => document.body.classList.remove('no-scroll')
  }, [abierto])
  const cls = ['header', solido && 'is-solid', abierto && 'mobile-open'].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <div className="container nav">
        <Link className="brand" to="/" onClick={cerrar}>
          <img src={logoBlanco} alt="HUB" width="112" height="63" />
          <span>Activos Reales</span>
        </Link>
        <nav className="menu" aria-label="Navegación principal">
          {MENU.map((m) => (
            <Link key={m.to} to={m.to} onClick={cerrar}>{m.label}</Link>
          ))}
          <button type="button" onClick={() => { cerrar(); abrirLead({ recurso: 'brochure-general', perfil: 'general', bloque: 'header' }) }}>
            Contacto
          </button>
        </nav>
        <button className="menu-toggle" type="button" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}>
          {abierto ? 'Cerrar' : 'Menú'}
        </button>
      </div>
    </header>
  )
}
