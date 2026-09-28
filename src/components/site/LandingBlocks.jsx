import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSite } from './SiteContext'
import MapaOscuro from './MapaOscuro'
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

// Mismo mapa oscuro que la home; los puntos llevan a la ficha de cada desarrollo y el activo
// (en la página de un desarrollo) queda marcado.
export function MapaBox({ activo }) {
  return <div className="map-box" data-reveal><MapaOscuro className="mo-mapa--landing" activo={activo} navegar /></div>
}

// La red para inversores: mapa + totales + lista de los cinco desarrollos, conectados (hover en uno
// ilumina el otro); clic en el mapa o en la lista lleva a la página del desarrollo.
export function RedConLista() {
  const [hover, setHover] = useState(null)
  const navigate = useNavigate()
  return (
    <div className="red-inv" data-reveal>
      <MapaOscuro className="mo-mapa--inv" activo={hover} onHover={setHover} onSelect={(slug) => navigate(`/desarrollos/${slug}`)} />
      <aside className="red-inv-panel">
        <dl className="red-inv-totales">
          <div><dt>Desarrollos</dt><dd>5</dd></div>
          <div><dt>Terreno</dt><dd>335.000 <small>m²</small></dd></div>
          <div><dt>Naves proyectadas</dt><dd>178.000 <small>m²</small></dd></div>
        </dl>
        <ul className="red-inv-lista" onMouseLeave={() => setHover(null)}>
          {desarrollos.map((d, i) => (
            <li key={d.slug}>
              <Link to={`/desarrollos/${d.slug}`} className={d.slug === hover ? 'is-active' : ''} onMouseEnter={() => setHover(d.slug)} onFocus={() => setHover(d.slug)} onBlur={() => setHover(null)}>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="txt"><strong>{d.nombre}</strong><small>{d.titulo} · {d.area}</small></span>
                <span className="flecha" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
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
