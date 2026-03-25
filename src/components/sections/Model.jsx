import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Identificamos la Oportunidad',
    desc: 'Análisis de corredores logísticos, demanda industrial y disponibilidad de tierra en zonas de alto potencial de Mendoza.',
    side: 'left',
    cta: { label: 'Ver parques →', href: '#projects' },
  },
  {
    num: '02',
    title: 'Desarrollamos el Parque',
    desc: 'Diseño, construcción y habilitación de infraestructura de clase mundial: naves, accesos, utilities y servicios industriales.',
    side: 'right',
    cta: null,
  },
  {
    num: '03',
    title: 'Empresas Ocupantes',
    desc: 'Grandes empresas alquilan o compran espacios para almacenamiento, distribución y manufactura, generando flujos sostenidos en dólares.',
    side: 'left',
    cta: null,
  },
  {
    num: '04',
    title: 'Retorno a Inversores',
    desc: 'Los flujos de renta se distribuyen periódicamente entre los inversores, respaldados por activos inmobiliarios reales y contratos de largo plazo.',
    side: 'right',
    cta: { label: 'Consultar →', href: '#contact' },
  },
]

export default function Model() {
  return (
    <section
      id="model"
      className="relative lg:min-h-dvh flex flex-col justify-center overflow-hidden bg-hub-dark py-12 lg:py-0"
    >
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 100% 50%, rgba(13,42,78,0.15) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 xl:px-10 w-full pt-6 pb-6">

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
            <span className="text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Cómo Funciona</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
            <h2
              className="font-display text-white leading-none tracking-wide"
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
            <p className="text-hub-muted text-xs lg:text-sm max-w-xs leading-relaxed">
              Capital privado + infraestructura real + empresas ocupantes =
              retorno previsible en dólares.
            </p>
          </div>
        </motion.div>

        {/* ── Mobile: simple cards ─────────────── */}
        <div className="lg:hidden flex flex-col gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex gap-3 p-3.5 border border-hub-azure/15 bg-hub-midnight/40"
            >
              <span
                className="font-display text-hub-azure/20 leading-none shrink-0 select-none"
                style={{ fontSize: '2.8rem', lineHeight: 1 }}
              >
                {step.num}
              </span>
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-white text-lg tracking-wide mb-0.5">{step.title}</h3>
                <p className="text-hub-muted text-xs leading-relaxed">{step.desc}</p>
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
                      className="font-display text-white leading-tight tracking-wide mb-1.5"
                      style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.6rem)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-hub-muted text-xs lg:text-sm leading-relaxed">{step.desc}</p>

                    {step.cta && (
                      <a
                        href={step.cta.href}
                        className="inline-flex items-center gap-1.5 text-hub-electric text-xs tracking-widest uppercase mt-2 hover:gap-2.5 transition-all duration-200"
                      >
                        {step.cta.label}
                      </a>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 border border-hub-azure/40 bg-hub-dark flex items-center justify-center relative">
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
          className="grid lg:grid-cols-2 gap-2.5 lg:gap-3 mt-5 lg:mt-6"
        >
          <div className="flex items-center gap-3 p-3 lg:p-4 border border-hub-electric/15 bg-gradient-to-r from-hub-electric/5 to-transparent hover:border-hub-electric/30 transition-all duration-300">
            <div className="w-7 h-7 border border-hub-electric/30 flex items-center justify-center shrink-0">
              <span className="text-hub-electric font-bold text-xs">$</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs lg:text-sm">Para Inversores — Retorno en dólares</p>
              <p className="text-hub-muted text-xs truncate">Activos reales. Sin volatilidad financiera.</p>
            </div>
            <a href="#contact" className="text-hub-electric text-xs font-medium shrink-0 hover:underline">Ver →</a>
          </div>
          <div className="flex items-center gap-3 p-3 lg:p-4 border border-hub-azure/15 bg-gradient-to-r from-hub-azure/5 to-transparent hover:border-hub-azure/30 transition-all duration-300">
            <div className="w-7 h-7 border border-hub-azure/30 flex items-center justify-center shrink-0">
              <span className="text-hub-azure-light font-bold text-xs">⬡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs lg:text-sm">Para Empresas — Espacio llave en mano</p>
              <p className="text-hub-muted text-xs truncate">Flexible, estratégico, listo para operar.</p>
            </div>
            <a href="#companies" className="text-hub-azure-light text-xs font-medium shrink-0 hover:underline">Ver →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
