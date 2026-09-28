import { Link } from 'react-router-dom'
import mapa from '../../assets/v3/mapa-ok.webp'
import { desarrollos } from '../../data/desarrollos'

// Posición de cada nodo en % del ancho/alto de mapa-ok.webp: MAPA-OK.jpg original recortado a
// (100,200)-(1720,1760) para sacarle el margen blanco. Si Branding entrega otra versión del
// mapa, hay que volver a recortar y medir estos puntos. `lado`: hacia dónde sale la etiqueta,
// para no tapar los logos que el mapa ya trae dibujados.
const NODOS = {
  malabia: { x: 39.5, y: 44.6, lado: 'der' },
  anchorena: { x: 38.3, y: 52.6, lado: 'der' },
  'san-francisco-oeste': { x: 76.7, y: 59.2, lado: 'izq' },
  'san-francisco-este': { x: 68.1, y: 54.4, lado: 'izq' },
  'rodriguez-pena': { x: 57.2, y: 51.7, lado: 'der' },
}

// Mapa original aprobado + capa interactiva (handoff §4: nodo activo en azul con halo).
// Con `onSelect` los nodos cambian el desarrollo activo; con `linkear`, llevan a su ficha.
export default function MapaRed({ activo, onSelect, onHover, linkear = false, alt = 'Mapa de la red HUB y sus conexiones productivas en Mendoza' }) {
  return (
    <div className="mapa-red">
      <img src={mapa} alt={alt} width="1620" height="1560" loading="lazy" decoding="async" />
      {desarrollos.map((d) => {
        const { x, y, lado } = NODOS[d.slug]
        const esActivo = d.slug === activo
        const cls = `mapa-nodo mapa-nodo--${lado}${esActivo ? ' is-active' : ''}`
        const style = { left: `${x}%`, top: `${y}%` }
        const etiqueta = <span className="mapa-label">{d.nombre}</span>

        if (onSelect) {
          return (
            <button key={d.slug} type="button" className={cls} style={style} aria-label={`Ver ${d.label}`} aria-pressed={esActivo} onClick={() => onSelect(d.slug)} onMouseEnter={() => onHover?.(d.slug)}>
              {etiqueta}
            </button>
          )
        }
        if (linkear && !esActivo) {
          return <Link key={d.slug} to={`/desarrollos/${d.slug}`} className={cls} style={style} aria-label={`Ir a ${d.label}`}>{etiqueta}</Link>
        }
        return <span key={d.slug} className={cls} style={style} aria-hidden="true">{etiqueta}</span>
      })}
    </div>
  )
}
