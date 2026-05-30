import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionFrame from '../ui/SectionFrame'
import AnimatedIcon from '../ui/AnimatedIcon'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 01.webp'

// Grilla unificada: infra (0-3) + sustain (4-7), separadas por divider en el render
const FEATURES = [
  { label: 'Módulos flexibles',      icon: ['M3 9l9-6 9 6v8l-9 6-9-6V9z', 'M12 21V9', 'M3.27 6.96L12 12l8.73-5.04'] },
  { label: 'Oficinas integradas',    icon: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'] },
  { label: 'Pavimentos industriales',icon: ['M3 20h18', 'M3 15h18', 'M3 10h18'] },
  { label: 'Tránsito diferenciado',  icon: ['M1 3h15v11H1z', 'M16 8h4l3 3v3h-7V8z', 'M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0', 'M17 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0'] },
  // — sustentabilidad —
  { label: 'Energías renovables',    icon: ['M12 8a4 4 0 0 0 0 8 4 4 0 0 0 0-8z', 'M12 2v2', 'M12 20v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M2 12h2', 'M20 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'] },
  { label: 'Fibra óptica',           icon: ['M1.42 9a16 16 0 0 1 21.16 0', 'M5 12.55a11 11 0 0 1 14.08 0', 'M8.53 16.11a6 6 0 0 1 6.95 0', 'M12 20h.01'] },
  { label: 'Control de energía',     icon: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'] },
  { label: 'Reutilización de aguas', icon: ['M12 2s-7 7.6-7 12a7 7 0 0 0 14 0c0-4.4-7-12-7-12z'] },
]
const INFRA_COUNT = 4

const specs = [
  { value: 'AAA',  label: 'Estándar Triple A' },
  { value: 'CERT', label: 'Certificables' },
  { value: 'FLEX', label: 'Módulos adaptables' },
  { value: 'RED',  label: 'Sistema integrado de 5 parques' },
]

const reasons = [
  {
    num: '01',
    title: 'Recepción de mercadería',
    desc: 'Docks de carga y playas de maniobras diseñadas para recibir, clasificar y distribuir mercadería de forma ordenada y eficiente.',
    // Arrow down to line = incoming goods
    icon: ['M12 3v15', 'M5 15l7 7 7-7', 'M3 22h18'],
  },
  {
    num: '02',
    title: 'Almacenamiento flexible',
    desc: 'Módulos que se adaptan al volumen de tu operación. Crecés dentro del mismo HUB sin cambiar de dirección.',
    // Package / box
    icon: ['M3 9l9-6 9 6v8l-9 6-9-6V9z', 'M12 21V9', 'M3.27 6.96L12 12l8.73-5.04'],
  },
  {
    num: '03',
    title: 'Infraestructura operativa',
    desc: 'Tránsito diferenciado para vehículos de carga y tráfico liviano, estacionamiento propio para camiones, oficinas integradas y pavimentos industriales.',
    // Building / warehouse
    icon: ['M3 21h18', 'M3 21V11l9-7 9 7v10', 'M9 21v-6h6v6'],
  },
  {
    num: '04',
    title: 'Operaciones de última milla',
    desc: 'Ubicaciones sobre Acceso Sur, Ruta 7 y Ruta 40, a minutos de centros urbanos clave. Rutas de distribución optimizadas hacia Buenos Aires, Chile y todo Cuyo.',
    // Map pin
    icon: ['M12 22s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z', 'M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4'],
  },
]

function ReasonsList() {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="flex flex-col gap-3">
      {reasons.map((r, i) => (
        <motion.div
          key={r.num}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          className="relative flex gap-4 p-4 border bg-theme-card overflow-hidden group cursor-default transition-all duration-300"
          style={{ borderColor: 'var(--border)' }}
          whileHover={{ borderColor: 'var(--border-accent)', backgroundColor: 'var(--bg-card-alt)' }}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
        >
          <div className="shrink-0 w-0.5 self-stretch transition-all duration-300" style={{ background: 'linear-gradient(to bottom, var(--text-accent), var(--border))' }} />
          <div className="relative flex gap-3 items-center w-full">
            <AnimatedIcon
              paths={r.icon}
              size={20}
              strokeWidth={1.5}
              className="shrink-0 text-theme-accent transition-transform duration-300 group-hover:scale-110"
              isHovered={hovered === i}
            />
            <div>
              <p className="text-theme text-sm font-semibold mb-1">{r.title}</p>
              <p className="text-theme-muted text-xs leading-relaxed">{r.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function FeaturesGrid() {
  const [hovered, setHovered] = useState(null)

  const divider = (
    <div key="__divider" className="col-span-2 flex items-center gap-2 my-0.5">
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      <span className="text-[9px] font-semibold tracking-widest uppercase font-condensed" style={{ color: 'var(--text-subtle)' }}>Sustentabilidad</span>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )

  const tiles = FEATURES.map((item, i) => (
    <div
      key={item.label}
      className="flex items-center gap-2.5 p-3 border bg-theme-card cursor-default"
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      <AnimatedIcon
        paths={item.icon}
        size={i < INFRA_COUNT ? 22 : 18}
        strokeWidth={1.5}
        className={`shrink-0 ${i < INFRA_COUNT ? 'text-theme-accent' : 'text-theme-accent/70'}`}
        isHovered={hovered === i}
      />
      <span className="text-theme-muted text-xs leading-tight">{item.label}</span>
    </div>
  ))

  return (
    <div>
      <p className="text-theme-accent text-[10px] font-semibold tracking-widest uppercase mb-3 font-condensed">
        Infraestructura &amp; Sustentabilidad
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[...tiles.slice(0, INFRA_COUNT), divider, ...tiles.slice(INFRA_COUNT)]}
      </div>
    </div>
  )
}

export default function ForCompanies() {
  return (
    <section id="companies" className="hub-bg-h relative lg:min-h-svh flex flex-col overflow-hidden bg-theme lg:py-0">
      {/* Background layers */}
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(2,42,58,0.10) 0%, transparent 60%)' }} />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent" />

      {/* ── Main content ── */}
      <div className="relative flex flex-col justify-center flex-1 w-full max-w-[95vw] 3xl:max-w-[1700px] mx-auto px-5 sm:px-8 xl:px-10 3xl:px-16 py-8 lg:py-8">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-theme-accent" />
            <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">HUB · Para Empresas</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-theme leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.6rem)', fontWeight: 800 }}
            >
              UNA RED PENSADA <span className="text-gradient-electric">PARA LA EFICIENCIA</span>
            </h2>
            <p className="text-theme-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              Naves logísticas Triple A en los principales corredores de Mendoza —
              <span className="text-theme"> Acceso Sur · Ruta 7 · Ruta 40.</span>
            </p>
          </div>
        </motion.div>

        {/* ── Image strip + specs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6 lg:mb-8"
        >
          <div className="relative h-52 lg:h-56 overflow-hidden">
            <img
              src={malabiaImg}
              alt="HUB Nave Industrial — Centro de Servicios"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.55) saturate(0.85)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-hub-ink-deep/85 via-transparent to-hub-ink-deep/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-hub-ink-deep/75 to-transparent" />

            {/* Specs overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 sm:grid-cols-4 backdrop-blur-sm"
              style={{
                borderTop: '1px solid rgba(199,200,202,0.25)',
                backgroundColor: 'rgba(1,24,35,0.55)',
              }}
            >
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center text-center py-2.5 lg:py-3 px-2"
                  style={{
                    borderRight: i < specs.length - 1 ? '1px solid rgba(199,200,202,0.18)' : 'none',
                  }}
                >
                  <span className="font-display text-hub-silver leading-none" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)', fontWeight: 800 }}>{s.value}</span>
                  <span className="text-hub-silver/55 text-[10px] mt-0.5 font-condensed">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(199,200,202,0.35)' }} />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(199,200,202,0.35)' }} />
          </div>
        </motion.div>

        {/* ── Two-column: reasons + services ── */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8">

          {/* Left: 4 reasons */}
          <ReasonsList />

          {/* Right: icon grid + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <FeaturesGrid />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-auto justify-center">
              <a
                href="#contact"
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase transition-opacity duration-200 hover:opacity-90 font-condensed"
                style={{ backgroundColor: 'var(--text-accent)', color: 'var(--bg-primary)' }}
              >
                Consultar disponibilidad
              </a>
              <a
                href="#projects"
                className="px-5 py-3 border text-theme-accent text-xs font-semibold tracking-widest uppercase hover:bg-theme-card transition-all duration-200 font-condensed"
                style={{ borderColor: 'var(--border-accent)' }}
              >
                Ver proyectos →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
