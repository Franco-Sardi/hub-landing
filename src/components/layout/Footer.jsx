export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-theme border-t border-theme relative" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">

        {/* ── Mobile: compact ── */}
        <div className="lg:hidden py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-white/10 flex items-center justify-center"
                style={{ backgroundColor: 'var(--text-primary)' }}>
                <span className="font-display text-xs leading-none" style={{ color: 'var(--bg-primary)' }}>H</span>
              </div>
              <span className="font-display text-lg tracking-widest text-theme">HUB</span>
            </div>
            <div className="flex gap-2">
              {['LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#" className="text-[9px] text-theme-muted/50 border px-2 py-0.5 tracking-widest uppercase" style={{ borderColor: 'var(--border)' }}>{s}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-theme-muted/50 text-[10px] mb-3">
            <span>contacto@hubindustriales.com</span>
            <span>+54 261 000-0000</span>
            <span>Mendoza, Argentina</span>
          </div>
          <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <span className="text-theme-muted text-[10px]">© {year} HUB Naves Logísticas</span>
            <div className="flex gap-4">
              <a href="#" className="text-theme-muted text-[10px]">Términos</a>
              <a href="#" className="text-theme-muted text-[10px]">Privacidad</a>
            </div>
          </div>
        </div>

        {/* ── Desktop: full grid ── */}
        <div className="hidden lg:block py-12">
          <div className="grid grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 border border-white/10 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--text-primary)' }}>
                  <span className="font-display text-sm leading-none" style={{ color: 'var(--bg-primary)' }}>H</span>
                </div>
                <span className="font-display text-xl tracking-widest text-theme">HUB</span>
              </div>
              <p className="text-theme-muted text-xs leading-relaxed max-w-xs">
                Red de infraestructura y servicios para el crecimiento cotidiano de tu empresa.
              </p>
            </div>

            {/* Navegación */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3">Navegación</h4>
              <ul className="space-y-1.5">
                {['Nosotros', 'Modelo', 'Proyectos', 'Empresas', 'Contacto'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-theme-muted/70 text-xs hover:text-hub-bright transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3">Servicios</h4>
              <ul className="space-y-1.5">
                {['Alquiler industrial', 'Compra de módulos', 'Lease-back', 'Build-to-suit', 'Inversión en USD'].map((s) => (
                  <li key={s}><span className="text-theme-muted/70 text-xs">{s}</span></li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3">Contacto</h4>
              <ul className="space-y-1.5 text-theme-muted/70 text-xs">
                <li>contacto@hubindustriales.com</li>
                <li>+54 261 000-0000</li>
                <li>Mendoza, Argentina</li>
              </ul>
              <div className="flex gap-2 mt-3">
                {['LinkedIn', 'Instagram'].map((social) => (
                  <a key={social} href="#"
                    className="text-[10px] text-theme-muted/50 border px-2.5 py-1 tracking-widest uppercase hover:border-hub-electric/40 hover:text-hub-bright transition-all duration-200"
                    style={{ borderColor: 'var(--border)' }}
                  >{social}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t pt-5 flex justify-between items-center" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <span className="text-theme-muted/20 text-[10px] font-mono tracking-[0.2em]">LAT -32.89° · LON -68.84°</span>
              <span className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
              <span className="text-theme-muted text-[10px]">© {year} HUB Naves Logísticas · Mendoza</span>
            </div>
            <div className="flex gap-5">
              <a href="#" className="text-theme-muted text-[10px] hover:text-theme/35 transition-colors">Términos</a>
              <a href="#" className="text-theme-muted text-[10px] hover:text-theme/35 transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
