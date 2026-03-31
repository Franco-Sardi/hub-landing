import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Iniciales',
    badge: 'Etapa fundacional',
    badgeDesc: 'Participación cerrada',
    tags: ['Primer acceso', 'Condiciones exclusivas', 'Red fundadora'],
    desc: 'Los primeros en confiar en el proyecto. Participaron desde la etapa fundacional de HUB con condiciones y acceso exclusivos.',
    highlight: false,
  },
  {
    name: 'Pioneros',
    price: 'USD 560',
    priceLabel: 'valor de cuota parte',
    desc: 'Ingresá al proyecto con una cuota parte accesible y formá parte del crecimiento de la red HUB desde sus primeras etapas.',
    highlight: false,
  },
  {
    name: 'Inversores',
    price: 'USD 780',
    priceLabel: 'valor de cuota parte',
    rate: '8% TNA',
    desc: 'Generá un interés del 8% anual (TNA) desde tu aporte, hasta que el proyecto genere sus propios ingresos operativos.',
    highlight: true,
  },
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
    title: 'Elegí tu categoría',
    desc: 'Tres perfiles de participación: Iniciales, Pioneros y e Inversores. Cada uno con un valor de cuota parte y condiciones definidas.',
    side: 'right',
  },
  {
    num: '03',
    title: 'Desarrollo y construcción',
    desc: 'Diseñamos, construimos y habilitamos naves industriales Triple A con infraestructura de clase internacional en ubicaciones estratégicas.',
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
            <span className="text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Estructura de Negocio</span>
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
            <p className="text-hub-muted text-xs lg:text-sm max-w-sm leading-relaxed">
              HUB MZA es el titular fiduciario de 6 fideicomisos propietarios de los inmuebles.
              Tres categorías de participación para invertir.
            </p>
          </div>
        </motion.div>

        {/* ── Categories cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 lg:mb-10"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
              className={`relative p-5 border transition-all duration-300 group flex flex-col ${
                cat.highlight
                  ? 'border-hub-electric/40 bg-gradient-to-b from-hub-electric/8 to-hub-midnight/40 hover:border-hub-electric/60'
                  : 'border-hub-azure/15 bg-hub-midnight/40 hover:border-hub-azure/40'
              }`}
            >
              {cat.highlight && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-hub-electric to-transparent" />
              )}

              <p className="font-display text-white text-xl tracking-wide mb-3">{cat.name.toUpperCase()}</p>

              {/* Iniciales — badge fundacional */}
              {cat.badge && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-3 px-3 py-1.5 border border-hub-azure/25 bg-hub-midnight/60 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-hub-bright/60 shrink-0" />
                    <span className="font-display text-hub-muted text-sm leading-none tracking-wider">{cat.badge}</span>
                  </div>
                  <p className="text-hub-subtle text-[10px] tracking-widest uppercase mb-3">{cat.badgeDesc}</p>
                  <div className="flex flex-col gap-1.5">
                    {cat.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <span className="w-px h-3 bg-hub-azure/40 shrink-0" />
                        <span className="text-hub-muted text-xs">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cat.price && (
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display leading-none"
                      style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        background: cat.highlight
                          ? 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 100%)'
                          : 'linear-gradient(135deg, #b7b9ba 0%, #e8e9ea 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {cat.price}
                    </span>
                    <span className="text-hub-muted text-[10px] leading-tight">{cat.priceLabel}</span>
                  </div>
                </div>
              )}

              {cat.rate && (
                <div className="flex items-center gap-2 mb-3 px-3 py-1.5 border border-hub-electric/25 bg-hub-electric/8 w-fit">
                  <span className="font-display text-hub-bright text-base leading-none">{cat.rate}</span>
                  <span className="text-hub-muted text-[10px]">de interés anual</span>
                </div>
              )}

              <p className="text-hub-muted text-xs leading-relaxed mt-auto pt-2">{cat.desc}</p>
            </motion.div>
          ))}
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
              <p className="text-white font-semibold text-xs lg:text-sm">Pioneros — Cuota parte USD 560</p>
              <p className="text-hub-muted text-xs truncate">Ingresá desde las primeras etapas del proyecto.</p>
            </div>
            <a href="#contact" className="text-hub-electric text-xs font-medium shrink-0 hover:underline">Consultar →</a>
          </div>
          <div className="flex items-center gap-3 p-3 lg:p-4 border border-hub-electric/15 bg-gradient-to-r from-hub-electric/5 to-transparent hover:border-hub-electric/30 transition-all duration-300">
            <div className="w-7 h-7 border border-hub-electric/30 flex items-center justify-center shrink-0">
              <span className="text-hub-electric font-bold text-xs">%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs lg:text-sm">Inversores — Cuota parte USD 780 · 8% TNA</p>
              <p className="text-hub-muted text-xs truncate">Interés anual en dólares hasta que el proyecto genere ingresos.</p>
            </div>
            <a href="#contact" className="text-hub-electric text-xs font-medium shrink-0 hover:underline">Consultar →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
