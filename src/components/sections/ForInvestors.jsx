import { motion } from 'framer-motion'
import ROICalculator from '../ui/ROICalculator'
import SectionFrame from '../ui/SectionFrame'

const investorBenefits = [
  { val: '8% TNA',        desc: 'Interés garantizado en dólares desde el primer aporte' },
  { val: 'USD 780',       desc: 'Valor de cuota parte · mínimo 100 cuotas para ingresar' },
  { val: 'Triple A',      desc: 'Naves logísticas certificables, estándar de clase internacional' },
  { val: '240.000 m²',    desc: 'Red de naves logísticas distribuidas en corredores clave de Mendoza' },
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

      <div className="relative z-10 flex flex-col justify-center flex-1 max-w-7xl 3xl:max-w-[1600px] mx-auto px-5 sm:px-8 xl:px-12 3xl:px-20 w-full py-10 lg:py-8">

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
              Calculadora de retorno de inversión.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: info + benefits ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Modalidad Inversores — card destacada */}
            <div className="relative border border-hub-electric/30 bg-hub-electric/5 p-4 sm:p-5">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-hub-electric to-transparent" />
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-theme-muted text-[10px] tracking-widest uppercase mb-1">Modalidad disponible</p>
                  <p className="font-display text-theme text-xl tracking-wider">INVERSORES</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-hub-bright text-2xl leading-none">USD 780</p>
                  <p className="text-theme-muted text-[10px] mt-0.5">valor de cuota parte</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-hub-electric/25 bg-hub-electric/8 w-fit mb-3">
                <span className="font-display text-hub-bright text-base leading-none">8% TNA</span>
                <span className="text-theme-muted text-[10px]">interés garantizado en USD</span>
              </div>
              <p className="text-theme-muted text-xs leading-relaxed">
                Ingresá desde <span className="text-theme font-semibold">100 cuotas partes</span> (USD 78.000). Generás un interés del 8% anual en dólares desde tu primer aporte, hasta que el proyecto genere sus propios ingresos operativos.
              </p>
            </div>

            {/* Por qué invertir en HUB */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5">
                Por qué invertir en HUB
              </p>
              <div className="flex flex-col gap-1.5">
                {investorBenefits.map((b) => (
                  <div key={b.val} className="flex items-center gap-3 py-2 border-b border-theme last:border-0 group">
                    <span className="w-1 h-1 rounded-full bg-hub-electric/50 shrink-0 group-hover:bg-hub-bright transition-colors" />
                    <span className="text-hub-electric dark:text-hub-bright font-display text-sm w-24 shrink-0">{b.val}</span>
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
                Ver proyectos
              </a>
            </div>
          </motion.div>

          {/* ── Right: ROI Calculator ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ROICalculator />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
