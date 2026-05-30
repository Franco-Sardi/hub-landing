import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

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
              fontSize: 'clamp(1.9rem, 3.8vw, 6rem)',
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
  { value: 5,      suffix: '',     label: 'HUBs',       sublabel: 'En Mendoza',                      delay: 0    },
  { value: 335000, suffix: ' m²',  label: 'Terreno',    sublabel: 'Superficie total',                      delay: 0.12 },
  { value: 178000, suffix: ' m²',  label: 'Naves',      sublabel: 'Industriales inteligentes',             delay: 0.24 },
  { value: 3,      suffix: '',     label: 'Corredores', sublabel: 'Más estratégicos de Mendoza',           delay: 0.36 },
]

export default function Stats() {
  return (
    <section
      id="stats"
      className="stats-section relative lg:min-h-svh flex flex-col overflow-hidden py-8 lg:py-0"
    >
      {/* Ghost "H" — z-[3] para quedar encima de la línea decorativa */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[3]"
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

      {/* Divisor ornamentado desktop — z-[2]: detrás del H, zona baja */}
      <div
        className="hidden lg:flex absolute left-0 right-0 justify-center items-center z-[2] pointer-events-none"
        style={{ bottom: '2rem' }}
      >
        <div className="w-full max-w-[80vw] flex items-center gap-4 px-5 sm:px-12 xl:px-16">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--stat-deco))' }} />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 4)" fill="none" stroke="var(--stat-deco-line)" strokeWidth="1" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--stat-deco))' }} />
        </div>
      </div>

      <SectionFrame />

      {/* Eyebrow — fuera del contenedor centrado, arriba de la sección */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-center gap-3 pt-10 lg:pt-14 px-5"
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

      {/* Contenido — z-10, stats centrados */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 sm:px-12 xl:px-16">

        {/* Grid de stats */}
        <div className="w-full max-w-[95vw] 3xl:max-w-[1700px] grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-0">
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

        {/* Divisor mobile — en flujo, oculto en desktop */}
        <div className="lg:hidden w-full max-w-[80vw] flex items-center gap-4 mt-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--stat-deco))' }} />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 4)" fill="none" stroke="var(--stat-deco-line)" strokeWidth="1" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--stat-deco))' }} />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="font-condensed text-center mt-4 lg:mt-14 tracking-[0.15em] uppercase"
          style={{ fontSize: '0.72rem', color: 'var(--stat-color)', opacity: 0.50, maxWidth: '50ch' }}
        >
          Red de infraestructura y servicios en los principales corredores industriales de Mendoza
        </motion.p>
      </div>
    </section>
  )
}
