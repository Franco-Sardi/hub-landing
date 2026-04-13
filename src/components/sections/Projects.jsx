import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import MendozaMap, { MARKER_COLOR } from '../ui/MendozaMap'
import SectionFrame from '../ui/SectionFrame'

const statusStyle = {
  gold:  { badge: 'bg-hub-electric text-white border-hub-electric/60',   bar: 'bg-hub-electric' },
  steel: { badge: 'bg-hub-steel/80 text-white border-hub-steel/60', bar: 'bg-hub-steel' },
}

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [lockedId, setLockedId] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) || projects[0]
  const s = statusStyle[active.statusColor]

  function handleHover(id) {
    if (id) setActiveId(id)
    else setActiveId(lockedId)
  }

  function handleSelect(id) {
    setLockedId(id)
    setActiveId(id)
  }

  return (
    <section
      id="projects"
      className="hub-bg-h lg:min-h-dvh bg-theme relative overflow-hidden flex flex-col py-10 lg:py-4"
    >
      <SectionFrame />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* ── Mobile layout ──────────────────────────────────────── */}
      <div className="lg:hidden relative px-4 pt-4 pb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-hub-electric" />
          <span className="text-hub-electric text-xs font-semibold tracking-[0.3em] uppercase">HUB · Proyectos</span>
        </div>
        <h2 className="font-display text-theme leading-none tracking-wide text-3xl mb-2">
          MENDOZA,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>ARGENTINA</span>
        </h2>

        {/* Mapa mobile */}
        <div className="relative border border-hub-electric/15 bg-theme-card w-full" style={{ minHeight: '300px' }}>
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-hub-electric/25 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-hub-electric/25 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-hub-electric/25 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-hub-electric/25 pointer-events-none" />
          <MendozaMap
            projects={projects}
            activeId={activeId}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 -mt-1">
          <span className="flex items-center gap-1.5 text-xs text-theme-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-hub-electric" />En Desarrollo
          </span>
          <span className="flex items-center gap-1.5 text-xs text-theme-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-hub-steel" />Próximamente
          </span>
        </div>

        {projects.map((project) => {
          const st = statusStyle[project.statusColor]
          const isMobileActive = lockedId === project.id
          return (
            <Link
              key={project.id}
              to={`/proyecto/${project.slug}`}
              className="relative overflow-hidden border transition-all duration-300"
              style={{
                borderColor: isMobileActive
                  ? project.statusColor === 'gold' ? 'rgba(74,135,245,0.60)' : 'rgba(74,135,245,0.40)'
                  : 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-hub-black/90 via-hub-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div>
                    <span className={`text-xs font-semibold tracking-wider uppercase px-2 py-0.5 border ${st.badge}`}>
                      {project.status}
                    </span>
                    <h3 className="font-display text-white text-xl leading-tight tracking-wide mt-1">
                      {project.name.toUpperCase()}
                    </h3>
                  </div>
                  <span className="text-hub-electric font-semibold text-sm shrink-0">{project.area} mts</span>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-theme-muted text-xs">📍 {project.location}</span>
                <span className={`text-xs font-semibold tracking-widest uppercase ${project.statusColor === 'gold' ? 'text-hub-electric' : 'text-hub-steel'}`}>
                  Ver proyecto →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col flex-1 max-w-7xl mx-auto px-6 w-full py-4 min-h-0">

        {/* Section header — spans full width above both columns */}
        <div className="mb-3 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-px bg-hub-electric" />
            <span className="text-hub-electric text-xs font-semibold tracking-[0.3em] uppercase">HUB · Proyectos</span>
          </div>
          <div className="flex items-end justify-between">
            <h2
              className="font-display text-theme leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}
            >
              MENDOZA,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4a87f5 0%, #6aa3ff 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                ARGENTINA
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-theme-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-hub-electric" />En Desarrollo
              </span>
              <span className="flex items-center gap-1.5 text-xs text-theme-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-hub-steel" />Próximamente
              </span>
            </div>
          </div>
        </div>

        {/* Two columns — map and content start at the same height */}
        <div className="flex flex-1 min-h-0 gap-5">

        {/* ── Left: Mendoza Map ─────────────────────────────────── */}
        <div className="flex flex-col shrink-0" style={{ width: '55%' }}>
          {/* Map container — fills entire left column */}
          <div className="flex-1 min-h-0 border border-hub-electric/15 bg-theme-card relative overflow-hidden p-3">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-hub-electric/25 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-hub-electric/25 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-hub-electric/25 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-hub-electric/25 pointer-events-none" />

            <MendozaMap
              projects={projects}
              activeId={activeId}
              onHover={handleHover}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* ── Right: Preview + project list ───────────────── */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0 gap-2">

          {/* Image preview — compacto */}
          <div className="relative shrink-0 overflow-hidden border border-hub-electric/15"
            style={{ height: '35%' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover bg-hub-dark"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-hub-black/90 via-hub-black/30 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active.id}`}
                className="absolute bottom-0 left-0 right-0 p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 border ${s.badge}`}>
                  {active.status}
                </span>
                <h3 className="font-display text-white leading-none tracking-wide mt-1"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}>
                  {active.name.toUpperCase()}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    📍 {active.location} · {active.area} mts
                  </p>
                  <Link
                    to={`/proyecto/${active.slug}`}
                    className="text-white text-xs font-semibold tracking-widest uppercase hover:text-hub-bright transition-colors"
                  >
                    Ver →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-2 right-3 font-display text-white/8 leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {String(active.id).padStart(2, '0')}
            </div>
          </div>

          {/* Project list — compacta */}
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1 no-scrollbar">
            {projects.map((project, i) => {
              const isActive = activeId === project.id
              const isLocked = lockedId === project.id
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onMouseEnter={() => handleHover(project.id)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleSelect(project.id)}
                  className="group relative flex items-center gap-2 px-2.5 py-2 border transition-all duration-250 cursor-pointer"
                  style={{
                    borderColor: isActive ? 'rgba(74,135,245,0.35)' : 'var(--border)',
                    backgroundColor: isActive ? 'var(--bg-card)' : 'var(--bg-card-alt)',
                  }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200"
                    style={{ background: MARKER_COLOR, opacity: isActive ? 1 : 0 }} />
                  {isLocked && <div className="absolute right-1.5 top-1.5 w-1 h-1 rounded-full" style={{ background: MARKER_COLOR }} />}

                  <span className="font-display text-lg leading-none w-6 shrink-0 transition-colors"
                    style={{ color: isActive ? MARKER_COLOR : MARKER_COLOR + '70' }}>
                    {String(project.id).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="font-display text-sm leading-tight tracking-wide truncate block transition-colors"
                      style={{ color: isActive ? MARKER_COLOR : 'var(--text-primary)' }}>
                      {project.name}
                    </span>
                    <span className="text-theme text-xs truncate block opacity-60">{project.location} · {project.area} mts</span>
                  </div>

                  <Link
                    to={`/proyecto/${project.slug}`}
                    className={`shrink-0 flex items-center gap-1 px-2 py-1 text-[10px] font-semibold tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-all duration-200 border ${
                      project.statusColor === 'gold'
                        ? 'border-hub-electric/50 text-hub-electric hover:bg-hub-electric hover:text-white'
                        : 'border-hub-steel/50 text-hub-steel hover:bg-hub-steel hover:text-white'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver →
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        </div>{/* end two columns */}
      </div>{/* end desktop layout */}
    </section>
  )
}
