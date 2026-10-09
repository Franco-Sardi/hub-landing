import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './components/site/SiteContext'
import LeadModal from './components/site/LeadModal'
import CookieBanner from './components/site/CookieBanner'
import WhatsappBoton from './components/site/WhatsappBoton'
import Home from './pages/Home'

const Espacios = lazy(() => import('./pages/Espacios'))
const Inversores = lazy(() => import('./pages/Inversores'))
const SimuladorInversores = lazy(() => import('./pages/SimuladorInversores'))

// Maqueta del simulador (área privada) solo en desarrollo y en la preview con VITE_DEMO_INVERSORES=1.
const DEMO_INVERSORES = import.meta.env.DEV || import.meta.env.VITE_DEMO_INVERSORES === '1'
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Terminos = lazy(() => import('./pages/Terminos'))

// Sin páginas por desarrollo desde el 08-oct (todo va a la ficha técnica en PDF). Las URLs viejas
// (/proyecto/* del sitio anterior, indexadas, y /desarrollos/*) van a /espacios: en Vercel con 301
// desde vercel.json; esto cubre la SPA y el `vite preview`.

export default function App() {
  return (
    <SiteProvider>
      <Suspense fallback={<div style={{ minHeight: '100svh', background: 'var(--hub-blue-deep)' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/desarrollos/*" element={<Navigate to="/espacios" replace />} />
          <Route path="/inversores" element={<Inversores />} />
          {DEMO_INVERSORES && <Route path="/inversores/simulador" element={<SimuladorInversores />} />}
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/proyecto/*" element={<Navigate to="/espacios" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <LeadModal />
      <CookieBanner />
      <WhatsappBoton />
    </SiteProvider>
  )
}
