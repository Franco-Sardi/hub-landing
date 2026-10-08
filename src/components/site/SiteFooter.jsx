import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { MENU, irAContacto } from './menu'
import { enviarLead } from '../../lib/leads'
import logoBlanco from '../../assets/v3/HUB-blanco-positivo.svg'

const INTERESES = [
  ['inversor', 'Inversión'],
  ['usuarios', 'Espacios para operar'],
  ['general', 'Novedades generales'],
]

export default function SiteFooter() {
  const { setCookiesAbiertas } = useSite()
  const [estado, setEstado] = useState('form') // form | enviando | ok | error

  async function suscribir(e) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setEstado('enviando')
    try {
      await enviarLead({ email: f.get('email'), recurso: 'newsletter', perfil: f.get('interes'), bloque: 'footer', _gotcha: f.get('_gotcha') })
      setEstado('ok')
      form.reset()
    } catch {
      setEstado('error')
    }
  }

  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <div className="newsletter">
          <div className="nl-copy">
            <div className="eyebrow">Novedades</div>
            <h2>Recibí novedades de HUB.</h2>
            <p>Elegí qué información querés recibir y dejá tu correo. Te enviamos novedades vinculadas a tu interés.</p>
          </div>

          {estado === 'ok' ? (
            <div className="nl-ok" role="status">
              <strong>Listo, ya estás suscripto.</strong>
              <span>Te vamos a escribir solo con novedades vinculadas a lo que elegiste.</span>
            </div>
          ) : (
            <form className="nl-form" onSubmit={suscribir}>
              <fieldset className="nl-intereses">
                <legend>Me interesa</legend>
                {INTERESES.map(([v, l], i) => (
                  <label key={v} className="nl-chip">
                    <input type="radio" name="interes" value={v} required={i === 0} />
                    <span>{l}</span>
                  </label>
                ))}
              </fieldset>
              <div className="nl-campo">
                <input name="email" type="email" required placeholder="nombre@empresa.com" aria-label="Tu correo" autoComplete="email" />
                <button className="btn btn--orange" type="submit" disabled={estado === 'enviando'}>
                  {estado === 'enviando' ? 'Enviando…' : 'Suscribirme'}
                </button>
              </div>
              <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <label className="nl-consent">
                <input type="checkbox" required />
                <span>Acepto el tratamiento de mis datos para recibir novedades de HUB. <Link to="/privacidad">Política de Privacidad</Link>.</span>
              </label>
              {estado === 'error' && <p className="form-status">No pudimos registrarte. Probá de nuevo en un momento.</p>}
            </form>
          )}
        </div>

        <div className="footer-grid">
          <div>
            <h3>Navegación</h3>
            {MENU.map((m) => <Link key={m.to} to={m.to}>{m.label}</Link>)}
            <button type="button" onClick={irAContacto}>Contacto</button>
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
