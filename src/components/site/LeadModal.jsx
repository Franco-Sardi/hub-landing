import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { RECURSOS, SIN_ADJUNTO, enviarLead, urlWhatsapp } from '../../lib/leads'
import { track } from '../../lib/analytics'

function LeadForm({ lead, cerrarLead, emailRef }) {
  const [estado, setEstado] = useState('form') // form | enviando | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setEstado('enviando')
    try {
      await enviarLead({ ...lead, email: f.get('email'), nombre: f.get('nombre'), telefono: f.get('telefono'), _gotcha: f.get('_gotcha') })
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  // Handoff §12: sin descarga directa después del submit, el material llega por correo.
  if (estado === 'ok') {
    return (
      <div className="lead-success">
        <strong>{SIN_ADJUNTO.has(lead.recurso) ? 'Recibimos tu pedido' : 'Revisá tu correo'}</strong>
        <span>
          {SIN_ADJUNTO.has(lead.recurso)
            ? 'Te enviamos un correo de confirmación y una persona del equipo se comunica con vos.'
            : 'Te enviamos el material solicitado para que lo tengas en tu bandeja.'}
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="leadEmail">Email</label>
        <input ref={emailRef} id="leadEmail" name="email" type="email" required placeholder="nombre@empresa.com" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="leadName">Nombre <span style={{ textTransform: 'none', fontWeight: 400 }}>(opcional)</span></label>
        <input id="leadName" name="nombre" type="text" placeholder="Tu nombre" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="leadTel">WhatsApp <span style={{ textTransform: 'none', fontWeight: 400 }}>(opcional)</span></label>
        <input id="leadTel" name="telefono" type="tel" placeholder="261 555 1234" autoComplete="tel" inputMode="tel" />
      </div>
      <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <label className="check">
        <input type="checkbox" required />
        <span>
          Acepto el tratamiento de mis datos para recibir el material solicitado y el seguimiento relacionado.{' '}
          <Link to="/privacidad" onClick={cerrarLead}>Política de Privacidad</Link>.
        </span>
      </label>
      <button className="btn btn--blue" type="submit" disabled={estado === 'enviando'} style={{ width: '100%', marginTop: 24 }}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar a mi correo'}
      </button>
      {estado === 'error' && (
        <p className="lead-error">No pudimos enviar tu pedido. Probá de nuevo o escribinos a contacto@hubmza.com.ar</p>
      )}
    </form>
  )
}

// Paso previo opcional al WhatsApp (minuta con Paula Brandi, 07-oct): sin campos obligatorios ni
// espera. El que completa algo queda como contacto en Chatwoot con mail y teléfono, así el agente
// lo reconoce al escribir; el que no, pasa igual. El link abre WhatsApp en otra pestaña en el
// mismo click (un window.open después de un await lo bloquea el navegador) y el pedido sale en
// paralelo, sin esperarlo: esta pestaña queda abierta, así que termina igual.
function WhatsappForm({ lead, cerrarLead, emailRef }) {
  const [datos, setDatos] = useState({ nombre: '', apellido: '', telefono: '', email: '', _gotcha: '' })
  // Consentimiento explícito y sin premarcar (reglas del sitio): sin la casilla, sigue a WhatsApp
  // igual pero no se guarda nada.
  const [acepta, setAcepta] = useState(false)
  const set = (k) => (e) => setDatos((d) => ({ ...d, [k]: e.target.value }))
  const nombre = [datos.nombre, datos.apellido].map((x) => x.trim()).filter(Boolean).join(' ')

  function onContinuar() {
    const completo = acepta && (datos.telefono.trim() || datos.email.trim())
    track(`whatsapp:${completo ? 'con-datos' : 'directo'}`)
    if (completo) {
      enviarLead({ ...lead, nombre, telefono: datos.telefono.trim(), email: datos.email.trim(), _gotcha: datos._gotcha }).catch(() => {})
    }
    cerrarLead()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 24 }}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="waNombre">Nombre</label>
          <input ref={emailRef} id="waNombre" type="text" value={datos.nombre} onChange={set('nombre')} autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="waApellido">Apellido</label>
          <input id="waApellido" type="text" value={datos.apellido} onChange={set('apellido')} autoComplete="family-name" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="waTel">WhatsApp</label>
        <input id="waTel" type="tel" inputMode="tel" placeholder="261 555 1234" value={datos.telefono} onChange={set('telefono')} autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="waEmail">Email</label>
        <input id="waEmail" type="email" placeholder="nombre@empresa.com" value={datos.email} onChange={set('email')} autoComplete="email" />
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" value={datos._gotcha} onChange={set('_gotcha')} />
      <label className="check">
        <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
        <span>
          Acepto que HUB guarde estos datos para responder mi consulta y hacerle seguimiento.{' '}
          <Link to="/privacidad" onClick={cerrarLead}>Política de Privacidad</Link>.
        </span>
      </label>
      <a className="btn btn--whatsapp" href={urlWhatsapp(datos.nombre.trim())} target="_blank" rel="noopener noreferrer" onClick={onContinuar} style={{ width: '100%', marginTop: 8 }}>
        Continuar a WhatsApp
      </a>
      <p className="wa-legal">Si preferís no dejar datos, seguí directo: no guardamos nada.</p>
    </form>
  )
}

// Panel lateral único (handoff §12): todos los CTAs que entregan material abren este mismo
// modal y solo cambian título, recurso, perfil y desarrollo. Email obligatorio, nombre opcional.
export default function LeadModal() {
  const { lead, leadAbierto, aperturas, cerrarLead } = useSite()
  const emailRef = useRef(null)
  const [titulo, bajada] = RECURSOS[lead.recurso] || RECURSOS['brochure-general']

  useEffect(() => {
    if (!leadAbierto) return
    document.body.classList.add('no-scroll')
    const t = setTimeout(() => emailRef.current?.focus(), 150)
    const onKey = (e) => e.key === 'Escape' && cerrarLead()
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.classList.remove('no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [leadAbierto, cerrarLead])

  return (
    <div className={`modal${leadAbierto ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-hidden={!leadAbierto}>
      <div className="modal-backdrop" onClick={cerrarLead} />
      <div className="modal-card">
        <button className="modal-close" type="button" onClick={cerrarLead} aria-label="Cerrar">×</button>
        <div className="eyebrow">{lead.recurso === 'whatsapp' ? 'HUB · WhatsApp' : 'HUB · Información'}</div>
        <h2 id="modalTitle">{titulo}</h2>
        <p>{bajada}</p>
        {lead.recurso === 'whatsapp'
          ? <WhatsappForm key={aperturas} lead={lead} cerrarLead={cerrarLead} emailRef={emailRef} />
          : <LeadForm key={aperturas} lead={lead} cerrarLead={cerrarLead} emailRef={emailRef} />}
      </div>
    </div>
  )
}
