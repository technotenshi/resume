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
- Prefer updating docs and tests alongside structural app changes so the repo never documents the old stack
- When merging multiple dependency PRs, resolve `yarn.lock` conflicts with `git checkout --theirs yarn.lock && docker compose run --rm app yarn install` — never merge it manually
- After any `yarn.lock` change (merge or conflict resolution), run `make install` before running tests — containers don't auto-reflect updated lockfiles
- A clean (conflict-free) `yarn.lock` auto-merge can still silently drop a version bump — after merging, grep `yarn.lock` for each target package's resolved version, don't trust "no conflict" alone
- `yarn up -R <pkg>` bumps transitive deps but rejects version ranges (`pkg@^1.2.3` errors) — pass the bare name and it resolves to the latest satisfying existing tree ranges
- `yarn up <pkg>` (non-recursive, direct deps) tightens the `package.json` range to the resolved version as a side effect — revert the range manually if the source PR was lockfile-only
- Dependency PRs merged via a combined/squash-merged branch aren't auto-closed by dependabot/renovate — close each as superseded manually, verifying against `main` first
- After merging, the remote branch is usually already auto-deleted by GitHub — `git push origin --delete <branch>` failing with "remote ref does not exist" is expected

## Gotchas

- **PostToolUse hooks run automatically**: editing `.vue`/`.ts` files triggers typecheck; editing `tests/unit/` triggers unit tests. Output appears inline — don't re-run manually.
- **OG image `400 Invalid island request hash`**: two causes — (1) stale Nuxt prerender cache: fix with `docker compose run --rm app sh -c 'rm -rf node_modules/.cache/nuxt && yarn build'`; (2) version mismatch between nuxt 4.4.x and nuxt-og-image < 6.5.1: fix by adding `"nuxt-og-image": "^6.5.1"` to `resolutions` in `package.json`.
- **Codacy inline suppression is not supported**: to suppress a finding, use `.codacy.yml` with global `exclude_paths`. Inline comments like `# codacy-disable-next-line` have no effect.
- **TypeScript v7 breaks `vue-tsc`**: `vue-tsc@3.3.8` (latest as of writing) still requires `typescript/lib/tsc`, which TS7's `exports` map no longer exposes (`ERR_PACKAGE_PATH_NOT_EXPORTED`). Hold `typescript` at `^6.x` until vue-tsc ships TS7 support.
- **Typecheck is intentionally non-blocking in CI**: `node.js.yml`'s typecheck step runs with `continue-on-error` — a failing `yarn typecheck` no longer fails the `build` job or blocks merge. Static site generation succeeding matters more than typecheck passing. Green CI does not imply typecheck passed — check the step output directly.
- **Duplicate yarn.lock resolutions**: the same package can have two resolutions (old vulnerable + new patched) coexisting because different requesters pin different ranges. Plain `yarn install` won't consolidate them — add a `resolutions` override in `package.json` (see existing `minimatch`/`nuxt-og-image` entries) to force one version.
- **Dependabot vulnerability alerts** aren't visible via `gh pr` commands — use `gh api repos/<owner>/<repo>/dependabot/alerts`. Use `yarn why <pkg>` to trace which top-level dep pulls in a vulnerable transitive package before choosing between `yarn up -R` and a `resolutions` override.

## Claude Code automations

- `/verify-build` — typecheck + unit tests + build in sequence
- `/merge-dep-prs` — batch-merge dependency PRs, handles yarn.lock regeneration
- `/update-resume` — guided edits to `data/resume.ts` with post-edit validation
- `/make-task <target>` — run any Makefile target

## Cross-tool working agreements (added 2026-08-05)

`~/HARNESS.md` is the canonical agreement for all AI tools (Hermes, Claude Code, ChatGPT/Codex).
- `docs/DECISIONS.md` is this repo's decision log — read before planning, append when a decision is made or reversed.
- Infra-mutating actions need explicit approval in the current session.
- Never claim success without real verification.
