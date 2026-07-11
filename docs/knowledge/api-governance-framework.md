> **PWA v1 Architecture Amendment (2026-07-11):** Any PostgreSQL, EF Core, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase mapping. Atlas v1 uses in-process TypeScript Application Use Cases and IndexedDB repositories. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# API Governance Framework

## Principles
- REST-first
- Versioned APIs
- OpenAPI/Swagger
- Stateless
- Consistent error model

## Standards
- /api/v1/
- Resource-based URLs
- JSON only
- UTC timestamps
- Correlation ID

## Security
- OAuth2/OIDC
- JWT
- RBAC
- Rate limiting

## Error Response
- errorCode
- message
- correlationId
- timestamp
- details

## Operational Rules
- Semantic versioning
- Backward compatibility
- Deprecation policy
- Request/response logging
- API metrics
