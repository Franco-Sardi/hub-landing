import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // El simulador del área privada (sin aprobar) nunca entra en el build de producción de Vercel,
  // aunque VITE_DEMO_INVERSORES quede puesta ahí por error: solo dev y previews.
  define: process.env.VERCEL_ENV === 'production'
    ? { 'import.meta.env.VITE_DEMO_INVERSORES': JSON.stringify('') }
    : {},
  build: {
    rollupOptions: {
      output: {
        // Vendors en chunks propios: cambian mucho menos que el codigo del sitio,
        // asi que sobreviven a los deploys en la cache del visitante.
        // Vite 8 (rolldown) exige la forma de funcion, no el objeto.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react'
        },
      },
    },
  },
})
