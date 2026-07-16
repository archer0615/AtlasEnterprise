# Identity and Access Architecture

Source: [Security Architecture](../security-architecture.md)

## Scope

This split document summarizes the identity and access control portions of the canonical Security Architecture. The parent document remains authoritative.

## Covered Sections

- Authentication Architecture
- Authorization Architecture
- Permission Model
- Identity Model
- Token Lifecycle

## Review Focus

- Every protected Atlas operation must start from an authenticated Principal.
- Authorization decisions must be explicit, auditable, and fail closed.
- Permission ownership must include household and tenant boundaries.
- Identity claims must be traceable through authorization and audit records.
- Token lifecycle controls must cover issuance, expiry, revocation, replay prevention, and downstream propagation.

## Canonical Reference

Review the canonical body in [Security Architecture](../security-architecture.md) for the full control list.
