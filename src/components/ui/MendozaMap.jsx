import { motion } from 'framer-motion'
import mapImg from '../../assets/mapa-dark.webp'

// Posiciones calibradas por el usuario en modo debug
// Color dorado para todos los marcadores
const MARKER_COLOR = '#c9a84c'

const PARK_POS = {
  1: { left: 41.2, top: 55.2, label: 'ANCHORENA',      lx:  65, ly: -2  },
  2: { left: 64.4, top: 53.3, label: 'SFDM ESTE',      lx:  12, ly: -30 },
  3: { left: 72.0, top: 57.9, label: 'SFDM OESTE',     lx:  12, ly: -30 },
  4: { left: 56.6, top: 50.8, label: 'RODRÍGUEZ PEÑA', lx:  65, ly: -2  },
  5: { left: 41.9, top: 44.2, label: 'MALABIA',        lx: -70, ly: -2  },
}

export { MARKER_COLOR }

export default function MendozaMap({ projects, activeId, onHover, onSelect }) {
  return (
    <div className="w-full relative" style={{ background: '#0b1520' }}>
      <img
        src={mapImg}
        alt="Mapa red HUB Mendoza"
        className="w-full h-auto block"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
        draggable={false}
      />

      {projects.map((p) => {
        const pos = PARK_POS[p.id]
        if (!pos) return null
        const isActive = activeId === p.id
        const color = MARKER_COLOR
        const isRight = pos.lx >= 0

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 20 : 10,
              cursor: 'pointer',
            }}
            onMouseEnter={() => onHover(p.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(p.id)}
            onTouchEnd={(e) => { e.preventDefault(); onSelect(p.id) }}
          >
            {isActive && (
              <motion.div
                className="absolute rounded-full"
                style={{ inset: -10, border: `1.5px solid ${color}` }}
                initial={{ opacity: 0.8, scale: 0.5 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            <div
              className="rounded-full transition-all duration-200"
              style={{
                width: isActive ? 16 : 11,
                height: isActive ? 16 : 11,
                margin: isActive ? 0 : 2.5,
                border: `2px solid ${isActive ? color : color + 'b3'}`,
                background: isActive ? color : color + '73',
                boxShadow: isActive ? `0 0 12px 3px ${color}b3` : 'none',
              }}
            />

            <svg
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
              width="0" height="0"
            >
              <line
                x1="0" y1="0" x2={pos.lx} y2={pos.ly}
                stroke={isActive ? color + 'b3' : color + '4d'}
                strokeWidth="1" strokeDasharray="3,2"
              />
              <circle cx={pos.lx} cy={pos.ly} r="1.5"
                fill={isActive ? color : color + '73'} />
              <rect
                x={isRight ? pos.lx + 4 : pos.lx - pos.label.length * 6.5 - 14}
                y={pos.ly - 9}
                width={pos.label.length * 6.5 + 10}
                height="18" rx="2"
                fill={isActive ? color + '30' : 'rgba(11,21,32,0.88)'}
                stroke={isActive ? color + '80' : color + '30'}
                strokeWidth="0.8"
              />
              <text
                x={isRight ? pos.lx + 9 : pos.lx - 9}
                y={pos.ly + 1}
                fill={isActive ? color : color + 'dd'}
                fontSize="10"
                fontFamily="'Bebas Neue', sans-serif"
                letterSpacing="0.6"
                textAnchor={isRight ? 'start' : 'end'}
                dominantBaseline="middle"
                style={{ filter: isActive ? `drop-shadow(0 0 3px ${color}99)` : 'none' }}
              >{pos.label}</text>
            </svg>
          </div>
        )
      })}
    </div>
  )
}
