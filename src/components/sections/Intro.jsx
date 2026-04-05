import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FRAME_BG    = '/intro-bg.jpg'
const FONT        = '"Barlow", sans-serif'
const FONT_WEIGHT = 700
const LETTER_SIZE     = 'clamp(9rem, 22vw, 18rem)'
const LETTER_SIZE_HUB = 'clamp(7rem, 17vw, 10rem)'
const LETTER_LS   = '0.1em'
const LETTER_CLR  = '#8a9099'

/*
  TIMELINE
  0.0 — H sola, fade in suave
  2.8 — Crossfade directo al fondo con HUB
  4.6 — Tagline + scroll
*/

export default function Intro() {
  const [phase, setPhase] = useState('h') // 'h' | 'hub' | 'done'

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('hub'),  2800),
      setTimeout(() => setPhase('done'), 4600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const onHub = phase === 'hub' || phase === 'done'

  return (
    <section
      id="intro"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#112438fa' }}
    >

      {/* ── FONDO foto parque — fade in cuando pasa a hub ───────────────── */}
      <AnimatePresence>
        {onHub && (
          <motion.div
            key="bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
          >
            <img
              src={FRAME_BG}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0.55) brightness(0.39)' }}
            />
            <div className="absolute inset-0" style={{
              // background: 'linear-gradient(to bottom, rgba(17,36,56,0.4) 0%, rgba(17,36,56,0.28) 32%, rgba(17,36,56,0.65) 58%, rgba(17,36,56,0.95) 75%, rgba(17,36,56,1.0) 80%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 100% 90% at 50% 42%, transparent 20%, rgba(17,36,56,0.72) 100%)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LETRAS — mismo contenedor, mismo lugar, todo el tiempo ─────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        {/* Fase H: solo la H */}
        <AnimatePresence mode="wait">
          {!onHub ? (
            <motion.span
              key="h-only"
              initial={{ opacity: 0, filter: 'blur(14px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: FONT,
                fontWeight: FONT_WEIGHT,
                fontSize: LETTER_SIZE,
                color: LETTER_CLR,
                letterSpacing: LETTER_LS,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              H
            </motion.span>
          ) : (
            <motion.span
              key="hub-word"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: FONT,
                fontWeight: FONT_WEIGHT,
                fontSize: LETTER_SIZE_HUB,
                color: LETTER_CLR,
                letterSpacing: LETTER_LS,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              HUB
            </motion.span>
          )}
        </AnimatePresence>

        {/* Tagline — aparece en fase final */}
        <AnimatePresence>
          {onHub && (
            <motion.div
              key="tagline"
              className="flex flex-col items-center gap-3 mt-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ width: 'clamp(3rem, 6vw, 5rem)', height: '1px', background: 'rgba(138,144,153,0.28)' }} />
              <svg width="5" height="5" viewBox="0 0 6 6" style={{ opacity: 0.3 }}>
                <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="rgba(138,144,153,0.9)" />
              </svg>
              <p style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 'clamp(0.45rem, 0.75vw, 0.6rem)',
                color: LETTER_CLR,
                opacity: 2,
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
              }}>
                Parques Industriales · Mendoza
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Esquineros ──────────────────────────────────────────────────── */}
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
            ...pos, width: 22, height: 22,
            borderTop:    pos.bottom === undefined ? '2px solid rgba(138,144,153,0.32)' : undefined,
            borderBottom: pos.top    === undefined ? '2px solid rgba(138,144,153,0.32)' : undefined,
            borderLeft:   pos.right  === undefined ? '2px solid rgba(138,144,153,0.32)' : undefined,
            borderRight:  pos.left   === undefined ? '2px solid rgba(138,144,153,0.32)' : undefined,
          }}
        />
      ))}

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span style={{
              fontFamily: FONT,
              fontWeight: 300,
              fontSize: '0.52rem',
              color: LETTER_CLR,
              opacity: 0.28,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(138,144,153,0.4), transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
