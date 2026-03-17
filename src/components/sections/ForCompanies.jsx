import { motion } from 'framer-motion'

const specs = [
  { value: '18 m',    label: 'Altura\nlibre' },
  { value: '5 t/m²',  label: 'Carga\nde piso' },
  { value: '380 V',   label: 'Energía\ntrifásica' },
  { value: '40 t',    label: 'Acceso\ncamiones' },
]

const sectors = [
  'E-commerce & Retail',
  'Logística & Transporte',
  'Manufactura',
  'Agroalimentos',
  'Pharma & Salud',
  'Energía & Minería',
]

const contracts = [
  { type: 'Alquiler',   desc: 'Desde 1 año en USD, renovable.' },
  { type: 'Compra',     desc: 'Módulos o naves completas.' },
  { type: 'Lease-back', desc: 'Vendé y seguí operando en el mismo espacio.' },
  { type: 'BTS',        desc: 'Build-to-suit a medida de tu operación.' },
]

const services = [
  'Seguridad 24/7',
  'Fibra óptica',
  'Playa de maniobras',
  'Oficinas integradas',
  'Mantenimiento incluido',
  'Control de acceso',
]

export default function ForCompanies() {
  return (
    <section
      id="companies"
      className="h-screen bg-hub-black relative overflow-hidden flex flex-col pt-20"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 15% 60%, rgba(74,144,217,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative flex flex-col flex-1 max-w-7xl mx-auto px-6 w-full py-6 min-h-0 gap-5">

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 shrink-0"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-hub-steel" />
              <span className="text-hub-steel text-xs font-semibold tracking-[0.3em] uppercase">HUB · Para Empresas</span>
            </div>
            <h2
              className="font-display text-white leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
            >
              INFRAESTRUCTURA{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4a90d9 0%, #6aaae8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                LISTA PARA OPERAR
              </span>
            </h2>
          </div>
          <p className="text-hub-muted text-sm max-w-xs shrink-0">
            Instalate en días, no en meses. Sin obra, sin gestión, sin riesgos de construcción.
          </p>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-hub-steel/40 via-hub-steel/15 to-transparent shrink-0" />

        {/* ── Body: 2 columnas ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-5">

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col flex-1 min-h-0 gap-4">

            {/* Specs — 4 en fila */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-4 gap-2 shrink-0"
            >
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="border border-hub-steel/15 bg-hub-dark/40 px-3 py-3 flex flex-col justify-between hover:border-hub-steel/35 hover:bg-hub-dark/60 transition-all duration-200"
                >
                  <span
                    className="font-display text-hub-steel leading-none"
                    style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-hub-muted text-xs mt-1 leading-snug whitespace-pre-line">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Servicios incluidos */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="border border-hub-steel/10 bg-hub-dark/25 p-4 shrink-0"
            >
              <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase mb-3">Servicios incluidos</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {services.map((s) => (
                  <span key={s} className="flex items-center gap-2 text-white/70 text-xs">
                    <span className="w-px h-3 bg-hub-steel/50 shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Sectores */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-1 min-h-0 border border-hub-steel/10 bg-hub-dark/25 p-4 flex flex-col"
            >
              <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase mb-3 shrink-0">Sectores</p>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.3 }}
                    className="px-3 py-1 border border-hub-steel/20 text-hub-muted text-xs tracking-wide hover:border-hub-steel/50 hover:text-hub-steel transition-all duration-200 cursor-default"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Columna derecha ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col lg:w-72 xl:w-80 shrink-0 gap-3"
          >
            <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase shrink-0">Modalidades</p>

            <div className="flex flex-col gap-2 flex-1">
              {contracts.map((c, i) => (
                <motion.div
                  key={c.type}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 + 0.25 }}
                  className="flex gap-3 p-3 border border-hub-steel/10 bg-hub-dark/30 hover:border-hub-steel/30 hover:bg-hub-dark/50 transition-all duration-200 group"
                >
                  <span className="w-1 shrink-0 bg-hub-steel/30 group-hover:bg-hub-steel/70 transition-colors" />
                  <div>
                    <p className="text-white text-xs font-semibold mb-0.5">{c.type}</p>
                    <p className="text-hub-muted text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-2 shrink-0">
              <a
                href="#contact"
                className="flex-1 py-2 text-center bg-hub-steel text-white text-xs font-semibold tracking-wider uppercase hover:brightness-110 transition-all duration-200"
              >
                Consultar
              </a>
              <a
                href="#projects"
                className="flex-1 py-2 text-center border border-hub-steel/30 text-hub-steel text-xs font-semibold tracking-wider uppercase hover:bg-hub-steel/10 hover:border-hub-steel/60 transition-all duration-200"
              >
                Ver parques →
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
