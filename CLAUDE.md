# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Commands

```bash
docker compose run --rm app yarn install
docker compose up dev
docker compose run --rm app yarn build
docker compose up preview
docker compose run --rm app yarn typecheck
docker compose run --rm app yarn test:unit
docker compose run --rm app yarn test:e2e
docker compose run --rm app yarn test
```

Static server:

```bash
docker compose up nginx
```

## Stack

- Nuxt 4 with Vue 3
- Static prerendering with `nuxt generate`
- Typed content in `data/resume.ts`
- Global styling in `assets/css/main.css`
- Static host deployment from `.output/public`

## Architecture

- `pages/index.vue` and `pages/confirmation.vue` are the only public pages
- `components/` contains reusable section UI such as banners and the testimonial carousel
- `@nuxtjs/seo` generates `robots.txt`, `sitemap.xml`, Schema.org, OG images, and default canonical metadata during `docker compose run --rm app yarn build`
- `docker compose up preview` serves the generated `.output/public` directory directly for local verification
- `public/_redirects` preserves `/index.html` and `/confirmation.html` for static hosting
- `assets/images/` contains imported image assets referenced directly from TypeScript data

## Testing

- Unit tests live in `tests/unit/`
- Playwright smoke tests live in `tests/e2e/`
- `docker compose run --rm app yarn test:e2e` builds the site and runs Playwright against the containerized preview server

## Deployment notes

- Set `NUXT_SITE_URL` in CI and hosting so canonical URLs, OG images, the sitemap, and `robots.txt` use the correct public domain. `NUXT_PUBLIC_SITE_URL` is still supported as a fallback.
- Cloudflare Pages should publish `.output/public`

## Git workflow

- Do not push directly to `main`
- Keep action pins intact in workflow files
- Prefer updating docs and tests alongside structural app changes so the repo never documents the old stack
