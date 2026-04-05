/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hub: {
          // ── Backgrounds (brochure dark blue) ────────────────────────────
          black:        '#0e1a28',   // Deepest background
          dark:         '#152436',   // Primary section bg (brochure base)
          darker:       '#0b1520',   // Deepest elements
          midnight:     '#1a2d42',   // Cards, secondary panels
          navy:         '#1e3550',   // Tertiary depth
          // ── Slate / steel system ───────────────────────────────────────
          slate:        '#1e3550',   // Panel backgrounds
          // ── Accent blue system ─────────────────────────────────────────
          tesla:        '#0d3fa5',   // Deep electric blue (fills, large elements)
          electric:     '#1e5cd4',   // Mid electric (borders, active states)
          bright:       '#4a87f5',   // Bright electric (readable accents, labels)
          // ── Primary accent ─────────────────────────────────────────────
          gold:         '#4a87f5',   // Readable electric blue
          'gold-light': '#6aa3ff',   // Hover / lighter
          'gold-dim':   '#1e5cd4',   // Deeper
          // ── Secondary blue (companies) ─────────────────────────────────
          steel:        '#3a78e8',   // Slightly different blue shade
          'steel-light':'#5a96f8',
          'steel-dim':  '#1a4fbd',
          // ── Subtle borders & UI ────────────────────────────────────────
          azure:        '#1e3550',   // Subtle border blue
          'azure-light':'#2a4565',   // Slightly lighter border
          // ── Text (brochure grays) ──────────────────────────────────────
          text:         '#e8e9ea',   // Primary text — near white
          muted:        '#b7b9ba',   // Secondary text (brochure gray)
          subtle:       '#525659',   // Tertiary text (brochure dark gray)

          // ── Paper / carta antigua system ───────────────────────────────
          paper:        '#f0ebe0',   // Fondo principal — papel cálido (Opción A)
          parchment:    '#e4ddd0',   // Fondo secundario — pergamino
          linen:        '#d4c8a0',   // Borders crema
          sand:         '#c4b888',   // Borders más marcados, hover

          // ── Ink — texto oscuro sobre papel ────────────────────────────
          ink:          '#1c2535',   // Navy oscuro del brochure (texto principal)
          sepia:        '#3d2e18',   // Marrón oscuro tinta alternativo
          'ink-muted':  '#4a5568',   // Texto secundario sobre papel
          'ink-faint':  '#7a8094',   // Texto muy sutil sobre papel
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body:    ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-blue': 'pulseBlue 3s ease-in-out infinite',
        'marquee':    'marquee 22s linear infinite',
        'marquee2':   'marquee2 22s linear infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74, 135, 245, 0)' },
          '50%':       { boxShadow: '0 0 30px 10px rgba(74, 135, 245, 0.15)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
