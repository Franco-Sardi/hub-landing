import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// ── Floating label input ─────────────────────────────────────────────────────
function Field({ label, error, children, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-hub-gold group-focus-within:w-full transition-all duration-400" />
      {error && <p className="absolute -bottom-4 left-0 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function FloatInput({ label, error, ...props }) {
  const [filled, setFilled] = useState(false)
  return (
    <Field error={error}>
      <input
        {...props}
        placeholder=" "
        onFocus={() => setFilled(true)}
        onBlur={(e) => { setFilled(!!e.target.value); props.onBlur?.(e) }}
        className="peer w-full bg-transparent border-b border-white/10 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-white/20 transition-colors"
      />
      <label className={`absolute left-0 text-hub-subtle transition-all duration-200 pointer-events-none ${
        filled ? 'top-0 text-xs text-hub-gold/60' : 'top-5 text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-hub-gold/60'
      }`}>
        {label}
      </label>
      <span className="absolute bottom-0 left-0 w-0 h-px bg-hub-gold peer-focus:w-full transition-all duration-300" />
    </Field>
  )
}

function FloatSelect({ label, error, children, ...props }) {
  return (
    <Field error={error}>
      <label className="absolute left-0 top-0 text-xs text-hub-subtle/60 pointer-events-none">{label}</label>
      <select
        {...props}
        className="w-full bg-transparent border-b border-white/10 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer"
        style={{ colorScheme: 'dark' }}
      >
        {children}
      </select>
      <span className="absolute right-0 top-5 text-hub-subtle text-xs pointer-events-none">↓</span>
    </Field>
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
    <section id="contact" className="h-screen bg-hub-black relative overflow-hidden flex flex-col pt-20">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-gold/25 to-transparent" />

      <div className="relative flex flex-col flex-1 max-w-7xl mx-auto px-6 w-full min-h-0">

        {/* ── Headline editorial ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-6 border-b border-white/5"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-gold" />
            <span className="text-hub-gold text-xs font-semibold tracking-[0.3em] uppercase">HUB · Contacto</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-white leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              HABLEMOS DE{' '}
              <span style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 45%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                TU PRÓXIMO PASO
              </span>
            </h2>
            <p className="text-hub-muted text-sm max-w-xs lg:text-right leading-relaxed shrink-0">
              Respondemos dentro de las 24 hs hábiles.<br />Sin compromiso, sin spam.
            </p>
          </div>
        </motion.div>

        {/* ── Body ── */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-10 lg:gap-20 py-6">

          {/* Info lateral */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6 lg:w-52 xl:w-64 shrink-0"
          >
            {[
              { label: 'Email',    value: 'contacto@hubindustriales.com' },
              { label: 'Tel',      value: '+54 261 000-0000' },
              { label: 'Oficinas', value: 'Mendoza, Argentina' },
              { label: 'Horario',  value: 'Lun–Vie 9–18 hs' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                className="flex flex-col gap-0.5"
              >
                <span className="text-hub-subtle text-xs tracking-widest uppercase">{item.label}</span>
                <span className="text-white text-sm">{item.value}</span>
              </motion.div>
            ))}

            <div className="flex gap-2 mt-auto pt-2">
              {['LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#"
                  className="text-xs text-hub-subtle border border-white/8 px-3 py-1.5 hover:border-hub-gold/40 hover:text-hub-gold transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 min-w-0 flex flex-col justify-center"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 border border-hub-gold/40 flex items-center justify-center"
                >
                  <span className="text-hub-gold text-xl font-light">✓</span>
                </motion.div>
                <h3 className="font-display text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  CONSULTA<br />RECIBIDA
                </h3>
                <p className="text-hub-muted text-sm">Te contactamos en menos de 24 hs hábiles.</p>
                <button onClick={() => setSent(false)}
                  className="text-hub-gold text-xs tracking-widest uppercase hover:underline w-fit"
                >
                  Enviar otra consulta →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                  <FloatInput
                    label="Nombre completo *"
                    error={errors.name && 'Requerido'}
                    {...register('name', { required: true })}
                  />
                  <FloatInput
                    label="Email *"
                    type="email"
                    error={errors.email && 'Email inválido'}
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                  />
                  <FloatInput
                    label="Teléfono"
                    type="tel"
                    {...register('phone')}
                  />
                  <FloatSelect
                    label="Me interesa…"
                    error={errors.interest && 'Requerido'}
                    {...register('interest', { required: true })}
                  >
                    <option value="" />
                    <option value="investor" className="bg-hub-black">Invertir en HUB</option>
                    <option value="company"  className="bg-hub-black">Espacio industrial</option>
                    <option value="both"     className="bg-hub-black">Ambas opciones</option>
                  </FloatSelect>
                </div>

                {/* Mensaje */}
                <Field>
                  <textarea
                    {...register('message')}
                    rows={2}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/10 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
                  />
                  <label className="absolute left-0 top-5 text-sm text-hub-subtle pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-hub-gold/60 peer-placeholder-shown:top-5 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-hub-gold/60">
                    Mensaje (opcional)
                  </label>
                </Field>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-3 px-8 py-3 bg-hub-gold text-hub-black text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando…' : (
                      <>
                        Enviar consulta
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-white/5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-hub-gold flex items-center justify-center shrink-0">
              <span className="font-display text-hub-black text-xs leading-none">H</span>
            </div>
            <span className="text-white/30 text-xs">
              © {new Date().getFullYear()} HUB Parques Industriales · Mendoza, Argentina
            </span>
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
