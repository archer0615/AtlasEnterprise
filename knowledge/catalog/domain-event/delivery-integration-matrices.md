# Domain Event Delivery Integration Matrices

Source: ../domain-event-catalog.md

This split document preserves the canonical content from the parent catalog for focused review. The parent catalog remains the source of record.

# Notification Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

# Message Contract Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

# Outbox Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

# Inbox Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

# Cache Invalidation Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

# Search Index Matrix

| Event | Mapping | Control |
|---|---|---|
| SalaryReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| BonusReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ExpenseRecorded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PassiveIncomeReceived | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecurityPurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SecuritySold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PortfolioRebalanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DividendDistributed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanPaymentMade | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanRefinanced | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| LoanClosed | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomePurchased | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeSold | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeValueUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HomeUpgradeCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PolicyIssued | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| PremiumPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| CoverageUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimSubmitted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ClaimPaid | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementPlanUpdated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementGoalReached | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RetirementWithdrawalStarted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScenarioEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RecommendationGenerated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionAccepted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| DecisionRejected | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| RuleEvaluated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| HardConstraintTriggered | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ScoreAdjusted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| SnapshotCreated | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| AssumptionVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| FormulaVersionLoaded | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |
| ReplayCompleted | Catalog-aligned | CorrelationId, CausationId, idempotency, audit, and replay required |

