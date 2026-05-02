import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

const investorFeatures = [
  { label: 'Modalidad',       val: 'INVERSORES' },
  { label: 'Cuota parte',     val: 'A consultar' },
  { label: 'Retorno',         val: 'Participación USD' },
  { label: 'Mínimo ingreso',  val: 'A consultar' },
  { label: 'Moneda',          val: 'Dólares (USD)' },
  { label: 'Respaldo',        val: 'Capital protegido' },
]

const steps = [
  {
    num: '01',
    title: 'Estructura fiduciaria',
    desc: 'HUB MZA es el titular fiduciario de los fideicomisos propietarios de los inmuebles. Tu inversión está respaldada por activos reales.',
    side: 'left',
  },
  {
    num: '02',
    title: 'Ingresá como Inversor',
    desc: 'La modalidad Inversores te permite participar con cuotas partes y generar un retorno garantizado en dólares desde tu primer aporte.',
    side: 'right',
  },
  {
    num: '03',
    title: 'Desarrollo y construcción',
    desc: 'Diseñamos, construimos y habilitamos naves logísticas Triple A con infraestructura de clase internacional en los corredores estratégicos de Mendoza.',
    side: 'left',
  },
  {
    num: '04',
    title: 'Retorno sobre tu inversión',
    desc: 'Las empresas ocupantes generan flujos en dólares que se distribuyen entre los fiduciantes. Una vez operativa la red, ese retorno se incrementa.',
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
              style={{ fontSize: 'clamp(1.9rem, 4vw, 4rem)', fontWeight: 800 }}
            >
              NUESTRO MODELO <span className="text-gradient-electric">DE NEGOCIO</span>
            </h2>
            <p className="text-theme-muted text-xs lg:text-sm max-w-sm leading-relaxed">
              Cada HUB funciona de forma independiente, pero como parte de un sistema integrado
              que conecta los principales corredores logísticos de Mendoza.
            </p>
          </div>
        </motion.div>

        {/* ── Investor card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative border border-theme-accent bg-theme-card mb-8 lg:mb-10"
        >
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent" />
          <div className="p-5 sm:p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Left: headline */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
              <div>
                <p className="text-theme-muted text-[10px] tracking-widest uppercase mb-2 font-condensed">Modalidad de inversión</p>
                <p className="font-display text-theme tracking-wider" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 800 }}>INVERSORES</p>
                <p className="text-theme-muted text-xs leading-relaxed mt-2">
                  Generá un retorno garantizado en dólares desde tu primer aporte, que crece al entrar en operación.
                </p>
              </div>
              <a href="#investors" className="mt-4 self-start text-theme-accent text-xs font-semibold tracking-widest uppercase hover:underline font-condensed">
                Conocer condiciones →
              </a>
            </div>
            {/* Right: feature grid */}
            <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {investorFeatures.map((f) => (
                <div key={f.label} className="border border-theme bg-theme p-3">
                  <p className="text-theme-muted text-[9px] tracking-widest uppercase mb-1 font-condensed">{f.label}</p>
                  <p className="font-display text-theme text-sm leading-none tracking-wide" style={{ fontWeight: 700 }}>{f.val}</p>
                </div>
              ))}
            </div>
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
                <p className="text-theme font-semibold text-sm lg:text-base">Inversores · Participación en la rentabilidad · Capital respaldado</p>
                <p className="text-theme-muted text-xs leading-snug mt-0.5">Retorno desde el primer aporte · Se incrementa al entrar en operación la red</p>
              </div>
            </div>
            <a href="#investors" className="text-theme-accent text-xs font-semibold tracking-widest uppercase shrink-0 hover:underline font-condensed sm:pl-3">Consultá condiciones →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
