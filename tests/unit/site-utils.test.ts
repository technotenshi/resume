import { describe, expect, it } from 'vitest'

import { buildAbsoluteUrl, normalizeSiteUrl, resolveSiteUrl } from '../../utils/site'

describe('site utilities', () => {
  it('falls back to the production domain when no env var is set', () => {
    expect(normalizeSiteUrl()).toBe('https://ibarra.dev')
  })

  it('normalizes trailing slashes', () => {
    expect(normalizeSiteUrl('https://resume.example.com/')).toBe('https://resume.example.com')
  })

  it('builds absolute URLs for canonical links and sitemap entries', () => {
    expect(buildAbsoluteUrl('https://resume.example.com', '/confirmation')).toBe('https://resume.example.com/confirmation')
    expect(buildAbsoluteUrl('https://resume.example.com', '/')).toBe('https://resume.example.com/')
  })

  it('prefers NUXT_SITE_URL over the legacy public site url variable', () => {
    expect(resolveSiteUrl({
      NUXT_SITE_URL: 'https://primary.example.com/',
      NUXT_PUBLIC_SITE_URL: 'https://fallback.example.com/',
    })).toBe('https://primary.example.com')

    expect(resolveSiteUrl({
      NUXT_PUBLIC_SITE_URL: 'https://fallback.example.com/',
    })).toBe('https://fallback.example.com')
  })
})
