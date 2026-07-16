# Data Isolation and Threat Controls

Source: [Security Architecture](../security-architecture.md)

## Scope

This split document summarizes data protection, isolation, audit, threat, and permission mapping controls from the canonical Security Architecture. The parent document remains authoritative.

## Covered Sections

- Database Security
- Tenant Isolation
- Household Isolation
- PII Protection
- Data Masking
- Audit Security
- Threat Model
- Permission Mapping

## Review Focus

- Database access must enforce authenticated Principal, authorization decision, and least privilege.
- Tenant and household isolation must be checked before protected data is read, written, exported, or joined.
- PII and masked data flows must preserve privacy boundaries while retaining useful operational context.
- Audit records must provide correlation, denial evidence, and tamper-resistant security history.
- Threat modeling and permission mapping must keep controls aligned with real Atlas operations.

## Canonical Reference

Review the canonical body in [Security Architecture](../security-architecture.md) for the full control list.
