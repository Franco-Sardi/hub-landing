// Menú exacto del handoff §5 (más «Contacto», que baja al footer: `irAContacto`). Los ítems bajan al bloque
// de la home; desde ahí se profundiza a las landings.
// El footer está en todas las páginas: se baja directo, sin pasar por el hash.
export const irAContacto = () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })

export const MENU = [
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/#empresas', label: 'Alquiler de espacios' },
  { to: '/#desarrollos', label: 'Desarrollos' },
  { to: '/#inversion', label: 'Invertí en HUB' },
]
