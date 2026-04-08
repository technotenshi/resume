# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Commands

```bash
yarn dev
yarn build
yarn preview
yarn typecheck
yarn test:unit
yarn test:e2e
yarn test
```

Docker entrypoints:

```bash
docker compose up dev
docker compose up preview
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
- `server/routes/robots.txt.ts` and `server/routes/sitemap.xml.ts` are prerendered during `yarn build`
- `public/_redirects` preserves `/index.html` and `/confirmation.html` for static hosting
- `assets/images/` contains imported image assets referenced directly from TypeScript data

## Testing

- Unit tests live in `tests/unit/`
- Playwright smoke tests live in `tests/e2e/`
- `yarn test:e2e` builds the site and runs Playwright against `yarn preview`

## Deployment notes

- Set `NUXT_PUBLIC_SITE_URL` in CI and hosting so canonical URLs, the sitemap, and `robots.txt` use the correct public domain
- Cloudflare Pages should publish `.output/public`

## Git workflow

- Do not push directly to `main`
- Keep action pins intact in workflow files
- Prefer updating docs and tests alongside structural app changes so the repo never documents the old stack
