# Data Protection and Isolation

Source: [security-framework.md](../security-framework.md)

## Purpose

This split document isolates Atlas data protection, storage security, tenant isolation, household isolation, PII protection, data masking, and audit security controls from the parent Security Framework.

## Data Protection Scope

- Encryption protects sensitive data in transit and at rest, including PII, credentials, secrets, and security audit material.
- Hash protects credentials and integrity references where reversible access is not required.
- Digital Signature validates token integrity, message integrity, event authenticity, and non-repudiation where required.
- Secrets include signing keys, API keys, integration credentials, database credentials, encryption keys, and provider credentials.
- Key Rotation replaces active secrets and keys on a controlled schedule or incident response trigger without breaking auditability.

## Credential, Secret, Encryption, and Key Controls

- Credential Management requires authenticated Principal, authorization decision, permission ownership, household isolation, tenant isolation, audit correlation, and failure-safe denial for protected credential operations.
- Secret Management applies the same mandatory controls to signing keys, API keys, integration credentials, database credentials, encryption keys, and provider credentials.
- Encryption Strategy protects sensitive data in transit and at rest and remains aligned with audit, database, integration, and message security requirements.
- Key Management and Key Rotation must preserve auditability while changing active keys or secrets.

## Repository and Database Security

- Repository Security requires protected repository access to preserve Principal context, authorization decisions, permission ownership, tenant isolation, household isolation, and audit correlation.
- Database Security requires protected database access to enforce data isolation and avoid returning or modifying protected records without completed security evaluation.
- Cache access must not bypass permission, role, policy, tenant, household, or audit requirements.

## Tenant and Household Isolation

- Tenant Isolation requires every protected Atlas operation to enforce TenantId boundaries where applicable.
- Household Isolation requires every protected Atlas operation to enforce HouseholdId boundaries where applicable.
- Permission evaluation must include ownership, tenant membership, household membership, explicit deny, explicit allow, and default deny.
- Machine-to-machine calls, scheduled operations, background jobs, and message consumers must use authenticated Principal context with auditable execution scope.

## PII Protection and Data Masking

- PII Protection applies to sensitive user, household, financial, credential, and audit evidence data.
- Data Masking must avoid exposing protected data through APIs, DTOs, notifications, messages, logs, exports, reports, or operational views.
- UI actions must request the relevant permission before protected operation rendering.
- Notification actions must avoid exposing protected resource data without the matching permission.

## Audit Security

- Every material decision or failure involving authentication, authorization, permission, role, policy, principal, identity, claims, token, OAuth, OIDC, API key, mTLS, session, CSRF, CORS, rate limiting, encryption, hash, digital signature, secrets, or key rotation must be correlated with Principal, HouseholdId when applicable, TenantId when applicable, CorrelationId, and timestamp.
- Authorization result and permission decision are recorded for protected operations.
- Audit evidence must remain replayable from claims, role assignment, policy version, resource scope, and authorization result.
