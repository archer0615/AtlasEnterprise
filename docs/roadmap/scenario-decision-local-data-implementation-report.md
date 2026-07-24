# Scenario Decision Local Data Implementation Report

Starting commit: 71dc590ddbe6e9165faf90b9eeea81b8c6a510f7

Ending commit: pending commit at implementation time.

Canonical Scenario properties: id, scenarioId, ownerId, name, type, status, description, baseScenarioId, goalId, assumptions, projectionHorizon, createdAt, updatedAt, archivedAt, version.

Canonical Decision properties: id, decisionId, ownerId, title, type, status, scenarioId, goalId, recommendationId, selectedOption, rationale, decisionDate, effectiveDate, reviewDate, createdAt, updatedAt, archivedAt, version.

Catalog conflicts: existing local persistence uses `scenarioId` and `recommendationDecisions`; the implementation preserves those aliases for backup compatibility.

Schema version: existing IndexedDB runtime schema retained.

Stores: scenarios, recommendationDecisions, auditEntries.

Indexes: existing runtime store indexes retained.

Commands: CreateScenario, UpdateScenario, ArchiveScenario, RestoreScenario, ActivateScenario, DeactivateScenario, CreateDecision, UpdateDecision, ArchiveDecision, RecordRecommendationDecision.

Events: ScenarioCreated, ScenarioUpdated, ScenarioStatusChanged, DecisionCreated, DecisionUpdated, DecisionTransitionSucceeded, DecisionTransitionFailed, RecommendationDecisionRecorded.

Scenario lifecycle rules: draft to active/archived, active to inactive/archived, inactive to active/archived, archived to inactive.

Decision transition rules: draft to under-review/cancelled/archived, under-review to committed/cancelled/archived, committed to completed/cancelled, completed/cancelled to archived.

Assumptions implemented: cashflow income/expense percentage change, goal-impact monthly contribution change, risk liquidity reserve months, baseline none.

Projection rules: projection results remain derived from local data; stored scenario records contain input assumptions only.

Comparison rules: no automatic selection, no new ranking formula.

Constraint rules: no new constraint rule added.

Scoring availability: no scoring formula added.

Explainability evidence: user rationale required by transitions.

Audit evidence: create, update, transition success/failure, and recommendation disposition events are written to audit repository.

Tests: test:scenario-decision-domain and test:scenario-decision-application added to all validation profiles.

Validation results: pending final validation run.

Performance results: pending full validation run.

Visual results: pending visual regression run.

Known limitations: existing IndexedDB runtime has no separate `decisions` store; Decision command service is repository-contract ready and preserves current recommendation decision persistence compatibility.
