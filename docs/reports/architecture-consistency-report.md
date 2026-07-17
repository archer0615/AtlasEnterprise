# Architecture Consistency Report

## Architecture Score

Score: 95 / 100

- PWA Architecture baseline: GitHub Pages, Static PWA, Browser Runtime, Offline First, IndexedDB, Knowledge JSON, Repository Pattern, Local Calculation Runtime.
- Audit scope: all Markdown under Repository, including docs, knowledge, .codex, frontend, simulator, and dashboard-related roadmap/reporting files.
- Business Rule, Domain, Entity, Formula, Calculation, and Knowledge semantics were not intentionally changed by this audit; fixes were limited to architecture, roadmap, and deployment wording.

## Conflict List

- None. No unmarked references found for ASP.NET Core, PostgreSQL, EF Core, Backend Runtime, REST API, Server Database, or Cloud Runtime without Future Architecture labeling.

## Severity

- Medium: roadmap, architecture, README, migration, or deployment wording had conflicting v1 architecture descriptions and was corrected where it was architecture-only.

## Recommendation

- Treat `docs/architecture/ADR-001-PWA-Architecture.md` as the highest architecture source of truth.
- Keep v1 implementation language centered on GitHub Pages, Static PWA, Browser Runtime, Offline First, IndexedDB, Knowledge JSON, Repository Pattern, and Local Calculation Runtime.
- Keep backend, server database, hosted API, cloud persistence, and sync language under Future Architecture only.
- Rebuild generated frontend Knowledge JSON after the architecture wording is accepted, because generated indexes may still reflect older Markdown content.

## Suggested Fix

- Completed architecture-only fixes in `.codex/architecture.md`, `.codex/roadmap.md`, `docs/pwa/GitHubPagesDeployment.md`, `docs/pwa/StaticPwaImplementation.md`, `database/README.md`, and `docs/architecture/ADR-001-PWA-Architecture.md`.
- Suggested next fix: normalize duplicate wording such as `Future Cloud Architecture adapter adapter` and repeated `Future Cloud Mapping` in architecture notices without changing domain semantics.
- Suggested next fix: review old roadmap progress reports as historical records; either mark them as historical snapshots or exclude them from current architecture governance checks.

## Future Architecture

- Future Architecture includes hosted APIs, backend services, cloud persistence, synchronization, AI orchestration, server-side audit history, and remote repository adapters.
- Future Architecture must remain optional and must not be required for PWA v1 startup, dashboard operation, scenario persistence, calculation, formula runtime, recommendation runtime, or Knowledge JSON loading.

## PWA Architecture

- PWA v1 deploys through GitHub Pages as static assets.
- Runtime execution happens in the Browser Runtime.
- Offline First behavior is provided by the service worker, static assets, Knowledge JSON, and IndexedDB Runtime.
- Repository Pattern is retained with IndexedDB adapters for browser-local persistence.
- Local Calculation Runtime owns deterministic calculation, formula, decision, and recommendation execution.

## Legacy Architecture

- Legacy server/backend/database references are valid only when explicitly marked as Future Architecture, Future Cloud Architecture, or Future Cloud Mapping.
- Legacy architecture must not be used as v1 implementation guidance.
- Historical roadmap and progress reports may retain old terms only when clearly treated as historical or future-facing records.