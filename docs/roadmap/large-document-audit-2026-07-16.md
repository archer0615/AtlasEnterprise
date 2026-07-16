# Large Document Audit - 2026-07-16

## Scope

Audited Markdown files under `knowledge/` and `docs/` by line count, byte size, heading density, and existing `Split Navigation` coverage.

## Largest Documents

| Rank | File | Lines | Size KB | Split Navigation |
| ---: | --- | ---: | ---: | --- |
| 1 | `knowledge/catalog/repository-catalog.md` | 5007 | 477.0 | Yes |
| 2 | `knowledge/security/permission-framework.md` | 4694 | 421.7 | Yes |
| 3 | `knowledge/catalog/domain-event-catalog.md` | 3520 | 365.1 | Yes |
| 4 | `knowledge/catalog/message-contract-catalog.md` | 3004 | 723.2 | Yes |
| 5 | `knowledge/security/permission-framework/permission-catalog.md` | 2980 | 204.7 | Yes |
| 6 | `knowledge/supporting/goal-conflict-resolution.md` | 2875 | 135.5 | Yes |
| 7 | `knowledge/catalog/aggregate-catalog.md` | 2864 | 77.1 | Yes |
| 8 | `knowledge/catalog/domain-model-catalog.md` | 2651 | 809.3 | Yes |
| 9 | `knowledge/catalog/enumeration-catalog.md` | 2650 | 360.1 | Yes |
| 10 | `knowledge/catalog/application-service-catalog.md` | 2649 | 766.7 | Yes |
| 11 | `knowledge/catalog/domain-service-catalog.md` | 2615 | 592.6 | Yes |
| 12 | `knowledge/supporting/event-driven-architecture.md` | 2610 | 747.7 | Yes |
| 13 | `knowledge/catalog/bounded-context-catalog.md` | 2520 | 798.0 | Yes |
| 14 | `knowledge/integration/integration-framework.md` | 2510 | 656.4 | Yes |
| 15 | `knowledge/framework/background-job-framework.md` | 2491 | 844.6 | Yes |

## Unsplitted High-Priority Files

| File | Lines | Size KB | Reason |
| --- | ---: | ---: | --- |
| `knowledge/entity/Goal.md` | 1452 | 56.7 | No `Split Navigation`; central goal state and funding rules are dense. |
| `knowledge/entity/ActionPlan.md` | 1338 | 52.0 | No `Split Navigation`; command, task, and audit content can be separated. |
| `knowledge/entity/ExecutionPlan.md` | 1322 | 53.6 | No `Split Navigation`; execution workflow and persistence rules should be isolated. |
| `knowledge/entity/Recommendation.md` | 1231 | 54.8 | No `Split Navigation`; recommendation state and lifecycle overlap supporting docs. |
| `docs/knowledge/entity/Loan.md` | 1194 | 59.5 | Legacy docs mirror entity content and need source-of-truth review. |
| `docs/knowledge/entity/Mortgage.md` | 1190 | 63.2 | Legacy docs mirror entity content and need source-of-truth review. |
| `knowledge/reporting/decision-reporting.md` | 1157 | 54.4 | No `Split Navigation`; repeats metrics, audit, and dashboard structure. |
| `knowledge/reporting/goal-reporting.md` | 1072 | 53.9 | No `Split Navigation`; repeats goal metrics and reporting governance. |
| `knowledge/framework/goal-execution-framework.md` | 1070 | 56.9 | No `Split Navigation`; overlaps entity execution plan and workflow content. |

## Findings

- Most very large catalog and framework files already have split navigation, so the next useful work is not only size reduction but closing remaining no-navigation gaps.
- Entity documents are the clearest next batch because several exceed 1,200 lines and still expose all sections in a single parent file.
- Legacy `docs/knowledge/entity/**` files should be reviewed before splitting to avoid creating parallel canonical copies.

## Recommended Next Batch

- Execute `next-sub-agent-split-batch-19.md`.
- Prioritize Worker AE before AF and AG.
- After parent split links are added, rebuild generated knowledge indexes.
