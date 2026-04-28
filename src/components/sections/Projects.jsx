import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import MendozaMap, { MARKER_COLOR } from '../ui/MendozaMap'
import SectionFrame from '../ui/SectionFrame'

// Estado único: todos los proyectos "En desarrollo" — misma paleta oficial.
const statusBadgeClass =
  'inline-block text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 border font-condensed'

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [lockedId, setLockedId] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) || projects[0]

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
          <span className="w-6 h-px bg-theme-accent" />
          <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">HUB · Proyectos</span>
        </div>
        <h2
          className="font-display text-theme leading-none tracking-wide text-3xl mb-1"
          style={{ fontWeight: 800 }}
        >
          MENDOZA, <span className="text-gradient-blue">ARGENTINA</span>
        </h2>
        <p className="text-[10px] leading-relaxed font-condensed italic mb-1" style={{ color: 'var(--text-subtle)' }}>
          Los proyectos están sujetos a cambios. La implementación de centros comerciales será evaluada según viabilidad.
        </p>

        {/* Mapa mobile */}
        <div
          className="relative border bg-theme-card w-full"
          style={{ minHeight: '300px', borderColor: 'var(--border-accent)' }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
          <MendozaMap
            projects={projects}
            activeId={activeId}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 -mt-1">
          <span className="flex items-center gap-1.5 text-xs text-theme-muted font-condensed">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: MARKER_COLOR }} />En desarrollo
          </span>
        </div>

        {projects.map((project) => {
          const isMobileActive = lockedId === project.id
          return (
            <Link
              key={project.id}
              to={`/proyecto/${project.slug}`}
              className="relative overflow-hidden border transition-all duration-300"
              style={{
                borderColor: isMobileActive ? 'var(--border-accent)' : 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-hub-ink-deep/95 via-hub-ink-deep/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div>
                    <span
                      className={statusBadgeClass}
                      style={{ backgroundColor: 'rgba(2,42,58,0.85)', color: '#C7C8CA', borderColor: 'rgba(199,200,202,0.45)' }}
                    >
                      {project.status}
                    </span>
                    <h3 className="font-display text-white text-xl leading-tight tracking-wide mt-1" style={{ fontWeight: 800 }}>
                      {project.name.toUpperCase()}
                    </h3>
                  </div>
                  <span className="font-accent font-semibold text-sm shrink-0" style={{ color: '#C7C8CA' }}>
                    {project.area} m²
                  </span>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-theme-muted text-xs">📍 {project.location}</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-theme-accent font-condensed">
                  Ver proyecto →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col flex-1 max-w-7xl mx-auto px-6 w-full py-4 min-h-0">

        <div className="mb-3 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-px bg-theme-accent" />
            <span className="text-theme-accent text-xs font-semibold tracking-[0.3em] uppercase font-condensed">HUB · Proyectos</span>
          </div>
          <div className="flex items-end justify-between">
            <h2
              className="font-display text-theme leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 800 }}
            >
              MENDOZA, <span className="text-gradient-blue">ARGENTINA</span>
            </h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-theme-muted font-condensed">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: MARKER_COLOR }} />En desarrollo
              </span>
            </div>
          </div>
          <p className="text-theme-subtle text-[10px] mt-1.5 leading-relaxed font-condensed italic" style={{ color: 'var(--text-subtle)' }}>
            Los proyectos, superficies y características están sujetos a cambios. La implementación de centros comerciales será evaluada según la viabilidad de cada desarrollo.
          </p>
        </div>

        <div className="flex flex-1 min-h-0 gap-5">

        {/* ── Left: Mendoza Map ─────────────────────────────────── */}
        <div className="flex flex-col shrink-0" style={{ width: '55%' }}>
          <div
            className="flex-1 min-h-0 border bg-theme-card relative overflow-hidden p-3"
            style={{ borderColor: 'var(--border-accent)' }}
          >
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />

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

          <div
            className="relative shrink-0 overflow-hidden border"
            style={{ height: '35%', borderColor: 'var(--border-accent)' }}
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

            <div className="absolute inset-0 bg-gradient-to-t from-hub-ink-deep/95 via-hub-ink-deep/40 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active.id}`}
                className="absolute bottom-0 left-0 right-0 p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className={statusBadgeClass}
                  style={{ backgroundColor: 'rgba(2,42,58,0.85)', color: '#C7C8CA', borderColor: 'rgba(199,200,202,0.45)' }}
                >
                  {active.status}
                </span>
                <h3
                  className="font-display text-white leading-none tracking-wide mt-1"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 800 }}
                >
                  {active.name.toUpperCase()}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    📍 {active.location} · {active.area} m²
                  </p>
                  <Link
                    to={`/proyecto/${active.slug}`}
                    className="text-white text-xs font-semibold tracking-widest uppercase hover:text-hub-silver transition-colors font-condensed"
                  >
                    Ver →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute top-2 right-3 font-accent leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'rgba(199,200,202,0.12)', fontWeight: 500 }}
            >
              {active.number}
            </div>
          </div>

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
                    borderColor: isActive ? 'var(--border-accent)' : 'var(--border)',
                    backgroundColor: isActive ? 'var(--bg-card)' : 'var(--bg-card-alt)',
                  }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200"
                    style={{ background: MARKER_COLOR, opacity: isActive ? 1 : 0 }} />
                  {isLocked && <div className="absolute right-1.5 top-1.5 w-1 h-1 rounded-full" style={{ background: MARKER_COLOR }} />}

                  <span
                    className="font-accent text-lg leading-none w-8 shrink-0 transition-colors"
                    style={{
                      color: isActive ? 'var(--text-accent)' : 'var(--text-subtle)',
                      fontWeight: 500,
                    }}
                  >
                    {project.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span
                      className="font-display text-sm leading-tight tracking-wide truncate block transition-colors"
                      style={{ color: isActive ? 'var(--text-accent)' : 'var(--text-primary)', fontWeight: 700 }}
                    >
                      {project.shortName || project.name}
                    </span>
                    <span className="text-theme text-xs truncate block opacity-60">{project.location} · {project.area} m²</span>
                  </div>

                  <Link
                    to={`/proyecto/${project.slug}`}
                    className="shrink-0 flex items-center gap-1 px-2 py-1 text-[10px] font-semibold tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-all duration-200 border text-theme-accent font-condensed"
                    style={{ borderColor: 'var(--border-accent)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver →
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        </div>
      </div>
    </section>
  )
}
