import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FRAME_BG = '/intro-bg.jpg'
// El logo oficial (navy sobre transparente) → invertido a silver para fondo oscuro
const LOGO_FILTER = 'brightness(0) invert(79%)'

/*
  TIMELINE
  0.0 — Logo oficial fade in (fondo navy)
  2.2 — Foto parque aparece detrás
  4.0 — Tagline + scroll indicator
*/

export default function Intro() {
  const [phase, setPhase] = useState('logo') // 'logo' | 'bg' | 'done'

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('bg'),   2200),
      setTimeout(() => setPhase('done'), 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const showBg = phase === 'bg' || phase === 'done'

  return (
    <section
      id="intro"
      className="relative w-full h-dvh overflow-hidden"
      style={{ backgroundColor: '#022A3A' }}
    >
      {/* ── Fondo foto parque ─────────────────────────────────────── */}
      <AnimatePresence>
        {showBg && (
          <motion.div
            key="bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          >
            <img
              src={FRAME_BG}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0.55) brightness(0.38)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 100% 90% at 50% 42%, transparent 20%, rgba(2,42,58,0.85) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logo oficial + tagline ────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        {/* Logo PNG oficial — tipografía correcta (Boldrini & Ficcardi) */}
        <motion.img
          src="/hub-logo-oficial.png"
          alt="HUB"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 'clamp(4.5rem, 11vw, 8.5rem)',
            width: 'auto',
            filter: LOGO_FILTER,
          }}
        />

        {/* Tagline — aparece con la foto */}
        <AnimatePresence>
          {showBg && (
            <motion.div
              key="tagline"
              className="flex flex-col items-center gap-3 mt-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  width: 'clamp(3rem, 6vw, 5rem)',
                  height: '1px',
                  background: 'rgba(199,200,202,0.28)',
                }}
              />
              <p
                style={{
                  fontFamily: '"Roboto Condensed", "Roboto", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)',
                  color: '#C7C8CA',
                  letterSpacing: '0.52em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                Naves Logísticas · Mendoza
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Esquineros ───────────────────────────────────────────── */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
          style={{
            ...pos,
            width: 22,
            height: 22,
            borderTop:    pos.bottom === undefined ? '2px solid rgba(199,200,202,0.32)' : undefined,
            borderBottom: pos.top    === undefined ? '2px solid rgba(199,200,202,0.32)' : undefined,
            borderLeft:   pos.right  === undefined ? '2px solid rgba(199,200,202,0.32)' : undefined,
            borderRight:  pos.left   === undefined ? '2px solid rgba(199,200,202,0.32)' : undefined,
          }}
        />
      ))}

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span
              style={{
                fontFamily: '"Roboto Condensed", sans-serif',
                fontWeight: 300,
                fontSize: '0.52rem',
                color: '#C7C8CA',
                opacity: 0.28,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 1,
                height: 32,
                background: 'linear-gradient(to bottom, rgba(199,200,202,0.4), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
