import { motion } from 'framer-motion'
import ROICalculator from '../ui/ROICalculator'
import SectionFrame from '../ui/SectionFrame'

const investorProfiles = [
  {
    name: 'Iniciales',
    cuota: null,
    badge: 'Cerrado',
    available: false,
  },
  {
    name: 'Pioneros',
    cuota: 'USD 560',
    badge: 'Cupos limitados',
    available: true,
  },
  {
    name: 'Inversores',
    cuota: 'USD 780',
    badge: '8% TNA garantizado',
    available: true,
    highlight: true,
  },
]

export default function ForInvestors() {
  return (
    <section
      id="investors"
      className="hub-bg-h relative lg:min-h-dvh flex flex-col overflow-hidden bg-theme py-10 lg:py-0"
    >
      {/* Background layers */}
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 100% 40%, rgba(13,63,165,0.10) 0%, transparent 60%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-electric/30 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center flex-1 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full py-10 lg:py-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-electric" />
            <span className="text-hub-electric dark:text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">
              HUB · Para Inversores
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-theme leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              TU CAPITAL,{' '}
              <span className="text-gradient-blue">TRABAJANDO.</span>
            </h2>
            <p className="text-theme-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              8% anual en dólares. Respaldado por activos reales.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left: profiles + info ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Estructura */}
            <div className="border border-theme bg-theme-card p-4">
              <p className="text-theme-muted text-xs leading-relaxed">
                HUB MZA es el <span className="text-theme font-semibold">titular fiduciario de 6 fideicomisos</span> propietarios
                de los inmuebles. Se han definido tres categorías de fiduciantes con condiciones de ingreso diferenciadas.
              </p>
            </div>

            {/* Profile cards */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">
                Categorías de inversores
              </p>
              <div className="flex flex-col border border-theme">
                {investorProfiles.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                    className={`flex items-center gap-3 sm:gap-4 px-4 py-3.5 group transition-colors duration-200 ${
                      p.available ? 'hover:bg-hub-electric/5' : 'opacity-45'
                    } ${p.highlight ? 'bg-hub-electric/5' : ''} ${
                      i < investorProfiles.length - 1 ? 'border-b border-theme' : ''
                    }`}
                  >
                    {/* Indicator dot */}
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      p.highlight ? 'bg-hub-bright' : p.available ? 'bg-hub-electric/50' : 'bg-theme-muted/30'
                    }`} />

                    {/* Name */}
                    <span className={`font-display text-base tracking-wider w-24 shrink-0 ${
                      p.available ? 'text-theme' : 'text-theme-muted'
                    }`}>
                      {p.name}
                    </span>

                    {/* Cuota price */}
                    {p.cuota ? (
                      <span className={`font-display text-lg leading-none shrink-0 ${
                        p.highlight ? 'text-hub-bright' : 'text-hub-electric dark:text-hub-bright'
                      }`}>
                        {p.cuota}
                      </span>
                    ) : (
                      <span className="text-theme-muted text-sm shrink-0">—</span>
                    )}

                    {/* Badge */}
                    <span className={`ml-auto text-[10px] px-2 py-0.5 border tracking-wide uppercase shrink-0 ${
                      p.highlight
                        ? 'border-hub-electric/50 text-hub-bright dark:text-hub-bright bg-hub-electric/10'
                        : p.available
                          ? 'border-theme text-theme-muted'
                          : 'border-theme text-theme-subtle'
                    }`}>
                      {p.badge}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key benefits */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">
                Por qué invertir en HUB
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { val: '8% TNA',     desc: 'Retorno anual en dólares estadounidenses' },
                  { val: 'Real',       desc: 'Capital respaldado por activos registrables' },
                  { val: '5 parques',  desc: 'Red distribuida en corredores clave de Mendoza' },
                  { val: '240.000 m²', desc: 'Naves industriales Triple A en construcción' },
                ].map((b, i) => (
                  <div key={b.val} className="flex items-center gap-3 py-2 border-b border-theme last:border-0 group">
                    <span className="w-1 h-1 rounded-full bg-hub-electric/50 shrink-0 group-hover:bg-hub-bright transition-colors" />
                    <span className="text-hub-electric dark:text-hub-bright font-display text-sm w-20 shrink-0">{b.val}</span>
                    <span className="text-theme-muted text-xs leading-snug">{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-1">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-hub-electric text-white text-xs font-bold tracking-widest uppercase hover:bg-hub-bright transition-colors duration-200"
                style={{ boxShadow: '0 0 24px rgba(30,92,212,0.2)' }}
              >
                Quiero Invertir →
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 border border-hub-electric/40 text-hub-bright text-xs font-semibold tracking-widest uppercase hover:bg-hub-electric/10 transition-all duration-200"
              >
                Ver parques
              </a>
            </div>
          </motion.div>

          {/* ── Right: ROI Calculator ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">
              Calculadora de retorno
            </p>
            <ROICalculator />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
