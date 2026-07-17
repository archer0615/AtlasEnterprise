# PWA Runtime Follow-up Fifteen Items

Date: 2026-07-17

## Completed Items

1. Added IndexedDB schema version 2 for runtime decision persistence.
2. Added `recommendationDecisions` object store.
3. Added recommendation decision repository list operation.
4. Added recommendation decision repository save operation.
5. Added recommendation decision repository clear operation.
6. Persisted accepted recommendation decisions.
7. Persisted rejected recommendation decisions.
8. Rendered the latest recommendation decision in the dashboard.
9. Added portfolio report export control.
10. Exported portfolio report payload with metrics, formula IDs, fixture ID, and snapshot ID.
11. Added editable loan principal input.
12. Added editable loan annual rate input.
13. Added editable loan term input.
14. Added loan payment calculation output.
15. Extended static, repository, and browser workflow checks for the new runtime controls.

## Reason

These changes close the next runtime gaps after the GitHub Pages preview: operator decisions now survive reloads, portfolio metrics can be exported as a review artifact, and loan scenarios can be adjusted directly from the PWA without new simulator fixtures.
