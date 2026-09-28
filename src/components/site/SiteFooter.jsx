import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { MENU } from './menu'
import { enviarLead } from '../../lib/leads'
import logoBlanco from '../../assets/v3/HUB-blanco-positivo.svg'

const INTERESES = [
  ['inversor', 'Inversión'],
  ['usuarios', 'Espacios para operar'],
  ['general', 'Novedades generales'],
]

export default function SiteFooter() {
  const { abrirLead, setCookiesAbiertas } = useSite()
  const [estado, setEstado] = useState('form') // form | enviando | ok | error

  async function suscribir(e) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setEstado('enviando')
    try {
      await enviarLead({ email: f.get('email'), recurso: 'newsletter', perfil: f.get('interes'), bloque: 'footer' })
      setEstado('ok')
      form.reset()
    } catch {
      setEstado('error')
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="newsletter">
          <div className="newsletter-grid">
            <div>
              <h2>Recibí novedades de HUB.</h2>
            </div>
            <div>
              <p>Elegí qué información querés recibir y dejá tu correo. Te enviamos novedades vinculadas a tu interés.</p>
              <form className="newsletter-form" onSubmit={suscribir}>
                <input name="email" type="email" required placeholder="Tu correo" aria-label="Tu correo" autoComplete="email" />
                <select name="interes" required aria-label="Me interesa" defaultValue="">
                  <option value="" disabled>Me interesa…</option>
                  {INTERESES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <button className="btn btn--orange" type="submit" disabled={estado === 'enviando'}>
                  {estado === 'ok' ? 'Listo. Revisá tu correo.' : 'Suscribirme'}
                </button>
                <label className="consent">
                  <input type="checkbox" required />
                  <span>Acepto el tratamiento de mis datos para recibir novedades de HUB. <Link to="/privacidad">Política de Privacidad</Link>.</span>
                </label>
                {estado === 'error' && <p className="form-status">No pudimos registrarte. Probá de nuevo en un momento.</p>}
              </form>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <h3>Navegación</h3>
            {MENU.map((m) => <Link key={m.to} to={m.to}>{m.label}</Link>)}
            <button type="button" onClick={() => abrirLead({ recurso: 'brochure-general', perfil: 'general', bloque: 'footer' })}>Contacto</button>
          </div>
          <div>
            <h3>Contacto</h3>
            <p>Liniers 1045 · Chacras de Coria</p>
            <p>Luján de Cuyo · Mendoza</p>
            <a href="tel:+542613419485">261 341-9485</a>
            <a href="mailto:contacto@hubmza.com.ar">contacto@hubmza.com.ar</a>
          </div>
          <div>
            <h3>Legal</h3>
            <Link to="/privacidad">Política de Privacidad</Link>
            <Link to="/terminos">Términos y Condiciones</Link>
            <button type="button" onClick={() => setCookiesAbiertas(true)}>Preferencias de cookies</button>
          </div>
        </div>

        <div className="footer-bottom">
          <img src={logoBlanco} alt="HUB" width="120" height="68" />
          <span>© 2026 HUB · Activos Reales · Mendoza, Argentina</span>
        </div>
      </div>
    </footer>
  )
}
