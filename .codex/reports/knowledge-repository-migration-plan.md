# Atlas Repository Migration Plan

## Migration Objective

Normalize repository structure so knowledge/ is the canonical Atlas Knowledge root, docs/ is project documentation, and .codex/ owns pipeline control and reports.

## Preconditions

- No active Phase 2 upgrade during migration planning.
- No file moves, renames, deletes, or Markdown link edits in Phase 1C.
- Migration map must be reviewed before Batch S1.

## Current Statistics

| Metric | Value |
|---|---:|
| Total Files | 215 |
| Markdown Files | 214 |
| JSON Files | 3 |
| Max Directory Depth | 4 |
| Empty Directories | 1 |
| Case Conflicts | 0 |
| Same Filename Groups | 7 |
| Legacy References | 464 |

## Target Statistics

| Decision | Count |
|---|---:|
| KEEP | 34 |
| MOVE | 175 |
| RENAME | 0 |
| MOVE_AND_RENAME | 0 |
| SUPERSEDE | 5 |
| ARCHIVE_CANDIDATE | 0 |
| GENERATED_OUTPUT | 0 |
| MANUAL_DECISION_REQUIRED | 0 |

## Complete File Migration Matrix

| Current Path | Target Path | Artifact Class | Migration Decision | Canonical | Canonical Subject | Superseded By | Reason | Reference Count | Path Conflict | Content Conflict | Migration Risk | Migration Batch | Validation Required |
|---|---|---|---|---|---|---|---|---:|---|---|---|---|---|
| .codex/architecture-pwa.md | .codex/architecture-pwa.md | CODEX_CONTROL_DOCUMENT | KEEP | False | architecture-pwa |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/architecture.md | .codex/architecture.md | CODEX_CONTROL_DOCUMENT | KEEP | False | architecture |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/database-pwa.md | .codex/database-pwa.md | CODEX_CONTROL_DOCUMENT | KEEP | False | database-pwa |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/deployment-pages.md | .codex/deployment-pages.md | CODEX_CONTROL_DOCUMENT | KEEP | False | deployment-pages |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/policies/development-rules.md | .codex/policies/development-rules.md | CODEX_CONTROL_DOCUMENT | KEEP | False | development-rules |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/project.md | .codex/project.md | CODEX_CONTROL_DOCUMENT | KEEP | False | project |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/prompts/prompt.md | .codex/prompts/prompt.md | CODEX_CONTROL_DOCUMENT | KEEP | False | prompt |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/roadmap.md | .codex/roadmap.md | CODEX_CONTROL_DOCUMENT | KEEP | False | roadmap |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/policies/testing-rules.md | .codex/policies/testing-rules.md | CODEX_CONTROL_DOCUMENT | KEEP | False | testing-rules |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| ai/README.md | ai/README.md | INFORMATIONAL_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| backend/README.md | backend/README.md | INFORMATIONAL_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| database/README.md | database/README.md | INFORMATIONAL_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/specification/00-Specification-Index.md | docs/specification/00-Specification-Index.md | SYSTEM_SPECIFICATION | MOVE | False | 00-Specification-Index |  | docs normalization | 2 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/00-Vision.md | docs/specification/00-Vision.md | SYSTEM_SPECIFICATION | MOVE | False | 00-Vision |  | docs normalization | 2 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/01-Blueprint.md | docs/specification/01-Blueprint.md | SYSTEM_SPECIFICATION | MOVE | False | 01-Blueprint |  | docs normalization | 3 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/02-IPS.md | docs/specification/02-IPS.md | SYSTEM_SPECIFICATION | MOVE | False | 02-IPS |  | docs normalization | 3 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/03-Formula.md | docs/specification/03-Formula.md | SYSTEM_SPECIFICATION | MOVE | False | 03-Formula |  | docs normalization | 5 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | SYSTEM_SPECIFICATION | MOVE | False | 04-DomainModel |  | docs normalization | 31 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | SYSTEM_SPECIFICATION | MOVE | False | 04A-DomainInventory |  | docs normalization | 13 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | DATABASE_DOCUMENT | MOVE | False | 05-DatabaseDesign |  | docs normalization | 39 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/database/06-ERD.md | docs/database/06-ERD.md | DATABASE_DOCUMENT | MOVE | False | 06-ERD |  | docs normalization | 33 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/api/07-API.md | docs/api/07-API.md | API_DOCUMENT | MOVE | False | 07-API |  | docs normalization | 35 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | SYSTEM_SPECIFICATION | MOVE | False | 08A-CashFlowEngine-Architecture |  | docs normalization | 5 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | SYSTEM_SPECIFICATION | MOVE | False | 08B-CashFlowEngine-Formula |  | docs normalization | 6 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | SYSTEM_SPECIFICATION | MOVE | False | 08C-CashFlowEngine-DecisionRules |  | docs normalization | 5 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | API_DOCUMENT | MOVE | False | 08D-CashFlowEngine-API |  | docs normalization | 5 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | SYSTEM_SPECIFICATION | MOVE | False | 08E-CashFlowEngine-Testing |  | docs normalization | 5 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/roadmap/20-Roadmap.md | docs/roadmap/20-Roadmap.md | ROADMAP_DOCUMENT | MOVE | False | 20-Roadmap |  | docs normalization | 1 | False | False | MEDIUM | S7 | path-exists, reference-check |
| docs/architecture/ADR-001-Local-First-PWA.md | docs/architecture/ADR-001-Local-First-PWA.md | ARCHITECTURE_DOCUMENT | KEEP | False | ADR-001-Local-First-PWA |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/framework/action-planning-framework.md | knowledge/framework/action-planning-framework.md | CANONICAL_FRAMEWORK | MOVE | True | action-planning-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/aggregate-catalog.md | knowledge/catalog/aggregate-catalog.md | CANONICAL_CATALOG | MOVE | True | aggregate-catalog |  | Legacy knowledge root migration | 3 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/api/api-governance-framework.md | knowledge/api/api-governance-framework.md | CANONICAL_API | MOVE | True | api-governance-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/application-service-catalog.md | knowledge/catalog/application-service-catalog.md | CANONICAL_CATALOG | MOVE | True | application-service-catalog |  | Legacy knowledge root migration | 3 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/asset-allocation-framework.md | knowledge/framework/asset-allocation-framework.md | CANONICAL_FRAMEWORK | MOVE | True | asset-allocation-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/assumptions.md | knowledge/supporting/assumptions.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | assumptions |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/security/audit-framework.md | knowledge/security/audit-framework.md | CANONICAL_SECURITY | MOVE | True | audit-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/automation-framework.md | knowledge/framework/automation-framework.md | CANONICAL_FRAMEWORK | MOVE | True | automation-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/background-job-framework.md | knowledge/framework/background-job-framework.md | CANONICAL_FRAMEWORK | MOVE | True | background-job-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/backup-recovery-framework.md | knowledge/framework/backup-recovery-framework.md | CANONICAL_FRAMEWORK | MOVE | True | backup-recovery-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/bounded-context-catalog.md | knowledge/catalog/bounded-context-catalog.md | CANONICAL_CATALOG | MOVE | True | bounded-context-catalog |  | Legacy knowledge root migration | 4 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/business-calendar-framework.md | knowledge/framework/business-calendar-framework.md | CANONICAL_FRAMEWORK | MOVE | True | business-calendar-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/cache-strategy-framework.md | knowledge/framework/cache-strategy-framework.md | CANONICAL_FRAMEWORK | MOVE | True | cache-strategy-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/engine/calculation-engine-framework.md | knowledge/engine/calculation-engine-framework.md | CANONICAL_ENGINE | MOVE | True | calculation-engine-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/supporting/capability-matrix.md | knowledge/supporting/capability-matrix.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | capability-matrix |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/api/capital-allocation-framework.md | knowledge/api/capital-allocation-framework.md | CANONICAL_API | MOVE | True | capital-allocation-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/cash-reserve-framework.md | knowledge/framework/cash-reserve-framework.md | CANONICAL_FRAMEWORK | MOVE | True | cash-reserve-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/cashflow.md | knowledge/supporting/cashflow.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | cashflow |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/catalog/command-catalog.md | knowledge/catalog/command-catalog.md | CANONICAL_CATALOG | MOVE | True | command-catalog |  | Legacy knowledge root migration | 4 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/compliance-framework.md | knowledge/framework/compliance-framework.md | CANONICAL_FRAMEWORK | MOVE | True | compliance-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/configuration-management-framework.md | knowledge/framework/configuration-management-framework.md | CANONICAL_FRAMEWORK | MOVE | True | configuration-management-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/constraint-rules.md | knowledge/supporting/constraint-rules.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | constraint-rules |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/catalog/dashboard-widget-catalog.md | knowledge/catalog/dashboard-widget-catalog.md | CANONICAL_CATALOG | MOVE | True | dashboard-widget-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/data-governance-framework.md | knowledge/framework/data-governance-framework.md | CANONICAL_FRAMEWORK | MOVE | True | data-governance-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/data-retention-framework.md | knowledge/framework/data-retention-framework.md | CANONICAL_FRAMEWORK | MOVE | True | data-retention-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/database-governance-framework.md | knowledge/framework/database-governance-framework.md | CANONICAL_FRAMEWORK | MOVE | True | database-governance-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/decision-analytics.md | knowledge/supporting/decision-analytics.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-analytics |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/security/decision-audit-framework.md | knowledge/security/decision-audit-framework.md | CANONICAL_SECURITY | MOVE | True | decision-audit-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/reporting/decision-dashboard.md | knowledge/reporting/decision-dashboard.md | CANONICAL_REPORTING | MOVE | True | decision-dashboard |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/decision-evaluation.md | knowledge/supporting/decision-evaluation.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-evaluation |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/decision-execution.md | knowledge/supporting/decision-execution.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-execution |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/decision-governance.md | knowledge/supporting/decision-governance.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-governance |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/decision-history-framework.md | knowledge/framework/decision-history-framework.md | CANONICAL_FRAMEWORK | MOVE | True | decision-history-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/decision-insights.md | knowledge/supporting/decision-insights.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-insights |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/decision-learning-framework.md | knowledge/framework/decision-learning-framework.md | CANONICAL_FRAMEWORK | MOVE | True | decision-learning-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/decision-lifecycle.md | knowledge/supporting/decision-lifecycle.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-lifecycle |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/decision-matrix.md | knowledge/supporting/decision-matrix.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-matrix |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/decision-metrics-framework.md | knowledge/framework/decision-metrics-framework.md | CANONICAL_FRAMEWORK | MOVE | True | decision-metrics-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/decision-optimization.md | knowledge/supporting/decision-optimization.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-optimization |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/decision-principles.md | knowledge/supporting/decision-principles.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | decision-principles |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/reporting/decision-reporting.md | knowledge/reporting/decision-reporting.md | CANONICAL_REPORTING | MOVE | True | decision-reporting |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/rule/decision-rule-catalog.md | knowledge/rule/decision-rule-catalog.md | CANONICAL_RULE | MOVE | True | decision-rule-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/workflow/decision-workflow.md | knowledge/workflow/decision-workflow.md | CANONICAL_WORKFLOW | MOVE | True | decision-workflow |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/domain-event-catalog.md | knowledge/catalog/domain-event-catalog.md | CANONICAL_CATALOG | MOVE | True | domain-event-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/catalog/domain-model-catalog.md | knowledge/catalog/domain-model-catalog.md | CANONICAL_CATALOG | MOVE | True | domain-model-catalog |  | Legacy knowledge root migration | 3 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/rule/domain-rule-catalog.md | knowledge/rule/domain-rule-catalog.md | CANONICAL_RULE | MOVE | True | domain-rule-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/catalog/domain-service-catalog.md | knowledge/catalog/domain-service-catalog.md | CANONICAL_CATALOG | MOVE | True | domain-service-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/emergency-fund-framework.md | knowledge/framework/emergency-fund-framework.md | CANONICAL_FRAMEWORK | MOVE | True | emergency-fund-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/entity-catalog.md | knowledge/catalog/entity-catalog.md | CANONICAL_CATALOG | MOVE | True | entity-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/entity/ActionPlan.md | knowledge/entity/ActionPlan.md | LEGACY_SPECIFICATION | MOVE | False | ActionPlan |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/Asset.md | knowledge/entity/Asset.md | LEGACY_SPECIFICATION | SUPERSEDE | False | Asset | knowledge/entity/Asset.md | PG-ENTITY-001 legacy superseded entity | 3 | False | False | LOW | S3 | path-exists, reference-check |
| knowledge/entity/Decision.md | knowledge/entity/Decision.md | LEGACY_SPECIFICATION | MOVE | False | Decision |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/ExecutionPlan.md | knowledge/entity/ExecutionPlan.md | LEGACY_SPECIFICATION | MOVE | False | ExecutionPlan |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/Goal.md | knowledge/entity/Goal.md | LEGACY_SPECIFICATION | MOVE | False | Goal |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/Household.md | knowledge/entity/Household.md | LEGACY_SPECIFICATION | SUPERSEDE | False | Household | knowledge/entity/Household.md | PG-ENTITY-001 legacy superseded entity | 3 | False | False | LOW | S3 | path-exists, reference-check |
| knowledge/entity/Liability.md | knowledge/entity/Liability.md | LEGACY_SPECIFICATION | SUPERSEDE | False | Liability | knowledge/entity/Liability.md | PG-ENTITY-001 legacy superseded entity | 3 | False | False | LOW | S3 | path-exists, reference-check |
| knowledge/entity/Loan.md | knowledge/entity/Loan.md | LEGACY_SPECIFICATION | SUPERSEDE | False | Loan | knowledge/entity/Loan.md | PG-ENTITY-001 legacy superseded entity | 3 | False | False | LOW | S3 | path-exists, reference-check |
| knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | LEGACY_SPECIFICATION | SUPERSEDE | False | Mortgage | knowledge/entity/Mortgage.md | PG-ENTITY-001 legacy superseded entity | 3 | False | False | LOW | S3 | path-exists, reference-check |
| knowledge/entity/Notification.md | knowledge/entity/Notification.md | LEGACY_SPECIFICATION | MOVE | False | Notification |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/Recommendation.md | knowledge/entity/Recommendation.md | LEGACY_SPECIFICATION | MOVE | False | Recommendation |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/Scenario.md | knowledge/entity/Scenario.md | LEGACY_SPECIFICATION | MOVE | False | Scenario |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/User_p1.md | knowledge/entity/User_p1.md | LEGACY_SPECIFICATION | MOVE | False | User_p1 |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/User_p2.md | knowledge/entity/User_p2.md | LEGACY_SPECIFICATION | MOVE | False | User_p2 |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/User_p3.md | knowledge/entity/User_p3.md | LEGACY_SPECIFICATION | MOVE | False | User_p3 |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/entity/User.md | knowledge/entity/User.md | LEGACY_SPECIFICATION | MOVE | False | User |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/catalog/enumeration-catalog.md | knowledge/catalog/enumeration-catalog.md | CANONICAL_CATALOG | MOVE | True | enumeration-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/supporting/event-driven-architecture.md | knowledge/supporting/event-driven-architecture.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | event-driven-architecture |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/event-taxonomy.md | knowledge/supporting/event-taxonomy.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | event-taxonomy |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/execution-plan-framework.md | knowledge/framework/execution-plan-framework.md | CANONICAL_FRAMEWORK | MOVE | True | execution-plan-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/explainability-framework.md | knowledge/framework/explainability-framework.md | CANONICAL_FRAMEWORK | MOVE | True | explainability-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/fcn.md | knowledge/supporting/fcn.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | fcn |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/feature-flag-framework.md | knowledge/framework/feature-flag-framework.md | CANONICAL_FRAMEWORK | MOVE | True | feature-flag-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/financial-alert-framework.md | knowledge/framework/financial-alert-framework.md | CANONICAL_FRAMEWORK | MOVE | True | financial-alert-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/reporting/financial-dashboard-metrics.md | knowledge/reporting/financial-dashboard-metrics.md | CANONICAL_REPORTING | MOVE | True | financial-dashboard-metrics |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/financial-dependency-model.md | knowledge/supporting/financial-dependency-model.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | financial-dependency-model |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/catalog/financial-formula-catalog.md | knowledge/catalog/financial-formula-catalog.md | CANONICAL_CATALOG | MOVE | True | financial-formula-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/supporting/financial-health-score.md | knowledge/supporting/financial-health-score.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | financial-health-score |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/financial-milestone-framework.md | knowledge/framework/financial-milestone-framework.md | CANONICAL_FRAMEWORK | MOVE | True | financial-milestone-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/financial-philosophy.md | knowledge/supporting/financial-philosophy.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | financial-philosophy |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/financial-projection-framework.md | knowledge/framework/financial-projection-framework.md | CANONICAL_FRAMEWORK | MOVE | True | financial-projection-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/financial-ratio-framework.md | knowledge/framework/financial-ratio-framework.md | CANONICAL_FRAMEWORK | MOVE | True | financial-ratio-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/financial-ratios.md | knowledge/supporting/financial-ratios.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | financial-ratios |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/glossary.md | knowledge/supporting/glossary.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | glossary |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-analytics.md | knowledge/supporting/goal-analytics.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-analytics |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-conflict-resolution.md | knowledge/supporting/goal-conflict-resolution.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-conflict-resolution |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/reporting/goal-dashboard.md | knowledge/reporting/goal-dashboard.md | CANONICAL_REPORTING | MOVE | True | goal-dashboard |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/goal-dependency.md | knowledge/supporting/goal-dependency.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-dependency |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/goal-execution-framework.md | knowledge/framework/goal-execution-framework.md | CANONICAL_FRAMEWORK | MOVE | True | goal-execution-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/goal-funding-framework.md | knowledge/framework/goal-funding-framework.md | CANONICAL_FRAMEWORK | MOVE | True | goal-funding-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/goal-governance.md | knowledge/supporting/goal-governance.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-governance |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-insights.md | knowledge/supporting/goal-insights.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-insights |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-lifecycle-management.md | knowledge/supporting/goal-lifecycle-management.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-lifecycle-management |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-lifecycle.md | knowledge/supporting/goal-lifecycle.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-lifecycle |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/reporting/goal-metrics.md | knowledge/reporting/goal-metrics.md | CANONICAL_REPORTING | MOVE | True | goal-metrics |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/goal-optimization.md | knowledge/supporting/goal-optimization.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-optimization |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-prioritization.md | knowledge/supporting/goal-prioritization.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-prioritization |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/goal-progress-tracking.md | knowledge/supporting/goal-progress-tracking.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-progress-tracking |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/reporting/goal-reporting.md | knowledge/reporting/goal-reporting.md | CANONICAL_REPORTING | MOVE | True | goal-reporting |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/goal-review-framework.md | knowledge/framework/goal-review-framework.md | CANONICAL_FRAMEWORK | MOVE | True | goal-review-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/goal-review.md | knowledge/supporting/goal-review.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | goal-review |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/rule/home-upgrade-rule-catalog.md | knowledge/rule/home-upgrade-rule-catalog.md | CANONICAL_RULE | MOVE | True | home-upgrade-rule-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/framework/house-decision-framework.md | knowledge/framework/house-decision-framework.md | CANONICAL_FRAMEWORK | MOVE | True | house-decision-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/integration/integration-framework.md | knowledge/integration/integration-framework.md | CANONICAL_INTEGRATION | MOVE | True | integration-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/investment-policy.md | knowledge/supporting/investment-policy.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | investment-policy |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/reporting/kpi-definitions.md | knowledge/reporting/kpi-definitions.md | CANONICAL_REPORTING | MOVE | True | kpi-definitions |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/life-goals.md | knowledge/supporting/life-goals.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | life-goals |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/life-stage-framework.md | knowledge/framework/life-stage-framework.md | CANONICAL_FRAMEWORK | MOVE | True | life-stage-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/life-stage-model.md | knowledge/supporting/life-stage-model.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | life-stage-model |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/liquidity-framework.md | knowledge/framework/liquidity-framework.md | CANONICAL_FRAMEWORK | MOVE | True | liquidity-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/rule/loan-decision-rule-catalog.md | knowledge/rule/loan-decision-rule-catalog.md | CANONICAL_RULE | MOVE | True | loan-decision-rule-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/supporting/loan.md | knowledge/supporting/loan.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | loan |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/market-assumptions.md | knowledge/supporting/market-assumptions.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | market-assumptions |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/catalog/message-contract-catalog.md | knowledge/catalog/message-contract-catalog.md | CANONICAL_CATALOG | MOVE | True | message-contract-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/framework/net-worth-framework.md | knowledge/framework/net-worth-framework.md | CANONICAL_FRAMEWORK | MOVE | True | net-worth-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/notification-framework.md | knowledge/framework/notification-framework.md | CANONICAL_FRAMEWORK | MOVE | True | notification-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/engine/optimization-engine-framework.md | knowledge/engine/optimization-engine-framework.md | CANONICAL_ENGINE | MOVE | True | optimization-engine-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/security/permission-framework.md | knowledge/security/permission-framework.md | CANONICAL_SECURITY | MOVE | True | permission-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/policy-management-framework.md | knowledge/framework/policy-management-framework.md | CANONICAL_FRAMEWORK | MOVE | True | policy-management-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/portfolio-lifecycle.md | knowledge/supporting/portfolio-lifecycle.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | portfolio-lifecycle |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/portfolio-performance-framework.md | knowledge/framework/portfolio-performance-framework.md | CANONICAL_FRAMEWORK | MOVE | True | portfolio-performance-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/portfolio.md | knowledge/supporting/portfolio.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | portfolio |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/engine/projection-engine-framework.md | knowledge/engine/projection-engine-framework.md | CANONICAL_ENGINE | MOVE | True | projection-engine-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/supporting/property.md | knowledge/supporting/property.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | property |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/rebalancing-framework.md | knowledge/framework/rebalancing-framework.md | CANONICAL_FRAMEWORK | MOVE | True | rebalancing-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/recommendation-evaluation.md | knowledge/supporting/recommendation-evaluation.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | recommendation-evaluation |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/recommendation-execution.md | knowledge/supporting/recommendation-execution.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | recommendation-execution |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/recommendation-lifecycle.md | knowledge/supporting/recommendation-lifecycle.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | recommendation-lifecycle |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/recommendation-priority-framework.md | knowledge/framework/recommendation-priority-framework.md | CANONICAL_FRAMEWORK | MOVE | True | recommendation-priority-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/repository-catalog.md | knowledge/catalog/repository-catalog.md | CANONICAL_CATALOG | MOVE | True | repository-catalog |  | Legacy knowledge root migration | 2 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/supporting/retirement.md | knowledge/supporting/retirement.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | retirement |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/risk-budget-framework.md | knowledge/framework/risk-budget-framework.md | CANONICAL_FRAMEWORK | MOVE | True | risk-budget-framework |  | Legacy knowledge root migration | 2 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/risk-capacity-model.md | knowledge/supporting/risk-capacity-model.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | risk-capacity-model |  | Legacy knowledge root migration | 2 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/risk-framework.md | knowledge/framework/risk-framework.md | CANONICAL_FRAMEWORK | MOVE | True | risk-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/engine/rule-engine-architecture.md | knowledge/engine/rule-engine-architecture.md | CANONICAL_ENGINE | MOVE | True | rule-engine-architecture |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/supporting/rule-expression-language.md | knowledge/supporting/rule-expression-language.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | rule-expression-language |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/scenario-comparison-framework.md | knowledge/framework/scenario-comparison-framework.md | CANONICAL_FRAMEWORK | MOVE | True | scenario-comparison-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/scenario-framework.md | knowledge/framework/scenario-framework.md | CANONICAL_FRAMEWORK | MOVE | True | scenario-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/framework/scheduler-framework.md | knowledge/framework/scheduler-framework.md | CANONICAL_FRAMEWORK | MOVE | True | scheduler-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/scoring-model.md | knowledge/supporting/scoring-model.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | scoring-model |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/security/security-framework.md | knowledge/security/security-framework.md | CANONICAL_SECURITY | MOVE | True | security-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/service-catalog.md | knowledge/catalog/service-catalog.md | CANONICAL_CATALOG | MOVE | True | service-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/engine/simulation-engine-framework.md | knowledge/engine/simulation-engine-framework.md | CANONICAL_ENGINE | MOVE | True | simulation-engine-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/framework/system-configuration-framework.md | knowledge/framework/system-configuration-framework.md | CANONICAL_FRAMEWORK | MOVE | True | system-configuration-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/system-module-catalog.md | knowledge/catalog/system-module-catalog.md | CANONICAL_CATALOG | MOVE | True | system-module-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/supporting/taiwan-financial-assumptions.md | knowledge/supporting/taiwan-financial-assumptions.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | taiwan-financial-assumptions |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/taiwan-market-data-sources.md | knowledge/supporting/taiwan-market-data-sources.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | taiwan-market-data-sources |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/taiwan-mortgage.md | knowledge/supporting/taiwan-mortgage.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | taiwan-mortgage |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/supporting/taiwan-tax.md | knowledge/supporting/taiwan-tax.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | taiwan-tax |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/security/tenant-framework.md | knowledge/security/tenant-framework.md | CANONICAL_SECURITY | MOVE | True | tenant-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/supporting/terminology.md | knowledge/supporting/terminology.md | CANONICAL_SUPPORTING_SPECIFICATION | MOVE | True | terminology |  | Legacy knowledge root migration | 1 | False | False | HIGH | S6 | path-exists, reference-check |
| knowledge/framework/user-journey-framework.md | knowledge/framework/user-journey-framework.md | CANONICAL_FRAMEWORK | MOVE | True | user-journey-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S5 | path-exists, reference-check |
| knowledge/catalog/value-object-catalog.md | knowledge/catalog/value-object-catalog.md | CANONICAL_CATALOG | MOVE | True | value-object-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S2 | path-exists, reference-check |
| knowledge/rule/withdrawal-rule-catalog.md | knowledge/rule/withdrawal-rule-catalog.md | CANONICAL_RULE | MOVE | True | withdrawal-rule-catalog |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| knowledge/engine/workflow-engine-framework.md | knowledge/engine/workflow-engine-framework.md | CANONICAL_ENGINE | MOVE | True | workflow-engine-framework |  | Legacy knowledge root migration | 1 | False | False | HIGH | S4 | path-exists, reference-check |
| docs/pwa/00-PWA-Overview.md | docs/pwa/00-PWA-Overview.md | PWA_DOCUMENT | KEEP | False | 00-PWA-Overview |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/AppManifest.md | docs/pwa/AppManifest.md | PWA_DOCUMENT | KEEP | False | AppManifest |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/BackupRestore.md | docs/pwa/BackupRestore.md | PWA_DOCUMENT | KEEP | False | BackupRestore |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/CacheStrategy.md | docs/pwa/CacheStrategy.md | PWA_DOCUMENT | KEEP | False | CacheStrategy |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/DataMigration.md | docs/pwa/DataMigration.md | PWA_DOCUMENT | KEEP | False | DataMigration |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/GitHubPagesDeployment.md | docs/pwa/GitHubPagesDeployment.md | PWA_DOCUMENT | KEEP | False | GitHubPagesDeployment |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/IndexedDBDesign.md | docs/pwa/IndexedDBDesign.md | PWA_DOCUMENT | KEEP | False | IndexedDBDesign |  | Governance classification | 2 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/OfflineStrategy.md | docs/pwa/OfflineStrategy.md | PWA_DOCUMENT | KEEP | False | OfflineStrategy |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/Security.md | docs/pwa/Security.md | PWA_DOCUMENT | KEEP | False | Security |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/ServiceWorker.md | docs/pwa/ServiceWorker.md | PWA_DOCUMENT | KEEP | False | ServiceWorker |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| docs/pwa/UpdateStrategy.md | docs/pwa/UpdateStrategy.md | PWA_DOCUMENT | KEEP | False | UpdateStrategy |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| frontend/README.md | frontend/README.md | INFORMATIONAL_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Asset.md | knowledge/entity/Asset.md | CANONICAL_ENTITY | KEEP | True | Asset |  | Governance classification | 9 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Household.md | knowledge/entity/Household.md | CANONICAL_ENTITY | KEEP | True | Household |  | Governance classification | 9 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Liability.md | knowledge/entity/Liability.md | CANONICAL_ENTITY | KEEP | True | Liability |  | Governance classification | 9 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Loan.md | knowledge/entity/Loan.md | CANONICAL_ENTITY | KEEP | True | Loan |  | Governance classification | 8 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | CANONICAL_ENTITY | KEEP | True | Mortgage |  | Governance classification | 5 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Portfolio.md | knowledge/entity/Portfolio.md | CANONICAL_ENTITY | KEEP | True | Portfolio |  | Governance classification | 4 | False | False | LOW | S7 | path-exists, reference-check |
| knowledge/entity/Position.md | knowledge/entity/Position.md | CANONICAL_ENTITY | KEEP | True | Position |  | Governance classification | 3 | False | False | LOW | S7 | path-exists, reference-check |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-canonical-duplicate-decision-report.md | PIPELINE_REPORT | MOVE | False | knowledge-canonical-duplicate-decision-report |  | Pipeline report belongs under .codex/reports | 1 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-inventory-reconciliation-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | PIPELINE_REPORT | MOVE | False | knowledge-inventory-reconciliation-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-path-governance-report.md | .codex/reports/knowledge-path-governance-report.md | PIPELINE_REPORT | MOVE | False | knowledge-path-governance-report |  | Pipeline report belongs under .codex/reports | 0 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | PIPELINE_REPORT | MOVE | False | knowledge-progress-reconciliation-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-repository-migration-plan.md | .codex/reports/knowledge-repository-migration-plan.md | PIPELINE_REPORT | MOVE | False | knowledge-repository-migration-plan |  | Pipeline report belongs under .codex/reports | 0 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-repository-structure-governance-report.md | .codex/reports/knowledge-repository-structure-governance-report.md | PIPELINE_REPORT | MOVE | False | knowledge-repository-structure-governance-report |  | Pipeline report belongs under .codex/reports | 0 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-repository-validation-report.md | .codex/reports/knowledge-repository-validation-report.md | PIPELINE_REPORT | MOVE | False | knowledge-repository-validation-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-upgrade-batch-report.md | .codex/reports/knowledge-upgrade-batch-report.md | PIPELINE_REPORT | MOVE | False | knowledge-upgrade-batch-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-upgrade-health-report.md | .codex/reports/knowledge-upgrade-health-report.md | PIPELINE_REPORT | MOVE | False | knowledge-upgrade-health-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| .codex/reports/knowledge-upgrade-report.md | .codex/reports/knowledge-upgrade-report.md | PIPELINE_REPORT | MOVE | False | knowledge-upgrade-report |  | Pipeline report belongs under .codex/reports | 2 | False | False | MEDIUM | S1 | path-exists, reference-check |
| README.md | README.md | README_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |
| simulator/README.md | simulator/README.md | INFORMATIONAL_DOCUMENT | KEEP | False | README |  | Governance classification | 1 | False | False | LOW | S7 | path-exists, reference-check |

