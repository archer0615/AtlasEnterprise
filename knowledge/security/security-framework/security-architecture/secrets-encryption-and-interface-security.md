# Secrets, Encryption, and Interface Security

Source: [Security Architecture](../security-architecture.md)

## Scope

This split document summarizes credential, secret, cryptographic, and interface controls from the canonical Security Architecture. The parent document remains authoritative.

## Covered Sections

- Credential Management
- Secret Management
- Encryption Strategy
- Key Management
- API Security
- Message Security
- Repository Security

## Review Focus

- Credentials and secrets must be stored, rotated, revoked, and audited without exposing protected values.
- Encryption must protect data in transit, at rest, and across service boundaries where sensitive context moves.
- Key management must define ownership, rotation, separation of duties, and recovery handling.
- APIs and messages must validate identity, permission, integrity, replay protection, and failure-safe denial.
- Repository controls must prevent secret leakage and preserve audit evidence for security-sensitive changes.

## Canonical Reference

Review the canonical body in [Security Architecture](../security-architecture.md) for the full control list.
