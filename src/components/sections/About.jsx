import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'

// Founder logos
import logoOscarDavid from '../../assets/oscardavid.webp'
import logoCarnes from '../../assets/carnesdemicampo-nuevo.webp'
import logoTerrandes from '../../assets/terrande.webp'

// Partner logos
import logoLtn from '../../assets/ltn.webp'
import logoHormiserv from '../../assets/Logo-Bilder-Hormiserv.webp'
import logoRogiro from '../../assets/rogiro.webp'
import logoLogmetal from '../../assets/logmetal.webp'
import logoSaldana from '../../assets/saldana.webp'
import logoInducret from '../../assets/inducret.jpg'
import logoPrear from '../../assets/prear.webp'

const founders = [
  {
    name: 'Oscar David',
    url: 'oscardavid.fydels.com',
    logo: logoOscarDavid,
    desc: 'Producción agropecuaria y distribución',
  },
  {
    name: 'Carnes de mi Campo',
    url: 'carnesdemicampo.com.ar',
    logo: logoCarnes,
    desc: 'Ganadería, frigoríficos y cadena de frío',
  },
  {
    name: 'Terrandes',
    url: 'terrandes.com',
    logo: logoTerrandes,
    desc: 'Desarrollo y gestión de tierras en Mendoza',
  },
]

const partners = [
  { name: 'Grupo LTN',     logo: logoLtn,       url: 'https://www.grupoltn.com/' },
  { name: 'Hormi-Serv',    logo: logoHormiserv, url: 'https://www.hormiserv.com/' },
  { name: 'Rogiro Aceros', logo: logoRogiro,    url: 'https://rogiroaceros.com/' },
  { name: 'LogMetal',      logo: logoLogmetal,  url: 'https://logmetal.com.ar/' },
  { name: 'Saldaña',       logo: logoSaldana,   url: 'https://saldanamateriales.com/' },
  { name: 'Inducret',      logo: logoInducret,  url: 'https://inducret.com.ar/' },
  { name: 'Prear',         logo: logoPrear,     url: 'https://prear.com.ar/' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative lg:min-h-svh flex flex-col justify-center overflow-hidden bg-theme lg:py-0"
    >
      <SectionFrame />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 80% at 100% 50%, rgba(2,42,58,0.08) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative w-full max-w-[95vw] 3xl:max-w-[1700px] mx-auto px-5 sm:px-8 xl:px-10 3xl:px-16 py-8 lg:py-10">

        {/* ── Main grid: texto izquierda · fundadores derecha ── */}
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center mb-10 lg:mb-14">

          {/* Left — headline + copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-theme-accent" />
              <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">Quiénes Somos</span>
            </motion.div>

            {/* Palabra 1 — INFRAESTRUCTURA: enorme, outline, marca de fondo */}
            <motion.span
              initial={{ opacity: 0, y: 28, clipPath: 'inset(0 0 40% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block leading-none tracking-wide mb-0.5"
              style={{
                fontSize: 'clamp(1.3rem, 2.4vw, 3rem)',
                fontWeight: 800,
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--text-accent)',
                opacity: 0.45,
              }}
            >
              INFRAESTRUCTURA
            </motion.span>

            {/* Palabra 2 — ALMACENAMIENTO: protagonista, gradiente */}
            <motion.span
              initial={{ opacity: 0, y: 28, clipPath: 'inset(0 0 40% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block leading-none tracking-wide text-gradient-blue mb-1"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 2.6rem)', fontWeight: 800 }}
            >
              ALMACENAMIENTO
            </motion.span>

            {/* Palabra 3 — inteligente: mismo estilo outline que INFRAESTRUCTURA */}
            <motion.span
              initial={{ opacity: 0, y: 20, clipPath: 'inset(0 0 40% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block leading-none tracking-wide mb-8"
              style={{
                fontSize: 'clamp(1.3rem, 2.4vw, 3rem)',
                fontWeight: 800,
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--text-accent)',
                opacity: 0.45,
              }}
            >
              INTELIGENTE
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="text-theme-muted text-sm lg:text-base leading-relaxed max-w-xl mb-8"
            >
              Nuestra visión es elevar el estándar de almacenamiento en el interior
              productivo de Argentina, respaldados por empresas con trayectoria
              real en la región y una cadena de partners constructivos integrados.
            </motion.p>

            {/* Dos datos clave en fila */}
            <div className="hidden sm:flex flex-wrap gap-6 lg:gap-10">
              {[
                { num: '3', label: 'Empresas fundadoras con trayectoria' },
                { num: '7', label: 'Partners en la cadena constructiva' },
              ].map((d) => (
                <div key={d.label}>
                  <p className="font-display text-theme-accent leading-none" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)', fontWeight: 800 }}>{d.num}</p>
                  <p className="text-theme-muted text-xs tracking-wider uppercase mt-1 font-condensed">{d.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — fundadores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-theme-muted text-xs tracking-widest uppercase mb-4 font-condensed">Los fundadores</p>
            <div className="flex flex-col gap-3">
              {founders.map((f, i) => (
                <motion.a
                  key={f.name}
                  href={`https://${f.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-5 p-5 border bg-theme-card group hover:border-theme-accent/50 transition-all duration-300"
                  style={{ borderColor: 'var(--border)', textDecoration: 'none' }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center bg-theme border p-2 w-28 h-20 sm:w-40 sm:h-28"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <img
                      src={f.logo}
                      alt={f.name}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div>
                    <p className="text-theme text-sm font-semibold leading-tight">{f.name}</p>
                    <p className="text-theme-subtle text-xs mt-1 mb-2">{f.url}</p>
                    <p className="text-theme-muted text-xs leading-snug">{f.desc}</p>
                  </div>
                </motion.a>
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
          className="h-px origin-left mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent) 50%, transparent)' }}
        />

        {/* ── Nos Acompañan ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ backgroundColor: 'var(--border-accent)' }} />
            <span className="text-theme-muted text-xs font-semibold tracking-[0.3em] uppercase font-condensed">Nos Acompañan</span>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((p, i) => {
                const inner = (
                  <>
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-8 max-w-[80px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ filter: 'brightness(1.2) grayscale(0.3)' }}
                    />
                    <span className="font-display text-theme-muted text-xs tracking-wider whitespace-nowrap transition-colors" style={{ fontWeight: 700 }}>
                      {p.name.toUpperCase()}
                    </span>
                  </>
                )
                const cardClass = "group shrink-0 mx-3 px-6 py-3 border flex items-center justify-center gap-3 transition-colors min-w-[160px] h-16"
                const cardStyle = { borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }
                return p.url ? (
                  <a
                    key={`${p.name}-${i}`}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                    style={cardStyle}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={`${p.name}-${i}`} className={cardClass} style={cardStyle}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
