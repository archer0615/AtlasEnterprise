# Portfolio Lifecycle Execution and Validation

## Purpose
This split document isolates the executable lifecycle contract, commands, events, API surface, and test matrix from the parent Portfolio Lifecycle specification.

## Source
- Parent specification: [Portfolio Lifecycle](../portfolio-lifecycle.md)

## Portfolio Lifecycle Contract

| Field | Requirement |
|---|---|
| Aggregate | PortfolioLifecycle |
| Identity | portfolioId |
| Scope | tenantId, householdId |
| Required State | currentState, previousState, transitionReason, validationResult, effectiveAt |
| Outputs | transitionDecision, supportingRules, expectedFinancialImpact, auditReference |
| Invariant | A portfolio has exactly one active lifecycle state. |

## Required Commands

| Command | Purpose |
|---|---|
| InitializePortfolioLifecycle | Create lifecycle state for a portfolio. |
| EvaluatePortfolioLifecycleTransition | Validate if transition is allowed. |
| TransitionPortfolioLifecycle | Move portfolio to a new lifecycle state. |
| EmergencyTransitionPortfolioLifecycle | Execute approved emergency transition. |
| ArchivePortfolioLifecycle | Close lifecycle tracking for archived portfolio. |
| ReplayPortfolioLifecycle | Rebuild lifecycle state from transition history. |

## Domain Events

| Event | Trigger |
|---|---|
| PortfolioLifecycleInitialized | Lifecycle tracking starts. |
| PortfolioLifecycleTransitionEvaluated | Transition validation completes. |
| PortfolioLifecycleTransitioned | State changes. |
| PortfolioLifecycleEmergencyTransitioned | Emergency state change is approved. |
| PortfolioLifecycleArchived | Portfolio lifecycle is closed. |
| PortfolioLifecycleReplayed | Historical lifecycle state is reproduced. |

## Validation Rules
1. Transition must include previous state, new state, trigger event, and validation result.
2. Closed portfolios cannot transition except through approved restore workflow.
3. Distribution transition must validate withdrawal and cash reserve dependencies.
4. Emergency transition must record major financial event and approval reference.
5. Replay must produce exactly one active lifecycle state.

## API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/portfolios/{portfolioId}/lifecycle | POST | Initialize lifecycle. |
| /api/portfolios/{portfolioId}/lifecycle/evaluate-transition | POST | Evaluate transition. |
| /api/portfolios/{portfolioId}/lifecycle/transition | POST | Execute transition. |
| /api/portfolios/{portfolioId}/lifecycle/emergency-transition | POST | Execute emergency transition. |
| /api/portfolios/{portfolioId}/lifecycle/replay | POST | Replay lifecycle history. |

## Testing Matrix

| Scenario | Expected Result |
|---|---|
| New portfolio onboarding | PortfolioLifecycleInitialized is emitted. |
| Accumulation to distribution without retirement validation | Transition is rejected. |
| Emergency transition with approval | Emergency transition event is emitted. |
| Closed portfolio transition | Command is rejected. |
| Replay lifecycle | Current state matches transition history. |

