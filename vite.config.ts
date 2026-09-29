import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/admin/',
  plugins: [tailwindcss(), react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    host: true,
    port: 3103,
    allowedHosts: ['terapiadelcaos.paulollanos.dev', 'localhost'],
    proxy: {
      '/api': 'http://localhost:3102',
      '/auth': 'http://localhost:3102',
    },
  },
  preview: {
    host: true,
    port: 3103,
    allowedHosts: ['terapiadelcaos.paulollanos.dev', 'localhost'],
  },
})
