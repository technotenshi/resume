import { describe, expect, it } from 'vitest'

import { resumeData } from '../../data/resume'

describe('resume data', () => {
  it('keeps the primary homepage sections populated', () => {
    expect(resumeData.experience).toHaveLength(3)
    expect(resumeData.skills).toHaveLength(3)
    expect(resumeData.publications).toHaveLength(4)
    expect(resumeData.featuredClients).toHaveLength(4)
    expect(resumeData.logoWall.length).toBeGreaterThanOrEqual(5)
    expect(resumeData.testimonials.featured).toHaveLength(2)
    expect(resumeData.testimonials.carousel).toHaveLength(2)
    expect(resumeData.education).toHaveLength(3)
  })

  it('uses contact links that can be rendered directly into anchors', () => {
    for (const contact of resumeData.contacts) {
      expect(contact.href).toMatch(/^(mailto:|tel:|https?:\/\/)/)
    }
  })
})