## Duplicate Resolution Matrix

| Group | Type | Files | Decision |
|---|---|---|---|
| DUP-NAME-1 | same-file-name | knowledge/entity/Asset.md, knowledge/entity/Asset.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-2 | same-file-name | knowledge/entity/Household.md, knowledge/entity/Household.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-3 | same-file-name | knowledge/entity/Liability.md, knowledge/entity/Liability.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-4 | same-file-name | knowledge/entity/Loan.md, knowledge/supporting/loan.md, knowledge/entity/Loan.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-5 | same-file-name | knowledge/entity/Mortgage.md, knowledge/entity/Mortgage.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-6 | same-file-name | knowledge/supporting/portfolio.md, knowledge/entity/Portfolio.md | MANUAL_DECISION_REQUIRED |
| DUP-NAME-7 | same-file-name | ai/README.md, backend/README.md, database/README.md, frontend/README.md, README.md, simulator/README.md | MANUAL_DECISION_REQUIRED |
| DUP-SUBJECT-Portfolio | canonical-subject | knowledge/supporting/portfolio.md, knowledge/entity/Portfolio.md | MANUAL_DECISION_REQUIRED |
| DUP-SUBJECT-Loan | canonical-subject | knowledge/entity/Loan.md, knowledge/supporting/loan.md, knowledge/entity/Loan.md | MANUAL_DECISION_REQUIRED |

