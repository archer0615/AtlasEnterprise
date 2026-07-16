# Automation Strategy and Recovery

## Purpose
This split document preserves the retry, compensation, escalation, approval, and failure recovery strategy content from the parent Automation Framework in a focused, independently readable form.

## Source
- Parent specification: [Automation Framework](../automation-framework.md)
- Related split: [Automation matrices and controls](matrices-and-controls.md)

# Retry Strategy

| Automation | Mapping | Owner | Control |
|---|---|---|---|
| ScenarioRefreshAutomation | Domain event; Scenario workflow; ScenarioEvaluationScheduler; ScenarioEvaluationJob; EvaluateScenario; ScenarioEvaluated | ScenarioApplicationService | Deterministic, authorized, audited, retry-safe |
| RecommendationRefreshAutomation | Domain event; Decision workflow; ScenarioEvaluationScheduler; ScenarioEvaluationJob; EvaluateScenario; RecommendationGenerated | DecisionApplicationService | Deterministic, authorized, audited, retry-safe |
| NotificationDispatchAutomation | Message; Notification workflow; NotificationDispatchScheduler; NotificationDispatchJob; Notification delivery commands from catalog-aligned handlers; DecisionAccepted, RecommendationGenerated | NotificationApplicationService | Deterministic, authorized, audited, retry-safe |
| BankingImportAutomation | Scheduled; Cash flow workflow; BankingImportScheduler; BankingImportJob; RecordIncome, RecordExpense; SalaryReceived, ExpenseRecorded | BlueprintApplicationService, DashboardApplicationService | Deterministic, authorized, audited, retry-safe |
| BrokerageImportAutomation | Scheduled; Portfolio workflow; BrokerageImportScheduler; BrokerageImportJob; CreatePortfolio, BuySecurity, SellSecurity; PortfolioCreated, SecurityPurchased, SecuritySold | PortfolioApplicationService | Deterministic, authorized, audited, retry-safe |
| CacheRefreshAutomation | Domain event; Dashboard refresh workflow; CacheRefreshScheduler; CacheRefreshJob; Read cache refresh operation; SalaryReceived, ExpenseRecorded, PortfolioRebalanced | DashboardApplicationService | Deterministic, authorized, audited, retry-safe |
| OutboxPublishAutomation | Outbox pending row; Event publishing workflow; OutboxPublishScheduler; OutboxPublishJob; Outbox publish operation; All catalog domain events | AdministrationApplicationService | Deterministic, authorized, audited, retry-safe |
| InboxProcessAutomation | Inbox pending row; Inbox processing workflow; InboxProcessScheduler; InboxProcessJob; Inbox process operation; All consumed domain events | AdministrationApplicationService | Deterministic, authorized, audited, retry-safe |
| ReportGenerationAutomation | Manual or scheduled; Report workflow; ReportGenerationScheduler; ReportGenerationJob; Report generation commands from catalog-aligned handlers; Report source events through read models | ReportApplicationService | Deterministic, authorized, audited, retry-safe |
| CleanupAutomation | Scheduled; Administration workflow; CleanupScheduler; CleanupJob; Cleanup operation; Audit and operational events | AdministrationApplicationService | Deterministic, authorized, audited, retry-safe |
| BackupAutomation | Scheduled; Administration workflow; BackupScheduler; BackupJob; Backup operation; Audit and backup events | AdministrationApplicationService | Deterministic, authorized, audited, retry-safe |
| DecisionReviewAutomation | Domain event; Decision workflow; ScenarioEvaluationScheduler; ScenarioEvaluationJob; AcceptRecommendation, RejectRecommendation; DecisionAccepted, DecisionRejected | DecisionApplicationService | Deterministic, authorized, audited, retry-safe |

# Compensation Strategy

Automation compensation uses the same catalog mapping and owner controls as retry, but applies when the execution path requires a compensating workflow, command, event, message, or integration action. Compensation must remain deterministic, authorized, audited, and retry-safe for the same trigger, input, rule version, and configuration.

# Escalation Strategy

Automation escalation uses the cataloged automation owner and mapped workflow, scheduler, background job, command, event, message, notification, projection, and repository boundaries. Escalation is required when an automation cannot complete, recover, or obtain approval under its cataloged policy.

# Approval Strategy

High-impact automation requires approval strategy. Approval state is part of the automation execution context and must be recorded with trigger, condition, action, checkpoint, retry count, escalation state, dependency result, and error code.

# Failure Recovery Strategy

Failure recovery handles invalid trigger, invalid condition, unauthorized action, missing approval, duplicate execution, stale checkpoint, timeout, and dependency failure. An automation may execute, wait for approval, retry, compensate, escalate, suspend, resume, cancel, complete, or fail with catalog error.

