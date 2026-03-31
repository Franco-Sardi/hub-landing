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

function Stat({ value, suffix, label, sublabel, delay, index }) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
      className="flex items-stretch gap-0"
    >
      {/* Azure left accent bar */}
      <div className="w-0.5 shrink-0 bg-gradient-to-b from-hub-azure to-hub-azure-light/30 mr-5" />

      <div className="flex flex-col justify-center">
        {/* Number */}
        <div className="flex items-end gap-1 leading-none mb-1.5">
          <span
            className="font-display tabular-nums"
            style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
            }}
          >
            {count.toLocaleString('es-AR')}
          </span>
          {suffix && (
            <span
              className="font-display pb-1"
              style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)',
                background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}
            >
              {suffix}
            </span>
          )}
        </div>
        <div className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-0.5">{label}</div>
        {sublabel && <div className="text-hub-muted text-xs tracking-wide">{sublabel}</div>}
      </div>
    </motion.div>
  )
}

const STATS = [
  { value: 5,      suffix: '',     label: 'Parques',    sublabel: 'En Mendoza',               delay: 0    },
  { value: 420000, suffix: ' mts', label: 'Terreno',    sublabel: 'Total disponible',          delay: 0.1  },
  { value: 240000, suffix: ' m²',  label: 'Naves',      sublabel: 'Industriales inteligentes', delay: 0.2  },
  { value: 8,      suffix: '%',    label: 'ROI Anual',  sublabel: 'En dólares · base',         delay: 0.3  },
  { value: 40,     suffix: '+',    label: 'Empresas',   sublabel: 'Proyectadas',               delay: 0.4  },
]

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative lg:min-h-dvh flex flex-col overflow-hidden bg-hub-dark py-12 lg:py-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,42,78,0.18) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-azure/50 to-transparent" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-hub-azure/20 to-transparent" />

      {/* Ghost "6" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-display leading-none"
          style={{ fontSize: 'clamp(16rem, 40vw, 40rem)', color: 'transparent', WebkitTextStroke: '1px rgba(13,42,78,0.12)' }}
        >
          5
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 sm:px-8 xl:px-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10 lg:mb-16"
        >
          <span className="w-10 h-px bg-hub-azure/70" />
          <span className="text-hub-muted text-xs font-semibold tracking-[0.35em] uppercase">HUB en Números</span>
          <span className="w-10 h-px bg-hub-azure/70" />
        </motion.div>

        {/* Stats grid */}
        <div className="w-full max-w-6xl xl:max-w-7xl grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-3 py-4 lg:px-5 xl:px-8 ${
                i < 4 ? 'lg:border-r lg:border-hub-azure/15' : ''
              } ${i >= 2 ? 'border-t border-hub-azure/10 pt-6 lg:border-t-0 lg:pt-4' : ''}`}
            >
              <Stat {...s} index={i} />
            </div>
          ))}
        </div>

        {/* Divider + tagline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 lg:mt-16 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-hub-azure/30 to-transparent origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-hub-muted/60 text-sm mt-5 tracking-wide text-center"
        >
          Infraestructura industrial de clase mundial en las principales zonas productivas de Mendoza.
        </motion.p>
      </div>
    </section>
  )
}
