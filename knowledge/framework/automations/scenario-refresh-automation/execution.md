# Scenario Refresh Execution

## Purpose
This split document isolates scenario refresh execution, simulation coordination, output generation, and projection refresh from the parent ScenarioRefreshAutomation specification.

## Source
- Parent specification: [ScenarioRefreshAutomation](../scenario-refresh-automation.md)

## Execution
Execution selects stale scenarios, loads source assumptions, invokes simulation, stores scenario results, updates comparison projections, records audit, and triggers downstream recommendation refresh when required.

