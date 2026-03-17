import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Nosotros',  page: 2 },
  { label: 'Modelo',    page: 3 },
  { label: 'Proyectos', page: 4 },
  { label: 'Inversores',page: 5 },
  { label: 'Empresas',  page: 6 },
  { label: 'Contacto',  page: 7 },
]

export default function Navbar({ currentPage = 0, goTo = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = currentPage > 0

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-hub-black/95 backdrop-blur-md border-b border-hub-gold/20 shadow-lg shadow-black/40'
          : 'bg-hub-black/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button onClick={() => goTo(0)} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-hub-gold flex items-center justify-center">
            <span className="font-display text-hub-black text-lg leading-none">H</span>
          </div>
          <span className="font-display text-2xl tracking-widest text-white group-hover:text-hub-gold transition-colors">
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
                  currentPage === link.page ? 'text-hub-gold' : 'text-hub-muted hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-hub-gold transition-all duration-300 ${
                  currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => goTo(7)}
            className="px-5 py-2 border border-hub-gold/40 text-hub-gold text-sm font-medium hover:bg-hub-gold hover:text-hub-black transition-all duration-300"
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
            className="lg:hidden bg-hub-dark/98 border-t border-hub-gold/20"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => { goTo(link.page); setMobileOpen(false) }}
                    className="text-hub-muted hover:text-hub-gold text-base font-medium transition-colors block py-1 text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { goTo(7); setMobileOpen(false) }}
                  className="block w-full py-3 text-center border border-hub-gold text-hub-gold font-medium hover:bg-hub-gold hover:text-hub-black transition-all mt-2"
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
