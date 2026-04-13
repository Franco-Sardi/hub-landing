import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const isGold = project.statusColor === 'gold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative border border-hub-electric/10 bg-hub-dark/40 hover:border-hub-electric/30 hover:bg-hub-dark/70 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-hub-electric/40 to-transparent" />

      {/* Image */}
      <div className="relative h-44 bg-hub-black/60 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'brightness(0.55) saturate(0.7)' }}
          />
        ) : (
          <div className="absolute inset-0 bg-grid opacity-60 flex items-center justify-center">
            <span className="font-display text-hub-electric/10 text-6xl tracking-widest">
              {String(project.id).padStart(2, '0')}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-hub-black/80 via-hub-black/20 to-transparent" />

        {/* Commercial center badge */}
        {project.hasCommercialCenter && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-1 bg-hub-electric/90 text-white">
              Centro Comercial
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-1 ${
            isGold
              ? 'bg-hub-electric/15 text-hub-bright border border-hub-electric/30'
              : 'bg-hub-steel/15 text-hub-steel border border-hub-steel/30'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white/60 text-[10px] tracking-wide">{project.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-white text-xl leading-tight tracking-wide mb-2 group-hover:text-hub-bright transition-colors">
          {project.name}
        </h3>

        {/* Area metrics */}
        <div className="flex items-center gap-3 mb-4 text-xs">
          <div>
            <span className="text-hub-bright font-semibold">{project.areaTotal} m²</span>
            <span className="text-hub-muted ml-1">a construir</span>
          </div>
          <span className="w-px h-3 bg-hub-electric/30" />
          <div>
            <span className="text-hub-muted">{project.area} mts</span>
            <span className="text-hub-subtle ml-1">terreno</span>
          </div>
          {project.areaComercial && (
            <>
              <span className="w-px h-3 bg-hub-electric/30" />
              <div>
                <span className="text-hub-bright font-semibold">{project.areaComercial} m²</span>
                <span className="text-hub-muted ml-1">comercial</span>
              </div>
            </>
          )}
        </div>

        <p className="text-hub-muted text-xs leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Commercial center highlight */}
        {project.commercialHighlight && (
          <div className="mb-4 px-3 py-2.5 border-l-2 border-hub-electric/50 bg-hub-electric/5">
            <p className="text-[10px] tracking-widest uppercase text-hub-electric mb-1">Diferencial</p>
            <p className="text-hub-muted text-xs leading-relaxed">{project.commercialHighlight}</p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-hub-electric/60 shrink-0" />
              <span className="text-hub-muted text-xs truncate">{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={`block text-center py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            isGold
              ? 'border border-hub-electric/30 text-hub-electric hover:bg-hub-electric hover:text-white'
              : 'border border-hub-steel/30 text-hub-steel hover:bg-hub-steel hover:text-white'
          }`}
        >
          Consultar Disponibilidad
        </a>
      </div>
    </motion.div>
  )
}
