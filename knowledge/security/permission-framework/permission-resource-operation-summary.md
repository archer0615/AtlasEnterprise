# Permission Resource Operation Summary

Source: [permission-catalog.md](permission-catalog.md)

## Purpose

This split document summarizes the complete permission naming surface from the parent Permission Catalog by resource and operation while preserving the parent as the exhaustive permission record.

## Shared Permission Contract

Every permission entry in the parent catalog follows the same Atlas governance contract:
- Permission Name binds Resource and Operation, such as `Dashboard:Read`.
- Scope can include Global, Tenant, User Group, User, and Household where applicable.
- Role Mapping is catalog-controlled and does not bypass Permission Evaluation.
- Policy Mapping evaluates resource ownership, operation sensitivity, tenant membership, household membership, explicit deny, explicit allow, and default deny.
- Protected UI actions must request the permission before rendering the operation.
- Notifications must avoid exposing protected resource data without the relevant permission.
- Authorization result and permission decision are recorded.
- Permission Evaluation is deterministic and replayable from claims, role assignment, policy version, and resource scope.
- Cache Strategy keys decisions by PrincipalId, TenantId, HouseholdId, Permission, Resource, Operation, RoleVersion, and PolicyVersion.

## Resource Operation Catalog

| Resource | Permissions |
| --- | --- |
| Dashboard | Dashboard:Create, Dashboard:Read, Dashboard:Update, Dashboard:Delete, Dashboard:Execute, Dashboard:Approve, Dashboard:Export, Dashboard:Share, Dashboard:Restore |
| Goal | Goal:Create, Goal:Read, Goal:Update, Goal:Delete, Goal:Execute, Goal:Approve, Goal:Export, Goal:Share, Goal:Restore |
| Asset | Asset:Create, Asset:Read, Asset:Update, Asset:Delete, Asset:Execute, Asset:Approve, Asset:Export, Asset:Share, Asset:Restore |
| Liability | Liability:Create, Liability:Read, Liability:Update, Liability:Delete, Liability:Execute, Liability:Approve, Liability:Export, Liability:Share, Liability:Restore |
| Scenario | Scenario:Create, Scenario:Read, Scenario:Update, Scenario:Delete, Scenario:Execute, Scenario:Approve, Scenario:Export, Scenario:Share, Scenario:Restore |
| Decision | Decision:Create, Decision:Read, Decision:Update, Decision:Delete, Decision:Execute, Decision:Approve, Decision:Export, Decision:Share, Decision:Restore |
| Policy | Policy:Create, Policy:Read, Policy:Update, Policy:Delete, Policy:Execute, Policy:Approve, Policy:Export, Policy:Share, Policy:Restore |
| Configuration | Configuration:Create, Configuration:Read, Configuration:Update, Configuration:Delete, Configuration:Execute, Configuration:Approve, Configuration:Export, Configuration:Share, Configuration:Restore |
| Report | Report:Create, Report:Read, Report:Update, Report:Delete, Report:Execute, Report:Approve, Report:Export, Report:Share, Report:Restore |
| Administration | Administration:Create, Administration:Read, Administration:Update, Administration:Delete, Administration:Execute, Administration:Approve, Administration:Export, Administration:Share, Administration:Restore |

## Operation Meaning

| Operation | Catalog Meaning |
| --- | --- |
| Create | Allows authorized Principal to create authorized records for the resource. |
| Read | Allows authorized Principal to read authorized records for the resource. |
| Update | Allows authorized Principal to update authorized records for the resource. |
| Delete | Allows authorized Principal to delete authorized records for the resource. |
| Execute | Allows authorized Principal to execute authorized resource operations. |
| Approve | Allows authorized Principal to approve authorized resource operations. |
| Export | Allows authorized Principal to export authorized resource data. |
| Share | Allows authorized Principal to share authorized resource data. |
| Restore | Allows authorized Principal to restore authorized resource records. |

## Shared Dependencies

The parent permission entries reference Security Framework, API Governance Framework, Permission Cache, and Audit as dependencies. Entries also map protected operations to application services, domain services, repositories, commands, domain events, workflows, scheduler executions, automation actions, background jobs, APIs, UI actions, and notifications.
