// Logos del set de Branding (brochure), pasados a monocromo azul HUB con fondo transparente
// (handoff §7: partners en monocromo y segunda jerarquía). Las fundadoras van a color.
// `r` = ancho/alto del archivo: se usa para darles el mismo peso visual (área), no el mismo alto.
// Fundadoras en sus colores de marca (pedido de Franco, 28-09); Terrandes es negro en su marca.
import oscarDavid from '../assets/v3/empresas/oscar-david-color.webp'
import carnes from '../assets/v3/empresas/carnes-de-mi-campo-color.webp'
import terrandes from '../assets/v3/empresas/terrandes-color.webp'
import ltn from '../assets/v3/empresas/grupo-ltn.webp'
import hormiServ from '../assets/v3/empresas/hormi-serv.webp'
import rogiro from '../assets/v3/empresas/rogiro-aceros.webp'
import logmetal from '../assets/v3/empresas/logmetal.webp'
import saldana from '../assets/v3/empresas/saldana.webp'
import inducret from '../assets/v3/empresas/inducret.webp'
import prear from '../assets/v3/empresas/prear.webp'

// `web`: verificada abriendo cada sitio (08-oct). Oscar David no tiene web propia encontrada.
export const fundadoras = [
  { nombre: 'Oscar David', logo: oscarDavid, r: 277 / 100 },
  { nombre: 'Carnes de mi Campo', logo: carnes, r: 1, web: 'https://carnesdemicampo.com.ar' },
  { nombre: 'Terrandes', logo: terrandes, r: 338 / 54, web: 'https://terrandes.com' },
]

export const partners = [
  { nombre: 'Grupo LTN', logo: ltn, r: 358 / 112, web: 'https://www.grupoltn.com' },
  { nombre: 'Hormi-Serv', logo: hormiServ, r: 742 / 95, web: 'https://hormiserv.com' },
  { nombre: 'Rogiro Aceros', logo: rogiro, r: 150 / 51, web: 'https://rogiroaceros.com' },
  { nombre: 'Logmetal', logo: logmetal, r: 340 / 160, web: 'https://logmetal.com.ar' },
  { nombre: 'Saldaña', logo: saldana, r: 500 / 160, web: 'https://saldana.com.ar' },
  { nombre: 'Inducret', logo: inducret, r: 337 / 99, web: 'https://inducret.com.ar' },
  { nombre: 'Prear', logo: prear, r: 569 / 160, web: 'https://prear.com.ar' },
]

// Alto que da a cada logo la misma área aproximada, con topes para los muy cuadrados o muy largos.
export function altoLogo(r, area, min, max) {
  return Math.round(Math.min(max, Math.max(min, Math.sqrt(area / r))))
}
