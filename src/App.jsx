import { useEffect, useState, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/theme'
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
import ProjectDetail from './pages/ProjectDetail'

// Intro no aparece en la nav
const SECTIONS = [
  { id: 'intro',     label: '' },
  { id: 'hero',      label: 'Inicio' },
  { id: 'stats',     label: 'Métricas' },
  { id: 'model',     label: 'Modelo' },
  { id: 'projects',  label: 'Proyectos' },
  { id: 'investors', label: 'Inversores' },
  { id: 'companies', label: 'Empresas' },
  { id: 'about',     label: 'Nosotros' },
  { id: 'contact',   label: 'Contacto' },
]

const PAGES = [Intro, Hero, Stats, Model, Projects, ForInvestors, ForCompanies, About, Contact]

// ─── Active section tracker ────────────────────────────────────────────────────
function useActiveSection(containerRef) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = containerRef?.current
    if (!root) return
    const observers = SECTIONS.map((s, index) => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(index) },
        { root, threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [containerRef])

  return active
}

// ─── Section nav dots (excluye intro) ─────────────────────────────────────────
function SectionDots({ active, goTo }) {
  const [flashLabel, setFlashLabel] = useState(true)

  useEffect(() => {
    setFlashLabel(true)
    const t = setTimeout(() => setFlashLabel(false), 1400)
    return () => clearTimeout(t)
  }, [active])

  // No mostrar dots en la sección intro (index 0)
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
            className="group flex items-center gap-2 justify-end"
            aria-label={s.label}
          >
            <span className={`text-xs font-medium tracking-wider uppercase transition-all duration-500 ${
              (active === realIndex && flashLabel) ? 'opacity-100 text-hub-bright' : 'opacity-0 group-hover:opacity-60 group-hover:text-hub-muted'
            }`}>
              {s.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 shrink-0 ${
              active === realIndex
                ? 'w-2.5 h-2.5 bg-hub-electric shadow-[0_0_8px_rgba(74,135,245,0.7)]'
                : 'w-1.5 h-1.5 bg-hub-muted/35 group-hover:bg-hub-muted/65'
            }`} />
          </button>
        )
      })}
    </nav>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function Landing() {
  const containerRef = useRef(null)
  const active = useActiveSection(containerRef)
  const location = useLocation()
  const onIntro = active === 0

  const goTo = useCallback((index) => {
    const id = SECTIONS[index]?.id
    const el = id ? document.getElementById(id) : null
    if (!el || !containerRef.current) return
    const navHeight = onIntro ? 0 : (window.innerWidth >= 1024 ? 80 : 64)
    containerRef.current.scrollTo({ top: el.offsetTop - navHeight, behavior: 'smooth' })
  }, [onIntro])

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (!hash || !containerRef.current) return
    const timer = setTimeout(() => {
      const idx = SECTIONS.findIndex(s => s.id === hash)
      if (idx >= 0) {
        goTo(idx)
        window.history.replaceState(null, '', '/')
      }
    }, 100)
    return () => clearTimeout(timer)
  // goTo intencionalmente excluido: si cambia por scroll no debe re-disparar
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="bg-theme font-body h-screen overflow-y-auto snap-container"
    >
      {/* Navbar oculto en la intro */}
      <div className={`transition-all duration-500 ${onIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar currentPage={active - 1} goTo={(i) => goTo(i + 1)} />
      </div>

      <SectionDots active={active} goTo={goTo} />

      {PAGES.map((Section, i) => {
        const isLast = i === PAGES.length - 1
        return (
          <section
            key={i}
            id={SECTIONS[i].id}
            className={`snap-section ${isLast ? '' : 'lg:min-h-dvh'}`}
          >
            <Section />
          </section>
        )
      })}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/proyecto/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </ThemeProvider>
  )
}
