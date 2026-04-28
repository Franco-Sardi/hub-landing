import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 01.webp'
import { commonServices, sustainabilityAttributes } from '../../data/projects'

const specs = [
  { value: 'AAA',  label: 'Estándar Triple A' },
  { value: 'CERT', label: 'Certificables' },
  { value: 'FLEX', label: 'Módulos que se adaptan a tu operación' },
  { value: 'RED',  label: 'Sistema integrado de 5 parques' },
]

const reasons = [
  {
    num: '01',
    title: 'Recepción de mercadería',
    desc: 'Docks de carga y playas de maniobras diseñadas para recibir, clasificar y distribuir mercadería de forma ordenada y eficiente.',
  },
  {
    num: '02',
    title: 'Almacenamiento flexible',
    desc: 'Módulos que se adaptan al volumen de tu operación. Crecés dentro del mismo HUB sin cambiar de dirección.',
  },
  {
    num: '03',
    title: 'Infraestructura operativa',
    desc: 'Tránsito diferenciado para vehículos de carga y tráfico liviano, estacionamiento propio para camiones, oficinas integradas y pavimentos industriales.',
  },
  {
    num: '04',
    title: 'Operaciones de última milla',
    desc: 'Ubicaciones sobre Acceso Sur, Ruta 7 y Ruta 40, a minutos de centros urbanos clave. Rutas de distribución optimizadas hacia Buenos Aires, Chile y todo Cuyo.',
  },
]

export default function ForCompanies() {
  return (
    <section id="companies" className="hub-bg-h relative lg:min-h-dvh flex flex-col overflow-hidden bg-theme py-10 lg:py-0">
      {/* Background layers */}
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(2,42,58,0.10) 0%, transparent 60%)' }} />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent" />

      {/* ── Main content ── */}
      <div className="relative flex flex-col justify-center flex-1 max-w-7xl 3xl:max-w-[1600px] mx-auto px-5 sm:px-8 xl:px-12 3xl:px-20 w-full py-10 lg:py-8">

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
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 800 }}
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
          <div className="relative h-40 lg:h-52 overflow-hidden">
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
          <div className="flex flex-col gap-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="relative flex gap-4 p-4 border bg-theme-card hover:bg-theme-alt transition-all duration-300 overflow-hidden group"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="shrink-0 w-0.5 self-stretch" style={{ background: 'linear-gradient(to bottom, var(--text-accent), var(--border))' }} />
                <div className="relative">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-accent text-theme-accent text-lg leading-none" style={{ fontWeight: 500 }}>{r.num}</span>
                    <p className="text-theme text-sm font-semibold">{r.title}</p>
                  </div>
                  <p className="text-theme-muted text-xs leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: services + sustainability + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Servicios */}
            <div className="border bg-theme-card p-4" style={{ borderColor: 'var(--border-accent)' }}>
              <p className="text-theme-accent text-[10px] font-semibold tracking-widest uppercase mb-3 font-condensed">
                Servicios comunes a la red
              </p>
              <div className="flex flex-wrap gap-2">
                {commonServices.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border text-theme-muted text-xs transition-all duration-200 cursor-default"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card-alt)' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-theme-accent/60 shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Sustentabilidad */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5 font-condensed">
                Sustentabilidad y tecnología
              </p>
              <div className="flex flex-wrap gap-2">
                {sustainabilityAttributes.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1.5 border text-theme-muted text-xs transition-all duration-200 cursor-default"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-auto">
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
