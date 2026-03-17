import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const isGold = project.statusColor === 'gold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative border border-hub-gold/10 bg-hub-dark/40 hover:border-hub-gold/30 hover:bg-hub-dark/70 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Top gold accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-hub-gold/40 to-transparent" />

      {/* Image placeholder */}
      <div className="relative h-40 bg-hub-black/60 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-hub-gold/10 text-6xl tracking-widest">{String(project.id).padStart(2, '0')}</span>
        </div>
        {/* Location tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-hub-muted text-xs font-medium tracking-wide bg-hub-black/80 px-2 py-1">
            📍 {project.location}
          </span>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold tracking-wider uppercase px-2 py-1 ${
            isGold
              ? 'bg-hub-gold/15 text-hub-gold border border-hub-gold/30'
              : 'bg-hub-steel/15 text-hub-steel border border-hub-steel/30'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-white text-2xl leading-tight tracking-wide mb-1 group-hover:text-hub-gold-light transition-colors">
          {project.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-hub-gold font-semibold text-sm">{project.area} m²</span>
          <span className="w-1 h-1 rounded-full bg-hub-subtle" />
          <span className="text-hub-muted text-xs">{project.units}</span>
        </div>

        <p className="text-hub-muted text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-hub-gold/60 shrink-0" />
              <span className="text-hub-muted text-xs truncate">{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={`block text-center py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            isGold
              ? 'border border-hub-gold/30 text-hub-gold hover:bg-hub-gold hover:text-hub-black'
              : 'border border-hub-steel/30 text-hub-steel hover:bg-hub-steel hover:text-white'
          }`}
        >
          Consultar Disponibilidad
        </a>
      </div>
    </motion.div>
  )
}
