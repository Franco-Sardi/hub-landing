import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import { useSite } from '../components/site/SiteContext'
import { LandingHero, Faq, RedDesarrollos, MapaBox, CtaBlock } from '../components/site/LandingBlocks'
import { desarrolloPorSlug } from '../data/desarrollos'
import '../styles/landing.css'

// alquiler-infraestructura.html (entrega V4). Público: empresas que necesitan espacio para operar.
// No mezclar inversión en esta página (handoff de landings).
const LEAD = { recurso: 'disponibilidad', perfil: 'usuarios' }

const SERVICIOS = [
  ['Docks y carga', 'Recepción, descarga, clasificación y despacho de mercadería.'],
  ['Playas de maniobra', 'Circulación de vehículos de carga y organización de la operación.'],
  ['Oficinas integradas', 'Espacios de gestión vinculados a la operación industrial y logística.'],
  ['Conectividad', 'Fibra óptica e infraestructura tecnológica para gestión y monitoreo.'],
  ['Energía', 'Infraestructura orientada a distintos requerimientos operativos y soluciones de eficiencia.'],
  ['Soluciones a medida', 'Configuraciones específicas sujetas a factibilidad técnica y comercial.'],
]

const FAQ = [
  ['¿Qué tipo de espacios ofrece HUB?', 'La red contempla naves industriales Triple A, espacios para almacenamiento y logística y, según el perfil de cada desarrollo, otros usos complementarios.'],
  ['¿Qué superficie puedo consultar?', 'El sistema plantea módulos flexibles desde 1.000 m² como referencia. La disponibilidad concreta debe confirmarse por desarrollo y etapa.'],
  ['¿Qué servicios forman parte de la red?', 'La propuesta contempla docks, playas de maniobra, oficinas, conectividad, energía y otros servicios. La configuración definitiva debe verificarse para cada nodo.'],
  ['¿Puedo visitar un desarrollo?', 'Sí. La visita y la validación de condiciones técnicas forman parte del proceso comercial para empresas usuarias.'],
]

export default function Espacios() {
  const { abrirLead } = useSite()
  return (
    <Layout variant="landing">
      <Helmet>
        <title>Alquiler de naves industriales en Mendoza | HUB</title>
        <meta name="description" content="Naves industriales Triple A en Mendoza para almacenamiento, logística y operación industrial. Cinco desarrollos conectados con los principales corredores productivos, con módulos desde 1.000 m²." />
        <link rel="canonical" href="https://hubmza.com.ar/espacios" />
      </Helmet>

      <LandingHero
        fondo={desarrolloPorSlug.anchorena.render}
        stats={[['5', 'desarrollos'], ['178.000 m²', 'naves proyectadas'], ['Triple A', 'estándar de infraestructura'], ['desde 1.000 m²', 'módulos de referencia']]}
      >
        <div className="eyebrow">HUB · Para empresas</div>
        <h1>Naves industriales en Mendoza para operar y crecer</h1>
        <p>Infraestructura Triple A para almacenamiento, logística y operación industrial, conectada con los principales corredores productivos de Mendoza</p>
        <div className="actions">
          <a className="btn btn--white" href="#desarrollos">Conocer los desarrollos</a>
          <button className="btn btn--orange" type="button" onClick={() => abrirLead({ ...LEAD, bloque: 'espacios-hero' })}>Consultá disponibilidad</button>
        </div>
      </LandingHero>

      <section className="section white">
        <div className="container">
          <div className="split">
            <div data-reveal><div className="eyebrow">HUB · Para empresas</div><h2>Infraestructura en red para que tu operación funcione mejor</h2></div>
            <div data-reveal><p className="lead">HUB integra naves, servicios logísticos y conectividad en cinco ubicaciones sobre los principales corredores productivos de Mendoza</p><div className="statement">HUB te acompaña en tu operación</div></div>
          </div>
          <div className="grid3" data-reveal>
            <article className="card"><span className="index">01 · ESPACIO</span><h3>Superficie flexible</h3><p>Módulos desde 1.000 m² y configuraciones adaptables según desarrollo y disponibilidad.</p></article>
            <article className="card"><span className="index">02 · OPERACIÓN</span><h3>Infraestructura logística</h3><p>Docks, playas de maniobra, pavimentos industriales y circulación diferenciada.</p></article>
            <article className="card"><span className="index">03 · SERVICIOS</span><h3>Todo alrededor de los m²</h3><p>Energía trifásica, fibra óptica, oficinas integradas y soluciones de eficiencia.</p></article>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="container">
          <div className="eyebrow">Infraestructura que resuelve</div>
          <h2>Todo lo que una operación necesita alrededor de los m²</h2>
          <p className="lead">La red está diseñada para distintas escalas de operación, con configuraciones que se adaptan según el desarrollo y el módulo.</p>
          <div className="service-list" data-reveal>
            {SERVICIOS.map(([t, d], i) => (
              <div key={t} className="service"><span className="num">{String(i + 1).padStart(2, '0')}</span><strong>{t}</strong><span>{d}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="desarrollos">
        <div className="container">
          <div className="eyebrow">Desarrollos</div>
          <h2>Una red, cinco perfiles de desarrollo</h2>
          <p className="lead">Desde espacios con mayor vocación urbana hasta naves industriales y centros de almacenamiento. Cada desarrollo combina ubicación, infraestructura y un perfil propio.</p>
          <RedDesarrollos />
          <MapaBox />
          <p className="small">Las imágenes y renders son ilustrativos. Superficies, servicios, plazos y configuraciones deben confirmarse según el estado y disponibilidad de cada desarrollo.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">Preguntas frecuentes</div>
          <h2>Las preguntas más frecuentes sobre el proyecto</h2>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <CtaBlock
            eyebrow="HUB · Para empresas"
            titulo="Contanos qué necesita tu operación"
            texto="Superficie, tipo de actividad, zona preferida y requisitos técnicos. El equipo HUB puede orientarte hacia el desarrollo más adecuado según disponibilidad."
            boton="Consultá disponibilidad"
            lead={{ ...LEAD, bloque: 'espacios-cta' }}
          />
        </div>
      </section>
    </Layout>
  )
}
