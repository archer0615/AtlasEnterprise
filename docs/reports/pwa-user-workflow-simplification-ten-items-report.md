# PWA User Workflow Simplification Ten Items

Date: 2026-07-17

## Completed Items

1. Renamed the dashboard heading to `我的決策狀態`.
2. Added plain-language guidance below the dashboard heading.
3. Kept save-scenario controls in the primary workflow.
4. Moved delete, reset, backup export, backup import, restore confirmation, and apply backup into advanced data management.
5. Added `進階資料管理` as a collapsed control group.
6. Added styling for advanced controls.
7. Added frontend validation guards for the simplified user-facing wording.
8. Updated browser workflow validation to open advanced controls before testing destructive and restore actions.
9. Refreshed visual regression screenshots for the simplified dashboard layout.
10. Revalidated frontend, browser workflow, PWA, offline cache, visual regression, and deployment readiness.

## Reason

The previous dashboard exposed too many maintenance controls beside the primary user flow. This batch keeps advanced operations available while making the first interaction path clearer for end users.
