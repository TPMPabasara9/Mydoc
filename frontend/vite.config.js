import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss({
    defineConfig: {
      theme: {
        extend: {
        colors: {
          primary: 'blue-500',
        },
        },
      },
      plugins: [
        function ({ addUtilities }) {
        const newUtilities = {
          '.auto-col': {
          'grid-auto-columns': 'minmax(0, 1fr)',
          },
        }
        addUtilities(newUtilities, ['responsive', 'hover'])
        },
      ],
      
    }
  })],


})
