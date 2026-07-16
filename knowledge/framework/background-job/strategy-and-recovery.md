# Background Job Strategy and Recovery

## Purpose
This split document preserves the retry, checkpoint, resume, and failure recovery strategy content from the parent Background Job Framework in a focused, independently readable form.

## Source
- Parent specification: [Background Job Framework](../background-job-framework.md)
- Related split: [Background job matrices and controls](matrices-and-controls.md)

# Retry Strategy

| Background Job | Mapping | Owner | Control |
|---|---|---|---|
| ScenarioEvaluationJob | Scenario workflow; Scheduler Framework; EvaluateScenario; ScenarioEvaluated, RuleEvaluated, ScoreAdjusted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ScenarioReplayJob | Replay workflow; Scheduler Framework; ReplayScenario; SnapshotCreated, ReplayCompleted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ProjectionRefreshJob | Projection workflow; Scheduler Framework; Projection update commands from catalog-aligned handlers; ScenarioEvaluated, PortfolioRebalanced, LoanPaymentMade | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| NotificationDispatchJob | Notification workflow; Scheduler Framework; Notification delivery commands from catalog-aligned handlers; DecisionAccepted, DecisionRejected, RecommendationGenerated | NotificationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ReportGenerationJob | Report workflow; Scheduler Framework; Report generation commands from catalog-aligned handlers; Report source events through read models | ReportApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BankingImportJob | Cash flow workflow; Scheduler Framework; RecordIncome, RecordExpense; SalaryReceived, ExpenseRecorded | BlueprintApplicationService, DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BrokerageImportJob | Portfolio workflow; Scheduler Framework; CreatePortfolio, BuySecurity, SellSecurity; PortfolioCreated, SecurityPurchased, SecuritySold | PortfolioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CacheRefreshJob | Dashboard refresh workflow; Scheduler Framework; Read cache refresh operation; SalaryReceived, ExpenseRecorded, PortfolioRebalanced | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| OutboxPublishJob | Event publishing workflow; Scheduler Framework; Outbox publish operation; All catalog domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| InboxProcessJob | Inbox processing workflow; Scheduler Framework; Inbox process operation; All consumed domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CleanupJob | Administration workflow; Scheduler Framework; Cleanup operation; Audit and operational events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BackupJob | Administration workflow; Scheduler Framework; Backup operation; Audit and backup events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |

# Checkpoint Strategy

| Background Job | Mapping | Owner | Control |
|---|---|---|---|
| ScenarioEvaluationJob | Scenario workflow; Scheduler Framework; EvaluateScenario; ScenarioEvaluated, RuleEvaluated, ScoreAdjusted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ScenarioReplayJob | Replay workflow; Scheduler Framework; ReplayScenario; SnapshotCreated, ReplayCompleted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ProjectionRefreshJob | Projection workflow; Scheduler Framework; Projection update commands from catalog-aligned handlers; ScenarioEvaluated, PortfolioRebalanced, LoanPaymentMade | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| NotificationDispatchJob | Notification workflow; Scheduler Framework; Notification delivery commands from catalog-aligned handlers; DecisionAccepted, DecisionRejected, RecommendationGenerated | NotificationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ReportGenerationJob | Report workflow; Scheduler Framework; Report generation commands from catalog-aligned handlers; Report source events through read models | ReportApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BankingImportJob | Cash flow workflow; Scheduler Framework; RecordIncome, RecordExpense; SalaryReceived, ExpenseRecorded | BlueprintApplicationService, DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BrokerageImportJob | Portfolio workflow; Scheduler Framework; CreatePortfolio, BuySecurity, SellSecurity; PortfolioCreated, SecurityPurchased, SecuritySold | PortfolioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CacheRefreshJob | Dashboard refresh workflow; Scheduler Framework; Read cache refresh operation; SalaryReceived, ExpenseRecorded, PortfolioRebalanced | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| OutboxPublishJob | Event publishing workflow; Scheduler Framework; Outbox publish operation; All catalog domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| InboxProcessJob | Inbox processing workflow; Scheduler Framework; Inbox process operation; All consumed domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CleanupJob | Administration workflow; Scheduler Framework; Cleanup operation; Audit and operational events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BackupJob | Administration workflow; Scheduler Framework; Backup operation; Audit and backup events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |

# Resume Strategy

| Background Job | Mapping | Owner | Control |
|---|---|---|---|
| ScenarioEvaluationJob | Scenario workflow; Scheduler Framework; EvaluateScenario; ScenarioEvaluated, RuleEvaluated, ScoreAdjusted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ScenarioReplayJob | Replay workflow; Scheduler Framework; ReplayScenario; SnapshotCreated, ReplayCompleted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ProjectionRefreshJob | Projection workflow; Scheduler Framework; Projection update commands from catalog-aligned handlers; ScenarioEvaluated, PortfolioRebalanced, LoanPaymentMade | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| NotificationDispatchJob | Notification workflow; Scheduler Framework; Notification delivery commands from catalog-aligned handlers; DecisionAccepted, DecisionRejected, RecommendationGenerated | NotificationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ReportGenerationJob | Report workflow; Scheduler Framework; Report generation commands from catalog-aligned handlers; Report source events through read models | ReportApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BankingImportJob | Cash flow workflow; Scheduler Framework; RecordIncome, RecordExpense; SalaryReceived, ExpenseRecorded | BlueprintApplicationService, DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BrokerageImportJob | Portfolio workflow; Scheduler Framework; CreatePortfolio, BuySecurity, SellSecurity; PortfolioCreated, SecurityPurchased, SecuritySold | PortfolioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CacheRefreshJob | Dashboard refresh workflow; Scheduler Framework; Read cache refresh operation; SalaryReceived, ExpenseRecorded, PortfolioRebalanced | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| OutboxPublishJob | Event publishing workflow; Scheduler Framework; Outbox publish operation; All catalog domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| InboxProcessJob | Inbox processing workflow; Scheduler Framework; Inbox process operation; All consumed domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CleanupJob | Administration workflow; Scheduler Framework; Cleanup operation; Audit and operational events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BackupJob | Administration workflow; Scheduler Framework; Backup operation; Audit and backup events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |

# Failure Recovery Strategy

| Background Job | Mapping | Owner | Control |
|---|---|---|---|
| ScenarioEvaluationJob | Scenario workflow; Scheduler Framework; EvaluateScenario; ScenarioEvaluated, RuleEvaluated, ScoreAdjusted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ScenarioReplayJob | Replay workflow; Scheduler Framework; ReplayScenario; SnapshotCreated, ReplayCompleted | ScenarioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ProjectionRefreshJob | Projection workflow; Scheduler Framework; Projection update commands from catalog-aligned handlers; ScenarioEvaluated, PortfolioRebalanced, LoanPaymentMade | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| NotificationDispatchJob | Notification workflow; Scheduler Framework; Notification delivery commands from catalog-aligned handlers; DecisionAccepted, DecisionRejected, RecommendationGenerated | NotificationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| ReportGenerationJob | Report workflow; Scheduler Framework; Report generation commands from catalog-aligned handlers; Report source events through read models | ReportApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BankingImportJob | Cash flow workflow; Scheduler Framework; RecordIncome, RecordExpense; SalaryReceived, ExpenseRecorded | BlueprintApplicationService, DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BrokerageImportJob | Portfolio workflow; Scheduler Framework; CreatePortfolio, BuySecurity, SellSecurity; PortfolioCreated, SecurityPurchased, SecuritySold | PortfolioApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CacheRefreshJob | Dashboard refresh workflow; Scheduler Framework; Read cache refresh operation; SalaryReceived, ExpenseRecorded, PortfolioRebalanced | DashboardApplicationService | Idempotent, checkpointed, audited, retry-safe |
| OutboxPublishJob | Event publishing workflow; Scheduler Framework; Outbox publish operation; All catalog domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| InboxProcessJob | Inbox processing workflow; Scheduler Framework; Inbox process operation; All consumed domain events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| CleanupJob | Administration workflow; Scheduler Framework; Cleanup operation; Audit and operational events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |
| BackupJob | Administration workflow; Scheduler Framework; Backup operation; Audit and backup events | AdministrationApplicationService | Idempotent, checkpointed, audited, retry-safe |