## Reference Repair Matrix

| Source File | Current Target | New Target | Repair Batch | Repair Required |
|---|---|---|---|---|
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | docs/specification/00-Specification-Index.md | docs/specification/00-Specification-Index.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/00-Specification-Index.md | docs/specification/00-Specification-Index.md | S8 | True |
| knowledge/supporting/financial-philosophy.md | docs/specification/00-Vision.md | docs/specification/00-Vision.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/00-Vision.md | docs/specification/00-Vision.md | S8 | True |
| knowledge/supporting/financial-philosophy.md | docs/specification/01-Blueprint.md | docs/specification/01-Blueprint.md | S8 | True |
| knowledge/supporting/life-goals.md | docs/specification/01-Blueprint.md | docs/specification/01-Blueprint.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/01-Blueprint.md | docs/specification/01-Blueprint.md | S8 | True |
| knowledge/supporting/financial-philosophy.md | docs/specification/02-IPS.md | docs/specification/02-IPS.md | S8 | True |
| knowledge/supporting/investment-policy.md | docs/specification/02-IPS.md | docs/specification/02-IPS.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/02-IPS.md | docs/specification/02-IPS.md | S8 | True |
| knowledge/supporting/assumptions.md | docs/specification/03-Formula.md | docs/specification/03-Formula.md | S8 | True |
| knowledge/supporting/financial-health-score.md | docs/specification/03-Formula.md | docs/specification/03-Formula.md | S8 | True |
| knowledge/supporting/taiwan-financial-assumptions.md | docs/specification/03-Formula.md | docs/specification/03-Formula.md | S8 | True |
| knowledge/supporting/taiwan-tax.md | docs/specification/03-Formula.md | docs/specification/03-Formula.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/03-Formula.md | docs/specification/03-Formula.md | S8 | True |
| knowledge/catalog/aggregate-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/application-service-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/framework/automation-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/framework/background-job-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/bounded-context-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/engine/calculation-engine-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/command-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/domain-event-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/domain-model-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/domain-service-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/entity-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/enumeration-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/supporting/event-driven-architecture.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/supporting/glossary.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/integration/integration-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/engine/optimization-engine-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/repository-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/framework/scheduler-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/service-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/engine/simulation-engine-framework.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/system-module-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/supporting/terminology.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/value-object-catalog.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Asset.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Household.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Portfolio.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/entity/Position.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/04-DomainModel.md | docs/specification/04-DomainModel.md | S8 | True |
| knowledge/catalog/aggregate-catalog.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/catalog/bounded-context-catalog.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/catalog/domain-model-catalog.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/catalog/entity-catalog.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/catalog/system-module-catalog.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Asset.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Household.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Portfolio.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| knowledge/entity/Position.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/04A-DomainInventory.md | docs/specification/04A-DomainInventory.md | S8 | True |
| docs/database/06-ERD.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/aggregate-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/api/api-governance-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/application-service-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/security/audit-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/automation-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/background-job-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/bounded-context-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/cache-strategy-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/command-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/compliance-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/data-governance-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/database-governance-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/domain-event-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/domain-model-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/domain-service-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/entity-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/enumeration-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/supporting/event-driven-architecture.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/integration/integration-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/engine/projection-engine-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/repository-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/framework/scheduler-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/service-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/system-module-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/security/tenant-framework.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/supporting/terminology.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/value-object-catalog.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| docs/pwa/IndexedDBDesign.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Asset.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Household.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Liability.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Loan.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Portfolio.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/entity/Position.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| .codex/reports/knowledge-upgrade-health-report.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/database/05-DatabaseDesign.md | docs/database/05-DatabaseDesign.md | S8 | True |
| knowledge/catalog/aggregate-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/api/api-governance-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/application-service-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/automation-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/background-job-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/bounded-context-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/cache-strategy-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/command-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/compliance-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/data-governance-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/database-governance-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/domain-event-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/domain-model-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/domain-service-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/entity-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/enumeration-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/supporting/event-driven-architecture.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/integration/integration-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/engine/projection-engine-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/repository-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/framework/scheduler-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/service-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/system-module-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/security/tenant-framework.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/catalog/value-object-catalog.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Asset.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Household.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Liability.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Loan.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Portfolio.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/entity/Position.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/database/06-ERD.md | docs/database/06-ERD.md | S8 | True |
| knowledge/api/api-governance-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/application-service-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/security/audit-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/automation-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/background-job-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/bounded-context-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/cache-strategy-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/engine/calculation-engine-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/command-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/compliance-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/data-governance-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/database-governance-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/domain-event-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/domain-model-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/supporting/event-driven-architecture.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/supporting/glossary.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/integration/integration-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/message-contract-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/engine/optimization-engine-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/engine/projection-engine-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/repository-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/framework/scheduler-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/service-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/engine/simulation-engine-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/catalog/system-module-catalog.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/security/tenant-framework.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/supporting/terminology.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Asset.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Household.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Liability.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Loan.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Portfolio.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Position.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/api/07-API.md | docs/api/07-API.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/specification/08A-CashFlowEngine-Architecture.md | docs/specification/08A-CashFlowEngine-Architecture.md | S8 | True |
| knowledge/supporting/cashflow.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/specification/08B-CashFlowEngine-Formula.md | docs/specification/08B-CashFlowEngine-Formula.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | docs/specification/08C-CashFlowEngine-DecisionRules.md | S8 | True |
| knowledge/entity/Liability.md | docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | S8 | True |
| knowledge/entity/Loan.md | docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/api/08D-CashFlowEngine-API.md | docs/api/08D-CashFlowEngine-API.md | S8 | True |
| knowledge/entity/Liability.md | docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | S8 | True |
| knowledge/entity/Loan.md | docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | S8 | True |
| knowledge/entity/Mortgage.md | docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | docs/specification/08E-CashFlowEngine-Testing.md | docs/specification/08E-CashFlowEngine-Testing.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | docs/roadmap/20-Roadmap.md | docs/roadmap/20-Roadmap.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/action-planning-framework.md | knowledge/framework/action-planning-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/aggregate-catalog.md | knowledge/catalog/aggregate-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/aggregate-catalog.md | knowledge/catalog/aggregate-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/catalog/aggregate-catalog.md | knowledge/catalog/aggregate-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/api/api-governance-framework.md | knowledge/api/api-governance-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/api/api-governance-framework.md | knowledge/api/api-governance-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/application-service-catalog.md | knowledge/catalog/application-service-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/application-service-catalog.md | knowledge/catalog/application-service-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/catalog/application-service-catalog.md | knowledge/catalog/application-service-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/asset-allocation-framework.md | knowledge/framework/asset-allocation-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/framework/asset-allocation-framework.md | knowledge/framework/asset-allocation-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/assumptions.md | knowledge/supporting/assumptions.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/security/audit-framework.md | knowledge/security/audit-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/automation-framework.md | knowledge/framework/automation-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/background-job-framework.md | knowledge/framework/background-job-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/backup-recovery-framework.md | knowledge/framework/backup-recovery-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/catalog/bounded-context-catalog.md | knowledge/catalog/bounded-context-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/bounded-context-catalog.md | knowledge/catalog/bounded-context-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/bounded-context-catalog.md | knowledge/catalog/bounded-context-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/catalog/bounded-context-catalog.md | knowledge/catalog/bounded-context-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/business-calendar-framework.md | knowledge/framework/business-calendar-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/cache-strategy-framework.md | knowledge/framework/cache-strategy-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/calculation-engine-framework.md | knowledge/engine/calculation-engine-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/capability-matrix.md | knowledge/supporting/capability-matrix.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/api/capital-allocation-framework.md | knowledge/api/capital-allocation-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/cash-reserve-framework.md | knowledge/framework/cash-reserve-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/cashflow.md | knowledge/supporting/cashflow.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/command-catalog.md | knowledge/catalog/command-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/command-catalog.md | knowledge/catalog/command-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-health-report.md | knowledge/catalog/command-catalog.md | knowledge/catalog/command-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/catalog/command-catalog.md | knowledge/catalog/command-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/compliance-framework.md | knowledge/framework/compliance-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/configuration-management-framework.md | knowledge/framework/configuration-management-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/constraint-rules.md | knowledge/supporting/constraint-rules.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/dashboard-widget-catalog.md | knowledge/catalog/dashboard-widget-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/data-governance-framework.md | knowledge/framework/data-governance-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/data-retention-framework.md | knowledge/framework/data-retention-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/database-governance-framework.md | knowledge/framework/database-governance-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-analytics.md | knowledge/supporting/decision-analytics.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-analytics.md | knowledge/supporting/decision-analytics.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/security/decision-audit-framework.md | knowledge/security/decision-audit-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/security/decision-audit-framework.md | knowledge/security/decision-audit-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/decision-dashboard.md | knowledge/reporting/decision-dashboard.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/reporting/decision-dashboard.md | knowledge/reporting/decision-dashboard.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-evaluation.md | knowledge/supporting/decision-evaluation.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-evaluation.md | knowledge/supporting/decision-evaluation.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-execution.md | knowledge/supporting/decision-execution.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-execution.md | knowledge/supporting/decision-execution.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-governance.md | knowledge/supporting/decision-governance.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-governance.md | knowledge/supporting/decision-governance.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/decision-history-framework.md | knowledge/framework/decision-history-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/framework/decision-history-framework.md | knowledge/framework/decision-history-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-insights.md | knowledge/supporting/decision-insights.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-insights.md | knowledge/supporting/decision-insights.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/decision-learning-framework.md | knowledge/framework/decision-learning-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/framework/decision-learning-framework.md | knowledge/framework/decision-learning-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-lifecycle.md | knowledge/supporting/decision-lifecycle.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-lifecycle.md | knowledge/supporting/decision-lifecycle.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-matrix.md | knowledge/supporting/decision-matrix.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-matrix.md | knowledge/supporting/decision-matrix.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/decision-metrics-framework.md | knowledge/framework/decision-metrics-framework.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/framework/decision-metrics-framework.md | knowledge/framework/decision-metrics-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-optimization.md | knowledge/supporting/decision-optimization.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/supporting/decision-optimization.md | knowledge/supporting/decision-optimization.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/decision-principles.md | knowledge/supporting/decision-principles.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/decision-reporting.md | knowledge/reporting/decision-reporting.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/rule/decision-rule-catalog.md | knowledge/rule/decision-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/workflow/decision-workflow.md | knowledge/workflow/decision-workflow.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/domain-event-catalog.md | knowledge/catalog/domain-event-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/domain-event-catalog.md | knowledge/catalog/domain-event-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/domain-model-catalog.md | knowledge/catalog/domain-model-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/domain-model-catalog.md | knowledge/catalog/domain-model-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-report.md | knowledge/catalog/domain-model-catalog.md | knowledge/catalog/domain-model-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/rule/domain-rule-catalog.md | knowledge/rule/domain-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/domain-service-catalog.md | knowledge/catalog/domain-service-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/domain-service-catalog.md | knowledge/catalog/domain-service-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/emergency-fund-framework.md | knowledge/framework/emergency-fund-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/entity-catalog.md | knowledge/catalog/entity-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/entity-catalog.md | knowledge/catalog/entity-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/ActionPlan.md | knowledge/entity/ActionPlan.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Asset.md | knowledge/entity/Asset.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | knowledge/entity/Asset.md | knowledge/entity/Asset.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Asset.md | knowledge/entity/Asset.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Decision.md | knowledge/entity/Decision.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/ExecutionPlan.md | knowledge/entity/ExecutionPlan.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Goal.md | knowledge/entity/Goal.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Household.md | knowledge/entity/Household.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | knowledge/entity/Household.md | knowledge/entity/Household.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Household.md | knowledge/entity/Household.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Liability.md | knowledge/entity/Liability.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | knowledge/entity/Liability.md | knowledge/entity/Liability.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Liability.md | knowledge/entity/Liability.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Loan.md | knowledge/entity/Loan.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | knowledge/entity/Loan.md | knowledge/entity/Loan.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Loan.md | knowledge/entity/Loan.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Mortgage.md | knowledge/entity/Mortgage.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Notification.md | knowledge/entity/Notification.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Recommendation.md | knowledge/entity/Recommendation.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/Scenario.md | knowledge/entity/Scenario.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/User_p1.md | knowledge/entity/User_p1.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/User_p2.md | knowledge/entity/User_p2.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/User_p3.md | knowledge/entity/User_p3.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/entity/User.md | knowledge/entity/User.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/enumeration-catalog.md | knowledge/catalog/enumeration-catalog.md | S8 | True |
| .codex/reports/knowledge-upgrade-batch-report.md | knowledge/catalog/enumeration-catalog.md | knowledge/catalog/enumeration-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/event-driven-architecture.md | knowledge/supporting/event-driven-architecture.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/event-taxonomy.md | knowledge/supporting/event-taxonomy.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/execution-plan-framework.md | knowledge/framework/execution-plan-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/explainability-framework.md | knowledge/framework/explainability-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/explainability-framework.md | knowledge/framework/explainability-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/fcn.md | knowledge/supporting/fcn.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/fcn.md | knowledge/supporting/fcn.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/feature-flag-framework.md | knowledge/framework/feature-flag-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/feature-flag-framework.md | knowledge/framework/feature-flag-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/financial-alert-framework.md | knowledge/framework/financial-alert-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/financial-alert-framework.md | knowledge/framework/financial-alert-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/reporting/financial-dashboard-metrics.md | knowledge/reporting/financial-dashboard-metrics.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/financial-dashboard-metrics.md | knowledge/reporting/financial-dashboard-metrics.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/financial-dependency-model.md | knowledge/supporting/financial-dependency-model.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/financial-dependency-model.md | knowledge/supporting/financial-dependency-model.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/catalog/financial-formula-catalog.md | knowledge/catalog/financial-formula-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/financial-formula-catalog.md | knowledge/catalog/financial-formula-catalog.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/financial-health-score.md | knowledge/supporting/financial-health-score.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/financial-health-score.md | knowledge/supporting/financial-health-score.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/financial-milestone-framework.md | knowledge/framework/financial-milestone-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/financial-milestone-framework.md | knowledge/framework/financial-milestone-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/financial-philosophy.md | knowledge/supporting/financial-philosophy.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/financial-philosophy.md | knowledge/supporting/financial-philosophy.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/financial-projection-framework.md | knowledge/framework/financial-projection-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/financial-projection-framework.md | knowledge/framework/financial-projection-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/financial-ratio-framework.md | knowledge/framework/financial-ratio-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/financial-ratio-framework.md | knowledge/framework/financial-ratio-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/financial-ratios.md | knowledge/supporting/financial-ratios.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/financial-ratios.md | knowledge/supporting/financial-ratios.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/glossary.md | knowledge/supporting/glossary.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/glossary.md | knowledge/supporting/glossary.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-analytics.md | knowledge/supporting/goal-analytics.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-analytics.md | knowledge/supporting/goal-analytics.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-conflict-resolution.md | knowledge/supporting/goal-conflict-resolution.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-conflict-resolution.md | knowledge/supporting/goal-conflict-resolution.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/reporting/goal-dashboard.md | knowledge/reporting/goal-dashboard.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/goal-dashboard.md | knowledge/reporting/goal-dashboard.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-dependency.md | knowledge/supporting/goal-dependency.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-dependency.md | knowledge/supporting/goal-dependency.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/goal-execution-framework.md | knowledge/framework/goal-execution-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/goal-execution-framework.md | knowledge/framework/goal-execution-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/goal-funding-framework.md | knowledge/framework/goal-funding-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/goal-funding-framework.md | knowledge/framework/goal-funding-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-governance.md | knowledge/supporting/goal-governance.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-governance.md | knowledge/supporting/goal-governance.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-insights.md | knowledge/supporting/goal-insights.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-insights.md | knowledge/supporting/goal-insights.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-lifecycle-management.md | knowledge/supporting/goal-lifecycle-management.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-lifecycle-management.md | knowledge/supporting/goal-lifecycle-management.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-lifecycle.md | knowledge/supporting/goal-lifecycle.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-lifecycle.md | knowledge/supporting/goal-lifecycle.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/reporting/goal-metrics.md | knowledge/reporting/goal-metrics.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/goal-metrics.md | knowledge/reporting/goal-metrics.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-optimization.md | knowledge/supporting/goal-optimization.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-optimization.md | knowledge/supporting/goal-optimization.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-prioritization.md | knowledge/supporting/goal-prioritization.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-prioritization.md | knowledge/supporting/goal-prioritization.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-progress-tracking.md | knowledge/supporting/goal-progress-tracking.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-progress-tracking.md | knowledge/supporting/goal-progress-tracking.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/reporting/goal-reporting.md | knowledge/reporting/goal-reporting.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/goal-reporting.md | knowledge/reporting/goal-reporting.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/goal-review-framework.md | knowledge/framework/goal-review-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/goal-review-framework.md | knowledge/framework/goal-review-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/goal-review.md | knowledge/supporting/goal-review.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/goal-review.md | knowledge/supporting/goal-review.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/rule/home-upgrade-rule-catalog.md | knowledge/rule/home-upgrade-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/rule/home-upgrade-rule-catalog.md | knowledge/rule/home-upgrade-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/house-decision-framework.md | knowledge/framework/house-decision-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/house-decision-framework.md | knowledge/framework/house-decision-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/integration/integration-framework.md | knowledge/integration/integration-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/integration/integration-framework.md | knowledge/integration/integration-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/investment-policy.md | knowledge/supporting/investment-policy.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/investment-policy.md | knowledge/supporting/investment-policy.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/reporting/kpi-definitions.md | knowledge/reporting/kpi-definitions.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/reporting/kpi-definitions.md | knowledge/reporting/kpi-definitions.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/life-goals.md | knowledge/supporting/life-goals.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/life-goals.md | knowledge/supporting/life-goals.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/life-stage-framework.md | knowledge/framework/life-stage-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/life-stage-framework.md | knowledge/framework/life-stage-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/life-stage-model.md | knowledge/supporting/life-stage-model.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/life-stage-model.md | knowledge/supporting/life-stage-model.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/liquidity-framework.md | knowledge/framework/liquidity-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/liquidity-framework.md | knowledge/framework/liquidity-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/rule/loan-decision-rule-catalog.md | knowledge/rule/loan-decision-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/rule/loan-decision-rule-catalog.md | knowledge/rule/loan-decision-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/loan.md | knowledge/supporting/loan.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/loan.md | knowledge/supporting/loan.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/market-assumptions.md | knowledge/supporting/market-assumptions.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/market-assumptions.md | knowledge/supporting/market-assumptions.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/catalog/message-contract-catalog.md | knowledge/catalog/message-contract-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/message-contract-catalog.md | knowledge/catalog/message-contract-catalog.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/net-worth-framework.md | knowledge/framework/net-worth-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/net-worth-framework.md | knowledge/framework/net-worth-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/notification-framework.md | knowledge/framework/notification-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/notification-framework.md | knowledge/framework/notification-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/engine/optimization-engine-framework.md | knowledge/engine/optimization-engine-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/optimization-engine-framework.md | knowledge/engine/optimization-engine-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/security/permission-framework.md | knowledge/security/permission-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/security/permission-framework.md | knowledge/security/permission-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/policy-management-framework.md | knowledge/framework/policy-management-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/policy-management-framework.md | knowledge/framework/policy-management-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/portfolio-lifecycle.md | knowledge/supporting/portfolio-lifecycle.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/portfolio-lifecycle.md | knowledge/supporting/portfolio-lifecycle.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/portfolio-performance-framework.md | knowledge/framework/portfolio-performance-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/portfolio-performance-framework.md | knowledge/framework/portfolio-performance-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/portfolio.md | knowledge/supporting/portfolio.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/portfolio.md | knowledge/supporting/portfolio.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/engine/projection-engine-framework.md | knowledge/engine/projection-engine-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/projection-engine-framework.md | knowledge/engine/projection-engine-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/property.md | knowledge/supporting/property.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/property.md | knowledge/supporting/property.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/rebalancing-framework.md | knowledge/framework/rebalancing-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/rebalancing-framework.md | knowledge/framework/rebalancing-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/recommendation-evaluation.md | knowledge/supporting/recommendation-evaluation.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/recommendation-evaluation.md | knowledge/supporting/recommendation-evaluation.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/recommendation-execution.md | knowledge/supporting/recommendation-execution.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/recommendation-execution.md | knowledge/supporting/recommendation-execution.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/recommendation-lifecycle.md | knowledge/supporting/recommendation-lifecycle.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/recommendation-lifecycle.md | knowledge/supporting/recommendation-lifecycle.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/recommendation-priority-framework.md | knowledge/framework/recommendation-priority-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/recommendation-priority-framework.md | knowledge/framework/recommendation-priority-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/catalog/repository-catalog.md | knowledge/catalog/repository-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/repository-catalog.md | knowledge/catalog/repository-catalog.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/retirement.md | knowledge/supporting/retirement.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/retirement.md | knowledge/supporting/retirement.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/framework/risk-budget-framework.md | knowledge/framework/risk-budget-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/risk-budget-framework.md | knowledge/framework/risk-budget-framework.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | knowledge/supporting/risk-capacity-model.md | knowledge/supporting/risk-capacity-model.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/risk-capacity-model.md | knowledge/supporting/risk-capacity-model.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/risk-framework.md | knowledge/framework/risk-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/rule-engine-architecture.md | knowledge/engine/rule-engine-architecture.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/rule-expression-language.md | knowledge/supporting/rule-expression-language.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/scenario-comparison-framework.md | knowledge/framework/scenario-comparison-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/scenario-framework.md | knowledge/framework/scenario-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/scheduler-framework.md | knowledge/framework/scheduler-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/scoring-model.md | knowledge/supporting/scoring-model.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/security/security-framework.md | knowledge/security/security-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/service-catalog.md | knowledge/catalog/service-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/simulation-engine-framework.md | knowledge/engine/simulation-engine-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/system-configuration-framework.md | knowledge/framework/system-configuration-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/system-module-catalog.md | knowledge/catalog/system-module-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/taiwan-financial-assumptions.md | knowledge/supporting/taiwan-financial-assumptions.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/taiwan-market-data-sources.md | knowledge/supporting/taiwan-market-data-sources.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/taiwan-mortgage.md | knowledge/supporting/taiwan-mortgage.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/taiwan-tax.md | knowledge/supporting/taiwan-tax.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/security/tenant-framework.md | knowledge/security/tenant-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/supporting/terminology.md | knowledge/supporting/terminology.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/framework/user-journey-framework.md | knowledge/framework/user-journey-framework.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/catalog/value-object-catalog.md | knowledge/catalog/value-object-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/rule/withdrawal-rule-catalog.md | knowledge/rule/withdrawal-rule-catalog.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | knowledge/engine/workflow-engine-framework.md | knowledge/engine/workflow-engine-framework.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-canonical-duplicate-decision-report.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | S8 | True |
| .codex/reports/knowledge-path-governance-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-repository-validation-report.md | .codex/reports/knowledge-repository-validation-report.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-repository-validation-report.md | .codex/reports/knowledge-repository-validation-report.md | S8 | True |
| .codex/reports/knowledge-inventory-reconciliation-report.md | .codex/reports/knowledge-upgrade-batch-report.md | .codex/reports/knowledge-upgrade-batch-report.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-upgrade-batch-report.md | .codex/reports/knowledge-upgrade-batch-report.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-upgrade-health-report.md | .codex/reports/knowledge-upgrade-health-report.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-upgrade-health-report.md | .codex/reports/knowledge-upgrade-health-report.md | S8 | True |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-upgrade-report.md | .codex/reports/knowledge-upgrade-report.md | S8 | True |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-upgrade-report.md | .codex/reports/knowledge-upgrade-report.md | S8 | True |

