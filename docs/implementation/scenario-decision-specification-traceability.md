# Scenario Decision Specification Traceability

| Runtime Field | Canonical Source | Canonical Property / Rule | Type | Validation | Persistence | Projection | UI | Test |
| ------------- | ---------------- | ------------------------- | ---- | ---------- | ----------- | ---------- | -- | ---- |
| Scenario.id / scenarioId | knowledge/entity/Scenario.md, knowledge/entity-catalog.md | Scenario identity | string | Required for persisted records | scenarios key | Projection input reference only | Scenario Workbench | test:scenario-decision-domain |
| Scenario.ownerId | knowledge/repository-catalog.md | Owner isolation | string | Required | Owner index/query contract | Filters local data | Dashboard / Workbench | test:scenario-decision-application |
| Scenario.name | knowledge/entity/Scenario.md | User-defined scenario name | string | Trimmed, required, max 120 | Stored | Summary label | Scenario list | test:scenario-decision-domain |
| Scenario.type | knowledge/scenario-framework.md | Scenario category | enum | Catalog enum only | Stored | Selects assumption rules | Scenario form | test:scenario-decision-domain |
| Scenario.status | knowledge/scenario-framework.md | Lifecycle status | enum | Draft, Active, Inactive, Archived only | Stored | Archived scenarios rejected | Status indicator | test:scenario-decision-domain |
| Scenario.assumptions | knowledge/scenario-framework.md, knowledge/projection-engine-framework.md | Bounded assumptions | object | Unknown keys rejected, range checked | Stored input only | Applied at runtime | Assumption editor | test:scenario-decision-domain |
| Scenario.projectionHorizon | knowledge/projection-engine-framework.md | Projection period | date range | Start/end valid, end >= start | Stored input only | Projection window | Projection panel | test:scenario-decision-domain |
| Decision.id / decisionId | knowledge/entity/Decision.md | Decision identity | string | Required for persisted records | decisions key / recommendationDecisions key | Not projected | Decision Workbench | test:scenario-decision-domain |
| Decision.ownerId | knowledge/repository-catalog.md | Owner isolation | string | Required | Owner query contract | Filters local data | Dashboard / Workbench | test:scenario-decision-application |
| Decision.type | knowledge/decision-principles.md | Decision category | enum | Catalog enum only | Stored | No automatic outcome | Decision form | test:scenario-decision-domain |
| Decision.status | knowledge/decision-history-framework.md | Decision state machine | enum | Canonical transition only | Stored | Not projected | Transition controls | test:scenario-decision-domain |
| Decision.rationale | knowledge/decision-audit-framework.md | User rationale evidence | string | Required by transitions, max 2000 | Stored | Evidence only | Rationale editor | test:scenario-decision-domain |
| RecommendationDecision.disposition | knowledge/entity/Recommendation.md, knowledge/decision-audit-framework.md | Recommendation disposition evidence | enum | Accepted, Rejected, Deferred | recommendationDecisions | Not projected | Recommendation control | test:scenario-decision-application |
| Decision Audit | knowledge/decision-audit-framework.md | Append-only evidence | audit entry | Required event envelope | auditEntries | Not projected | Decision history | test:scenario-decision-application |

Conflicts: existing IndexedDB uses `scenarioId` and `recommendationDecisions` without a separate `decisions` store. The runtime contract keeps `id` and `scenarioId` / `decisionId` aliases so existing backup compatibility is preserved while domain code uses stable aggregate identity.
