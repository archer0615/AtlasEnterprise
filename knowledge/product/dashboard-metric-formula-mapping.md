# Dashboard Metric Formula Mapping

Document Path: knowledge/product/dashboard-metric-formula-mapping.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Dashboard
Owner: Project Atlas
Source of Truth: Atlas Dashboard Metric Formula Mapping Source of Truth
Last Updated: 2026-07-16

## Purpose

Maps dashboard fixture metrics to formula identifiers so dashboard values can be traced, validated, and eventually generated from runtime services.

## Mapping Matrix

| Snapshot | Metric | Formula ID | Source Fixture |
| --- | --- | --- | --- |
| `dashboard-fixture-2026-07-15` | 瘥??舐?暸?瘚?| FORM-CF-COVERAGE | `mortgage-prepayment-baseline-2026.json` |
| `dashboard-fixture-2026-07-15` | ?拚?撟湧? | FORM-LOAN-AMORTIZATION | `mortgage-prepayment-baseline-2026.json` |
| `dashboard-fixture-2026-07-15` | ?狡憯? | FORM-DTI | `mortgage-prepayment-baseline-2026.json` |
| `dashboard-fixture-2026-07-15` | 瘙箇?? | FORM-DECISION-SCORE | `mortgage-prepayment-baseline-2026.json` |
| `home-upgrade-2031-baseline` | ??皞???| FORM-NET-WORTH | `home-upgrade-2031-baseline.json` |
| `home-upgrade-2031-baseline` | ?摯鞈?蝻箏 | FORM-CF-COVERAGE | `home-upgrade-2031-baseline.json` |
| `retirement-readiness-stress` | ?隡?????| FORM-WITHDRAWAL-SUSTAINABILITY | `retirement-readiness-stress.json` |
| `retirement-readiness-stress` | ??摰??| FORM-SWR | `retirement-readiness-stress.json` |
| `loan-refinancing-rate-shock` | 頧硫?? | FORM-REFI-BREAK-EVEN | `loan-refinancing-rate-shock.json` |
| `loan-refinancing-rate-shock` | ?暸?瘚???| FORM-DTI | `loan-refinancing-rate-shock.json` |
| `investment-drawdown-stress` | ??? | FORM-PORTFOLIO-DRAWDOWN | `investment-drawdown-stress.json` |
| `investment-drawdown-stress` | 憯?敺???| FORM-DRAWDOWN-ATTRIBUTION | `investment-drawdown-stress.json` |

## Validation

- Every dashboard snapshot metric should map to at least one formula ID.
- Formula IDs must exist in `knowledge/catalog/financial-formula-catalog.md`.
- Fixture-backed metric values must remain valid UTF-8 and pass frontend validation.

## Related Specifications

- `knowledge/product/dashboard-formula-traceability.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/catalog/financial-formula-catalog.md`