## PWA Publication Strategy

BUILD_COPY_FROM_KNOWLEDGE. docs/knowledge must not be deleted until publication from knowledge/ is implemented and validated.

## Knowledge Consolidation Decision

`knowledge/` and `docs/knowledge/` must be consolidated into one canonical knowledge root.

| Decision | Value |
|---|---|
| Consolidation Strategy | MERGE_DOCS_KNOWLEDGE_INTO_KNOWLEDGE |
| Canonical Source | knowledge/ |
| Legacy Source | docs/knowledge/ |
| Duplicate Policy | Canonical entity files under knowledge/entity/ win; legacy duplicates are Superseded |
| Long-term docs/knowledge Policy | Remove after migration and reference repair validation |
| Permanent Compatibility Copy | Not allowed |
| Symlink | Not allowed |
| Manual Duplicate Maintenance | Not allowed |

Consolidation must be performed by migration batches only. No bulk move of all legacy knowledge files is allowed.

## Static-first PWA Decision

The preferred application architecture is a static-first PWA.

| Decision | Value |
|---|---|
| Application Architecture | STATIC_FIRST_PWA |
| Runtime Database Requirement | NO_REQUIRED_RUNTIME_DATABASE |
| Backend Requirement | Not required for static knowledge publication |
| Content Source | knowledge/ |
| Build Output | dist/ |
| Runtime Content Loading | Build-time generated static assets |
| Static Content Format | JSON index, bundled Markdown, or pre-rendered static assets |
| Router | HashRouter |
| Offline Strategy | Service Worker cache-first for generated assets |
| IndexedDB | Optional browser-local cache only; not a required database |
| Repository Path Dependency | Not allowed at runtime |
| GitHub Pages | Vite build deployed by GitHub Actions |

