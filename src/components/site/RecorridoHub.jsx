import { useEffect, useRef, useState } from 'react'

function Icono({ icon }) {
  const [w, h, , , d] = icon.icon
  return <svg viewBox={`0 0 ${w} ${h}`} aria-hidden="true"><path d={d} /></svg>
}

// Loop por tiempo (pedido de Franco: con el scroll "funcionaba mal"): la línea se detiene en cada
// paso y lo enciende, avanza al siguiente, y al final se desvanece y arranca de nuevo. Solo corre con
// la sección a la vista. La posición se escribe directo en el transform del relleno;
// React solo se entera cuando cambia la cantidad de pasos encendidos.
const PAUSA = 900 // ms detenido en cada paso
const TRAMO = 1400 // ms entre un paso y el siguiente
const CIERRE = 1800 // ms al final (incluye el desvanecido)
const FUNDIDO = 450
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

export default function RecorridoHub({ pasos }) {
  const flowRef = useRef(null)
  const rellenoRef = useRef(null)
  const puntosRef = useRef([])
  const [encendidos, setEncendidos] = useState(0)

  useEffect(() => {
    const flow = flowRef.current
    if (!flow) return
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')
    const vertical = window.matchMedia('(max-width: 1100px)')
    let posiciones = []
    let raf = 0
    let visible = false
    let inicio = 0
    let ultimoEncendido = -1
    let vivo = true

    const medir = () => {
      const base = flow.getBoundingClientRect()
      posiciones = puntosRef.current.filter(Boolean).map((p) => {
        const r = p.getBoundingClientRect()
        return vertical.matches ? r.top + r.height / 2 - base.top : r.left + r.width / 2 - base.left
      })
    }

    const pintar = (pos, opacidad, n) => {
      const relleno = rellenoRef.current
      if (!relleno) return
      relleno.style.transform = vertical.matches
        ? `scaleY(${pos / flow.offsetHeight})`
        : `scaleX(${pos / flow.offsetWidth})`
      relleno.style.opacity = opacidad
      if (n !== ultimoEncendido) {
        ultimoEncendido = n
        setEncendidos(n)
      }
    }

    // Dado el tiempo dentro del ciclo, devuelve [posición, opacidad, pasos encendidos].
    const estado = (e) => {
      const P = posiciones
      for (let i = 0; i < P.length; i++) {
        if (e < PAUSA) return [P[i], 1, i + 1]
        e -= PAUSA
        if (i < P.length - 1) {
          if (e < TRAMO) return [P[i] + (P[i + 1] - P[i]) * easeInOut(e / TRAMO), 1, i + 1]
          e -= TRAMO
        }
      }
      const fin = P[P.length - 1]
      const resta = CIERRE - e
      return [fin, resta < FUNDIDO ? Math.max(0, resta / FUNDIDO) : 1, P.length]
    }

    const ciclo = () => PAUSA * posiciones.length + TRAMO * (posiciones.length - 1) + CIERRE

    const frame = (ahora) => {
      if (posiciones.length < 2) return
      if (!inicio) inicio = ahora
      const [pos, op, n] = estado((ahora - inicio) % ciclo())
      pintar(pos, op, n)
      raf = requestAnimationFrame(frame)
    }

    const arrancar = () => {
      if (!vivo || raf || !visible || document.hidden) return
      if (reducido.matches) {
        const fin = posiciones[posiciones.length - 1]
        if (fin != null) pintar(fin, 1, posiciones.length)
        return
      }
      inicio = 0
      raf = requestAnimationFrame(frame)
    }
    const parar = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const alRedimensionar = () => {
      if (!vivo) return
      medir()
      if (!raf && posiciones.length) pintar(posiciones[0], 1, reducido.matches ? posiciones.length : 1)
    }

    alRedimensionar()
    const ro = new ResizeObserver(alRedimensionar)
    ro.observe(flow)
    document.fonts?.ready.then(alRedimensionar)
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (visible) arrancar()
      else parar()
    }, { threshold: 0.25 })
    io.observe(flow)
    const alVisibilidad = () => (document.hidden ? parar() : arrancar())
    document.addEventListener('visibilitychange', alVisibilidad)
    const alCambiar = () => { parar(); alRedimensionar(); arrancar() }
    vertical.addEventListener('change', alCambiar)
    reducido.addEventListener('change', alCambiar)
    return () => {
      vivo = false
      parar()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', alVisibilidad)
      vertical.removeEventListener('change', alCambiar)
      reducido.removeEventListener('change', alCambiar)
    }
  }, [])

  return (
    <div className="business-flow" ref={flowRef}>
      <div className="business-line"><div className="business-fill" ref={rellenoRef} /></div>
      <ol className="business-steps" style={{ '--pasos': pasos.length }}>
        {pasos.map(([t, p, icon], i) => (
          <li key={t} className={`business-step${i < encendidos ? ' is-on' : ''}`}>
            <div className="dot" ref={(el) => { puntosRef.current[i] = el }}><Icono icon={icon} /></div>
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <h3>{t}</h3>
            <p>{p}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
