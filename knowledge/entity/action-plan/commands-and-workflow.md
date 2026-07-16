# ActionPlan Commands and Workflow

## Purpose

This split document isolates ActionPlan command, workflow, scheduling, result, and state-transition concerns from the canonical `knowledge/entity/ActionPlan.md` parent.

## Covered Sections

- EstimatedDuration, EstimatedCost, ExpectedBenefit
- RiskLevel, Progress
- StartDate, DueDate, CompletedDate
- Result, FailureReason
- IsRequired, IsRecurring
- Validation Rules
- Business Rules
- State Machine
- Commands
- Domain Events

## Workflow Rules

- ActionPlan is the atomic execution unit that turns an ExecutionPlan into ordered tasks and workflow steps.
- ActionPlan may create, schedule, or reference Task identities through Task Service or Scheduler.
- ActionPlan status changes must emit immutable DomainEvent records for traceability.
- Recurring actions must preserve sequence, due date, result, and failure context per execution.
