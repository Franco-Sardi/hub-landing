import { useEffect, useState, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import Model from './components/sections/Model'
import Projects from './components/sections/Projects'
import ForCompanies from './components/sections/ForCompanies'
import Contact from './components/sections/Contact'
import ProjectDetail from './pages/ProjectDetail'

const SECTIONS = [
  { id: 'hero',      label: 'Inicio' },
  { id: 'stats',     label: 'Métricas' },
  { id: 'about',     label: 'Nosotros' },
  { id: 'model',     label: 'Modelo' },
  { id: 'projects',  label: 'Proyectos' },
  { id: 'companies', label: 'Empresas' },
  { id: 'contact',   label: 'Contacto' },
]

const PAGES = [Hero, Stats, About, Model, Projects, ForCompanies, Contact]

// ─── Active section tracker via IntersectionObserver ──────────────────────────
function useActiveSection(containerRef) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = containerRef?.current
    if (!root) return
    const observers = SECTIONS.map((s, index) => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { root, threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [containerRef])

  return active
}

// ─── Section nav dots ─────────────────────────────────────────────────────────
function SectionDots({ active, goTo }) {
  const [flashLabel, setFlashLabel] = useState(true)

  useEffect(() => {
    setFlashLabel(true)
    const t = setTimeout(() => setFlashLabel(false), 1400)
    return () => clearTimeout(t)
  }, [active])

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => goTo(i)}
          title={s.label}
          className="group flex items-center gap-2 justify-end"
          aria-label={s.label}
        >
          <span className={`text-xs font-medium tracking-wider uppercase transition-all duration-500 ${
            (active === i && flashLabel) ? 'opacity-100 text-hub-bright' : 'opacity-0 group-hover:opacity-60 group-hover:text-hub-muted'
          }`}>
            {s.label}
          </span>
          <span className={`block rounded-full transition-all duration-300 shrink-0 ${
            active === i
              ? 'w-2.5 h-2.5 bg-hub-electric shadow-[0_0_8px_rgba(74,135,245,0.7)]'
              : 'w-1.5 h-1.5 bg-hub-muted/35 group-hover:bg-hub-muted/65'
          }`} />
        </button>
      ))}
    </nav>
  )
}

// ─── Landing — unified scroll-snap layout ─────────────────────────────────────
function Landing() {
  const containerRef = useRef(null)
  const active = useActiveSection(containerRef)
  const location = useLocation()

  const goTo = useCallback((index) => {
    const id = SECTIONS[index]?.id
    const el = id ? document.getElementById(id) : null
    if (!el || !containerRef.current) return
    const container = containerRef.current
    const navHeight = window.innerWidth >= 1024 ? 80 : 64
    const top = el.offsetTop - navHeight
    container.scrollTo({ top, behavior: 'smooth' })
  }, [])

  // Scroll a sección específica cuando se navega con hash (ej: /#contact)
  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (!hash || !containerRef.current) return
    const timer = setTimeout(() => {
      const idx = SECTIONS.findIndex(s => s.id === hash)
      if (idx >= 0) goTo(idx)
    }, 100)
    return () => clearTimeout(timer)
  }, [location, goTo])

  return (
    <div
      ref={containerRef}
      className="bg-hub-black font-body h-screen overflow-y-auto snap-container"
    >
      <Navbar currentPage={active} goTo={goTo} />
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
    <Routes>
      <Route path="/proyecto/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
