import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { desarrollos, desarrolloPorSlug } from '../../data/desarrollos'
import mapaOscuro from '../../assets/v3/mapa-red-oscuro.webp'

// Sección "Desarrollos" portada del sitio en producción (pedido de Franco, 28-09): mapa grande a la
// izquierda, tarjeta + lista a la derecha; en celular, mapa arriba y una tarjeta por parque.
// El mapa es el de producción (mapa-dark-v2), que tiene corregidos SFDM Este/Oeste (commit 98cd8c4,
// jun-2026); el MAPA-OK de la entrega V3 los trae invertidos.

const IMG_W = 1104
const IMG_H = 975
// Posición de cada parque en % de la imagen (calibrado en producción).
const PUNTOS = {
  anchorena: [38.8, 61.5],
  'san-francisco-este': [77.7, 67.3],
  malabia: [39.8, 52.1],
  'rodriguez-pena': [58.1, 59.2],
  'san-francisco-oeste': [68.8, 62.3],
}

// El mapa llena su recuadro con object-fit: cover; esto traduce % de imagen a % del recuadro.
function useCover(ref) {
  const [f, setF] = useState(() => (l, t) => [l, t])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const calc = () => {
      const cw = el.offsetWidth
      const ch = el.offsetHeight
      if (!cw || !ch) return
      const r = IMG_W / IMG_H
      const [rw, rh] = cw / ch > r ? [cw, cw / r] : [ch * r, ch]
      const ox = (rw - cw) / 2
      const oy = (rh - ch) / 2
      setF(() => (l, t) => [((l / 100) * rw - ox) / cw * 100, ((t / 100) * rh - oy) / ch * 100])
    }
    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return f
}

function Mapa({ activo, onHover, onSelect, navegar }) {
  const ref = useRef(null)
  const aContenedor = useCover(ref)
  return (
    <div className="rp-mapa" ref={ref}>
      <img src={mapaOscuro} alt="Mapa de la red HUB en Mendoza" loading="lazy" decoding="async" draggable="false" />
      {desarrollos.map((d) => {
        const [l, t] = aContenedor(...PUNTOS[d.slug])
        const props = {
          className: `rp-punto${d.slug === activo ? ' is-active' : ''}`,
          style: { left: `${l}%`, top: `${t}%` },
          'aria-label': `${navegar ? 'Ir a' : 'Ver'} ${d.label}`,
        }
        return navegar ? (
          <Link key={d.slug} to={`/desarrollos/${d.slug}`} {...props}><span /></Link>
        ) : (
          <button key={d.slug} type="button" {...props} aria-pressed={d.slug === activo}
            onMouseEnter={() => onHover(d.slug)} onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(d.slug)} onBlur={() => onHover(null)} onClick={() => onSelect(d.slug)}><span /></button>
        )
      })}
    </div>
  )
}

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
            <div className="rp-solo-desktop"><Mapa activo={activo} onHover={(s) => (s ? previsualizar(s) : setHover(null))} onSelect={fijar} /></div>
            <div className="rp-solo-mobile"><Mapa navegar /></div>
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
