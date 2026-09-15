import anchorenaImg from '../assets/opt/anchorena-planimetria-watercolor.webp'
import sfdmEsteImg from '../assets/opt/sfdm-este-aerial.webp'
import sfdmOesteImg from '../assets/opt/sfdm-oeste-aerial.webp'
import rodriguezPenaImg from '../assets/opt/rodriguez-pena-aerial.webp'
import malabiaImg from '../assets/opt/malabia-plano.webp'

// Thumbs 900w — las cards de la landing muestran esto en h-44 (176px).
// Sin esto se bajaba el aereo completo (hasta 3,4 MB) para un recuadro chico.
import anchorenaThumb from '../assets/opt/anchorena-thumb.webp'
import sfdmEsteThumb from '../assets/opt/sfdm-este-thumb.webp'
import sfdmOesteThumb from '../assets/opt/sfdm-oeste-thumb.webp'
import rodriguezPenaThumb from '../assets/opt/rodriguez-pena-thumb.webp'
import malabiaThumb from '../assets/opt/malabia-thumb.webp'

// ══════════════════════════════════════════════════════════════════════════
// Datos oficiales — extraídos del Brochure 10 HUB 2026.
// Orden exacto: 01 Anchorena, 02 SFDM Este, 03 Malabia,
// 04 Rodriguez Peña Este, 05 SFDM Oeste.
// ══════════════════════════════════════════════════════════════════════════

export const projects = [
  {
    id: 1,
    number: '01',
    slug: 'anchorena',
    name: 'HUB Anchorena',
    shortName: 'Anchorena',
    location: 'Luján de Cuyo, Mendoza',
    address: 'Acceso Sur - Lateral Oeste, M5507 Luján de Cuyo, Mendoza',
    coords: [-33.023417, -68.860404],
    area: '84.025',        // Superficie terreno (m²)
    areaTotal: '49.800',   // Superficie naves (m²)
    areaNaves: '49.800',
    units: 'Nave 01 · Nave 02 · Nave 03 · Playa de Maniobras · Sector Comercial',
    status: 'En desarrollo',
    statusColor: 'ink',
    hasCommercialCenter: true,
    description: 'Sobre Acceso Sur en el corredor logístico más dinámico de Mendoza. Tres naves logísticas Triple A con playa de maniobras, sector comercial, estacionamiento y tránsito diferenciado para carga pesada y liviana.',
    features: [
      'Nave 01 / Nave 02 / Nave 03',
      'Playa de Maniobras',
      'Sector Comercial',
      'Estacionamiento',
      'Tránsito Pesado diferenciado',
      'Tránsito Liviano diferenciado',
    ],
    image: anchorenaImg,
    thumb: anchorenaThumb,
  },
  {
    id: 2,
    number: '02',
    slug: 'san-francisco-del-monte-este',
    name: 'HUB San Francisco del Monte Este',
    shortName: 'San Francisco del Monte Este',
    location: 'San Francisco del Monte, Mendoza',
    address: 'Ruta Nacional 7, San Francisco del Monte, Mendoza',
    coords: [-32.938528, -68.754472],
    area: '33.546',
    areaTotal: '20.000',
    areaNaves: '20.000',
    units: 'Nave de Almacenamiento · Área Operativa y Muelles',
    status: 'En desarrollo',
    statusColor: 'ink',
    description: 'Con salida a la Ruta 7 en el corredor este, acceso directo hacia Buenos Aires y el Mercosur. Nave de almacenamiento con área operativa, muelles y playas de estacionamiento diferenciado.',
    features: [
      'Nave de Almacenamiento',
      'Área Operativa y Muelles',
      'Playa de Maniobras',
      'Playas de Estacionamiento Diferenciado',
      'Área Administrativa y Servicios',
    ],
    image: sfdmEsteImg,
    thumb: sfdmEsteThumb,
  },
  {
    id: 3,
    number: '03',
    slug: 'malabia',
    name: 'HUB Malabia',
    shortName: 'Malabia',
    location: 'Luján de Cuyo, Mendoza',
    address: 'América, M5505 Luján de Cuyo, Mendoza',
    coords: [-32.975250, -68.847645],
    area: '64.070',
    areaTotal: '24.000',
    areaNaves: '24.000',
    units: 'Nave 01 · Nave 02 · Nave 03 · Playa de Maniobras · Sector Comercial',
    status: 'En desarrollo',
    statusColor: 'ink',
    hasCommercialCenter: true,
    description: 'El predio de mayor escala de la red HUB. Sobre Acceso Sur, mismo corredor que HUB Anchorena. Tres naves logísticas Triple A con sector comercial propio, estacionamiento y tránsito diferenciado.',
    features: [
      'Nave 01 / Nave 02 / Nave 03',
      'Playa de Maniobras',
      'Sector Comercial',
      'Estacionamiento',
      'Tránsito Pesado diferenciado',
      'Tránsito Liviano diferenciado',
    ],
    image: malabiaImg,
    thumb: malabiaThumb,
  },
  {
    id: 4,
    number: '04',
    slug: 'rodriguez-pena-este',
    name: 'HUB Rodríguez Peña Este',
    shortName: 'Rodríguez Peña',
    location: 'Rodríguez Peña, Mendoza',
    address: 'Rodríguez Peña (este), Mendoza',
    coords: [-32.937526, -68.775179],
    area: '80.000',
    areaTotal: '43.500',
    areaNaves: '43.500',
    units: 'Nave Logística Oeste · Nave Logística Este · Nave Logística Sur',
    status: 'En desarrollo',
    statusColor: 'ink',
    description: 'Tres naves logísticas con docks de carga dedicados, iluminación natural, oficinas y servicios integrados. Corredor estratégico Ruta 7 / Ruta 40.',
    features: [
      'Nave Logística Oeste',
      'Nave Logística Este',
      'Nave Logística Sur',
      'Docks de Carga',
      'Estacionamiento',
      'Iluminación Natural',
      'Oficinas y Servicios',
    ],
    image: rodriguezPenaImg,
    thumb: rodriguezPenaThumb,
  },
  {
    id: 5,
    number: '05',
    slug: 'san-francisco-del-monte-oeste',
    name: 'HUB San Francisco del Monte Oeste',
    shortName: 'San Francisco del Monte Oeste',
    location: 'San Francisco del Monte, Mendoza',
    address: 'Ruta Nacional 7, San Francisco del Monte, Mendoza',
    coords: [-32.936833, -68.758861],
    area: '72.968',
    areaTotal: '40.000',
    areaNaves: '40.000',
    units: 'Nave de Almacenamiento · Área Operativa y Muelles',
    status: 'En desarrollo',
    statusColor: 'ink',
    description: 'Nave de gran capacidad con salida a la Ruta 7, área operativa, muelles y playas de estacionamiento diferenciado. Acceso directo al corredor bioceánico.',
    features: [
      'Nave de Almacenamiento',
      'Área Operativa y Muelles',
      'Playa de Maniobras',
      'Estacionamientos Segregados',
      'Área Administrativa y Servicios',
    ],
    image: sfdmOesteImg,
    thumb: sfdmOesteThumb,
  },
]

