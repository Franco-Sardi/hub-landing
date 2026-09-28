import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import { useSite } from '../components/site/SiteContext'
import { LandingHero, MapaBox, CtaBlock } from '../components/site/LandingBlocks'
import { desarrolloPorSlug } from '../data/desarrollos'
import '../styles/landing.css'

// hub-<desarrollo>.html (entrega V4). Los servicios se expresan como estándar general de la
// red: el handoff prohíbe atribuirle a un nodo servicios exclusivos no confirmados.
export default function Desarrollo() {
  const { slug } = useParams()
  const { abrirLead } = useSite()
  const d = desarrolloPorSlug[slug]
  if (!d) return <Navigate to="/espacios" replace />

  const lead = { recurso: d.recurso, perfil: 'usuarios', desarrollo: d.nombre }

  return (
    <Layout variant="landing">
      <Helmet>
        <title>{`${d.label} · ${d.titulo} | HUB Mendoza`}</title>
        <meta name="description" content={d.lead} />
        <link rel="canonical" href={`https://hubmza.com.ar/desarrollos/${d.slug}`} />
      </Helmet>

      <LandingHero fondo={d.render}>
        <div className="dev-hero-logo"><img src={d.logo} alt={d.label} width="390" height="190" /></div>
        <div className="eyebrow">{d.descriptor}</div>
        <h1>{d.h1}</h1>
        <p>{d.bajada}</p>
        <div className="actions">
          <button className="btn btn--orange" type="button" onClick={() => abrirLead({ ...lead, bloque: 'desarrollo-hero' })}>Recibir ficha técnica</button>
          <Link className="btn btn--white" to="/espacios">Ver alquiler de infraestructura</Link>
        </div>
      </LandingHero>

      <section className="section white">
        <div className="container">
          <div className="split">
            <div data-reveal><div className="eyebrow">{d.label}</div><h2>{d.titulo}</h2></div>
            <div data-reveal><p className="lead">{d.lead}</p></div>
          </div>
          <div className="fact-row" data-reveal>
            <div className="fact"><strong>{d.area}</strong><span>superficie de terreno</span></div>
            <div className="fact"><strong>HUB</strong><span>{d.factoSecundario}</span></div>
            <div className="fact"><strong>5 nodos</strong><span>una misma red</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split media">
            <div className="media-frame" data-reveal><img src={d.render} alt={`Render de ${d.label}`} loading="lazy" decoding="async" /></div>
            <div className="content-pad" data-reveal>
              <div className="eyebrow">Infraestructura que resuelve</div>
              <h2>Todo alrededor de tu operación</h2>
              <p className="lead">HUB piensa la infraestructura como un sistema: superficie, operación, servicios y conectividad dentro de una red de desarrollos estratégicamente conectados.</p>
              <div className="service-list">
                <div className="service"><span className="num">01</span><strong>Espacio</strong><span>Módulos y configuraciones sujetos a disponibilidad y etapa del desarrollo.</span></div>
                <div className="service"><span className="num">02</span><strong>Operación</strong><span>Docks, playas de maniobra y circulación forman parte del estándar general de la red.</span></div>
                <div className="service"><span className="num">03</span><strong>Servicios</strong><span>Energía, conectividad, oficinas y soluciones operativas se confirman según cada configuración.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="eyebrow">Ubicación dentro de la red</div>
          <h2>Un desarrollo conectado a la red HUB</h2>
          <p className="lead">El valor territorial de HUB está en la relación entre sus cinco desarrollos y los ejes que conectan Mendoza con los principales corredores productivos regionales y el bioceánico.</p>
          <MapaBox activo={d.slug} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBlock
            eyebrow={d.label}
            titulo="Consultá disponibilidad y estado del desarrollo"
            texto="Dejanos tu correo y te enviamos la ficha técnica junto con la información vigente del proyecto."
            boton={`Solicitar información de ${d.label}`}
            lead={{ ...lead, bloque: 'desarrollo-cta' }}
          />
          <p className="small" style={{ marginTop: 18 }}>Las imágenes y renders son ilustrativos. Superficies, servicios, plazos y configuraciones deben confirmarse en la documentación y disponibilidad vigentes.</p>
        </div>
      </section>
    </Layout>
  )
}
