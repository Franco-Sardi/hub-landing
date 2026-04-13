import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

const investorFeatures = [
  { label: 'Modalidad', val: 'INVERSORES' },
  { label: 'Cuota parte', val: 'USD 780' },
  { label: 'Retorno', val: '8% TNA' },
  { label: 'Mínimo de ingreso', val: '100 cuotas' },
  { label: 'Moneda', val: 'Dólares (USD)' },
  { label: 'Respaldo', val: 'Capital protegido' },
]

const steps = [
  {
    num: '01',
    title: 'Estructura fiduciaria',
    desc: 'HUB MZA es el titular fiduciario de 6 fideicomisos, cada uno propietario de los inmuebles. Tu inversión está respaldada por activos reales.',
    side: 'left',
  },
  {
    num: '02',
    title: 'Ingresá como Inversor',
    desc: 'La modalidad Inversores te permite participar desde 100 cuotas partes (USD 780 c/u) con un interés garantizado del 8% TNA en dólares.',
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
    desc: 'Las empresas ocupantes generan flujos en dólares que se distribuyen entre los fiduciantes. Rentabilidad real respaldada por contratos.',
    side: 'right',
  },
]

export default function Model() {
  return (
    <section
      id="model"
      className="hub-bg-h relative lg:min-h-dvh flex flex-col justify-center overflow-hidden bg-theme py-12 lg:py-0"
    >
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 100% 50%, rgba(13,42,78,0.15) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-6xl 3xl:max-w-[1600px] mx-auto px-5 sm:px-8 xl:px-10 3xl:px-20 w-full pt-6 pb-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-electric" />
            <span className="text-hub-electric dark:text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Estructura de Negocio</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
            <h2
              className="font-display text-theme leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 4rem)' }}
            >
              NUESTRO MODELO{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                DE NEGOCIO
              </span>
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
          className="relative border border-hub-electric/30 bg-theme-card mb-8 lg:mb-10"
        >
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-hub-electric to-transparent" />
          <div className="p-5 sm:p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Left: headline */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
              <div>
                <p className="text-theme-muted text-[10px] tracking-widest uppercase mb-2">Modalidad de inversión</p>
                <p className="font-display text-theme tracking-wider" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}>INVERSORES</p>
                <p className="text-theme-muted text-xs leading-relaxed mt-2">
                  Generá un interés del 8% anual (TNA) desde tu primer aporte.
                </p>
              </div>
              <a href="#investors" className="mt-4 self-start text-hub-electric text-xs font-semibold tracking-widest uppercase hover:underline">
                Simular ROI →
              </a>
            </div>
            {/* Right: feature grid */}
            <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {investorFeatures.map((f) => (
                <div key={f.label} className="border border-theme bg-theme p-3">
                  <p className="text-theme-muted text-[9px] tracking-widest uppercase mb-1">{f.label}</p>
                  <p className="font-display text-hub-bright text-base leading-none tracking-wide">{f.val}</p>
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
              <div className="w-7 h-7 border border-hub-electric/25 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-display text-hub-electric/70 text-xs leading-none">{step.num}</span>
              </div>
              <div>
                <h3 className="font-display text-theme text-base tracking-wide mb-1">{step.title}</h3>
                <p className="text-theme-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: alternating timeline ────── */}
        <div className="hidden lg:block relative">
          {/* Central vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,42,78,0.6) 8%, rgba(13,42,78,0.6) 92%, transparent)' }}
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
                  {/* Content block — 45% width */}
                  <div className={`w-[45%] py-4 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                    <h3
                      className="font-display text-theme leading-tight tracking-wide mb-1.5"
                      style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.6rem)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-theme-muted text-xs lg:text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 border border-theme bg-theme-card flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-hub-azure/8" />
                      <span className="font-display text-hub-azure-light text-base leading-none relative z-10">{step.num}</span>
                    </div>
                  </div>

                  {/* Ghost number — opposite side */}
                  <div className={`w-[45%] flex items-center ${isLeft ? 'pl-10' : 'pr-10 justify-end'}`}>
                    <span
                      className="font-display leading-none select-none pointer-events-none"
                      style={{
                        fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(13,42,78,0.22)',
                        lineHeight: 1,
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

        {/* Bottom dual callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 lg:mt-6"
        >
          <div className="flex items-center gap-3 p-3 lg:p-5 border border-hub-electric/30 bg-gradient-to-r from-hub-electric/8 to-transparent hover:border-hub-electric/50 transition-all duration-300">
            <div className="w-8 h-8 border border-hub-electric/40 flex items-center justify-center shrink-0">
              <span className="text-hub-bright font-display text-sm">%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-theme font-semibold text-sm lg:text-base">Inversores · USD 780 por cuota · 8% TNA garantizado</p>
              <p className="text-theme-muted text-xs leading-snug mt-0.5">Interés en dólares desde el primer aporte · Mínimo 100 cuotas partes</p>
            </div>
            <a href="#investors" className="text-hub-bright text-xs font-semibold tracking-widest uppercase shrink-0 hover:underline">Simular ROI →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