If user-owned local data is introduced later, it must remain browser-local by default and must not require a backend database unless a separate architecture decision explicitly approves it.

## Batch S1 Readiness Check

| Check | Result |
|---|---|
| S1 MOVE Entries | 13 |
| Missing Source Path | 0 |
| Existing Target Path | 0 |
| Manifest Source `.codex/state/atlas-knowledge-progress.json` | Exists |
| Manifest Target `.codex/state/atlas-knowledge-progress.json` | Does not exist |
| Batch S1 Ready | Yes |

S1 is ready to execute as a controlled batch. Execution must still stop after S1 and must not continue automatically to S2.

## Static Content Index Design

The static PWA should not read Markdown directly from repository paths at runtime.

| Artifact | Purpose | Generated From |
|---|---|---|
| `public/knowledge/index.json` | Navigation, titles, categories, canonical paths | `knowledge/**/*.md` |
| `public/knowledge/documents/*.json` | Renderable document payloads | Individual canonical Markdown files |
| `public/knowledge/search-index.json` | Client-side search index | Extracted headings, keywords, and body text |
| `public/knowledge/references.json` | Related-specification links | Migration Map and repaired references |

Minimum document payload shape:

```json
{
  "id": "",
  "title": "",
  "category": "",
  "canonicalPath": "",
  "sourceHash": "",
  "headings": [],
  "bodyMarkdown": "",
  "references": []
}
```

