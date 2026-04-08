# Resume Site — Nuxt 4 Static Build

This repository is a Nuxt 4 static resume site that preserves the original Mobirise look while moving generation, routing, and SEO into Nuxt.

## Stack
- Nuxt 4 with Vue 3
- Static generation via `nuxt generate`
- Typed local content in `data/resume.ts`
- Legacy Mobirise and Bootstrap assets served from `public/legacy/`
- Nuxt SEO-managed canonical tags, OG images, `robots.txt`, and `sitemap.xml`
- Vitest for unit checks and Playwright for route smoke tests

## Requirements
- Docker Compose
- GNU Make optional, for shorter local commands

## Docker workflow
```bash
make install
make dev
```

The app runs on `http://localhost:3000`. Dependencies live in Docker-managed volumes so native modules stay Linux-only and do not pollute the host checkout.

## Common commands
```bash
make build        # Static prerender to .output/public
make preview      # Build and serve .output/public on port 3000
make typecheck    # Nuxt + vue-tsc type checks
make test-unit    # Vitest unit tests
make test-e2e     # Build and test against the generated preview server
make test         # Full test suite
make nginx        # Serve .output/public with nginx on port 8030
```

Builds fail on broken internal links. To include remote HTTP(S) link checks, run commands with `NUXT_LINK_CHECKER_REMOTE=1`.

## Project structure
```text
assets/
  css/
components/
data/
layouts/
pages/
public/
  legacy/
tests/
```

- `pages/` contains the public routes: `/` and `/confirmation`
- `data/resume.ts` is the content source of truth
- `public/legacy/` holds the original CSS, scripts, fonts, and image assets
- `@nuxtjs/seo` generates canonical metadata, `robots.txt`, `sitemap.xml`, Schema.org, and OG images
- `public/_redirects` preserves `/index.html` and `/confirmation.html`

## Deployment
Deploy `.output/public` to Cloudflare Pages or any static host. The default canonical site URL is `https://ibarra.dev`; override it with `NUXT_SITE_URL` in deployment if needed. `NUXT_PUBLIC_SITE_URL` remains a fallback for compatibility.

Run `make help` to list the remaining maintenance targets.
