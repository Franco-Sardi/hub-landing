import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Posición de cada proyecto como % del tamaño del contenedor.
// Calibrado sobre mendoza-outline.svg (viewBox 400×560).
//
// Para ajustar: hover el punto en el browser e inspeccionar con DevTools,
// o recalcular con:  left% = (svgX / 400) * 100,  top% = (svgY / 560) * 100
//
// Fórmula geográfica para nuevos puntos:
//   svgX = 35.25 + (70.62 - lon°W) × 79.6
//   svgY = 56    + (lat°S - 31.97) × 79.6
//   left% = svgX / 400 * 100
//   top%  = svgY / 560 * 100
// ─────────────────────────────────────────────────────────────────────────────
// Posiciones reales (%) — los 4 del Gran Mendoza están separados visualmente
// para que no se pisen, con una elipse que muestra que son la misma zona.
const PROJECT_POSITIONS = {
  1: { left: 39,   top: 15   },  // Las Heras      — spread arriba-izq
  2: { left: 49,   top: 15   },  // Guaymallén     — spread arriba-der
  3: { left: 35,   top: 23   },  // Luján de Cuyo  — spread abajo-izq
  4: { left: 49,   top: 23   },  // Maipú          — spread abajo-der
  5: { left: 55,   top: 25   },  // San Martín     — este
  6: { left: 69,   top: 54.4 },  // General Alvear — sur
}

export default function MendozaMap({ projects, activeId, onHover, onSelect }) {
  return (
    <div className="relative w-full h-full select-none">
      {/* Imagen de fondo — reemplazar mendoza-outline.svg con el mapa real */}
      <img
        src="/assets/mendoza-outline.svg"
        alt="Mendoza"
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
        draggable={false}
      />

      {/* Elipse Gran Mendoza */}
      <div className="absolute pointer-events-none" style={{
        left: '34%', top: '12%', width: '24%', height: '15%',
        border: '1px dashed rgba(201,168,76,0.25)',
        borderRadius: '50%',
      }} />
      <span className="absolute pointer-events-none text-hub-gold/25 font-display tracking-widest"
        style={{ left: '33%', top: '9%', fontSize: '7px', letterSpacing: '0.15em' }}>
        GRAN MENDOZA
      </span>

      {/* Puntos interactivos — posicionados en % sobre la imagen */}
      {projects.map((p) => {
        const pos = PROJECT_POSITIONS[p.id]
        if (!pos) return null
        const isActive = activeId === p.id
        const color = p.statusColor === 'gold' ? '#c9a84c' : '#4a90d9'
        const colorClass = p.statusColor === 'gold' ? 'text-hub-gold' : 'text-hub-steel'

        return (
          <div
            key={p.id}
            className="absolute cursor-pointer"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              transform: 'translate(-50%, -50%)',
              // Tap target 44×44px mínimo recomendado por Apple/Google
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'manipulation',
            }}
            onMouseEnter={() => onHover(p.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(p.id)}
            onTouchEnd={(e) => { e.preventDefault(); onSelect(p.id) }}
          >
            {/* Pulso animado */}
            {isActive && (
              <motion.span
                className="absolute rounded-full border"
                style={{ borderColor: color, inset: 10 }}
                initial={{ opacity: 0.8, scale: 0.5 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            {/* Anillo exterior */}
            <span
              className="absolute rounded-full border transition-all duration-250"
              style={{
                borderColor: color,
                width: isActive ? 22 : 16,
                height: isActive ? 22 : 16,
                opacity: isActive ? 0.9 : 0.4,
              }}
            />

            {/* Punto central */}
            <span
              className="relative block rounded-full transition-all duration-250"
              style={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                background: color,
                opacity: isActive ? 1 : 0.65,
                boxShadow: isActive ? `0 0 8px 2px ${color}` : 'none',
              }}
            />

            {/* Label — posicionado a 8px del borde del punto, no del contenedor */}
            <span
              className={`absolute whitespace-nowrap text-[9px] font-display tracking-wide transition-opacity duration-250 pointer-events-none ${colorClass}`}
              style={{
                left: pos.left > 60 ? 'auto' : 'calc(50% + 10px)',
                right: pos.left > 60 ? 'calc(50% + 10px)' : 'auto',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: isActive ? 1 : 0.35,
              }}
            >
              {p.location.split(',')[0].toUpperCase()}
            </span>
          </div>
        )
      })}
    </div>
  )
}
