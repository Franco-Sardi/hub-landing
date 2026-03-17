import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { id: 0, image: '/assets/slide-1.jpg', location: 'Córdoba Norte', area: '45.000 m²' },
  { id: 1, image: '/assets/slide-2.jpg', location: 'Rosario Logístico', area: '62.000 m²' },
  { id: 2, image: '/assets/slide-3.jpg', location: 'Buenos Aires Sur', area: '78.000 m²' },
  { id: 3, image: '/assets/slide-4.jpg', location: 'Mendoza Industrial', area: '38.000 m²' },
  { id: 4, image: '/assets/slide-5.jpg', location: 'Patagonia Sur', area: '33.000 m²' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-auto lg:h-screen flex flex-col items-center justify-start lg:justify-center overflow-hidden bg-hub-black pt-20 pb-10 lg:pt-0 lg:pb-0"
    >
      {/* Photo carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,17,23,0.50) 0%, rgba(15,17,23,0.40) 35%, rgba(15,17,23,0.70) 75%, rgba(15,17,23,0.97) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-25" />

      {/* Gold accent lines */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/50 to-transparent" />

      {/* Corner marks */}
      <div className="absolute top-24 left-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-l border-hub-gold/50" />
      </div>
      <div className="absolute top-24 right-10 hidden lg:block">
        <div className="w-7 h-7 border-t border-r border-hub-gold/50" />
      </div>

      {/* Ghost lettering */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.07)',
          }}
        >
          HUB
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-3 mb-6">
          <span className="w-10 h-px bg-hub-gold/70" />
          <span className="font-body text-hub-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Parques Industriales · Argentina
          </span>
          <span className="w-10 h-px bg-hub-gold/70" />
        </motion.div>

        <motion.h1
          {...fadeUp(0.12)}
          className="font-display text-white leading-[0.92] mb-5"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <span className="block tracking-wider">CONSTRUIMOS</span>
          <span
            className="block tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ARGENTINA
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.24)}
          className="text-white/70 text-base lg:text-lg max-w-xl mx-auto mb-9 leading-relaxed font-light"
        >
          6 parques estratégicos en todo el país. Rentabilidad en dólares
          para inversores. Espacio llave en mano para empresas líderes.
        </motion.p>

        <motion.div {...fadeUp(0.36)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#investors"
            className="group relative px-9 py-3.5 bg-hub-gold text-hub-black font-semibold text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.5)]"
          >
            <span className="relative z-10">Invertí con HUB</span>
            <div className="absolute inset-0 bg-hub-gold-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href="#companies"
            className="px-9 py-3.5 border border-white/40 text-white font-semibold text-xs tracking-widest uppercase backdrop-blur-sm hover:border-hub-gold hover:text-hub-gold transition-all duration-300"
          >
            Sumá tu Empresa
          </a>
        </motion.div>

        {/* Slide indicator */}
        <motion.div {...fadeUp(0.48)} className="flex flex-col items-center gap-2.5">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-white/40 text-xs tracking-widest uppercase"
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
                  i === current ? 'w-6 h-1.5 bg-hub-gold' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/55'
                }`}
                aria-label={`Ir a ${s.location}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-hub-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}
