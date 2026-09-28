import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import MapaOscuro from './MapaOscuro'
import { desarrollos, desarrolloPorSlug } from '../../data/desarrollos'

// Sección "Desarrollos" portada del sitio en producción (pedido de Franco, 28-09): mapa grande a la
// izquierda, tarjeta + lista a la derecha; en celular, mapa arriba y una tarjeta por parque.

export default function RedProyectos() {
  const { abrirLead } = useSite()
  const [fijado, setFijado] = useState('anchorena')
  const [hover, setHover] = useState(null)
  // Solo se piden los renders ya vistos o con hover: evita bajar los cinco al entrar.
  const [pedidos, setPedidos] = useState(() => new Set(['anchorena']))
  const pedir = (slug) => slug && setPedidos((prev) => (prev.has(slug) ? prev : new Set([...prev, slug])))
  const previsualizar = (slug) => { pedir(slug); setHover(slug) }
  const fijar = (slug) => { pedir(slug); setFijado(slug) }
  const activo = hover || fijado
  const d = desarrolloPorSlug[activo]

  return (
    <section className="section rp" id="desarrollos">
      <div className="container">
        <div className="rp-head" data-reveal>
          <div>
            <div className="eyebrow">Desarrollos</div>
            <h2>Una red, cinco perfiles de desarrollo</h2>
          </div>
          <p>Desde espacios con mayor vocación urbana hasta naves industriales y centros de almacenamiento. Cada desarrollo combina ubicación, infraestructura y un perfil propio.</p>
        </div>

        <div className="rp-grid" data-reveal>
          <div className="rp-mapa-wrap">
            <div className="rp-solo-desktop"><MapaOscuro className="mo-mapa--home" activo={activo} onHover={(s) => (s ? previsualizar(s) : setHover(null))} onSelect={fijar} /></div>
            <div className="rp-solo-mobile"><MapaOscuro className="mo-mapa--entero" navegar /></div>
          </div>

          <div className="rp-panel rp-solo-desktop">
            <article className="rp-preview" aria-live="polite">
              {desarrollos.map((x) => (
                <div key={x.slug} className={`rp-preview-img${x.slug === activo ? ' is-active' : ''}`} style={pedidos.has(x.slug) ? { backgroundImage: `url(${x.render})` } : undefined} aria-hidden="true" />
              ))}
              <div className="rp-preview-info">
                <span className="rp-badge">{d.descriptor}</span>
                <h3>{d.label}</h3>
                <div className="rp-preview-meta">
                  <span>{d.ubicacion} · {d.area}</span>
                  <span className="rp-preview-links">
                    <button type="button" onClick={() => abrirLead({ recurso: d.recurso, perfil: 'usuarios', desarrollo: d.nombre, bloque: 'home-desarrollos' })}>Ficha técnica</button>
                    <Link to={`/desarrollos/${d.slug}`}>Ver →</Link>
                  </span>
                </div>
              </div>
            </article>

            <ul className="rp-lista" onMouseLeave={() => setHover(null)}>
              {desarrollos.map((x, i) => (
                <li key={x.slug} className={`rp-item${x.slug === activo ? ' is-active' : ''}`} onMouseEnter={() => previsualizar(x.slug)}>
                  <button type="button" className="rp-item-btn" aria-pressed={x.slug === fijado} onClick={() => fijar(x.slug)} onFocus={() => previsualizar(x.slug)}>
                    <span className="rp-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rp-item-txt"><strong>{x.nombre}</strong><small>{x.ubicacion} · {x.area}</small></span>
                  </button>
                  <Link className="rp-ver" to={`/desarrollos/${x.slug}`} aria-label={`Ver ${x.label}`}>Ver →</Link>
                  <button className="rp-ver rp-pdf" type="button" aria-label={`Descargar la ficha técnica de ${x.label}`} title="Descargar ficha técnica (PDF)" onClick={() => abrirLead({ recurso: x.recurso, perfil: 'usuarios', desarrollo: x.nombre, bloque: 'home-desarrollos-pdf' })}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>
                  </button>
                </li>
              ))}
            </ul>

          </div>

          <ul className="rp-cards rp-solo-mobile">
            {desarrollos.map((x) => (
              <li key={x.slug}>
                <Link className="rp-card" to={`/desarrollos/${x.slug}`}>
                  <div className="rp-card-img">
                    <img src={x.render} alt="" loading="lazy" decoding="async" />
                    <div className="rp-card-over">
                      <span className="rp-badge">{x.descriptor}</span>
                      <div className="rp-card-row"><h3>{x.label}</h3><span>{x.area}</span></div>
                    </div>
                  </div>
                  <div className="rp-card-foot"><span>{x.ubicacion}</span><span className="rp-card-ver">Ver desarrollo →</span></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="rp-nota">Las imágenes y renders son ilustrativos. Superficies, servicios, plazos y características pueden ajustarse durante el desarrollo y deben confirmarse en la documentación y disponibilidad vigentes.</p>
      </div>
    </section>
  )
}
