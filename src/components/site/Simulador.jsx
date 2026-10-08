import { useEffect, useId, useRef, useState } from 'react'
import { calcular } from '../../lib/simulador'

// Explorador de escenarios del área privada (maqueta para aprobación de HUB, 08-oct). El modelo
// y sus fuentes están en lib/simulador.js. Todo es editable: el resultado es del supuesto.
const BASE = { capital: 78000, cuota: 780, obraAnios: 2, tasaObra: 8, alquiler: 7, cuotaFinal: 1050, horizonte: 10 }

// Alquiler por m² que da 10 % y 12 % anual sobre USD 780 (el rango del brochure).
const ESCENARIOS = [
  { id: 'conservador', label: 'Conservador', alquiler: 6.5 },
  { id: 'base', label: 'Base', alquiler: 7 },
  { id: 'optimista', label: 'Optimista', alquiler: 7.8 },
]

const usd = (n) => 'USD ' + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(Math.round(n))
const usdCorto = (n) => (Math.abs(n) >= 1e6 ? `USD ${(n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })} M` : `USD ${Math.round(n / 1000).toLocaleString('es-AR')} k`)
const pct = (n) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' %'
const num1 = (n) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 })

function Campo({ id, label, ayuda, value, onChange, min, max, step, prefijo, sufijo, rango }) {
  return (
    <div className="sim-campo">
      <label htmlFor={id}>{label}</label>
      <div className="sim-input">
        {prefijo && <span>{prefijo}</span>}
        <input id={id} type="number" inputMode="decimal" value={value} min={min} max={max} step={step} onChange={(e) => onChange(e.target.value)} />
        {sufijo && <span>{sufijo}</span>}
      </div>
      {rango && <input className="sim-rango" type="range" aria-label={label} value={value} min={min} max={max} step={step} onChange={(e) => onChange(e.target.value)} />}
      {ayuda && <small>{ayuda}</small>}
    </div>
  )
}

