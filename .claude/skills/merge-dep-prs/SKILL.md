---
name: merge-dep-prs
description: Batch-merge multiple open dependency PRs into a single branch, resolve conflicts, and regenerate yarn.lock. Usage: /merge-dep-prs
disable-model-invocation: true
---

Merge all open dependency PRs into a single branch:

1. List open PRs with `gh pr list --state open`
2. Create a new branch: `git checkout -b chore/merge-deps-$(date +%Y%m%d) main`
3. Merge in order — workflow-file-only PRs first, then PRs touching `package.json`, then `yarn.lock`-only PRs
4. For `package.json` conflicts: keep ALL version bumps from every branch (do not revert any)
5. For `yarn.lock` conflicts: run `git checkout --theirs yarn.lock` then `docker compose run --rm app yarn install` to regenerate
6. Verify with `make typecheck && make test-unit`
7. Report what was merged and any issues found
