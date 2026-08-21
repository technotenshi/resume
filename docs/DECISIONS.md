# Decision log

Source of truth for this repo's decisions. Append dated entries; newest last.
Chat output from any AI tool is a draft until recorded here. See ~/HARNESS.md.

## 2026-08-05 — Adopted cross-tool working agreements
Harness Phase 1: this file becomes the repo's decision log; working agreements in ~/HARNESS.md apply.

## 2026-08-20 — Keep TypeScript on the 6.x line with vue-tsc (superseded same day)

Initial finding: `vue-tsc` 3.3.10 still requires `typescript/lib/tsc`, which
TypeScript 7's `exports` map no longer exposes (`ERR_PACKAGE_PATH_NOT_EXPORTED`).
Temporarily held TypeScript at `^6.0.3`. **Superseded by the entry below.**

## 2026-08-20 — Upgrade TypeScript to 7.x; typecheck skipped in CI

Reverses the earlier 6.x hold. `vue-tsc` 3.3.10 (latest) still breaks with
TypeScript 7, but `yarn typecheck` does not block deployment — the CI step is
now an explicit skip with a descriptive message rather than a silently failing
`continue-on-error` step. TypeScript is upgraded to `^7.0.0`; the typecheck
step will be restored once vue-tsc ships TypeScript 7 support.
