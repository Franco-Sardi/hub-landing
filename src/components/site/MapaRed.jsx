import { Link } from 'react-router-dom'
import mapa from '../../assets/v3/mapa-ok.webp'
import { desarrollos } from '../../data/desarrollos'

// Medido sobre mapa-ok.webp (1403×1528): MAPA-OK.jpg recortado exactamente al papel, (206,216)-(1609,1744);
// las flechas a Chile y Buenos Aires quedan cortadas en el borde, como una ruta que sigue fuera de cuadro.
// `zona` = recuadro que el mapa ya dibuja (logo HUB + nombre), en % x/y/ancho/alto; `punto` = donde el
// desarrollo toca la ruta. Otro mapa ⇒ re-medir.
const NODOS = {
  malabia: { zona: [22.7, 41.3, 12.6, 7.9], punto: [38.1, 44.5] },
  anchorena: { zona: [21.0, 49.5, 12.8, 7.9], punto: [36.7, 52.7] },
  'san-francisco-oeste': { zona: [74.4, 30.4, 12.8, 12.0], punto: [81.0, 59.4] },
  'san-francisco-este': { zona: [63.7, 19.7, 13.5, 10.6], punto: [71.1, 54.5] },
  'rodriguez-pena': { zona: [52.4, 56.3, 12.6, 10.1], punto: [58.5, 51.7] },
}

// Mapa original aprobado + capa interactiva. No se agregan etiquetas propias: el mapa ya nombra
// cada desarrollo, y encima tapaban otros logos. El activo se marca con contorno y halo (handoff §4).
// Con `onSelect` las zonas cambian el desarrollo activo (`onHover` recibe el slug o null al salir);
// con `linkear`, llevan a su ficha.
export default function MapaRed({ activo, onSelect, onHover, linkear = false, alt = 'Mapa de la red HUB y sus conexiones productivas en Mendoza' }) {
  const act = activo && NODOS[activo]
  return (
    <div className="mapa-red">
      <img src={mapa} alt={alt} width="1403" height="1528" loading="lazy" decoding="async" />
      {act && <span className="mapa-punto" style={{ left: `${act.punto[0]}%`, top: `${act.punto[1]}%` }} aria-hidden="true" />}
      {desarrollos.map((d) => {
        const [x, y, w, h] = NODOS[d.slug].zona
        const esActivo = d.slug === activo
        const cls = `mapa-zona${esActivo ? ' is-active' : ''}`
        const style = { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }

        if (onSelect) {
          return <button key={d.slug} type="button" className={cls} style={style} aria-label={`Ver ${d.label}`} aria-pressed={esActivo} onClick={() => onSelect(d.slug)} onMouseEnter={() => onHover?.(d.slug)} onMouseLeave={() => onHover?.(null)} onFocus={() => onHover?.(d.slug)} onBlur={() => onHover?.(null)} />
        }
        if (linkear && !esActivo) {
          return <Link key={d.slug} to={`/desarrollos/${d.slug}`} className={cls} style={style} aria-label={`Ir a ${d.label}`} />
        }
        return esActivo ? <span key={d.slug} className={cls} style={style} aria-hidden="true" /> : null
      })}
    </div>
  )
}
