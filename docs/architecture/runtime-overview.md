# Runtime Overview

Atlas Enterprise runtime modules are local-first, offline-first, static-first, and GitHub Pages compatible.

## Runtime Rules

- Accept data through plain input objects.
- Return immutable records or immutable summaries.
- Keep DOM, IndexedDB, browser globals, cloud APIs, and fixtures outside runtime modules.
- Inject clock and id generation where deterministic tests require generated fields.
- Keep business rules catalog backed through domain status and type modules.

## Implemented Runtime Areas

- Net worth projection
- Cashflow projection
- Goal progress projection
- Financial health projection
- Recommendation generation and explainability
- Execution planning
- Action planning
- Notification generation
- Business calendar generation
- Automation rule evaluation
- Scheduler on-demand evaluation
- Dashboard projections
