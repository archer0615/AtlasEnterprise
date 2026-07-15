# Loan Scenario Integration

## Purpose

This split document isolates Loan scenario and simulator integration behavior from the larger Loan entity specification.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## Scenario Rules

- Loan scenarios must include baseline, alternative, and stress variants when used for decision comparison.
- Rate shock scenarios must include current rate, reset rate, refinancing rate, fees, and remaining term.
- Scenario output must include explanation and warning references.
- Fixture outputs must remain deterministic for the same assumptions and formula versions.

## Dashboard Rules

- Dashboard snapshots may summarize Loan scenario outputs through fixture-backed metrics.
- Dashboard display must not become the source of truth for Loan data.
- Persisted dashboard scenario selection is a UI preference only.

## Related References

- [Loan Entity Specification](../Loan.md)
- [Scenario Framework](../../framework/scenario-framework.md)
- [Loan Refinancing Fixture](../../../simulator/fixtures/loan-refinancing-rate-shock.json)
- [Dashboard Scenario Switching Report](../../../docs/roadmap/dashboard-scenario-switching-report.md)
