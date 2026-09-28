import mapa from '../../assets/v3/mapa-ok.webp'
import { desarrollos } from '../../data/desarrollos'

// Posición de cada nodo en % del ancho/alto de mapa-ok.webp: MAPA-OK.jpg original recortado a
// (100,200)-(1720,1760) para sacarle el margen blanco. Si Branding entrega otra versión del
// mapa, hay que volver a recortar y medir estos puntos.
const NODOS = {
  malabia: [39.5, 44.6],
  anchorena: [38.3, 52.6],
  'san-francisco-oeste': [76.7, 59.2],
  'san-francisco-este': [68.1, 54.4],
  'rodriguez-pena': [57.2, 51.7],
}

// Mapa original aprobado + capa interactiva: nodo activo en azul con halo (handoff §4).
export default function MapaRed({ activo, onSelect, alt = 'Mapa de la red HUB y sus conexiones productivas en Mendoza' }) {
  return (
    <div className="mapa-red">
      <img src={mapa} alt={alt} width="1620" height="1560" loading="lazy" decoding="async" />
      {desarrollos.map((d) => {
        const [x, y] = NODOS[d.slug]
        const esActivo = d.slug === activo
        const props = { className: `mapa-nodo${esActivo ? ' is-active' : ''}`, style: { left: `${x}%`, top: `${y}%` } }
        return onSelect ? (
          <button key={d.slug} type="button" {...props} aria-label={`Ver ${d.label}`} aria-pressed={esActivo} onClick={() => onSelect(d.slug)} />
        ) : (
          <span key={d.slug} {...props} aria-hidden="true" />
        )
      })}
    </div>
  )
}
