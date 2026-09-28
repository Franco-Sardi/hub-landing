import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import RedProyectos from '../components/site/RedProyectos'
import RecorridoHub from '../components/site/RecorridoHub'
import { useSite } from '../components/site/SiteContext'
import { desarrollos, desarrolloPorSlug } from '../data/desarrollos'
import { fundadoras, partners, altoLogo } from '../data/empresas'
// En public/ (no importado) para que coincida con el preload de index.html.
const heroImg = '/hub-hero.webp'
import '../styles/home.css'

// Hero: un solo componente, cinco escenas (handoff §6). Fondos en el orden de la maqueta V3.
const ESCENAS = [
  { fondo: heroImg, kicker: 'HUB · Activos Reales', titulo: ['Cinco HUB.', 'Una misma red.'], desc: 'Cinco desarrollos en Mendoza, pensados como una red de infraestructura industrial, logística y urbana.', cta: 'Conocer la red', href: '#desarrollos' },
  { fondo: desarrolloPorSlug.anchorena.render, kicker: 'Escala', titulo: ['335.000 m²', 'para crecer.'], desc: 'Una red que reúne 335.000 m² de terreno y proyecta 178.000 m² de naves para distintas escalas de operación.', cta: 'Ver HUB en números', href: '#numeros' },
  { fondo: desarrolloPorSlug['san-francisco-oeste'].render, kicker: 'Territorio', titulo: ['En el corredor', 'Atlántico–Pacífico.'], desc: 'Desarrollos sobre los ejes que conectan Mendoza con sus principales corredores productivos.', cta: 'Ver ubicaciones', href: '#desarrollos' },
  { fondo: desarrolloPorSlug['san-francisco-este'].render, kicker: 'Infraestructura', titulo: ['Estándar', 'Triple A.'], desc: 'Naves, docks, playas de maniobra, energía trifásica, fibra óptica, oficinas y servicios integrados para operar con otra escala.', cta: 'Ver infraestructura', href: '#empresas' },
  { fondo: desarrolloPorSlug.malabia.render, kicker: 'Concepto rector', titulo: ['HUB.', 'Activos Reales.'], desc: 'Una red que conecta capital, infraestructura y empresas para acompañar el crecimiento productivo de Mendoza.', cta: 'Conocer HUB', href: '#nosotros' },
]
const DURACION = 6500

