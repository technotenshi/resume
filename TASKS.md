# Suggested Improvement Tasks

Each task follows the **INVEST** model: Independent, Negotiable, Valuable, Estimable, Small, Testable.

---

## Performance

### PERF-1 — Replace legacy carousel JS with a native Vue component

**Why:** `TestimonialCarousel.vue` delegates all behavior to Bootstrap carousel loaded via `plugins/legacy-runtime.client.ts`. This pulls in jQuery (~85 KB), Bootstrap JS, Popper, and Tether sequentially on every page load, blocking interactivity by an estimated 200–400 ms.

**Acceptance criteria:**
- `TestimonialCarousel.vue` auto-advances slides on an 8-second interval using Vue `setInterval` or `useIntervalFn`
- Previous/next controls work without any legacy scripts
- No regression in the existing E2E carousel test (`tests/e2e/app.spec.ts`)
- `public/legacy/scripts/` jQuery, Bootstrap, Popper, and Tether files are no longer loaded

---

### PERF-2 — Lazy-load below-the-fold images

**Why:** `pages/index.vue` renders all `<img>` elements and CSS `background-image` divs immediately. The six images below the hero section (publications, education, testimonial avatars) are not visible on first paint but still download unconditionally, wasting bandwidth on mobile connections.

**Acceptance criteria:**
- All `<img>` elements below the hero section have `loading="lazy"`
- No visible change to layout or paint order for images already in the viewport
- Verified with Chrome DevTools Network throttling (3G) showing deferred requests for off-screen images

---

### PERF-3 — Convert JPG/PNG hero and background images to WebP

**Why:** `assets/images/mbr-1920x1246.jpg` is 288 KB and `background9.jpg` is 60 KB. Both images are format choices made in 2016-era Mobirise and have no modern equivalents in the repo. WebP delivers 25–35% smaller files with equivalent visual quality.

**Acceptance criteria:**
- Hero and all background images added as WebP variants alongside original fallbacks
- `nuxt.config.ts` or `pages/index.vue` serves WebP to supporting browsers (via `<picture>` element or Nuxt image provider)
- Total image transfer weight for the homepage is reduced by ≥ 20% (measured in DevTools)
- No visual regression on Chrome, Firefox, and Safari

---

### PERF-4 — Remove duplicate image assets from `public/legacy/images/`

**Why:** Image files exist in both `assets/images/` (used by the Nuxt app) and `public/legacy/images/` (orphaned from the Mobirise era). The duplicate copies add dead weight to the Docker image, git history, and deployed bundle.

**Acceptance criteria:**
- `public/legacy/images/` is removed or confirmed empty
- All image references in `pages/index.vue` and `data/resume.ts` resolve correctly from `assets/images/`
- `make build` completes without errors and the homepage renders all images correctly
- `make preview` visual check shows no broken images

---

## Accessibility

### A11Y-1 — Add descriptive alt text to publication images

**Why:** `pages/index.vue` line 144 sets `alt=""` on publication images, hiding their content from screen readers. Publication images are meaningful — they show book/article covers — and should be described for visually impaired users.

**Acceptance criteria:**
- Each publication item in `data/resume.ts` has an `imageAlt` field (e.g. `"Cover of Book Title by Author"`)
- `pages/index.vue` binds `:alt="item.imageAlt"` on the publication `<img>` element
- `tests/unit/resume-data.test.ts` asserts that every publication entry has a non-empty `imageAlt` string
- TypeScript interface for publication type updated to require the field

---

### A11Y-2 — Add ARIA labels and live region to the testimonial carousel

**Why:** `TestimonialCarousel.vue` has no `aria-label` on the Previous/Next buttons and no `aria-live` region to announce slide transitions to screen reader users. Carousel controls announce nothing when activated.

**Acceptance criteria:**
- Previous and Next buttons have explicit `aria-label="Previous testimonial"` and `aria-label="Next testimonial"` attributes
- An `aria-live="polite"` region containing the active slide content is present in the DOM
- Slide indicator dots have `aria-current="true"` on the active slide and `aria-label="Slide N of M"` on each
- Verified with VoiceOver (macOS) or NVDA (Windows) that slide transitions are announced

---

### A11Y-3 — Add axe-core accessibility audit to the Playwright E2E suite

**Why:** `tests/e2e/app.spec.ts` validates functional behavior but runs no accessibility checks. Critical violations (contrast failures, missing labels, invalid ARIA) can silently regress between deploys with no automated catch.

**Acceptance criteria:**
- `@axe-core/playwright` added to `devDependencies`
- An accessibility check is run on the homepage and confirmation page in `app.spec.ts` using `checkA11y` or equivalent
- The test fails if axe reports any `critical` or `serious` violations
- `make test-e2e` passes cleanly after all existing accessibility issues are resolved first

---

## Testing

### TEST-1 — Add mobile viewport tests to the Playwright suite

**Why:** The E2E tests only run at the default desktop viewport. The site uses Bootstrap's responsive grid (via legacy CSS), but there is no automated verification that the layout, navigation, and carousel function correctly on mobile screen sizes.

**Acceptance criteria:**
- A second Playwright project (or `test.use({ viewport })` block) exercises the homepage at 375×812 (iPhone 14) and 768×1024 (iPad) viewports
- Tests assert: hero section is visible, experience section renders without overflow, carousel controls are tappable (44×44 px minimum hit area)
- No existing tests are broken or skipped

---

### TEST-2 — Extend unit tests to validate required resume data fields

**Why:** `tests/unit/resume-data.test.ts` only checks array lengths and link format. A missing `title`, empty `summary`, or `undefined` date in resume data would silently produce a broken page — there is no guard against incomplete entries.

