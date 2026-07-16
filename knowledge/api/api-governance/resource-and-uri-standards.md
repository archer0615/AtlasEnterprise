# API Resource and URI Standards

This split document summarizes the resource naming, URI, HTTP method, request, response, media type, and content negotiation standards from the parent API Governance Framework. The parent document remains the canonical source of truth.

## Scope

- Resource naming.
- URI standard.
- HTTP method standard.
- Request and response standard.
- Media type standard.
- Content negotiation.
- DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation alignment.

## Resource Naming Standard

- Resource names must apply to resource name, URI, method, DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- Resource URLs represent catalog-approved resources.
- Naming must remain compatible with API Governance and the catalog-approved resource model.

## URI Standard

- URI rules apply to resource name, URI, method, DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- URI design must preserve deterministic resource addressing and catalog alignment.
- URI changes are governed by compatibility and versioning rules in the parent API Governance Framework.

## HTTP Method Standard

- HTTP method rules apply to resource name, URI, method, DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- Commands use POST action endpoints only when resource state transition cannot be expressed as standard resource mutation.
- Queries use GET with deterministic pagination, filtering, sorting, and search semantics.

## Request and Response Standards

- Request and response rules apply to resource name, URI, method, DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- Request payloads must preserve DTO and validation conventions.
- Response payloads must preserve error contract, audit, observability, compatibility, and OpenAPI documentation expectations.

## Media Type and Content Negotiation

- Media type and content negotiation rules apply to resource name, URI, method, DTO, validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- Content negotiation must remain explicit and compatible with documented API contracts.

## Related References

- [Parent specification](../api-governance-framework.md)
- [API standards and contracts](standards-and-contracts.md)
- [API versioning and compatibility](versioning-and-compatibility.md)
- [API security testing and operations](security-testing-and-operations.md)
