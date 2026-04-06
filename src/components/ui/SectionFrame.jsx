const CORNERS = [
  { top: 14,    left: 14  },
  { top: 14,    right: 14 },
  { bottom: 14, left: 14  },
  { bottom: 14, right: 14 },
]

export default function SectionFrame() {
  return (
    <>
      {/* Borde interior — solo desktop */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{ inset: 20, border: '1px solid var(--stat-deco)', zIndex: 1 }}
      />
      {/* Esquinas — solo desktop */}
      {CORNERS.map((pos, i) => (
        <div
          key={i}
          className="absolute pointer-events-none hidden lg:block"
          style={{
            ...pos,
            width: 18,
            height: 18,
            borderTop:    pos.bottom === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderBottom: pos.top    === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderLeft:   pos.right  === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            borderRight:  pos.left   === undefined ? '2px solid var(--stat-deco-strong)' : undefined,
            zIndex: 2,
          }}
        />
      ))}
    </>
  )
}
