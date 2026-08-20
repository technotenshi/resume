---
name: verify-build
description: Run the full pre-PR validation pipeline — typecheck, unit tests, then static build with link checker. Reports pass/fail per step.
disable-model-invocation: true
---

Run each step sequentially. Stop and report on first failure.

1. `make typecheck` — TypeScript and vue-tsc checks
2. `make test-unit` — Vitest unit tests
3. `make build` — full static site generation with link checker (set NUXT_LINK_CHECKER_REMOTE=1 only if remote link checking is needed)

Report: ✓ or ✗ for each step with a one-line summary. On failure show the relevant error output.
