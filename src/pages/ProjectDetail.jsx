import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectMap from '../components/ui/ProjectMap'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    // Freeze body scroll so fixed overlay stays put on mobile
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Imagen */}
      <motion.img
        key={index}
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain select-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl leading-none transition-colors"
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl leading-none transition-colors px-3 py-2"
        >
          ←
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl leading-none transition-colors px-3 py-2"
        >
          →
        </button>
      )}

      {/* Contador */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-hub-electric' : 'bg-white/25'}`} />
        ))}
      </div>
    </motion.div>
  )
}

const statusStyle = {
  gold:  { badge: 'bg-hub-electric/15 text-hub-electric border-hub-electric/30', cta: 'bg-hub-electric text-white hover:bg-hub-bright' },
  steel: { badge: 'bg-hub-steel/15 text-hub-steel border-hub-steel/30', cta: 'bg-hub-steel text-white hover:bg-hub-steel-light' },
}

// Per-project gallery images — Anchorena
import anchorena01 from '../assets/HUB MZA - Anchorena - Naves - 01.webp'
import anchorena02 from '../assets/HUB MZA - Anchorena - Naves - 02.webp'
import anchorenaEdificio from '../assets/anchorena-coworking-watercolor.webp'
import anchorenaEdificio02 from '../assets/HUB MZA - Anchorena - Edificio - 02.webp'
import anchorenaPlanimetria from '../assets/HUB MZA - Anchorena - Planimetría.webp'
// Style-transfer artistic renders (colores reales de las naves)
import anchorenaStyle02 from '../assets/Anchorena 02_style_transfer02.webp'
import anchorenaStyle03 from '../assets/Anchorena 03_style_transfer01.webp'
import anchorenaStyle06a from '../assets/Anchorena 06_style_transfer01.webp'
import anchorenaStyle06b from '../assets/Anchorena 06_style_transfer02.webp'
import anchorenaStyle08 from '../assets/Anchorena 08_style_transfer01.webp'
import anchorenaStyle09 from '../assets/Anchorena 09_style_transfer01.webp'
import sfdmRender from '../assets/HUB MZA - SFDM - Ante proyecto - TERRENO 02 - render conceptual - Ver 01-B - RENDER.webp'
import sfdmPlanta from '../assets/HUB MZA - SFDM - Ante proyecto - ver 01 - RENDERS PLANTA.webp'
import sfdmConcepto from '../assets/HUB MZA - SFDM - Ante proyecto - ver 01 - RENDERS CONCEPTO - 2.webp'
import crpAereo from '../assets/CRP - PROYECTO NAVE LOGÍSTICA - RENDER AEREO.webp'
import crpZonificacion from '../assets/CRP - PROYECTO NAVE LOGÍSTICA - ZONIFICACIÓN- tipo D.webp'
import malabiaAereo from '../assets/HUB MZA - MALABIA - RENDER AEREO.webp'
import malabiaCentro1 from '../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 01.webp'
import malabiaCentro2 from '../assets/HUB MZA - MALABIA - RENDER CENTRO COMERCIAL 02.webp'

const PROJECT_GALLERY = {
  1: [anchorenaStyle09, anchorenaStyle08, anchorenaStyle06a, anchorenaStyle06b, anchorenaStyle03, anchorenaStyle02, anchorena01, anchorena02, anchorenaEdificio, anchorenaEdificio02, anchorenaPlanimetria],
  2: [sfdmRender, sfdmPlanta, sfdmConcepto],
  3: [sfdmConcepto, sfdmRender, sfdmPlanta],
  4: [crpAereo, crpZonificacion],
  5: [malabiaAereo, malabiaCentro1, malabiaCentro2],
}

