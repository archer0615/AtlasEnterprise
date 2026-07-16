# API Observability and Runtime Controls

## Purpose

This split document summarizes the API Governance Framework sections for audit, correlation, causation, tracing, performance, caching, rate limiting, and security headers.

## Runtime Control Scope

- Audit Standard records API activity with resource, method, actor or system actor, authorization result, error contract, and correlation metadata.
- CorrelationId links request handling across API, application service, domain service, event, integration, audit, and observability records.
- CausationId links a request or command to the operation that caused it.
- Tracing captures request flow across API gateway, application services, repositories, message contracts, and integrations when applicable.
- Performance controls measure API latency and throughput against declared governance expectations.
- Caching controls must not bypass authorization, permission mapping, tenant isolation, household isolation, audit, or compatibility rules.
- Rate Limiting protects API resources without changing the canonical error contract or authorization model.
- Security Headers are part of the API runtime contract and must align with the Security Framework.

## Canonical Rules

- Audit, correlation, causation, and tracing rules apply to resource name, URI, method, DTO, validation, authorization, error contract, observability, compatibility, and OpenAPI documentation.
- Performance and caching rules apply to the same governance surface and must be documented with the endpoint contract.
- Rate limiting and security header behavior must be visible through the API contract and testable through security and compatibility tests.
- Observability metadata must preserve CorrelationId and CausationId across synchronous and asynchronous boundaries.
- Runtime controls must never introduce undocumented resource names, undocumented URI shapes, unapproved methods, or unversioned DTO changes.

## Related Parent Sections

- `# Audit Standard`
- `# CorrelationId`
- `# CausationId`
- `# Tracing`
- `# Performance`
- `# Caching`
- `# Rate Limiting`
- `# Security Headers`
- `# Testing`

## Related References

- [API Governance Framework](../api-governance-framework.md)
- [API security testing and operations](security-testing-and-operations.md)
- [API versioning and compatibility](versioning-and-compatibility.md)
- [Security Framework](../../security/security-framework.md)
