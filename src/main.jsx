import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './styles/shared.css'
import App from './App.jsx'
import { capturarUtm } from './lib/leads'

capturarUtm()

// Tras un deploy, una pestaña abierta con la versión anterior pide chunks (/assets/Pagina-<hash>.js)
// que ya no existen y la página queda en blanco. Vite avisa con este evento: se recarga una vez para
// traer la versión nueva (la marca en sessionStorage evita un loop si el problema fuera otro).
window.addEventListener('vite:preloadError', (e) => {
  try {
    if (sessionStorage.getItem('hub-recarga-chunk')) return
    sessionStorage.setItem('hub-recarga-chunk', '1')
  } catch {
    return
  }
  e.preventDefault()
  window.location.reload()
})
window.addEventListener('load', () => {
  // Si la recarga funcionó, se limpia la marca para un próximo deploy.
  setTimeout(() => { try { sessionStorage.removeItem('hub-recarga-chunk') } catch { /* noop */ } }, 5000)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
