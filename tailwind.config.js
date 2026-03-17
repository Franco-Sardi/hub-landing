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
          black: '#0f1117',
          dark: '#1a1f2e',
          darker: '#141820',
          gold: '#c9a84c',
          'gold-light': '#e2c06a',
          'gold-dim': '#8a6e2f',
          steel: '#4a90d9',
          'steel-light': '#6aaae8',
          'steel-dim': '#2d5a8e',
          text: '#ffffff',
          muted: '#a0aec0',
          subtle: '#4a5568',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'marquee':    'marquee 22s linear infinite',
        'marquee2':   'marquee2 22s linear infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0)' },
          '50%':       { boxShadow: '0 0 30px 10px rgba(201, 168, 76, 0.15)' },
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
          '0%, 100%': { transform: 'translateY(0px)'  },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

