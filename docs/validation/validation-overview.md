# Validation Overview

Atlas Enterprise validation uses profile-based npm scripts.

## Profiles

- `validate:quick`: critical local runtime and architecture checks.
- `validate:feature`: repository, migration, browser, PWA, offline, and simulator checks.
- `validate:full`: full repository validation.
- `validate:visual-regression`: screenshot and visual baseline gate.
- `validate:release`: clean working tree and release governance gate.

## Rule

Release work is accepted only after the required profile set passes.