function Hero() {
  const [idx, setIdx] = useState(0)
  const [pausado, setPausado] = useState(false)
  // Sube en cada navegación manual o al salir del hover: reinicia timer y barra de progreso.
  const [ciclo, setCiclo] = useState(0)
  const [reducido] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  // Fondos que ya se pidieron: cada escena baja el suyo cuando le toca o es la siguiente,
  // en vez de pedir los 5 renders (~1,6 MB) apenas carga la home.
  const [pedidos, setPedidos] = useState(() => new Set([0, 1]))

  const mostrar = (i) => {
    const n = (i + ESCENAS.length) % ESCENAS.length
    setIdx(n)
    setPedidos((prev) => (prev.has(n) && prev.has((n + 1) % ESCENAS.length) ? prev : new Set([...prev, n, (n + 1) % ESCENAS.length])))
  }

  useEffect(() => {
    if (pausado || reducido) return
    const t = setTimeout(() => mostrar(idx + 1), DURACION)
    return () => clearTimeout(t)
  }, [idx, pausado, reducido, ciclo])

  const ir = (i) => {
    mostrar(i)
    setCiclo((c) => c + 1)
  }
  // Pausa al hover solo en desktop: en touch el mouseenter queda pegado tras el primer tap.
  const hover = window.matchMedia?.('(hover: hover)').matches
  const onEnter = hover ? () => setPausado(true) : undefined
  const onLeave = hover ? () => { setPausado(false); setCiclo((c) => c + 1) } : undefined

  return (
    <section className={`hero${pausado ? ' is-paused' : ''}`} id="inicio" aria-label="HUB en una mirada" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="hero-media" aria-hidden="true">
        {ESCENAS.map((e, i) => (
          <div key={i} className={`hero-frame${i === idx ? ' is-active' : ''}`}>
            {pedidos.has(i) && <img src={e.fondo} alt="" fetchPriority={i === 0 ? 'high' : 'low'} decoding="async" />}
          </div>
        ))}
      </div>
      <div className="hero-shade" />

      <div className="container hero-inner">
        <div className="hero-copy">
          {ESCENAS.map((e, i) => (
            <article key={i} className={`hero-slide${i === idx ? ' is-active' : ''}`} aria-hidden={i !== idx}>
              <div className="hero-kicker">{e.kicker}</div>
              {/* Un solo h1 por página: las otras escenas llevan el mismo estilo en un <p>. */}
              {i === 0
                ? <h1 className="hero-title">{e.titulo[0]}<br />{e.titulo[1]}</h1>
                : <p className="hero-title">{e.titulo[0]}<br />{e.titulo[1]}</p>}
              <p className="hero-desc">{e.desc}</p>
              <div className="hero-actions">
                <a className="btn btn--white" href={e.href} tabIndex={i === idx ? 0 : -1}>{e.cta}</a>
              </div>
            </article>
          ))}
        </div>

        {/* Contador + flechas circulares; el avance automático es un anillo alrededor de "siguiente". */}
        <div className="hero-nav">
          <div className="hero-count" aria-live="polite">
            <span className="hero-count-now">{String(idx + 1).padStart(2, '0')}</span>
            <span className="hero-count-line" aria-hidden="true" />
            <span className="hero-count-total">{String(ESCENAS.length).padStart(2, '0')}</span>
          </div>
          <button className="hero-arrow" type="button" aria-label="Escena anterior" onClick={() => ir(idx - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="hero-arrow hero-arrow--next" type="button" aria-label="Escena siguiente" onClick={() => ir(idx + 1)}>
            {!reducido && (
              <svg className="hero-ring" viewBox="0 0 56 56" aria-hidden="true">
                <circle key={`${idx}-${ciclo}`} cx="28" cy="28" r="26.5" />
              </svg>
            )}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="hero-summary">
          <div className="hero-summary-item"><strong>5</strong><span>desarrollos HUB</span></div>
          <div className="hero-summary-item"><strong>335.000 m²</strong><span>superficie total de terreno</span></div>
          <div className="hero-summary-item"><strong>178.000 m²</strong><span>naves proyectadas</span></div>
          <div className="hero-summary-item"><strong>3 ejes</strong><span>Acceso Sur · Rodríguez Peña · San Francisco del Monte</span></div>
        </div>
      </div>
    </section>
  )
}

const fmt = new Intl.NumberFormat('es-AR')

// Contador de 1,25 s; el valor final ya está en el HTML como fallback (handoff §4).
function Contador({ valor }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const inicio = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - inicio) / 1250)
        el.textContent = fmt.format(Math.round(valor * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [valor])
  return <span ref={ref}>{fmt.format(valor)}</span>
}

function Nosotros() {
  return (
    <section className="section about" id="nosotros">
      <div className="container">
        <div className="about-top">
          <div className="about-title" data-reveal="left">
            <div className="eyebrow">Nosotros</div>
            <h2>Infraestructura que conecta crecimiento.</h2>
          </div>
          <div className="about-copy" data-reveal="right">
            <p>HUB es una red de cinco parques industriales Triple A en Mendoza. Conecta capital, infraestructura y empresas para impulsar tu crecimiento productivo.</p>
          </div>
        </div>

        <div className="people" data-reveal>
          <div className="people-row">
            <h3>Empresas fundadoras</h3>
            <ul className="logos logos--fundadoras">
              {fundadoras.map((e) => (
                <li key={e.nombre}><img src={e.logo} alt={e.nombre} height={altoLogo(e.r, 5600, 34, 74)} style={{ height: altoLogo(e.r, 5600, 34, 74) }} loading="lazy" /></li>
              ))}
            </ul>
          </div>
          <div className="people-row">
            <h3>Partners</h3>
            {/* Carrusel continuo: la lista va duplicada (copia oculta a lectores) para el loop sin corte. */}
            <div className="partners-marquee">
              <div className="partners-track">
                {[0, 1].map((copia) => (
                  <ul key={copia} className="logos logos--partners" aria-hidden={copia === 1 || undefined}>
                    {partners.map((e) => (
                      <li key={e.nombre}><img src={e.logo} alt={copia === 0 ? e.nombre : ''} height={altoLogo(e.r, 2600, 22, 44)} style={{ height: altoLogo(e.r, 2600, 22, 44) }} loading="lazy" /></li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CIFRAS = [
  { valor: 335000, unidad: 'm²', titulo: 'de superficie total de terreno', texto: 'Escala territorial distribuida entre los cinco desarrollos.' },
  { valor: 178000, unidad: 'm²', titulo: 'de naves proyectadas', texto: 'Infraestructura industrial y logística integrada al sistema HUB.' },
  { valor: 4, titulo: 'ejes estratégicos', texto: 'Que conectan la red con los principales corredores productivos regionales y el bioceánico.' },
]

function Numeros() {
  return (
    <section className="section numbers" id="numeros">
      <div className="container">
        <div className="numbers-head">
          <div data-reveal="left">
            <div className="eyebrow" style={{ color: 'var(--hub-silver)', marginBottom: 20 }}>HUB en números</div>
            <h2>HUB, una red en una mirada</h2>
          </div>
          <p data-reveal="right">La escala de HUB está en la relación entre territorio, infraestructura y una red de desarrollos para distintos perfiles de negocio.</p>
        </div>

        <div className="numbers-layout">
          <div className="number-primary" data-reveal>
            <div className="value"><Contador valor={5} /></div>
            <div>
              <h3>desarrollos estratégicamente conectados</h3>
              <ol className="number-devs">
                {desarrollos.map((d) => <li key={d.slug}>{d.nombre}</li>)}
              </ol>
            </div>
          </div>

          <div className="number-stack">
            {CIFRAS.map((c) => (
              <div key={c.titulo} className="number-row" data-reveal>
                <div className="value"><Contador valor={c.valor} />{c.unidad && <small>{c.unidad}</small>}</div>
                <div><h3>{c.titulo}</h3><p>{c.texto}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Empresas() {
  const { abrirLead } = useSite()
  return (
    <section className="section enterprise" id="empresas">
      <div className="container">
        <div className="enterprise-grid">
          <div className="enterprise-media" data-reveal="fade">
            <img src={desarrolloPorSlug.anchorena.render} alt="Render HUB Anchorena" loading="lazy" decoding="async" />
          </div>
          <div className="enterprise-content" data-reveal="right">
            <div className="eyebrow">HUB · Para empresas</div>
            <h2>Infraestructura en red para que tu operación funcione mejor.</h2>
            <p className="lead">HUB integra naves, servicios logísticos y conectividad en cinco ubicaciones sobre los principales corredores productivos de Mendoza.</p>

            <div className="key-question">HUB es todo lo que necesitás.</div>

            <div className="capabilities">
              <div className="capability"><span className="idx">01</span><strong>Espacio</strong><span>Módulos flexibles desde 1.000 m² y configuraciones adaptables según desarrollo y disponibilidad.</span></div>
              <div className="capability"><span className="idx">02</span><strong>Operación</strong><span>Docks, playas de maniobra, pavimentos industriales y circulación diferenciada.</span></div>
              <div className="capability"><span className="idx">03</span><strong>Servicios</strong><span>Energía trifásica, fibra óptica, oficinas integradas y soluciones de eficiencia.</span></div>
            </div>

            <div className="actions">
              <Link className="btn btn--blue" to="/espacios">Conocer espacios para operar</Link>
              <button className="btn" type="button" onClick={() => abrirLead({ recurso: 'brochure-empresas', perfil: 'usuarios', bloque: 'home-empresas' })}>Recibir brochure</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PASOS = [
  ['Tu capital financia la red.', 'La participación se instrumenta mediante la estructura fiduciaria.'],
  ['HUB desarrolla y gestiona infraestructura.', 'Los recursos se transforman en infraestructura industrial y logística en cada desarrollo.'],
  ['Empresas ocupan y operan.', 'La actividad de las empresas usuarias genera los flujos del negocio.'],
  ['HUB administra y distribuye ganancias.', 'Nos encargamos de todo el proceso. Vos invertís, nosotros administramos.'],
]

function ModeloHub() {
  const { abrirLead } = useSite()
  return (
    <section className="section business" id="inversion">
      <div className="container">
        <div className="section-head">
          <div data-reveal="left">
            <div className="eyebrow" style={{ color: 'var(--hub-silver)', marginBottom: 20 }}>Invertí en HUB</div>
            <h2>Invertís, administramos, rentás.</h2>
          </div>
          <p data-reveal="right">El capital se vincula a una estructura fiduciaria que desarrolla infraestructura industrial. La participación se explica desde el funcionamiento, la documentación y los activos que respaldan el proyecto.</p>
        </div>

        <RecorridoHub pasos={PASOS} />

        {/* Cierre en dos niveles: tarjeta de acción + aviso legal aparte (antes compartían fila). */}
        <div className="business-cta" data-reveal>
          <div className="bc-copy">
            <div className="eyebrow">Área de inversores</div>
            <p className="bc-title">Condiciones de ingreso, documentación ampliada y escenarios, en un solo lugar.</p>
          </div>
          <div className="bc-actions">
            <Link className="btn btn--white bc-btn" to="/inversores">
              Acceder a información para inversores
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
            </Link>
            <button className="btn btn--orange bc-btn" type="button" onClick={() => abrirLead({ recurso: 'dossier-inversion', perfil: 'inversor', bloque: 'home-modelo' })}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>
              Solicitar dossier
            </button>
          </div>
        </div>
        <p className="bc-legal" data-reveal>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
          <span>La información pública es general y no constituye una oferta, una cotización, una recomendación de inversión ni una garantía de resultados. La documentación ampliada y las condiciones de participación se presentan en el área de inversores.</span>
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Layout variant="home">
      <Helmet>
        <title>HUB · Activos Reales | Parques industriales Triple A en Mendoza</title>
        <link rel="canonical" href="https://hubmza.com.ar/" />
      </Helmet>
      <Hero />
      <Nosotros />
      <Numeros />
      <Empresas />
      <RedProyectos />
      <ModeloHub />
    </Layout>
  )
}
