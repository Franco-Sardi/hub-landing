import { motion } from 'framer-motion'

const investors = [
  { name: 'Fondo Capital Productivo', type: 'Fondo de Inversión', initials: 'FCP' },
  { name: 'Grupo Inversores del Norte', type: 'Family Office', initials: 'GIN' },
  { name: 'Logística Sur S.A.', type: 'Inversor Estratégico', initials: 'LSA' },
  { name: 'Tech Industrial Fund', type: 'Fondo Privado', initials: 'TIF' },
  { name: 'Patrimonial AR', type: 'Family Office', initials: 'PAR' },
  { name: 'Córdoba Capital Group', type: 'Inversor Institucional', initials: 'CCG' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative lg:min-h-dvh flex flex-col justify-center overflow-hidden bg-hub-black py-12 lg:py-0"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(13,42,78,0.12) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full pt-6 pb-6">

        {/* ── Main 2-column layout ─────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-0 mb-10 lg:mb-12">

          {/* Left — Editorial image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
            style={{ minHeight: 380 }}
          >
            <div className="absolute inset-0 pr-12">
              <img
                src="/assets/slide-1.jpg"
                alt="HUB Parque Industrial"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.7) saturate(0.85)' }}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hub-black/80" />
              {/* Bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-hub-black/60 to-transparent" />

              {/* EST. 2024 badge — top left of image */}
              <div className="absolute top-4 left-4 border border-hub-azure/50 bg-hub-midnight/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-hub-muted text-xs font-semibold tracking-[0.3em] uppercase">EST. 2024</span>
              </div>

              {/* Corner accents on image */}
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-hub-electric/40" />
              <div className="absolute top-4 right-16 w-5 h-5 border-t border-r border-hub-electric/40" />
            </div>
          </motion.div>

          {/* Right — Text with vertical gold separator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-7 lg:gap-8 pl-0 lg:pl-6"
          >
            {/* Gold vertical separator line */}
            <div className="hidden lg:block w-px shrink-0 bg-gradient-to-b from-transparent via-hub-electric/50 to-transparent" style={{ minHeight: 320 }} />

            <div className="flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-hub-electric" />
                <span className="text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Quiénes Somos</span>
              </div>

              {/* Headline */}
              <h2
                className="font-display text-white leading-none tracking-wide mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)' }}
              >
                INFRAESTRUCTURA<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  QUE MUEVE
                </span><br />
                A MENDOZA
              </h2>

              {/* Manifesto — larger, editorial */}
              <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-5 font-light max-w-md"
                style={{ fontStyle: 'normal', letterSpacing: '-0.01em' }}
              >
                HUB desarrolla parques industriales de clase mundial alineando
                el capital privado con la demanda real de las empresas más
                importantes del país.
              </p>

              <p className="text-hub-muted text-sm leading-relaxed max-w-md">
                Cada parque es diseñado, construido y operado con estándares internacionales.
                Transparencia total en cada contrato, cada retorno, cada m² edificado.
              </p>

              {/* Three values — compact horizontal */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  'Visión a largo plazo',
                  'Transparencia total',
                  'Excelencia técnica',
                ].map((v) => (
                  <span key={v} className="flex items-center gap-2 text-xs text-hub-muted border border-hub-azure/25 bg-hub-midnight/50 px-3 py-1.5">
                    <span className="w-1 h-1 rounded-full bg-hub-electric/70 shrink-0" />
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-hub-azure/25 to-transparent origin-left mb-8"
        />

        {/* Investors row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-hub-azure/60" />
            <span className="text-hub-muted text-xs font-semibold tracking-[0.3em] uppercase">Nuestros Inversores</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 lg:gap-3">
            {investors.map((inv, i) => (
              <motion.div
                key={inv.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-3 border border-hub-azure/15 bg-hub-midnight/40 text-center hover:border-hub-azure/40 hover:bg-hub-slate/30 transition-all duration-300 group"
              >
                <div className="w-9 h-9 border border-hub-azure/30 flex items-center justify-center mx-auto mb-2 group-hover:border-hub-electric/40 transition-colors">
                  <span className="font-display text-hub-azure-light text-xs group-hover:text-hub-bright transition-colors">{inv.initials}</span>
                </div>
                <p className="text-white text-xs font-semibold leading-tight mb-0.5">{inv.name}</p>
                <p className="text-hub-subtle text-xs">{inv.type}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
