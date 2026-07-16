# Goal Conflict Contracts and Persistence

## Purpose
This split document isolates Goal Conflict commands, events, API, DTO, persistence mapping, cache, and example payload concerns from the parent Goal Conflict Resolution specification.

## Source
- Parent specification: [Goal Conflict Resolution](../goal-conflict-resolution.md)

## Commands
GoalApplicationService owns DetectGoalConflict, ReevaluateGoalConflict, ProposeGoalConflictResolution, SelectGoalConflictResolution, AcceptGoalConflictResolution, RejectGoalConflictResolution, OverrideGoalConflictResolution, DeferGoalConflictResolution, EscalateGoalConflict, ResolveGoalConflict, ReopenGoalConflict, ArchiveGoalConflict, and RestoreGoalConflict use cases.

## Domain Events
Published messages use canonical event metadata and remain GoalApplicationService events until the Domain Event Catalog adds goal-conflict-specific names.

## API and DTO
Goal Conflict API contracts are exposed as Goal resource subresources such as `/api/v1/goals/conflicts`, with request and response DTOs preserving evidence, candidate, status, lifecycle, audit, and error code fields.

## Persistence
Goal Conflict data is stored as GoalPlan-owned conflict state plus read model projections, not as a standalone Aggregate, Entity, or Repository.

## Database and Cache
Database mapping, PostgreSQL schema, EF Core mapping, and cache strategy must preserve tenant isolation, optimistic concurrency, idempotency keys, archival rules, and replay-safe audit records.
