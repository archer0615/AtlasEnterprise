# Recommendation Lifecycle and Execution

## Purpose

This split document isolates Recommendation lifecycle, command, event, execution, and follow-up concerns from the canonical `knowledge/entity/Recommendation.md` parent.

## Covered Sections

- Version, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy
- ArchivedAt, DeletedAt
- CorrelationId, CausationId
- Validation Rules
- Business Rules
- State Machine
- Commands
- Domain Events
- Repository
- Domain Service Interaction
- Application Service Interaction

## Lifecycle Rules

- Recommendation lifecycle must preserve generation, assignment, acceptance, rejection, expiration, archive, deletion, and follow-up evidence.
- CorrelationId and CausationId connect recommendation generation to decisions, scenarios, and execution plans.
- Accepted recommendations may create or update execution planning records only through approved application service commands.
