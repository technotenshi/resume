# Resume Site — Nuxt 4 Static Build

This repository now ships a typed, component-based resume site built with Nuxt 4 and prerendered for static hosting.

## Stack
- Nuxt 4 with Vue 3
- Static generation via `nuxt generate`
- Typed local content in `data/resume.ts`
- Cloudflare Pages-ready redirects, `robots.txt`, and `sitemap.xml`
- Vitest for unit checks and Playwright for route smoke tests

## Requirements
- Node.js 20.19+
- Yarn v4

## Local development
```bash
yarn install
yarn dev
```

The dev server runs on `http://localhost:3000`.

## Scripts
```bash
yarn dev         # Nuxt dev server
yarn build       # Static prerender to .output/public
yarn preview     # Preview the generated site locally
yarn typecheck   # Nuxt + vue-tsc type checks
yarn test:unit   # Vitest unit tests
yarn test:e2e    # Build and run Playwright smoke tests
yarn test        # Unit + e2e
```

## Project structure
```text
assets/
  css/
  images/
components/
data/
layouts/
pages/
public/
server/routes/
tests/
```

- `pages/` contains the public routes: `/` and `/confirmation`
- `data/resume.ts` is the content source of truth
- `server/routes/` contains prerendered `robots.txt` and `sitemap.xml`
- `public/_redirects` preserves `/index.html` and `/confirmation.html`

## Docker
```bash
docker compose up dev
docker compose up preview
```

Use `docker compose up nginx` after a build if you want to serve `.output/public` as plain static files.

## Deployment
Deploy `.output/public` to Cloudflare Pages or any static host. Set `NUXT_PUBLIC_SITE_URL` in the deployment environment so canonical links, `robots.txt`, and the sitemap use the correct domain.
