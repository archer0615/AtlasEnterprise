# Automation Decision Projections and Notifications

Document Path: knowledge/framework/automation/decision-projections-and-notifications.md

Parent Specification: knowledge/framework/automation-framework.md

# Purpose

This split document isolates Automation Framework mappings for rule engine, decision engine, projection, and notification automation. It preserves the parent framework behavior while making decision and read-side automation dependencies easier to review.

# Shared Control Model

The rule engine, decision engine, projection, and notification matrices use the same control requirement: automation must be deterministic, authorized, audited, and retry-safe.

# Rule Engine Matrix

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

# Decision Engine Matrix

Decision engine automation uses the same automation catalog and mappings as the rule engine matrix. Decision-focused entries include RecommendationRefreshAutomation and DecisionReviewAutomation owned by DecisionApplicationService, with ScenarioEvaluationScheduler, ScenarioEvaluationJob, EvaluateScenario, AcceptRecommendation, RejectRecommendation, RecommendationGenerated, DecisionAccepted, and DecisionRejected preserved as catalog-aligned mappings.

# Projection Matrix

Projection automation uses the same automation catalog and mappings as the rule engine matrix. Projection-focused entries include CacheRefreshAutomation owned by DashboardApplicationService and Projection-related mappings through Dashboard refresh workflow, CacheRefreshScheduler, CacheRefreshJob, read cache refresh operation, SalaryReceived, ExpenseRecorded, and PortfolioRebalanced.

# Notification Matrix

Notification automation uses the same automation catalog and mappings as the rule engine matrix. Notification-focused entries include NotificationDispatchAutomation owned by NotificationApplicationService and mapped through message input, Notification workflow, NotificationDispatchScheduler, NotificationDispatchJob, notification delivery commands from catalog-aligned handlers, DecisionAccepted, RecommendationGenerated, and retry-safe audit controls.

