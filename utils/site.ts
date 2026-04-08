export function normalizeSiteUrl(siteUrl?: string) {
  const fallback = 'https://example.com'
  return (siteUrl || fallback).replace(/\/+$/, '')
}

export function buildAbsoluteUrl(siteUrl: string, path = '/') {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)
  if (!path || path === '/') {
    return `${normalizedSiteUrl}/`
  }

  return `${normalizedSiteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
