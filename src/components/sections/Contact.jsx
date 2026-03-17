import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// ── Floating label input ─────────────────────────────────────────────────────
function FloatInput({ label, error, ...props }) {
  const [filled, setFilled] = useState(false)
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        onFocus={() => setFilled(true)}
        onBlur={(e) => { setFilled(!!e.target.value); props.onBlur?.(e) }}
        className="peer w-full bg-transparent border-b border-white/15 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-hub-gold/50 transition-colors"
      />
      <label className={`absolute left-0 text-hub-subtle transition-all duration-200 pointer-events-none ${
        filled ? 'top-0 text-xs text-hub-gold/70' : 'top-5 text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-hub-gold/70'
      }`}>
        {label}
      </label>
      <span className="absolute bottom-0 left-0 w-0 h-px bg-hub-gold peer-focus:w-full transition-all duration-300" />
      {error && <p className="absolute -bottom-4 left-0 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function FloatSelect({ label, error, children, ...props }) {
  return (
    <div className="relative">
      <label className="absolute left-0 top-0 text-xs text-hub-subtle/60 pointer-events-none">{label}</label>
      <select
        {...props}
        className="w-full bg-transparent border-b border-white/15 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-hub-gold/50 transition-colors appearance-none cursor-pointer"
        style={{ colorScheme: 'dark' }}
      >
        {children}
      </select>
      <span className="absolute right-0 top-5 text-hub-subtle text-xs pointer-events-none">↓</span>
      {error && <p className="absolute -bottom-4 left-0 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700))
    console.log('Form data:', data)
    setSent(true)
    reset()
  }

  return (
    <section id="contact" className="bg-hub-black relative overflow-x-hidden flex flex-col pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/25 to-transparent" />

      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex flex-col justify-center relative max-w-5xl xl:max-w-6xl mx-auto px-8 xl:px-12 w-full h-[calc(100vh-5rem)]">

        {/* Headline */}
        <div className="pb-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-gold" />
            <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">HUB · Contacto</span>
          </div>
          <div className="flex items-end justify-between gap-2">
            <h2 className="font-display text-white leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
              HABLEMOS DE{' '}
              <span style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                TU PRÓXIMO PASO
              </span>
            </h2>
            <p className="text-hub-muted text-sm max-w-xs text-right leading-relaxed shrink-0">
              Respondemos dentro de las 24 hs hábiles.<br />Sin compromiso, sin spam.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-16 xl:gap-20 pt-8">
          {/* Info lateral */}
          <div className="w-52 xl:w-72 shrink-0 flex flex-col gap-6 xl:gap-8 justify-center">
            {[
              { label: 'Email',    value: 'contacto@hubindustriales.com' },
              { label: 'Tel',      value: '+54 261 000-0000' },
              { label: 'Oficinas', value: 'Mendoza, Argentina' },
              { label: 'Horario',  value: 'Lun–Vie 9–18 hs' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <span className="text-hub-subtle text-xs xl:text-sm tracking-widest uppercase">{item.label}</span>
                <span className="text-white text-sm xl:text-base">{item.value}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              {['LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#"
                  className="text-xs text-hub-subtle border border-white/10 px-3 py-1.5 hover:border-hub-gold/40 hover:text-hub-gold transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {sent ? (
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 border border-hub-gold/40 flex items-center justify-center">
                  <span className="text-hub-gold text-xl font-light">✓</span>
                </div>
                <h3 className="font-display text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  CONSULTA<br />RECIBIDA
                </h3>
                <p className="text-hub-muted text-sm">Te contactamos en menos de 24 hs hábiles.</p>
                <button onClick={() => setSent(false)} className="text-hub-gold text-xs tracking-widest uppercase hover:underline w-fit">
                  Enviar otra consulta →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8 xl:gap-10">
                <div className="grid grid-cols-2 gap-x-10 gap-y-8 xl:gap-x-14 xl:gap-y-10">
                  <FloatInput label="Nombre completo *" error={errors.name && 'Requerido'} {...register('name', { required: true })} />
                  <FloatInput label="Email *" type="email" error={errors.email && 'Email inválido'} {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                  <FloatInput label="Teléfono" type="tel" {...register('phone')} />
                  <FloatSelect label="Me interesa…" error={errors.interest && 'Requerido'} {...register('interest', { required: true })}>
                    <option value="" />
                    <option value="investor" className="bg-hub-black">Invertir en HUB</option>
                    <option value="company"  className="bg-hub-black">Espacio industrial</option>
                    <option value="both"     className="bg-hub-black">Ambas opciones</option>
                  </FloatSelect>
                </div>
                <div className="relative">
                  <textarea {...register('message')} rows={2} placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/15 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-hub-gold/50 transition-colors resize-none"
                  />
                  <label className="absolute left-0 top-5 text-sm text-hub-subtle pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-hub-gold/70 peer-placeholder-shown:top-5 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-hub-gold/70">
                    Mensaje (opcional)
                  </label>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-hub-gold peer-focus:w-full transition-all duration-300" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={isSubmitting}
                    className="group flex items-center gap-3 px-8 py-3 bg-hub-gold text-hub-black text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando…' : (<>Enviar consulta <span className="group-hover:translate-x-1 transition-transform duration-200">→</span></>)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 mt-8 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-hub-gold flex items-center justify-center shrink-0">
              <span className="font-display text-hub-black text-xs leading-none">H</span>
            </div>
            <span className="text-white/30 text-xs">© {new Date().getFullYear()} HUB Parques Industriales · Mendoza, Argentina</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">Términos</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden relative flex flex-col px-5 pb-0">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 pt-6 pb-4 border-b border-white/5">
          <span className="w-6 h-px bg-hub-gold" />
          <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">Contacto</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-white leading-none tracking-tight pt-4 pb-5"
          style={{ fontSize: 'clamp(2rem, 10vw, 3rem)' }}>
          HABLEMOS<br />
          <span style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            DE TU PASO
          </span>
        </h2>

        {/* Quick info pills */}
        <div className="flex flex-wrap gap-2 pb-5">
          {[
            { icon: '✉', text: 'contacto@hubindustriales.com' },
            { icon: '📍', text: 'Mendoza, Argentina' },
            { icon: '🕐', text: 'Lun–Vie 9–18 hs' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5 bg-white/5 border border-white/8 px-2.5 py-1 rounded-none">
              <span className="text-hub-gold text-xs">{item.icon}</span>
              <span className="text-white/70 text-xs">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 py-4"
          >
            <div className="w-10 h-10 border border-hub-gold/40 flex items-center justify-center">
              <span className="text-hub-gold text-lg font-light">✓</span>
            </div>
            <h3 className="font-display text-white text-3xl leading-none">CONSULTA<br />RECIBIDA</h3>
            <p className="text-hub-muted text-sm">Te contactamos en menos de 24 hs hábiles.</p>
            <button onClick={() => setSent(false)} className="text-hub-gold text-xs tracking-widest uppercase hover:underline w-fit">
              Enviar otra consulta →
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 pb-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <FloatInput label="Nombre *" error={errors.name && 'Requerido'} {...register('name', { required: true })} />
              <FloatInput label="Email *" type="email" error={errors.email && 'Inválido'} {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
              <FloatInput label="Teléfono" type="tel" {...register('phone')} />
              <FloatSelect label="Me interesa…" error={errors.interest && 'Requerido'} {...register('interest', { required: true })}>
                <option value="" />
                <option value="investor" className="bg-hub-black">Invertir en HUB</option>
                <option value="company"  className="bg-hub-black">Espacio industrial</option>
                <option value="both"     className="bg-hub-black">Ambas opciones</option>
              </FloatSelect>
            </div>

            <div className="relative">
              <textarea {...register('message')} rows={2} placeholder=" "
                className="peer w-full bg-transparent border-b border-white/15 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-hub-gold/50 transition-colors resize-none"
              />
              <label className="absolute left-0 top-5 text-sm text-hub-subtle pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-hub-gold/70 peer-placeholder-shown:top-5 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-hub-gold/70">
                Mensaje (opcional)
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-hub-gold peer-focus:w-full transition-all duration-300" />
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-3.5 bg-hub-gold text-hub-black text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando…' : 'Enviar consulta →'}
            </button>
          </form>
        )}

        {/* Mobile Footer */}
        <div className="border-t border-white/8 py-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-hub-gold flex items-center justify-center shrink-0">
              <span className="font-display text-hub-black text-xs leading-none">H</span>
            </div>
            <span className="text-white/40 text-xs">© {new Date().getFullYear()} HUB Parques Industriales</span>
          </div>
          <div className="flex gap-4">
            {['LinkedIn', 'Instagram'].map((s) => (
              <a key={s} href="#" className="text-hub-subtle/60 text-xs border border-white/10 px-3 py-1 hover:border-hub-gold/40 hover:text-hub-gold transition-all duration-200">
                {s}
              </a>
            ))}
          </div>
          <div className="flex gap-5">
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">Términos</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">Privacidad</a>
          </div>
        </div>

      </div>
    </section>
  )
}
