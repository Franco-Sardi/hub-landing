import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SiteProvider } from './components/site/SiteContext'
import LeadModal from './components/site/LeadModal'
import CookieBanner from './components/site/CookieBanner'
import Home from './pages/Home'

const Espacios = lazy(() => import('./pages/Espacios'))
const Desarrollo = lazy(() => import('./pages/Desarrollo'))
const Inversores = lazy(() => import('./pages/Inversores'))
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Terminos = lazy(() => import('./pages/Terminos'))

// Slugs del sitio anterior (/proyecto/:slug, indexados en Google). En Vercel el 301 lo hace
// vercel.json; esto cubre la navegación dentro de la SPA y el `vite preview`.
const SLUG_VIEJO = {
  'san-francisco-del-monte-este': 'san-francisco-este',
  'san-francisco-del-monte-oeste': 'san-francisco-oeste',
  'rodriguez-pena-este': 'rodriguez-pena',
}

function ProyectoViejo() {
  const { slug } = useParams()
  return <Navigate to={`/desarrollos/${SLUG_VIEJO[slug] || slug}`} replace />
}

export default function App() {
  return (
    <SiteProvider>
      <Suspense fallback={<div style={{ minHeight: '100svh', background: 'var(--hub-blue-deep)' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/desarrollos/:slug" element={<Desarrollo />} />
          <Route path="/inversores" element={<Inversores />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/proyecto/:slug" element={<ProyectoViejo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <LeadModal />
      <CookieBanner />
    </SiteProvider>
  )
}
