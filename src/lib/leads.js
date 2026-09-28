import { track } from './analytics'

// Formspree es el destino provisorio hasta que se elija el CRM (minuta 23-09). Se mandan
// todos los campos que pide el handoff §12 para que el paso al CRM sea cambiar el endpoint.
const ENDPOINT = 'https://formspree.io/f/mzdyjerz'

// Subir la versión cada vez que cambie el texto de cualquier casilla de consentimiento.
export const CONSENT_VERSION = '2026-09-v1'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const UTM_STORAGE = 'hub-utm'

// Las UTM llegan en la primera URL de la sesión y se pierden al navegar por la SPA:
// se guardan al cargar para adjuntarlas a cualquier lead posterior.
export function capturarUtm() {
  try {
    const params = new URLSearchParams(window.location.search)
    const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k)]).filter(([, v]) => v))
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_STORAGE, JSON.stringify(utm))
  } catch {
    /* sessionStorage bloqueado: se pierden las UTM, no el lead */
  }
}

function leerUtm() {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE)) || {}
  } catch {
    return {}
  }
}

// [título del modal, bajada]. Home V3 + landings V4.
export const RECURSOS = {
  'brochure-general': ['Te enviamos el brochure de HUB.', 'Una presentación general de la red, sus desarrollos y las formas de vincularse con HUB.'],
  'brochure-empresas': ['Te enviamos el brochure para empresas.', 'Infraestructura, servicios y desarrollos para evaluar dónde puede operar tu empresa.'],
  'dossier-inversion': ['Te enviamos el dossier de inversión.', 'Información ampliada para conocer la estructura, el proyecto y la documentación disponible.'],
  'ficha-malabia': ['Te enviamos la ficha de HUB Malabia.', 'Datos del desarrollo y su perfil.'],
  'ficha-anchorena': ['Te enviamos la ficha de HUB Anchorena.', 'Datos del desarrollo y su perfil.'],
  'ficha-sf-oeste': ['Te enviamos la ficha de San Francisco del Monte Oeste.', 'Datos del desarrollo y su perfil.'],
  'ficha-sf-este': ['Te enviamos la ficha de San Francisco del Monte Este.', 'Datos del desarrollo y su perfil.'],
  'ficha-rodriguez': ['Te enviamos la ficha de HUB Rodríguez Peña.', 'Datos del desarrollo y su perfil.'],
  'disponibilidad': ['Consultá disponibilidad.', 'Dejanos tu correo y te enviamos la información vigente de espacios y disponibilidad.'],
  'solicitud-acceso': ['Solicitá acceso al área de inversores.', 'Dejanos tu correo y te contactamos para habilitar tu cuenta.'],
  'asesor': ['Coordiná una conversación con un asesor.', 'Dejanos tu correo y un asesor de HUB se comunica con vos.'],
}

export async function enviarLead({ email, nombre, telefono, mensaje, recurso, perfil, desarrollo, bloque }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      nombre: nombre || '',
      telefono: telefono || '',
      mensaje: mensaje || '',
      recurso,
      perfil,
      desarrollo: desarrollo || '',
      url: window.location.href,
      bloque: bloque || '',
      ...Object.fromEntries(UTM_KEYS.map((k) => [k, ''])),
      ...leerUtm(),
      fecha: new Date().toISOString(),
      consentimiento: CONSENT_VERSION,
      _subject: `HUB · ${recurso} · ${email}`,
    }),
  })
  if (!res.ok) throw new Error(`Formspree ${res.status}`)
  track(`lead:${recurso}`)
}
