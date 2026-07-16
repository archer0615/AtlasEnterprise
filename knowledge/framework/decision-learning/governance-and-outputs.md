# Decision Learning Governance and Outputs

## Purpose
This split document isolates Decision Learning governance, explainability, integration, outputs, KPIs, and testing from the parent Decision Learning Framework.

## Source
- Parent specification: [Decision Learning Framework](../decision-learning-framework.md)

## Learning Outputs
Learning outputs include calibration recommendations, rule improvement candidates, model quality signals, dashboard insights, and governance reports.

## Business Rules
- Learning does not mutate historical decisions.
- Learning outputs require approval before changing production rules.
- Feedback must remain auditable and reproducible.
- Model and rule changes must preserve version history.

## Explainability
Every learning output records source evidence, reason for change, affected rule or model, expected impact, and validation status.

## KPIs
- Decision accuracy
- Recommendation stability
- Outcome success rate
- Calibration acceptance rate
- Rule improvement effectiveness

## Testing
Testing covers feedback capture, variance calculation, calibration proposal, approval governance, explainability, and historical replay.

