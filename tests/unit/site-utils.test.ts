import { describe, expect, it } from 'vitest'

import { buildAbsoluteUrl, normalizeSiteUrl } from '../../utils/site'

describe('site utilities', () => {
  it('normalizes trailing slashes', () => {
    expect(normalizeSiteUrl('https://resume.example.com/')).toBe('https://resume.example.com')
  })

  it('builds absolute URLs for canonical links and sitemap entries', () => {
    expect(buildAbsoluteUrl('https://resume.example.com', '/confirmation')).toBe('https://resume.example.com/confirmation')
    expect(buildAbsoluteUrl('https://resume.example.com', '/')).toBe('https://resume.example.com/')
  })
})