// Ingresos cobrados acumulados por año (una sola serie); el capital va como línea de referencia,
// así se ve cuándo lo cobrado lo iguala. Crosshair con tooltip (puntero y flechas del teclado) + tabla.
function Grafico({ anios, capital }) {
  const ref = useRef(null)
  const [ancho, setAncho] = useState(720)
  const [foco, setFoco] = useState(null)
  const tituloId = useId()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setAncho(Math.max(280, Math.round(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const alto = ancho < 520 ? 240 : 300
  const m = { t: 16, r: ancho < 520 ? 12 : 92, b: 30, l: 56 }
  const w = ancho - m.l - m.r
  const h = alto - m.t - m.b
  const maxY = Math.max(capital, ...anios.map((a) => a.hub), 1) * 1.08
  const paso = Math.pow(10, Math.floor(Math.log10(maxY / 4)))
  const tick = [1, 2, 2.5, 5, 10].map((k) => k * paso).find((k) => maxY / k <= 5) || paso * 10
  const ticks = []
  for (let y = 0; y <= maxY; y += tick) ticks.push(y)
  const x = (t) => m.l + (anios.length > 1 ? ((t - 1) / (anios.length - 1)) * w : w / 2)
  const y = (v) => m.t + h - (v / maxY) * h
  const linea = (k) => anios.map((a, i) => `${i ? 'L' : 'M'}${x(a.t).toFixed(1)},${y(a[k]).toFixed(1)}`).join('')
  const finObra = anios.filter((a) => a.enObra).length
  const ult = anios[anios.length - 1]
  const cada = Math.ceil(anios.length / (ancho < 520 ? 5 : 10))

  const mover = (clientX) => {
    const r = ref.current.getBoundingClientRect()
    const rel = (clientX - r.left - m.l) / w
    setFoco(Math.max(0, Math.min(anios.length - 1, Math.round(rel * (anios.length - 1)))))
  }
  const teclado = (e) => {
    if (e.key === 'ArrowRight') setFoco((f) => Math.min(anios.length - 1, (f ?? -1) + 1))
    else if (e.key === 'ArrowLeft') setFoco((f) => Math.max(0, (f ?? anios.length) - 1))
    else return
    e.preventDefault()
  }
  const f = foco != null ? anios[foco] : null

  return (
    <figure className="sim-grafico" aria-labelledby={tituloId}>
      <figcaption id={tituloId}>
        <strong>Ingresos cobrados, acumulados por año</strong>
        <span className="sim-leyenda">
          <span><i className="k-hub" />Cobrado acumulado</span>
          <span><i className="k-cap" />Capital invertido</span>
        </span>
      </figcaption>
      <div className="sim-plot" ref={ref}>
        <svg width={ancho} height={alto} role="img" aria-label="Ingresos cobrados acumulados por año frente al capital invertido. Detalle en la tabla."
          tabIndex={0} onKeyDown={teclado} onPointerMove={(e) => mover(e.clientX)} onPointerLeave={() => setFoco(null)} onBlur={() => setFoco(null)}>
          {finObra > 0 && finObra < anios.length && (
            <g className="sim-obra">
              <rect x={m.l} y={m.t} width={x(finObra) - m.l + (x(2) - x(1)) / 2} height={h} />
              <text x={m.l + 6} y={m.t + 14}>Obra</text>
            </g>
          )}
          {ticks.map((v) => (
            <g key={v} className="sim-eje">
              <line x1={m.l} x2={m.l + w} y1={y(v)} y2={y(v)} />
              <text x={m.l - 8} y={y(v) + 4} textAnchor="end">{v === 0 ? '0' : usdCorto(v).replace('USD ', '')}</text>
            </g>
          ))}
          {anios.map((a, i) => ((i % cada === 0 && anios.length - 1 - i > cada / 2) || i === anios.length - 1) && (
            <text key={a.t} className="sim-eje-x" x={x(a.t)} y={alto - 8} textAnchor="middle">{`Año ${a.t}`}</text>
          ))}
          <line className="sim-capital" x1={m.l} x2={m.l + w} y1={y(capital)} y2={y(capital)} />
          <path className="sim-l-hub" d={linea('hub')} />
          {ancho >= 520 && <text className="sim-etq" x={x(ult.t) + 8} y={y(capital) + 4}>Capital</text>}
          {f && (
            <g className="sim-cruz">
              <line x1={x(f.t)} x2={x(f.t)} y1={m.t} y2={m.t + h} />
              <circle className="p-hub" cx={x(f.t)} cy={y(f.hub)} r="5" />
            </g>
          )}
        </svg>
        {f && (
          <div className="sim-tip" style={{ left: Math.min(Math.max(x(f.t), 90), ancho - 90), top: m.t }}>
            <span className="sim-tip-t">{`Año ${f.t}${f.enObra ? ' · obra' : ''}`}</span>
            <span><i className="k-hub" /><strong>{usd(f.hub)}</strong> cobrado acumulado</span>
            <span><strong>{usd(f.anual)}</strong> en el año</span>
          </div>
        )}
      </div>
    </figure>
  )
}

export default function Simulador() {
  const [v, setV] = useState(BASE)
  const [tabla, setTabla] = useState(false)
  const n = (k, min = 0) => Math.max(min, Number(v[k]) || 0)
  const valores = {
    capital: n('capital'), cuota: n('cuota', 1), obraAnios: Math.round(n('obraAnios')), tasaObra: n('tasaObra'),
    alquiler: n('alquiler'), cuotaFinal: n('cuotaFinal'), horizonte: Math.min(30, Math.max(1, Math.round(n('horizonte', 1)))),
  }
  const r = calcular(valores)
  const set = (k) => (val) => setV((p) => ({ ...p, [k]: val }))
  const escenario = ESCENARIOS.find((e) => Number(v.alquiler) === e.alquiler)?.id
  const resultado = r.totalHub - valores.capital

  return (
    <div className="sim">
      <div className="sim-panel">
        <div className="sim-bloque">
          <h3>Tu inversión</h3>
          <Campo id="sim-capital" label="Capital" prefijo="USD" value={v.capital} onChange={set('capital')} min={780} max={500000} step={780} rango
            ayuda={`${num1(r.cuotas)} cuotapartes · ${num1(r.cuotas)} m² de infraestructura`} />
          <Campo id="sim-cuota" label="Valor de la cuotaparte" prefijo="USD" value={v.cuota} onChange={set('cuota')} min={1} step={10} ayuda="Categoría Inversor: USD 780" />
          <Campo id="sim-horizonte" label="Horizonte" sufijo="años" value={v.horizonte} onChange={set('horizonte')} min={1} max={30} step={1} rango />
        </div>

        <div className="sim-bloque">
          <h3>Supuestos del modelo</h3>
          <div className="sim-escenarios" role="group" aria-label="Escenario de alquiler">
            {ESCENARIOS.map((e) => (
              <button key={e.id} type="button" aria-pressed={escenario === e.id} onClick={() => set('alquiler')(e.alquiler)}>{e.label}</button>
            ))}
          </div>
          <div className="sim-dos">
            <Campo id="sim-obra" label="Años de obra" value={v.obraAnios} onChange={set('obraAnios')} min={0} max={10} step={1} />
            <Campo id="sim-tasaObra" label="Interés en obra" sufijo="% anual" value={v.tasaObra} onChange={set('tasaObra')} min={0} step={0.5} />
          </div>
          <div className="sim-dos">
            <Campo id="sim-alquiler" label="Alquiler por m²" prefijo="USD" sufijo="/ mes" value={v.alquiler} onChange={set('alquiler')} min={0} step={0.1} />
            <Campo id="sim-final" label="Cuotaparte al final" prefijo="USD" value={v.cuotaFinal} onChange={set('cuotaFinal')} min={0} step={10} />
          </div>
        </div>
      </div>

      <div className="sim-resultados" aria-live="polite">
        <div className="sim-tiles">
          <div className="sim-tile"><span>Ingreso anual en obra</span><strong>{usd(r.ingresoObra)}</strong><small>{`${v.tasaObra} % sobre el capital`}</small></div>
          <div className="sim-tile"><span>Ingreso anual en operación</span><strong>{usd(r.ingresoOperacion)}</strong><small>{`${pct(r.rentaOperacion)} sobre el capital`}</small></div>
          <div className="sim-tile"><span>{`Cobrado en ${valores.horizonte} años`}</span><strong>{usd(r.cobradoHub)}</strong><small>sin contar la salida</small></div>
          <div className="sim-tile"><span>Valor de salida estimado</span><strong>{usd(r.salida)}</strong><small>{`${num1(r.cuotas)} cuotapartes × ${usd(valores.cuotaFinal)}`}</small></div>
        </div>

        <div className="sim-comparacion">
          <div>
            <span>Capital invertido</span>
            <strong>{usd(valores.capital)}</strong>
          </div>
          <div>
            <span>{`Total al año ${valores.horizonte}`}</span>
            <strong>{usd(r.totalHub)}</strong>
          </div>
          <div className={resultado >= 0 ? 'is-pos' : 'is-neg'}>
            <span>Resultado del escenario</span>
            <strong>{(resultado >= 0 ? '+ ' : '− ') + usd(Math.abs(resultado))}</strong>
          </div>
        </div>

        <Grafico anios={r.anios} capital={valores.capital} />
        <p className="sim-recupero">
          {r.recupero
            ? `Con lo cobrado, el capital se recupera en el año ${r.recupero}, antes de contar la salida.`
            : `En ${valores.horizonte} años lo cobrado no llega a igualar el capital; el resto depende del valor de salida.`}
        </p>

        <button className="sim-ver-tabla" type="button" aria-expanded={tabla} onClick={() => setTabla((t) => !t)}>
          {tabla ? 'Ocultar tabla' : 'Ver tabla año por año'}
        </button>
        {tabla && (
          <div className="sim-tabla">
            <table>
              <thead><tr><th>Año</th><th>Etapa</th><th>Cobrado en el año</th><th>Acumulado</th></tr></thead>
              <tbody>
                {r.anios.map((a) => (
                  <tr key={a.t}><td>{a.t}</td><td>{a.enObra ? 'Obra' : 'Operación'}</td><td>{usd(a.anual)}</td><td>{usd(a.hub)}</td></tr>
                ))}
                <tr className="sim-tabla-fin"><td colSpan={2}>{`Valor de salida (año ${valores.horizonte})`}</td><td>{usd(r.salida)}</td><td>{usd(r.totalHub)}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="sim-disclaimer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
          <span>Simulación ilustrativa basada en supuestos editables. Los resultados no constituyen una promesa ni una garantía de rentabilidad, una oferta pública, un contrato ni asesoramiento financiero. Condiciones, riesgos, costos, impuestos, plazos y mecanismos de salida surgen exclusivamente de la documentación contractual vigente.</span>
        </p>
      </div>
    </div>
  )
}
