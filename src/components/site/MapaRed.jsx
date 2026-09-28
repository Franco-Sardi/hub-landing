import { Link } from 'react-router-dom'
import mapa from '../../assets/v3/mapa-ok.webp'
import { desarrollos } from '../../data/desarrollos'

// Medido sobre mapa-ok.webp (1620×1560): MAPA-OK.jpg recortado a (100,200)-(1720,1760), con el
// blanco de alrededor del papel pasado a crema. `zona` = recuadro que el mapa ya dibuja (logo HUB +
// nombre), en % x/y/ancho/alto; `punto` = donde el desarrollo toca la ruta. Otro mapa ⇒ re-medir.
const NODOS = {
  malabia: { zona: [26.2, 41.5, 10.9, 7.7], punto: [39.5, 44.6] },
  anchorena: { zona: [24.7, 49.5, 11.1, 7.7], punto: [38.3, 52.6] },
  'san-francisco-oeste': { zona: [71.0, 30.8, 11.1, 11.8], punto: [76.7, 59.2] },
  'san-francisco-este': { zona: [61.7, 20.3, 11.7, 10.4], punto: [68.1, 54.4] },
  'rodriguez-pena': { zona: [51.9, 56.2, 10.9, 9.9], punto: [57.2, 51.7] },
}

// Mapa original aprobado + capa interactiva. No se agregan etiquetas propias: el mapa ya nombra
// cada desarrollo, y encima tapaban otros logos. El activo se marca con contorno y halo (handoff §4).
// Con `onSelect` las zonas cambian el desarrollo activo; con `linkear`, llevan a su ficha.
export default function MapaRed({ activo, onSelect, onHover, linkear = false, alt = 'Mapa de la red HUB y sus conexiones productivas en Mendoza' }) {
  const act = activo && NODOS[activo]
  return (
    <div className="mapa-red">
      <img src={mapa} alt={alt} width="1620" height="1560" loading="lazy" decoding="async" />
      {act && <span className="mapa-punto" style={{ left: `${act.punto[0]}%`, top: `${act.punto[1]}%` }} aria-hidden="true" />}
      {desarrollos.map((d) => {
        const [x, y, w, h] = NODOS[d.slug].zona
        const esActivo = d.slug === activo
        const cls = `mapa-zona${esActivo ? ' is-active' : ''}`
        const style = { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }

        if (onSelect) {
          return <button key={d.slug} type="button" className={cls} style={style} aria-label={`Ver ${d.label}`} aria-pressed={esActivo} onClick={() => onSelect(d.slug)} onMouseEnter={() => onHover?.(d.slug)} />
        }
        if (linkear && !esActivo) {
          return <Link key={d.slug} to={`/desarrollos/${d.slug}`} className={cls} style={style} aria-label={`Ir a ${d.label}`} />
        }
        return esActivo ? <span key={d.slug} className={cls} style={style} aria-hidden="true" /> : null
      })}
    </div>
  )
}
