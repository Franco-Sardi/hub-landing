# HUB Parques Industriales — Landing Page

## Descripción del Proyecto

Landing page para **HUB**, empresa desarrolladora de infraestructura industrial que proyecta 6 parques/naves industriales en distintas localidades de Argentina.

## Modelo de Negocio

HUB tiene dos públicos objetivo:

1. **Inversores** — Buscan rentabilidad. Retorno base del **8% anual en USD** (interés compuesto), respaldado por activos inmobiliarios industriales reales.
2. **Empresas** — Buscan espacios industriales para almacenamiento, logística y manufactura. Alquilan o compran fraccionamientos de espacio dentro de los parques.

## Stack Tecnológico

- **React + Vite** — setup rápido con HMR
- **Tailwind CSS v3** — utility-first styling
- **Recharts** — gráfico de área/línea para la calculadora ROI
- **Framer Motion** — animaciones de scroll y micro-interacciones
- **react-hook-form** — validación del formulario de contacto

## Correr el Proyecto

```bash
npm run dev       # servidor de desarrollo en localhost:5173
npm run build     # build de producción
npm run preview   # previsualizar el build
```

## Estructura de Carpetas

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Navegación fija con scroll effect
│   │   └── Footer.jsx       # Footer con links y contacto
│   ├── sections/
│   │   ├── Hero.jsx         # Hero fullscreen con CTAs
│   │   ├── Stats.jsx        # Barra de estadísticas con count-up
│   │   ├── About.jsx        # Quiénes somos + equipo
│   │   ├── Model.jsx        # Cómo funciona HUB (4 pasos)
│   │   ├── Projects.jsx     # Grid de 6 parques
│   │   ├── ForInvestors.jsx # Beneficios + calculadora ROI
│   │   ├── ForCompanies.jsx # Propuesta para empresas
│   │   └── Contact.jsx      # Formulario de contacto
│   └── ui/
│       ├── ROICalculator.jsx  # Calculadora interactiva con Recharts
│       └── ProjectCard.jsx    # Card individual de proyecto
└── data/
    └── projects.js            # Datos placeholder de los 6 parques
```

## Reemplazar Datos Placeholder

### Proyectos (`src/data/projects.js`)

Cada objeto en el array `projects` tiene:
- `name` — nombre del parque
- `location` — ciudad, provincia
- `area` — m² totales disponibles (string sin puntos)
- `units` — descripción de los módulos disponibles
- `status` — `'En desarrollo'` | `'Próximamente'` | `'Disponible'`
- `statusColor` — `'gold'` (activo) | `'steel'` (próximo)
- `description` — descripción breve del parque
- `features` — array de 4 características técnicas clave

El objeto `stats` tiene los números globales para la barra de estadísticas.

### Parámetros del ROI (`src/components/ui/ROICalculator.jsx`)

```js
const RATE = 0.08  // Tasa base anual (8% = 0.08)
const TERMS = [3, 5, 10]  // Plazos disponibles en años
```

Fórmula: interés compuesto → `V = P × (1 + r)^t`

### Contenido de Texto

Todo el texto está inline en los componentes JSX. Para cada sección, buscar el componente en `src/components/sections/` y editar directamente.

## Paleta de Colores

| Variable Tailwind | Hex | Uso |
|---|---|---|
| `hub-black` | `#0f1117` | Fondo primario |
| `hub-dark` | `#1a1f2e` | Fondo secundario |
| `hub-gold` | `#c9a84c` | Acento principal (inversores) |
| `hub-steel` | `#4a90d9` | Acento secundario (empresas) |
| `hub-muted` | `#a0aec0` | Texto secundario |

## Tipografía

- **Bebas Neue** (`font-display`) — headings, números grandes, labels en caps
- **Inter** (`font-body`) — cuerpo de texto, UI elements

Ambas fuentes se cargan desde Google Fonts en `index.html`.
