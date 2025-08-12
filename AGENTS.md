# AI Agents Guide

This repo is a static site (Mobirise-generated HTML/CSS/JS) built and served with Gulp + BrowserSync. There’s no framework or bundler; assets are plain files referenced by HTML. Prefer small, file-based edits that respect the existing structure.

## Quick start inside Docker
Run everything inside the provided container to ensure a consistent environment.

```bash
# Install dependencies
docker compose run -it --rm app bash -lc "yarn install"

# Dev server (default port 9000)
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn start"

# Dev server on custom port (example: 9001)
docker compose run -it --rm -p 9001:9001 app bash -lc "yarn start --port 9001"

# Production build
docker compose run -it --rm app bash -lc "yarn build"

# Preview built site (serves dist/ on 9000)
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn serve:dist"

# Browser test harness server
docker compose run -it --rm -p 9000:9000 app bash -lc "yarn serve:test"

# List available Gulp tasks
docker compose run -it --rm app bash -lc "yarn tasks"
```

## Architecture at a glance
- Source: `app/`
  - HTML pages in `app/` (e.g., `index.html`, `confirmation.html`)
  - CSS in `app/styles/`
  - JS in `app/scripts/`
  - Assets in `app/images/` and `app/fonts/`
- Dev output: `.tmp/` (served by BrowserSync)
- Production output: `dist/` (minified, optimized)
- Orchestration: `gulpfile.js` (styles, scripts, html, images, fonts, extras, serve)

## Core workflows
- Dev server (live reload):
  - `yarn start` (equivalent to `gulp serve` with `NODE_ENV` unset)
- Build (minify + optimize to `dist/`):
  - `yarn build` (sets `NODE_ENV=production` and runs Gulp default)
- Build inside Docker container (recommended for verifying builds):
  - `docker compose run -it --rm app bash -lc "yarn build"`
- Preview built assets:
  - `yarn serve:dist`
- Test harness server (browser-based Mocha/Chai):
  - `yarn serve:test` (serves `test/` with routes to `.tmp/scripts`)
- List Gulp tasks: `yarn tasks`

## Testing (browser, not Node)
- Entry: `test/index.html` (Mocha TDD + Chai globals)
- Specs live in `test/spec/**/*.js` (example provided)
- To test app code, ensure the target script under `app/scripts` is referenced from `test/index.html` (served at `/scripts/...` during `serve:test`)

## Conventions and constraints
- No bundler; include JS via `<script src="scripts/your-file.js"></script>` in HTML.
- Babel is configured but disabled in `scripts()` (the `$.babel()` pipe is commented). Don’t rely on transpilation unless you re-enable it.
- CSS runs through PostCSS `autoprefixer` in `styles()`; sourcemaps only in dev.
- ESLint config lives in `package.json` (browser+node env, single quotes). The `lint` task auto-fixes app scripts.
- BrowserSync default port is `9000` (override via `--port` argv).
- Node: `docker-compose.yml` uses `node:20` (the `engines.node >=4` is legacy).

## Common tasks by example
- Add a script:
  1) Create `app/scripts/foo.js`
  2) Reference it in a page, e.g., `app/index.html` → `<script src="scripts/foo.js"></script>`
  3) Dev run: `yarn start` (auto-copies to `.tmp/scripts`)
- Add a test for it:
  1) In `test/index.html`, add `<script src="/scripts/foo.js"></script>`
  2) Create `test/spec/foo.test.js` with Mocha TDD `suite/test`
  3) Run `yarn serve:test` and open the served URL
- Add a new page: duplicate `app/confirmation.html` or `app/index.html`; keep stylesheet/script paths relative to `app/`

 

## CI/Security
- CodeQL workflow at `.github/workflows/codeql-analysis.yml` runs on `develop` and `master` for JavaScript

## Gotchas
- Enabling Babel: uncomment `$.babel()` in `scripts()` and ensure `.babelrc` (`@babel/preset-env`) suits target browsers
- Renaming top-level folders under `app/` requires updating glob patterns in `gulpfile.js`
- `gulp-useref` build blocks: current pages mostly link static assets directly; add build blocks only if you need concatenation
- Image optimization happens only in `build` (dev serves from `app/images/`)

## Troubleshooting
- Port busy: run with `--port` (e.g., `gulp serve --port 9001`)
- Stale artifacts: remove `.tmp/` and `dist/` (the `clean` task runs for you on serve/build)
- Lint issues: run `gulp` tasks or open files—`lint` auto-fixes app scripts where possible
