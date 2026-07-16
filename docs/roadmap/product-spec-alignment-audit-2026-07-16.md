# Product Spec Alignment Audit - 2026-07-16

## Scope

- `README.md`
- `docs/roadmap/**`
- `knowledge/**`
- `simulator/**`
- `frontend/**`

## Aligned Capabilities

- PWA: static-first app shell, manifest, service worker, and generated knowledge document loading are represented in README, frontend implementation, and validation reports.
- Offline cache: app shell, dashboard fixtures, knowledge index, and generated document assets are cached and validated.
- Decision dashboard: fixture-backed dashboard, scenario switching, metrics, recommendation state, and next actions align with roadmap and `knowledge/reporting/decision-dashboard.md`.
- Scenario simulator: simulator fixtures, scripts, schema validation, and output validation align with simulation engine and scenario framework knowledge.
- Recommendation, goal, asset, and portfolio domains: entity and supporting documents cover lifecycle, scoring, funding, allocation, valuation, and risk budget concepts.

## Insufficient Alignment

- PWA and offline behavior are mostly documented in implementation and roadmap files, not canonical product knowledge.
- Offline cache lacks a product-level specification for data consistency, cache invalidation, version upgrade, and recovery.
- Dashboard runtime shape is not fully traced from `DashboardSnapshot` fixtures/UI fields back to knowledge specifications.
- Scenario simulator still has known future formula work, including loan amortization and refinancing.
- Some frontend and roadmap Chinese text appears encoded incorrectly, which can weaken visible product/spec alignment.
- No single capability-to-document matrix ties implemented, fixture-backed, documented, and unimplemented states together.

## Recommended Backlog

| Priority | Document | Purpose |
| --- | --- | --- |
| P0 | `knowledge/product/current-capability-matrix.md` | Map implemented, fixture-backed, documented, and unimplemented capabilities. |
| P0 | `knowledge/product/pwa-runtime-capability.md` | Define PWA runtime, manifest, service worker, offline launch, cache scope, and upgrade rules. |
| P0 | `knowledge/product/offline-cache-and-local-state.md` | Define cache invalidation, local state, generated knowledge cache, and recovery behavior. |
| P1 | `knowledge/product/dashboard-snapshot-contract.md` | Map `DashboardSnapshot`, fixtures, UI metrics, recommendations, scenarios, alerts, and knowledge sources. |
| P1 | `knowledge/product/scenario-simulator-runtime-contract.md` | Map simulator fixtures, outputs, formula versions, assumptions, and validation rules. |
| P1 | `docs/roadmap/encoding-cleanup-report.md` | Track visible Chinese encoding cleanup in frontend and roadmap files. |
