# Cache Refresh Execution

## Purpose
This split document isolates cache refresh execution, invalidation, rebuild, and projection refresh behavior from the parent CacheRefreshAutomation specification.

## Source
- Parent specification: [CacheRefreshAutomation](../cache-refresh-automation.md)

## Execution
Execution identifies affected cache keys, invalidates stale projections, rebuilds requested summaries, records source timestamps, and writes audit evidence.

