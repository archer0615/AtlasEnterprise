# PWA Long Task Failure Diagnostics

Date: 2026-07-18

## Failure Marker

- Every long task command emits `[long-task]` markers.
- A failing run must show the command name and ordinal position.

## Failed Step

- Failed step output must include `failed at step`.
- The step name maps directly to a package script in `package.json`.

## Elapsed Time

- Each passing step reports elapsed milliseconds.
- Failed runs report total elapsed milliseconds before exit.

## Retry Boundary

- Retry the failed package script directly before rerunning the full long task.
- If the same item fails three times, switch to a narrower validation or fixture-level diagnosis.
