import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const RATE  = 0.08
const TERMS = [3, 5, 10]

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-hub-darker border border-hub-gold/30 px-3 py-2 shadow-xl text-xs">
      <p className="text-hub-gold font-display tracking-wide mb-1">AÑO {label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-white">
          <span className="text-hub-muted mr-1">{p.name}:</span>{fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function ROICalculator() {
  const [amount, setAmount] = useState(50000)
  const [term,   setTerm]   = useState(5)

  const data = useMemo(() => {
    return Array.from({ length: term + 1 }, (_, y) => ({
      year: y,
      'Total': Math.round(amount * Math.pow(1 + RATE, y)),
      'Capital': amount,
    }))
  }, [amount, term])

  const final       = data[data.length - 1]['Total']
  const totalReturn = final - amount
  const annualRet   = Math.round(amount * RATE)

  return (
    <div className="bg-hub-black/60 border border-hub-gold/15 p-4">
      {/* Inversión */}
      <div className="mb-3">
        <label className="block text-hub-muted text-xs tracking-widest uppercase mb-1.5">Inversión (USD)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-hub-gold font-semibold text-sm">$</span>
          <input
            type="text"
            value={amount.toLocaleString('es-AR')}
            onChange={(e) => {
              const v = parseInt(e.target.value.replace(/\D/g, ''), 10)
              if (!isNaN(v)) setAmount(Math.min(Math.max(v, 1000), 5000000))
            }}
            className="w-full bg-hub-dark border border-hub-gold/20 text-white pl-7 pr-3 py-2 text-sm font-semibold focus:outline-none focus:border-hub-gold/50 transition-colors"
          />
        </div>
        <input
          type="range" min={5000} max={1000000} step={5000} value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full mt-1.5 cursor-pointer"
          style={{ accentColor: '#c9a84c' }}
        />
      </div>

      {/* Plazo */}
      <div className="mb-3">
        <label className="block text-hub-muted text-xs tracking-widest uppercase mb-1.5">Plazo</label>
        <div className="flex gap-1.5">
          {TERMS.map((t) => (
            <button key={t}
              onClick={() => setTerm(t)}
              className={`flex-1 py-2 font-display text-xl tracking-wide transition-all duration-200 ${
                term === t
                  ? 'bg-hub-gold text-hub-black'
                  : 'border border-hub-gold/20 text-hub-muted hover:border-hub-gold/40 hover:text-white'
              }`}
            >
              {t}a
            </button>
          ))}
        </div>
      </div>

      {/* Resumen — ancho completo */}
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {[
          { label: 'Por año', val: annualRet },
          { label: 'Ganado', val: totalReturn },
          { label: 'Total final', val: final, highlight: true },
        ].map(({ label, val, highlight }) => (
          <div key={label} className={`text-center py-2 border ${
            highlight ? 'border-hub-gold/30 bg-hub-gold/10' : 'border-hub-gold/10'
          }`}>
            <p className="text-hub-gold font-display text-sm leading-none">{fmt(val)}</p>
            <p className="text-hub-subtle text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-36 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#c9a84c" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#c9a84c" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.07)" />
            <XAxis dataKey="year" tick={{ fill: '#a0aec0', fontSize: 10 }} tickLine={false}
              axisLine={{ stroke: 'rgba(201,168,76,0.12)' }}
              tickFormatter={(v) => v === 0 ? 'Hoy' : `A${v}`}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Total" stroke="#c9a84c" strokeWidth={2}
              fill="url(#goldFill)" dot={false}
              activeDot={{ r: 4, fill: '#c9a84c', stroke: '#0f1117', strokeWidth: 2 }}
            />
            <Area type="monotone" dataKey="Capital" stroke="rgba(201,168,76,0.2)"
              strokeWidth={1} strokeDasharray="4 4" fill="none" dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-hub-subtle text-xs mt-2 text-center">
        * 8% anual en USD, interés compuesto. No constituye asesoramiento financiero.
      </p>
    </div>
  )
}
