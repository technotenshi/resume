# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Commands

Use `make <target>` (wraps docker compose):

```bash
make install      # install deps
make dev          # dev server on port 3000
make build        # generate static site to .output/public
make preview      # build + serve .output/public on port 3000
make typecheck
make test-unit
make test-e2e
make test
make ps / logs / stop / down
```

Never use `docker exec` to run commands — always use `docker compose run --rm app <cmd>`.

Raw docker compose equivalents also work if needed:

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
make nginx        # serves .output/public via nginx on port 8030
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
- `public/legacy/` holds original Mobirise assets: `styles/`, `scripts/`, `fonts/`, `images/`
- `plugins/legacy-runtime.client.ts` loads Mobirise JS (jQuery, Bootstrap, etc.) sequentially client-side after Nuxt is ready
- `OgImage/Resume.satori.vue` is the Satori-based OG image template
- `utils/site.ts` resolves `NUXT_SITE_URL` / `NUXT_PUBLIC_SITE_URL` for canonical URLs

## Testing

- Unit tests live in `tests/unit/`
- Playwright smoke tests live in `tests/e2e/`
- `docker compose run --rm app yarn test:e2e` builds the site and runs Playwright against the containerized preview server

## Deployment notes

- Set `NUXT_SITE_URL` in CI and hosting so canonical URLs, OG images, the sitemap, and `robots.txt` use the correct public domain. `NUXT_PUBLIC_SITE_URL` is still supported as a fallback.
- Cloudflare Pages should publish `.output/public`
- Set `NUXT_LINK_CHECKER_REMOTE=1` to enable remote HTTP(S) link checks during build (off by default)
- Default canonical domain is `https://ibarra.dev`

## Git workflow

- Do not push directly to `main`
- Keep action pins intact in workflow files
- Prefer updating docs and tests alongside structural app changes so the repo never documents the old stack
- When merging multiple dependency PRs, resolve `yarn.lock` conflicts with `git checkout --theirs yarn.lock && docker compose run --rm app yarn install` — never merge it manually
- After any `yarn.lock` change (merge or conflict resolution), run `make install` before running tests — containers don't auto-reflect updated lockfiles

## Claude Code automations

- `/verify-build` — typecheck + unit tests + build in sequence
- `/merge-dep-prs` — batch-merge dependency PRs, handles yarn.lock regeneration
- `/update-resume` — guided edits to `data/resume.ts` with post-edit validation
- `/make-task <target>` — run any Makefile target
