// Cálculo del simulador de inversores (Simulador.jsx).
// Modelo: 1 cuotaparte = 1 m² de infraestructura. Durante la obra el capital recibe un interés
// anual; en operación cobra el alquiler de sus m²; al final del horizonte la cuotaparte vale lo
// que el usuario supone. Valores iniciales: brochures 2026 de HUB (cuotaparte USD 780, 8 % en
// obra, 10–12 % esperado en operación) y la maqueta de inversion.html (USD 7/m², final USD 1.050).
// Todo es editable: el resultado es del supuesto, no una promesa.
export function calcular(v) {
  const cuotas = v.capital / Math.max(1, v.cuota)
  const obra = Math.min(v.obraAnios, v.horizonte)
  const ingresoObra = v.capital * (v.tasaObra / 100)
  const ingresoOperacion = cuotas * v.alquiler * 12
  const anios = []
  let hub = 0
  for (let t = 1; t <= v.horizonte; t++) {
    const anual = t <= obra ? ingresoObra : ingresoOperacion
    hub += anual
    anios.push({ t, enObra: t <= obra, anual, hub })
  }
  const salida = cuotas * v.cuotaFinal
  return {
    cuotas, ingresoObra, ingresoOperacion, salida, anios,
    rentaOperacion: v.capital > 0 ? (ingresoOperacion / v.capital) * 100 : 0,
    totalHub: hub + salida,
    cobradoHub: hub,
    // Primer año en que lo cobrado (sin la salida) iguala el capital; null si no llega.
    recupero: anios.find((a) => a.hub >= v.capital && v.capital > 0)?.t ?? null,
  }
}
