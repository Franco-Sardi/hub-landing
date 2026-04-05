import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'

const PROFILES = [
  {
    id: 'pioneros',
    name: 'Pioneros',
    cuota: 560,
    maxCuotas: 355,
    rate: 0.08,
    rateLabel: '8% TNA proyectado',
    note: 'Ingreso fundacional con participación directa en el fideicomiso. Retorno proyectado en base al rendimiento del proyecto.',
  },
  {
    id: 'inversores',
    name: 'Inversores',
    cuota: 780,
    maxCuotas: 255,
    rate: 0.08,
    rateLabel: '8% TNA garantizado',
    note: 'Interés garantizado en USD desde el primer aporte, hasta que el proyecto genere sus propios ingresos.',
  },
]

const TERMS = [3, 5, 10]

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

// Short format for inside the chart
const fmtK = (n) => {
  if (n >= 1_000_000) return `US$ ${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `US$ ${(n / 1_000).toFixed(0)}K`
  return `US$ ${n}`
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const total   = payload.find(p => p.dataKey === 'Total')?.value
  const capital = payload.find(p => p.dataKey === 'Capital')?.value
  const gain    = total && capital ? total - capital : 0
  return (
    <div className="bg-theme-card border border-theme px-3 py-2.5 shadow-xl text-xs min-w-[140px]">
      <p className="text-hub-bright font-display tracking-widest text-sm mb-2">
        {label === 0 ? 'HOY' : `AÑO ${label}`}
      </p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <span className="text-theme-muted">Capital:</span>
          <span className="text-theme font-semibold">{fmt(capital)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-theme-muted">Total:</span>
          <span className="text-hub-bright font-semibold">{fmt(total)}</span>
        </div>
        {gain > 0 && (
          <div className="flex justify-between gap-4 border-t border-theme pt-1 mt-0.5">
            <span className="text-theme-muted">Ganancia:</span>
            <span className="text-hub-bright font-bold">+{fmt(gain)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Custom dot: small circle at every year, larger with value label at start and end
function ChartDot({ cx, cy, payload, term, final, principal }) {
  const isStart = payload?.year === 0
  const isEnd   = payload?.year === term
  const isMid   = term >= 5 && payload?.year === Math.round(term / 2)

  if (!cx || !cy) return null

  if (isStart) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="#1e5cd4" stroke="var(--bg-primary)" strokeWidth={2} />
        <text x={cx + 6} y={cy - 8} fontSize={9} fill="#4a87f5" fontFamily="Inter, sans-serif" fontWeight="600">
          {fmtK(payload.Total)}
        </text>
      </g>
    )
  }
  if (isEnd) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#4a87f5" stroke="var(--bg-primary)" strokeWidth={2} />
        <text x={cx - 6} y={cy - 10} fontSize={10} fill="#4a87f5" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="700">
          {fmtK(payload.Total)}
        </text>
      </g>
    )
  }
  if (isMid) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={3} fill="#1e5cd4" stroke="var(--bg-primary)" strokeWidth={1.5} />
        <text x={cx} y={cy - 8} fontSize={9} fill="#4a87f5" textAnchor="middle" fontFamily="Inter, sans-serif">
          {fmtK(payload.Total)}
        </text>
      </g>
    )
  }
  return <circle cx={cx} cy={cy} r={2.5} fill="#1e5cd4" stroke="var(--bg-primary)" strokeWidth={1} />
}

export default function ROICalculator() {
  const [profileId, setProfileId] = useState('inversores')
  const [cuotas, setCuotas]       = useState(20)
  const [term, setTerm]           = useState(5)

  const profile   = PROFILES.find((p) => p.id === profileId)
  const principal = cuotas * profile.cuota

  const data = useMemo(() => {
    return Array.from({ length: term + 1 }, (_, y) => ({
      year: y,
      Total:   Math.round(principal * Math.pow(1 + profile.rate, y)),
      Capital: principal,
    }))
  }, [principal, term, profile.rate])

  const final       = data[data.length - 1].Total
  const totalReturn = final - principal
  const gainPct     = Math.round((totalReturn / principal) * 100)
  const annualRet   = Math.round(principal * profile.rate)

  // Y domain: start slightly below principal so the curve looks pronounced
  const yMin = Math.round(principal * 0.88)
  const yMax = Math.round(final * 1.06)

  return (
    <div className="border border-theme bg-theme-card p-4 sm:p-5 flex flex-col gap-4">

      {/* ── Profile selector ── */}
      <div>
        <label className="block text-theme-muted text-[10px] tracking-widest uppercase mb-2">
          Perfil de inversión
        </label>
        <div className="flex gap-1.5">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => { setProfileId(p.id); setCuotas(20) }}
              className={`flex-1 py-2.5 px-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                profileId === p.id
                  ? 'bg-hub-electric text-white'
                  : 'border border-theme text-theme-muted hover:border-hub-electric/40 hover:text-theme'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className="text-theme-muted text-xs mt-2 leading-relaxed">{profile.note}</p>
      </div>

      {/* ── Cuotas partes ── */}
      <div>
        {/* Header row */}
        <div className="flex justify-between items-start mb-1.5">
          <div>
            <label className="block text-theme-muted text-[10px] tracking-widest uppercase">
              Cantidad de cuotas partes
            </label>
            <span className="text-theme-subtle text-[10px]">
              Precio por cuota: {fmt(profile.cuota)}
            </span>
          </div>
          <div className="text-right">
            <span className="font-display text-hub-bright text-2xl leading-none block">{cuotas}</span>
            <span className="text-theme-muted text-[10px]">{fmt(principal)} total</span>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={5}
          max={profile.maxCuotas}
          step={5}
          value={cuotas}
          onChange={(e) => setCuotas(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: '#1e5cd4' }}
        />

        {/* Min / Max labels */}
        <div className="flex justify-between text-theme-subtle text-[10px] mt-1">
          <span>5 cuotas · {fmt(5 * profile.cuota)}</span>
          <span>{profile.maxCuotas} cuotas · {fmt(profile.maxCuotas * profile.cuota)}</span>
        </div>
      </div>

      {/* ── Plazo ── */}
      <div>
        <label className="block text-theme-muted text-[10px] tracking-widest uppercase mb-1.5">Plazo</label>
        <div className="flex gap-1.5">
          {TERMS.map((t) => (
            <button
              key={t}
              onClick={() => setTerm(t)}
              className={`flex-1 py-2 font-display text-xl tracking-wide transition-all duration-200 ${
                term === t
                  ? 'text-hub-bright border border-hub-electric/60 bg-hub-electric/10'
                  : 'border border-theme text-theme-muted hover:border-hub-electric/35 hover:text-theme'
              }`}
            >
              {t}a
            </button>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Por año',     val: annualRet },
          { label: 'Ganancia',    val: totalReturn },
          { label: 'Total final', val: final, highlight: true },
        ].map(({ label, val, highlight }) => (
          <div
            key={label}
            className={`text-center py-2.5 border ${
              highlight
                ? 'border-hub-electric/40 bg-hub-electric/10'
                : 'border-theme bg-theme'
            }`}
          >
            <p className={`font-display text-sm leading-none ${highlight ? 'text-hub-bright' : 'text-theme'}`}>
              {fmt(val)}
            </p>
            <p className="text-theme-muted text-[10px] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Chart ── */}
      <div className="relative h-48 sm:h-56">
        {/* Gain badge overlay */}
        <div className="absolute top-2 left-2 z-10 px-2.5 py-1.5 border border-hub-electric/40 bg-hub-electric/10 pointer-events-none">
          <p className="font-display text-hub-bright text-xl leading-none">+{gainPct}%</p>
          <p className="text-theme-muted text-[9px] leading-none mt-0.5">ganancia total</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 12, left: 55, bottom: 0 }}>
            <defs>
              <linearGradient id="electricFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#1e5cd4" stopOpacity={0.55} />
                <stop offset="60%" stopColor="#1e5cd4" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#1e5cd4" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="capitalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#4a87f5" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#4a87f5" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 4"
              stroke="rgba(74,135,245,0.10)"
              vertical={false}
            />

            <XAxis
              dataKey="year"
              tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(74,135,245,0.20)' }}
              tickFormatter={(v) => v === 0 ? 'Hoy' : `Año ${v}`}
            />

            {/* Y axis hidden but sets domain for pronounced curve */}
            <YAxis hide domain={[yMin, yMax]} />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(74,135,245,0.25)', strokeWidth: 1, strokeDasharray: '3 3' }} />

            {/* Capital baseline area */}
            <Area
              type="monotone"
              dataKey="Capital"
              name="Capital"
              stroke="rgba(74,135,245,0.25)"
              strokeWidth={1}
              strokeDasharray="5 4"
              fill="url(#capitalFill)"
              dot={false}
              activeDot={false}
            />

            {/* Total growth area */}
            <Area
              type="monotone"
              dataKey="Total"
              name="Total"
              stroke="#4a87f5"
              strokeWidth={2.5}
              fill="url(#electricFill)"
              dot={(props) => (
                <ChartDot
                  key={`dot-${props.payload?.year}`}
                  {...props}
                  term={term}
                  final={final}
                  principal={principal}
                />
              )}
              activeDot={{ r: 5, fill: '#4a87f5', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-theme-subtle text-[10px] text-center -mt-2">
        * {profile.rateLabel}, interés compuesto. No constituye asesoramiento financiero.
      </p>
    </div>
  )
}
