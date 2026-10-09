import { useEffect } from 'react'

// React 19 + helmet-async agrega su <meta name="description"> en vez de reemplazar el de
// index.html, y quedaban dos (Google podía tomar el de la home). Esto pisa el estático y lo
// restaura al salir. Para Google: menos de 160 caracteres.
export default function Descripcion({ texto }) {
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]')
    if (!tag) return
    const original = tag.getAttribute('content')
    tag.setAttribute('content', texto)
    return () => tag.setAttribute('content', original)
  }, [texto])
  return null
}
