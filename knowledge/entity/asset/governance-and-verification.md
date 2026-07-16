# Asset Governance and Verification

## Purpose

This split document isolates Asset security, audit, observability, performance, examples, diagrams, testing, edge cases, error catalog, data migration, and consistency verification from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## Governance

- Asset access requires authentication, authorization, permission checks, tenant isolation when tenancy exists, and household isolation in all cases.
- Asset permissions follow the resource-action model such as `Asset:Read`, `Asset:Create`, and `Asset:Update`.
- Financial data classification, encryption, data masking, logging restrictions, over-posting protection, injection protection, CSRF, replay protection, rate limiting, and privilege escalation prevention remain required controls.
- Asset enumeration protection, secure deletion, retention, and audit records must preserve household and ownership boundaries.

## Verification

- Testing must cover creation, update, archive, restore, valuation recording, stale valuation, validation error, concurrency conflict, ownership isolation, and permission denial behavior.
- Edge cases include missing household scope, invalid currency, unknown asset type, stale valuation dates, soft-deleted records, cross-household access, and projection/cache inconsistency.
- Consistency verification must check catalog alignment, aggregate ownership, repository responsibility, API governance, database mapping, security controls, audit completeness, and final consistency matrix status.

## Visual and Example Coverage

- Example JSON contracts cover create, update, detail, summary, search, archive, restore, valuation, ownership, domain event, API error, concurrency conflict, validation error, and stale valuation response.
- Mermaid diagrams cover class, aggregate boundary, Asset and Portfolio relationship, Asset and Position relationship, create sequence, record valuation sequence, archive sequence, entity relationship, state, event publication, and valuation data flow.

## Related References

- [Asset Entity Specification](../Asset.md)
- [Asset API and audit](api-and-audit.md)
- [Asset valuation and reporting](valuation-and-reporting.md)
