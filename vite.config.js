import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: false
      },
      includeAssets: ['bible-svgrepo-com.png', 'bible-svgrepo-com.svg'],
      manifest: {
        name: 'Versos Biblicos',
        short_name: 'VB',
        description: 'Explore a Bíblia Online com versos diários, busca por capítulos e narração dos capítulos. Aprofunde-se na bíblia a qualquer momento, de qualquer lugar...',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'bible-svgrepo-com.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'bible-svgrepo-com.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        display: "fullscreen"
      }
     })
  ],
  test: {
    environment: 'jsdom'
  }
})
