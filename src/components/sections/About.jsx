import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

// Founder logos
import logoOscarDavid from '../../assets/oscardavid.png'
import logoCarnes from '../../assets/carnesdemicampo.png'
import logoTerrandes from '../../assets/terrande.png'

// Partner logos
import logoLtn from '../../assets/ltn.png'
import logoHormiserv from '../../assets/Logo-Bilder-Hormiserv.png'
import logoRogiro from '../../assets/rogiro.png'
import logoLogmetal from '../../assets/logmetal.png'
import logoSaldana from '../../assets/saldana.png'
import logoInducret from '../../assets/inducret.jpg'
import logoPrear from '../../assets/prear.webp'

const founders = [
  { name: 'Oscar David', url: 'oscardavid.fydels.com', logo: logoOscarDavid },
  { name: 'Carnes de mi Campo', url: 'carnesdemicampo.com.ar', logo: logoCarnes },
  { name: 'Terrandes', url: 'terrandes.com', logo: logoTerrandes },
]

const partners = [
  { name: 'Grupo LTN', logo: logoLtn },
  { name: 'Hormi-Serv', logo: logoHormiserv },
  { name: 'Rogiro Aceros', logo: logoRogiro },
  { name: 'LogMetal', logo: logoLogmetal },
  { name: 'Saldaña', logo: logoSaldana },
  { name: 'Inducret', logo: logoInducret },
  { name: 'Prear', logo: logoPrear },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative lg:min-h-dvh flex flex-col justify-center overflow-hidden bg-theme py-12 lg:py-0"
    >
      <SectionFrame />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 80% at 100% 50%, rgba(13,42,78,0.10) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 w-full py-10">

        {/* ── Headline central ────────────────────────────── */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start mb-12 lg:mb-14">

          {/* Left — Headline del brochure */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-hub-electric" />
              <span className="text-hub-electric dark:text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Quiénes Somos</span>
            </div>

            <h2
              className="font-display text-theme leading-[0.92] tracking-wide mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.2rem)' }}
            >
              RED DE{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                INFRAESTRUCTURA
              </span>
              <br />Y SERVICIOS PARA
              <br />EL CRECIMIENTO
              <br />COTIDIANO
              <br />DE TU EMPRESA
            </h2>

            <p className="text-theme-muted text-sm leading-relaxed">
              La infraestructura que tu empresa necesita, donde la necesita,
              integrada en una sola red.
            </p>
          </motion.div>

          {/* Right — Quiénes somos (fundadores) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-theme-muted text-xs tracking-widest uppercase mb-4">Los fundadores</p>
            <div className="flex flex-col gap-2">
              {founders.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 border bg-theme-card transition-all duration-300 group"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-theme-card border p-1" style={{ borderColor: 'var(--border)' }}>
                    <img
                      src={f.logo}
                      alt={f.name}
                      className="max-w-full max-h-full object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div>
                    <p className="text-theme text-sm font-semibold leading-tight">{f.name}</p>
                    <p className="text-theme-subtle text-xs mt-0.5">{f.url}</p>
                  </div>
                </motion.div>
              ))}
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

        {/* ── Nos Acompañan ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-hub-azure/60" />
            <span className="text-theme-muted text-xs font-semibold tracking-[0.3em] uppercase">Nos Acompañan</span>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 mx-3 px-6 py-3 border flex items-center justify-center gap-3 hover:border-hub-electric/30 transition-colors min-w-[160px] h-16"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-8 max-w-[80px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                    style={{ filter: 'brightness(1.2) grayscale(0.3)' }}
                  />
                  <span className="font-display text-theme-muted text-xs tracking-wider whitespace-nowrap transition-colors">
                    {p.name.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
