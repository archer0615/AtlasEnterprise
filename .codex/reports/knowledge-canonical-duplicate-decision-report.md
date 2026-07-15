# Atlas Canonical Duplicate Decision Report

## Decision Metadata

| Field | Value |
|---|---|
| Phase | Manual Path Governance Decision & Canonical Duplicate Remediation |
| Repository Root | C:\Users\龔聖華\Downloads\Bran\Git\AtlasEnterprise |
| Started At | 2026-07-15T14:47:44+08:00 |
| Completed At | 2026-07-15T14:48:44+08:00 |
| Duplicate Group Count | 5 |
| Affected File Count | 10 |

## Governance Sources Reviewed

- docs/specification/00-Specification-Index.md
- .codex/reports/knowledge-canonical-duplicate-decision-report.md
- .codex/reports/knowledge-progress-reconciliation-report.md
- .codex/reports/knowledge-upgrade-health-report.md
- .codex/reports/knowledge-upgrade-report.md
- .codex/reports/knowledge-inventory-reconciliation-report.md
- .codex/reports/knowledge-repository-validation-report.md
- 10 duplicate candidate files

## Executive Result

| Result | Count |
|---|---:|
| Resolved Groups | 5 |
| Unresolved Groups | 0 |
| Canonical and Mirror | 0 |
| Canonical and Supporting | 0 |
| Canonical and Superseded | 5 |
| Related but Distinct | 0 |
| Canonical Conflicts | 0 |
| Path Governance Conflicts | 0 |
| Manual Domain Decisions | 0 |

## Decision Groups

### Group MANUAL-PATH-001

Decision: CANONICAL_AND_SUPERSEDED
Canonical File: knowledge/entity/Asset.md
Secondary File: knowledge/entity/Asset.md
Secondary Role: LEGACY_SUPERSEDED_SPECIFICATION
Confidence: HIGH
Manual Decision: RESOLVED
Path Governance Rule: PG-ENTITY-001
Authority Evidence: Manual governance v1.1 selected knowledge/entity as Canonical Source Root; docs/knowledge/entity has no generated mirror evidence and is retained only as legacy superseded specification.
Risk: Legacy file retained but excluded from Active Queue and Cross Knowledge Authority.
Next Action: Phase 2 — Knowledge Upgrade Batch Execution

### Group MANUAL-PATH-002

Decision: CANONICAL_AND_SUPERSEDED
Canonical File: knowledge/entity/Household.md
Secondary File: knowledge/entity/Household.md
Secondary Role: LEGACY_SUPERSEDED_SPECIFICATION
Confidence: HIGH
Manual Decision: RESOLVED
Path Governance Rule: PG-ENTITY-001
Authority Evidence: Manual governance v1.1 selected knowledge/entity as Canonical Source Root; docs/knowledge/entity has no generated mirror evidence and is retained only as legacy superseded specification.
Risk: Legacy file retained but excluded from Active Queue and Cross Knowledge Authority.
Next Action: Phase 2 — Knowledge Upgrade Batch Execution

### Group MANUAL-PATH-003

Decision: CANONICAL_AND_SUPERSEDED
Canonical File: knowledge/entity/Liability.md
Secondary File: knowledge/entity/Liability.md
Secondary Role: LEGACY_SUPERSEDED_SPECIFICATION
Confidence: HIGH
Manual Decision: RESOLVED
Path Governance Rule: PG-ENTITY-001
Authority Evidence: Manual governance v1.1 selected knowledge/entity as Canonical Source Root; docs/knowledge/entity has no generated mirror evidence and is retained only as legacy superseded specification.
Risk: Legacy file retained but excluded from Active Queue and Cross Knowledge Authority.
Next Action: Phase 2 — Knowledge Upgrade Batch Execution

### Group MANUAL-PATH-004

Decision: CANONICAL_AND_SUPERSEDED
Canonical File: knowledge/entity/Loan.md
Secondary File: knowledge/entity/Loan.md
Secondary Role: LEGACY_SUPERSEDED_SPECIFICATION
Confidence: HIGH
Manual Decision: RESOLVED
Path Governance Rule: PG-ENTITY-001
Authority Evidence: Manual governance v1.1 selected knowledge/entity as Canonical Source Root; docs/knowledge/entity has no generated mirror evidence and is retained only as legacy superseded specification.
Risk: Legacy file retained but excluded from Active Queue and Cross Knowledge Authority.
Next Action: Phase 2 — Knowledge Upgrade Batch Execution

### Group MANUAL-PATH-005

Decision: CANONICAL_AND_SUPERSEDED
Canonical File: knowledge/entity/Mortgage.md
Secondary File: knowledge/entity/Mortgage.md
Secondary Role: LEGACY_SUPERSEDED_SPECIFICATION
Confidence: HIGH
Manual Decision: RESOLVED
Path Governance Rule: PG-ENTITY-001
Authority Evidence: Manual governance v1.1 selected knowledge/entity as Canonical Source Root; docs/knowledge/entity has no generated mirror evidence and is retained only as legacy superseded specification.
Risk: Legacy file retained but excluded from Active Queue and Cross Knowledge Authority.
Next Action: Phase 2 — Knowledge Upgrade Batch Execution


## Canonical Source Matrix

| Subject | Canonical File | Secondary File | Secondary Role | Confidence | Evidence |
|---|---|---|---|---|---|
| Asset | knowledge/entity/Asset.md | knowledge/entity/Asset.md | LEGACY_SUPERSEDED_SPECIFICATION | HIGH | PG-ENTITY-001 manual governance decision |
| Household | knowledge/entity/Household.md | knowledge/entity/Household.md | LEGACY_SUPERSEDED_SPECIFICATION | HIGH | PG-ENTITY-001 manual governance decision |
| Liability | knowledge/entity/Liability.md | knowledge/entity/Liability.md | LEGACY_SUPERSEDED_SPECIFICATION | HIGH | PG-ENTITY-001 manual governance decision |
| Loan | knowledge/entity/Loan.md | knowledge/entity/Loan.md | LEGACY_SUPERSEDED_SPECIFICATION | HIGH | PG-ENTITY-001 manual governance decision |
| Mortgage | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | LEGACY_SUPERSEDED_SPECIFICATION | HIGH | PG-ENTITY-001 manual governance decision |

## Unresolved Human Decisions

無

## Required Remediation Actions

- Canonical Reference Remediation for any remaining references to docs/knowledge/entity legacy files.
- Future Archive Cleanup may handle retained legacy files in a separate phase.

## Phase 2 Readiness

Ready

## Required Next Action

Phase 2 — Knowledge Upgrade Batch Execution
