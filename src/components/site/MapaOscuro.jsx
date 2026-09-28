import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { desarrollos } from '../../data/desarrollos'
import mapaOscuro from '../../assets/v3/mapa-red-oscuro.webp'

// Mapa de la red del sitio en producción (mapa-dark-v2): tiene corregidos SFDM Este/Oeste
// (commit 98cd8c4, jun-2026); el MAPA-OK de la entrega V3 los trae invertidos. Se usa en la home
// y en las landings, así todo el sitio muestra el mismo mapa.

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

// Con `onSelect` los puntos cambian el desarrollo activo (y `onHover` recibe slug o null);
// con `navegar`, cada punto lleva a su ficha (el activo queda marcado y sin link).
export default function MapaOscuro({ activo, onHover, onSelect, navegar = false, className = '' }) {
  const ref = useRef(null)
  const aContenedor = useCover(ref)
  return (
    <div className={`mo-mapa ${className}`} ref={ref}>
      <img src={mapaOscuro} alt="Mapa de la red HUB en Mendoza" loading="lazy" decoding="async" draggable="false" />
      {desarrollos.map((d) => {
        const [l, t] = aContenedor(...PUNTOS[d.slug])
        const esActivo = d.slug === activo
        const props = { className: `mo-punto${esActivo ? ' is-active' : ''}`, style: { left: `${l}%`, top: `${t}%` } }
        if (navegar) {
          return esActivo
            ? <span key={d.slug} {...props} aria-label={d.label} role="img"><span /></span>
            : <Link key={d.slug} to={`/desarrollos/${d.slug}`} {...props} aria-label={`Ir a ${d.label}`}><span /></Link>
        }
        return (
          <button key={d.slug} type="button" {...props} aria-label={`Ver ${d.label}`} aria-pressed={esActivo}
            onMouseEnter={() => onHover?.(d.slug)} onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(d.slug)} onBlur={() => onHover?.(null)} onClick={() => onSelect?.(d.slug)}><span /></button>
        )
      })}
    </div>
  )
}
