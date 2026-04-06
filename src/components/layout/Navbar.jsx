import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/theme'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

const navLinks = [
  { label: 'Nosotros',  page: 6 },  // about    = SECTIONS[7], 7-1=6
  { label: 'Modelo',    page: 2 },  // model    = SECTIONS[3], 3-1=2
  { label: 'Proyectos', page: 3 },  // projects = SECTIONS[4], 4-1=3
  { label: 'Empresas',  page: 5 },  // companies= SECTIONS[6], 6-1=5
  { label: 'Contacto',  page: 7 },  // contact  = SECTIONS[8], 8-1=7
]

export default function Navbar({ currentPage = 0, goTo = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const scrolled = currentPage > 0

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled ? 'border-b shadow-sm' : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: scrolled ? 'var(--nav-border)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <button onClick={() => goTo(0)} className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center border"
            style={{ backgroundColor: 'var(--nav-text)', borderColor: 'var(--nav-border-element)' }}>
            <span className="font-display text-lg leading-none" style={{ color: 'var(--nav-bg)' }}>H</span>
          </div>
          <span className="font-display text-2xl tracking-widest transition-colors"
            style={{ color: 'var(--nav-text)' }}>
            HUB
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => goTo(link.page)}
                className="font-display text-sm tracking-widest uppercase transition-colors relative group"
                style={{ color: currentPage === link.page ? 'var(--nav-text)' : 'var(--nav-text-dim)' }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ backgroundColor: 'var(--nav-text)', opacity: 0.55 }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + Theme toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
            style={{ borderColor: 'var(--nav-border-element)', color: 'var(--nav-text-dim)' }}
            aria-label="Cambiar tema"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => goTo(7)}
            className="px-5 py-2 border font-display text-sm tracking-widest uppercase transition-all duration-300"
            style={{ borderColor: 'var(--nav-border-element)', color: 'var(--nav-text)' }}
          >
            Contactar
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
            style={{ borderColor: 'var(--nav-border-element)', color: 'var(--nav-text-dim)' }}
            aria-label="Cambiar tema"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-6 h-0.5 transition-all duration-300 ${
                i === 0 && mobileOpen ? 'rotate-45 translate-y-2' :
                i === 1 && mobileOpen ? 'opacity-0' :
                i === 2 && mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
              style={{ backgroundColor: 'var(--nav-text)' }}
            />
          ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ backgroundColor: 'var(--nav-bg)', borderTopColor: 'var(--nav-border)' }}
            className="lg:hidden border-t"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => { goTo(link.page); setMobileOpen(false) }}
                    className="font-display text-base tracking-widest uppercase transition-colors block py-1 text-left w-full"
                    style={{ color: 'var(--nav-text-dim)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { goTo(7); setMobileOpen(false) }}
                  className="block w-full py-3 text-center border font-display tracking-widest uppercase transition-all mt-2"
                  style={{ borderColor: 'var(--nav-border-element)', color: 'var(--nav-text)' }}
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
