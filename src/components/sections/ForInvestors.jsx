import { motion } from 'framer-motion'
import ROICalculator from '../ui/ROICalculator'

const pillars = [
  {
    icon: '◆',
    title: 'Activo real, no papel',
    desc: 'Tu capital respaldado por cemento, acero y tierra. Infraestructura que se puede ver, auditar y valorizar.',
  },
  {
    icon: '◈',
    title: 'Flujo en dólares',
    desc: 'Las empresas ocupantes pagan en USD. Vos cobrás en USD. Sin riesgo cambiario, sin dependencia del peso.',
  },
  {
    icon: '◉',
    title: 'Demanda garantizada',
    desc: 'La logística y el almacenamiento no paran. Empresas como MercadoLibre, DHL y grandes retailers necesitan espacio hoy.',
  },
  {
    icon: '◎',
    title: 'Retorno compuesto',
    desc: '8% anual base, capitalizable. En 10 años, tu capital se más que duplica sin mover un dedo.',
  },
]

export default function ForInvestors() {
  return (
    <section
      id="investors"
      className="relative min-h-screen lg:h-screen flex flex-col overflow-x-hidden lg:overflow-hidden bg-hub-dark"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 100% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/40 to-transparent" />

      {/* HUB ghost watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display leading-none block"
          style={{
            fontSize: 'clamp(10rem, 25vw, 26rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.05)',
            transform: 'translate(15%, 15%)',
          }}
        >HUB</span>
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 pt-16 lg:pt-20 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 items-start lg:items-center py-6 lg:h-full">

          {/* Left: pitch */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-hub-gold" />
                <span className="text-hub-gold text-xs font-semibold tracking-[0.35em] uppercase">HUB · Para Inversores</span>
              </div>

              {/* Headline */}
              <h2
                className="font-display text-white leading-none tracking-wide mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.2rem)' }}
              >
                EL DINERO QUE<br />
                <span style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  NO PARA DE CRECER
                </span>
              </h2>

              <p className="text-hub-muted text-sm lg:text-base leading-relaxed mb-6 max-w-md">
                Mientras las empresas más grandes de Argentina operan en nuestros parques,
                vos percibís un retorno predecible, en dólares, respaldado por activos
                industriales reales. Sin bolsa, sin cripto, sin sorpresas.
              </p>

              {/* 4 pillars — compact grid */}
              <div className="grid grid-cols-2 gap-2.5 lg:gap-3 xl:gap-4">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex gap-2.5 p-3 lg:p-4 xl:p-5 border border-hub-gold/10 bg-hub-black/40 hover:border-hub-gold/25 transition-all duration-300 group"
                  >
                    <span className="text-hub-gold text-base shrink-0 mt-0.5 group-hover:scale-110 transition-transform">{p.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-xs lg:text-sm mb-0.5">{p.title}</h3>
                      <p className="text-hub-muted text-xs lg:text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-5"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-7 py-3 bg-hub-gold text-hub-black font-semibold text-xs tracking-widest uppercase hover:bg-hub-gold-light transition-colors duration-300 shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                >
                  Quiero Invertir en HUB
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: ROI Calculator */}
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
