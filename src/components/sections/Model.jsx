import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Identificamos la Oportunidad',
    desc: 'Análisis de corredores logísticos, demanda industrial y disponibilidad de tierra en zonas de alto potencial.',
    icon: '◎',
  },
  {
    num: '02',
    title: 'Desarrollamos el Parque',
    desc: 'Diseño, construcción y habilitación de infraestructura de clase mundial: naves, accesos, utilities y servicios.',
    icon: '◧',
  },
  {
    num: '03',
    title: 'Empresas Ocupantes',
    desc: 'Grandes empresas alquilan o compran espacios para almacenamiento, distribución y manufactura. Contratos en USD.',
    icon: '◫',
  },
  {
    num: '04',
    title: 'Retorno a Inversores',
    desc: 'Los flujos de renta se distribuyen a inversores. Base: 8% anual en USD + apreciación del activo.',
    icon: '◈',
  },
]

export default function Model() {
  return (
    <section
      id="model"
      className="relative min-h-screen lg:h-screen flex flex-col justify-center overflow-x-hidden lg:overflow-hidden bg-hub-dark"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(74,144,217,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full pt-20 lg:pt-24 pb-8 lg:pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-hub-gold" />
            <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">Cómo Funciona</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-white leading-none tracking-wide"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}
            >
              NUESTRO MODELO<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 50%, #c9a84c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                DE NEGOCIO
              </span>
            </h2>
            <p className="text-hub-muted text-sm lg:text-base max-w-sm leading-relaxed">
              Capital privado + infraestructura real + empresas ocupantes =
              retorno previsible en dólares.
            </p>
          </div>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 mb-8 lg:mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative border border-hub-gold/10 bg-hub-black/50 hover:border-hub-gold/25 hover:bg-hub-black/70 transition-all duration-300 p-5 xl:p-7"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-hub-gold/40 text-3xl leading-none">{step.num}</span>
                <span className="text-hub-gold text-xl">{step.icon}</span>
              </div>
              <h3 className="font-display text-white text-xl xl:text-2xl leading-tight tracking-wide mb-2">{step.title}</h3>
              <p className="text-hub-muted text-xs lg:text-sm leading-relaxed">{step.desc}</p>

              {/* Connecting arrow — hide on last */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-hub-gold/30 text-lg">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom dual callout — compact horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-3 lg:gap-5"
        >
          <div className="flex items-center gap-4 p-4 lg:p-5 border border-hub-gold/15 bg-gradient-to-r from-hub-gold/5 to-transparent hover:border-hub-gold/30 transition-all duration-300">
            <div className="w-9 h-9 bg-hub-gold/10 border border-hub-gold/25 flex items-center justify-center shrink-0">
              <span className="text-hub-gold font-bold text-sm">$</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Para Inversores — 8% anual en USD</p>
              <p className="text-hub-muted text-xs truncate">Activos reales. Sin volatilidad financiera.</p>
            </div>
            <a href="#investors" className="text-hub-gold text-xs font-medium shrink-0 hover:underline">Ver →</a>
          </div>
          <div className="flex items-center gap-4 p-4 lg:p-5 border border-hub-steel/15 bg-gradient-to-r from-hub-steel/5 to-transparent hover:border-hub-steel/30 transition-all duration-300">
            <div className="w-9 h-9 bg-hub-steel/10 border border-hub-steel/25 flex items-center justify-center shrink-0">
              <span className="text-hub-steel font-bold text-sm">⬡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Para Empresas — Espacio llave en mano</p>
              <p className="text-hub-muted text-xs truncate">Flexible, estratégico, listo para operar.</p>
            </div>
            <a href="#companies" className="text-hub-steel text-xs font-medium shrink-0 hover:underline">Ver →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
