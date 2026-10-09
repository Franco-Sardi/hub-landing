import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/site/Layout'
import '../styles/home.css'

// 404 propia (checklist de go-live): Vercel responde 200 a cualquier ruta de la SPA, así que el
// noindex es lo que evita que Google la tome como página.
export default function NoEncontrada() {
  return (
    <Layout variant="home">
      <Helmet>
        <title>Página no encontrada | HUB</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="section business no-encontrada">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--hub-silver)', marginBottom: 20 }}>Error 404</div>
          <h1>Esta página no existe</h1>
          <p>Puede que el enlace esté mal escrito o que la página se haya movido. Estos caminos te llevan a lo que buscás</p>
          <div className="no-encontrada-links">
            <Link className="btn btn--orange" to="/">Ir al inicio</Link>
            <Link className="btn btn--white" to="/espacios">Alquiler de espacios</Link>
            <Link className="btn btn--white" to="/inversores">Invertí en HUB</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
