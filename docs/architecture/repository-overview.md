# Repository Overview

Repository contracts define persistence operations without binding domain or runtime code to IndexedDB.

## Rules

- Repositories are owner scoped.
- Repository contracts do not import DOM, runtime fixtures, or browser UI.
- IndexedDB adapters live under `frontend/src/infrastructure/indexeddb`.
- Application services orchestrate repositories and audit writes.
- Runtime modules do not call repositories.

## Local Stores

- settings
- scenarios
- recommendationDecisions
- auditEntries
- recommendations
- executionPlans
- actionPlans
- notifications
- calendarEntries
- automationRules
- schedulerState
