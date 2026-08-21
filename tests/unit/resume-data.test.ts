import { describe, expect, it } from 'vitest'

import { resumeData } from '../../data/resume'

describe('resume data', () => {
  it('keeps the primary homepage sections populated', () => {
    expect(resumeData.experience).toHaveLength(5)
    expect(resumeData.skills).toHaveLength(3)
    expect(resumeData.publications).toHaveLength(4)
    expect(resumeData.featuredClients).toHaveLength(7)
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

  it('uses experience IDs that do not collide with static page sections', () => {
    const staticSectionIds = ['content5-r']

    for (const experience of resumeData.experience) {
      expect(staticSectionIds).not.toContain(experience.id)
    }
  })

  it('positions Java and Spring Boot as a primary backend stack', () => {
    expect(resumeData.skills[0]?.description).toMatch(/^Java \(Spring Framework, Spring Boot\)/)

    const americanFamily = resumeData.experience.find((experience) => experience.heading.includes('American Family'))
    const carrentals = resumeData.experience.find((experience) => experience.heading.includes('Carrentals.com'))

    expect(americanFamily?.body).toContain('Java/Spring Boot as the primary backend stack')
    expect(carrentals?.body).toContain('Java/Spring Boot as the primary backend stack')
  })
})
