# Threat Validation and Runtime Controls

Source: [security-framework.md](../security-framework.md)

## Purpose

This split document isolates threat model, validation, business rules, runtime performance controls, edge cases, and consistency checks from the parent Security Framework.

## Runtime Boundary Controls

- API Security protects REST APIs with authentication, authorization, permission evaluation, tenant isolation, household isolation, validation, audit correlation, and rate limiting before protected data is returned or modified.
- Message Security protects message contracts, domain events, and consumers with authenticated Principal context and auditable execution scope.
- Scheduler, automation, background job, and integration executions must use explicit permissions and auditable context.
- Rate Limiting protects APIs, authentication endpoints, integration endpoints, and high-cost queries from excessive traffic.

## Threat Model

- Threat Model controls require failure-safe denial when authentication, authorization, permission, tenant isolation, household isolation, validation, audit correlation, or rate limiting cannot be completed.
- Privilege escalation prevention requires least privilege, explicit scope, explicit deny, explicit allow, role inheritance, ownership, tenant, household, and default deny evaluation.
- Protected data must not be exposed through API, DTO, message, event, workflow, notification, cache, repository, database, or operational surfaces without completed authorization.

## Validation Rules

- Validation Rules require protected operations to verify Principal, claims, role assignment, permission, policy, resource, operation, tenant scope, household scope, and audit context.
- Token, JWT, OAuth, OIDC, API key, mTLS, and session inputs must be validated before they are accepted as authenticated context.
- CSRF protection applies to browser-originating state-changing requests that use session credentials.
- CORS limits browser access to approved Atlas origins and does not replace authentication or authorization.

## Business Rules

- Default deny applies when security context cannot be resolved.
- Explicit deny must be evaluated before explicit allow.
- Permission evaluation must be deterministic and replayable from claims, role assignment, policy version, and resource scope.
- Permission cache can improve latency only when policy and role versions match; it cannot bypass deny, scope, ownership, tenant, household, or audit checks.

## Performance and Testing

- Authentication SLA, Authorization SLA, and Permission Cache behavior are the parent performance concerns for security checks.
- Authentication, authorization, permission, integration, penetration, and performance tests must cover protected runtime boundaries.
- Edge cases must preserve failure-safe denial, audit correlation, tenant isolation, household isolation, and protected data masking.

## Consistency Requirements

- Security behavior must remain aligned with API Governance Framework, Permission Framework, Application Service Catalog, Domain Service Catalog, Repository Catalog, Command Catalog, Domain Event Catalog, Message Contract Catalog, Event Driven Architecture, Integration Framework, System Module Catalog, Service Catalog, Decision Audit Framework, API Documentation, and Database Design.
- Security event contracts must preserve evidence for AuthenticationSucceeded, AuthenticationFailed, AuthorizationGranted, AuthorizationDenied, PermissionEvaluated, TokenIssued, TokenExpired, SecretRotated, ApiKeyAccepted, MTLSCertificateValidated, RateLimitExceeded, and SecurityAuditRecorded.
