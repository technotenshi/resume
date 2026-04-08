import { resumeData } from './data/resume'
import { resolveSiteUrl } from './utils/site'

const fetchRemoteUrls = process.env.NUXT_LINK_CHECKER_REMOTE === '1'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-08',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: ['@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  site: {
    url: resolveSiteUrl(process.env),
    name: resumeData.profile.name,
    description: resumeData.profile.summary,
    defaultLocale: 'en',
    trailingSlash: false,
    identity: {
      type: 'Person',
      name: resumeData.profile.name,
      jobTitle: resumeData.profile.jobTitle,
      description: resumeData.profile.summary,
      sameAs: [resumeData.profile.linkedinUrl],
    },
  },
  ogImage: {
    enabled: true,
    zeroRuntime: true,
  },
  robots: {
    enabled: true,
  },
  schemaOrg: {
    enabled: true,
  },
  sitemap: {
    enabled: true,
    exclude: ['/confirmation'],
    zeroRuntime: true,
  },
  linkChecker: {
    enabled: true,
    runOnBuild: true,
    failOnError: true,
    fetchRemoteUrls,
    excludeLinks: [/^mailto:/, /^tel:/],
    report: {
      html: true,
      markdown: true,
      json: true,
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
