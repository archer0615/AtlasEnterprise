# Report Generation Trigger and Scope

## Purpose
This split document isolates report generation triggers, report scope, source eligibility, and scheduling rules from the parent ReportGenerationAutomation specification.

## Source
- Parent specification: [ReportGenerationAutomation](../report-generation-automation.md)

## Trigger Scope
Triggers include scheduled report cadence, manual report requests, scenario completion, decision review completion, recommendation refresh, dashboard snapshot, and compliance reporting windows.

## Eligibility
Report generation must preserve tenant scope, household scope, permission-aware sources, data freshness, report type, and idempotency key.

