# Background Job Catalog

## Purpose
This split document isolates the complete background job catalog from the parent Background Job Framework.

## Source
- Parent specification: [Background Job Framework](../background-job-framework.md)

## Job Catalog
- ScenarioEvaluationJob
- ScenarioReplayJob
- ProjectionRefreshJob
- NotificationDispatchJob
- ReportGenerationJob
- BankingImportJob
- BrokerageImportJob
- CacheRefreshJob
- OutboxPublishJob
- InboxProcessJob
- CleanupJob
- BackupJob

## Catalog Contract
Each job entry preserves purpose, schedule, trigger, inputs, outputs, idempotency, retry policy, checkpoint behavior, dependencies, owner, permissions, audit, and failure handling.

