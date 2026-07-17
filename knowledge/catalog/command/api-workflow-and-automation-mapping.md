> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Command API, Workflow, and Automation Mapping

Source: ../command-catalog.md

This split document preserves the canonical content from the parent catalog for focused review. The parent catalog remains the source of record.

# API Mapping

| Command | Future Cloud Architecture Endpoint | HTTP Method | Request DTO | Response DTO |
|---|---|---|---|---|
| RecordIncome | /api/v1/commands/record-income | POST | RecordIncomeRequest | CommandResult |
| RecordExpense | /api/v1/commands/record-expense | POST | RecordExpenseRequest | CommandResult |
| CreatePortfolio | /api/v1/commands/create-portfolio | POST | CreatePortfolioRequest | CommandResult |
| BuySecurity | /api/v1/commands/buy-security | POST | BuySecurityRequest | CommandResult |
| SellSecurity | /api/v1/commands/sell-security | POST | SellSecurityRequest | CommandResult |
| RebalancePortfolio | /api/v1/commands/rebalance-portfolio | POST | RebalancePortfolioRequest | CommandResult |
| CreateLoan | /api/v1/commands/create-loan | POST | CreateLoanRequest | CommandResult |
| RecordLoanPayment | /api/v1/commands/record-loan-payment | POST | RecordLoanPaymentRequest | CommandResult |
| RefinanceLoan | /api/v1/commands/refinance-loan | POST | RefinanceLoanRequest | CommandResult |
| PurchaseHome | /api/v1/commands/purchase-home | POST | PurchaseHomeRequest | CommandResult |
| SellHome | /api/v1/commands/sell-home | POST | SellHomeRequest | CommandResult |
| UpdatePropertyValue | /api/v1/commands/update-property-value | POST | UpdatePropertyValueRequest | CommandResult |
| IssuePolicy | /api/v1/commands/issue-policy | POST | IssuePolicyRequest | CommandResult |
| PayPremium | /api/v1/commands/pay-premium | POST | PayPremiumRequest | CommandResult |
| UpdateRetirementPlan | /api/v1/commands/update-retirement-plan | POST | UpdateRetirementPlanRequest | CommandResult |
| EvaluateScenario | /api/v1/commands/evaluate-scenario | POST | EvaluateScenarioRequest | CommandResult |
| AcceptRecommendation | /api/v1/commands/accept-recommendation | POST | AcceptRecommendationRequest | CommandResult |
| RejectRecommendation | /api/v1/commands/reject-recommendation | POST | RejectRecommendationRequest | CommandResult |
| ReplayScenario | /api/v1/commands/replay-scenario | POST | ReplayScenarioRequest | CommandResult |

# Workflow Mapping

| Command | Mapping | Step | Control |
|---|---|---|---|
| RecordIncome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordExpense | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreatePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| BuySecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellSecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RebalancePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreateLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordLoanPayment | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RefinanceLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PurchaseHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdatePropertyValue | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| IssuePolicy | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PayPremium | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdateRetirementPlan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| EvaluateScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| AcceptRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RejectRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| ReplayScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |

# Saga Mapping

| Command | Mapping | Step | Control |
|---|---|---|---|
| RecordIncome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordExpense | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreatePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| BuySecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellSecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RebalancePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreateLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordLoanPayment | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RefinanceLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PurchaseHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdatePropertyValue | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| IssuePolicy | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PayPremium | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdateRetirementPlan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| EvaluateScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| AcceptRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RejectRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| ReplayScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |

# Background Job Mapping

| Command | Mapping | Step | Control |
|---|---|---|---|
| RecordIncome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordExpense | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreatePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| BuySecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellSecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RebalancePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreateLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordLoanPayment | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RefinanceLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PurchaseHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdatePropertyValue | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| IssuePolicy | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PayPremium | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdateRetirementPlan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| EvaluateScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| AcceptRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RejectRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| ReplayScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |

# Scheduler Mapping

| Command | Mapping | Step | Control |
|---|---|---|---|
| RecordIncome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordExpense | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreatePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| BuySecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellSecurity | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RebalancePortfolio | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| CreateLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RecordLoanPayment | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RefinanceLoan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PurchaseHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| SellHome | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdatePropertyValue | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| IssuePolicy | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| PayPremium | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| UpdateRetirementPlan | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| EvaluateScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| AcceptRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| RejectRecommendation | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |
| ReplayScenario | Catalog-aligned | Validate, authorize, handle, persist, publish | CorrelationId and audit required |

