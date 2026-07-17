# Current Capability Matrix

Document Path: knowledge/product/current-capability-matrix.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Product
Owner: Project Atlas
Source of Truth: Atlas Product Capability Source of Truth
Last Updated: 2026-07-16

## Purpose

Maps the current product capabilities to implementation state, fixture support, canonical knowledge, and known gaps.

## Status Legend

- Implemented: supported by runtime code.
- Fixture-backed: supported by checked-in fixture data.
- Documented: covered by canonical or roadmap documentation.
- Gap: not yet complete or not yet canonical.

## Capability Matrix

| Capability | Implemented | Fixture-backed | Documented | Canonical Knowledge | Known Gap |
| --- | --- | --- | --- | --- | --- |
| Static-first PWA shell | Yes | N/A | Yes | Gap | Product-level PWA runtime specification pending. |
| Service worker offline cache | Yes | Yes | Yes | Gap | Cache invalidation and recovery rules need canonical product spec. |
| Generated knowledge browser | Yes | Yes | Yes | Yes | Source hierarchy now defined; search quality tuning remains future work. |
| Decision dashboard | Yes | Yes | Yes | Yes | Runtime snapshot contract needs direct field-level traceability. |
| Scenario switching | Yes | Yes | Yes | Yes | UI labels need encoding cleanup in fixture-backed views. |
| Simulator fixture validation | Yes | Yes | Yes | Yes | Formula coverage still needs amortization and refinancing depth. |
| Recommendation lifecycle | Partial | Yes | Yes | Yes | Runtime output now validates execution trace fields; UI execution controls remain staged. |
| Goal lifecycle and funding | Partial | Yes | Yes | Yes | End-to-end workflow now documented; runtime integration remains staged. |
| Portfolio allocation and reporting | Partial | Yes | Yes | Yes | Dashboard/reporting contract now validates portfolio runtime traceability; interactive reporting workflow remains staged. |
| Loan and mortgage analysis | Partial | Yes | Yes | Yes | Amortization, prepayment, refinancing fee, rate shock, and no-savings boundary fixtures are covered; production-grade UI workflow remains staged. |
| Automation workflows | Partial | N/A | Yes | Yes | Runtime scheduling and approval behavior needs implementation traceability. |
| Rule governance | Partial | N/A | Yes | Yes | Lifecycle, conflict handling, and rule test matrix added in this batch. |

## Governance

- New capabilities must map to at least one canonical `knowledge/**` document.
- Fixture-backed capabilities must name the fixture source and validation command.
- Runtime-only behavior must be promoted into `knowledge/product/**` or domain knowledge before it is considered canonical.
- Known gaps must remain visible until implementation, fixture, documentation, and validation are aligned.

## Related Specifications

- `knowledge/governance/knowledge-source-of-truth.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/workflow/decision-workflow.md`
- `knowledge/workflow/goal-workflow.md`
- `knowledge/workflow/portfolio-workflow.md`
- `knowledge/workflow/loan-workflow.md`
- `knowledge/workflow/automation-workflow.md`
