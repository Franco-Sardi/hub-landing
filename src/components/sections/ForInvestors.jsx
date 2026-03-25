import { motion } from 'framer-motion'
import ROICalculator from '../ui/ROICalculator'

const keyStats = [
  {
    label: 'Capital protegido',
    value: '100%',
    desc: 'Respaldado por activos industriales reales y registrables.',
  },
  {
    label: 'Retorno anual',
    value: '8% USD',
    desc: 'Flujo en dólares, sin riesgo cambiario, sin bolsa.',
  },
  {
    label: 'Plazo flexible',
    value: '3–10 años',
    desc: 'Horizontes de inversión adaptados a tu perfil.',
  },
]

export default function ForInvestors() {
  return (
    <section
      id="investors"
      className="relative min-h-screen lg:h-screen flex flex-col overflow-x-hidden lg:overflow-hidden bg-hub-dark"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 0% 60%, rgba(201,168,76,0.05) 0%, transparent 60%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/35 to-transparent" />

      {/* Ghost watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display leading-none block"
          style={{
            fontSize: 'clamp(10rem, 22vw, 24rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.04)',
            transform: 'translate(15%, 15%)',
          }}
        >
          HUB
        </span>
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 pt-16 lg:pt-20 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start lg:items-center py-4 lg:h-full">

          {/* ── Left: dramatic pitch ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-hub-gold" />
              <span className="text-hub-gold text-xs font-semibold tracking-[0.35em] uppercase">HUB · Para Inversores</span>
            </div>

            {/* Headline — monumental */}
            <h2
              className="font-display text-white leading-[0.92] tracking-wide mb-3"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
            >
              TU CAPITAL,
            </h2>
            <h2
              className="font-display leading-[0.92] tracking-wide mb-5"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 5.5rem)',
                background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TRABAJANDO.
            </h2>

            {/* Subline */}
            <p className="text-hub-muted text-base lg:text-lg leading-relaxed mb-8 max-w-sm font-light">
              8% anual en dólares. Respaldado por activos reales.
              Sin bolsa, sin cripto, sin sorpresas.
            </p>

            {/* Three stat rows */}
            <div className="flex flex-col gap-0 border border-hub-gold/10 mb-8">
              {keyStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-4 px-5 py-4 group hover:bg-hub-midnight/60 transition-colors duration-200 ${
                    i < keyStats.length - 1 ? 'border-b border-hub-gold/8' : ''
                  }`}
                >
                  {/* Gold dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-hub-gold/60 shrink-0 group-hover:bg-hub-gold transition-colors" />
                  {/* Label */}
                  <span className="text-hub-muted text-xs tracking-widest uppercase w-32 shrink-0">{stat.label}</span>
                  {/* Value */}
                  <span
                    className="font-display text-hub-gold leading-none"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
                  >
                    {stat.value}
                  </span>
                  {/* Desc */}
                  <span className="text-hub-muted text-xs leading-snug hidden xl:block">{stat.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-hub-gold text-hub-black font-semibold text-xs tracking-widest uppercase hover:bg-hub-gold-light transition-colors duration-300 shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]"
              >
                Quiero Invertir en HUB →
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: ROI Calculator ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-hub-gold/60" />
              <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">Calculadora de Retorno</span>
            </div>
            <ROICalculator />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
