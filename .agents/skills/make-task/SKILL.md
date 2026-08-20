---
name: make-task
description: Run any Makefile target via docker compose and report the result. Usage: /make-task <target>
disable-model-invocation: true
---

Run `make {{ args }}` and report the full output, highlighting any errors or warnings. If the target fails, show the last 30 lines of output and the exit code.
