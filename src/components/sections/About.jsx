import { motion } from 'framer-motion'

const values = [
  { icon: '◆', title: 'Visión a largo plazo', desc: 'Infraestructura que perdura décadas, no proyectos especulativos.' },
  { icon: '◈', title: 'Transparencia total', desc: 'Cada cifra, cada contrato, cada retorno: trazable y auditable.' },
  { icon: '◉', title: 'Excelencia técnica', desc: 'Estándares internacionales de construcción y operación industrial.' },
]

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
      className="relative min-h-screen lg:h-screen flex flex-col justify-center overflow-x-hidden lg:overflow-hidden bg-hub-black"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full pt-20 lg:pt-24 pb-8 lg:pb-12">
        {/* Top: eyebrow + headline + values */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-hub-gold" />
              <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">Quiénes Somos</span>
            </div>
            <h2
              className="font-display text-white leading-none tracking-wide mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}
            >
              INFRAESTRUCTURA<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 50%, #c9a84c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                QUE MUEVE
              </span><br />
              A ARGENTINA
            </h2>
            <p className="text-hub-muted text-sm lg:text-base leading-relaxed">
              HUB desarrolla parques industriales de clase mundial alineando el capital privado
              con la demanda real de las empresas más importantes del país.
            </p>
          </motion.div>

          {/* Right: values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center gap-3 lg:gap-4"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                className="flex gap-3 p-3.5 lg:p-5 border border-hub-gold/10 bg-hub-dark/50 hover:border-hub-gold/25 transition-all duration-300 group"
              >
                <span className="text-hub-gold text-base mt-0.5 group-hover:scale-110 transition-transform">{v.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm lg:text-base mb-0.5">{v.title}</h3>
                  <p className="text-hub-muted text-xs lg:text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-hub-gold/25 to-transparent origin-left mb-8"
        />

        {/* Nuestros Inversores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-hub-gold/50" />
            <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">Nuestros Inversores</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {investors.map((inv, i) => (
              <motion.div
                key={inv.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-3 lg:p-4 border border-hub-gold/10 bg-hub-dark/40 text-center hover:border-hub-gold/30 hover:bg-hub-dark/70 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-hub-gold/10 border border-hub-gold/25 flex items-center justify-center mx-auto mb-2 group-hover:bg-hub-gold/20 transition-colors">
                  <span className="font-display text-hub-gold text-sm">{inv.initials}</span>
                </div>
                <p className="text-white text-xs lg:text-sm font-semibold leading-tight mb-0.5">{inv.name}</p>
                <p className="text-hub-subtle text-xs lg:text-sm">{inv.type}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
