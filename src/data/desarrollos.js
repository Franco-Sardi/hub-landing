// Copy literal de la entrega V4 (HUB_HOME_FINAL_V3 + landings hub-*.html).
// No asignar servicios exclusivos por desarrollo: el handoff lo prohíbe mientras no estén confirmados.
import malabiaImg from '../assets/v3/malabia.webp'
import anchorenaImg from '../assets/v3/anchorena.webp'
import sfOesteImg from '../assets/v3/sf-oeste.webp'
import sfEsteImg from '../assets/v3/sf-este.webp'
import rodriguezImg from '../assets/v3/rodriguez-pena.jpg'
import malabiaLogo from '../assets/v3/logo-malabia.png'
import anchorenaLogo from '../assets/v3/logo-anchorena.png'
import sfOesteLogo from '../assets/v3/logo-sf-oeste.png'
import sfEsteLogo from '../assets/v3/logo-sf-este.png'
import rodriguezLogo from '../assets/v3/logo-rodriguez-pena.png'

export const desarrollos = [
  {
    slug: 'malabia',
    nombre: 'Malabia',
    label: 'HUB Malabia',
    descriptor: 'espacio y comunidad',
    titulo: 'Espacio y comunidad',
    area: '64.070 m²',
    render: malabiaImg,
    logo: malabiaLogo,
    recurso: 'ficha-malabia',
    textoHome: 'HUB Malabia suma 64.070 m² de terreno y un perfil con mayor vocación urbana: actividad, servicios y usos que pueden convivir dentro de un mismo desarrollo.',
    h1: 'Espacio y comunidad en Luján de Cuyo',
    bajada: 'Un desarrollo HUB con perfil urbano, pensado para integrar actividad, servicios y comunidad dentro de una red de infraestructura real.',
    lead: 'Malabia incorpora a la red un perfil diferente: un desarrollo donde la infraestructura puede convivir con usos de trabajo, servicios y comunidad.',
    factoSecundario: 'Perfil urbano y de usos complementarios',
  },
  {
    slug: 'anchorena',
    nombre: 'Anchorena',
    label: 'HUB Anchorena',
    descriptor: 'centro de almacenamiento',
    titulo: 'Centro de almacenamiento',
    area: '84.025 m²',
    render: anchorenaImg,
    logo: anchorenaLogo,
    recurso: 'ficha-anchorena',
    textoHome: 'HUB Anchorena está planteado como centro de almacenamiento dentro de la red, con 84.025 m² de terreno y 53.090 m² de naves proyectadas.',
    h1: 'Centro de almacenamiento en Luján de Cuyo',
    bajada: 'Escala para operaciones de almacenamiento y logística dentro de la red HUB.',
    lead: 'Anchorena está planteado como centro de almacenamiento dentro de la red, con 84.025 m² de terreno y 53.090 m² de naves proyectadas.',
    factoSecundario: '53.090 m² de naves proyectadas',
  },
  {
    slug: 'san-francisco-oeste',
    nombre: 'San Francisco del Monte Oeste',
    label: 'HUB San Francisco del Monte Oeste',
    descriptor: 'naves industriales',
    titulo: 'Naves industriales',
    area: '72.968 m²',
    render: sfOesteImg,
    logo: sfOesteLogo,
    recurso: 'ficha-sf-oeste',
    textoHome: 'HUB San Francisco del Monte Oeste proyecta 72.968 m² de terreno y un perfil orientado a naves industriales para operaciones que necesitan escala e infraestructura.',
    h1: 'Naves industriales en San Francisco del Monte',
    bajada: 'Un nodo de perfil industrial dentro de una red conectada con los principales corredores productivos de Mendoza.',
    lead: 'San Francisco del Monte Oeste proyecta 72.968 m² de terreno y un perfil orientado a operaciones que necesitan escala e infraestructura industrial.',
    factoSecundario: 'Perfil industrial',
  },
  {
    slug: 'san-francisco-este',
    nombre: 'San Francisco del Monte Este',
    label: 'HUB San Francisco del Monte Este',
    descriptor: 'naves y logística',
    titulo: 'Naves y logística',
    area: '33.546 m²',
    render: sfEsteImg,
    logo: sfEsteLogo,
    recurso: 'ficha-sf-este',
    textoHome: 'HUB San Francisco del Monte Este contempla 33.546 m² de terreno y un perfil vinculado a naves, logística y distribución dentro del sistema HUB.',
    h1: 'Naves y logística en San Francisco del Monte',
    bajada: 'Un desarrollo compacto de la red, vinculado a operación, distribución y logística.',
    lead: 'San Francisco del Monte Este contempla 33.546 m² de terreno y un perfil vinculado a naves, logística y distribución.',
    factoSecundario: 'Naves y logística',
  },
  {
    slug: 'rodriguez-pena',
    nombre: 'Rodríguez Peña',
    label: 'HUB Rodríguez Peña',
    descriptor: 'naves industriales',
    titulo: 'Naves industriales',
    area: '80.000 m²',
    render: rodriguezImg,
    logo: rodriguezLogo,
    recurso: 'ficha-rodriguez',
    textoHome: 'HUB Rodríguez Peña amplía la red con un nodo de perfil industrial y una superficie de terreno informada de 80.000 m².',
    h1: 'Naves industriales sobre el eje Rodríguez Peña',
    bajada: 'Un nodo de perfil industrial integrado a los corredores productivos que articulan la red HUB.',
    lead: 'Rodríguez Peña amplía la red con un desarrollo de perfil industrial y una superficie de terreno informada de 80.000 m².',
    factoSecundario: 'Perfil industrial',
  },
]

export const desarrolloPorSlug = Object.fromEntries(desarrollos.map((d) => [d.slug, d]))
