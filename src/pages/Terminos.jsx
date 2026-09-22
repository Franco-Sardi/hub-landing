import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Meta pide una URL de Términos del Servicio para pasar la app de WhatsApp a Live
// (junto con la de privacidad y la de eliminación de datos). Tiene que ser pública:
// el crawler de Meta la visita sin sesión.
// ⚠️ Texto redactado por la agencia, PENDIENTE DE REVISIÓN LEGAL DE HUB (22-sep-2026).
const EMAIL_CONTACTO = 'contacto@hubmza.com.ar'

const RAZON_SOCIAL = 'HUB MENDOZA S.A.S.'
const CUIT = '30-71925510-4'
const DOMICILIO = 'Liniers 1045, Chacras de Coria (M5505), Mendoza, Argentina'
const ACTUALIZADO = '22 de septiembre de 2026'

function Seccion({ titulo, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-theme-aware text-lg sm:text-xl font-semibold mb-3">{titulo}</h2>
      <div className="text-theme-muted text-sm sm:text-base leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

export default function Terminos() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-svh theme-alt" style={{ backgroundColor: '#022A3A' }}>
      <Helmet>
        <title>Términos del Servicio | HUB</title>
        <meta
          name="description"
          content="Condiciones de uso del sitio de HUB y de nuestros canales de contacto, incluido WhatsApp."
        />
      </Helmet>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <Link
          to="/"
          className="text-theme-accent text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-theme-aware text-3xl sm:text-4xl font-bold mt-6 mb-2">
          Términos del Servicio
        </h1>
        <p className="text-theme-subtle text-xs sm:text-sm mb-12">
          Última actualización: {ACTUALIZADO}
        </p>

        <Seccion titulo="1. Quiénes somos y qué alcanzan estos términos">
          <p>
            {RAZON_SOCIAL} (CUIT {CUIT}), con domicilio en {DOMICILIO}, en adelante «HUB», pone a
            disposición este sitio y sus canales de contacto (WhatsApp, correo electrónico,
            Instagram y el formulario del sitio).
          </p>
          <p>
            Estos términos regulan el uso del sitio y de esos canales. Al usarlos, aceptás lo que
            se describe acá. Si no estás de acuerdo, te pedimos que no los utilices.
          </p>
        </Seccion>

        <Seccion titulo="2. La información del sitio es informativa, no es una oferta">
          <p>
            El contenido publicado —superficies, planos, renders, plazos de obra, servicios,
            valores de referencia y condiciones de inversión— tiene{' '}
            <strong className="text-theme-aware">carácter informativo y puede cambiar sin previo
            aviso</strong>. No constituye una oferta vinculante, ni una promesa de venta, locación
            o suscripción.
          </p>
          <p>
            Las imágenes, renders y planos son representaciones de proyectos{' '}
            <strong className="text-theme-aware">en desarrollo</strong>, con fines ilustrativos:
            pueden diferir de la obra final. La disponibilidad concreta de un espacio, su precio y
            sus plazos se confirman por escrito en cada caso.
          </p>
          <p>
            Toda relación comercial se rige por el contrato que se firme entre las partes. Ante
            cualquier diferencia entre este sitio y ese contrato, prevalece el contrato.
          </p>
        </Seccion>

        <Seccion titulo="3. Nada de lo publicado es asesoramiento financiero">
          <p>
            La información sobre la modalidad de inversión se ofrece a título informativo y{' '}
            <strong className="text-theme-aware">no constituye asesoramiento financiero, legal,
            contable ni impositivo</strong>. Toda referencia a rendimientos es{' '}
            <strong className="text-theme-aware">estimada</strong>: no implica garantía ni promesa
            de resultado, y los proyectos de infraestructura están sujetos a riesgos propios de su
            actividad.
          </p>
          <p>
            Antes de tomar una decisión, te recomendamos analizar la documentación del proyecto y
            consultar con tus asesores.
          </p>
        </Seccion>

        <Seccion titulo="4. Canales de contacto y asistente automatizado">
          <p>
            Cuando nos escribís por WhatsApp, tu mensaje puede ser atendido por un{' '}
            <strong className="text-theme-aware">asistente automatizado con inteligencia
            artificial</strong>, que responde consultas frecuentes sobre nuestros proyectos. Podés
            pedir hablar con una persona en cualquier momento.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Las respuestas del asistente son informativas y pueden contener errores u omisiones:
              no obligan a HUB.
            </li>
            <li>
              El canal está pensado para consultas comerciales. No lo uses para emergencias, ni
              para enviar datos sensibles o documentación confidencial.
            </li>
            <li>
              Escribirnos no genera ninguna obligación de reservar, mantener un precio ni asignar
              un espacio.
            </li>
            <li>
              Podés pedir que dejemos de contactarte cuando quieras, escribiendo a{' '}
              <a href={`mailto:${EMAIL_CONTACTO}`} className="text-theme-accent hover:opacity-80">
                {EMAIL_CONTACTO}
              </a>{' '}
              o respondiendo por el mismo canal.
            </li>
            <li>
              El servicio de mensajería lo provee WhatsApp (Meta Platforms) y su uso se rige además
              por los términos de Meta.
            </li>
          </ul>
          <p>
            El tratamiento de tus datos personales se explica en nuestra{' '}
            <Link to="/privacidad" className="text-theme-accent hover:opacity-80">
              Política de Privacidad
            </Link>
            , que incluye cómo pedir su eliminación.
          </p>
        </Seccion>

        <Seccion titulo="5. Uso permitido del sitio">
          <p>Al usar el sitio y nuestros canales, te comprometés a no:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Usarlos con fines ilícitos, fraudulentos o para enviar contenido que no te pertenece.</li>
            <li>Suplantar la identidad de otra persona o empresa.</li>
            <li>
              Intentar vulnerar la seguridad del sitio, acceder a áreas no públicas, o afectar su
              funcionamiento con medios automatizados (extracción masiva de contenido, envíos
              masivos de mensajes).
            </li>
            <li>Publicar o transmitir contenido ofensivo, discriminatorio o que infrinja derechos de terceros.</li>
          </ul>
          <p>
            Podemos suspender el acceso a nuestros canales ante un uso abusivo, sin necesidad de
            aviso previo.
          </p>
        </Seccion>

        <Seccion titulo="6. Propiedad intelectual">
          <p>
            La marca HUB, los logotipos, textos, fotografías, renders, planos y demás materiales
            del sitio pertenecen a HUB o a sus titulares, y están protegidos por la normativa
            aplicable. Podés verlos y compartirlos con fines personales e informativos, citando la
            fuente.
          </p>
          <p>
            No está permitido reproducirlos, modificarlos ni usarlos con fines comerciales sin
            autorización previa y por escrito.
          </p>
        </Seccion>

        <Seccion titulo="7. Enlaces y servicios de terceros">
          <p>
            El sitio puede incluir enlaces o integraciones con servicios de terceros (por ejemplo,
            mapas, formularios, WhatsApp o redes sociales). HUB no controla esos servicios ni
            responde por sus contenidos, disponibilidad o políticas.
          </p>
        </Seccion>

        <Seccion titulo="8. Disponibilidad y responsabilidad">
          <p>
            Procuramos que el sitio esté disponible y actualizado, pero puede haber
            interrupciones, tareas de mantenimiento o errores de carga. El sitio se ofrece «tal
            como está».
          </p>
          <p>
            En la medida permitida por la ley, HUB no responde por daños indirectos derivados del
            uso del sitio o de la imposibilidad de usarlo. Nada de lo dicho acá limita los derechos
            que la normativa de defensa del consumidor reconoce a quienes revistan esa condición.
          </p>
        </Seccion>

        <Seccion titulo="9. Cambios en estos términos">
          <p>
            Podemos actualizar estos términos. La versión vigente es siempre la publicada en esta
            página, con su fecha de última actualización. Si el cambio es significativo, lo vamos a
            indicar de forma visible.
          </p>
        </Seccion>

        <Seccion titulo="10. Ley aplicable y jurisdicción">
          <p>
            Estos términos se rigen por las leyes de la República Argentina. Ante cualquier
            controversia, las partes se someten a los tribunales ordinarios de la Ciudad de
            Mendoza, sin perjuicio del fuero que corresponda a quienes revistan la condición de
            consumidores.
          </p>
        </Seccion>

        <Seccion titulo="11. Contacto">
          <p>
            Por cualquier consulta sobre estos términos, escribinos a{' '}
            <a href={`mailto:${EMAIL_CONTACTO}`} className="text-theme-accent hover:opacity-80">
              {EMAIL_CONTACTO}
            </a>
            , o por correo postal a {DOMICILIO}.
          </p>
        </Seccion>

        <div className="border-t border-white/10 pt-8">
          <Link to="/privacidad" className="text-theme-accent text-sm hover:opacity-80">
            Ver la Política de Privacidad →
          </Link>
        </div>
      </div>
    </div>
  )
}
