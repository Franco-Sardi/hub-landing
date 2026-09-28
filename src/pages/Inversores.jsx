import { lazy, Suspense, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import { useSite } from '../components/site/SiteContext'
import { LandingHero, Faq, RedConLista, CtaBlock } from '../components/site/LandingBlocks'
// En public/ (no importado) para que coincida con el preload de index.html.
const heroImg = '/hub-hero.webp'
import '../styles/landing.css'

const Simulador = lazy(() => import('../components/site/Simulador'))

// Hasta que se elija proveedor de autenticación (pregunta abierta de la minuta 23-09), el área
// privada solo se puede ver en desarrollo o en un deploy con VITE_DEMO_INVERSORES=1. En producción
// no se publica un login simulado: el handoff pide que ese botón desaparezca.
const DEMO_PRIVADA = import.meta.env.DEV || import.meta.env.VITE_DEMO_INVERSORES === '1'

const PASOS = [
  ['Tu capital financia la red', 'La participación se instrumenta mediante la estructura fiduciaria.'],
  ['HUB desarrolla y gestiona infraestructura', 'Los recursos se transforman en infraestructura industrial y logística en cada desarrollo.'],
  ['Las empresas ocupan y operan', 'La actividad de las empresas usuarias genera los flujos del negocio.'],
  ['HUB administra y distribuye ganancias', 'Nos encargamos de todo el proceso. Vos invertís, nosotros administramos.'],
]

const FUNDADORAS = [
  ['Oscar David', 'Producción agropecuaria y distribución'],
  ['Carnes de mi Campo', 'Ganadería, frigoríficos y cadena de frío'],
  ['Terrandes', 'Desarrollo y gestión de tierras en Mendoza'],
]

const FAQ = [
  ['¿Qué respalda la participación?', 'La propuesta se instrumenta mediante una estructura fiduciaria vinculada al desarrollo de infraestructura industrial real. El alcance exacto debe revisarse en la documentación contractual vigente.'],
  ['¿Qué variables puedo analizar en el simulador?', 'Capital, valor de cuota, alquiler mensual por metro cuadrado, valor final proyectado y plazo. Los resultados cambian según los supuestos elegidos.'],
  ['¿Los resultados están garantizados?', 'No. El simulador muestra escenarios ilustrativos y no constituye garantía, oferta pública ni asesoramiento financiero.'],
  ['¿Cómo sigo después de analizar un escenario?', 'Podés solicitar el dossier, revisar la documentación disponible y coordinar una conversación con el equipo asesor.'],
]

function AreaPrivada() {
  return (
    <>
      <section className="section white">
        <div className="container">
          <div className="eyebrow">Explorador de escenarios</div>
          <h2>Imaginá escenarios y compará alternativas</h2>
          <p className="lead">Ajustá los supuestos y observá cómo cambia cada escenario. La herramienta no parte de una promesa: parte de las variables que elegís analizar.</p>
          <Suspense fallback={<div className="simulator" style={{ minHeight: 480 }} />}>
            <Simulador />
          </Suspense>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">La red</div>
          <h2>Cinco desarrollos que forman una red</h2>
          <p className="lead">La inversión se vincula con una red de infraestructura productiva distribuida en cinco desarrollos de perfiles diferentes.</p>
          <RedConLista />
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="eyebrow">Preguntas frecuentes</div>
          <h2>Lo esencial antes de avanzar</h2>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBlock
            eyebrow="HUB · Inversores"
            titulo="Solicitá la información completa"
            texto="Recibí el dossier y coordiná una conversación para revisar la estructura, documentación y escenarios."
            boton="Solicitar información"
            lead={{ recurso: 'dossier-inversion', perfil: 'inversor', bloque: 'inversores-privada-cta' }}
          />
        </div>
      </section>
    </>
  )
}

export default function Inversores() {
  const { abrirLead } = useSite()
  const [privadaAbierta, setPrivadaAbierta] = useState(false)
  const privadaRef = useRef(null)

  const abrirPrivada = () => {
    setPrivadaAbierta(true)
    setTimeout(() => privadaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <Layout variant="landing">
      <Helmet>
        <title>Inversión en infraestructura industrial real | HUB Mendoza</title>
        <meta name="description" content="HUB es una red de cinco parques industriales Triple A en Mendoza, con participación por fideicomiso. Conocé el modelo y accedé al área de inversores." />
        <link rel="canonical" href="https://hubmza.com.ar/inversores" />
      </Helmet>

      <LandingHero
        fondo={heroImg}
        stats={[['5', 'desarrollos'], ['335.000 m²', 'superficie de terreno'], ['178.000 m²', 'naves proyectadas'], ['3', 'empresas fundadoras']]}
      >
        <div className="eyebrow">HUB · Activos Reales</div>
        <h1>Invertí en infraestructura industrial real</h1>
        <p>Una red de cinco parques industriales Triple A en Mendoza, con participación por fideicomiso</p>
        <div className="actions">
          <a className="btn btn--white" href="#acceso">Acceder a información para inversores</a>
          <button className="btn btn--orange" type="button" onClick={() => abrirLead({ recurso: 'dossier-inversion', perfil: 'inversor', bloque: 'inversores-hero' })}>Solicitar dossier</button>
        </div>
      </LandingHero>

      <section className="section white">
        <div className="container">
          <div className="split">
            <div data-reveal><div className="eyebrow">El punto de partida</div><h2>Detrás del proyecto hay tres empresas con operación propia en Mendoza</h2></div>
            <div data-reveal><p className="lead">HUB nace de empresas que ya construyeron trayectoria en Mendoza. Esa experiencia forma parte del respaldo del proyecto y de la gestión de una red vinculada a la economía real.</p></div>
          </div>
          <div className="founders" data-reveal>
            {FUNDADORAS.map(([n, d]) => <div key={n} className="founder"><strong>{n}</strong><span>{d}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section blue">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--hub-silver)' }}>Modelo HUB</div>
          <h2>Invertís, administramos, rentás</h2>
          <p className="lead">El capital se vincula a una estructura fiduciaria que desarrolla infraestructura industrial. La participación se explica desde el funcionamiento, la documentación y los activos que respaldan el proyecto.</p>
          <div className="timeline" data-reveal>
            <div className="timeline-line" />
            <div className="steps">
              {PASOS.map(([t, p], i) => (
                <article key={t} className="step"><div className="dot" /><span className="index">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{p}</p></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="acceso">
        <div className="container">
          <div className="eyebrow">Área privada de inversores</div>
          <h2>La información sensible se consulta con acceso</h2>
          <p className="lead">Condiciones de ingreso, documentación ampliada, escenarios y herramientas de seguimiento forman parte del área privada para inversores registrados.</p>
          <div className="gate">
            <div className="gate-copy">
              <h3>Acceso HUB</h3>
              <p className="copy">Ingresá con tu usuario o solicitá una cuenta. Si preferís, un asesor te acompaña en el proceso.</p>
              <div className="actions">
                <button className="btn btn--blue" type="button" onClick={() => abrirLead({ recurso: 'solicitud-acceso', perfil: 'inversor', bloque: 'inversores-acceso' })}>Crear cuenta</button>
                <button className="btn" type="button" onClick={() => abrirLead({ recurso: 'asesor', perfil: 'inversor', bloque: 'inversores-acceso' })}>Hablar con un asesor</button>
              </div>
            </div>
            <div className="gate-form">
              <h3>Ingresar</h3>
              {DEMO_PRIVADA ? (
                <>
                  <div className="field"><label htmlFor="gate-email">Email</label><input id="gate-email" type="email" autoComplete="off" placeholder="nombre@empresa.com" /></div>
                  <div className="field"><label htmlFor="gate-pass">Contraseña</label><input id="gate-pass" type="password" autoComplete="off" /></div>
                  <button className="btn btn--blue" type="button" onClick={abrirPrivada}>Ver maqueta del área privada</button>
                  <div className="prototype-note">Acceso simulado para validar contenido y diseño. No se muestra en producción hasta conectar la autenticación real.</div>
                </>
              ) : (
                <>
                  <p className="copy">El ingreso con usuario se habilita cuando tu cuenta de inversor está activa. Solicitala y te contactamos para darte acceso.</p>
                  <button className="btn btn--blue" type="button" onClick={() => abrirLead({ recurso: 'solicitud-acceso', perfil: 'inversor', bloque: 'inversores-ingresar' })}>Solicitar acceso</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {DEMO_PRIVADA && privadaAbierta && <div ref={privadaRef}><AreaPrivada /></div>}
    </Layout>
  )
}
