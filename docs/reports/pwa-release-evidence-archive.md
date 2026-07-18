# PWA Release Evidence Archive

Date: 2026-07-18

## Local Git Evidence

- Local-only Git workflow remains the release record.
- Release checkpoints are preserved as local commits.
- No remote push is required for this project.

## Validation Evidence

- Full validation is covered by `npm run validate`.
- Long task execution is covered by `npm run task:long`.
- Release governance is covered by `npm run validate:release-governance`.
- Long task governance is covered by `npm run validate:long-task-governance`.

## Generated Artifact Evidence

- Release note: `docs/reports/pwa-generated-release-note.md`.
- Validation history: `docs/reports/validation-history.json`.
- Visual baselines: `docs/roadmap/visual-artifacts/playwright-desktop-dashboard.png` and `docs/roadmap/visual-artifacts/playwright-mobile-dashboard.png`.
- Knowledge index: `frontend/knowledge/index.json`, `frontend/knowledge/search-index.json`, and `frontend/knowledge/document-assets.json`.

## Recovery Evidence

- Backup and restore behavior is represented by PWA backup documentation and offline cache validation.
- Migration recovery behavior is represented by data migration and update strategy documentation.
- Release recovery boundary is local: restore from committed artifacts, rerun generated index build, then rerun validation.
