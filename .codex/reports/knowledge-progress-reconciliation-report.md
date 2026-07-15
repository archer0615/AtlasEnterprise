# Atlas Progress Reconciliation Report

## Execution Metadata

| Field | Value |
|---|---|
| Phase | Phase 2B |
| Started At | 2026-07-15T14:09:15+08:00 |
| Completed At | 2026-07-15T14:09:45+08:00 |
| Repository Root | C:\Users\龔聖華\Downloads\Bran\Git\AtlasEnterprise |
| Manifest Version | 2.1 |

## Initial Health

| Area | Status |
|---|---|
| Repository | PASS |
| Manifest | PASS |
| Queue | PASS |
| Catalog | PASS |
| Duplicate | WARNING |
| Progress | FAIL |
| Overall Health | FAIL |

## Scope Accounting

| Metric | Value |
|---|---:|
| Actual Markdown Count | 210 |
| Upgrade Scope Count | 193 |
| Control Document Count | 11 |
| Informational Complete Count | 6 |
| Other Non-Upgrade Count | 0 |
| Scope Accounting Result | PASS |

## Upgrade Status Accounting

| Status | Count |
|---|---:|
| Complete | 69 |
| Needs Minor Update | 95 |
| Needs Major Upgrade | 19 |
| Rewrite Required | 10 |
| Catalog Blocked | 0 |
| Manual Decision Required | 0 |
| Duplicate or Superseded | 0 |
| Validation Failed | 0 |
| Revalidation Required | 0 |
| Accounted Total | 193 |
| Upgrade Scope Total | 193 |
| Difference | 0 |

## Progress Errors Found

- Initial error: scopeStatistics.upgradeScope was 176 while mutually exclusive upgrade statuses accounted for 193.
- Initial error: Remaining Executable was incorrectly used in Health Check formula as an independent status.
- Post-repair Progress Accounting Error List count: 0

## Automatic Repairs

| Path | Field | Previous Value | New Value | Reason |
|---|---|---|---|---|
| .codex/reports/knowledge-upgrade-health-report.md | inventory |  | CONTROL_DOCUMENT entry | Allowed Phase 2B report file added to Manifest so repository and manifest counts remain aligned. |
| .codex/reports/knowledge-progress-reconciliation-report.md | inventory |  | CONTROL_DOCUMENT entry | Allowed Phase 2B report file added to Manifest so repository and manifest counts remain aligned. |
| .codex/architecture-pwa.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/architecture.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/database-pwa.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/deployment-pages.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/policies/development-rules.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/project.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/prompts/prompt.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/roadmap.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/policies/testing-rules.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| ai/README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| backend/README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| database/README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/00-Specification-Index.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/00-Vision.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/01-Blueprint.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/02-IPS.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/03-Formula.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/04-DomainModel.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/04A-DomainInventory.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/database/05-DatabaseDesign.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/database/06-ERD.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| docs/api/07-API.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/08A-CashFlowEngine-Architecture.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/08B-CashFlowEngine-Formula.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/08C-CashFlowEngine-DecisionRules.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/api/08D-CashFlowEngine-API.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/specification/08E-CashFlowEngine-Testing.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/roadmap/20-Roadmap.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/architecture/ADR-001-Local-First-PWA.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/action-planning-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/aggregate-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/api/api-governance-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/application-service-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/asset-allocation-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/assumptions.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/security/audit-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/automation-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/background-job-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/backup-recovery-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/bounded-context-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/business-calendar-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/cache-strategy-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/calculation-engine-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/capability-matrix.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/api/capital-allocation-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/cash-reserve-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/cashflow.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/command-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/compliance-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/configuration-management-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/constraint-rules.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/dashboard-widget-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/data-governance-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/data-retention-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/database-governance-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-analytics.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/security/decision-audit-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/decision-dashboard.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-evaluation.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-execution.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-governance.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/decision-history-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-insights.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/decision-learning-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-lifecycle.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-matrix.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/decision-metrics-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-optimization.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/decision-principles.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/decision-reporting.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/rule/decision-rule-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/workflow/decision-workflow.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/domain-event-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/domain-model-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/rule/domain-rule-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/domain-service-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/emergency-fund-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/entity-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/ActionPlan.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Asset.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Decision.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/ExecutionPlan.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Goal.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Household.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Liability.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Loan.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Mortgage.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Notification.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Recommendation.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Scenario.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/User_p1.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/User_p2.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/User_p3.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/User.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/enumeration-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/event-driven-architecture.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/event-taxonomy.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/execution-plan-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/explainability-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/fcn.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/feature-flag-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/financial-alert-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/financial-dashboard-metrics.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/financial-dependency-model.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/financial-formula-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/financial-health-score.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/financial-milestone-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/financial-philosophy.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/financial-projection-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/financial-ratio-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/financial-ratios.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/glossary.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-analytics.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-conflict-resolution.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/goal-dashboard.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-dependency.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/goal-execution-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/goal-funding-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-governance.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-insights.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-lifecycle-management.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-lifecycle.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/goal-metrics.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-optimization.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-prioritization.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-progress-tracking.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/goal-reporting.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/goal-review-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/goal-review.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/rule/home-upgrade-rule-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/house-decision-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/integration/integration-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/investment-policy.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/reporting/kpi-definitions.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/life-goals.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/life-stage-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/life-stage-model.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/liquidity-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/rule/loan-decision-rule-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/loan.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/market-assumptions.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/message-contract-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/net-worth-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/notification-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/optimization-engine-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/security/permission-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/policy-management-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/portfolio-lifecycle.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/portfolio-performance-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/portfolio.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/projection-engine-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/property.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/rebalancing-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/recommendation-evaluation.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/recommendation-execution.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/recommendation-lifecycle.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/recommendation-priority-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/repository-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/retirement.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/risk-budget-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/risk-capacity-model.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/risk-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/rule-engine-architecture.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/rule-expression-language.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/scenario-comparison-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/scenario-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/scheduler-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/scoring-model.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/security/security-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/service-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/simulation-engine-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/system-configuration-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/system-module-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/taiwan-financial-assumptions.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/taiwan-market-data-sources.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/taiwan-mortgage.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/taiwan-tax.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/security/tenant-framework.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/supporting/terminology.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/framework/user-journey-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/catalog/value-object-catalog.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/rule/withdrawal-rule-catalog.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/engine/workflow-engine-framework.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/00-PWA-Overview.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/AppManifest.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/BackupRestore.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/CacheStrategy.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/DataMigration.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/GitHubPagesDeployment.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/IndexedDBDesign.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/OfflineStrategy.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/Security.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/ServiceWorker.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| docs/pwa/UpdateStrategy.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| frontend/README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Asset.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Household.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Liability.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Loan.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Mortgage.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Portfolio.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| knowledge/entity/Position.md | dependencyReady |  | False | Dependency readiness calculated from Manifest dependencies. |
| .codex/reports/knowledge-inventory-reconciliation-report.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/reports/knowledge-repository-validation-report.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/reports/knowledge-upgrade-batch-report.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| .codex/reports/knowledge-upgrade-report.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| simulator/README.md | dependencyReady |  | True | Dependency readiness calculated from Manifest dependencies. |
| queue | activeQueue | 124 | 90 | Active Queue regenerated from eligible non-completed, non-blocked, dependency-ready upgrade statuses. |
| repository | actualMarkdownCount | 208 | 210 | Repository markdown count reconciled with allowed Phase 2B report files. |
| repository | manifestEntryCount | 208 | 210 | Manifest entry count reconciled with inventory. |
| summary | remainingExecutable | 124 | 90 | Summary recalculated from inventory and active queue. |
| summary | controlDocument | 9 | 11 | Summary recalculated from inventory and active queue. |
| scopeStatistics | upgradeScope | 176 | 193 | Upgrade Scope recalculated from mutually exclusive upgrade statuses. |
| scopeStatistics | controlDocuments | 9 | 11 | Control document count recalculated from inventory. |

