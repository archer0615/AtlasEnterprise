# Integration Credential and Execution Controls

## Purpose

This split document summarizes Integration Framework controls for authentication, authorization, encryption, credential references, retry, timeout, compensation, replay, and execution contracts.

## Credential Boundary

- Integrations use catalog-approved source and target systems.
- All integration calls require authentication, authorization, retry, timeout, audit, monitoring, and versioning.
- Secrets are managed outside payloads and rotated according to security rules.
- External payloads are translated through adapter or anti corruption layer before domain use.
- Credential references identify approved credentials; secret values are never included in integration payloads or execution contracts.

## Execution Contract

| Field | Required | Description |
|---|---|---|
| IntegrationExecutionId | Yes | Stable integration run identifier |
| IntegrationKey | Yes | Catalog integration identifier |
| SourceSystem | Yes | Source system |
| TargetSystem | Yes | Target system |
| ProtocolVersion | Yes | Protocol and contract version |
| PayloadVersion | Yes | Message or DTO version |
| CredentialRef | Yes | Credential reference, never secret value |
| IdempotencyKey | Yes | Deduplication key |
| CorrelationId | Yes | Audit correlation |

## Required Commands

| Command | Actor | Output |
|---|---|---|
| ExecuteIntegrationRun | IntegrationApplicationService | IntegrationRunExecuted |
| RetryIntegrationRun | IntegrationApplicationService | IntegrationRunRetried |
| CompensateIntegrationRun | IntegrationApplicationService | IntegrationRunCompensated |
| ReplayIntegrationRun | AdministrationApplicationService | IntegrationRunReplayed |

## Validation Rules

| Rule ID | Rule | Failure |
|---|---|---|
| INF-P2-VR-001 | Integration run must include protocol, payload version, credential reference, and idempotency key. | Reject run |
| INF-P2-VR-002 | Retry must follow configured retry and timeout policy. | Reject retry |
| INF-P2-VR-003 | Compensation must reference original run and compensation policy. | Reject compensation |
| INF-P2-VR-004 | Replay must not call external systems. | Reject replay |

## Related References

- [Integration Framework](../integration-framework.md)
- [Integration resilience and security](resilience-and-security.md)
- [Integration diagrams and execution addendum](diagrams-and-execution-addendum.md)
- [Security Framework](../../security/security-framework.md)
