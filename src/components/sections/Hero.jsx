import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import anchorenaImg from '../../assets/WhatsApp Image 2026-05-06 at 7.50.21 PM (1).jpeg'
import sfdmEsteImg from '../../assets/HUB MZA - SFDM - Ante proyecto - TERRENO 02 - render conceptual - Ver 01-B - RENDER.webp'
import sfdmOesteImg from '../../assets/HUB MZA - SFDM - Ante proyecto - ver 01 - RENDERS CONCEPTO - 2.webp'
import rodriguezPenaImg from '../../assets/CRP - PROYECTO NAVE LOGÍSTICA - RENDER AEREO.webp'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER AEREO.webp'

const slides = [
  { id: 0, image: anchorenaImg,      location: 'HUB 01 · Anchorena',                    area: '84.025 m² terreno', position: 'center top' },
  { id: 1, image: sfdmEsteImg,       location: 'HUB 02 · San Francisco del Monte Este', area: '33.546 m² terreno', position: 'center' },
  { id: 2, image: malabiaImg,        location: 'HUB 03 · Malabia',                      area: '64.070 m² terreno', position: 'center' },
  { id: 3, image: rodriguezPenaImg,  location: 'HUB 04 · Rodríguez Peña Este',          area: '80.000 m² terreno', position: 'center' },
  { id: 4, image: sfdmOesteImg,      location: 'HUB 05 · San Francisco del Monte Oeste',area: '72.968 m² terreno', position: 'center' },
]

// Blueprint SVG grid overlay — trazado técnico sobre fondo (paleta oficial)
function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.08 }}
    >
      <defs>
        <pattern id="bp-small" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C7C8CA" strokeWidth="0.5" />
        </pattern>
        <pattern id="bp-large" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#bp-small)" />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#C7C8CA" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-large)" />
      {[200, 400, 600, 800].map((x) =>
        [200, 400, 600].map((y) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#C7C8CA" strokeWidth="0.8" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#C7C8CA" strokeWidth="0.8" />
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
      className="relative h-svh flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#011823' }}
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
            backgroundImage: `url("${slides[current].image}")`,
            backgroundSize: 'cover',
            backgroundPosition: slides[current].position,
          }}
        />
      </AnimatePresence>

      {/* Multi-layer overlay — navy oficial (#022A3A) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,42,58,0.60) 0%, rgba(2,42,58,0.42) 30%, rgba(2,42,58,0.70) 70%, rgba(1,24,35,0.98) 100%)',
        }}
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(2,42,58,0.40) 0%, transparent 30%, transparent 70%, rgba(2,42,58,0.40) 100%)' }}
      />

      {/* Blueprint grid overlay */}
      <BlueprintGrid />

      {/* Accent top lines */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-silver/40 to-transparent" />
      <div className="absolute top-0 w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(199,200,202,0.25) 50%, transparent 100%)', height: '2px', top: '1px' }}
      />

      {/* Corner marks */}
      <div className="absolute top-24 left-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-l border-hub-silver/50" />
      </div>
      <div className="absolute top-24 right-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-r border-hub-silver/50" />
      </div>

      {/* Ghost "HUB" lettering — respetando el logo del manual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(199,200,202,0.15)',
            fontWeight: 800,
          }}
        >
          HUB
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl xl:max-w-6xl 3xl:max-w-[1600px] mx-auto px-5 sm:px-8 3xl:px-16 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 mb-3 lg:mb-6"
        >
          <span className="w-6 lg:w-10 h-px bg-hub-silver/70" />
          <span className="font-condensed text-hub-silver text-[10px] lg:text-xs font-semibold tracking-[0.25em] lg:tracking-[0.35em] uppercase">
            Naves Logísticas · Mendoza
          </span>
          <span className="w-6 lg:w-10 h-px bg-hub-silver/70" />
        </motion.div>

        {/* Kinetic headline — del brochure: RED DE INFRAESTRUCTURA Y SERVICIOS PARA TU EMPRESA */}
        <div
          className="font-display text-hub-silver leading-[0.9] mb-3 lg:mb-6 overflow-hidden"
          style={{ fontSize: 'clamp(1.6rem, 5.2vw, 7rem)', fontWeight: 700 }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-widest"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'rgba(199,200,202,0.82)' }}
            >
              RED DE INFRAESTRUCTURA
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-widest"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'rgba(199,200,202,0.82)' }}
            >
              Y SERVICIOS PARA
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block tracking-widest"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: '#E5E6E8',
                fontSize: '1.18em',
                fontWeight: 800,
                letterSpacing: '0.04em',
              }}
            >
              TU EMPRESA
            </motion.span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-hub-silver/60 text-xs lg:text-base max-w-xl mx-auto mb-4 lg:mb-7 leading-relaxed font-light tracking-wider"
        >
          335.000 m² de terreno · 178.000 m² de naves industriales inteligentes en Mendoza
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 lg:gap-4 mb-5 lg:mb-10"
        >
          <a
            href="#contact"
            className="group relative w-full sm:w-auto px-6 py-3 lg:px-9 lg:py-3.5 font-semibold text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 text-center font-condensed"
            style={{
              backgroundColor: '#C7C8CA',
              color: '#022A3A',
              border: '1px solid #C7C8CA',
            }}
          >
            <span className="relative z-10">Consultar participación</span>
          </a>
          <a
            href="#investors"
            className="w-full sm:w-auto px-6 py-3 lg:px-9 lg:py-3.5 border text-hub-silver font-semibold text-xs tracking-widest uppercase backdrop-blur-sm hover:bg-hub-silver/10 transition-all duration-300 text-center font-condensed"
            style={{ borderColor: 'rgba(199,200,202,0.50)' }}
          >
            Conocer el modelo →
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
              className="text-hub-silver/40 text-xs tracking-widest uppercase font-condensed"
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
                  i === current
                    ? 'w-6 h-1.5 bg-hub-silver'
                    : 'w-1.5 h-1.5 bg-hub-silver/30 hover:bg-hub-silver/60'
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
        <div className="w-1 h-8 bg-hub-silver/40" />
        <div>
          <p className="text-hub-silver/50 text-xs font-mono tracking-widest leading-tight">LAT -32.89°</p>
          <p className="text-hub-silver/50 text-xs font-mono tracking-widest leading-tight">LON -68.84°</p>
        </div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-hub-silver/60 to-transparent" />
      </motion.div>
    </section>
  )
}
