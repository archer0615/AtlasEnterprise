# Scenario Simulator Fixture Design

## Purpose

Scenario fixtures provide deterministic sample inputs and expected outputs for mortgage repayment, home upgrade, car purchase, retirement readiness, and market stress simulations.

## Fixture Principles

- Fixtures must be versioned with assumption and formula references.
- Inputs must be explicit and must not rely on hidden defaults.
- Expected outputs should include tolerance rules for calculated values.
- Each fixture should explain which decision question it exercises.
- Fixtures are test data, not user financial advice.

## Minimal Fixture Shape

```json
{
  "fixtureId": "mortgage-prepayment-baseline-2026",
  "name": "Mortgage prepayment baseline",
  "asOfDate": "2026-07-15",
  "assumptionVersion": "taiwan-financial-assumptions.v1",
  "formulaVersion": "cash-flow-engine-formula.v1",
  "question": "Should the household accelerate ordinary mortgage repayment in 2027?",
  "inputs": {},
  "expected": {
    "metrics": {},
    "warnings": [],
    "recommendation": {}
  },
  "tolerances": {
    "currency": 1,
    "ratio": 0.0001
  },
  "references": []
}
```

## First Fixture Set

| Fixture | Decision Question | Primary References |
| --- | --- | --- |
| `mortgage-prepayment-baseline-2026` | Whether to accelerate ordinary mortgage repayment in 2027 | `knowledge/supporting/taiwan-mortgage.md`, `docs/specification/08B-CashFlowEngine-Formula.md` |
| `home-upgrade-2031-baseline` | Whether 2031 home upgrade timing is financially feasible | `knowledge/framework/house-decision-framework.md`, `knowledge/supporting/property.md` |
| `car-purchase-delay-vs-finance` | Whether to delay car purchase or finance it | `knowledge/rule/loan-decision-rule-catalog.md`, `knowledge/supporting/loan.md` |
| `retirement-readiness-stress` | Whether retirement readiness survives lower returns | `knowledge/supporting/retirement.md`, `knowledge/supporting/market-assumptions.md` |
| `investment-drawdown-stress` | Whether liquidity and goals survive a market drawdown | `knowledge/framework/risk-framework.md`, `knowledge/supporting/portfolio.md` |
| `loan-refinancing-rate-shock` | Whether refinancing is useful when rates rise before reset | `knowledge/entity/Loan.md`, `knowledge/rule/loan-decision-rule-catalog.md` |

## Validation Rules

- Every fixture must include `fixtureId`, `asOfDate`, `assumptionVersion`, and `formulaVersion`.
- Expected recommendation output must include status, score, explanation, and warning references.
- Scenario comparison fixtures must include baseline and at least one alternative.
- Fixture data should remain small enough to review in pull requests.

## Frontend Fixture Bridge

- Dashboard prototype data is exposed through `frontend/fixtures/dashboard-snapshot.json`.
- Frontend fixtures should identify the simulator source fixture through `sourceFixture`.
- Production dashboard data should replace frontend fixtures only after local persistence exists.
- Fixture validation runs through `npm run validate:fixtures`.
- [Scenario fixture schema](scenario-fixture-schema.md) defines the required fields for simulator fixtures and dashboard snapshot bridges.
