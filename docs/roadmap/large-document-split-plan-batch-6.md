# Large Document Split Plan - Batch 6

## Purpose

This batch targets remaining large governance and security documents after the event, contract, integration, service, and repository split candidates in batch 5.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/api/api-governance-framework.md` | 471.9 | API lifecycle, versioning, access policy, error model, observability |
| 2 | `knowledge/security/permission-framework.md` | 421.1 | Role model, permission policy, enforcement, audit, tenant isolation |
| 3 | `knowledge/catalog/value-object-catalog.md` | 371.7 | Money, date/time, identifier, scoring, financial ratio value objects |
| 4 | `knowledge/catalog/domain-event-catalog.md` | 364.5 | Decision, goal, scenario, portfolio, notification, integration events |
| 5 | `knowledge/catalog/enumeration-catalog.md` | 359.6 | Decision, goal, risk, lifecycle, execution, integration enumerations |

## Batch 6 Recommendation

Start with `api-governance-framework.md` because it sits between frontend-facing contracts, generated knowledge, and future local API boundaries. Split policy sections before extracting lower-level value object and enumeration catalogs.

## Guardrails

- Preserve lifecycle state names, permission names, and enum values exactly.
- Keep extracted governance rules traceable to original headings.
- Add parent-document forwarding links before deleting duplicated content.
- Rebuild generated knowledge after every source Markdown split.
- Validate PWA indexes and fixture-backed dashboard behavior before starting the next candidate.

## Related Documents

- [Document Governance Report](document-governance-report-2026-07-15.md)
- [Document Link Enrichment Plan](document-link-enrichment-plan.md)
- [Batch 5 Split Plan](large-document-split-plan-batch-5.md)
- [Batch 7 Split Plan](large-document-split-plan-batch-7.md)
