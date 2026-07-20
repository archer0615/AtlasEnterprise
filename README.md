# Project Atlas Enterprise v1.0

Project Atlas / LifeOS is a personal life-finance decision-support system. It is not a bookkeeping app.

The system should support long-term decisions:
- 2027 repayment of ordinary mortgage portion
- 2031+ home upgrade
- Whether to sell or keep the current home
- Car purchase timing and financing
- Retirement readiness
- Investment and cash-flow stress testing

## Current implementation direction

Atlas v1 is a Static-first, Local-first GitHub Pages PWA. The core runtime is:

- GitHub Pages deployment
- Static PWA
- Browser Runtime
- Offline-first
- IndexedDB Persistence
- Local Calculation Runtime

The repository is being organized around that PWA v1 architecture.

- Source knowledge lives in `knowledge/**/*.md`.
- Runtime knowledge data is generated into `frontend/knowledge/`.
- The frontend reads static JSON files and does not require a backend, server database, or cloud service to start.
- The PWA shell lives in `frontend/`.
- ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync are Future Optional Architecture only.

## Repository navigation

- `knowledge/` contains canonical domain, rule, engine, framework, and supporting Markdown knowledge.
- `docs/` contains product specifications, PWA implementation notes, database design, API notes, roadmap, and governance reports.
- `frontend/` contains the static PWA shell and generated knowledge JSON consumed at runtime.
- `frontend/knowledge/` is generated output; update `knowledge/**/*.md` first, then rebuild.
- `backend/`, `database/`, and `ai/` are Future Optional Architecture or prototype areas and must not be required for PWA v1 startup or operation.
- `simulator/` supports local scenario, decision, and calculation validation without changing canonical rules or formulas.

## Document entry points

- [Current status](docs/status/current-status.md)
- [Feature matrix](docs/status/feature-matrix.md)
- [Architecture status](docs/status/architecture-status.md)
- [Validation status](docs/status/validation-status.md)
- [Next priority](docs/status/next-priority.md)
- [Specification runtime traceability](docs/status/specification-runtime-traceability.json)
- [Document governance report](docs/roadmap/document-governance-report-2026-07-15.md)
- [Document link enrichment plan](docs/roadmap/document-link-enrichment-plan.md)
- [Large document split batch 1](docs/roadmap/large-document-split-plan-batch-1.md)
- [Large document split batch 5](docs/roadmap/large-document-split-plan-batch-5.md)
- [Large document split batch 6](docs/roadmap/large-document-split-plan-batch-6.md)
- [Large document split batch 7](docs/roadmap/large-document-split-plan-batch-7.md)
- [Large document split batch 8](docs/roadmap/large-document-split-plan-batch-8.md)
- [Large document split batch 9](docs/roadmap/large-document-split-plan-batch-9.md)
- [Large document split batch 10](docs/roadmap/large-document-split-plan-batch-10.md)
- [Large document split batch 11](docs/roadmap/large-document-split-plan-batch-11.md)
- [Large document split batch 12](docs/roadmap/large-document-split-plan-batch-12.md)
- [Large document split batch 13](docs/roadmap/large-document-split-plan-batch-13.md)
- [Large document split batch 14](docs/roadmap/large-document-split-plan-batch-14.md)
- [Large document split batch 15](docs/roadmap/large-document-split-plan-batch-15.md)
- [Large document split batch 16](docs/roadmap/large-document-split-plan-batch-16.md)
- [Large document split batch 17](docs/roadmap/large-document-split-plan-batch-17.md)
- [Large document split batch 18](docs/roadmap/large-document-split-plan-batch-18.md)
- [Decision dashboard data model plan](docs/roadmap/decision-dashboard-data-model-plan.md)
- [Dashboard persistence scaffold](docs/roadmap/dashboard-persistence-scaffold.md)
- [Dashboard persistence migration](docs/roadmap/dashboard-persistence-migration.md)
- [Dashboard scenario switching report](docs/roadmap/dashboard-scenario-switching-report.md)
- [Loan split progress report](docs/roadmap/loan-split-progress-report.md)
- [Decision insights split progress report](docs/roadmap/decision-insights-split-progress-report.md)
- [Financial health score split progress report](docs/roadmap/financial-health-score-split-progress-report.md)
- [Recommendation execution split progress report](docs/roadmap/recommendation-execution-split-progress-report.md)
- [Recommendation evaluation split progress report](docs/roadmap/recommendation-evaluation-split-progress-report.md)
- [Goal funding split progress report](docs/roadmap/goal-funding-split-progress-report.md)
- [Goal progress tracking split progress report](docs/roadmap/goal-progress-tracking-split-progress-report.md)
- [Investment drawdown fixture report](docs/roadmap/investment-drawdown-fixture-report.md)
- [Portfolio performance split progress report](docs/roadmap/portfolio-performance-split-progress-report.md)
- [Risk budget split progress report](docs/roadmap/risk-budget-split-progress-report.md)
- [Rebalancing split progress report](docs/roadmap/rebalancing-split-progress-report.md)
- [Portfolio supporting split progress report](docs/roadmap/portfolio-supporting-split-progress-report.md)
- [Simulator runtime scaffold report](docs/roadmap/simulator-runtime-scaffold-report.md)
- [Simulator output validation report](docs/roadmap/simulator-output-validation-report.md)
- [Simulator formula implementation report](docs/roadmap/simulator-formula-implementation-report.md)
- [Market assumptions split progress report](docs/roadmap/market-assumptions-split-progress-report.md)
- [Asset allocation split progress report](docs/roadmap/asset-allocation-split-progress-report.md)
- [Scenario simulator fixture design](simulator/fixtures/scenario-fixture-design.md)
- [Scenario fixture schema](simulator/fixtures/scenario-fixture-schema.md)
- [Fixture validation hardening report](docs/roadmap/fixture-validation-hardening-report.md)
- [Fixture output tolerance report](docs/roadmap/fixture-output-tolerance-report.md)
- [PWA visual validation report](docs/roadmap/pwa-visual-validation-report-2026-07-15.md)
- [Offline cache validation report](docs/roadmap/offline-cache-validation-report-2026-07-15.md)
- [Visual artifacts](docs/roadmap/visual-artifacts.md)

## Validation commands

- `npm run build:knowledge`
- `npm run validate:frontend`
- `npm run validate:pwa`
- `npm run validate:offline`
- `npm run validate:deployment`
- `npm run validate:fixtures`
- `npm run validate`
- `npm run build`
