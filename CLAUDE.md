# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # dev server with live reload (port 9000)
yarn build          # production build → dist/
yarn serve:dist     # preview built site from dist/
yarn serve:test     # browser test harness server
yarn tasks          # list all available Gulp tasks
yarn install --frozen-lockfile  # verify lockfile is consistent with package.json
```

Docker is recommended for consistent builds:

```bash
docker compose run -it --rm app bash -lc "yarn install"
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn start"
docker compose run -it --rm app bash -lc "yarn build"
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn serve:dist"
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn serve:test"
```

Override the default port 9000 with `--port` (e.g. `yarn start --port 9001`).

## Package Manager

Yarn v4 (`packageManager: yarn@4.13.0` in `package.json`). Uses `nodeLinker: node-modules` — required for `gulp-load-plugins` dynamic requires; PnP is not compatible. The Yarn binary is committed at `.yarn/releases/yarn-4.13.0.cjs` for reproducible installs without Corepack.

## GitHub Actions

Two workflows: `claude.yml` (mention-triggered) and `claude-code-review.yml` (PR-triggered). Security patterns to follow when editing:
- Pin action refs to commit SHAs, not mutable tags. Get SHA: `gh api repos/owner/repo/git/ref/tags/vN --jq '.object.sha'` (annotated tags need a second lookup: `gh api repos/owner/repo/git/tags/<sha> --jq '.object.sha'`)
- `pull_request` trigger + `id-token: write` requires fork protection: `if: github.event.pull_request.head.repo.full_name == github.repository`

## Architecture

This is a static site (Mobirise-generated HTML/CSS/JS) with no framework or module bundler.

**Directory layout:**
- `app/` — source: HTML pages in root, `styles/`, `scripts/`, `images/`, `fonts/`
- `.tmp/` — dev build output (served by BrowserSync, not committed)
- `dist/` — production build output (minified + optimized, not committed)

**Gulp pipeline** (`gulpfile.js`):
- `styles` — PostCSS + autoprefixer; sourcemaps in dev only
- `scripts` — copies JS to `.tmp/scripts` (and `dist/scripts` in prod); Babel is **configured but disabled** (pipe is commented out)
- `html` — `gulp-useref` + `htmlmin` + `cssnano` + `uglify` into `dist/`
- `images` — imagemin into `dist/images` (only runs during `build`, not `serve`)
- `fonts`, `extras` — copy-through tasks
- `serve` — BrowserSync; behavior controlled by `NODE_ENV`: unset = dev, `test` = test harness, `production` = serves `dist/`

**Build pipeline:**
```
clean → parallel(lint, parallel(styles, scripts) → html, images, fonts, extras) → measureSize
```

## Testing

Tests run in the browser via Mocha TDD + Chai — there is no headless/CI runner.

- Entry point: `test/index.html`
- Specs: `test/spec/**/*.js`
- To test app code, reference the script in `test/index.html` (files under `app/scripts/` are served at `/scripts/...` during `serve:test`)
- Run `yarn serve:test` and open the served URL in a browser

## Conventions

- **No bundler** — add scripts via `<script src="scripts/foo.js"></script>` in HTML
- **Babel is opt-in** — uncomment `$.babel()` in `scripts()` in `gulpfile.js` to enable transpilation
- **ESLint** config is in `package.json` (browser + node env, single quotes enforced); the `lint` task auto-fixes `app/scripts/`
- **CSS** — add new files under `app/styles/` and reference them in HTML; autoprefixer runs automatically

## Gotchas

- `gulp-useref` concatenation requires HTML build blocks; current pages link assets directly — add blocks only if you need concatenation
- Renaming top-level folders under `app/` (e.g. `styles/`, `scripts/`) requires updating the glob patterns in `gulpfile.js`
- Image optimization only runs during `build`; dev serves images directly from `app/images/`
- If enabling Babel, also ensure `.babelrc` (`@babel/preset-env`) matches your target browsers
- Port conflicts: use `--port` flag to pick an alternative port
- Both Renovate (`renovate/` branches) and Dependabot (`dependabot/` branches) run; they sometimes open duplicate PRs for the same dep — prefer the PR that also updates `package.json` over lockfile-only updates
- Merging multiple dependency PRs causes `yarn.lock` conflicts: resolve with `git checkout --theirs yarn.lock && yarn install`, then `git add yarn.lock`
