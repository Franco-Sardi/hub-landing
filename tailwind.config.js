/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hub: {
          // ── Backgrounds (deep blue-blacks) ────────────────────────────
          black:        '#05080f',   // Deepest — almost pure black with blue tint
          dark:         '#07101e',   // Primary section bg
          darker:       '#03050c',   // Deepest elements
          midnight:     '#0a1628',   // Cards, secondary panels
          navy:         '#0d2040',   // Tertiary depth
          // ── Tesla electric blue system ─────────────────────────────────
          tesla:        '#0d3fa5',   // Deep Tesla electric blue (fills, large elements)
          electric:     '#1e5cd4',   // Mid electric (borders, active states)
          bright:       '#4a87f5',   // Bright electric (readable accents, labels)
          // ── Primary accent (replaces gold — all blue now) ──────────────
          gold:         '#4a87f5',   // Readable electric blue
          'gold-light': '#6aa3ff',   // Hover / lighter
          'gold-dim':   '#1e5cd4',   // Deeper
          // ── Secondary blue (companies) ─────────────────────────────────
          steel:        '#3a78e8',   // Slightly different blue shade
          'steel-light':'#5a96f8',
          'steel-dim':  '#1a4fbd',
          // ── Subtle borders & UI ────────────────────────────────────────
          azure:        '#152a4e',   // Subtle border blue
          'azure-light':'#1e3a68',   // Slightly lighter border
          // ── Text ──────────────────────────────────────────────────────
          text:         '#ffffff',
          muted:        '#5a80a8',   // Blue-tinted secondary text
          subtle:       '#243650',   // Blue-tinted tertiary
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
