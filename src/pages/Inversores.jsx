import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { faEnvelopeOpenText, faHeadset, faKey } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/site/Layout'
import { useSite } from '../components/site/SiteContext'
import RecorridoHub from '../components/site/RecorridoHub'
// En public/ (no importado) para que coincida con el preload de index.html.
const heroImg = '/hub-hero.webp'
import '../styles/home.css'

// Rehecha el 08-oct con el lenguaje de la home: hero + pedido de acceso. El modelo, las fundadoras
// y la red ya están en la home; el simulador y el área privada vuelven cuando HUB los defina.
// Hasta entonces el acceso es manual: el pedido entra al CRM y un asesor da usuario y contraseña.
const DEMO_INVERSORES = import.meta.env.DEV || import.meta.env.VITE_DEMO_INVERSORES === '1'

const PASOS = [
  ['Solicitás acceso', 'Dejás tu correo y el pedido llega al equipo de HUB', faEnvelopeOpenText],
  ['Un asesor te contacta', 'Conversa con vos, valida tu perfil y responde tus consultas', faHeadset],
  ['Recibís tu usuario', 'Con tu usuario y contraseña accedés al área privada de inversores', faKey],
]

export default function Inversores() {
  const { abrirLead } = useSite()
  const pedirAcceso = (bloque) => abrirLead({ recurso: 'solicitud-acceso', perfil: 'inversor', bloque })
  const pedirBrochure = (bloque) => abrirLead({ recurso: 'brochure-inversion', perfil: 'inversor', bloque })

  return (
    <Layout variant="home">
      <Helmet>
        <title>Inversión en infraestructura industrial real | HUB Mendoza</title>
        <meta name="description" content="HUB es una red de cinco parques industriales Triple A en Mendoza, con participación por fideicomiso. Solicitá acceso al área de inversores." />
        <link rel="canonical" href="https://hubmza.com.ar/inversores" />
      </Helmet>

      <section className="hero hero--fijo" aria-label="HUB para inversores">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-frame is-active"><img src={heroImg} alt="" fetchPriority="high" decoding="async" /></div>
        </div>
        <div className="hero-shade" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <article className="hero-slide is-active">
              <div className="hero-kicker">HUB · Inversores</div>
              <h1 className="hero-title">Invertí en infraestructura<br />industrial real</h1>
              <p className="hero-desc">Una red de cinco parques industriales Triple A en Mendoza, con participación por fideicomiso</p>
              <div className="hero-actions">
                <button className="btn btn--orange" type="button" onClick={() => pedirAcceso('inversores-hero')}>Solicitar acceso</button>
                <button className="btn btn--white" type="button" onClick={() => pedirBrochure('inversores-hero')}>Solicitar brochure</button>
              </div>
            </article>
          </div>
          <div className="hero-summary">
            <div className="hero-summary-item"><strong>5</strong><span>desarrollos HUB</span></div>
            <div className="hero-summary-item"><strong>335.000 m²</strong><span>superficie total de terreno</span></div>
            <div className="hero-summary-item"><strong>178.000 m²</strong><span>naves proyectadas</span></div>
            <div className="hero-summary-item"><strong>3</strong><span>empresas fundadoras</span></div>
          </div>
        </div>
      </section>

      <section className="section business" id="acceso">
        <div className="container">
          <div className="section-head">
            <div data-reveal="left">
              <div className="eyebrow" style={{ color: 'var(--hub-silver)', marginBottom: 20 }}>Área de inversores</div>
              <h2>Acceso con usuario</h2>
            </div>
            <p data-reveal="right">Condiciones de ingreso, documentación ampliada y escenarios se consultan en el área privada. El acceso lo habilita el equipo de HUB después de una conversación con vos.</p>
          </div>

          <RecorridoHub pasos={PASOS} />

          <div className="business-cta" data-reveal>
            <div className="bc-copy">
              <div className="eyebrow">Solicitud de acceso</div>
              <p className="bc-title">Dejanos tu correo y un asesor de HUB se comunica con vos para habilitar tu cuenta</p>
            </div>
            <div className="bc-actions">
              <button className="btn btn--white bc-btn" type="button" onClick={() => pedirBrochure('inversores-acceso')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>
                Solicitar brochure
              </button>
              <button className="btn btn--orange bc-btn" type="button" onClick={() => pedirAcceso('inversores-acceso')}>
                Solicitar acceso
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
              </button>
            </div>
          </div>
          {DEMO_INVERSORES && (
            <p className="sim-demo-link" data-reveal>
              Vista previa para HUB: <Link to="/inversores/simulador">ver el simulador del área privada →</Link>
            </p>
          )}
          <p className="bc-legal" data-reveal>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
            <span>La información pública es general y no constituye una oferta, una cotización, una recomendación de inversión ni una garantía de resultados. La documentación ampliada y las condiciones de participación se presentan en el área de inversores.</span>
          </p>
        </div>
      </section>
    </Layout>
  )
}
