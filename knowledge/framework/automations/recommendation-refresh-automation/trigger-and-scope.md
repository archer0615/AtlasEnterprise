# Recommendation Refresh Trigger and Scope

## Purpose
This split document isolates recommendation refresh automation triggers, input scope, and refresh eligibility from the parent RecommendationRefreshAutomation specification.

## Source
- Parent specification: [RecommendationRefreshAutomation](../recommendation-refresh-automation.md)

## Trigger Scope
Triggers include decision changes, scenario changes, goal progress changes, market assumption changes, recommendation stale windows, scheduled refresh, and manual refresh requests.

## Eligibility
Refresh eligibility must preserve household scope, permission scope, recommendation status, source freshness, and idempotency.

