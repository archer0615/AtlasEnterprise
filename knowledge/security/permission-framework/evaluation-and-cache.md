# Permission Evaluation and Cache

## Purpose
This split document isolates permission evaluation, resolution, inheritance, cache behavior, performance, and executable evaluation contracts from the parent Permission Framework.

## Source
- Parent specification: [Permission Framework](../permission-framework.md)

## Evaluation Model
- Permission Evaluation resolves explicit deny, explicit allow, role inheritance, policy scope, ownership, tenant, household, cache validity, and default deny in deterministic order.
- Permission Architecture requires every protected Atlas execution boundary to check Principal, Claim, Role, Permission, Policy, Resource, Operation, Scope, TenantId, HouseholdId, cache version, and audit correlation before execution.
- Default deny applies when Permission, Role, Policy, Scope, Principal, Claim, tenant isolation, household isolation, or audit context cannot be resolved.

## Inheritance and Cache
- Permission Inheritance must preserve least privilege, explicit resource binding, explicit operation binding, household isolation, tenant isolation, and auditable authorization history.
- Permission Cache improves evaluation latency but cannot bypass explicit deny, scope, ownership, tenant, household, or cache version checks.
- Cache invalidation must preserve audit evidence for permission changes and role assignments.

## Performance and Contracts
- Authorization SLA, Permission Cache, and Evaluation Latency are the parent performance concerns for permission checks.
- The Phase 2 Permission Evaluation Contract preserves the same deterministic authorization decision behavior for executable specifications.

