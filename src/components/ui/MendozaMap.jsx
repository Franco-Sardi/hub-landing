import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import mapDark from '../../assets/mapa-dark-v2.png'
import mapLight from '../../assets/mapa-acuarela.png'

const MARKER_COLOR = '#C7C8CA'

// Posiciones como % de la imagen original (se recalculan al llenar el contenedor)
const PARK_POS = {
  1: { left: 38.8, top: 61.5, label: 'ANCHORENA',        lx:  58, ly: -2 },
  2: { left: 68.8, top: 62.3, label: 'SFDM ESTE',        lx: -82, ly: -2 },
  3: { left: 39.8, top: 52.1, label: 'MALABIA',          lx:  58, ly: -2 },
  4: { left: 58.1, top: 59.2, label: 'RODRÍGUEZ PEÑA',   lx:  58, ly: -2 },
  5: { left: 77.7, top: 67.3, label: 'SFDM OESTE',       lx: -82, ly: -2 },
}

// Dimensiones naturales de la imagen recortada
const IMG_W = 1024
const IMG_H = 904

export { MARKER_COLOR }

// ── Debug calibration overlay ─────────────────────────────────────────────────
// Tecla D para activar. Flujo guiado: clickeá cada HUB en orden.
// Al terminar los 5, muestra el objeto PARK_POS listo para copiar.

const CALIB_ORDER = [
  { id: 1, key: 'ANCHORENA',       color: '#ff4444' },
  { id: 2, key: 'SFDM ESTE',       color: '#ff8800' },
  { id: 3, key: 'MALABIA',         color: '#ffcc00' },
  { id: 4, key: 'RODRÍGUEZ PEÑA',  color: '#44ff88' },
  { id: 5, key: 'SFDM OESTE',      color: '#44aaff' },
]

