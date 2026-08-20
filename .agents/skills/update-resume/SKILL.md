---
name: update-resume
description: Guided update of resume content in data/resume.ts. Usage: /update-resume <what to change>
---

Read `data/resume.ts` to understand the current content and TypeScript schema. Apply the requested change ({{ args }}), preserving all existing types and structure. After editing, invoke the `resume-content-reviewer` agent to validate the result.
