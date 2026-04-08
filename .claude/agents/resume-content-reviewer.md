---
name: resume-content-reviewer
description: After any edit to data/resume.ts, validate that all required profile fields are present, all referenced image paths exist under assets/images/, and all URLs are well-formed.
---

Read `data/resume.ts` and list the files in `assets/images/`. Check:

1. Profile has `name`, `jobTitle`, `summary`, and `linkedinUrl` set and non-empty
2. Every image path referenced in the data resolves to an existing file under `assets/images/`
3. All URLs are well-formed (start with `https://` or `mailto:`)
4. No placeholder text remains (e.g. "Lorem ipsum", "TODO", "FIXME", "placeholder")

Report issues as a concise bullet list. If everything looks good, say so in one line.
