# Architecture Status

## Current v1 Architecture

- Static-first: runtime assets are served from `frontend/` and GitHub Pages.
- Local-first: user-owned runtime state persists in browser storage and IndexedDB.
- Offline-first: service worker and cache validation protect the static shell and generated data.
- Build-time knowledge: canonical Markdown is transformed into frontend JSON before deployment.
- Local calculation: dashboard, loan, recommendation, simulator, and fixture checks run without a server dependency.
- Scenario and Decision local runtime: pure domain contracts, command services, lifecycle/state-machine validation, repository contracts, and audit evidence run without DOM or IndexedDB dependencies in domain code.

## Runtime Stores

| Store | Key | Status | Purpose |
| --- | --- | --- | --- |
| `metadata` | `key` | Implemented | Migration lock, migration history, backup coordination metadata. |
| `scenarios` | `scenarioId` | Implemented | Local saved scenarios and imported scenario records. |
| `recommendationDecisions` | `decisionId` | Implemented | Local recommendation decision log. |
| `settings` | `key` | Implemented | Runtime preferences and profile settings. |
| `auditEntries` | `auditId` | Implemented | Persistent audit records for backup, restore, offline repair, and decisions. |

## Scenario Decision Boundary

- Scenario stores persisted assumptions and decision context; projection output is derived at runtime.
- Decision stores user decision state and rationale evidence; state changes must pass the domain state machine.
- RecommendationDecision stores disposition evidence and does not mutate the source recommendation.
- Decision Audit stores append-only evidence and does not contain backup payloads or secrets.

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
