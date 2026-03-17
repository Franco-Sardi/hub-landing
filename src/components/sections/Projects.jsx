import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import MendozaMap from '../ui/MendozaMap'

const statusStyle = {
  gold:  { badge: 'bg-hub-gold/15 text-hub-gold border-hub-gold/30',   bar: 'bg-hub-gold' },
  steel: { badge: 'bg-hub-steel/15 text-hub-steel border-hub-steel/30', bar: 'bg-hub-steel' },
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
      className="min-h-screen lg:h-screen bg-hub-black relative overflow-x-hidden lg:overflow-hidden flex flex-col pt-16 lg:pt-20"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* ── Mobile layout ──────────────────────────────────────── */}
      <div className="lg:hidden relative px-4 pt-4 pb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-hub-gold" />
          <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">HUB · Proyectos</span>
        </div>
        <h2 className="font-display text-white leading-none tracking-wide text-3xl mb-2">
          MENDOZA,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>ARGENTINA</span>
        </h2>

        {/* Mapa mobile — altura fija para que el SVG se vea */}
        <div className="relative border border-hub-gold/15 bg-hub-dark/30" style={{ height: 280 }}>
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-hub-gold/25 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-hub-gold/25 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-hub-gold/25 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-hub-gold/25 pointer-events-none" />
          <MendozaMap
            projects={projects}
            activeId={activeId}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 -mt-1">
          <span className="flex items-center gap-1.5 text-xs text-hub-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-hub-gold" />En Desarrollo
          </span>
          <span className="flex items-center gap-1.5 text-xs text-hub-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-hub-steel" />Próximamente
          </span>
        </div>

        {projects.map((project) => {
          const st = statusStyle[project.statusColor]
          const isMobileActive = lockedId === project.id
          return (
            <Link
              key={project.id}
              to={`/proyecto/${project.id}`}
              className={`relative overflow-hidden border bg-hub-dark/30 transition-all duration-300 ${
                isMobileActive
                  ? project.statusColor === 'gold' ? 'border-hub-gold/60' : 'border-hub-steel/60'
                  : 'border-hub-gold/10'
              }`}
            >
              <div className="relative h-40 overflow-hidden">
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
                  <span className="text-hub-gold font-semibold text-sm shrink-0">{project.area} m²</span>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-hub-muted text-xs">📍 {project.location}</span>
                <span className={`text-xs font-semibold tracking-widest uppercase ${project.statusColor === 'gold' ? 'text-hub-gold' : 'text-hub-steel'}`}>
                  Ver parque →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 max-w-7xl mx-auto px-6 w-full py-4 gap-5 min-h-0">

        {/* ── Left: Mendoza Map ─────────────────────────────────── */}
        <div className="hidden lg:flex flex-col shrink-0" style={{ width: '40%' }}>
          {/* Header */}
          <div className="mb-3 shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-px bg-hub-gold" />
              <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">HUB · Proyectos</span>
            </div>
            <h2
              className="font-display text-white leading-none tracking-wide"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}
            >
              MENDOZA,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                ARGENTINA
              </span>
            </h2>
          </div>

          {/* Map container */}
          <div className="flex-1 min-h-0 border border-hub-gold/15 bg-hub-dark/30 relative overflow-hidden p-3">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-hub-gold/25 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-hub-gold/25 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-hub-gold/25 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-hub-gold/25 pointer-events-none" />

            <MendozaMap
              projects={projects}
              activeId={activeId}
              onHover={handleHover}
              onSelect={handleSelect}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-hub-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-hub-gold" />En Desarrollo
            </span>
            <span className="flex items-center gap-1.5 text-xs text-hub-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-hub-steel" />Próximamente
            </span>
          </div>
        </div>

        {/* ── Right: Image preview + project list ───────────────── */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0 gap-3">

          {/* Image preview */}
          <div className="relative shrink-0 overflow-hidden border border-hub-gold/15"
            style={{ height: '38%' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-hub-black/90 via-hub-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-hub-black/50 to-transparent" />

            {/* Project info overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active.id}`}
                className="absolute bottom-0 left-0 right-0 p-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold tracking-wider uppercase px-2 py-0.5 border ${s.badge}`}>
                        {active.status}
                      </span>
                      <span className="text-hub-muted text-xs">{active.area} m²</span>
                    </div>
                    <h3
                      className="font-display text-white leading-none tracking-wide"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                    >
                      {active.name.toUpperCase()}
                    </h3>
                    <p className="text-hub-muted text-xs mt-0.5 flex items-center gap-1">
                      <span className="text-hub-gold">📍</span> {active.location}
                    </p>
                  </div>

                  <Link
                    to={`/proyecto/${active.id}`}
                    className={`shrink-0 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                      active.statusColor === 'gold'
                        ? 'bg-hub-gold text-hub-black hover:bg-hub-gold-light'
                        : 'border border-hub-steel/50 text-hub-steel hover:bg-hub-steel/10'
                    }`}
                  >
                    Ver Parque →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Number watermark */}
            <div className="absolute top-3 right-4 font-display text-white/8 leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              {String(active.id).padStart(2, '0')}
            </div>
          </div>

          {/* Project list */}
          <div
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5 no-scrollbar"
            onWheel={(e) => e.stopPropagation()}
          >
            {projects.map((project, i) => {
              const st = statusStyle[project.statusColor]
              const isActive = activeId === project.id
              const isLocked = lockedId === project.id
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onMouseEnter={() => handleHover(project.id)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleSelect(project.id)}
                  className={`group relative flex items-center gap-3 px-3 py-2 border transition-all duration-250 cursor-pointer ${
                    isActive
                      ? 'border-hub-gold/35 bg-hub-dark/60'
                      : 'border-hub-gold/8 bg-hub-dark/20 hover:border-hub-gold/20 hover:bg-hub-dark/40'
                  }`}
                >
                  {/* Active bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200 ${st.bar} ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  {/* Lock indicator */}
                  {isLocked && <div className="absolute right-2 top-1.5 w-1 h-1 rounded-full bg-hub-gold/60" />}

                  {/* Number */}
                  <span className={`font-display text-xl leading-none w-7 shrink-0 transition-colors ${isActive ? 'text-hub-gold/70' : 'text-hub-gold/20'}`}>
                    {String(project.id).padStart(2, '0')}
                  </span>

                  {/* Name + location */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-display text-sm leading-tight tracking-wide truncate transition-colors ${isActive ? 'text-hub-gold-light' : 'text-white group-hover:text-hub-gold-light'}`}>
                        {project.name}
                      </span>
                      <span className={`text-xs font-semibold tracking-wide uppercase px-1.5 py-0.5 border shrink-0 ${st.badge}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-hub-muted text-xs truncate">{project.location}</span>
                      <span className="w-px h-3 bg-hub-subtle/30 shrink-0" />
                      <span className={`text-xs font-medium shrink-0 ${project.statusColor === 'gold' ? 'text-hub-gold/70' : 'text-hub-steel/70'}`}>
                        {project.area} m²
                      </span>
                    </div>
                  </div>

                  {/* Features — compact */}
                  <div className="hidden xl:flex items-center gap-3 shrink-0">
                    {project.features.slice(0, 2).map((f) => (
                      <span key={f} className="text-hub-subtle text-xs">{f}</span>
                    ))}
                  </div>

                  {/* Link arrow */}
                  <Link
                    to={`/proyecto/${project.id}`}
                    className={`shrink-0 flex items-center gap-1 px-2 py-1 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 border ${
                      project.statusColor === 'gold'
                        ? 'border-hub-gold/50 text-hub-gold hover:bg-hub-gold hover:text-hub-black'
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

      </div>{/* end desktop layout */}
    </section>
  )
}
