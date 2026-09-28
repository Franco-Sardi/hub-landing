import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  // lead = { recurso, perfil, desarrollo?, bloque? }. Queda cargado al cerrar para que el panel
  // no cambie de texto durante la transición de salida.
  const [lead, setLead] = useState({ recurso: 'brochure-general', perfil: 'general' })
  const [leadAbierto, setLeadAbierto] = useState(false)
  // Sube en cada apertura: remonta el formulario y resetea su estado (enviado / error).
  const [aperturas, setAperturas] = useState(0)
  const [cookiesAbiertas, setCookiesAbiertas] = useState(false)

  const abrirLead = useCallback((opts) => {
    setLead({ recurso: 'brochure-general', perfil: 'general', ...opts })
    setLeadAbierto(true)
    setAperturas((n) => n + 1)
  }, [])
  const cerrarLead = useCallback(() => setLeadAbierto(false), [])

  const value = useMemo(
    () => ({ lead, leadAbierto, aperturas, abrirLead, cerrarLead, cookiesAbiertas, setCookiesAbiertas }),
    [lead, leadAbierto, aperturas, abrirLead, cerrarLead, cookiesAbiertas],
  )
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSite() {
  return useContext(SiteContext)
}
