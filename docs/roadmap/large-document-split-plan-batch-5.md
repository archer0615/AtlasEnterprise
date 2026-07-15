# Large Document Split Plan - Batch 5

## Purpose

This batch continues oversized document decomposition after the first catalog and framework split waves. It targets documents that still mix domain model, integration, event, and API governance concerns in single files.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/supporting/event-driven-architecture.md` | 747.1 | Event model, publication flow, delivery guarantees, observability, failure handling |
| 2 | `knowledge/catalog/message-contract-catalog.md` | 722.6 | Command contracts, event contracts, query payloads, integration messages |
| 3 | `knowledge/integration/integration-framework.md` | 655.7 | Banking, brokerage, market data, notification, and external API integration |
| 4 | `knowledge/catalog/domain-service-catalog.md` | 592.0 | Financial planning, decision, scenario, risk, and infrastructure services |
| 5 | `knowledge/catalog/repository-catalog.md` | 476.5 | Aggregate repository, read model repository, import repository, audit repository |

## Batch 5 Recommendation

Start with `event-driven-architecture.md` because it is a high-reference supporting document and likely defines language reused by contracts, integrations, and schedulers. Split it only after extracting a stable event taxonomy and preserving the delivery semantics used by message contracts.

## Guardrails

- Preserve event names, command names, and payload field names exactly.
- Keep cross-document links relative and local.
- Add forwarding links from the parent document to split child documents.
- Rebuild `frontend/knowledge/` after each split.
- Validate generated document count and PWA validation before starting the next candidate.

## Related Documents

- [Document Governance Report](document-governance-report-2026-07-15.md)
- [Document Link Enrichment Plan](document-link-enrichment-plan.md)
- [Batch 1 Split Plan](large-document-split-plan-batch-1.md)
- [Batch 6 Split Plan](large-document-split-plan-batch-6.md)
