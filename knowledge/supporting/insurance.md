# Insurance Canonical Specification

Document Path: knowledge/supporting/insurance.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Planning
Domain: Insurance
Bounded Context: Protection Planning
Owner: Product Knowledge

## Purpose

Insurance defines protection planning records used by Atlas to evaluate coverage, premium burden, beneficiary readiness, and claim-related decision context. It is decision-support only and does not issue, sell, bind, underwrite, or execute insurance policies.

## Runtime Boundary

Insurance is not runtime-ready in v1.2 until an implementation batch separately proves persistence, backup, restore, owner isolation, audit, and UI validation. Current scope is canonical specification only.

Unsupported behavior:

- No external carrier integration.
- No premium payment execution.
- No claim submission execution.
- No underwriting automation.
- No remote policy document storage.
- No backend, cloud database, or scheduler requirement.

## Aggregate

Aggregate Name: Policy
Aggregate Root: Policy
Business Meaning: Policy represents a local protection planning record owned by a household.

Required identity:

- policyId
- householdId
- ownerId
- policyType
- policyStatus
- coverageAmount
- premiumAmount
- premiumFrequency
- effectiveDate
- renewalDate
- beneficiarySummary
- createdAt
- updatedAt

## Commands

| Command | Purpose | Mutation Boundary | Event |
| --- | --- | --- | --- |
| IssuePolicy | Create a local policy planning record. | One Policy | PolicyIssued |
| PayPremium | Record a local premium fact for planning. | One Policy | PremiumPaid |
| UpdateCoverage | Update coverage amount or beneficiary summary. | One Policy | CoverageUpdated |
| SubmitClaim | Record local claim planning evidence. | One Policy | ClaimSubmitted |
| RecordClaimPayment | Record local claim payment evidence. | One Policy | ClaimPaid |

## State Machine

Allowed policy states:

- Draft
- Active
- Lapsed
- Cancelled
- Claimed
- Closed

Transitions must be deterministic, auditable, owner-scoped, and idempotent. Closed policies cannot be mutated except for archive or restore behavior defined by a future persistence ADR.

## Validation Rules

- policyId, householdId, ownerId, policyType, and policyStatus are required.
- coverageAmount and premiumAmount must be finite non-negative numbers.
- premiumFrequency must be one of monthly, quarterly, semiannual, annual, or one-time.
- effectiveDate cannot be after renewalDate when both are present.
- beneficiarySummary must not contain secrets, tokens, raw identity documents, or remote URLs.
- Policy commands require idempotency keys.

## Reporting Visibility

Insurance reporting may show coverage amount, premium burden, status, and renewal timing. Reports must mask restricted beneficiary details and must not imply carrier-confirmed coverage.

## Audit

Every command records operator, householdId, policyId, command name, event name, timestamp, correlationId, prior state, next state, and validation result.

## Implementation Gate

Runtime implementation requires:

- Repository contract.
- IndexedDB schema decision.
- Backup and restore compatibility decision.
- Owner isolation tests.
- Command and application tests.
- UI accessibility and security validation.
