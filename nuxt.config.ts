export default defineNuxtConfig({
  compatibilityDate: '2026-04-08',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: '/legacy/styles/mobirise2.css' },
        { rel: 'stylesheet', href: '/legacy/styles/tether.min.css' },
        { rel: 'stylesheet', href: '/legacy/styles/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/legacy/styles/bootstrap-grid.min.css' },
        { rel: 'stylesheet', href: '/legacy/styles/bootstrap-reboot.min.css' },
        { rel: 'stylesheet', href: '/legacy/styles/style.css' },
        { rel: 'preload', href: '/legacy/styles/mbr-additional.css', as: 'style' },
        { rel: 'stylesheet', href: '/legacy/styles/mbr-additional.css', type: 'text/css' },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/confirmation', '/robots.txt', '/sitemap.xml'],
    },
  },
})
