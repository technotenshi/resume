import { buildAbsoluteUrl, normalizeSiteUrl } from '../../utils/site'

export default defineEventHandler((event) => {
  const siteUrl = normalizeSiteUrl(useRuntimeConfig(event).public.siteUrl)
  const routes = ['/', '/confirmation']
    .map((route) => `  <url><loc>${buildAbsoluteUrl(siteUrl, route)}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    routes,
    '</urlset>',
  ].join('\n')
})
