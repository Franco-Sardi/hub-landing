import { useEffect } from 'react'
import { useSite } from './SiteContext'

const KEY = 'hub-cookie-choice'

function leer() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

// Handoff §13: siempre se puede cerrar; la × equivale a "solo necesarias". Hoy el sitio no
// carga píxeles (Umami no usa cookies); cuando se sumen, tienen que leer esta elección antes.
export default function CookieBanner() {
  const { cookiesAbiertas, setCookiesAbiertas } = useSite()

  useEffect(() => {
    if (!leer()) setCookiesAbiertas(true)
  }, [setCookiesAbiertas])

  function elegir(valor) {
    try {
      localStorage.setItem(KEY, valor)
    } catch {
      /* sin storage: el banner vuelve en la próxima visita */
    }
    setCookiesAbiertas(false)
  }

  return (
    <div className={`cookie${cookiesAbiertas ? '' : ' is-hidden'}`} role="dialog" aria-label="Preferencias de cookies" aria-hidden={!cookiesAbiertas}>
      <button className="cookie-close" type="button" aria-label="Cerrar" onClick={() => elegir('necessary-only')}>×</button>
      <h3>Privacidad y cookies</h3>
      <p>Usamos cookies necesarias para el funcionamiento del sitio. Las cookies de medición y publicidad se activan únicamente con tu consentimiento.</p>
      <div className="cookie-actions">
        <button className="btn btn--blue" type="button" onClick={() => elegir('optional-accepted')}>Aceptar opcionales</button>
        <button className="btn" type="button" onClick={() => elegir('necessary-only')}>Solo necesarias</button>
      </div>
    </div>
  )
}
