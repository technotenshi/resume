# AI contributor instructions for this repo

This is a static site (Mobirise-generated HTML/CSS/JS) built and served with Gulp + BrowserSync. There is no framework or bundler; assets are plain files referenced by HTML. Keep changes simple and file-based.

## Project map and build pipeline
- Source lives in `app/` (HTML in root, CSS under `app/styles/`, JS under `app/scripts/`, images/fonts under `app/images/` and `app/fonts/`).
- Transient dev output goes to `.tmp/`; production build goes to `dist/`.
- Gulp tasks (see `gulpfile.js`):
  - `styles` → PostCSS with `autoprefixer`, sourcemaps in dev.
  - `scripts` → copies JS to `.tmp/scripts` (and `dist/scripts` in prod). Babel is configured but currently disabled (the `$.babel()` pipe is commented out). Do not rely on transpilation.
  - `html` → `gulp-useref` + minify HTML, CSS (`cssnano`), and JS (`uglify`) into `dist/`.
  - `images` → image minification into `dist/images`.
  - `fonts`/`extras` → copy-through tasks.
  - `serve` → BrowserSync server; behavior changes by `NODE_ENV` (dev/test/prod).

## Commands you’ll actually use
- Dev server with live reload: `npm start` (equivalent to `gulp serve` with `NODE_ENV` unset).
- Production build: `npm run build` (sets `NODE_ENV=production` and runs default gulp build).
- Preview built site: `npm run serve:dist` (serves `dist/`).
- Test harness server: `npm run serve:test` (serves `test/` with routes to `.tmp/scripts`).
- List available Gulp tasks: `npm run tasks`.

## Testing shape (browser, not Node)
- Tests run in the browser via Mocha + Chai. Entry: `test/index.html` (sets Mocha TDD and loads Chai globals).
- Place specs in `test/spec/**/*.js` (example: `test/spec/test.js`).
- To test code from `app/scripts`, reference those files from `test/index.html` (they’re served at `/scripts/...` via BrowserSync when using `serve:test`). There is no headless/CI runner wired.

## Conventions and constraints
- No module bundler. Add scripts via `<script src="scripts/your-file.js"></script>` in HTML. Keep JS ES5/ES6 features supported by target browsers; Babel is not active by default.
- CSS lives in `app/styles/`. Add new files and reference them in HTML; `styles` will autoprefix and write sourcemaps in dev.
- Image optimization happens only during `build`; for dev, images are served from `app/images/`.
- ESLint is configured in `package.json` (browser + node env, single quotes). The `lint` task runs on app scripts and auto-fixes where possible.
- Ports: BrowserSync defaults to `9000` (can override with `--port` in Gulp args).
- Node version: `docker-compose.yml` uses `node:20`. The `engines.node` field (`>=4`) is legacy—prefer Node 18+ locally.

## CI/Security
- GitHub CodeQL workflow (`.github/workflows/codeql-analysis.yml`) runs on `develop` and `master` branches for JavaScript.

## Patterns by example
- Add a new script: create `app/scripts/foo.js`, then include it in `app/index.html` with `<script src="scripts/foo.js"></script>`.
- Add a test for it: add `<script src="/scripts/foo.js"></script>` to `test/index.html` and create `test/spec/foo.test.js` with Mocha TDD `suite/test` blocks. Run `npm run serve:test` and open the served URL.
- Add a new page: duplicate `app/confirmation.html` or `app/index.html`, keep stylesheet/script paths relative to `app/`.

## Gotchas
- If you enable Babel, uncomment the `$.babel()` pipe in `scripts()` and ensure presets match `.babelrc`.
- Renaming top-level folders under `app/` requires updating glob patterns in `gulpfile.js`.
- `gulp-useref` concatenation/minification relies on HTML build blocks; current pages mostly link static assets directly. Add build blocks only if you need concatenation.

If anything above is unclear or you spot a workflow gap (e.g., needing headless tests), tell us and we’ll refine these instructions.
