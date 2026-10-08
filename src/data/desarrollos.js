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
    ubicacion: 'Luján de Cuyo, Mendoza',
    nombre: 'Malabia',
    label: 'HUB Malabia',
    descriptor: 'espacio y comunidad',
    titulo: 'Espacio y comunidad',
    area: '64.070 m²',
    render: malabiaImg,
    logo: malabiaLogo,
    recurso: 'ficha-malabia',
    textoHome: 'HUB Malabia suma 64.070 m² de terreno y un perfil con mayor vocación urbana: actividad, servicios y usos que pueden convivir dentro de un mismo desarrollo.',
  },
  {
    slug: 'anchorena',
    ubicacion: 'Luján de Cuyo, Mendoza',
    nombre: 'Anchorena',
    label: 'HUB Anchorena',
    descriptor: 'centro de almacenamiento',
    titulo: 'Centro de almacenamiento',
    area: '84.025 m²',
    render: anchorenaImg,
    logo: anchorenaLogo,
    recurso: 'ficha-anchorena',
    textoHome: 'HUB Anchorena está planteado como centro de almacenamiento dentro de la red, con 84.025 m² de terreno y 53.090 m² de naves proyectadas.',
  },
  {
    slug: 'san-francisco-este',
    ubicacion: 'San Francisco del Monte, Mendoza',
    nombre: 'San Francisco del Monte 1',
    label: 'HUB San Francisco del Monte 1',
    descriptor: 'naves y logística',
    titulo: 'Naves y logística',
    area: '33.546 m²',
    render: sfEsteImg,
    logo: sfEsteLogo,
    recurso: 'ficha-sf-este',
    textoHome: 'HUB San Francisco del Monte 1 contempla 33.546 m² de terreno y un perfil vinculado a naves, logística y distribución dentro del sistema HUB.',
  },
  {
    slug: 'san-francisco-oeste',
    ubicacion: 'San Francisco del Monte, Mendoza',
    nombre: 'San Francisco del Monte 2',
    label: 'HUB San Francisco del Monte 2',
    descriptor: 'naves industriales',
    titulo: 'Naves industriales',
    area: '72.968 m²',
    render: sfOesteImg,
    logo: sfOesteLogo,
    recurso: 'ficha-sf-oeste',
    textoHome: 'HUB San Francisco del Monte 2 proyecta 72.968 m² de terreno y un perfil orientado a naves industriales para operaciones que necesitan escala e infraestructura.',
  },
  {
    slug: 'rodriguez-pena',
    ubicacion: 'Rodríguez Peña, Mendoza',
    nombre: 'Rodríguez Peña',
    label: 'HUB Rodríguez Peña',
    descriptor: 'naves industriales',
    titulo: 'Naves industriales',
    area: '80.000 m²',
    render: rodriguezImg,
    logo: rodriguezLogo,
    recurso: 'ficha-rodriguez',
    textoHome: 'HUB Rodríguez Peña amplía la red con un nodo de perfil industrial y una superficie de terreno informada de 80.000 m².',
  },
]

export const desarrolloPorSlug = Object.fromEntries(desarrollos.map((d) => [d.slug, d]))
