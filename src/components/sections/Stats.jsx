import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1600, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let t0 = null
    const tick = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, target, duration])
  return value
}

function Stat({ value, suffix, label, sublabel, delay }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const count = useCountUp(value, 1800, on)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setOn(true), delay * 1000); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-stretch gap-0"
    >
      {/* Barra lateral — degradado navy premium */}
      <div
        className="w-px shrink-0 mr-5"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--stat-deco-line) 30%, var(--stat-deco-line) 70%, transparent)' }}
      />

      <div className="flex flex-col justify-center gap-1">
        {/* Número */}
        <div className="flex items-end gap-1 leading-none">
          <span
            className="font-display tabular-nums"
            style={{
              fontSize: 'clamp(2.4rem, 3.8vw, 6rem)',
              lineHeight: 1,
              color: 'var(--stat-color)',
              letterSpacing: '-0.01em',
            }}
          >
            {count.toLocaleString('es-AR')}
          </span>
          {suffix && (
            <span
              className="font-display pb-1.5"
              style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)',
                lineHeight: 1,
                color: 'var(--stat-color)',
                opacity: 0.45,
                letterSpacing: '0.05em',
              }}
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Label principal */}
        <div
          className="font-display tracking-[0.25em] uppercase"
          style={{ fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)', color: 'var(--stat-color)', opacity: 0.75 }}
        >
          {label}
        </div>

        {/* Sublabel — línea fina decorativa + texto */}
        {sublabel && (
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-3 h-px" style={{ background: 'var(--stat-deco)' }} />
            <span
              className="font-body tracking-wider"
              style={{ fontSize: '0.72rem', color: 'var(--stat-color)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              {sublabel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const STATS = [
  { value: 5,      suffix: '',     label: 'Proyectos',  sublabel: 'En Mendoza',              delay: 0    },
  { value: 413578, suffix: ' mts', label: 'Terreno',    sublabel: 'Total en desarrollo',     delay: 0.12 },
  { value: 222800, suffix: ' m²',  label: 'Naves',      sublabel: 'Logísticas Triple A',     delay: 0.24 },
  { value: 8,      suffix: '%',    label: 'ROI Anual',  sublabel: 'En dólares · garantizado', delay: 0.36 },
]

export default function Stats() {
  return (
    <section
      id="stats"
      className="stats-section relative lg:min-h-dvh flex flex-col overflow-hidden py-12 lg:py-0"
    >
      {/* Ghost "H" — marca de agua de la identidad */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(18rem, 45vw, 52rem)',
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--stat-deco-faint)',
            letterSpacing: '-0.02em',
            transform: 'translateY(4%)',
          }}
        >
          H
        </span>
      </div>

      {/* Marco interior — detalle premium */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 20,
          border: '1px solid var(--stat-deco)',
          zIndex: 1,
        }}
      />
      {/* Esquinas marcadas */}
      {[
        { top: 14, left: 14 },
        { top: 14, right: 14 },
        { bottom: 14, left: 14 },
        { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...pos,
            width: 18,
            height: 18,
            borderTop:    pos.bottom === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderBottom: pos.top    === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderLeft:   pos.right  === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderRight:  pos.left   === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            zIndex: 2,
          }}
        />
      ))}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 sm:px-12 xl:px-16">

        {/* Eyebrow — ornamento ◆ línea ◆ */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8 lg:mb-20"
        >
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--stat-deco))' }} />
          <svg width="6" height="6" viewBox="0 0 6 6">
            <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="var(--stat-deco-strong)" />
          </svg>
          <span
            className="font-display tracking-[0.45em] uppercase"
            style={{ fontSize: '0.72rem', color: 'var(--stat-color)', opacity: 0.6, letterSpacing: '0.45em' }}
          >
            HUB en Números
          </span>
          <svg width="6" height="6" viewBox="0 0 6 6">
            <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="var(--stat-deco-strong)" />
          </svg>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--stat-deco))' }} />
        </motion.div>

        {/* Grid de stats */}
        <div className="w-full max-w-6xl xl:max-w-7xl 3xl:max-w-[1700px] grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-2 lg:px-6 xl:px-10 ${i < 3 ? 'lg:border-r' : ''} ${i < 2 ? 'border-b pb-6 lg:border-b-0 lg:pb-2' : ''}`}
              style={{ borderColor: 'var(--stat-deco-faint)' }}
            >
              <Stat {...s} />
            </div>
          ))}
        </div>

        {/* Divisor central ornamentado */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 lg:mt-20 w-full max-w-4xl flex items-center gap-4 origin-center"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--stat-deco))' }} />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 4)" fill="none" stroke="var(--stat-deco-line)" strokeWidth="1" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--stat-deco))' }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="font-body text-center mt-5 tracking-[0.15em] uppercase"
          style={{ fontSize: '0.68rem', color: 'var(--stat-color)', opacity: 0.38, maxWidth: '40ch' }}
        >
          Almacenamiento logístico inteligente en los principales corredores de conectividad de Mendoza
        </motion.p>
      </div>
    </section>
  )
}
