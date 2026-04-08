export function normalizeSiteUrl(siteUrl?: string) {
  const fallback = 'https://ibarra.dev'
  return (siteUrl || fallback).replace(/\/+$/, '')
}

export function resolveSiteUrl(env: NodeJS.ProcessEnv = process.env) {
  return normalizeSiteUrl(env.NUXT_SITE_URL || env.NUXT_PUBLIC_SITE_URL)
}

export function buildAbsoluteUrl(siteUrl: string, path = '/') {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)
  if (!path || path === '/') {
    return `${normalizedSiteUrl}/`
  }

  return `${normalizedSiteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
