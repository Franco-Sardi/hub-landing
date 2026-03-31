import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import anchorenaImg from '../../assets/HUB MZA - Anchorena - Naves - 01.png'
import sfdmEsteImg from '../../assets/HUB MZA - SFDM - Ante proyecto - TERRENO 02 - render conceptual - Ver 01-B - RENDER.png'
import sfdmOesteImg from '../../assets/HUB MZA - SFDM - Ante proyecto - ver 01 - RENDERS CONCEPTO - 2.png'
import rodriguezPenaImg from '../../assets/CRP - PROYECTO NAVE LOGÍSTICA - RENDER AEREO.png'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER AEREO.png'

const slides = [
  { id: 0, image: anchorenaImg,      location: 'Luján de Cuyo, Mendoza',            area: '84.025 mts' },
  { id: 1, image: sfdmEsteImg,       location: 'San Francisco del Monte, Mendoza',  area: '33.546 mts' },
  { id: 2, image: sfdmOesteImg,      location: 'San Francisco del Monte, Mendoza',  area: '79.968 mts' },
  { id: 3, image: rodriguezPenaImg,  location: 'Rodríguez Peña, Mendoza',           area: '107.086 mts' },
  { id: 4, image: malabiaImg,        location: 'Luján de Cuyo, Mendoza',            area: '44.000 mts' },
]

// Blueprint SVG grid overlay
function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.06 }}
    >
      <defs>
        <pattern id="bp-small" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#152a4e" strokeWidth="0.5" />
        </pattern>
        <pattern id="bp-large" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#bp-small)" />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#1e3a68" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-large)" />
      {/* Cross marks at intersections */}
      {[200, 400, 600, 800].map((x) =>
        [200, 400, 600].map((y) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#1e3a68" strokeWidth="0.8" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#1e3a68" strokeWidth="0.8" />
          </g>
        ))
      )}
    </svg>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-dvh flex flex-col items-center justify-center overflow-hidden bg-hub-black"
    >
      {/* Photo carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Multi-layer overlay — darker, more cinematic */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,13,20,0.55) 0%, rgba(10,13,20,0.38) 30%, rgba(10,13,20,0.65) 70%, rgba(10,13,20,0.98) 100%)',
        }}
      />
      {/* Side vignettes */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(10,13,20,0.4) 0%, transparent 30%, transparent 70%, rgba(10,13,20,0.4) 100%)' }}
      />

      {/* Blueprint grid overlay */}
      <BlueprintGrid />

      {/* Blue accent top line */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-electric/40 to-transparent" />
      {/* Azure accent line below gold */}
      <div className="absolute top-0 w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(13,42,78,0.6) 50%, transparent 100%)', height: '2px', top: '1px' }}
      />

      {/* Corner marks */}
      <div className="absolute top-24 left-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-l border-hub-azure/60" />
      </div>
      <div className="absolute top-24 right-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-r border-hub-azure/60" />
      </div>

      {/* Ghost "HUB" lettering */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(13,42,78,0.18)',
          }}
        >
          HUB
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto px-5 sm:px-8 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 mb-3 lg:mb-6"
        >
          <span className="w-6 lg:w-10 h-px bg-hub-electric/70" />
          <span className="font-body text-hub-bright text-[10px] lg:text-xs font-semibold tracking-[0.25em] lg:tracking-[0.35em] uppercase">
            Parques Industriales · Mendoza
          </span>
          <span className="w-6 lg:w-10 h-px bg-hub-electric/70" />
        </motion.div>

        {/* Kinetic headline — each word from a different direction */}
        <div
          className="font-display text-white leading-[0.88] mb-3 lg:mb-6 overflow-hidden"
          style={{ fontSize: 'clamp(2rem, 7vw, 6.5rem)' }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-wider"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              CONSTRUIMOS
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-wider"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 45%, #4a87f5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EL FUTURO
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-wider text-white/90"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              INDUSTRIAL
            </motion.span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/65 text-xs lg:text-lg max-w-xl mx-auto mb-4 lg:mb-7 leading-relaxed font-light"
        >
          5 parques estratégicos en Mendoza. Red de infraestructura
          y servicios para tu empresa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center justify-center gap-2.5 lg:gap-4 mb-5 lg:mb-10"
        >
          <a
            href="#contact"
            className="group relative sm:w-auto px-6 py-2.5 lg:px-9 lg:py-3.5 bg-hub-electric text-white font-semibold text-[11px] tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(30,92,212,0.45)] text-center"
          >
            <span className="relative z-10">Invertí con HUB</span>
            <div className="absolute inset-0 bg-hub-bright translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href="#companies"
            className="sm:w-auto px-6 py-2.5 lg:px-9 lg:py-3.5 border border-hub-azure text-white font-semibold text-[11px] tracking-widest uppercase backdrop-blur-sm hover:border-hub-azure-light hover:bg-hub-azure/15 transition-all duration-300 text-center"
          >
            Sumá tu Empresa
          </a>
        </motion.div>

        {/* Slide indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-2.5"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-white/35 text-xs tracking-widest uppercase"
            >
              {slides[current].location} · {slides[current].area}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-6 h-1.5 bg-hub-electric' : 'w-1.5 h-1.5 bg-hub-azure hover:bg-hub-azure-light'
                }`}
                aria-label={`Ir a ${s.location}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic coordinates — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-8 hidden lg:flex items-center gap-2"
      >
        <div className="w-1 h-8 bg-hub-azure/50" />
        <div>
          <p className="text-hub-muted/50 text-xs font-mono tracking-widest leading-tight">LAT -32.89°</p>
          <p className="text-hub-muted/50 text-xs font-mono tracking-widest leading-tight">LON -68.84°</p>
        </div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-hub-electric/50 to-transparent" />
      </motion.div>
    </section>
  )
}
