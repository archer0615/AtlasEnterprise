# Domain Coverage Audit - 2026-07-16

## Scope

- `knowledge/**`
- `docs/knowledge/**`

## Coverage Summary

- Strong coverage: catalog, supporting domain, framework, entity, security, reporting, engine, API, integration, rule, workflow.
- Highest density: catalog, supporting, framework.
- Generated knowledge corpus: 608 documents.
- Legacy reference corpus: 5 documents under `docs/knowledge/entity`.

## Gaps

- `knowledge/workflow` only contains `decision-workflow.md`; goal, portfolio, loan, reporting, integration, and automation workflows are missing.
- `knowledge/rule` has limited coverage and lacks rule taxonomy, lifecycle, testing, and conflict resolution specifications.
- `knowledge/api` is governance-heavy and lacks an endpoint/API surface catalog by bounded context.
- Engine coverage is uneven: simulation and optimization are split, while calculation, projection, workflow, and rule engines need similar depth.
- `docs/knowledge/entity` overlaps with `knowledge/entity` for Asset, Household, Liability, Loan, and Mortgage.

## Overlap Areas

- `knowledge/entity/*.md` and `docs/knowledge/entity/*.md`
- `knowledge/framework/automation*`, `knowledge/framework/scheduler*`, and `knowledge/framework/background-job*`
- `knowledge/supporting/goal-lifecycle.md` and `knowledge/supporting/goal-lifecycle-management.md`
- `knowledge/supporting/recommendation-execution/execution-planning.md` and `knowledge/supporting/recommendation-execution/planning-and-workflow.md`
- `knowledge/catalog/service-catalog`, `knowledge/catalog/application-service`, `knowledge/catalog/domain-service`, and `knowledge/catalog/services`

## Recommended Backlog

| Priority | Document | Purpose |
| --- | --- | --- |
| P0 | `knowledge/governance/knowledge-source-of-truth.md` | Define canonical source rules across `knowledge` and `docs/knowledge`. |
| P0 | `knowledge/workflow/goal-workflow.md` | End-to-end goal workflow. |
| P0 | `knowledge/workflow/portfolio-workflow.md` | End-to-end portfolio workflow. |
| P0 | `knowledge/workflow/loan-workflow.md` | End-to-end loan workflow. |
| P0 | `knowledge/workflow/automation-workflow.md` | End-to-end automation workflow. |
| P1 | `knowledge/rule/rule-lifecycle-framework.md` | Rule authoring, validation, deployment, and retirement. |
| P1 | `knowledge/rule/rule-conflict-resolution.md` | Rule precedence and conflict handling. |
| P1 | `knowledge/api/endpoint-catalog.md` | API surface and bounded-context endpoint ownership. |
| P1 | `knowledge/engine/calculation-engine/catalog-and-matrices.md` | Calculation engine split depth. |
| P1 | `knowledge/engine/projection-engine/catalog-and-matrices.md` | Projection engine split depth. |
| P2 | `knowledge/product/current-capability-matrix.md` | Product capability to knowledge document traceability. |
