# Permission Resolution Inheritance and Cache

## Purpose

This split document summarizes Permission Framework sections for permission resolution, inheritance, and cache strategy.

## Resolution Order

- Explicit deny takes precedence over explicit allow.
- Explicit allow is evaluated with role mapping, policy mapping, scope, Principal, Claim, ownership, tenant, and household context.
- Role inheritance contributes permissions only when the inherited role and policy scope are valid for the Principal.
- Ownership, tenant, and household boundaries remain part of the decision and cannot be bypassed by cache.
- Default deny applies when required permission evidence is missing, expired, conflicting, or outside scope.

## Cache Strategy

- Permission cache entries must include permission name, resource, operation, role mapping, policy mapping, scope, Principal, Claim, cache version, and audit correlation.
- Cache validity participates in deterministic permission resolution.
- Cache use must preserve tenant isolation, household isolation, ownership checks, privilege escalation prevention, and audit requirements.
- Cache misses, stale entries, and conflicting entries must not allow execution by default.

## Validation Surface

| Area | Required Evidence |
|---|---|
| Resolution | Explicit deny, explicit allow, policy scope, ownership, tenant, household, default deny |
| Inheritance | Role mapping, inherited permission, policy mapping, scope, Principal, Claim |
| Cache | Cache version, cache validity, permission name, resource, operation, audit correlation |
| Security | Authorization, privilege escalation prevention, tenant isolation, household isolation |

## Related References

- [Permission Framework](../permission-framework.md)
- [Permission evaluation and cache](evaluation-and-cache.md)
- [Permission governance and testing](permission-governance-and-testing.md)
- [Security Framework](../security-framework.md)
