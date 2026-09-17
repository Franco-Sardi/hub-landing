import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Casilla oficial para pedidos de acceso/rectificación/supresión (confirmada por
// Franco el 16-sep-2026). Meta exige que sea un canal VÁLIDO y vigente: si rebota,
// es causal de rechazo en App Review.
const EMAIL_PRIVACIDAD = 'contacto@hubmza.com'

const RAZON_SOCIAL = 'HUB MENDOZA S.A.S.'
const CUIT = '30-71925510-4'
const DOMICILIO = 'Liniers 1045, Chacras de Coria (M5505), Mendoza, Argentina'
const ACTUALIZADO = '16 de septiembre de 2026'

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

export default function Privacidad() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-svh theme-alt" style={{ backgroundColor: '#022A3A' }}>
      <Helmet>
        <title>Política de Privacidad | HUB</title>
        <meta
          name="description"
          content="Cómo HUB recolecta, usa y protege los datos personales de quienes nos contactan, incluido WhatsApp."
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
          Política de Privacidad
        </h1>
        <p className="text-theme-subtle text-xs sm:text-sm mb-12">
          Última actualización: {ACTUALIZADO}
        </p>

        <Seccion titulo="1. Quiénes somos">
          <p>
            {RAZON_SOCIAL} (CUIT {CUIT}), con domicilio en {DOMICILIO}, es responsable del
            tratamiento de los datos personales que se describen en esta política. En adelante,
            «HUB» o «nosotros».
          </p>
          <p>
            Desarrollamos infraestructura industrial y logística. Esta política explica qué datos
            recolectamos de quienes nos contactan, para qué los usamos y qué derechos tienen
            sobre ellos.
          </p>
        </Seccion>

        <Seccion titulo="2. Qué datos recolectamos">
          <p><strong className="text-theme-aware">Los que nos das vos:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre y apellido.</li>
            <li>Número de teléfono y dirección de correo electrónico.</li>
            <li>
              El contenido de los mensajes que nos enviás por WhatsApp, correo, Instagram o el
              formulario de contacto del sitio.
            </li>
            <li>
              Información sobre tu interés comercial que compartas en la conversación: si buscás
              invertir o alquilar espacio, montos estimados, plazos, rubro de tu empresa.
            </li>
          </ul>
          <p className="pt-2"><strong className="text-theme-aware">Los que se generan solos:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Datos técnicos de navegación (páginas visitadas, tipo de dispositivo, procedencia
              aproximada). Usamos una herramienta de analítica que <strong className="text-theme-aware">no
              utiliza cookies</strong> ni construye perfiles individuales.
            </li>
            <li>Fecha y hora de los mensajes, y su estado de entrega.</li>
          </ul>
          <p>
            No pedimos ni necesitamos datos sensibles (salud, origen racial, opiniones políticas,
            religión). Te pedimos que no los incluyas en tus mensajes.
          </p>
        </Seccion>

        <Seccion titulo="3. WhatsApp y asistente automatizado">
          <p>
            Cuando nos escribís por WhatsApp, tu mensaje es atendido por un{' '}
            <strong className="text-theme-aware">asistente automatizado con inteligencia
            artificial</strong> que responde consultas frecuentes sobre nuestros proyectos. Queremos
            que lo sepas desde el primer momento: no siempre hay una persona del otro lado.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              En cualquier momento podés pedir hablar con una persona, y la conversación pasa a un
              integrante de nuestro equipo comercial.
            </li>
            <li>
              Las conversaciones se guardan en nuestro sistema de gestión para darte continuidad:
              que no tengas que repetir lo que ya contaste.
            </li>
            <li>
              El asistente puede registrar tu nivel de interés para que el equipo comercial priorice
              el seguimiento. <strong className="text-theme-aware">Ninguna decisión que produzca
              efectos jurídicos sobre vos se toma de forma exclusivamente automatizada</strong>: la
              relación comercial siempre la define una persona.
            </li>
            <li>
              El servicio de mensajería lo provee WhatsApp (Meta Platforms). El transporte de los
              mensajes se rige además por las políticas de Meta.
            </li>
            <li>
              A través de la API de WhatsApp Business, Meta nos transmite: tu{' '}
              <strong className="text-theme-aware">número de teléfono</strong>, el{' '}
              <strong className="text-theme-aware">nombre de perfil</strong> que tengas configurado
              en WhatsApp, el <strong className="text-theme-aware">contenido de los mensajes</strong>{' '}
              que nos mandás y su fecha, hora y estado de entrega. No recibimos tu agenda de
              contactos, tu foto de perfil ni tus conversaciones con otras personas.
            </li>
          </ul>
        </Seccion>

        <Seccion titulo="4. Para qué usamos tus datos">
          <ul className="list-disc pl-5 space-y-1">
            <li>Responder tus consultas y darte información sobre nuestros proyectos.</li>
            <li>Coordinar reuniones, visitas y llamadas.</li>
            <li>Hacer seguimiento comercial de tu interés.</li>
            <li>Cumplir obligaciones legales, contables e impositivas cuando corresponda.</li>
            <li>Mejorar nuestro sitio y la calidad de nuestras respuestas.</li>
          </ul>
          <p>
            No vendemos tus datos. No los cedemos a terceros con fines publicitarios. No te
            enviamos comunicaciones masivas sin tu consentimiento.
          </p>
        </Seccion>

        <Seccion titulo="5. Base legal">
          <p>
            Tratamos tus datos con tu <strong className="text-theme-aware">consentimiento</strong>,
            que prestás al contactarnos voluntariamente, y por el interés legítimo de responder y
            gestionar una relación comercial que vos iniciaste. Podés retirar ese consentimiento
            cuando quieras (punto 9).
          </p>
        </Seccion>

        <Seccion titulo="6. Con quién los compartimos">
          <p>
            Solo con proveedores que nos prestan servicios y únicamente para que podamos
            atenderte:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Meta Platforms, como proveedor de la plataforma de WhatsApp.</li>
            <li>Nuestro proveedor de infraestructura y alojamiento.</li>
            <li>Los proveedores de los modelos de lenguaje que usa el asistente.</li>
            <li>Asesores profesionales y autoridades, cuando una norma lo exija.</li>
          </ul>
          <p>
            Algunos de estos proveedores están fuera de la Argentina, por lo que puede haber
            transferencia internacional de datos. Elegimos proveedores que ofrecen niveles de
            protección adecuados y les exigimos confidencialidad.
          </p>
        </Seccion>

        <Seccion titulo="7. Cuánto tiempo los guardamos">
          <p>
            Conservamos tus datos mientras dure la relación comercial y hasta{' '}
            <strong className="text-theme-aware">24 meses</strong> después del último contacto, salvo
            que pidas su supresión antes o que una obligación legal nos exija conservarlos más
            tiempo. Cumplido el plazo, se eliminan o se anonimizan.
          </p>
        </Seccion>

        <Seccion titulo="8. Seguridad">
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: acceso
            restringido al personal que lo necesita, cifrado en tránsito, y copias de seguridad
            periódicas. Ningún sistema es infalible, pero trabajamos para que el riesgo sea el
            menor posible.
          </p>
        </Seccion>

        <Seccion titulo="9. Tus derechos y cómo eliminar tus datos">
          <p>
            Por la <strong className="text-theme-aware">Ley 25.326 de Protección de los Datos
            Personales</strong> tenés derecho a acceder a tus datos, rectificarlos si son inexactos,
            actualizarlos y pedir su supresión, así como a retirar tu consentimiento y a que dejemos
            de contactarte.
          </p>
          <p>
            Para ejercerlos, escribinos a{' '}
            <a
              href={`mailto:${EMAIL_PRIVACIDAD}`}
              className="text-theme-accent hover:opacity-80 transition-opacity underline"
            >
              {EMAIL_PRIVACIDAD}
            </a>
            . Respondemos dentro de los plazos legales. Si por WhatsApp querés que dejemos de
            escribirte, alcanza con que nos lo digas en el chat.
          </p>
          <div id="eliminar-datos" className="scroll-mt-24 rounded-lg border border-theme-accent/25 p-4 sm:p-5 mt-4">
            <h3 className="text-theme-aware text-base font-semibold mb-2">
              Cómo pedir la eliminación de tus datos
            </h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Escribí a{' '}
                <a
                  href={`mailto:${EMAIL_PRIVACIDAD}?subject=Eliminación de mis datos personales`}
                  className="text-theme-accent hover:opacity-80 transition-opacity underline"
                >
                  {EMAIL_PRIVACIDAD}
                </a>{' '}
                con el asunto «Eliminación de mis datos personales».
              </li>
              <li>
                Indicá el número de teléfono o el correo con el que nos contactaste, para que
                podamos encontrar tus datos.
              </li>
              <li>
                Eliminamos tu información dentro de los <strong className="text-theme-aware">10
                días hábiles</strong> y te confirmamos por el mismo medio. Se borran tus datos de
                contacto y el historial de conversaciones, salvo lo que una obligación legal nos
                obligue a conservar.
              </li>
            </ol>
            <p className="pt-2">
              También podés pedirlo <strong className="text-theme-aware">por el mismo chat de
              WhatsApp</strong>: escribinos «quiero que eliminen mis datos» y lo gestionamos igual.
            </p>
          </div>
          <p className="text-theme-subtle text-xs sm:text-sm pt-2">
            La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, es la
            autoridad ante la cual podés reclamar si considerás que no atendimos tu pedido.
          </p>
        </Seccion>

        <Seccion titulo="10. Menores de edad">
          <p>
            Nuestros servicios están dirigidos a personas mayores de 18 años. No recolectamos datos
            de menores de forma intencional. Si detectamos que recibimos datos de un menor, los
            eliminamos.
          </p>
        </Seccion>

        <Seccion titulo="11. Cambios en esta política">
          <p>
            Podemos actualizar esta política. Cuando lo hagamos, cambiamos la fecha del encabezado.
            Si el cambio es significativo, lo vamos a comunicar por los canales en los que estemos
            en contacto con vos.
          </p>
        </Seccion>

        <Seccion titulo="12. Contacto">
          <p>
            {RAZON_SOCIAL} — {DOMICILIO}
            <br />
            <a
              href={`mailto:${EMAIL_PRIVACIDAD}`}
              className="text-theme-accent hover:opacity-80 transition-opacity underline"
            >
              {EMAIL_PRIVACIDAD}
            </a>
          </p>
        </Seccion>
      </div>
    </div>
  )
}
