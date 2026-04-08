# Repository Guidelines

## Project Structure & Module Organization
This repository is a Nuxt 4 static site that preserves the original Mobirise presentation. Public routes live in `pages/`, reusable UI lives in `components/`, and resume content is centralized in `data/resume.ts`. Legacy assets live under `public/legacy/`: `styles/`, `scripts/`, `fonts/`, and `images/`. Keep Nuxt-specific compatibility CSS in `assets/css/main.css`. Static host files such as `_redirects` and icons live in `public/`. SEO output is configured in `nuxt.config.ts`. Automated checks live in `tests/unit/` and `tests/e2e/`.

## Build, Test, and Development Commands
Use Docker Compose for all local execution. The app services run on Node 24 with Yarn v4, and the checked-in `Makefile` provides the preferred shortcuts.

- `make install` installs dependencies into Docker-managed volumes.
- `make dev` runs the Nuxt dev server on port `3000`.
- `make build` prerenders the static site into `.output/public`.
- `make preview` builds and serves `.output/public` locally on port `3000`.
- `make typecheck` runs Nuxt and `vue-tsc` checks.
- `make test-unit` runs Vitest checks.
- `make test-e2e` builds the app and runs Playwright smoke tests.
- `make test` runs the full automated suite.

## Coding Style & Naming Conventions
Follow the existing two-space indentation and prefer TypeScript in `script setup` blocks. Keep content changes in `data/resume.ts` instead of hardcoding copy into templates. Preserve the original Mobirise section/class structure when editing `pages/index.vue` and `pages/confirmation.vue`; visual fidelity is intentional, so avoid replacing legacy markup with a redesign. Use PascalCase for Vue components and descriptive test filenames such as `tests/unit/site-utils.test.ts`.

## Testing Guidelines
Add unit coverage for utilities and route-support files under `tests/unit/`. Add Playwright smoke coverage for user-facing routes under `tests/e2e/`; they run against `yarn preview`. Before opening a PR, run `make typecheck` and `make test`, then verify both `/` and `/confirmation` still prerender correctly with the legacy CSS and scripts loaded from `/legacy/`. Builds should fail on internal link issues only; set `NUXT_LINK_CHECKER_REMOTE=1` when you explicitly want remote HTTP(S) link checks. The default canonical domain is `https://ibarra.dev`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Update CLAUDE.md...`, `Fix CodeQL alert...`, and `Add Claude Code GitHub Workflow`. Follow that pattern, and append the PR number when appropriate. Do not push directly to `main`; open a PR instead. Rebase onto the latest `main`, describe the user-visible change, link related issues, and attach screenshots for any HTML or styling updates.
