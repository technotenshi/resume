import { buildAbsoluteUrl, normalizeSiteUrl } from '../../utils/site'

export default defineEventHandler((event) => {
  const siteUrl = normalizeSiteUrl(useRuntimeConfig(event).public.siteUrl)

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${buildAbsoluteUrl(siteUrl, '/sitemap.xml')}`,
  ].join('\n')
})
