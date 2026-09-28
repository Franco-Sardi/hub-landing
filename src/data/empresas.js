// Logos del set de Branding (brochure), pasados a monocromo azul HUB con fondo transparente
// (handoff §7: fundadoras una sola vez y en monocromo; partners en segunda jerarquía).
// `r` = ancho/alto del archivo: se usa para darles el mismo peso visual (área), no el mismo alto.
import oscarDavid from '../assets/v3/empresas/oscar-david.webp'
import carnes from '../assets/v3/empresas/carnes-de-mi-campo.webp'
import terrandes from '../assets/v3/empresas/terrandes.webp'
import ltn from '../assets/v3/empresas/grupo-ltn.webp'
import hormiServ from '../assets/v3/empresas/hormi-serv.webp'
import rogiro from '../assets/v3/empresas/rogiro-aceros.webp'
import logmetal from '../assets/v3/empresas/logmetal.webp'
import saldana from '../assets/v3/empresas/saldana.webp'
import inducret from '../assets/v3/empresas/inducret.webp'
import prear from '../assets/v3/empresas/prear.webp'

export const fundadoras = [
  { nombre: 'Oscar David', logo: oscarDavid, r: 277 / 100 },
  { nombre: 'Carnes de mi Campo', logo: carnes, r: 1 },
  { nombre: 'Terrandes', logo: terrandes, r: 338 / 54 },
]

export const partners = [
  { nombre: 'Grupo LTN', logo: ltn, r: 358 / 112 },
  { nombre: 'Hormi-Serv', logo: hormiServ, r: 742 / 95 },
  { nombre: 'Rogiro Aceros', logo: rogiro, r: 150 / 51 },
  { nombre: 'Logmetal', logo: logmetal, r: 340 / 160 },
  { nombre: 'Saldaña', logo: saldana, r: 500 / 160 },
  { nombre: 'Inducret', logo: inducret, r: 337 / 99 },
  { nombre: 'Prear', logo: prear, r: 569 / 160 },
]

// Alto que da a cada logo la misma área aproximada, con topes para los muy cuadrados o muy largos.
export function altoLogo(r, area, min, max) {
  return Math.round(Math.min(max, Math.max(min, Math.sqrt(area / r))))
}