**Acceptance criteria:**
- Each `experience` item is asserted to have non-empty `company`, `title`, `startDate`, and `description`
- Each `talk` item is asserted to have non-empty `title`, `event`, and `href`
- Each `testimonial` item is asserted to have non-empty `quote`, `author`, and `role`
- Tests are table-driven (one loop per array) so adding entries to `resume.ts` automatically covers them

---

## Developer Experience

### DX-1 — Add ESLint and Prettier with Vue and TypeScript rules

**Why:** The repo has no linter or formatter. Code style is enforced only through `.editorconfig` (indent/newline rules). Inconsistent whitespace, unused variables, and Vue-specific anti-patterns go uncaught until review.

**Acceptance criteria:**
- `@nuxt/eslint` (or `eslint-config-vue` + TypeScript plugin) added to `devDependencies`
- `eslint.config.js` (flat config) created with rules for Vue 3, TypeScript, and the project's 2-space indent
- `prettier.config.js` created and `eslint-prettier` integration added to avoid conflicts
- `package.json` gains a `lint` script: `yarn lint` (lint check) and `yarn lint:fix` (auto-fix)
- CI `node.js.yml` workflow runs `yarn lint` before `yarn test`

---

### DX-2 — Enable TypeScript strict mode and resolve all type errors

**Why:** `tsconfig.json` does not enable `strict: true`, so null-safety, implicit `any`, and unchecked index accesses are not caught. `OgImage/Resume.satori.vue` also has no typed props definition, making it invisible to TypeScript.

**Acceptance criteria:**
- `tsconfig.json` sets `"strict": true`
- `OgImage/Resume.satori.vue` uses `defineProps<{ ... }>()` with explicit types for all props it receives
- `yarn typecheck` passes with zero errors after enabling strict mode
- No `@ts-ignore` or `as any` casts added as workarounds

---

### DX-3 — Cache Playwright browsers between CI runs

**Why:** `node.js.yml` runs `playwright install` on every CI run, downloading Chromium (~130 MB) each time. This adds 60–90 seconds to every PR check and consumes GitHub Actions cache quota unnecessarily.

**Acceptance criteria:**
- `actions/cache` step added to `node.js.yml` keyed on the Playwright version from `package.json`
- Cache hit skips `playwright install --with-deps`
- Cache miss installs and stores the browsers for the next run
- CI wall time for the `playwright install` step drops to < 5 seconds on cache hits

---

## Security & Privacy

### SEC-1 — Move personal contact details to environment variables

**Why:** `data/resume.ts` hard-codes phone number and email address as plain strings. These are baked into the built static output and indexed by search engines and scrapers, making them trivially harvestable. Storing them as environment variables keeps them out of git history and allows rotation without a code change.

**Acceptance criteria:**
- `NUXT_PUBLIC_CONTACT_EMAIL` and `NUXT_PUBLIC_CONTACT_PHONE` added as runtime config keys in `nuxt.config.ts`
- `data/resume.ts` references `useRuntimeConfig().public.contactEmail` (or equivalent composable pattern) instead of string literals
- A `.env.example` file documents the required variable names with placeholder values
- `make build` fails with a clear error if either variable is unset
- Phone and email are absent from the committed TypeScript source

---

### SEC-2 — Add a Content Security Policy header

**Why:** The site loads third-party fonts and legacy scripts from `public/legacy/` but has no CSP header to restrict unexpected script execution or data exfiltration. A static CSP header is straightforward to add via `_headers` (Cloudflare Pages) or `nuxt.config.ts` `routeRules`.

**Acceptance criteria:**
- A `Content-Security-Policy` header is set for all routes via `nuxt.config.ts` `routeRules` or a `public/_headers` file
- Policy allows: `'self'` for scripts and styles, the legacy fonts inline as `font-src`, and no `unsafe-eval`
- `make preview` response includes the header (verified with `curl -I http://localhost:3000`)
- No console CSP violation errors appear in the browser on the homepage

---

## SEO & Content

### SEO-1 — Add structured data for Person and ContactPoint schemas

**Why:** `@nuxtjs/seo` generates basic schema.org output, but the site is a personal resume — adding `Person` with `ContactPoint`, `sameAs` (LinkedIn), and `knowsAbout` (skills array) provides richer Google Knowledge Panel eligibility and better search result presentation.

**Acceptance criteria:**
- `pages/index.vue` uses `useSchemaOrg` (from `nuxtjs/seo`) to emit a `Person` entity with: `name`, `jobTitle`, `url`, `sameAs: [linkedinUrl]`, and `knowsAbout` derived from the skills array in `data/resume.ts`
- `ContactPoint` with `contactType: "professional"` and `email` is nested inside `Person`
- `make build` output includes the schema in the generated HTML
- Schema validates without errors in the Google Rich Results Test

---

### SEO-2 — Rename `.github/dependabot.yml` to `.github/renovate.json`

**Why:** `.github/dependabot.yml` contains a Renovate configuration (`$schema: renovate`), not a Dependabot configuration. The filename is misleading — GitHub reads `dependabot.yml` for Dependabot and ignores it for Renovate. If Renovate is the intended tool, it should be configured in the standard `renovate.json` location. If Dependabot is intended, the file contents should be replaced.

**Acceptance criteria:**
- The repository has exactly one dependency update tool configured, in the standard location for that tool
- If Renovate: file renamed to `.github/renovate.json`, contents validated against the Renovate JSON schema
- If Dependabot: file replaced with a valid `dependabot.yml` using the `version: 2` syntax
- `tests/unit/redirects.test.ts` or a new unit test asserts the chosen config file exists at the correct path
