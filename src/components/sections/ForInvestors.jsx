import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

const investorBenefits = [
  { val: 'Retorno en USD',  desc: 'Retorno garantizado en dólares desde tu primer aporte, independiente de la inflación' },
  { val: 'Cuota parte',     desc: 'Ingreso accesible con participación mínima y posibilidad de escalar tu inversión' },
  { val: 'Liquidez',        desc: 'Posibilidad de escalar o reinvertir tu participación a medida que avanza el proyecto' },
  { val: 'Fideicomiso',     desc: 'Estructura fiduciaria que protege tu inversión durante todo el proceso de desarrollo' },
]

const nextSteps = [
  { num: '01', text: 'Completás el formulario de contacto' },
  { num: '02', text: 'Te enviamos el brochure completo con condiciones' },
  { num: '03', text: 'Coordinamos una reunión para responder tus preguntas' },
  { num: '04', text: 'Firmás tu contrato de participación como cuota-partista' },
]

export default function ForInvestors() {
  return (
    <section
      id="investors"
      className="hub-bg-h relative lg:min-h-svh flex flex-col overflow-hidden bg-theme lg:py-0"
    >
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 100% 40%, rgba(2,42,58,0.10) 0%, transparent 60%)' }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent" />

      <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-[95vw] 3xl:max-w-[1700px] mx-auto px-5 sm:px-8 xl:px-10 3xl:px-16 py-8 lg:py-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-theme-accent" />
            <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">
              HUB · Para Inversores
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-theme leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.6rem)', fontWeight: 800 }}
            >
              TU CAPITAL,{' '}
              <span className="text-gradient-blue">TRABAJANDO.</span>
            </h2>
            <p className="text-theme-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              Sumate al proyecto de infraestructura más ambicioso de Mendoza.
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
            <div className="relative border border-theme-accent bg-theme-card p-4 sm:p-5">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent" />
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-theme-muted text-[10px] tracking-widest uppercase mb-1 font-condensed">Modalidad disponible</p>
                  <p className="font-display text-theme text-xl tracking-wider" style={{ fontWeight: 700 }}>INVERSORES</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-theme text-sm leading-tight" style={{ fontWeight: 700 }}>Cuota parte</p>
                  <p className="text-theme-muted text-[10px] mt-0.5 font-condensed">consultar valor vigente</p>
                </div>
              </div>
              <div className="flex flex-col px-3 py-1.5 border border-theme-accent bg-theme w-fit mb-3">
                <span className="font-display text-theme text-base leading-none" style={{ fontWeight: 800 }}>Participación en el negocio</span>
                <span className="text-theme-muted text-[10px] font-condensed mt-0.5">rentabilidad real desde tu primer aporte</span>
              </div>
              <p className="text-theme-muted text-xs leading-relaxed">
                La modalidad inversores te permite <span className="text-theme font-semibold">participar con cuotas partes</span> y generar un retorno garantizado en dólares desde tu primer aporte. Tu inversión está respaldada por activos inmobiliarios industriales reales.
              </p>
            </div>

            {/* Por qué invertir en HUB */}
            <div>
              <p className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-2.5 font-condensed">
                Por qué invertir en HUB
              </p>
              <div className="flex flex-col gap-1.5">
                {investorBenefits.map((b) => (
                  <div key={b.val} className="flex items-center gap-3 py-2 border-b border-theme last:border-0 group">
                    <span className="w-1 h-1 rounded-full bg-theme-accent/50 shrink-0 group-hover:bg-theme-accent transition-colors" />
                    <span className="text-theme-accent font-display text-sm w-24 sm:w-28 shrink-0" style={{ fontWeight: 700 }}>{b.val}</span>
                    <span className="text-theme-muted text-xs leading-snug">{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href="#contact"
                className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity duration-200 font-condensed"
                style={{ backgroundColor: 'var(--text-accent)', color: 'var(--bg-primary)' }}
              >
                Quiero Invertir →
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 border border-theme-accent text-theme text-xs font-semibold tracking-widest uppercase hover:bg-theme-card transition-all duration-200 font-condensed"
              >
                Ver proyectos
              </a>
            </div>
          </motion.div>

          {/* ── Right: proceso de ingreso (reemplaza ROI Calculator) ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="border border-theme bg-theme-card p-5 sm:p-6">
              <p className="text-theme-muted text-[10px] tracking-widest uppercase mb-1 font-condensed">Proceso de ingreso</p>
              <p className="font-display text-theme text-xl tracking-wider mb-5" style={{ fontWeight: 700 }}>CÓMO SUMARTE</p>
              <div className="flex flex-col gap-4">
                {nextSteps.map((s) => (
                  <div key={s.num} className="flex items-start gap-4">
                    <span
                      className="font-accent text-theme-accent leading-none shrink-0"
                      style={{ fontSize: '1.8rem', fontWeight: 500 }}
                    >
                      {s.num}
                    </span>
                    <p className="text-theme-muted text-sm leading-relaxed pt-1">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-theme-accent bg-theme-card">
              <div className="w-5 h-5 border border-theme-accent flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-theme-accent text-[10px] leading-none" style={{ fontWeight: 800 }}>i</span>
              </div>
              <p className="text-theme-muted text-xs leading-relaxed">
                El valor de cuota parte, condiciones de ingreso y proyección de retornos
                se informan directamente a cada interesado.{' '}
                <a href="#contact" className="text-theme-accent font-semibold hover:underline">
                  Solicitá el brochure →
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
