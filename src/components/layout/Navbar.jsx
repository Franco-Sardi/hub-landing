import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Nosotros',  page: 2 },
  { label: 'Modelo',    page: 3 },
  { label: 'Proyectos', page: 4 },
  { label: 'Empresas',  page: 5 },
  { label: 'Contacto',  page: 6 },
]

export default function Navbar({ currentPage = 0, goTo = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = currentPage > 0

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? 'bg-hub-black/90 border-b border-hub-azure/20 shadow-lg shadow-black/40'
          : 'bg-hub-black/60 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button onClick={() => goTo(0)} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-hub-electric flex items-center justify-center">
            <span className="font-display text-white text-lg leading-none">H</span>
          </div>
          <span className="font-display text-2xl tracking-widest text-white group-hover:text-hub-bright transition-colors">
            HUB
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => goTo(link.page)}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  currentPage === link.page ? 'text-hub-bright' : 'text-hub-muted hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-hub-electric transition-all duration-300 ${
                  currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => goTo(6)}
            className="px-5 py-2 border border-hub-electric/50 text-hub-bright text-sm font-medium hover:bg-hub-electric hover:text-white transition-all duration-300"
          >
            Contactar
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-hub-dark/98 border-t border-hub-azure/20"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => { goTo(link.page); setMobileOpen(false) }}
                    className="text-hub-muted hover:text-hub-bright text-base font-medium transition-colors block py-1 text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { goTo(6); setMobileOpen(false) }}
                  className="block w-full py-3 text-center border border-hub-electric text-hub-bright font-medium hover:bg-hub-electric hover:text-white transition-all mt-2"
                >
                  Contactar
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
