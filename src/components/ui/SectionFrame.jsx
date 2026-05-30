export default function SectionFrame() {
  return (
    /* Rail vertical izquierdo — hilo conductor entre secciones, solo desktop */
    <div
      className="absolute pointer-events-none hidden lg:block"
      style={{
        left: 20,
        top: 0,
        bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent 0%, var(--stat-deco) 15%, var(--stat-deco) 85%, transparent 100%)',
        zIndex: 1,
      }}
    />
  )
}
