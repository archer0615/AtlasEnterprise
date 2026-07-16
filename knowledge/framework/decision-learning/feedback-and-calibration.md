# Decision Learning Feedback and Calibration

## Purpose
This split document isolates Decision Learning sources, feedback model, learning pipeline, outcome metrics, and calibration behavior from the parent Decision Learning Framework.

## Source
- Parent specification: [Decision Learning Framework](../decision-learning-framework.md)

## Learning Sources
Decision Learning consumes decision outcomes, recommendation outcomes, scenario accuracy, user actions, execution results, variance records, and audit-safe feedback.

## Learning Pipeline
The learning pipeline collects outcomes, normalizes evidence, compares expected versus actual results, identifies variance, and proposes calibration signals.

## Outcome Metrics
- Expected vs actual result
- Recommendation adoption
- Outcome success
- Variance direction
- Time to decision
- Rule stability

## Feedback Model
Feedback records must preserve source decision, operator context, outcome evidence, confidence, and versioned learning reason.

