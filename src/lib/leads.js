import { track } from './analytics'

// Workflow "HUB - Leads web" del n8n de SbFlows (repo Hub-Agente-Crm, 07-oct): registra el
// pedido, manda el PDF desde contacto@ por la bandeja de mail de Chatwoot y arma la tarjeta
// en el tablero. Reemplaza a Formspree.
const ENDPOINT = 'https://n8n.sbflows.com/webhook/hub-leads-web'

// Recursos sin PDF automático: al lead le llega una confirmación y lo contacta el equipo.
export const SIN_ADJUNTO = new Set(['asesor', 'disponibilidad', 'solicitud-acceso', 'brochure-inversion'])

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
  'brochure-general': ['Te enviamos el brochure de HUB', 'Una presentación general de la red, sus desarrollos y las formas de vincularse con HUB.'],
  // Brochure = inversores, dossier = empresas (corrección de HUB, 07-oct).
  'dossier-empresas': ['Te enviamos el dossier para empresas', 'Infraestructura, servicios y desarrollos para evaluar dónde puede operar tu empresa.'],
  'brochure-inversion': ['Te enviamos el brochure de inversión', 'Información para conocer la estructura, el proyecto y la documentación disponible.'],
  'ficha-malabia': ['Te enviamos la ficha de HUB Malabia', 'Datos del desarrollo y su perfil.'],
  'ficha-anchorena': ['Te enviamos la ficha de HUB Anchorena', 'Datos del desarrollo y su perfil.'],
  'ficha-sf-oeste': ['Te enviamos la ficha de San Francisco del Monte 2', 'Datos del desarrollo y su perfil.'],
  'ficha-sf-este': ['Te enviamos la ficha de San Francisco del Monte 1', 'Datos del desarrollo y su perfil.'],
  'ficha-rodriguez': ['Te enviamos la ficha de HUB Rodríguez Peña', 'Datos del desarrollo y su perfil.'],
  'disponibilidad': ['Consultá disponibilidad', 'Dejanos tu correo y te enviamos la información vigente de espacios y disponibilidad.'],
  'solicitud-acceso': ['Solicitá acceso al área de inversores', 'Dejanos tu correo y te contactamos para habilitar tu cuenta.'],
  'asesor': ['Coordiná una conversación con un asesor', 'Dejanos tu correo y un asesor de HUB se comunica con vos.'],
}

// _gotcha es el honeypot: un campo oculto que solo llena un bot (el workflow lo descarta).
export async function enviarLead({ email, nombre, telefono, mensaje, recurso, perfil, desarrollo, bloque, _gotcha }) {
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
      _gotcha: _gotcha || '',
    }),
  })
  if (!res.ok) throw new Error(`Leads ${res.status}`)
  track(`lead:${recurso}`)
}
