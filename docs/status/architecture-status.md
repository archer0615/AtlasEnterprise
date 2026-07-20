# Architecture Status

## Current v1 Architecture

- Static-first: runtime assets are served from `frontend/` and GitHub Pages.
- Local-first: user-owned runtime state persists in browser storage and IndexedDB.
- Offline-first: service worker and cache validation protect the static shell and generated data.
- Build-time knowledge: canonical Markdown is transformed into frontend JSON before deployment.
- Local calculation: dashboard, loan, recommendation, simulator, and fixture checks run without a server dependency.

## Runtime Stores

| Store | Key | Status | Purpose |
| --- | --- | --- | --- |
| `metadata` | `key` | Implemented | Migration lock, migration history, backup coordination metadata. |
| `scenarios` | `scenarioId` | Implemented | Local saved scenarios and imported scenario records. |
| `recommendationDecisions` | `decisionId` | Implemented | Local recommendation decision log. |
| `settings` | `key` | Implemented | Runtime preferences and profile settings. |
| `auditEntries` | `auditId` | Implemented | Persistent audit records for backup, restore, offline repair, and decisions. |

## Optional Architecture Boundary

The following areas can exist for prototypes, design notes, or future server architecture, but they are not v1 startup dependencies:

- `backend/`
- `database/`
- `ai/`
- ASP.NET Core
- PostgreSQL
- EF Core
- Server REST API
- Cloud Database
- Authentication Server
- Multi-device Sync
