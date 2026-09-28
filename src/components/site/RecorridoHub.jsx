import { useEffect, useRef, useState } from 'react'

// Camión de perfil, mirando a la derecha: tráiler plata, cabina azul con filete naranja.
function Camion() {
  return (
    <svg viewBox="0 0 72 30" width="72" height="30" aria-hidden="true">
      <rect x="1" y="3" width="42" height="18" rx="1.5" fill="#C7CBCA" />
      <rect x="5" y="7" width="18" height="2" fill="#132C3A" opacity=".55" />
      <path d="M45 8h13.5l7.5 6.5V21H45z" fill="#FFFFFF" />
      <path d="M49 10.5h8.2l4.3 4H49z" fill="#132C3A" opacity=".75" />
      <rect x="45" y="18.2" width="21" height="2.4" fill="#FF7D4D" />
      <rect x="43" y="19.5" width="3" height="1.5" fill="#C7CBCA" />
      <g fill="#0B202A" stroke="#C7CBCA" strokeWidth="1.6">
        <circle cx="11" cy="24" r="4" /><circle cx="21" cy="24" r="4" /><circle cx="56" cy="24" r="4" />
      </g>
    </svg>
  )
}

// El camión recorre la línea a medida que se scrollea y enciende cada paso al pasar por su punto.
// La posición se escribe directo en el transform del camión y del relleno (sin re-render por frame);
// React solo se entera cuando cambia la cantidad de pasos encendidos.
export default function RecorridoHub({ pasos }) {
  const flowRef = useRef(null)
  const camionRef = useRef(null)
  const rellenoRef = useRef(null)
  const puntosRef = useRef([])
  const [encendidos, setEncendidos] = useState(0)

  useEffect(() => {
    const flow = flowRef.current
    if (!flow) return
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')
    const vertical = window.matchMedia('(max-width: 1100px)')
    let actual = 0
    let objetivo = 0
    let raf = 0
    let posiciones = []
    let ultimoEncendido = -1
    let vivo = true

    const medir = () => {
      const base = flow.getBoundingClientRect()
      posiciones = puntosRef.current.filter(Boolean).map((p) => {
        const r = p.getBoundingClientRect()
        return vertical.matches ? r.top + r.height / 2 - base.top : r.left + r.width / 2 - base.left
      })
    }

    const leerScroll = () => {
      const r = flow.getBoundingClientRect()
      const vh = window.innerHeight
      // Horizontal: el recorrido ocurre mientras la línea sube del 78% al 33% de la pantalla.
      // Vertical: acompaña al lector a lo largo de la lista.
      const t = vertical.matches ? (vh * 0.7 - r.top) / (r.height * 0.85) : (vh * 0.78 - r.top) / (vh * 0.45)
      objetivo = Math.min(1, Math.max(0, t))
    }

    const pintar = () => {
      if (posiciones.length < 2) return
      const ini = posiciones[0]
      const fin = posiciones[posiciones.length - 1]
      const pos = ini + actual * (fin - ini)
      const camion = camionRef.current
      const relleno = rellenoRef.current
      if (vertical.matches) {
        camion.style.transform = `translate3d(-29px, ${pos - 15}px, 0) rotate(90deg)`
        relleno.style.transform = `scaleY(${pos / flow.offsetHeight})`
      } else {
        camion.style.transform = `translate3d(${pos - 36}px, 0, 0)`
        relleno.style.transform = `scaleX(${pos / flow.offsetWidth})`
      }
      const n = posiciones.filter((p) => p <= pos + 6).length
      if (n !== ultimoEncendido) {
        ultimoEncendido = n
        setEncendidos(n)
      }
    }

    const frame = () => {
      // Suavizado: el camión "rueda" hacia la posición del scroll en vez de saltar con la rueda del mouse.
      actual += (objetivo - actual) * 0.12
      if (Math.abs(objetivo - actual) < 0.001) actual = objetivo
      pintar()
      raf = actual === objetivo ? 0 : requestAnimationFrame(frame)
    }

    const alScroll = () => {
      leerScroll()
      if (reducido.matches) {
        actual = objetivo = 1
        pintar()
      } else if (!raf) {
        raf = requestAnimationFrame(frame)
      }
    }

    const alRedimensionar = () => {
      // fonts.ready puede resolver después de salir de la home: sin esto, mide nodos ya desmontados.
      if (!vivo) return
      medir()
      alScroll()
      pintar()
    }

    alRedimensionar()
    // Las fuentes web y el reveal cambian el alto del texto después del primer render:
    // sin volver a medir, el camión termina corrido del último punto.
    const ro = new ResizeObserver(alRedimensionar)
    ro.observe(flow)
    document.fonts?.ready.then(alRedimensionar)
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alRedimensionar)
    vertical.addEventListener('change', alRedimensionar)
    reducido.addEventListener('change', alRedimensionar)
    return () => {
      vivo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alRedimensionar)
      vertical.removeEventListener('change', alRedimensionar)
      reducido.removeEventListener('change', alRedimensionar)
    }
  }, [])

  return (
    <div className="business-flow" ref={flowRef}>
      <div className="business-line"><div className="business-fill" ref={rellenoRef} /></div>
      <div className="business-truck" ref={camionRef}><Camion /></div>
      <ol className="business-steps">
        {pasos.map(([t, p], i) => (
          <li key={t} className={`business-step${i < encendidos ? ' is-on' : ''}`}>
            <div className="dot" ref={(el) => { puntosRef.current[i] = el }} />
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <h3>{t}</h3>
            <p>{p}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