## PWA Build Planning

| Area | Decision |
|---|---|
| Framework | Vite static frontend |
| Deployment | GitHub Actions Pages deployment |
| Router | HashRouter |
| Output | `dist/` |
| Runtime DB | None required |
| Offline | Service Worker cache for generated static assets |
| Browser Storage | Optional local cache only |
| Implementation Batch | S7 or independent PWA Publication Batch |

Implementation gap: `frontend/` currently contains only `README.md`; no Vite PWA source is present yet. This gap must be addressed after S1-S6 knowledge consolidation or in an independent PWA Publication Batch.

## Migration Batches

### Batch S1 Control and Reports

Files: 10
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S2 Canonical Catalogs

Files: 16
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S3 Entities and Aggregates

Files: 5
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S4 Rules and Engines

Files: 11
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S5 Frameworks and Workflows

Files: 59
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S6 Supporting Specifications

Files: 63
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S7 Docs Normalization

Files: 50
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S8 Reference Repair

Files: 0
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S9 Manifest and Queue Rebuild

Files: 0
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure

### Batch S10 Repository Validation

Files: 0
Dependencies: previous batch
Risk: MEDIUM
Required Validation: manifest coverage, link validation
Rollback Strategy: restore paths from migration map
Stop Conditions: target conflict, broken reference spike, PWA route failure


