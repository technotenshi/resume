# Resume Site (Static) — Gulp + BrowserSync

A static site generated with Mobirise (plain HTML/CSS/JS). Built and served with Gulp; no framework or bundler. Keep changes simple and file-based.

## Features
- Live-reload dev server (BrowserSync)
- Production build to `dist/` with HTML/CSS/JS minification and image optimization
- Browser-based tests with Mocha + Chai (no headless runner wired)
 

## Requirements
- Node.js 18+ recommended (repo’s `docker-compose.yml` uses `node:20`)
- Yarn

Optional containerized workflow:
```bash
# one-off dev session inside container
docker compose run --rm app bash -lc "yarn install && yarn start"
```

## Install
```bash
yarn install
```

## Scripts
```bash
# Dev server (BrowserSync, serves .tmp + app)
yarn start

# Build for production (outputs to dist/)
yarn build

# Preview built site (serves dist/)
yarn serve:dist

# Browser test harness server (serves test/ with routes to .tmp/scripts)
yarn serve:test

# List all gulp tasks
yarn tasks

```

## Development workflow
- Source lives under `app/`:
  - Pages: `app/*.html` (e.g., `index.html`, `confirmation.html`)
  - Styles: `app/styles/*.css` (processed by PostCSS `autoprefixer`; sourcemaps in dev)
  - Scripts: `app/scripts/**/*.js` (copied to `.tmp/scripts`; minified for prod)
  - Assets: `app/images/**`, `app/fonts/**`
- Dev output: `.tmp/` (served alongside `app/`)
- Prod output: `dist/`

BrowserSync defaults to port 9000; override with:
```bash
gulp serve --port 9001
```

## Build pipeline (gulpfile.js)
- `styles`: PostCSS with `autoprefixer`; writes to `.tmp/styles` (and `dist/styles` in prod)
- `scripts`: copies JS to `.tmp/scripts` (and `dist/scripts` in prod). Babel is configured but disabled (the `$.babel()` pipe is commented). Don’t rely on transpilation unless you enable it.
- `html`: `useref` + minify HTML/CSS/JS to `dist/`
- `images`: imagemin to `dist/images`
- `fonts`, `extras`: copy-through tasks
- `serve`: environment-aware server (dev/test/prod) using `NODE_ENV`

Note: `gulp-useref` concatenation requires HTML build blocks. Current pages mostly link assets directly, so concatenation is minimal unless you add build blocks.

## Testing (browser)
- Harness at `test/index.html` sets Mocha TDD + Chai globals
- Specs under `test/spec/**/*.js` (see `test/spec/test.js`)
- To test app code, reference your script in `test/index.html`:
```html
<!-- served at /scripts when running npm run serve:test -->
<script src="/scripts/your-file.js"></script>
```
Run the harness:
```bash
yarn serve:test
```
Open the served URL in a browser to run tests.

## Linting
ESLint is configured in `package.json` (browser + node env, single quotes). The `lint` task runs as part of `build` and auto-fixes app scripts where possible. For quick feedback, run a build:
```bash
yarn build
```

## Enabling Babel (optional)
If you need transpilation, uncomment the `$.babel()` pipe inside `scripts()` in `gulpfile.js`. `.babelrc` already includes `@babel/preset-env`.


## CI/Security
GitHub CodeQL workflow at `.github/workflows/codeql-analysis.yml` scans JavaScript on `develop` and `master`.

## Project structure
```
app/
  index.html
  confirmation.html
  styles/
  scripts/
  images/
  fonts/
.github/
  workflows/codeql-analysis.yml
gulpfile.js
package.json
```

## Troubleshooting
- Port in use: run `gulp serve --port 9001`
- Stale output: the `clean` task runs for serve/build. If needed, manually remove `.tmp/` and `dist/`
- Images look unoptimized in dev: optimization happens only during `npm run build`

## License
Not specified.
