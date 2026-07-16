# Recommendation Execution Integration Boundaries

## Purpose
This split document isolates Recommendation Execution relationships, domain-service collaboration, application-service coordination, and cross-domain command boundaries from the parent Recommendation Execution specification.

## Source
- Parent specification: [Recommendation Execution Overview](../recommendation-execution.md)

## Ownership Boundary
Recommendation Execution coordinates governed execution for existing Recommendations. It references Recommendation, Recommendation Lifecycle, Recommendation Evaluation, Recommendation Priority, Decision, Decision Execution, Goal, Scenario, Portfolio, CashFlow, Risk, Optimization, Simulation, Workflow, Automation, Business Calendar, Notification, and User through existing Atlas contracts.

## Domain Service Interaction
Execution may call validation, approval, scheduling, monitoring, recovery, rollback, audit, notification, risk, scoring, scenario, optimization, simulation, workflow, and automation services where those services already exist. Service calls must preserve domain ownership and record evidence rather than duplicating source state.

## Application Service Coordination
The execution application service owns use-case orchestration, authorization, validation, idempotency, state transition, event publication, and audit capture for execution records. Commands that affect another domain must be routed to that domain's application service.

## Cross-Domain Commands
CreateRecommendation, EvaluateRecommendation, PrioritizeRecommendation, PublishRecommendation, AcceptRecommendation, DeclineRecommendation, CreateDecision, ExecuteDecision, UpdateGoal, RunScenario, UpdatePortfolio, UpdateCashFlow, AssessRisk, RunOptimization, RunSimulation, StartWorkflow, TriggerAutomation, ResolveBusinessCalendar, and CreateNotification remain owned by their respective domains.

## Integration Safety
Execution links must carry identifiers, source versions, correlation identifiers, and masking state where required. Integration failures must be recoverable, auditable, and visible in execution status without fabricating downstream success.
