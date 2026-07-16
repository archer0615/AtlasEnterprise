# Knowledge Split Worker O Progress Report

## Scope
- `knowledge/supporting/event-driven-architecture.md`
- `knowledge/supporting/event-driven-architecture/**`
- `knowledge/api/api-governance-framework.md`
- `knowledge/api/api-governance/**`
- `knowledge/security/permission-framework.md`
- `knowledge/security/permission-framework/**`

## Split Additions
- Added `knowledge/supporting/event-driven-architecture/operations-and-observability.md` for transaction boundaries, consistency boundaries, observability, security, audit, performance, testing, and edge cases.
- Added `knowledge/supporting/event-driven-architecture/recovery-and-projections.md` for retry, dead letter, replay, projection, read model, cache invalidation, search index update, and coordination recovery behavior.
- Added `knowledge/api/api-governance/versioning-and-compatibility.md` for API version strategy, compatibility, content negotiation, serialization conventions, OpenAPI, and compatibility testing.
- Added `knowledge/api/api-governance/query-and-mutation-controls.md` for query controls, pagination, sorting, filtering, search, bulk operation, idempotency, concurrency, caching, rate limiting, and command mutation safety.
- Added `knowledge/security/permission-framework/evaluation-and-cache.md` for deterministic evaluation, explicit deny/default deny handling, inheritance, cache, performance, and executable evaluation contracts.
- Added `knowledge/security/permission-framework/integration-boundaries.md` for permission use across APIs, UI, services, repositories, commands, events, workflows, jobs, notifications, audit, and integrations.

## Parent Navigation Updates
- Updated Event Driven Architecture Split Navigation with operations/observability and recovery/projections child documents.
- Updated API Governance Framework Split Navigation with versioning/compatibility and query/mutation child documents.
- Updated Permission Framework Split Navigation with evaluation/cache and integration boundary child documents.

## Split Reasons
- Event-driven operations and recovery were separated because the parent already had delivery and flow children, while observability, recovery, projections, and read model behavior still needed independently readable operational guidance.
- API versioning and query/mutation controls were separated because the parent already had broad standards and resource catalog children, while compatibility and runtime safety controls are distinct governance concerns.
- Permission evaluation and integration boundaries were separated because the parent already had catalog/matrix/governance children, while authorization decision execution and cross-boundary permission enforcement are distinct operational concerns.

## Verification
- Confirmed each target parent retains `## Split Navigation` at the top.
- Confirmed each new child file is linked from its parent Split Navigation.
- Confirmed parent body content was preserved; only navigation links were added.
- Confirmed no `frontend/knowledge/**`, package files, lockfiles, or git commits were touched.

