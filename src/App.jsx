import { useEffect, useState, useRef, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import Model from './components/sections/Model'
import Projects from './components/sections/Projects'
import ForInvestors from './components/sections/ForInvestors'
import ForCompanies from './components/sections/ForCompanies'
import Contact from './components/sections/Contact'
import ProjectDetail from './pages/ProjectDetail'

const SECTIONS = [
  { id: 'hero',      label: 'Inicio' },
  { id: 'stats',     label: 'Métricas' },
  { id: 'about',     label: 'Nosotros' },
  { id: 'model',     label: 'Modelo' },
  { id: 'projects',  label: 'Proyectos' },
  { id: 'investors', label: 'Inversores' },
  { id: 'companies', label: 'Empresas' },
  { id: 'contact',   label: 'Contacto' },
]

// ─── Fullpage scroll hook ────────────────────────────────────────────────────
function useFullPage(total) {
  const [page, setPage]   = useState(0)
  const pageRef           = useRef(0)
  const busy              = useRef(false)
  const touchY            = useRef(0)
  // Trackpad accumulation — prevents micro-movements from triggering
  const accumulated       = useRef(0)

  const goTo = useCallback((next) => {
    if (next < 0 || next >= total || busy.current) return
    busy.current  = true
    accumulated.current = 0
    pageRef.current = next
    setPage(next)
    setTimeout(() => { busy.current = false }, 950)
  }, [total])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (busy.current) return
      accumulated.current += e.deltaY
      if (accumulated.current >  60) goTo(pageRef.current + 1)
      if (accumulated.current < -60) goTo(pageRef.current - 1)
    }
    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY }
    const onTouchEnd   = (e) => {
      const diff = touchY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 40) return
      goTo(diff > 0 ? pageRef.current + 1 : pageRef.current - 1)
    }
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(pageRef.current + 1)
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(pageRef.current - 1)
    }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true  })
    window.addEventListener('keydown',    onKey)
    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('keydown',    onKey)
    }
  }, [goTo])

  return { page, goTo }
}

// ─── Section nav dots ────────────────────────────────────────────────────────
function SectionDots({ page, goTo }) {
  const [flashLabel, setFlashLabel] = useState(true)

  // Show label briefly when page changes, then hide
  useEffect(() => {
    setFlashLabel(true)
    const t = setTimeout(() => setFlashLabel(false), 1400)
    return () => clearTimeout(t)
  }, [page])

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
            (page === i && flashLabel) ? 'opacity-100 text-hub-gold' : 'opacity-0 group-hover:opacity-60 group-hover:text-hub-muted'
          }`}>
            {s.label}
          </span>
          <span className={`block rounded-full transition-all duration-300 shrink-0 ${
            page === i
              ? 'w-2.5 h-2.5 bg-hub-gold shadow-[0_0_8px_rgba(201,168,76,0.7)]'
              : 'w-1.5 h-1.5 bg-hub-muted/35 group-hover:bg-hub-muted/65'
          }`} />
        </button>
      ))}
    </nav>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
const PAGES = [Hero, Stats, About, Model, Projects, ForInvestors, ForCompanies, Contact]

function Landing() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const { page, goTo } = useFullPage(PAGES.length)

  return (
    <div className="bg-hub-black font-body h-screen overflow-hidden">
      <Navbar currentPage={page} goTo={goTo} />
      <SectionDots page={page} goTo={goTo} />

      {/* Fullpage slider */}
      <div
        className="will-change-transform"
        style={{
          transform: `translateY(-${page * 100}vh)`,
          transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {PAGES.map((Section, i) => (
          <div
            key={i}
            id={SECTIONS[i].id}
            className="h-screen overflow-hidden"
          >
            <Section />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/proyecto/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