## Rollback Strategy

Use .codex/atlas-repository-migration-map.json as the authoritative reverse mapping. Stop and revert the current batch if target conflicts, broken references, or PWA route failures are detected.

## Validation Strategy

Validate file count, target uniqueness, reference integrity, manifest coverage, queue integrity, and PWA navigation after each batch.

## Stop Conditions

- Target path conflict.
- Case-insensitive target conflict.
- Missing file in migration matrix.
- Broken references not listed for repair.
- PWA direct dependency without publication strategy.

## Phase 2 Resume Criteria

Phase 2 remains paused until structure migration is complete or explicitly deferred and manifest paths are stable.

# Approved Structure Decision

| Decision | Value |
|---|---|
| Canonical Knowledge Root | knowledge/ |
| Project Documentation Root | docs/ |
| Codex Control Root | .codex/ |
| Pipeline Report Root | .codex/reports/ |
| Legacy Knowledge Root | docs/knowledge/ |
| Migration Strategy | PHYSICAL_MOVE_WITH_REFERENCE_REPAIR |
| PWA Knowledge Source | knowledge/ |
| PWA Publication Strategy | BUILD_COPY_FROM_KNOWLEDGE |
| GitHub Pages Strategy | VITE_GITHUB_ACTIONS_DIST |
| Permanent Mirror | 不允許 |
| Symlink | 不允許 |
| Phase 2 | PAUSED until S10 validation passes |

