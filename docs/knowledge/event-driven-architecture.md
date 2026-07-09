# Event Driven Architecture

## Principles
- Domain Events first
- Asynchronous integration
- Idempotent consumers
- Event versioning
- At-least-once processing

## Flow
Command
→ Aggregate
→ Domain Event
→ Event Bus
→ Subscribers
→ Read Models / Notifications

## Examples
GoalCreated
PortfolioUpdated
LoanCalculated
ScenarioGenerated
DecisionCompleted
RecommendationAccepted
