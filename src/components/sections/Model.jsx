import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

const steps = [
  {
    num: '01',
    title: 'Inversores financian la red',
    desc: 'Capital privado que financia la construcción de cada parque. Sin inversión no hay infraestructura, sin infraestructura no hay red.',
    side: 'left',
  },
  {
    num: '02',
    title: 'HUB diseña y construye',
    desc: 'Desarrollamos y habilitamos naves de almacenamiento en los corredores estratégicos de Mendoza. Cada HUB opera de forma independiente, pero integrado a la red.',
    side: 'right',
  },
  {
    num: '03',
    title: 'Empresas ocupan y operan',
    desc: 'Empresas de cualquier escala alquilan módulos y operan desde el día uno. La ocupación genera flujos de caja en dólares de forma continua.',
    side: 'left',
  },
  {
    num: '04',
    title: 'El retorno vuelve al inversor',
    desc: 'Los flujos generados se distribuyen entre los fiduciantes. Una vez operativa la red completa, ese retorno se incrementa con cada nuevo HUB.',
    side: 'right',
  },
]

export default function Model() {
  return (
    <section
      id="model"
      className="hub-bg-h relative lg:min-h-dvh flex flex-col justify-center overflow-hidden bg-theme lg:py-0"
    >
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 100% 50%, rgba(2,42,58,0.10) 0%, transparent 65%)' }}
      />

      <div className="relative w-full max-w-[95vw] 3xl:max-w-[1700px] mx-auto px-5 sm:px-8 xl:px-10 3xl:px-16 py-8 lg:py-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-theme-accent" />
            <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">Estructura de Negocio</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
            <h2
              className="font-display text-theme leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.6rem)', fontWeight: 800 }}
            >
              INVERTÍS. CONSTRUIMOS. <span className="text-gradient-electric">RENTÁS.</span>
            </h2>
            <p className="text-theme-muted text-xs lg:text-sm max-w-sm leading-relaxed">
              El capital de los fiduciantes se convierte en naves industriales reales que generan retorno en dólares.
            </p>
          </div>
        </motion.div>


        {/* ── Mobile: simple cards ─────────────── */}
        <div className="lg:hidden flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 border border-theme bg-theme-card"
            >
              <div className="w-7 h-7 border border-theme-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-display text-theme-accent text-xs leading-none" style={{ fontWeight: 500 }}>{step.num}</span>
              </div>
              <div>
                <h3 className="font-display text-theme text-base tracking-wide mb-1" style={{ fontWeight: 700 }}>{step.title}</h3>
                <p className="text-theme-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: alternating timeline ────── */}
        <div className="hidden lg:block relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--stat-deco-line) 8%, var(--stat-deco-line) 92%, transparent)' }}
          />

          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isLeft = step.side === 'left'
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-[45%] py-4 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                    <h3
                      className="font-display text-theme leading-tight tracking-wide mb-1.5"
                      style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.6rem)', fontWeight: 700 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-theme-muted text-xs lg:text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 border border-theme bg-theme flex items-center justify-center">
                      <span className="font-accent text-theme-accent text-base leading-none" style={{ fontWeight: 500 }}>{step.num}</span>
                    </div>
                  </div>

                  <div className={`w-[45%] flex items-center ${isLeft ? 'pl-10' : 'pr-10 justify-end'}`}>
                    <span
                      className="font-display leading-none select-none pointer-events-none"
                      style={{
                        fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                        color: 'transparent',
                        WebkitTextStroke: '1px var(--stat-deco-faint)',
                        lineHeight: 1,
                        fontWeight: 900,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 lg:mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 lg:p-5 border border-theme-accent bg-theme-card transition-all duration-300">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 border border-theme-accent flex items-center justify-center shrink-0">
                <span className="text-theme-accent font-display text-sm" style={{ fontWeight: 800 }}>H</span>
              </div>
              <div className="min-w-0">
                <p className="text-theme font-semibold text-sm lg:text-base">¿Querés ser parte?</p>
                <p className="text-theme-muted text-xs leading-snug mt-0.5">Tanto si buscás invertir como si necesitás espacio para tu operación.</p>
              </div>
            </div>
            <a href="#contact" className="text-theme-accent text-xs font-semibold tracking-widest uppercase shrink-0 hover:underline font-condensed sm:pl-3">Contactanos →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
