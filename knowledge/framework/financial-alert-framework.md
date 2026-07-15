# Financial Alert Framework

Version: 1.0

## Purpose
Defines the enterprise framework for generating, prioritizing, delivering, tracking and auditing financial alerts across Project Atlas.

## Objectives
- Detect meaningful financial events.
- Notify users before risks become problems.
- Reduce alert fatigue.
- Ensure explainable, actionable alerts.

## Alert Sources
- Cash Flow Engine
- Investment Engine
- Loan Engine
- Retirement Engine
- Decision Engine
- Scenario Engine
- Rule Engine

## Alert Categories
### Liquidity
- Low cash
- Emergency fund below target
- Liquidity ratio deterioration

### Cash Flow
- Negative free cash flow
- Savings rate decline
- Expense spike

### Debt
- High DTI
- Loan payment risk
- Refinancing opportunity

### Investment
- Allocation drift
- Risk budget exceeded
- Portfolio drawdown
- Rebalancing required

### Goals
- Funding behind schedule
- Milestone reached
- Goal at risk

### Housing
- Mortgage stress
- Upgrade opportunity
- Property concentration risk

### Retirement
- Readiness decline
- Withdrawal risk
- Funding shortfall

## Severity
- Info
- Low
- Medium
- High
- Critical

## Alert Lifecycle
Detected
→ Validated
→ Prioritized
→ Delivered
→ Acknowledged
→ Resolved
→ Archived

## Trigger Model
Each alert defines:
- Alert ID
- Trigger condition
- Threshold
- Evaluation frequency
- Severity
- Expiration rule
- Suppression rule

## Suppression Rules
- Merge duplicate alerts.
- Suppress lower-severity duplicates.
- Snooze acknowledged alerts.
- Reopen only when state materially changes.

## Escalation
Critical alerts may escalate when:
- User takes no action.
- Financial impact increases.
- Additional rules are triggered.

## Outputs
- Alert ID
- Severity
- Category
- Trigger reason
- Recommended action
- Related recommendation
- Supporting KPIs

## Business Rules
- Alerts never modify financial data.
- Every alert is traceable.
- Historical alerts are immutable.
- Hard-rule violations always generate alerts.

## Explainability
Each alert includes:
- Triggering rule
- Threshold value
- Current value
- Financial impact
- Recommended resolution

## Integration
Consumes:
- Financial Ratio Framework
- Decision Metrics Framework
- Recommendation Priority Framework
- Financial Health Score
- Liquidity Framework
- Goal Funding Framework

Produces:
- Notification Engine
- Dashboard
- Recommendation Feed
- Audit Log

## KPIs
- Alert precision
- Alert recall
- False positive rate
- Time to acknowledge
- Time to resolve

## Testing
- Duplicate alerts
- Threshold crossings
- Escalation
- Suppression
- Market crash
- Income interruption

## Future Enhancements
- AI anomaly detection
- Predictive alerts
- Personalized thresholds
- Multi-channel notification policies

## Phase 2 Executable Specification

### Alert Object Contract

| Field | Required | Description |
|-------|----------|-------------|
| AlertId | Yes | Stable alert identifier |
| HouseholdId | Yes | Owning household |
| Category | Yes | Liquidity, Cash Flow, Debt, Investment, Goals, Housing, Retirement |
| Severity | Yes | Info, Low, Medium, High, Critical |
| TriggerRuleId | Yes | Rule that created the alert |
| CurrentValue | Yes | Observed value |
| ThresholdValue | Yes | Trigger threshold |
| RecommendedActionId | No | Linked recommendation |
| Status | Yes | Detected, Validated, Prioritized, Delivered, Acknowledged, Resolved, Archived |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| EvaluateFinancialAlerts | AlertApplicationService | AlertsEvaluated |
| CreateFinancialAlert | AlertApplicationService | FinancialAlertCreated |
| AcknowledgeFinancialAlert | User | FinancialAlertAcknowledged |
| ResolveFinancialAlert | User or System | FinancialAlertResolved |
| SuppressFinancialAlert | AlertApplicationService | FinancialAlertSuppressed |
| EscalateFinancialAlert | AlertApplicationService | FinancialAlertEscalated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| FinancialAlertCreated | Valid alert detected | Notification, Dashboard |
| FinancialAlertEscalated | Severity or impact increased | Notification, Audit |
| FinancialAlertAcknowledged | User acknowledges alert | Dashboard, Audit |
| FinancialAlertResolved | Alert condition no longer applies | Dashboard, Reporting |
| FinancialAlertSuppressed | Duplicate or lower-priority alert suppressed | Audit |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| ALT-VR-001 | Every alert must reference a trigger rule. | Reject creation |
| ALT-VR-002 | Critical alerts cannot be suppressed by low-severity alerts. | Reject suppression |
| ALT-VR-003 | Resolved alerts cannot be modified. | Reject command |
| ALT-VR-004 | Delivered alerts must have at least one notification channel. | Reject delivery |
| ALT-VR-005 | Reopened alerts must show material state change. | Reject reopen |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/alerts | GET | List alerts | Alert:Read |
| /api/v1/alerts/evaluate | POST | Run alert evaluation | Alert:Evaluate |
| /api/v1/alerts/{alertId}/acknowledge | POST | Acknowledge alert | Alert:Write |
| /api/v1/alerts/{alertId}/resolve | POST | Resolve alert | Alert:Write |
| /api/v1/alerts/{alertId}/evidence | GET | Retrieve alert evidence | Audit:Read |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Emergency fund below threshold | High or Critical liquidity alert is created |
| Duplicate threshold breach | Existing alert is updated or suppressed |
| User acknowledges alert | Status becomes Acknowledged |
| Condition returns to normal | Alert becomes Resolved |
| Critical alert not acknowledged | Escalation event is emitted |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
