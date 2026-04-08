import { expect, test } from '@playwright/test'

test('homepage exposes the core resume sections', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Angel Ibarra/)
  await expect(page.getByRole('heading', { level: 1, name: 'Angel Ibarra' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Publications' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Send me an email' })).toBeVisible()

  await page.waitForFunction(() => Boolean((window as { jQuery?: unknown }).jQuery))
  await expect(page.locator('script[src="/legacy/scripts/script.js"]')).toHaveCount(1)
  await expect(page.locator('#testimonials3-1b-carousel .carousel-item.active')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://ibarra.dev/')
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await expect.poll(async () => {
    return page.locator('script[type="application/ld+json"]').first().textContent()
  }).toContain('Person')

  await page.locator('#testimonials3-1b .carousel-control-next').click()
  await expect(page.locator('#testimonials3-1b-carousel .carousel-item.active .user_name')).toContainText('Arjun Mantri')
})

test('confirmation page is reachable', async ({ page }) => {
  await page.goto('/confirmation')

  await expect(page).toHaveTitle(/Meeting confirmation/)
  await expect(page.getByRole('heading', { level: 1, name: 'Thanks for scheduling!' })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://ibarra.dev/confirmation')
  const resumeLink = page.getByRole('link', { name: 'Take a look to my resume' })
  await expect(resumeLink).toBeVisible()

  await Promise.all([
    page.waitForURL((url) => url.pathname === '/'),
    resumeLink.click(),
  ])

  await expect(page.getByRole('heading', { level: 1, name: 'Angel Ibarra' })).toBeVisible()
})

test('module-generated crawler endpoints reflect the public route policy', async ({ page }) => {
  const robotsResponse = await page.request.get('/robots.txt')
  expect(robotsResponse.ok()).toBeTruthy()
  const robotsTxt = await robotsResponse.text()
  expect(robotsTxt).toContain('Sitemap: https://ibarra.dev/sitemap.xml')

  const sitemapResponse = await page.request.get('/sitemap.xml')
  expect(sitemapResponse.ok()).toBeTruthy()
  const sitemapXml = await sitemapResponse.text()

  expect(sitemapXml).toContain('<loc>https://ibarra.dev/</loc>')
  expect(sitemapXml).not.toContain('/confirmation')
})
