# Scenario Decision Runtime

Purpose: provide a static-first, local-first, offline-first runtime slice for Scenario, Decision, RecommendationDecision, and Decision Audit without adding backend services, fixture fallback, scoring formulas, or automatic decision making.

Canonical Specification: Scenario and Decision contracts are traced to `knowledge/entity/*`, scenario and comparison frameworks, decision principles, decision history, decision audit, projection, constraint, scoring, and explainability knowledge files.

Aggregate Boundary: Scenario is treated as persisted user-defined assumptions and decision context. Scenario Projection remains a derived runtime result. Decision is a persisted decision aggregate. RecommendationDecision is persisted recommendation disposition evidence. Decision Audit is append-only evidence.

Ownership: command services resolve the current owner through the existing owner provider and reject records not owned by that owner.

Scenario Contract: `frontend/src/domain/scenario/*` defines identity, owner, name, type, status, assumptions, projection horizon, timestamps, lifecycle, normalization, and validation.

Decision Contract: `frontend/src/domain/decision/*` defines identity, owner, title, type, status, references, selected option, rationale, dates, normalization, validation, and state transitions.

RecommendationDecision Contract: recommendation dispositions are immutable evidence records with owner, recommendation reference, optional scenario reference, disposition, rationale, and decided timestamp.

Scenario Lifecycle: draft can activate or archive; active can deactivate or archive; inactive can activate or archive; archived can restore to inactive.

Decision State Machine: draft can enter review, cancel, or archive; under-review can commit, cancel, or archive; committed can complete or cancel; terminal records can archive. Rationale and selected option evidence are enforced by transition rule.

Validation: domain validation is pure, rejects unknown scenario assumptions, validates bounded numeric inputs, validates date periods, validates lifecycle timestamps, and returns stable Atlas error envelopes.

Commands: scenario and decision application services create, update, transition, archive, restore, activate/deactivate scenarios, and record recommendation dispositions through repositories.

Domain Events: command services write audit entries for ScenarioCreated, ScenarioUpdated, ScenarioStatusChanged, DecisionCreated, DecisionUpdated, DecisionTransitionSucceeded, DecisionTransitionFailed, and RecommendationDecisionRecorded.

Repositories: repository contracts now include owner-aware query and aggregate create/update operations while preserving existing IndexedDB compatibility.

IndexedDB Schema: existing `scenarios`, `recommendationDecisions`, and `auditEntries` stores remain the local persistence boundary. No remote database is introduced.

Application Services: services do not access DOM or IndexedDB directly and only depend on repository contracts, owner provider, audit repository, clock, and id generator.

Scenario Projection: scenario records store assumptions and horizon only; projection output is recomputed from local financial data and is not stored as stale snapshot.

Assumption Application: assumptions are catalog-bounded by scenario type and reject unknown keys.

Scenario Comparison: comparison remains derived runtime behavior and cannot automatically select a scenario.

Constraint Evaluation: constraints remain evidence inputs and no new constraint rule is added.

Scoring Boundary: existing scoring policy is not changed. Missing scoring capability must be surfaced as unavailable rather than fabricated.

Decision Explainability: rationale is user evidence and is never generated automatically.

Scenario Feature: feature UI can call command services but does not decide lifecycle transitions itself.

Decision Workbench: transition controls must use the state-machine result and show illegal transition failures.

Goal Boundary: decisions may reference goals but commands do not modify goals.

Execution Boundary: decisions do not create execution plans or action plans.

Dashboard Integration: dashboard data must be read from local repositories with empty and warning states when data is incomplete.

Backup and Restore: existing backup includes scenarios, recommendation decisions, and audit entries with dry-run and legacy compatibility.

Decision Audit: rationale and transition evidence are preserved in audit metadata without storing backup payloads or secrets.

Security: no external transmission, no secrets in audit entries, no service worker caching of user data.

Offline Behavior: domain, application, repository, projection, and comparison code are static modules and run offline against IndexedDB.

Dependency Direction: domain has no DOM, IndexedDB, feature, or fixture imports. Application depends on domain and repository contracts.

Illegal Dependencies: UI must not access IndexedDB directly, mutate decision status directly, or fallback to fixture data on runtime errors.
