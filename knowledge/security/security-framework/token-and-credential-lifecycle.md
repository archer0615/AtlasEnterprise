# Security Token and Credential Lifecycle

## Purpose

This split document summarizes Security Framework controls for token lifecycle, credential management, secret management, encryption strategy, and key management.

## Lifecycle Scope

- Token Lifecycle defines mandatory controls for components that depend on identity, permission, data protection, or audit evidence.
- Credential Management defines mandatory controls for credential use across API, integration, scheduler, automation, message consumer, and system actor flows.
- Secret Management keeps secret values out of payloads and supports rotation according to security rules.
- Encryption Strategy protects sensitive data in transit and at rest where required by the Security Framework.
- Key Management governs key ownership, rotation, and use for token, credential, signature, encryption, and integration controls.

## Canonical Controls

- Every protected operation must enforce authenticated Principal, authorization decision, permission ownership, household isolation, tenant isolation, audit correlation, and failure-safe denial.
- Token, credential, secret, encryption, and key controls must align with Authentication Architecture, Authorization Architecture, Permission Model, Identity Model, API Security, Message Security, Database Security, Audit Security, and Threat Model.
- Credential and secret material must not be embedded in DTOs, message contracts, integration payloads, audit records, or logs.
- Rotation events and credential validation outcomes must remain auditable without exposing secret values.
- Security failures must deny access and preserve audit evidence.

## Related Parent Sections

- `## Token Lifecycle`
- `## Credential Management`
- `## Secret Management`
- `## Encryption Strategy`
- `## Key Management`
- `## Security Event Contracts`
- `## Validation Rules`

## Related References

- [Security Framework](../security-framework.md)
- [Security architecture](security-architecture.md)
- [Data protection and isolation](data-protection-and-isolation.md)
- [Threat validation and runtime controls](threat-validation-and-runtime-controls.md)
