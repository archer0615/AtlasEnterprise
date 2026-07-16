# Recommendation Refresh Governance and Testing

## Purpose
This split document isolates recommendation refresh automation governance, validation, audit, retry, testing, and edge cases from the parent RecommendationRefreshAutomation specification.

## Source
- Parent specification: [RecommendationRefreshAutomation](../recommendation-refresh-automation.md)

## Governance
Governance covers idempotency, duplicate prevention, permission-aware source reads, audit trail, retry behavior, failure recovery, and stale projection protection.

## Testing
Testing covers trigger matching, stale detection, command execution, retry, idempotency, audit, notification, and edge cases.

