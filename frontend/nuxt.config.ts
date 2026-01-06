// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  nitro: {
    ignore: ['**/src/**']
  },
  vite: {
    server: {
      host: process.env.NUXT_HOST || '0.0.0.0',
      port: parseInt(process.env.NUXT_PORT || '3000'),
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true' || false,
        interval: 1000,
      },
      hmr: {
        clientPort: 3000,
      },
    }
  },
  app: {
    head: {
      title: 'Castel Agency',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Castel Agency - Votre agence digitale à Avignon. Créativité, performance et proximité.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      // Supporte DIRECTUS_URL (pour Docker) et NUXT_PUBLIC_DIRECTUS_URL (pour local)
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://localhost:8055',
    }
  }
})

