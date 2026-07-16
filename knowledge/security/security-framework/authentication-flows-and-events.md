# Authentication Flows and Events

Source: [security-framework.md](../security-framework.md)

## Authentication Flows

### Authentication Flow: ApiBearerTokenFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: OidcLoginFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: OAuthAuthorizationFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: ApiKeyIntegrationFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: MTLSIntegrationFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: SessionFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: SchedulerSystemActorFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

### Authentication Flow: MessageConsumerAuthenticationFlow
- Purpose: authenticate the Principal before protected Atlas access.
- Actor: user, service actor, integration actor, scheduler actor, automation actor, background job actor, or message consumer actor.
- Required Input: credential, token, API key, certificate, session reference, or signed message context according to the flow.
- Preconditions: identity provider, key material, permission owner, audit sink, and rate limit policy are available.
- Validation: credential integrity, issuer trust, audience, expiry, revocation, household claim, tenant claim, and replay protection.
- Result: authenticated Principal with claims ready for authorization and permission evaluation.
- Failure: request is denied, audit is recorded, retry policy follows rate limiting, and no protected data is returned.

## Security Event Contracts

### AuthenticationSucceeded
- Trigger: security decision or security lifecycle change named AuthenticationSucceeded.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### AuthenticationFailed
- Trigger: security decision or security lifecycle change named AuthenticationFailed.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### AuthorizationGranted
- Trigger: security decision or security lifecycle change named AuthorizationGranted.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### AuthorizationDenied
- Trigger: security decision or security lifecycle change named AuthorizationDenied.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### PermissionEvaluated
- Trigger: security decision or security lifecycle change named PermissionEvaluated.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### TokenIssued
- Trigger: security decision or security lifecycle change named TokenIssued.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### TokenExpired
- Trigger: security decision or security lifecycle change named TokenExpired.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### SecretRotated
- Trigger: security decision or security lifecycle change named SecretRotated.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### ApiKeyAccepted
- Trigger: security decision or security lifecycle change named ApiKeyAccepted.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### MTLSCertificateValidated
- Trigger: security decision or security lifecycle change named MTLSCertificateValidated.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### RateLimitExceeded
- Trigger: security decision or security lifecycle change named RateLimitExceeded.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

### SecurityAuditRecorded
- Trigger: security decision or security lifecycle change named SecurityAuditRecorded.
- Producer: Security Framework implementation boundary.
- Consumers: AuditRepository, AdministrationApplicationService, API Gateway, Integration Framework, Event Driven Architecture, NotificationApplicationService when configured by catalog rules.
- Required Payload: EventId, PrincipalId, TenantId, HouseholdId when applicable, Resource, Action, Decision, ReasonCode, CorrelationId, CausationId, OccurredAt, SchemaVersion.
- AggregateId: related aggregate identifier when the event protects aggregate access.
- HouseholdId: required for household-scoped resources and omitted only for administration scope without household ownership.
- CorrelationId: required.
- CausationId: required.
- OccurredAt: required UTC timestamp.
- Schema Version: v1.
- Ordering Requirement: ordered per PrincipalId and resource when replayed.
- Replay Requirement: replayable for audit reconstruction without re-executing external side effects.
- Idempotency Requirement: EventId is unique and duplicate delivery is ignored by consumers.

