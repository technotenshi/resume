# Repository Guidelines

## Project Structure & Module Organization
This repository is a Nuxt 4 static site that preserves the original Mobirise presentation. Public routes live in `pages/`, reusable Vue UI lives in `components/`, and resume content is centralized in `data/resume.ts`. Legacy visual assets now live under `public/legacy/`: `styles/` contains the restored Mobirise and Bootstrap CSS, `fonts/` contains the icon font, and `images/` contains the background and logo assets used by the original design. Keep Nuxt-specific compatibility CSS in `assets/css/main.css`. Static host files such as `_redirects` and icons live in `public/`, while prerendered SEO endpoints live in `server/routes/`. Automated checks live in `tests/unit/` and `tests/e2e/`.

## Build, Test, and Development Commands
Use Node.js 20.19+ and Yarn v4.

- `yarn install` installs dependencies.
- `yarn dev` runs the Nuxt dev server on port `3000`.
- `yarn build` prerenders the static site into `.output/public`.
- `yarn preview` serves the built output locally.
- `yarn typecheck` runs Nuxt and `vue-tsc` checks.
- `yarn test:unit` runs Vitest checks.
- `yarn test:e2e` builds the app and runs Playwright smoke tests.

For containers, use `docker compose up dev`, `docker compose up preview`, or `docker compose up nginx` after a build.

## Coding Style & Naming Conventions
Follow the existing two-space indentation and prefer TypeScript in `script setup` blocks. Keep content changes in `data/resume.ts` instead of hardcoding copy into templates. Preserve the original Mobirise section/class structure when editing `pages/index.vue` and `pages/confirmation.vue`; visual fidelity is intentional, so avoid replacing legacy markup with a redesign. Use PascalCase for Vue components and descriptive test filenames such as `tests/unit/site-utils.test.ts`.

## Testing Guidelines
Add unit coverage for utilities, content invariants, or route-support files under `tests/unit/`. Add Playwright smoke coverage for user-facing routes under `tests/e2e/`. Before opening a PR, run `yarn typecheck && yarn test` and verify both `/` and `/confirmation` still prerender correctly with the legacy CSS loaded from `/legacy/styles/`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Update CLAUDE.md...`, `Fix CodeQL alert...`, and `Add Claude Code GitHub Workflow`. Follow that pattern, and append the PR number when appropriate. Do not push directly to `main`; open a PR instead. Rebase onto the latest `main`, describe the user-visible change, link related issues, and attach screenshots for any HTML or styling updates.
