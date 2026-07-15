# Recommendation Evaluation Feedback and Learning

## Purpose

This split document isolates feedback and learning loop behavior from the larger Recommendation Evaluation overview.

## Source

- Parent specification: [Recommendation Evaluation Overview](../recommendation-evaluation.md)

## Feedback Rules

- Capture whether a Recommendation was accepted, deferred, rejected, or executed.
- Preserve outcome evidence without rewriting the original Recommendation.
- Feedback must remain auditable and permission-aware.
- Feedback should support future score calibration.

## Learning Rules

- Learning outputs must not silently change domain rules.
- Calibration should preserve assumption and formula versions.
- Model or rule updates must be explainable and governed.

## Related References

- [Recommendation Evaluation Overview](../recommendation-evaluation.md)
- [Decision Learning Framework](../../framework/decision-learning-framework.md)
- [Audit Framework](../../security/audit-framework.md)
