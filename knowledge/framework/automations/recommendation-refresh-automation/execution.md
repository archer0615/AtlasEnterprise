# Recommendation Refresh Execution

## Purpose
This split document isolates recommendation refresh execution behavior from the parent RecommendationRefreshAutomation specification.

## Source
- Parent specification: [RecommendationRefreshAutomation](../recommendation-refresh-automation.md)

## Execution
Execution collects changed sources, evaluates stale recommendations, invokes recommendation refresh commands, updates projections, records audit, and emits follow-up notifications when required.