// ══════════════════════════════════════════════════════════════════════════
// Cifras globales — oficiales del brochure 2026
// ══════════════════════════════════════════════════════════════════════════
export const stats = {
  parks: 5,
  sqMeters: '335.000',        // Superficie total de terreno
  sqMetersNaves: '178.000',   // Naves industriales inteligentes
  companies: 40,
}

// ══════════════════════════════════════════════════════════════════════════
// Servicios comunes a toda la red — listados en cada ficha del brochure
// ══════════════════════════════════════════════════════════════════════════
export const commonServices = [
  'Eficiencia operativa',
  'Sustentabilidad',
  'Flexibilidad de uso',
  'Módulos que se adaptan a tu operación',
  'Iluminación LED',
  'Energía trifásica',
  'Oficinas integradas',
  'Pavimentos industriales',
]

// ══════════════════════════════════════════════════════════════════════════
// Atributos sustentables / tecnológicos (iconos del brochure)
// ══════════════════════════════════════════════════════════════════════════
export const sustainabilityAttributes = [
  'Energías renovables',
  'Control del consumo de energía',
  'Reutilización de aguas',
  'Bike parking',
  'Uso eficiente del agua potable',
  'Fibra óptica',
]

// ══════════════════════════════════════════════════════════════════════════
// Categorías de fiduciantes del proyecto — del brochure.
// IMPORTANTE: NO mostrar valores USD, tasas ni retornos. La información
// comercial se entrega en la consulta directa.
// ══════════════════════════════════════════════════════════════════════════
export const participationCategories = [
  {
    key: 'iniciales',
    title: 'Iniciales',
    description: 'Fiduciantes fundadores del proyecto.',
  },
  {
    key: 'pioneros',
    title: 'Pioneros',
    description: 'Ingresan en la etapa de desarrollo con condiciones preferenciales.',
  },
  {
    key: 'inversores',
    title: 'Inversores',
    description: 'Participan con capital y perciben retornos durante y después de la obra.',
  },
]
