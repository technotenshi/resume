# Decision log

Source of truth for this repo's decisions. Append dated entries; newest last.
Chat output from any AI tool is a draft until recorded here. See ~/HARNESS.md.

## 2026-08-05 — Adopted cross-tool working agreements
Harness Phase 1: this file becomes the repo's decision log; working agreements in ~/HARNESS.md apply.

## 2026-08-20 — Keep TypeScript on the 6.x line with vue-tsc

`vue-tsc` 3.3.10 resolves TypeScript's internal `lib/tsc` entrypoint, which
TypeScript 7 no longer exports. Keep TypeScript at `^6.0.3` until vue-tsc
supports the TypeScript 7 package exports; this restores the required
typecheck while retaining the dependency updates consolidated in this branch.