## Queue Reconciliation

| Metric | Value |
|---|---:|
| Previous Queue Count | 124 |
| New Queue Count | 90 |
| Removed Invalid Entries | 0 |
| Added Missing Entries | 0 |
| Duplicate Queue Entries Removed | 0 |
| Waiting For Dependency | 34 |
| Remaining Executable | 90 |

## Duplicate Analysis

Files: knowledge/entity/Asset.md, knowledge/entity/Asset.md
Canonical Claims: Same entity name and H1 entity specification; no explicit superseded marker found.
Similarity: High
Classification: DUPLICATE_CANONICAL_SPECIFICATION
Evidence: # Asset Entity Specification | # Asset Entity Specification
Manifest Action: No automatic status change; Canonical Authority requires human decision.
Human Decision Required: True

Files: knowledge/entity/Household.md, knowledge/entity/Household.md
Canonical Claims: Same entity name and H1 entity specification; no explicit superseded marker found.
Similarity: High
Classification: DUPLICATE_CANONICAL_SPECIFICATION
Evidence: # Household Entity Specification | # Household Entity Specification
Manifest Action: No automatic status change; Canonical Authority requires human decision.
Human Decision Required: True

Files: knowledge/entity/Liability.md, knowledge/entity/Liability.md
Canonical Claims: Same entity name and H1 entity specification; no explicit superseded marker found.
Similarity: High
Classification: DUPLICATE_CANONICAL_SPECIFICATION
Evidence: # Liability Entity Specification | # Liability Entity Specification
Manifest Action: No automatic status change; Canonical Authority requires human decision.
Human Decision Required: True

Files: knowledge/entity/Loan.md, knowledge/entity/Loan.md
Canonical Claims: Same entity name and H1 entity specification; no explicit superseded marker found.
Similarity: High
Classification: DUPLICATE_CANONICAL_SPECIFICATION
Evidence: # Loan Entity Specification | # Loan Entity Specification
Manifest Action: No automatic status change; Canonical Authority requires human decision.
Human Decision Required: True

Files: knowledge/entity/Mortgage.md, knowledge/entity/Mortgage.md
Canonical Claims: Same entity name and H1 entity specification; no explicit superseded marker found.
Similarity: High
Classification: DUPLICATE_CANONICAL_SPECIFICATION
Evidence: # Mortgage Entity Specification | # Mortgage Entity Specification
Manifest Action: No automatic status change; Canonical Authority requires human decision.
Human Decision Required: True


## Unresolved Issues

- Duplicate Canonical Specification groups require manual Canonical Authority decision: 5

## Final Health

| Area | Status |
|---|---|
| Repository | PASS |
| Manifest | PASS |
| Queue | PASS |
| Catalog | PASS |
| Duplicate | FAIL |
| Progress | PASS |
| Overall Health | FAIL |

## Phase 2 Readiness

Not Ready

## Continuation Pointers

- Last Completed File: knowledge/catalog/command-catalog.md
- Next Executable File: docs/database/05-DatabaseDesign.md

## Required Next Action

Manual Canonical Duplicate Decision


## Path Governance Remediation

- PG-ENTITY-001/002/003 applied.
- Resolved Duplicate Groups: 5
- Path Governance Conflict: 0
- Duplicate Health: WARNING
- Phase 2 Readiness: Ready

