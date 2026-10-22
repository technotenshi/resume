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
- `make nginx` serves `.output/public` with nginx on port `8030`.
- `make ps`, `make logs`, `make stop`, and `make down` manage the Compose services.

Never use `docker exec` to run commands. Use `docker compose run --rm app <cmd>`. The raw equivalents of the targets above are `docker compose run --rm app yarn install|build|typecheck|test:unit|test:e2e|test`, plus `docker compose up dev` and `docker compose up preview`.

## Architecture Notes
- Stack: Nuxt 4 with Vue 3, static prerendering with `nuxt generate`, typed content in `data/resume.ts`, global styling in `assets/css/main.css`, deployed from `.output/public`.
- `pages/index.vue` and `pages/confirmation.vue` are the only public pages.
- `@nuxtjs/seo` generates `robots.txt`, `sitemap.xml`, Schema.org, OG images, and default canonical metadata during `yarn build`.
- `public/_redirects` preserves `/index.html` and `/confirmation.html` for static hosting.
- `assets/images/` holds imported image assets referenced directly from TypeScript data.
- `plugins/legacy-runtime.client.ts` loads the Mobirise JS (jQuery, Bootstrap, and others) sequentially on the client after Nuxt is ready.
- `components/OgImage/Resume.satori.vue` is the Satori-based OG image template.
- `utils/site.ts` resolves `NUXT_SITE_URL`, then `NUXT_PUBLIC_SITE_URL`, for canonical URLs.

## Coding Style & Naming Conventions
Follow the existing two-space indentation and prefer TypeScript in `script setup` blocks. Keep content changes in `data/resume.ts` instead of hardcoding copy into templates. Preserve the original Mobirise section/class structure when editing `pages/index.vue` and `pages/confirmation.vue`; visual fidelity is intentional, so avoid replacing legacy markup with a redesign. Use PascalCase for Vue components and descriptive test filenames such as `tests/unit/site-utils.test.ts`.

## Testing Guidelines
Add unit coverage for utilities and route-support files under `tests/unit/`. Add Playwright smoke coverage for user-facing routes under `tests/e2e/`; they run against `yarn preview`. Before opening a PR, run `make typecheck` and `make test`, then verify both `/` and `/confirmation` still prerender correctly with the legacy CSS and scripts loaded from `/legacy/`. Builds should fail on internal link issues only; set `NUXT_LINK_CHECKER_REMOTE=1` when you explicitly want remote HTTP(S) link checks. The default canonical domain is `https://ibarra.dev`.

## Deployment Notes
- Set `NUXT_SITE_URL` in CI and hosting so canonical URLs, OG images, the sitemap, and `robots.txt` use the correct public domain. `NUXT_PUBLIC_SITE_URL` is still supported as a fallback.
- Cloudflare Pages should publish `.output/public`.
- Set `NUXT_LINK_CHECKER_REMOTE=1` to enable remote HTTP(S) link checks during build (off by default).

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Update CLAUDE.md...`, `Fix CodeQL alert...`, and `Add Claude Code GitHub Workflow`. Follow that pattern, and append the PR number when appropriate. Do not push directly to `main`; open a PR instead. Rebase onto the latest `main`, describe the user-visible change, link related issues, and attach screenshots for any HTML or styling updates.

## Dependency and Lockfile Workflow
- Never edit `yarn.lock` by hand. When merging multiple dependency PRs, resolve conflicts with `git checkout --theirs yarn.lock && docker compose run --rm app yarn install`.
- After any `yarn.lock` change (merge or conflict resolution), run `make install` before running tests. Containers do not auto-reflect updated lockfiles.
- A conflict-free `yarn.lock` auto-merge can still silently drop a version bump. After merging, grep `yarn.lock` for each target package's resolved version.
- `yarn up -R <pkg>` bumps transitive deps but rejects version ranges (`pkg@^1.2.3` errors). Pass the bare name and it resolves to the latest version satisfying the existing tree ranges.
- `yarn up <pkg>` (non-recursive, direct deps) tightens the `package.json` range to the resolved version as a side effect. Revert the range manually if the source PR was lockfile-only.
- The same package can have two resolutions in `yarn.lock` (old vulnerable and new patched) because different requesters pin different ranges. Plain `yarn install` will not consolidate them. Add a `resolutions` override in `package.json` (see the existing `minimatch` and `nuxt-og-image` entries).
- Dependabot vulnerability alerts are not visible through `gh pr`. Use `gh api repos/<owner>/<repo>/dependabot/alerts`, and `yarn why <pkg>` to trace which top-level dependency pulls in a vulnerable transitive package before choosing between `yarn up -R` and a `resolutions` override.
- Dependency PRs merged through a combined or squash-merged branch are not auto-closed by dependabot or renovate. Close each as superseded manually, verifying against `main` first.
- After merging, the remote branch is usually already auto-deleted by GitHub. `git push origin --delete <branch>` failing with "remote ref does not exist" is expected.

## Gotchas
- **`nuxt prepare` before unit tests on a clean checkout:** `tsconfig.json` extends `.nuxt/tsconfig.json`, which only `nuxt prepare` generates. Vitest 4.x fails with `TSCONFIG_ERROR: Tsconfig not found` without it. CI runs `npx nuxt prepare` before `yarn test`. Locally, Docker volumes persist `.nuxt/`, so this is transparent.
- **OG image `400 Invalid island request hash`:** either a stale Nuxt prerender cache (fix: `docker compose run --rm app sh -c 'rm -rf node_modules/.cache/nuxt && yarn build'`) or a version mismatch between nuxt 4.4.x and nuxt-og-image below 6.5.1 (fix: keep `"nuxt-og-image": "^6.5.1"` in `resolutions` in `package.json`).
- **TypeScript 7 breaks `vue-tsc`:** `vue-tsc` 3.3.x triggers `ERR_PACKAGE_PATH_NOT_EXPORTED` with TypeScript 7, so `yarn typecheck` fails locally. This is accepted and logged in `docs/DECISIONS.md`. The CI typecheck step in `.github/workflows/node.js.yml` is an explicit skip, so green CI does not mean typecheck passed. Restore the step once `vue-tsc` ships TypeScript 7 support.
- **Codacy inline suppression is not supported:** suppress a finding through `.codacy.yml` with global `exclude_paths`. Inline comments such as `# codacy-disable-next-line` have no effect.
- **Claude Code hooks (`.claude/settings.json`):** PostToolUse hooks run automatically. Editing `.vue` or `.ts` files triggers typecheck, and editing `tests/unit/` triggers unit tests, with output shown inline. A PreToolUse hook blocks direct edits to `yarn.lock`.

## Agent Automations
Skills live in `.claude/skills/` and `.agents/skills/`:
- `/verify-build` runs typecheck, unit tests, and build in sequence.
- `/merge-dep-prs` batch-merges dependency PRs and handles `yarn.lock` regeneration.
- `/update-resume` guides edits to `data/resume.ts` with post-edit validation.
- `/make-task <target>` runs any Makefile target.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for technotenshi/resume, via the gh CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Cross-tool working agreements (added 2026-08-05)

`~/HARNESS.md` is the canonical agreement for all AI tools (Hermes, Claude Code, ChatGPT/Codex).
- `docs/DECISIONS.md` is this repo's decision log — read before planning, append when a decision is made or reversed.
- Infra-mutating actions need explicit approval in the current session.
- Never claim success without real verification.
