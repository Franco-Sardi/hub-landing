import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_COLOR  = '#1c2535'   // navy brochure
const TEXT_COLOR = '#b8bfc8'   // silver-gray brochure

export default function IntroAnimation({ onComplete }) {
  // phases: 'h' → 'hub' → 'tagline' → 'exit'
  const [phase, setPhase] = useState('h')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hub'),     950)
    const t2 = setTimeout(() => setPhase('tagline'), 1650)
    const t3 = setTimeout(() => setPhase('exit'),    2600)
    const t4 = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 80)
    }, 3300)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: NAV_COLOR }}
          animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
          transition={phase === 'exit' ? { duration: 0.7, ease: 'easeInOut' } : {}}
        >

          {/* ── Esquineros del marco — igual que en Stats ── */}
          {[
            { top: 20, left: 20 },
            { top: 20, right: 20 },
            { bottom: 20, left: 20 },
            { bottom: 20, right: 20 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'exit' ? 0 : 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              style={{
                ...pos,
                width: 22,
                height: 22,
                borderTop:    pos.bottom === undefined ? '2px solid rgba(184,191,200,0.4)' : undefined,
                borderBottom: pos.top    === undefined ? '2px solid rgba(184,191,200,0.4)' : undefined,
                borderLeft:   pos.right  === undefined ? '2px solid rgba(184,191,200,0.4)' : undefined,
                borderRight:  pos.left   === undefined ? '2px solid rgba(184,191,200,0.4)' : undefined,
              }}
            />
          ))}

          {/* ── Letras HUB ── */}
          <div className="flex items-end justify-center">

            {/* H — aparece primero, con blur cinematográfico */}
            <motion.span
              className="font-display select-none"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
              animate={{
                opacity: 1,
                scale: phase === 'exit' ? 1.06 : 1,
                filter: 'blur(0px)',
              }}
              transition={{
                opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                scale:   { duration: phase === 'exit' ? 0.7 : 0.9, ease: [0.16, 1, 0.3, 1] },
                filter:  { duration: 0.7, ease: 'easeOut' },
              }}
              style={{
                fontSize: 'clamp(7rem, 18vw, 14rem)',
                color: TEXT_COLOR,
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              H
            </motion.span>

            {/* U — slide desde derecha */}
            <AnimatePresence>
              {phase !== 'h' && (
                <motion.span
                  className="font-display select-none"
                  initial={{ opacity: 0, x: 50, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: phase === 'exit' ? 1.06 : 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 14rem)',
                    color: TEXT_COLOR,
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                  }}
                >
                  U
                </motion.span>
              )}
            </AnimatePresence>

            {/* B — slide desde derecha, stagger */}
            <AnimatePresence>
              {phase !== 'h' && (
                <motion.span
                  className="font-display select-none"
                  initial={{ opacity: 0, x: 50, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: phase === 'exit' ? 1.06 : 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 14rem)',
                    color: TEXT_COLOR,
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                  }}
                >
                  B
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ── Línea decorativa bajo HUB ── */}
          <AnimatePresence>
            {(phase === 'tagline' || phase === 'exit') && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: phase === 'exit' ? 0 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: '1.2rem',
                  width: 'clamp(4rem, 10vw, 8rem)',
                  height: '1px',
                  background: `rgba(184,191,200,0.35)`,
                  transformOrigin: 'center',
                }}
              />
            )}
          </AnimatePresence>

          {/* ── Tagline ── */}
          <AnimatePresence>
            {(phase === 'tagline' || phase === 'exit') && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: phase === 'exit' ? 0 : 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="font-display tracking-[0.55em] uppercase"
                style={{
                  marginTop: '0.9rem',
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.78rem)',
                  color: TEXT_COLOR,
                  opacity: 0.45,
                  letterSpacing: '0.55em',
                }}
              >
                Parques Industriales · Mendoza
              </motion.p>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
