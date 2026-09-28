import { useState } from 'react'

// Explorador de escenarios de inversion.html (entrega V4). El usuario carga todos los supuestos:
// no parte de una promesa. Los valores iniciales son referencias del material y deben validarse
// como vigentes antes de publicarse (README de la entrega).
const INICIAL = { capital: 78000, cuota: 780, alquiler: 7, cuotaFinal: 1050, plazo: 20, altA: 5, altB: 0 }

const usd = (n) => 'USD ' + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(n)
const pct = (n) => new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + '%'

const CAMPOS = [
  ['capital', 'Capital USD', { min: 1000, step: 1000 }],
  ['cuota', 'Valor cuota USD', { min: 1, step: 10 }],
  ['alquiler', 'Alquiler mensual / m² USD', { min: 0, step: 0.5 }],
  ['cuotaFinal', 'Valor final cuota USD', { min: 0, step: 50 }],
  ['plazo', 'Plazo años', { min: 1, max: 30, step: 1 }],
]

export default function Simulador() {
  const [v, setV] = useState(INICIAL)
  const set = (k) => (e) => setV((prev) => ({ ...prev, [k]: e.target.value }))
  const num = (k, fallback = 0) => Math.max(0, Number(v[k]) || fallback)

  const capital = num('capital')
  const cuotas = capital / Math.max(0.01, num('cuota', 780))
  const rentaAnual = cuotas * num('alquiler') * 12
  const valorFinal = cuotas * num('cuotaFinal')
  const rendimiento = capital > 0 ? (rentaAnual / capital) * 100 : 0
  const a = num('altA')
  const b = num('altB')
  const max = Math.max(rendimiento, a, b, 1)
  const barras = [
    ['HUB · renta anual del escenario', rendimiento],
    ['Alternativa A', a],
    ['Alternativa B', b],
  ]

  return (
    <div className="simulator">
      <div className="sim-head">
        <div><div className="eyebrow">Tu escenario</div><h3>Variables editables</h3></div>
        <p>Los valores iniciales son referencias del material de HUB. Modificalos para analizar tus propios supuestos.</p>
      </div>
      <div className="sim-fields">
        {CAMPOS.map(([k, label, attrs]) => (
          <div key={k} className="field">
            <label htmlFor={`sim-${k}`}>{label}</label>
            <input id={`sim-${k}`} type="number" inputMode="decimal" value={v[k]} onChange={set(k)} {...attrs} />
          </div>
        ))}
      </div>
      <div className="sim-summary" aria-live="polite">
        <div className="metric"><span>Cuotas estimadas</span><strong>{new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(cuotas)}</strong></div>
        <div className="metric"><span>Renta anual estimada</span><strong>{usd(rentaAnual)}</strong></div>
        <div className="metric"><span>Valor final estimado</span><strong>{usd(valorFinal)}</strong></div>
        <div className="metric"><span>Renta anual / capital</span><strong>{pct(rendimiento)}</strong></div>
      </div>
      <div className="chart">
        <div className="eyebrow">Comparador configurable</div>
        <div className="sim-fields two">
          <div className="field"><label htmlFor="sim-altA">Alternativa A · tasa anual %</label><input id="sim-altA" type="number" inputMode="decimal" min="0" step="0.1" value={v.altA} onChange={set('altA')} /></div>
          <div className="field"><label htmlFor="sim-altB">Alternativa B · tasa anual %</label><input id="sim-altB" type="number" inputMode="decimal" min="0" step="0.1" value={v.altB} onChange={set('altB')} /></div>
        </div>
        <div className="bars">
          {barras.map(([l, val]) => (
            <div key={l} className="bar-row">
              <span>{l}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(100, (val / max) * 100)}%` }} /></div>
              <strong className="bar-value">{pct(val)}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="disclaimer">Simulación ilustrativa basada en supuestos ingresados por el usuario. Los resultados no constituyen una promesa o garantía de rentabilidad, una oferta pública de valores, un contrato ni asesoramiento financiero. Condiciones, riesgos, costos, plazos y mecanismos de salida surgen exclusivamente de la documentación contractual vigente.</div>
    </div>
  )
}
