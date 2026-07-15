# Atlas Knowledge Path Governance Report

## Governance Metadata

| Field | Value |
|---|---|
| Decision Date | 2026-07-15T14:47:44+08:00 |
| Repository Root | C:\Users\龔聖華\Downloads\Bran\Git\AtlasEnterprise |
| Decision Authority | Manual Path Governance Decision v1.1 |
| Affected Path | knowledge/entity/; docs/knowledge/entity/ |
| Affected Files | 10 |
| Governance Version | 1.1 |

## Canonical Path Rules

### PG-ENTITY-001
Atlas Enterprise Entity Specifications 的 Canonical Source Root 為 knowledge/entity/。docs/knowledge/entity/ 內與 knowledge/entity/ 同一 Entity Subject 的文件，除非具有明確且可驗證的生成流程與 Mirror Metadata，否則不得宣告為 Canonical 或 Generated Mirror。既有重複文件應治理為 Legacy Superseded Specification，並保留在 Repository Inventory，但不得進入 Active Upgrade Queue。

### PG-ENTITY-002
所有新建或升級的 Entity Enterprise Specification 必須建立於 knowledge/entity/{{EntityName}}.md。不得在 docs/knowledge/entity 建立第二份 Canonical Entity Specification。

### PG-ENTITY-003
docs/knowledge/entity 目前不視為自動生成目錄。除非未來建立正式的 Build、Publish、Copy 或 Synchronization Pipeline，否則不得將該目錄標記為 Generated Mirror。

## Canonical Root

knowledge/entity/

## Legacy Root

docs/knowledge/entity/

## Decision Matrix

| Decision ID | Entity | Canonical File | Legacy File | Decision | Confidence | Reason |
|---|---|---|---|---|---|---|
| MANUAL-PATH-001 | Asset | knowledge/entity/Asset.md | knowledge/entity/Asset.md | CANONICAL_AND_SUPERSEDED | HIGH | Manual governance decision: knowledge/entity is canonical source; docs/knowledge/entity is legacy superseded specification. |
| MANUAL-PATH-002 | Household | knowledge/entity/Household.md | knowledge/entity/Household.md | CANONICAL_AND_SUPERSEDED | HIGH | Manual governance decision: knowledge/entity is canonical source; docs/knowledge/entity is legacy superseded specification. |
| MANUAL-PATH-003 | Liability | knowledge/entity/Liability.md | knowledge/entity/Liability.md | CANONICAL_AND_SUPERSEDED | HIGH | Manual governance decision: knowledge/entity is canonical source; docs/knowledge/entity is legacy superseded specification. |
| MANUAL-PATH-004 | Loan | knowledge/entity/Loan.md | knowledge/entity/Loan.md | CANONICAL_AND_SUPERSEDED | HIGH | Manual governance decision: knowledge/entity is canonical source; docs/knowledge/entity is legacy superseded specification. |
| MANUAL-PATH-005 | Mortgage | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | CANONICAL_AND_SUPERSEDED | HIGH | Manual governance decision: knowledge/entity is canonical source; docs/knowledge/entity is legacy superseded specification. |

## Manifest Remediation

| Metric | Value |
|---|---:|
| Canonical Entries Updated | 5 |
| Legacy Entries Updated | 5 |
| Queue Entries Removed | 0 |
| Queue Entries Restored | 0 |
| Status Restorations | 5 |
| Revalidation Required Entries | 0 |

## Repository Impact

| Metric | Value |
|---|---:|
| Repository Markdown Count | 212 |
| Upgrade Scope Before | 193 |
| Upgrade Scope After | 188 |
| Legacy Specification Count | 5 |
| Remaining Executable Before | 85 |
| Remaining Executable After | 85 |

## Synchronization Policy

目前狀態：

No automated synchronization exists.

規則：

不得宣告 docs/knowledge/entity 為 Generated Mirror。

## Reference Governance

| Source File | Legacy Target | Canonical Replacement | Reference Type | Repair Required |
|---|---|---|---|---|
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Asset.md | knowledge/entity/Asset.md | text-reference | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Household.md | knowledge/entity/Household.md | text-reference | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Liability.md | knowledge/entity/Liability.md | text-reference | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Loan.md | knowledge/entity/Loan.md | text-reference | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | text-reference | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Asset.md | knowledge/entity/Asset.md | text-reference | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Household.md | knowledge/entity/Household.md | text-reference | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Liability.md | knowledge/entity/Liability.md | text-reference | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Loan.md | knowledge/entity/Loan.md | text-reference | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | text-reference | True |

## Future Migration Policy

Legacy 文件目前：

- 保留。
- 不升級。
- 不作為 Source of Truth。
- 不參與 Cross Knowledge Authority。
- 不得被新文件引用。
- 後續可在獨立 Archive Cleanup 階段處理。

## Validation

| Check | Result |
|---|---|
| Manifest Coverage | PASS |
| Queue Integrity | PASS |
| Duplicate Conflict | WARNING |
| Progress Accounting | PASS |
| Phase 2 Readiness | Ready |
