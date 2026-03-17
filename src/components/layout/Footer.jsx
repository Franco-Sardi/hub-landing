export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-hub-darker border-t border-hub-gold/15">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-hub-gold flex items-center justify-center">
                <span className="font-display text-hub-black text-lg leading-none">H</span>
              </div>
              <span className="font-display text-2xl tracking-widest text-white">HUB</span>
            </div>
            <p className="text-hub-muted text-sm leading-relaxed">
              Infraestructura industrial de clase mundial para el futuro productivo de Argentina.
            </p>
          </div>

          {/* Proyectos */}
          <div>
            <h4 className="font-display text-hub-gold tracking-widest text-sm mb-4">PROYECTOS</h4>
            <ul className="space-y-2">
              {['HUB Córdoba Norte', 'HUB Rosario Logístico', 'HUB Buenos Aires Sur', 'HUB Mendoza', 'HUB Tucumán', 'HUB Patagonia'].map(p => (
                <li key={p}>
                  <a href="#projects" className="text-hub-muted text-sm hover:text-white transition-colors">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display text-hub-gold tracking-widest text-sm mb-4">SERVICIOS</h4>
            <ul className="space-y-2">
              {['Para Inversores', 'Para Empresas', 'Alquiler de Espacios', 'Desarrollo a medida', 'Consultoría'].map(s => (
                <li key={s}>
                  <a href="#contact" className="text-hub-muted text-sm hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-hub-gold tracking-widest text-sm mb-4">CONTACTO</h4>
            <ul className="space-y-2 text-hub-muted text-sm">
              <li>contacto@hubparquesindustriales.com</li>
              <li>+54 (351) 000-0000</li>
              <li>Córdoba, Argentina</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {['LI', 'TW', 'IG'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 border border-hub-gold/30 flex items-center justify-center text-hub-muted text-xs hover:border-hub-gold hover:text-hub-gold transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-hub-gold/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-hub-subtle text-xs">
            © {year} HUB Parques Industriales. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-hub-subtle text-xs hover:text-hub-muted transition-colors">Términos y Condiciones</a>
            <a href="#" className="text-hub-subtle text-xs hover:text-hub-muted transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
