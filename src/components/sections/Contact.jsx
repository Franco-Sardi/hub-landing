import { motion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Field({ label, error, as: Tag = 'input', children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-theme-muted text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</label>
      <Tag
        {...props}
        className={`w-full bg-theme-card border text-theme text-sm px-3 py-2.5 focus:outline-none transition-colors duration-200 resize-none ${
          error ? 'border-red-500/50' : 'border-theme focus:border-hub-electric/60'
        }`}
      >
        {children}
      </Tag>
      {error && <p className="text-red-400/80 text-[10px]">{error}</p>}
    </div>
  )
}

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
    <section id="contact" className="relative flex flex-col overflow-hidden bg-theme">
      <SectionFrame />
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(13,63,165,0.12) 0%, transparent 65%)' }} />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-hub-azure/30 to-transparent" />

      {/* ── Main content — centered ── */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 xl:px-12 w-full py-12 lg:py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-hub-electric" />
            <span className="text-hub-electric dark:text-hub-bright text-xs font-semibold tracking-[0.3em] uppercase">HUB · Contacto</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <h2
              className="font-display text-theme leading-[0.90] tracking-wide"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              HABLEMOS DE{' '}
              <span className="text-gradient-electric">TU PRÓXIMO PASO</span>
            </h2>
            <p className="text-theme-muted text-sm max-w-xs leading-relaxed font-light shrink-0">
              Respondemos dentro de las 24 hs hábiles.<br />Sin compromiso, sin spam.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column: form + info ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Form — takes 3/5 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-5 py-8"
              >
                <div className="w-12 h-12 border border-hub-electric/40 flex items-center justify-center"
                  style={{ background: 'rgba(30,92,212,0.08)' }}>
                  <span className="text-hub-bright text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-display text-theme leading-none mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    CONSULTA <span className="text-gradient-electric">RECIBIDA.</span>
                  </h3>
                  <p className="text-theme-muted text-sm">Te contactamos en menos de 24 hs hábiles.</p>
                </div>
                <button onClick={() => setSent(false)}
                  className="text-hub-bright text-xs tracking-widest uppercase hover:text-white transition-colors w-fit border-b border-hub-electric/30 pb-px">
                  Enviar otra consulta →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Nombre completo *" error={errors.name && 'Requerido'}
                    {...register('name', { required: true })} />
                  <Field label="Email *" type="email" error={errors.email && 'Email inválido'}
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Teléfono" type="tel" {...register('phone')} />
                  <Field label="Me interesa…" as="select" error={errors.interest && 'Requerido'}
                    {...register('interest', { required: true })}>
                    <option value="" />
                    <option value="company">Espacio industrial</option>
                    <option value="investor">Invertir en HUB</option>
                    <option value="both">Ambas opciones</option>
                  </Field>
                </div>
                <Field label="Mensaje (opcional)" as="textarea" rows={4} {...register('message')} />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <span className="text-theme-muted/60 text-xs leading-relaxed">
                    Al enviar aceptás nuestra política de privacidad.
                  </span>
                  <button type="submit" disabled={isSubmitting}
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-hub-electric text-white text-xs font-bold tracking-widest uppercase hover:bg-hub-bright transition-all duration-200 disabled:opacity-50 shrink-0"
                    style={{ boxShadow: '0 0 24px rgba(30,92,212,0.25)' }}>
                    {isSubmitting ? 'Enviando…' : (
                      <>Enviar consulta <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info sidebar — takes 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-5 lg:border-l lg:pl-8" style={{ borderColor: 'var(--border)' }}
          >
            {/* Contact details — grid on mobile for compact display */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-0">
              {[
                { label: 'Email',    value: 'contacto@hubindustriales.com' },
                { label: 'Tel',      value: '+54 261 000-0000' },
                { label: 'Oficinas', value: 'Mendoza, Argentina' },
                { label: 'Horario',  value: 'Lun–Vie 9–18 hs' },
              ].map((item, i) => (
                <div key={item.label} className={`flex flex-col py-2.5 border-b lg:last:border-0`}
                  style={{ borderColor: 'var(--border)' }}>
                  <span className="text-theme-subtle text-[10px] tracking-widest uppercase mb-0.5">{item.label}</span>
                  <span className="text-theme text-xs sm:text-sm break-words">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {['LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#"
                  className="text-[10px] text-theme-muted border px-3 py-1.5 tracking-widest uppercase hover:border-hub-electric/50 hover:text-hub-bright transition-all duration-200"
                  style={{ borderColor: 'var(--border)' }}
                >{s}</a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
