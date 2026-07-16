# Permission Architecture Overview

This split document summarizes the permission architecture section from the parent Permission Framework. The parent document remains the canonical source of truth.

## Scope

- Principal, Claim, Role, Permission, Policy, Resource, Operation, Scope, TenantId, HouseholdId, cache version, and audit correlation.
- Protected Atlas execution boundaries.
- Permission evaluation, role mapping, policy constraints, and authorization audit history.

## Permission Architecture

- Principal receives Claims from authentication.
- Role maps Principal to catalog permissions.
- Policy constrains permissions by resource, operation, ownership, tenant, household, and scope.
- Permission Evaluation resolves explicit deny, explicit allow, role inheritance, scope, ownership, cache validity, and default deny.
- Audit records permission changes, role assignments, authorization decisions, and privileged operations.

## Execution Boundary Controls

- Every protected Atlas execution boundary checks Principal, Claim, Role, Permission, Policy, Resource, Operation, Scope, TenantId, HouseholdId, cache version, and audit correlation before execution.
- Protected boundaries include Application Services, Domain Services, Repositories, Commands, Domain Events, Workflows, Automation, Scheduler, Background Jobs, APIs, UI, Notification, Audit, and Integration.
- Default deny applies when Permission, Role, Policy, Scope, Principal, Claim, tenant isolation, household isolation, or audit context cannot be resolved.

## Evaluation Outcomes

- Explicit deny takes precedence over explicit allow.
- Role inheritance, scope, ownership, and cache validity are resolved before authorization is accepted.
- Authorization decisions must preserve least privilege, explicit resource binding, explicit operation binding, household isolation, tenant isolation, and auditable authorization history.

## Related References

- [Parent specification](../permission-framework.md)
- [Permission evaluation and cache](evaluation-and-cache.md)
- [Permission integration boundaries](integration-boundaries.md)
- [Permission governance and testing](permission-governance-and-testing.md)
