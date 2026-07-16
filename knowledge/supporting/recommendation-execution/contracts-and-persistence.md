# Recommendation Execution Contracts and Persistence

## Purpose
This split document isolates Recommendation Execution commands, domain events, repository, API, DTO, database mapping, cache, security, audit, performance, examples, diagrams, and tests from the parent Recommendation Execution specification.

## Source
- Parent specification: [Recommendation Execution](../recommendation-execution.md)

## Commands
Execution commands include CreateExecution, StartExecution, PauseExecution, ResumeExecution, RetryExecution, CancelExecution, CompleteExecution, RollbackExecution, RecoverExecution, ArchiveExecution, RestoreExecution, DeleteExecution, GenerateExecutionPlan, ValidateExecution, ApproveExecution, RejectExecution, ScheduleExecution, DispatchExecution, VerifyExecution, FailExecution, EscalateExecution, and NotifyExecution.

## Domain Events
Execution events include lifecycle, validation, approval, scheduling, dispatch, verification, escalation, notification, and linked cross-domain events such as RecommendationExecutionLinked, DecisionExecutionRequested, GoalExecutionImpacted, PortfolioExecutionImpacted, and CashFlowExecutionImpacted.

## API and DTO
REST Endpoints, HTTP Methods, Request, Response, Errors, Pagination, Filtering, Sorting, Projection, Execution API, and Batch API are represented by Create DTO, Update DTO, Execution DTO, Execution Plan DTO, Execution Result DTO, Execution Log DTO, Execution Status DTO, Summary DTO, Detail DTO, and Search DTO contracts.

## Persistence
Repository interface, methods, queries, filtering, sorting, aggregation, projection, specification, database table, columns, indexes, constraints, FK, unique, check constraints, partition strategy, PostgreSQL schema, EF Core mapping, and cache strategy preserve execution evidence and auditability.
