import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from './SiteContext'
import { RECURSOS, SIN_ADJUNTO, enviarLead } from '../../lib/leads'

function LeadForm({ lead, cerrarLead, emailRef }) {
  const [estado, setEstado] = useState('form') // form | enviando | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setEstado('enviando')
    try {
      await enviarLead({ ...lead, email: f.get('email'), nombre: f.get('nombre'), _gotcha: f.get('_gotcha') })
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  // Handoff §12: sin descarga directa después del submit, el material llega por correo.
  if (estado === 'ok') {
    return (
      <div className="lead-success">
        <strong>{SIN_ADJUNTO.has(lead.recurso) ? 'Recibimos tu pedido.' : 'Revisá tu correo.'}</strong>
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
        <div className="eyebrow">HUB · Información</div>
        <h2 id="modalTitle">{titulo}</h2>
        <p>{bajada}</p>
        <LeadForm key={aperturas} lead={lead} cerrarLead={cerrarLead} emailRef={emailRef} />
      </div>
    </div>
  )
}
