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
          // ══════════════════════════════════════════════════════════════════
          // PALETA OFICIAL · Manual de Marca HUB 2026
          // ══════════════════════════════════════════════════════════════════

          // ── Primario: PANTONE 303 C ──────────────────────────────────────
          ink:          '#022A3A',   // Azul navy oficial — color insignia
          'ink-deep':   '#011823',   // Variante más oscura (para fondos extremos)
          'ink-soft':   '#0a3848',   // Variante algo más clara (hovers/estados)

          // ── Secundario: PANTONE 877 C ────────────────────────────────────
          silver:       '#C7C8CA',   // Gris claro metálico — texto sobre navy
          'silver-soft':'#E5E6E8',
          'silver-dim': '#A8A9AD',

          // ── Escala de grises oficial ─────────────────────────────────────
          '5415':       '#3D4450',   // Gris azulado oscuro
          '407':        '#87888A',   // Gris medio
          '427':        '#A8A9AD',   // Gris claro
          'cool-gray':  '#C5C6C8',   // Cool Gray 3
          charcoal:     '#1A1A1A',   // Pantone Black aprox

          // ══════════════════════════════════════════════════════════════════
          // ALIASES — Mantienen compatibilidad con el código existente.
          // Todos apuntan a la paleta oficial. Migrar gradualmente.
          // ══════════════════════════════════════════════════════════════════
          black:        '#011823',
          dark:         '#022A3A',
          darker:       '#011823',
          midnight:     '#0a2a3a',
          navy:         '#022A3A',
          slate:        '#0a3848',
          tesla:        '#022A3A',
          electric:     '#C7C8CA',
          bright:       '#E5E6E8',
          gold:         '#C7C8CA',
          'gold-light': '#E5E6E8',
          'gold-dim':   '#87888A',
          steel:        '#87888A',
          'steel-light':'#A8A9AD',
          'steel-dim':  '#3D4450',
          azure:        '#0a3848',
          'azure-light':'#3D4450',
          text:         '#C7C8CA',
          muted:        '#87888A',
          subtle:       '#525659',

          // ── Papel / fondos claros ────────────────────────────────────────
          paper:        '#F5F5F6',
          parchment:    '#EAEAEB',
          linen:        '#C7C8CA',
          sand:         '#A8A9AD',
          sepia:        '#022A3A',
          'ink-muted':  '#3D4450',
          'ink-faint':  '#7A8086',
        }
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        // Tipografías oficiales del manual de marca (usando Google Fonts como
        // alternativas libres visualmente cercanas a las licenciadas).
        //   Trade Gothic LT Std Bold Extended → Archivo (wide geometric sans)
        //   Roboto / Roboto Condensed           → Roboto (idéntica, Google)
        //   PP Neue Montreal                    → Space Grotesk (sustituto)
        display:   ['"Archivo"', '"Trade Gothic LT Std"', 'sans-serif'],
        body:      ['"Roboto"', 'sans-serif'],
        condensed: ['"Roboto Condensed"', '"Roboto"', 'sans-serif'],
        accent:    ['"Space Grotesk"', '"PP Neue Montreal"', 'sans-serif'],
      },
      animation: {
        'pulse-blue': 'pulseBlue 3s ease-in-out infinite',
        'marquee':    'marquee 22s linear infinite',
        'marquee2':   'marquee2 22s linear infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(2, 42, 58, 0)' },
          '50%':       { boxShadow: '0 0 30px 10px rgba(2, 42, 58, 0.12)' },
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
