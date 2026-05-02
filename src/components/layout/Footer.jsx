export default function Footer() {
  const year = new Date().getFullYear()

  const Logo = ({ size = 'lg' }) => (
    <img
      src="/hub-logo-oficial.png"
      alt="HUB"
      style={{
        height: size === 'lg' ? '2rem' : '1.4rem',
        width: 'auto',
        filter: 'brightness(0) invert(79%)',
      }}
    />
  )

  return (
    <footer className="bg-theme border-t relative" style={{ borderColor: 'var(--border)' }}>
      <div className="w-full max-w-[95vw] 3xl:max-w-[1700px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* ── Mobile: compact ── */}
        <div className="lg:hidden py-8">
          <div className="flex items-center justify-between mb-6">
            <Logo size="sm" />
            <div className="flex gap-2">
              {['LinkedIn', 'Instagram'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[9px] text-theme-muted border px-3 py-1.5 tracking-widest uppercase font-condensed hover:text-theme-accent transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-0 border-t" style={{ borderColor: 'var(--border)' }}>
            {[
              { label: 'Email',    value: 'contacto@hubmza.com.ar' },
              { label: 'Tel',      value: '+54 261 000-0000' },
              { label: 'Sede',     value: 'Mendoza, Argentina' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-theme-muted/60 text-[10px] tracking-widest uppercase font-condensed w-12 shrink-0">{item.label}</span>
                <span className="text-theme text-xs text-right">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-theme-muted/50 text-[10px]">© {year} HUB · Mendoza</span>
            <div className="flex gap-4">
              <a href="#" className="text-theme-muted/60 text-[10px] hover:text-theme-accent transition-colors">Términos</a>
              <a href="#" className="text-theme-muted/60 text-[10px] hover:text-theme-accent transition-colors">Privacidad</a>
            </div>
          </div>
        </div>

        {/* ── Desktop: full grid ── */}
        <div className="hidden lg:block py-12">
          <div className="grid grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-theme-muted text-xs leading-relaxed max-w-xs">
                Red de infraestructura y servicios para el crecimiento cotidiano de tu empresa.
              </p>
            </div>

            {/* Navegación */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3 font-condensed">Navegación</h4>
              <ul className="space-y-1.5">
                {['Nosotros', 'Modelo', 'Proyectos', 'Empresas', 'Contacto'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-theme-muted/80 text-xs hover:text-theme-accent transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3 font-condensed">Servicios</h4>
              <ul className="space-y-1.5">
                {['Naves industriales Triple A', 'Módulos adaptables', 'Build-to-suit', 'Sistema modular', 'Sustentabilidad certificable'].map((s) => (
                  <li key={s}><span className="text-theme-muted/80 text-xs">{s}</span></li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-theme-muted text-[10px] font-semibold tracking-widest uppercase mb-3 font-condensed">Contacto</h4>
              <ul className="space-y-1.5 text-theme-muted/80 text-xs">
                <li>contacto@hubmza.com.ar</li>
                <li>+54 261 000-0000</li>
                <li>Mendoza, Argentina</li>
              </ul>
              <div className="flex gap-2 mt-3">
                {['LinkedIn', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[10px] text-theme-muted/60 border px-2.5 py-1 tracking-widest uppercase hover:text-theme-accent transition-all duration-200 font-condensed"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t pt-5 flex justify-between items-center" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <span className="text-theme-muted/40 text-[10px] font-mono tracking-[0.2em]">LAT -32.89° · LON -68.84°</span>
              <span className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
              <span className="text-theme-muted text-[10px]">© {year} HUB · Mendoza</span>
            </div>
            <div className="flex gap-5">
              <a href="#" className="text-theme-muted text-[10px] hover:text-theme-accent transition-colors">Términos</a>
              <a href="#" className="text-theme-muted text-[10px] hover:text-theme-accent transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
