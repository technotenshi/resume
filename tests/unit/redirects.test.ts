import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

describe('static redirects', () => {
  it('preserves the legacy html routes', () => {
    const redirectsFile = new URL('../../public/_redirects', import.meta.url)
    const redirects = readFileSync(redirectsFile, 'utf8')

    expect(redirects).toContain('/index.html /')
    expect(redirects).toContain('/confirmation.html /confirmation')
  })
})
