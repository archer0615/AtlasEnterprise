# Simulator Formula Coverage

Document Path: knowledge/product/simulator-formula-coverage.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.1
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Simulator
Owner: Project Atlas
Source of Truth: Atlas Simulator Formula Coverage Source of Truth
Last Updated: 2026-07-20

## Purpose

Tracks simulator formula coverage across current fixtures, expected calculations, and known gaps.

## Coverage Matrix

| Fixture | Covered Formula Area | Current State | Known Gap |
| --- | --- | --- | --- |
| `mortgage-prepayment-baseline-2026.json` | Mortgage payment, cash-flow pressure, emergency reserve impact | Fixture-backed and validated | Uses `FORM-PMT`, `FORM-LOAN-AMORTIZATION`, `FORM-CF-COVERAGE`. |
| `home-upgrade-2031-baseline.json` | Home upgrade budget, transaction cost, cash requirement | Fixture-backed and validated | Property transaction cost model needs canonical formula IDs. |
| `retirement-readiness-stress.json` | Retirement readiness, return stress, inflation sensitivity | Fixture-backed and validated | Withdrawal sequence and longevity stress need deeper coverage. |
| `loan-refinancing-rate-shock.json` | Refinancing comparison, rate shock, monthly payment pressure | Fixture-backed and validated | Uses `FORM-REFI-BREAK-EVEN`, `FORM-PMT`, `FORM-DTI`. |
| `investment-drawdown-stress.json` | Drawdown, remaining assets, liquidity buffer | Fixture-backed and validated | Portfolio risk attribution and rebalance formulas need formula IDs. |

## Required Formula Metadata

- Formula identifier.
- Formula version.
- Input fields.
- Output fields.
- Assumption version.
- Rounding policy.
- Validation fixture.
- Replay and audit requirements.

## Runtime Recommendation Coverage

- Runtime simulator output derives recommendation status, explanation, warning references, and source metadata from formula runtime service output.
- Recommendation output must include `engine-derived-recommendation.v1` as source.
- Score output must remain traceable to `FORM-DECISION-SCORE` and the active score policy version.
- Fixture expected recommendation explanation is no longer the runtime source of truth.

## Validation

- `npm run validate:fixtures`
- `npm run validate:simulator`
- `npm run validate:frontend`

## Recommended Next Coverage

- Portfolio drawdown attribution formula.
- Retirement withdrawal sustainability formula.
- Dashboard metric-to-formula ID mapping.
- Production calculation service projection for recommendation text and execution guidance.

## Related Specifications

- `knowledge/engine/simulation-engine-framework.md`
- `knowledge/engine/calculation-engine-framework.md`
- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/product/dashboard-formula-traceability.md`
- `simulator/fixtures/scenario-fixture-schema.md`