## Migration Readiness

Ready

| Readiness Condition | Status |
|---|---|
| Migration Mapping Entries == Actual Markdown Count | 214 == 214 |
| Manual Decision Required | 0 |
| Target Path Conflict | 0 |
| Target Path Case Conflict | 0 |
| Canonical Subject Conflict | 0 |
| All MOVE Entries Have Target Path | Passed |
| All Superseded Entries Have Canonical Target | Passed |
| All Legacy References Have Repair Mapping | 464 mapped |
| PWA Publication Strategy Approved | BUILD_COPY_FROM_KNOWLEDGE |
| GitHub Pages Strategy Approved | VITE_GITHUB_ACTIONS_DIST |
| Rollback Mapping Complete | Passed |
| Phase 2 Paused | Passed |

## Migration Batch Order

1. S1 — Codex Control and Pipeline Reports
2. S2 — Canonical Catalogs
3. S3 — Entities, Aggregates, Value Objects and Enumerations
4. S4 — Rules and Engines
5. S5 — Frameworks, Workflows, Services and Repositories
6. S6 — Security, Integration, Reporting and Supporting Specifications
7. S7 — Project Documentation and PWA Publication Configuration
8. S8 — Full Reference Repair
9. S9 — Manifest, Inventory, Dependency and Queue Rebuild
10. S10 — Repository Validation
11. S11 — Cross Knowledge Validation
12. S12 — Phase 2 Resume

## Migration Batch S1 Preview

S1 does not move, rename, delete, or edit Atlas Domain Specifications during this decision update. It is planned only.

| Current Path | Target Path | Action | References to Repair | Manifest Impact | Rollback Path | Risk | Validation |
|---|---|---|---:|---|---|---|---|
| .codex/policies/development-rules.md | .codex/policies/development-rules.md | MOVE | 0 | Manifest path/reference update if listed | .codex/policies/development-rules.md -> .codex/policies/development-rules.md | LOW | source exists; target absent; UTF-8; diff reviewed |
| .codex/prompts/prompt.md | .codex/prompts/prompt.md | MOVE | 0 | Manifest path/reference update if listed | .codex/prompts/prompt.md -> .codex/prompts/prompt.md | LOW | source exists; target absent; UTF-8; diff reviewed |
| .codex/policies/testing-rules.md | .codex/policies/testing-rules.md | MOVE | 0 | Manifest path/reference update if listed | .codex/policies/testing-rules.md -> .codex/policies/testing-rules.md | LOW | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-canonical-duplicate-decision-report.md | .codex/reports/knowledge-canonical-duplicate-decision-report.md | MOVE | 1 | Manifest path/reference update if listed | .codex/reports/knowledge-canonical-duplicate-decision-report.md -> .codex/reports/knowledge-canonical-duplicate-decision-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-inventory-reconciliation-report.md | .codex/reports/knowledge-inventory-reconciliation-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-inventory-reconciliation-report.md -> .codex/reports/knowledge-inventory-reconciliation-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-path-governance-report.md | .codex/reports/knowledge-path-governance-report.md | MOVE | 0 | Manifest path/reference update if listed | .codex/reports/knowledge-path-governance-report.md -> .codex/reports/knowledge-path-governance-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-progress-reconciliation-report.md | .codex/reports/knowledge-progress-reconciliation-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-progress-reconciliation-report.md -> .codex/reports/knowledge-progress-reconciliation-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-repository-migration-plan.md | .codex/reports/knowledge-repository-migration-plan.md | MOVE | 0 | Manifest path/reference update if listed | .codex/reports/knowledge-repository-migration-plan.md -> .codex/reports/knowledge-repository-migration-plan.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-repository-structure-governance-report.md | .codex/reports/knowledge-repository-structure-governance-report.md | MOVE | 0 | Manifest path/reference update if listed | .codex/reports/knowledge-repository-structure-governance-report.md -> .codex/reports/knowledge-repository-structure-governance-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-repository-validation-report.md | .codex/reports/knowledge-repository-validation-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-repository-validation-report.md -> .codex/reports/knowledge-repository-validation-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-upgrade-batch-report.md | .codex/reports/knowledge-upgrade-batch-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-upgrade-batch-report.md -> .codex/reports/knowledge-upgrade-batch-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-upgrade-health-report.md | .codex/reports/knowledge-upgrade-health-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-upgrade-health-report.md -> .codex/reports/knowledge-upgrade-health-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/reports/knowledge-upgrade-report.md | .codex/reports/knowledge-upgrade-report.md | MOVE | 2 | Manifest path/reference update if listed | .codex/reports/knowledge-upgrade-report.md -> .codex/reports/knowledge-upgrade-report.md | MEDIUM | source exists; target absent; UTF-8; diff reviewed |
| .codex/state/atlas-knowledge-progress.json | .codex/state/atlas-knowledge-progress.json | MOVE | Manifest references | Manifest physical target changes in S1 only | .codex/state/atlas-knowledge-progress.json -> .codex/state/atlas-knowledge-progress.json | MEDIUM | source exists; target absent; pipeline smoke validation |
| .codex/prompts/ | .codex/prompts/ | CREATE_DIRECTORY | 0 | None | remove empty directory if batch rolls back | LOW | directory exists after S1 |
| .codex/policies/ | .codex/policies/ | CREATE_DIRECTORY | 0 | None | remove empty directory if batch rolls back | LOW | directory exists after S1 |
| .codex/reports/ | .codex/reports/ | CREATE_DIRECTORY | 0 | Report targets depend on it | remove empty directory if batch rolls back | LOW | directory exists after S1 |
| .codex/state/ | .codex/state/ | CREATE_DIRECTORY | 0 | Manifest target depends on it | remove empty directory if batch rolls back | LOW | directory exists after S1 |
