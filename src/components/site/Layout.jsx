import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

// Reveal del handoff §4: opacity + translateY al entrar ~18% del elemento en viewport.
// El MutationObserver cubre lo que se monta después (área privada de inversores, lazy).
function useReveal(mainRef, pathname) {
  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const pendientes = () => root.querySelectorAll('[data-reveal]:not(.is-visible)')
    if (!('IntersectionObserver' in window)) {
      pendientes().forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' },
    )
    const observar = () => pendientes().forEach((el) => io.observe(el))
    observar()
    const mo = new MutationObserver(observar)
    mo.observe(root, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [mainRef, pathname])
}

// Los links del menú son /#seccion: al llegar (desde otra página o en la misma) se baja al bloque.
function useHashScroll(pathname, hash) {
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(t)
  }, [pathname, hash])
}

export default function Layout({ variant, children }) {
  const { pathname, hash } = useLocation()
  const mainRef = useRef(null)
  useReveal(mainRef, pathname)
  useHashScroll(pathname, hash)

  return (
    // El scope de página va en <main>: así el h2/h3 de cada página no pisa header ni footer.
    // key: al pasar de una ficha de desarrollo a otra, el reveal arranca de cero.
    <div className="site">
      <SiteHeader />
      <main key={pathname} ref={mainRef} className={`pg-${variant}`}>{children}</main>
      <SiteFooter />
    </div>
  )
}
