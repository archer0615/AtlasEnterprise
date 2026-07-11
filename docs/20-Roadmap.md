# Project Atlas Enterprise
# docs/20-Roadmap.md

Version: 2.0  
Status: Approved PWA Roadmap

## Phase 0 — Specification Foundation

Complete Domain, Formula, Rule, Decision, Knowledge, and traceability specifications.

Exit criteria: Codex can implement core logic without inventing business concepts.

## Phase 1 — Local-First Platform

Deliver:

- React + TypeScript + Vite
- Clean Architecture boundaries
- IndexedDB repositories
- Schema migration framework
- HashRouter
- Web App Manifest
- Service Worker
- Offline application shell
- GitHub Actions deployment
- GitHub Pages hosting

Exit criteria: application installs and reopens offline.

## Phase 2 — Data Safety

Deliver:

- Encrypted JSON backup
- Import validation
- Backup checksum
- Version migration
- Recovery workflow
- Local data reset
- Multi-tab conflict control

Exit criteria: tested export/import round trip across schema versions.

## Phase 3 — Core Financial Engines

Deliver:

- Cash Flow Engine
- Loan Engine
- Investment Engine
- Property and Home Upgrade Engine
- Retirement Engine
- Scenario Engine
- Decision and Explainability Engine

Exit criteria: deterministic, traceable, offline calculations.

## Phase 4 — User Experience

Deliver dashboard, timeline, goals, scenario comparison, decision explanation, reports, install prompts, update notifications, and data-health diagnostics.

## Phase 5 — Optional Cloud Sync

Only after local-first stability:

- .NET 8 API
- PostgreSQL
- EF Core
- Authentication
- Encrypted synchronization
- Household sharing
- Server audit
- Scheduled operations

The cloud phase must implement existing repository contracts rather than replace Domain logic.

## Milestones

| Milestone | Objective |
|---|---|
| M1 | Specification stable |
| M2 | PWA shell deployed |
| M3 | IndexedDB and migrations stable |
| M4 | Backup and recovery verified |
| M5 | Core engines complete |
| M6 | Offline MVP |
| M7 | Optional cloud design |

## Technology Stack

### v1
React, TypeScript, Vite, IndexedDB, Dexie/idb, PWA, Zod, Vitest, Playwright, GitHub Actions, GitHub Pages.

### Future
.NET 8, ASP.NET Core, PostgreSQL, EF Core.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-07-09 | Server-first roadmap |
| 2.0 | 2026-07-11 | Local-first PWA roadmap |