function DebugOverlay({ containerRef, toImage }) {
  // cursor/pins store both container-% (cx/cy, for visual placement) and image-% (ix/iy, for PARK_POS output)
  const [cursor, setCursor] = useState(null)
  const [pins, setPins] = useState([])
  const done = pins.length >= CALIB_ORDER.length

  function getCoords(e) {
    const rect = containerRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  * 100
    const cy = (e.clientY - rect.top)  / rect.height * 100
    const { l: ix, t: iy } = toImage(cx, cy)
    return {
      cx: parseFloat(cx.toFixed(1)),
      cy: parseFloat(cy.toFixed(1)),
      ix: parseFloat(ix.toFixed(1)),
      iy: parseFloat(iy.toFixed(1)),
    }
  }

  function handleMove(e) { if (!done) setCursor(getCoords(e)) }
  function handleClick(e) {
    if (done) return
    setPins(prev => [...prev, getCoords(e)])
  }

  function handleUndo(e) {
    e.stopPropagation()
    setPins(prev => prev.slice(0, -1))
    setCursor(null)
  }

  // Build the PARK_POS result string using image-space coordinates (ix/iy)
  const resultLines = CALIB_ORDER.map((park, i) => {
    const p = pins[i]
    if (!p) return null
    const cur = PARK_POS[park.id]
    return `  ${park.id}: { left: ${p.ix}, top: ${p.iy}, label: '${park.key}', lx: ${cur.lx}, ly: ${cur.ly} },`
  }).filter(Boolean)

  const resultStr = `const PARK_POS = {\n${resultLines.join('\n')}\n}`

  function copyResult(e) {
    e.stopPropagation()
    navigator.clipboard?.writeText(resultStr)
  }

  const nextPark = !done ? CALIB_ORDER[pins.length] : null

  return (
    <div
      className="absolute inset-0 z-50"
      style={{ cursor: done ? 'default' : 'crosshair' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setCursor(null)}
      onClick={handleClick}
    >
      {/* Crosshair — positioned with container-% (cx/cy), readout shows image-% (ix/iy) */}
      {cursor && !done && (
        <>
          <div style={{ position: 'absolute', left: `${cursor.cx}%`, top: 0, bottom: 0, width: 1, background: `${nextPark.color}99`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: `${cursor.cy}%`, left: 0, right: 0, height: 1, background: `${nextPark.color}99`, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute',
            left: `${Math.min(cursor.cx + 1, 62)}%`,
            top: `${Math.max(cursor.cy - 8, 1)}%`,
            background: 'rgba(0,0,0,0.85)', color: nextPark.color,
            padding: '2px 8px', fontSize: 10, fontFamily: 'monospace',
            borderRadius: 3, pointerEvents: 'none', whiteSpace: 'nowrap',
            border: `1px solid ${nextPark.color}66`,
          }}>
            {cursor.ix}, {cursor.iy}
          </div>
        </>
      )}

      {/* Placed pins — positioned with container-% (cx/cy) */}
      {pins.map((p, i) => {
        const park = CALIB_ORDER[i]
        return (
          <div key={i} style={{ position: 'absolute', left: `${p.cx}%`, top: `${p.cy}%`, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: park.color, border: '2px solid #fff', boxShadow: `0 0 8px ${park.color}cc` }} />
            <div style={{ position: 'absolute', left: 14, top: -5, background: 'rgba(0,0,0,0.85)', color: park.color, padding: '2px 6px', fontSize: 9, fontFamily: 'monospace', borderRadius: 2, whiteSpace: 'nowrap', border: `1px solid ${park.color}55` }}>
              {i + 1} · {park.key}
            </div>
          </div>
        )
      })}

      {/* Instruction panel — top left */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        background: 'rgba(0,0,0,0.88)', borderRadius: 4,
        padding: '8px 10px', fontSize: 10, fontFamily: 'monospace',
        border: '1px solid rgba(255,255,255,0.15)', minWidth: 160,
        pointerEvents: done ? 'auto' : 'none',
      }}>
        <div style={{ color: '#fff', opacity: 0.5, marginBottom: 6, fontSize: 9, letterSpacing: '0.1em' }}>
          CALIBRACIÓN — tecla D para salir
        </div>
        {CALIB_ORDER.map((park, i) => {
          const placed = i < pins.length
          const active = i === pins.length
          return (
            <div key={park.id} style={{
              color: placed ? park.color : active ? '#fff' : 'rgba(255,255,255,0.3)',
              fontWeight: active ? 700 : 400,
              marginBottom: 3,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ opacity: placed ? 1 : active ? 1 : 0.4 }}>
                {placed ? '✓' : active ? '→' : '○'}
              </span>
              {park.id} · {park.key}
            </div>
          )
        })}
      </div>

      {/* Result panel — shown when all 5 are done */}
      {done && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.93)', borderRadius: 6,
          padding: '16px 18px', fontSize: 11, fontFamily: 'monospace',
          border: '1px solid rgba(255,255,255,0.2)',
          maxWidth: '90%', minWidth: 280,
        }}>
          <div style={{ color: '#44ff88', marginBottom: 10, fontWeight: 700 }}>✓ Calibración completa</div>
          <pre style={{ color: '#C7C8CA', fontSize: 10, whiteSpace: 'pre-wrap', margin: 0, marginBottom: 12 }}>
            {resultStr}
          </pre>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={copyResult}
              style={{ background: '#44ff88', color: '#000', border: 'none', borderRadius: 3, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}
            >
              COPIAR
            </button>
            <button
              onClick={handleUndo}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3, padding: '5px 12px', fontSize: 10, cursor: 'pointer', fontFamily: 'monospace' }}
            >
              DESHACER ÚLTIMO
            </button>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      {!done && (
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          background: nextPark ? `${nextPark.color}dd` : 'rgba(255,68,68,0.9)',
          color: '#000', padding: '3px 12px', fontSize: 10, fontFamily: 'monospace',
          borderRadius: 3, pointerEvents: pins.length > 0 ? 'auto' : 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>Clickeá: {nextPark?.key} ({pins.length + 1}/5)</span>
          {pins.length > 0 && (
            <button onClick={handleUndo} style={{ background: 'rgba(0,0,0,0.3)', border: 'none', color: '#000', borderRadius: 2, padding: '1px 6px', fontSize: 9, cursor: 'pointer', fontFamily: 'monospace' }}>
              ↩ undo
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Hook: calcula el área visible de la imagen con object-fit: cover ──────────
// toContainer: (imgLeft%, imgTop%) → (containerLeft%, containerTop%)
// toImage:     inversa — (containerLeft%, containerTop%) → (imgLeft%, imgTop%)
function useCoverTransform(containerRef) {
  const identity = (l, t) => ({ l, t })
  const [fns, setFns] = useState({ toContainer: identity, toImage: identity })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function recalc() {
      const cw = el.offsetWidth
      const ch = el.offsetHeight
      if (!cw || !ch) return

      const imgRatio = IMG_W / IMG_H
      const cRatio   = cw / ch

      let renderedW, renderedH, offsetX, offsetY
      if (cRatio > imgRatio) {
        renderedW = cw
        renderedH = cw / imgRatio
        offsetX = 0
        offsetY = (renderedH - ch) / 2
      } else {
        renderedH = ch
        renderedW = ch * imgRatio
        offsetX = (renderedW - cw) / 2
        offsetY = 0
      }

      setFns({
        toContainer: (imgL, imgT) => ({
          l: ((imgL / 100 * renderedW - offsetX) / cw) * 100,
          t: ((imgT / 100 * renderedH - offsetY) / ch) * 100,
        }),
        toImage: (contL, contT) => ({
          l: ((contL / 100 * cw + offsetX) / renderedW) * 100,
          t: ((contT / 100 * ch + offsetY) / renderedH) * 100,
        }),
      })
    }

    recalc()
    const obs = new ResizeObserver(recalc)
    obs.observe(el)
    return () => obs.disconnect()
  }, [containerRef])

  return fns
}

export default function MendozaMap({ projects, activeId, onHover, onSelect, onNavigate }) {
  const containerRef = useRef(null)
  const [isLight, setIsLight] = useState(() => !document.documentElement.classList.contains('dark'))
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)
  const [debug, setDebug] = useState(false)
  const { toContainer, toImage } = useCoverTransform(containerRef)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setIsLight(!el.classList.contains('dark')))
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'd' || e.key === 'D') setDebug(v => !v) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const mapImg = isLight ? mapLight : mapDark

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ background: isLight ? '#e8dfd3' : '#011823', clipPath: 'inset(0)' }}
    >
      {/* Imagen con object-fit: cover — llena el contenedor siempre */}
      <img
        src={mapImg}
        alt="Mapa red HUB Mendoza"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover', objectPosition: 'center', userSelect: 'none', pointerEvents: 'none' }}
        draggable={false}
      />

      {debug && <DebugOverlay containerRef={containerRef} toImage={toImage} />}

      {projects.map((p) => {
        const pos = PARK_POS[p.id]
        if (!pos) return null

        // Convertir coordenadas de imagen → coordenadas del contenedor visible
        const { l: cLeft, t: cTop } = toContainer(pos.left, pos.top)

        const isActive = activeId === p.id
        const color = isLight ? '#022A3A' : '#FFFFFF'
        const isRight = pos.lx >= 0

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${cLeft}%`,
              top: `${cTop}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 20 : 10,
              cursor: debug ? 'none' : 'pointer',
            }}
            onMouseEnter={() => !debug && onHover(p.id)}
            onMouseLeave={() => !debug && onHover(null)}
            onClick={() => {
              if (debug) return
              if (onNavigate) onNavigate(p.slug)
              else onSelect(p.id)
            }}
            onTouchEnd={(e) => {
              if (debug) return
              e.preventDefault()
              if (onNavigate) onNavigate(p.slug)
              else onSelect(p.id)
            }}
          >
            {/* Pulse ring — siempre activo, más intenso cuando isActive */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: isMobile ? -4 : -6, border: `1px solid ${color}` }}
              initial={{ opacity: isActive ? 0.6 : 0.25, scale: 0.6 }}
              animate={{ opacity: 0, scale: isActive ? 1.8 : 1.4 }}
              transition={{
                duration: isActive ? 1.2 : 2,
                repeat: Infinity,
                ease: 'easeOut',
                repeatDelay: isActive ? 0 : 0.6,
              }}
            />

            <div
              className="rounded-full transition-all duration-200"
              style={{
                width:  isActive ? (isMobile ? 14 : 20) : (isMobile ? 10 : 15),
                height: isActive ? (isMobile ? 14 : 20) : (isMobile ? 10 : 15),
                margin: isActive ? 0 : (isMobile ? 2 : 2.5),
                border: `${isMobile ? 1.5 : 2}px solid ${color}`,
                background: color,
                boxShadow: isActive ? `0 0 6px 1px ${color}99` : 'none',
              }}
            />

          </div>
        )
      })}
    </div>
  )
}
