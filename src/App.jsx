import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/theme'
import AuthGate from './components/auth/AuthGate'
import Navbar from './components/layout/Navbar'
import Intro from './components/sections/Intro'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import Model from './components/sections/Model'
import Projects from './components/sections/Projects'
import ForCompanies from './components/sections/ForCompanies'
import ForInvestors from './components/sections/ForInvestors'
import Contact from './components/sections/Contact'
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
import WhatsAppFab from './components/ui/WhatsAppFab'
import { track } from './lib/analytics'

const SECTIONS = [
  { id: 'intro',     label: '' },
  { id: 'hero',      label: 'Inicio' },
  { id: 'about',     label: 'Nosotros' },
  { id: 'stats',     label: 'Métricas' },
  { id: 'companies', label: 'Empresas' },
  { id: 'projects',  label: 'Proyectos' },
  { id: 'investors', label: 'Inversores' },
  { id: 'model',     label: 'Modelo' },
  { id: 'contact',   label: 'Contacto' },
]

const PAGES = [Intro, Hero, About, Stats, ForCompanies, Projects, ForInvestors, Model, Contact]

// Secciones que se reportan a Umami. Van con el id crudo en ingles a proposito: el
// tablero traduce, asi un retoque de copy no rompe el panel del cliente. Fuera quedan
// intro, hero y contact — son el 100% de las visitas o no informan nada.
const SECCIONES_MEDIDAS = new Set(['about', 'companies', 'projects', 'investors', 'model'])
const DWELL_MS = 3000

// Detecta sección activa por IntersectionObserver sobre el viewport (scroll normal)
function useActiveSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const emitidas = new Set()   // una vez por carga: el modulo se remonta en cada visita
    const pendientes = new Map() // dwell en curso, por id de seccion

    const observers = SECTIONS.map((s, index) => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(index)
            // Sin el dwell, alguien que scrollea hasta el pie dispara las nueve
            // secciones de una y el numero no significa nada.
            if (SECCIONES_MEDIDAS.has(s.id) && !emitidas.has(s.id) && !pendientes.has(s.id)) {
              pendientes.set(s.id, setTimeout(() => {
                pendientes.delete(s.id)
                emitidas.add(s.id)
                track(`seccion:${s.id}`)
              }, DWELL_MS))
            }
          } else if (pendientes.has(s.id)) {
            clearTimeout(pendientes.get(s.id))
            pendientes.delete(s.id)
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => {
      observers.forEach((o) => o?.disconnect())
      pendientes.forEach(clearTimeout)
    }
  }, [])

  return active
}

// Dots de navegación lateral (solo desktop, ocultos en intro)
function SectionDots({ active, goTo }) {
  const [flashLabel, setFlashLabel] = useState(true)

  useEffect(() => {
    setFlashLabel(true)
    const t = setTimeout(() => setFlashLabel(false), 1400)
    return () => clearTimeout(t)
  }, [active])

  if (active === 0) return null

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.slice(1).map((s, i) => {
        const realIndex = i + 1
        return (
          <button
            key={s.id}
            onClick={() => goTo(realIndex)}
            title={s.label}
            className="group relative flex items-center justify-center"
            aria-label={s.label}
          >
            <span className={`absolute right-full mr-2 text-xs font-medium tracking-wider uppercase transition-all duration-500 pointer-events-none whitespace-nowrap ${
              (active === realIndex && flashLabel)
                ? 'opacity-100 text-hub-bright'
                : 'opacity-0 group-hover:opacity-60 group-hover:text-hub-muted'
            }`}>
              {s.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 shrink-0 ${
              active === realIndex
                ? 'w-2.5 h-2.5 bg-hub-electric shadow-[0_0_8px_rgba(2,42,58,0.7)]'
                : 'w-1.5 h-1.5 bg-hub-muted/35 group-hover:bg-hub-muted/65'
            }`} />
          </button>
        )
      })}
    </nav>
  )
}

function Landing() {
  const active = useActiveSection()
  const location = useLocation()
  const onIntro = active === 0

  const goTo = useCallback((index) => {
    const id = SECTIONS[index]?.id
    const el = id ? document.getElementById(id) : null
    if (!el) return
    const navHeight = onIntro ? 0 : (window.innerWidth >= 1024 ? 80 : 64)
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }, [onIntro])

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (!hash) return
    const timer = setTimeout(() => {
      const idx = SECTIONS.findIndex(s => s.id === hash)
      if (idx >= 0) {
        goTo(idx)
        window.history.replaceState(null, '', '/')
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-theme font-body w-full" style={{ overflowX: 'clip' }}>
      <div className={`transition-all duration-500 ${onIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar currentPage={active - 1} goTo={(i) => goTo(i + 1)} />
      </div>

      <SectionDots active={active} goTo={goTo} />

      {PAGES.map((Section, i) => (
        <div key={i} id={SECTIONS[i].id}>
          <Section />
        </div>
      ))}

      <Footer />

      {!onIntro && <WhatsAppFab />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthGate>
        <Routes>
          <Route
            path="/proyecto/:slug"
            element={
              <Suspense fallback={<div className="min-h-svh" style={{ backgroundColor: '#022A3A' }} />}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </AuthGate>
    </ThemeProvider>
  )
}
