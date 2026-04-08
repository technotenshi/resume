import { defineNuxtPlugin, onNuxtReady } from '#app'

const legacyScripts = [
  '/legacy/scripts/jquery.min.js',
  '/legacy/scripts/popper.min.js',
  '/legacy/scripts/tether.min.js',
  '/legacy/scripts/bootstrap.min.js',
  '/legacy/scripts/smooth-scroll.js',
  '/legacy/scripts/jarallax.min.js',
  '/legacy/scripts/bootstrap-carousel-swipe.js',
  '/legacy/scripts/mbr-testimonials-slider.js',
  '/legacy/scripts/script.js',
]

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve()
        return
      }

      existing.addEventListener('load', () => {
        resolve()
      }, { once: true })
      existing.addEventListener('error', () => {
        reject(new Error(`Failed to load ${src}`))
      }, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = false
    script.dataset.legacyRuntime = 'true'
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => {
      reject(new Error(`Failed to load ${src}`))
    }, { once: true })
    document.body.appendChild(script)
  })
}

export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    for (const src of legacyScripts) {
      await loadScript(src)
    }
  })
})
