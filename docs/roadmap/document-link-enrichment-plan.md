# Document Link Enrichment Plan

## Purpose

This plan defines how to add useful cross-document links without turning the knowledge repository into a fragile web of manual references.

## Current State

- Knowledge source coverage is complete: 153 Markdown source files are represented by 153 generated JSON documents.
- Existing Markdown link usage is minimal.
- The frontend search experience currently relies on generated indexes rather than manual cross-links.

## Recommended Link Targets

| Source Area | Link Targets |
| --- | --- |
| `README.md` | PWA docs, roadmap reports, generated artifact governance |
| `docs/pwa/` | `frontend/README.md`, PWA validation docs, service worker docs |
| `docs/roadmap/` | governance reports, split plans, filename plans |
| `knowledge/entity/` | domain model catalog, entity catalog, related rules |
| `knowledge/framework/` | engine docs, rule docs, reporting docs |
| `knowledge/supporting/` | assumptions, formulas, Taiwan-specific references |

## Link Rules

- Prefer links from short overview documents to canonical detailed documents.
- Avoid adding many links inside generated or oversized catalog files until after split work.
- Use relative Markdown links from authored Markdown files.
- Rebuild `frontend/knowledge/` after adding links under `knowledge/`.
- Validate generated document count and PWA validation after link changes.

## Batch 1

- Add navigation links from `README.md` to key roadmap reports.
- Add links from PWA overview docs to validation and generated artifact governance.
- Add links from split plans to document governance report.

## Batch 1 Completed Links

- [Project README](../../README.md)
- [PWA Overview](../pwa/00-PWA-Overview.md)
- [Document Governance Report](document-governance-report-2026-07-15.md)
- [Large Document Split Batch 1](large-document-split-plan-batch-1.md)
- [Large Document Split Batch 5](large-document-split-plan-batch-5.md)
- [Large Document Split Batch 6](large-document-split-plan-batch-6.md)
- [Large Document Split Batch 7](large-document-split-plan-batch-7.md)
- [Large Document Split Batch 8](large-document-split-plan-batch-8.md)
- [Large Document Split Batch 9](large-document-split-plan-batch-9.md)
- [Large Document Split Batch 10](large-document-split-plan-batch-10.md)
- [Large Document Split Batch 11](large-document-split-plan-batch-11.md)
- [Large Document Split Batch 12](large-document-split-plan-batch-12.md)
- [Large Document Split Batch 13](large-document-split-plan-batch-13.md)
- [Large Document Split Batch 14](large-document-split-plan-batch-14.md)
- [Large Document Split Batch 15](large-document-split-plan-batch-15.md)
- [Large Document Split Batch 16](large-document-split-plan-batch-16.md)
- [Large Document Split Batch 17](large-document-split-plan-batch-17.md)
- [Large Document Split Batch 18](large-document-split-plan-batch-18.md)
- [Dashboard Persistence Scaffold](dashboard-persistence-scaffold.md)
- [Dashboard Persistence Migration](dashboard-persistence-migration.md)
- [Dashboard Scenario Switching Report](dashboard-scenario-switching-report.md)
- [Loan Split Progress Report](loan-split-progress-report.md)
- [Decision Insights Split Progress Report](decision-insights-split-progress-report.md)
- [Financial Health Score Split Progress Report](financial-health-score-split-progress-report.md)
- [Recommendation Execution Split Progress Report](recommendation-execution-split-progress-report.md)
- [Recommendation Evaluation Split Progress Report](recommendation-evaluation-split-progress-report.md)
- [Goal Funding Split Progress Report](goal-funding-split-progress-report.md)
- [Goal Progress Tracking Split Progress Report](goal-progress-tracking-split-progress-report.md)
- [Investment Drawdown Fixture Report](investment-drawdown-fixture-report.md)
- [Portfolio Performance Split Progress Report](portfolio-performance-split-progress-report.md)
- [Risk Budget Split Progress Report](risk-budget-split-progress-report.md)
- [Rebalancing Split Progress Report](rebalancing-split-progress-report.md)
- [Portfolio Supporting Split Progress Report](portfolio-supporting-split-progress-report.md)
- [Simulator Runtime Scaffold Report](simulator-runtime-scaffold-report.md)
- [Simulator Output Validation Report](simulator-output-validation-report.md)
- [Simulator Formula Implementation Report](simulator-formula-implementation-report.md)
- [Market Assumptions Split Progress Report](market-assumptions-split-progress-report.md)
- [Asset Allocation Split Progress Report](asset-allocation-split-progress-report.md)
- [Fixture Validation Hardening Report](fixture-validation-hardening-report.md)
- [Fixture Output Tolerance Report](fixture-output-tolerance-report.md)
- [PWA Visual Validation Report](pwa-visual-validation-report-2026-07-15.md)
- [Offline Cache Validation Report](offline-cache-validation-report-2026-07-15.md)
- [Visual Artifacts](visual-artifacts.md)
