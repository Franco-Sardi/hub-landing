import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import MapaRed from './MapaRed'
import { desarrollos } from '../../data/desarrollos'

// Piezas repetidas entre las landings de la entrega V4.

export function LandingHero({ fondo, children, stats }) {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${fondo})` }} />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy" data-reveal>{children}</div>
        {stats && (
          <div className="hero-stats">
            {stats.map(([v, l]) => <div key={l} className="hero-stat"><strong>{v}</strong><span>{l}</span></div>)}
          </div>
        )}
      </div>
    </section>
  )
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </div>
  )
}

export function RedDesarrollos() {
  return (
    <div className="dev-grid">
      {desarrollos.map((d) => (
        <Link key={d.slug} className="dev-card" to={`/desarrollos/${d.slug}`}>
          <div className="dev-photo"><img src={d.render} alt={`Render ${d.label}`} loading="lazy" decoding="async" /></div>
          <div className="dev-body">
            <img className="dev-logo" src={d.logo} alt={d.label} loading="lazy" />
            <h3>{d.titulo}</h3>
            <p>{d.nombre}</p>
            <div className="area">{d.area} de terreno</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function MapaBox({ activo }) {
  return <div className="map-box" data-reveal><MapaRed activo={activo} /></div>
}

// Bloque de cierre: en la maqueta era un formulario; la minuta del 23-09 los reemplaza
// por el panel lateral de captación.
export function CtaBlock({ eyebrow, titulo, texto, boton, lead }) {
  const { abrirLead } = useSite()
  return (
    <div className="cta" data-reveal>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{titulo}</h2>
      </div>
      <div className="cta-side">
        <p>{texto}</p>
        <button className="btn btn--orange" type="button" onClick={() => abrirLead(lead)}>{boton}</button>
      </div>
    </div>
  )
}
