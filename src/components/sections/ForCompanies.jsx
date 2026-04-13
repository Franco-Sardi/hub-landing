import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 01.webp'

const specs = [
  { value: 'AAA',    label: 'Estándar Triple A' },
  { value: 'CERT',   label: 'Certificables' },
  { value: '1.000+', label: 'Módulos desde m²' },
  { value: 'FLEX',   label: 'Sistema modular' },
]

const reasons = [
  {
    num: '01',
    title: 'Acopio y recepción inteligente',
    desc: 'Docks de carga y playas de maniobras diseñadas para recibir, clasificar y distribuir mercadería de forma ordenada y eficiente.',
  },
  {
    num: '02',
    title: 'Almacenamiento modular y escalable',
    desc: 'Módulos desde 1.000 m² que se adaptan al volumen de tu operación. Crecés dentro del mismo hub sin cambiar de dirección.',
  },
  {
    num: '03',
    title: 'Infraestructura pensada para la operación',
    desc: 'Tránsito diferenciado para vehículos de carga y tráfico liviano, estacionamiento propio para camiones, amenities para transportistas y pavimentos industriales de alta carga.',
  },
  {
    num: '04',
    title: 'Conectividad estratégica',
    desc: 'Ubicaciones sobre Ruta 7 y Ruta 40, a minutos de centros urbanos clave. Acceso rápido a las principales vías y rutas de distribución optimizadas hacia Buenos Aires, Chile y todo Cuyo.',
  },
]

const services = [
  'Control de acceso inteligente',
  'Monitoreo y seguridad 24/7',
  'Amenities para transportistas',
  'Estacionamiento para camiones',
  'Oficinas integradas',
  'Fibra óptica',
  'Pavimentos industriales',
  'Sustentabilidad certificable',
]

const sustainability = [
  'Energías renovables',
  'Reutilización de aguas',
  'Control de consumo energético',
  'Bike parking',
  'Agua potable eficiente',
]

const contracts = [
  {
    type: 'Alquiler',
    desc: 'Desde 1 año en USD',
    detail: 'Ideal para operaciones que necesitan flexibilidad de plazo y escala.',
  },
  {
    type: 'Compra',
    desc: 'Módulos o naves completas',
    detail: 'Adquirí tu propio espacio dentro del hub con escritura independiente.',
  },
  {
    type: 'A medida',
    desc: 'Build-to-suit',
    detail: 'Diseñamos y construimos el espacio según las necesidades específicas de tu operación.',
  },
]

export default function ForCompanies() {
  return (
    <section id="companies" className="hub-bg-h relative lg:min-h-dvh flex flex-col overflow-hidden bg-theme py-10 lg:py-0">
      {/* Background layers */}
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(13,63,165,0.12) 0%, transparent 60%)' }} />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-azure/30 to-transparent" />

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
            <span className="w-8 h-px bg-hub-electric" />
            <span className="text-hub-electric dark:text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">HUB · Para Empresas</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-theme leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              UNA RED PENSADA{' '}
              <span className="text-gradient-electric">PARA LA EFICIENCIA</span>
            </h2>
            <p className="text-theme-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              Naves logísticas Triple A en los principales corredores de Mendoza —{' '}
              <span className="text-theme">Acceso Sur · Ruta 7 · Ruta 40.</span>
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
              alt="HUB Nave Logística — Centro de Servicios"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.8)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-hub-dark/80 via-transparent to-hub-dark/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-hub-dark/70 to-transparent" />

            {/* Specs overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 sm:grid-cols-4 border-t border-hub-azure/25 bg-hub-black/50 backdrop-blur-sm">
              {specs.map((s, i) => (
                <div key={s.label} className={`flex flex-col items-center justify-center text-center py-2.5 lg:py-3 px-2 ${i % 2 === 0 && i !== specs.length - 1 ? 'border-r border-hub-azure/20' : ''} ${i < 2 ? 'sm:border-r border-b sm:border-b-0 border-hub-azure/20' : ''} ${i === 2 ? 'sm:border-r border-hub-azure/20' : ''}`}>
                  <span className="font-display text-hub-bright leading-none" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' }}>{s.value}</span>
                  <span className="text-hub-muted text-[10px] mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-hub-electric/30" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-hub-electric/30" />
          </div>
        </motion.div>

        {/* ── Two-column: reasons + services ── */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8">

          {/* Left: 4 reasons as cards */}
          <div className="flex flex-col gap-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="relative flex gap-4 p-4 border border-hub-electric/10 bg-theme-card hover:border-hub-electric/30 hover:bg-theme-alt transition-all duration-300 overflow-hidden group"
              >
                {/* Accent line */}
                <div className="shrink-0 w-0.5 self-stretch bg-gradient-to-b from-hub-electric/50 to-hub-electric/10 group-hover:from-hub-electric to-hub-electric/30 transition-colors" />
                <div className="relative">
                  <p className="text-theme text-sm font-semibold mb-1 group-hover:text-hub-bright transition-colors">{r.title}</p>
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
            {/* Services */}
            <div className="border border-hub-electric/20 bg-theme-card p-4">
              <p className="text-hub-electric dark:text-hub-bright text-[10px] font-semibold tracking-widest uppercase mb-3">
                Servicios incluidos
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-hub-electric/20 bg-hub-electric/5 text-theme-muted text-xs hover:border-hub-electric/40 hover:text-hub-bright transition-all duration-200 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-hub-electric/60 shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Sustainability */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">
                Sustentabilidad
              </p>
              <div className="flex flex-wrap gap-2">
                {sustainability.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1.5 border border-theme text-theme-muted text-xs hover:border-hub-electric/40 hover:text-hub-bright transition-all duration-200 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-auto">
              <a href="#contact"
                className="px-6 py-2.5 bg-hub-electric text-white text-xs font-bold tracking-widest uppercase hover:bg-hub-bright transition-colors duration-200"
                style={{ boxShadow: '0 0 24px rgba(30,92,212,0.2)' }}>
                Consultar disponibilidad
              </a>
              <a href="#projects"
                className="px-5 py-2.5 border border-hub-electric/40 text-hub-bright text-xs font-semibold tracking-widest uppercase hover:bg-hub-electric/10 transition-all duration-200">
                Ver proyectos →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
