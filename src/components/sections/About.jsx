import { motion } from 'framer-motion'
import edificioImg from '../../assets/hub-contact-hero.jpg'

// Founder logos
import logoOscarDavid from '../../assets/oscardavid.png'
import logoCarnes from '../../assets/carnesdemicampo.png'

// Partner logos
import logoLtn from '../../assets/ltn.png'
import logoHormiserv from '../../assets/Logo-Bilder-Hormiserv.png'
import logoRogiro from '../../assets/rogiro.png'
import logoLogmetal from '../../assets/logmetal.png'
import logoSaldana from '../../assets/saldana.png'
import logoInducret from '../../assets/inducret.jpg'
import logoPrear from '../../assets/prear.webp'
import logoTerrandes from '../../assets/terrande.png'

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

          {/* Left — Editorial image with HUB logo overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
            style={{ minHeight: 300 }}
          >
            <div className="absolute inset-0 pr-12">
              <img
                src={edificioImg}
                alt="HUB Parque Industrial — Edificio corporativo"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.65) saturate(0.85)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hub-black/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-hub-black/60 to-transparent" />

              {/* HUB logo overlay — centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display leading-none select-none"
                  style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    letterSpacing: '0.15em',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(74,135,245,0.55)',
                    textShadow: '0 0 60px rgba(74,135,245,0.25), 0 0 120px rgba(74,135,245,0.12)',
                  }}
                >
                  HUB
                </span>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-hub-electric/40" />
              <div className="absolute bottom-4 right-16 w-5 h-5 border-b border-r border-hub-electric/40" />
            </div>
          </motion.div>

          {/* Right — Text compact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-6 lg:gap-7 pl-0 lg:pl-6"
          >
            <div className="hidden lg:block w-px shrink-0 bg-gradient-to-b from-transparent via-hub-electric/50 to-transparent" style={{ minHeight: 260 }} />

            <div className="flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-hub-electric" />
                <span className="text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">Quiénes Somos</span>
              </div>

              {/* Headline — compact, 2 lines */}
              <h2
                className="font-display text-white leading-none tracking-wide mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
              >
                PARA EL{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 50%, #4a87f5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  CRECIMIENTO COTIDIANO
                </span>
                <br />DE TU EMPRESA
              </h2>

              {/* Manifesto — tighter */}
              <p className="text-white/75 text-sm lg:text-base leading-relaxed mb-3 font-light max-w-sm">
                Nacimos con una visión clara: que ninguna empresa en Mendoza
                tenga que frenar su crecimiento por falta de infraestructura.
              </p>

              <p className="text-hub-muted text-xs leading-relaxed max-w-sm mb-4">
                Somos empresarios, inversores y desarrolladores que entendemos
                las necesidades reales de la industria porque las vivimos todos los días.
              </p>

              {/* Values — inline compact */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Visión a largo plazo',
                  'Transparencia total',
                  'Excelencia operativa',
                  'Compromiso con Mendoza',
                ].map((v) => (
                  <span key={v} className="flex items-center gap-1.5 text-[11px] text-hub-muted border border-hub-azure/25 bg-hub-midnight/50 px-2.5 py-1">
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

        {/* ── Quiénes Somos — Founders ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-hub-azure/60" />
            <span className="text-hub-muted text-xs font-semibold tracking-[0.3em] uppercase">Quiénes Somos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 border border-hub-azure/15 bg-hub-midnight/40 text-center hover:border-hub-azure/40 hover:bg-hub-slate/30 transition-all duration-300 group"
              >
                <div className="w-24 h-24 flex items-center justify-center mx-auto mb-3">
                  {f.logo ? (
                    <img src={f.logo} alt={f.name} className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-12 h-12 border border-hub-azure/30 flex items-center justify-center group-hover:border-hub-electric/40 transition-colors">
                      <span className="font-display text-hub-azure-light text-sm group-hover:text-hub-bright transition-colors">{f.initials}</span>
                    </div>
                  )}
                </div>
                <p className="text-white text-sm font-semibold leading-tight mb-1">{f.name}</p>
                <p className="text-hub-subtle text-xs">{f.url}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-hub-azure/25 to-transparent origin-left mb-8"
        />

        {/* ── Nos Acompañan — Partners carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-hub-azure/60" />
            <span className="text-hub-muted text-xs font-semibold tracking-[0.3em] uppercase">Nos Acompañan</span>
          </div>

          {/* Marquee carousel */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-hub-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-hub-black to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 mx-3 px-6 py-3 border border-hub-azure/15 bg-hub-midnight/30 flex items-center justify-center gap-3 hover:border-hub-electric/30 transition-colors min-w-[160px] h-16"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-8 max-w-[80px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                    style={{ filter: 'brightness(1.2) grayscale(0.3)' }}
                  />
                  <span className="font-display text-hub-muted text-xs tracking-wider whitespace-nowrap hover:text-hub-bright transition-colors">
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
