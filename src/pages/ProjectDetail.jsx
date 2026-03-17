import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
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
          <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-hub-gold' : 'bg-white/25'}`} />
        ))}
      </div>
    </motion.div>
  )
}

const statusStyle = {
  gold:  { badge: 'bg-hub-gold/15 text-hub-gold border-hub-gold/30', cta: 'bg-hub-gold text-hub-black hover:bg-hub-gold-light' },
  steel: { badge: 'bg-hub-steel/15 text-hub-steel border-hub-steel/30', cta: 'bg-hub-steel text-white hover:bg-hub-steel-light' },
}

// Slide images — reuse for gallery
const GALLERY = [
  '/assets/slide-2.jpg',
  '/assets/slide-3.jpg',
  '/assets/slide-4.jpg',
  '/assets/slide-5.jpg',
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === Number(id))

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
        <Link to="/" className="text-hub-gold text-sm hover:underline">← Volver al inicio</Link>
      </div>
    )
  }

  const s = statusStyle[project.statusColor]
  const gallery = GALLERY.filter((_, i) => i !== project.id % 4)

  const [lightbox, setLightbox] = useState(null) // index o null
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => setLightbox((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length])
  const nextImage = useCallback(() => setLightbox((i) => (i + 1) % gallery.length), [gallery.length])

  return (
    <div className="bg-hub-black min-h-screen font-body">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[70vh] overflow-hidden">
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
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium tracking-wider transition-colors group"
        >
          <span className="w-8 h-px bg-white/40 group-hover:bg-white transition-colors" />
          VOLVER
        </Link>

        {/* Project number */}
        <div className="absolute top-6 right-8 font-display text-white/6 leading-none select-none"
          style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}
        >
          {String(project.id).padStart(2, '0')}
        </div>

        {/* Hero content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 pb-12 max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-gold" />
            <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">HUB · Parque Industrial</span>
            <span className={`text-xs font-semibold tracking-wider uppercase px-2 py-0.5 border ${s.badge}`}>
              {project.status}
            </span>
          </div>
          <h1
            className="font-display text-white leading-none tracking-wide mb-2"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {project.name.toUpperCase()}
          </h1>
          <p className="text-hub-muted text-sm flex items-center gap-2">
            <span>📍</span> {project.location}
            <span className="w-px h-4 bg-hub-subtle" />
            <span className="text-hub-gold font-semibold">{project.area} m²</span>
            <span className="w-px h-4 bg-hub-subtle" />
            <span>{project.units}</span>
          </p>
        </motion.div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-display text-white text-2xl tracking-wide mb-4">DESCRIPCIÓN</h2>
              <p className="text-hub-muted leading-relaxed mb-8">{project.description}</p>

              {/* Features grid */}
              <h2 className="font-display text-white text-2xl tracking-wide mb-4">INFRAESTRUCTURA</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {project.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 border border-hub-gold/12 bg-hub-dark/30">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.statusColor === 'gold' ? 'bg-hub-gold' : 'bg-hub-steel'}`} />
                    <span className="text-white text-sm">{f}</span>
                  </div>
                ))}
                {[
                  'Seguridad y CCTV 24/7',
                  'Fibra óptica',
                  'Oficinas y SUM',
                  'Estacionamiento',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 border border-hub-gold/8 bg-hub-dark/20">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-hub-subtle" />
                    <span className="text-hub-muted text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <h2 className="font-display text-white text-2xl tracking-wide mb-4">GALERÍA</h2>
              <div className="grid grid-cols-3 gap-2">
                {gallery.slice(0, 3).map((src, i) => (
                  <motion.div
                    key={src}
                    className="aspect-video overflow-hidden border border-hub-gold/10 cursor-zoom-in relative group"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={src}
                      alt={`Vista ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300">⊕</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Specs */}
            <div className="border border-hub-gold/15 bg-hub-dark/40 p-5">
              <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase mb-4">Especificaciones</p>
              <div className="space-y-3">
                {[
                  { label: 'Superficie total', value: `${project.area} m²` },
                  { label: 'Módulos',           value: project.units },
                  { label: 'Altura libre',       value: '18 m' },
                  { label: 'Carga de piso',      value: '5 t/m²' },
                  { label: 'Energía',            value: '380V trifásica' },
                  { label: 'Acceso camiones',    value: 'Hasta 40 t' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between gap-2">
                    <span className="text-hub-muted text-xs">{item.label}</span>
                    <span className="text-white text-xs font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contracts */}
            <div className="border border-hub-gold/10 bg-hub-dark/30 p-5">
              <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase mb-3">Modalidades</p>
              {['Alquiler', 'Compra', 'Build-to-suit'].map((m) => (
                <div key={m} className="flex items-center gap-2 py-1.5 border-b border-hub-gold/8 last:border-0">
                  <span className={`w-1 h-1 rounded-full ${project.statusColor === 'gold' ? 'bg-hub-gold' : 'bg-hub-steel'}`} />
                  <span className="text-white text-sm">{m}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <a
                href="/#contact"
                className={`py-3 text-center text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${s.cta}`}
              >
                Consultar Disponibilidad
              </a>
              <Link
                to="/"
                className="py-3 text-center border border-hub-gold/20 text-hub-muted text-xs font-semibold tracking-widest uppercase hover:border-hub-gold/40 hover:text-white transition-all duration-200"
              >
                ← Ver todos los parques
              </Link>
            </div>

            {/* Other projects */}
            <div className="border border-hub-gold/8 bg-hub-dark/20 p-4">
              <p className="text-hub-muted text-xs font-semibold tracking-widest uppercase mb-3">Otros Parques</p>
              <div className="space-y-2">
                {projects.filter((p) => p.id !== project.id).slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to={`/proyecto/${p.id}`}
                    className="flex items-center gap-2 group"
                  >
                    <span className="font-display text-hub-gold/30 text-sm group-hover:text-hub-gold/70 transition-colors">
                      {String(p.id).padStart(2, '0')}
                    </span>
                    <span className="text-hub-muted text-xs group-hover:text-white transition-colors truncate">
                      {p.name}
                    </span>
                    <span className="ml-auto text-hub-subtle text-xs group-hover:text-hub-gold transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-hub-gold/10 mt-8">
        <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-hub-gold flex items-center justify-center">
              <span className="font-display text-hub-black text-xs leading-none">H</span>
            </div>
            <span className="font-display text-hub-muted text-sm tracking-widest">HUB</span>
            <span className="text-hub-subtle text-xs">© {new Date().getFullYear()} Parques Industriales</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-hub-subtle text-xs hover:text-hub-muted transition-colors">← Inicio</Link>
            <a href="/#contact" className="text-hub-gold text-xs hover:underline">Contacto</a>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={gallery.slice(0, 3)}
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
