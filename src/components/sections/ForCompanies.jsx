import { motion } from 'framer-motion'
import malabiaImg from '../../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 01.png'

const specs = [
  { value: '1.000+', label: 'Módulos desde m²' },
  { value: 'LED',    label: 'Iluminación' },
  { value: '3F',     label: 'Energía trifásica' },
  { value: 'AAA',    label: 'Naves Triple A' },
]

const reasons = [
  { num: '01', title: 'Recepción de mercadería', desc: 'Infraestructura diseñada para recibir, clasificar y distribuir mercadería de forma eficiente.' },
  { num: '02', title: 'Almacenamiento flexible', desc: 'Módulos desde 1.000 m² que se adaptan a tu operación. Escalá sin límites.' },
  { num: '03', title: 'Infraestructura operativa', desc: 'Playas de maniobras, docks de carga, tránsito segregado pesado/liviano, pavimentos industriales.' },
  { num: '04', title: 'Operaciones de última milla', desc: 'Ubicaciones estratégicas sobre R7 y R40, conectando con Buenos Aires, Chile y todo Cuyo.' },
]

const services = [
  'Eficiencia operativa',
  'Sustentabilidad',
  'Flexibilidad de uso',
  'Iluminación LED',
  'Energía trifásica',
  'Oficinas integradas',
  'Pavimentos industriales',
  'Fibra óptica',
]

const sustainability = [
  'Energías renovables',
  'Control consumo de energía',
  'Reutilización de aguas',
  'Bike parking',
  'Uso eficiente del agua potable',
]

const contracts = [
  { type: 'Alquiler',   desc: 'Desde 1 año en USD' },
  { type: 'Compra',     desc: 'Módulos o naves completas' },
  { type: 'Build-to-suit', desc: 'A tu medida' },
]

export default function ForCompanies() {
  return (
    <section id="companies" className="relative lg:min-h-dvh flex flex-col overflow-hidden bg-hub-dark py-10 lg:py-0">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(13,63,165,0.12) 0%, transparent 60%)' }} />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-azure/30 to-transparent" />

      {/* ── Main content ── */}
      <div className="relative flex flex-col justify-center flex-1 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full py-10 lg:py-8">

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
            <span className="text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">HUB · Para Empresas</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-white leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              UNA RED PENSADA{' '}
              <span className="text-gradient-electric">PARA LA EFICIENCIA</span>
            </h2>
            <p className="text-hub-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              Naves industriales Triple A diseñadas para optimizar la gestión, reducir costos y escalar tu operativa en Mendoza.
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
              alt="HUB Parque Industrial"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.8)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-hub-dark/80 via-transparent to-hub-dark/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-hub-dark/70 to-transparent" />

            {/* Specs overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-hub-azure/25 bg-hub-black/50 backdrop-blur-sm">
              {specs.map((s, i) => (
                <div key={s.label} className={`flex flex-col items-center justify-center text-center py-2.5 lg:py-3 px-2 ${i < 3 ? 'border-r border-hub-azure/20' : ''}`}>
                  <span className="font-display text-hub-bright leading-none" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)' }}>{s.value}</span>
                  <span className="text-hub-muted text-[9px] lg:text-[10px] mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-hub-electric/30" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-hub-electric/30" />
          </div>
        </motion.div>

        {/* ── Two-column: reasons + services/contracts ── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Left: reasons */}
          <div>
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="flex gap-4 py-3 border-b border-hub-azure/15 last:border-0 group"
              >
                <span className="font-display text-hub-electric/20 text-3xl leading-none shrink-0 group-hover:text-hub-electric/45 transition-colors">{r.num}</span>
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5 group-hover:text-hub-bright transition-colors">{r.title}</p>
                  <p className="text-hub-muted text-xs leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Sustainability */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <p className="text-hub-muted text-[10px] tracking-widest uppercase mb-2">Sustentabilidad</p>
              <div className="flex flex-wrap gap-1.5">
                {sustainability.map((s) => (
                  <span key={s} className="px-2.5 py-1 border border-hub-azure/25 text-hub-muted text-[10px] hover:border-hub-electric/40 hover:text-hub-bright transition-all duration-200 cursor-default">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: services + contracts + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Services */}
            <div>
              <p className="text-hub-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">Servicios incluidos</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-hub-electric/50 shrink-0" />
                    <span className="text-white/70 text-xs">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contracts */}
            <div>
              <p className="text-hub-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">Modalidades de contratación</p>
              <div className="grid grid-cols-3 gap-2">
                {contracts.map((c) => (
                  <div key={c.type} className="flex items-center gap-2 px-3 py-2 border border-hub-azure/15 bg-hub-midnight/30 hover:border-hub-electric/30 transition-colors group">
                    <span className="w-0.5 h-full bg-hub-electric/25 shrink-0 group-hover:bg-hub-electric transition-colors" />
                    <div>
                      <span className="text-white text-xs font-semibold block">{c.type}</span>
                      <span className="text-hub-muted text-[10px]">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key message */}
            <div className="border border-hub-azure/20 bg-hub-midnight/30 p-4">
              <p className="text-hub-muted text-xs leading-relaxed">
                Cada HUB funciona de forma independiente, pero como parte de un <span className="text-white font-semibold">sistema integrado</span> que conecta puntos estratégicos de Mendoza para facilitar tu operación logística.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-1">
              <a href="#contact"
                className="px-6 py-2.5 bg-hub-electric text-white text-xs font-bold tracking-widest uppercase hover:bg-hub-bright transition-colors duration-200"
                style={{ boxShadow: '0 0 24px rgba(30,92,212,0.2)' }}>
                Consultar disponibilidad
              </a>
              <a href="#projects"
                className="px-5 py-2.5 border border-hub-electric/40 text-hub-bright text-xs font-semibold tracking-widest uppercase hover:bg-hub-electric/10 transition-all duration-200">
                Ver parques →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
