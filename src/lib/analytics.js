// Umami (stats.sbflows.com). El dato va en el NOMBRE del evento, nunca en propiedades:
// en Umami 3.2 las propiedades se guardan pero /event-data/values devuelve lista vacia
// siempre, asi que un umami.track('x', {...}) es un dato que no se puede leer nunca mas.
// Convenio: familia:detalle — el tablero de Grupo Rossi agrupa por familia.
export function track(evento) {
  // Parte del trafico llega con bloqueadores y script.js no carga: sin el ?. y el catch,
  // un "umami is not defined" adentro de un onClick rompe el boton para esa persona.
  try {
    window.umami?.track(evento)
  } catch {
    /* noop */
  }
}
