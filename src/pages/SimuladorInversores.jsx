import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import { useSite } from '../components/site/SiteContext'
import Simulador from '../components/site/Simulador'
import '../styles/home.css'
import '../styles/simulador.css'

// Maqueta del área privada para que HUB apruebe o descarte el simulador (08-oct). Solo existe en
// desarrollo y en deploys con VITE_DEMO_INVERSORES=1 (la ruta no se registra en producción).
export default function SimuladorInversores() {
  const { abrirLead } = useSite()
  return (
    <Layout variant="home">
      <Helmet>
        <title>Simulador de escenarios · Área de inversores | HUB</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="section business sim-cabecera">
        <div className="container">
          <div className="sim-aviso" role="note">
            <strong>Vista previa para aprobación</strong>
            <span>Así se vería el simulador dentro del área privada. No se publica en el sitio hasta que HUB valide el modelo y los valores.</span>
          </div>
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ color: 'var(--hub-silver)', marginBottom: 20 }}>Área de inversores</div>
              <h2>Simulá tu escenario</h2>
            </div>
            <p>Ajustá el capital y los supuestos, y mirá cómo se comportan los ingresos y el valor de salida de una inversión en HUB. Cada cuotaparte equivale a un metro cuadrado de infraestructura.</p>
          </div>
        </div>
      </section>

      <section className="section sim-seccion">
        <div className="container">
          <Simulador />
          <div className="sim-cierre">
            <p>¿Querés revisar este escenario con alguien del equipo?</p>
            <div className="sim-cierre-btns">
              <button className="btn btn--orange" type="button" onClick={() => abrirLead({ recurso: 'asesor', perfil: 'inversor', bloque: 'simulador' })}>Hablar con un asesor</button>
              <Link className="btn" to="/inversores">Volver a inversores</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
