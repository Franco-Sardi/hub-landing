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

function Stat({ value, suffix, prefix = '', label, sublabel, delay }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const count = useCountUp(value, 1600, on)

  useEffect(() => {
    // Trigger once the section becomes visible (parent is translated into view)
    const timer = setTimeout(() => setOn(true), delay * 1000 + 300)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center text-center"
    >
      {/* Number */}
      <div className="flex items-end justify-center gap-1 leading-none mb-2">
        <span
          className="font-display tabular-nums"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
            background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 50%, #c9a84c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          {prefix}{count.toLocaleString('es-AR')}
        </span>
        {suffix && (
          <span
            className="font-display pb-1"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.6rem)',
              background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 50%, #c9a84c 100%)',
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
      <div className="text-white text-xs font-semibold tracking-widest uppercase mb-1">{label}</div>
      {sublabel && <div className="text-hub-muted text-xs tracking-wide">{sublabel}</div>}
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative h-screen flex flex-col overflow-hidden bg-hub-dark"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 55%, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/40 to-transparent" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/20 to-transparent" />

      {/* Ghost "6" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-display leading-none"
          style={{ fontSize: 'clamp(16rem, 40vw, 40rem)', color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.04)' }}
        >6</span>
      </div>

      {/* Content — pushed below navbar with pt */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-20 px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12 lg:mb-16"
        >
          <span className="w-10 h-px bg-hub-gold/50" />
          <span className="text-hub-gold text-xs font-semibold tracking-[0.35em] uppercase">HUB en Números</span>
          <span className="w-10 h-px bg-hub-gold/50" />
        </motion.div>

        {/* 4 stats — 2 cols on mobile, 4 on desktop, with dividers */}
        <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4">
          {/* Stats */}
          {[
            { value: 6,      suffix: '',    label: 'Parques',    sublabel: 'En todo el país',   delay: 0    },
            { value: 285000, suffix: ' m²', label: 'Superficie', sublabel: 'Total disponible',  delay: 0.12 },
            { value: 8,      suffix: '%',   label: 'ROI Anual',  sublabel: 'En dólares · base', delay: 0.24 },
            { value: 40,     suffix: '+',   label: 'Empresas',   sublabel: 'Proyectadas',        delay: 0.36 },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-6 lg:px-8 ${
                i < 3 ? 'border-r border-hub-gold/10' : ''
              } ${i >= 2 ? 'border-t border-hub-gold/10 lg:border-t-0' : ''}`}
            >
              <Stat {...s} />
            </div>
          ))}
        </div>

        {/* Bottom line + tagline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 lg:mt-16 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-hub-gold/30 to-transparent origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-hub-muted text-sm mt-5 tracking-wide text-center"
        >
          Infraestructura industrial de clase mundial en las principales regiones productivas de Argentina.
        </motion.p>
      </div>
    </section>
  )
}