const PROJECT_DIFFERENTIAL = {
  1: {
    image: anchorenaEdificio,
    tag: 'Diferencial exclusivo',
    label: 'EDIFICIO DE COWORKING',
    desc: 'Espacios de trabajo profesional integrados al parque, disponibles para empresas inquilinas e inversores.',
  },
  2: {
    image: sfdmRender,
    tag: 'Hub Logístico',
    label: 'NAVE LOGÍSTICA TRIPLE A',
    desc: '20.000 m² de espacio cubierto con área operativa, muelles de carga y estacionamientos segregados para tráfico pesado y liviano.',
  },
  3: {
    image: sfdmConcepto,
    tag: 'Hub Logístico',
    label: 'NAVE LOGÍSTICA TRIPLE A',
    desc: '40.000 m² de espacio cubierto — la nave de mayor escala de la red HUB. Módulos adaptables desde 1.000 m² con muelles de carga dedicados.',
  },
  4: {
    image: crpAereo,
    tag: 'Diferencial exclusivo',
    label: 'CENTRO COMERCIAL INTEGRADO',
    desc: 'Gastronomía, proveedores, servicios bancarios y amenities dentro del mismo predio — sin salir del hub.',
  },
  5: {
    image: malabiaCentro1,
    tag: 'Diferencial exclusivo',
    label: 'CENTRO DE SERVICIOS',
    desc: 'Gastronomía, proveedores y servicios de soporte para los equipos del corredor — todo dentro del mismo predio.',
  },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  // Allow scrolling on detail pages (overrides Landing's overflow:hidden)
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (!project) {
    return (
      <div className="h-screen bg-hub-black flex flex-col items-center justify-center gap-4">
        <p className="text-hub-muted font-display text-2xl tracking-widest">PARQUE NO ENCONTRADO</p>
        <Link to="/" className="text-hub-electric text-sm hover:underline">← Volver al inicio</Link>
      </div>
    )
  }

  const s = statusStyle[project.statusColor]
  const gallery = PROJECT_GALLERY[project.id] || []
  const differential = PROJECT_DIFFERENTIAL[project.id]

  const [lightbox, setLightbox] = useState(null) // index o null
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => setLightbox((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length])
  const nextImage = useCallback(() => setLightbox((i) => (i + 1) % gallery.length), [gallery.length])

  return (
    <div className="bg-theme min-h-screen font-body overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[50vh] sm:h-[70vh] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hub-black via-hub-black/40 to-hub-black/20" />

        {/* Back button */}
        <Link
          to="/#projects"
          className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center gap-2 text-white text-sm font-medium tracking-wider transition-all duration-200 group px-3 py-2 bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <span className="text-white/70 group-hover:text-white transition-colors">←</span>
          VOLVER
        </Link>

        {/* Project number */}
        <div className="absolute top-6 right-8 font-display text-white/6 leading-none select-none"
          style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}
        >
          {String(project.id).padStart(2, '0')}
        </div>

        {/* Image disclaimer */}
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm">
          <p className="text-white/60 text-[10px] tracking-wide italic text-right">
            Render ilustrativo · sujeto a modificaciones de proyecto
          </p>
        </div>

        {/* Hero content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 sm:pb-12 max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 sm:w-8 h-px bg-white" />
            <span className="text-white text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
              HUB · {project.coworkingBuilding ? 'Nave + Coworking' : project.hasCommercialCenter ? 'Nave + Centro Comercial' : 'Nave Logística'}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2 py-0.5 border border-white/40 bg-black/50 text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {project.status}
            </span>
          </div>
          <h1
            className="font-display text-white leading-none tracking-wide mb-2"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 5rem)' }}
          >
            {project.name.toUpperCase()}
          </h1>
          <p className="text-hub-muted text-xs sm:text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>📍 {project.location}</span>
            <span className="w-px h-3 bg-hub-subtle hidden sm:block" />
            <span className="text-hub-electric font-semibold">{project.area} m²</span>
          </p>
        </motion.div>
      </div>

      {/* ── Aviso renders ─────────────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-2 flex items-center gap-2">
          <span className="text-theme-subtle text-[10px]">⚠</span>
          <p className="text-theme-subtle text-[10px] tracking-wide">
            Todas las imágenes, renders y visualizaciones de este proyecto son ilustrativas y orientativas. Los diseños finales están sujetos a modificaciones.
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-display text-theme text-2xl tracking-wide mb-4">DESCRIPCIÓN</h2>
              <p className="text-theme-muted leading-relaxed mb-8">{project.description}</p>

              {/* Differential image — per project */}
              {differential && (
                <div className="mb-8 border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  <div className="relative overflow-hidden" style={{ maxHeight: '340px' }}>
                    <img
                      src={differential.image}
                      alt={differential.label}
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm">
                      <p className="text-white/50 text-[9px] italic tracking-wide">Visualización ilustrativa</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-hub-bright text-[10px] font-semibold tracking-[0.3em] uppercase mb-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>{differential.tag}</p>
                      <h3 className="font-display text-white text-2xl tracking-wide leading-none" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{differential.label}</h3>
                      <p className="text-white text-sm mt-2 opacity-80" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{differential.desc}</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="flex flex-col gap-4 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Specs */}
            <div className="border bg-theme-card p-5" style={{ borderColor: 'var(--border)' }}>
              <p className="text-theme-muted text-xs font-semibold tracking-widest uppercase mb-4">Especificaciones</p>
              <div className="space-y-3">
                {[
                  { label: 'Sup. terreno',       value: `${project.area} m²` },
                  { label: 'Sup. naves',         value: `${project.areaNaves} m²` },
                  { label: 'Total a construir',   value: `${project.areaTotal} m²` },
                  ...(project.areaComercial ? [{ label: 'Centro comercial', value: `${project.areaComercial} m²` }] : []),
                  { label: 'Estándar',           value: 'Triple A' },
                  { label: 'Certificaciones',    value: 'Certificables' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between gap-2 pb-2 border-b last:border-0 last:pb-0"
                    style={{ borderColor: 'var(--border)' }}>
                    <span className="text-theme-muted text-xs">{item.label}</span>
                    <span className="text-theme text-xs font-semibold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <Link
                to="/#contact"
                className={`py-3 text-center text-xs font-semibold tracking-widest uppercase transition-colors duration-200 block ${s.cta}`}
              >
                Consultar Disponibilidad
              </Link>
              <Link
                to="/#projects"
                className="py-3 text-center border text-xs font-semibold tracking-widest uppercase hover:border-hub-electric/40 hover:text-hub-electric transition-all duration-200 block"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                ← Ver todos los parques
              </Link>
            </div>

            {/* Other projects */}
            <div className="border bg-theme-card p-4" style={{ borderColor: 'var(--border)' }}>
              <p className="text-theme-muted text-xs font-semibold tracking-widest uppercase mb-3">Otros Parques</p>
              <div className="space-y-2">
                {projects.filter((p) => p.id !== project.id).slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to={`/proyecto/${p.slug}`}
                    className="flex items-center gap-2 group"
                  >
                    <span className="font-display text-hub-electric/40 text-sm group-hover:text-hub-electric transition-colors">
                      {String(p.id).padStart(2, '0')}
                    </span>
                    <span className="text-theme-muted text-xs group-hover:text-theme transition-colors truncate">
                      {p.name}
                    </span>
                    <span className="ml-auto text-theme-subtle text-xs group-hover:text-hub-electric transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Infraestructura + Galería — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mt-10 pt-10 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Left: features */}
          <div>
            <h2 className="font-display text-theme text-2xl tracking-wide mb-4">INFRAESTRUCTURA</h2>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 p-2.5 border bg-theme-card"
                  style={{ borderColor: 'var(--border-accent)' }}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.statusColor === 'gold' ? 'bg-hub-electric' : 'bg-hub-steel'}`} />
                  <span className="text-theme text-xs">{f}</span>
                </div>
              ))}
              {['Energías renovables', 'Fibra óptica', 'Reutilización de aguas', 'Control consumo energía'].map((f) => (
                <div key={f} className="flex items-center gap-2.5 p-2.5 border bg-theme-card"
                  style={{ borderColor: 'var(--border)' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-theme-subtle" />
                  <span className="text-theme-muted text-xs">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: gallery preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-theme text-2xl tracking-wide">GALERÍA</h2>
              {gallery.length > 4 && (
                <button
                  onClick={() => setLightbox(0)}
                  className="text-hub-electric text-xs font-semibold tracking-widest uppercase hover:text-hub-bright transition-colors"
                >
                  Ver todas ({gallery.length}) →
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {gallery.slice(0, 4).map((src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden border border-hub-electric/10 cursor-zoom-in group"
                  style={{ aspectRatio: '16/10' }}
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={src}
                    alt={`Vista ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {i === 3 && gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <span className="font-display text-white text-2xl">+{gallery.length - 4}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Ubicación ── */}
        {project.coords && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-theme text-2xl tracking-wide">UBICACIÓN</h2>
              <span className="w-8 h-px bg-hub-electric/40" />
              <span className="text-theme-muted text-xs">{project.address || project.location}</span>
            </div>
            <div className="border overflow-hidden" style={{ borderColor: 'var(--border-accent)' }}>
              <ProjectMap project={project} />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.address || project.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-hub-electric text-xs font-semibold tracking-widest uppercase hover:text-hub-bright transition-colors"
            >
              Abrir en Google Maps →
            </a>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}>
              <span className="font-display text-xs leading-none" style={{ color: 'var(--bg-primary)' }}>H</span>
            </div>
            <span className="font-display text-theme-muted text-sm tracking-widest">HUB</span>
            <span className="text-theme-subtle text-xs">© {new Date().getFullYear()} Naves Logísticas</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-theme-subtle text-xs hover:text-theme-muted transition-colors">← Inicio</Link>
            <a href="/#contact" className="text-hub-electric text-xs hover:underline">Contacto</a>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={gallery}
            index={lightbox}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
