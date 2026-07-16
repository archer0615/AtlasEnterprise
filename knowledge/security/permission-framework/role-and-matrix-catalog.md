# Role and Matrix Catalog

## Split Navigation
- [Role matrix boundary summary](role-matrix-boundary-summary.md)

Source: [permission-framework.md](../permission-framework.md)

## Role Catalog

### Role: System Administrator
- Purpose: provide catalog-approved permission grouping for System Administrator.
- Permission Boundary: follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit: required for grant, revoke, and role change.
- Scope: Global, Tenant, User Group, User, and Household where applicable.

### Role: Tenant Administrator
- Purpose: provide catalog-approved permission grouping for Tenant Administrator.
- Permission Boundary: follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit: required for grant, revoke, and role change.
- Scope: Global, Tenant, User Group, User, and Household where applicable.

### Role: Financial Advisor
- Purpose: provide catalog-approved permission grouping for Financial Advisor.
- Permission Boundary: follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit: required for grant, revoke, and role change.
- Scope: Global, Tenant, User Group, User, and Household where applicable.

### Role: Standard User
- Purpose: provide catalog-approved permission grouping for Standard User.
- Permission Boundary: follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit: required for grant, revoke, and role change.
- Scope: Global, Tenant, User Group, User, and Household where applicable.

### Role: Read-only Auditor
- Purpose: provide catalog-approved permission grouping for Read-only Auditor.
- Permission Boundary: follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit: required for grant, revoke, and role change.
- Scope: Global, Tenant, User Group, User, and Household where applicable.

## Permission Matrix

| Mapping ID | Permission | Resource | Operation | Role Mapping | Policy Mapping |
| --- | --- | --- | --- | --- | --- |
| MAP-PERM-001 | Dashboard:Create | Dashboard | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-002 | Dashboard:Read | Dashboard | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-003 | Dashboard:Update | Dashboard | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-004 | Dashboard:Delete | Dashboard | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-005 | Dashboard:Execute | Dashboard | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-006 | Dashboard:Approve | Dashboard | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-007 | Dashboard:Export | Dashboard | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-008 | Dashboard:Share | Dashboard | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-009 | Dashboard:Restore | Dashboard | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-010 | Goal:Create | Goal | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-011 | Goal:Read | Goal | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-012 | Goal:Update | Goal | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-013 | Goal:Delete | Goal | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-014 | Goal:Execute | Goal | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-015 | Goal:Approve | Goal | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-016 | Goal:Export | Goal | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-017 | Goal:Share | Goal | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-018 | Goal:Restore | Goal | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-019 | Asset:Create | Asset | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-020 | Asset:Read | Asset | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-021 | Asset:Update | Asset | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-022 | Asset:Delete | Asset | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-023 | Asset:Execute | Asset | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-024 | Asset:Approve | Asset | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-025 | Asset:Export | Asset | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-026 | Asset:Share | Asset | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-027 | Asset:Restore | Asset | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-028 | Liability:Create | Liability | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-029 | Liability:Read | Liability | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-030 | Liability:Update | Liability | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-031 | Liability:Delete | Liability | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-032 | Liability:Execute | Liability | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-033 | Liability:Approve | Liability | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-034 | Liability:Export | Liability | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-035 | Liability:Share | Liability | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-036 | Liability:Restore | Liability | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-037 | Scenario:Create | Scenario | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-038 | Scenario:Read | Scenario | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-039 | Scenario:Update | Scenario | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-040 | Scenario:Delete | Scenario | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-041 | Scenario:Execute | Scenario | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-042 | Scenario:Approve | Scenario | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-043 | Scenario:Export | Scenario | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-044 | Scenario:Share | Scenario | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-045 | Scenario:Restore | Scenario | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-046 | Decision:Create | Decision | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-047 | Decision:Read | Decision | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-048 | Decision:Update | Decision | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-049 | Decision:Delete | Decision | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-050 | Decision:Execute | Decision | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-051 | Decision:Approve | Decision | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-052 | Decision:Export | Decision | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-053 | Decision:Share | Decision | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-054 | Decision:Restore | Decision | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-055 | Policy:Create | Policy | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-056 | Policy:Read | Policy | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-057 | Policy:Update | Policy | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-058 | Policy:Delete | Policy | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-059 | Policy:Execute | Policy | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-060 | Policy:Approve | Policy | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-061 | Policy:Export | Policy | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-062 | Policy:Share | Policy | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-063 | Policy:Restore | Policy | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-064 | Configuration:Create | Configuration | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-065 | Configuration:Read | Configuration | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-066 | Configuration:Update | Configuration | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-067 | Configuration:Delete | Configuration | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-068 | Configuration:Execute | Configuration | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-069 | Configuration:Approve | Configuration | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-070 | Configuration:Export | Configuration | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-071 | Configuration:Share | Configuration | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-072 | Configuration:Restore | Configuration | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-073 | Report:Create | Report | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-074 | Report:Read | Report | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-075 | Report:Update | Report | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-076 | Report:Delete | Report | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-077 | Report:Execute | Report | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-078 | Report:Approve | Report | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-079 | Report:Export | Report | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-080 | Report:Share | Report | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-081 | Report:Restore | Report | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-082 | Administration:Create | Administration | Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-083 | Administration:Read | Administration | Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-084 | Administration:Update | Administration | Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-085 | Administration:Delete | Administration | Delete | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-086 | Administration:Execute | Administration | Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-087 | Administration:Approve | Administration | Approve | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-088 | Administration:Export | Administration | Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-089 | Administration:Share | Administration | Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | ownership, scope, tenant, household, deny before allow |
| MAP-PERM-090 | Administration:Restore | Administration | Restore | System Administrator, Tenant Administrator, Financial Advisor | ownership, scope, tenant, household, deny before allow |

## Role Permission Matrix

| Permission | Role Mapping | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Goal:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Goal:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Goal:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Goal:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Goal:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Goal:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Goal:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Goal:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Goal:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Asset:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Asset:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Asset:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Asset:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Asset:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Asset:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Asset:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Asset:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Asset:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Liability:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Liability:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Liability:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Liability:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Liability:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Liability:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Liability:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Liability:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Liability:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Scenario:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Scenario:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Scenario:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Scenario:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Scenario:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Decision:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Decision:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Decision:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Decision:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Decision:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Decision:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Decision:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Decision:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Decision:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Policy:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Policy:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Policy:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Policy:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Policy:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Policy:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Policy:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Policy:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Policy:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Configuration:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Configuration:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Configuration:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Configuration:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Configuration:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Report:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Report:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Report:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Report:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Report:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Report:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Report:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Report:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Report:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Administration:Create | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Administration:Read | System Administrator, Tenant Administrator, Financial Advisor, Standard User, Read-only Auditor | authenticated Principal, policy version, scope, audit |
| Administration:Update | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Administration:Delete | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Administration:Execute | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Administration:Approve | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |
| Administration:Export | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Administration:Share | System Administrator, Tenant Administrator, Financial Advisor, Standard User | authenticated Principal, policy version, scope, audit |
| Administration:Restore | System Administrator, Tenant Administrator, Financial Advisor | authenticated Principal, policy version, scope, audit |

## Permission Resource Matrix

| Permission | Resource | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | Dashboard | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | Dashboard | authenticated Principal, policy version, scope, audit |
| Goal:Create | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Read | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Update | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Delete | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Execute | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Approve | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Export | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Share | Goal | authenticated Principal, policy version, scope, audit |
| Goal:Restore | Goal | authenticated Principal, policy version, scope, audit |
| Asset:Create | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Read | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Update | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Delete | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Execute | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Approve | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Export | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Share | Asset | authenticated Principal, policy version, scope, audit |
| Asset:Restore | Asset | authenticated Principal, policy version, scope, audit |
| Liability:Create | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Read | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Update | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Delete | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Execute | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Approve | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Export | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Share | Liability | authenticated Principal, policy version, scope, audit |
| Liability:Restore | Liability | authenticated Principal, policy version, scope, audit |
| Scenario:Create | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Read | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Update | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Export | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Share | Scenario | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | Scenario | authenticated Principal, policy version, scope, audit |
| Decision:Create | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Read | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Update | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Delete | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Execute | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Approve | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Export | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Share | Decision | authenticated Principal, policy version, scope, audit |
| Decision:Restore | Decision | authenticated Principal, policy version, scope, audit |
| Policy:Create | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Read | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Update | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Delete | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Execute | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Approve | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Export | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Share | Policy | authenticated Principal, policy version, scope, audit |
| Policy:Restore | Policy | authenticated Principal, policy version, scope, audit |
| Configuration:Create | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Read | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Update | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Export | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Share | Configuration | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | Configuration | authenticated Principal, policy version, scope, audit |
| Report:Create | Report | authenticated Principal, policy version, scope, audit |
| Report:Read | Report | authenticated Principal, policy version, scope, audit |
| Report:Update | Report | authenticated Principal, policy version, scope, audit |
| Report:Delete | Report | authenticated Principal, policy version, scope, audit |
| Report:Execute | Report | authenticated Principal, policy version, scope, audit |
| Report:Approve | Report | authenticated Principal, policy version, scope, audit |
| Report:Export | Report | authenticated Principal, policy version, scope, audit |
| Report:Share | Report | authenticated Principal, policy version, scope, audit |
| Report:Restore | Report | authenticated Principal, policy version, scope, audit |
| Administration:Create | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Read | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Update | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Delete | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Execute | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Approve | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Export | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Share | Administration | authenticated Principal, policy version, scope, audit |
| Administration:Restore | Administration | authenticated Principal, policy version, scope, audit |

## Permission API Matrix

| Permission | API | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Goal:Create | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |
| Goal:Read | /api/v1/policies | authenticated Principal, policy version, scope, audit |
| Goal:Update | /api/v1/dashboard | authenticated Principal, policy version, scope, audit |
| Goal:Delete | /api/v1/notifications | authenticated Principal, policy version, scope, audit |
| Goal:Execute | /api/v1/reports | authenticated Principal, policy version, scope, audit |
| Goal:Approve | /api/v1/administration | authenticated Principal, policy version, scope, audit |
| Goal:Export | /api/v1/audit | authenticated Principal, policy version, scope, audit |
| Goal:Share | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Goal:Restore | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Asset:Create | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Asset:Read | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Asset:Update | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Asset:Delete | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Asset:Execute | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Asset:Approve | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Asset:Export | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Asset:Share | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |
| Asset:Restore | /api/v1/policies | authenticated Principal, policy version, scope, audit |
| Liability:Create | /api/v1/dashboard | authenticated Principal, policy version, scope, audit |
| Liability:Read | /api/v1/notifications | authenticated Principal, policy version, scope, audit |
| Liability:Update | /api/v1/reports | authenticated Principal, policy version, scope, audit |
| Liability:Delete | /api/v1/administration | authenticated Principal, policy version, scope, audit |
| Liability:Execute | /api/v1/audit | authenticated Principal, policy version, scope, audit |
| Liability:Approve | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Liability:Export | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Liability:Share | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Liability:Restore | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Scenario:Create | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Scenario:Read | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Scenario:Update | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |
| Scenario:Export | /api/v1/policies | authenticated Principal, policy version, scope, audit |
| Scenario:Share | /api/v1/dashboard | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | /api/v1/notifications | authenticated Principal, policy version, scope, audit |
| Decision:Create | /api/v1/reports | authenticated Principal, policy version, scope, audit |
| Decision:Read | /api/v1/administration | authenticated Principal, policy version, scope, audit |
| Decision:Update | /api/v1/audit | authenticated Principal, policy version, scope, audit |
| Decision:Delete | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Decision:Execute | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Decision:Approve | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Decision:Export | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Decision:Share | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Decision:Restore | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Policy:Create | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Policy:Read | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Policy:Update | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Policy:Delete | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |
| Policy:Execute | /api/v1/policies | authenticated Principal, policy version, scope, audit |
| Policy:Approve | /api/v1/dashboard | authenticated Principal, policy version, scope, audit |
| Policy:Export | /api/v1/notifications | authenticated Principal, policy version, scope, audit |
| Policy:Share | /api/v1/reports | authenticated Principal, policy version, scope, audit |
| Policy:Restore | /api/v1/administration | authenticated Principal, policy version, scope, audit |
| Configuration:Create | /api/v1/audit | authenticated Principal, policy version, scope, audit |
| Configuration:Read | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Configuration:Update | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Configuration:Export | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Configuration:Share | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Report:Create | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Report:Read | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |
| Report:Update | /api/v1/policies | authenticated Principal, policy version, scope, audit |
| Report:Delete | /api/v1/dashboard | authenticated Principal, policy version, scope, audit |
| Report:Execute | /api/v1/notifications | authenticated Principal, policy version, scope, audit |
| Report:Approve | /api/v1/reports | authenticated Principal, policy version, scope, audit |
| Report:Export | /api/v1/administration | authenticated Principal, policy version, scope, audit |
| Report:Share | /api/v1/audit | authenticated Principal, policy version, scope, audit |
| Report:Restore | /api/v1/users | authenticated Principal, policy version, scope, audit |
| Administration:Create | /api/v1/households | authenticated Principal, policy version, scope, audit |
| Administration:Read | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |
| Administration:Update | /api/v1/goals | authenticated Principal, policy version, scope, audit |
| Administration:Delete | /api/v1/portfolios | authenticated Principal, policy version, scope, audit |
| Administration:Execute | /api/v1/loans | authenticated Principal, policy version, scope, audit |
| Administration:Approve | /api/v1/properties | authenticated Principal, policy version, scope, audit |
| Administration:Export | /api/v1/scenarios | authenticated Principal, policy version, scope, audit |
| Administration:Share | /api/v1/decisions | authenticated Principal, policy version, scope, audit |
| Administration:Restore | /api/v1/recommendations | authenticated Principal, policy version, scope, audit |

## Permission Command Matrix

| Permission | Command | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | RecordIncome | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | RecordExpense | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | CreatePortfolio | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | BuySecurity | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | SellSecurity | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | RebalancePortfolio | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | CreateLoan | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | RecordLoanPayment | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | RefinanceLoan | authenticated Principal, policy version, scope, audit |
| Goal:Create | PurchaseHome | authenticated Principal, policy version, scope, audit |
| Goal:Read | SellHome | authenticated Principal, policy version, scope, audit |
| Goal:Update | UpdatePropertyValue | authenticated Principal, policy version, scope, audit |
| Goal:Delete | IssuePolicy | authenticated Principal, policy version, scope, audit |
| Goal:Execute | PayPremium | authenticated Principal, policy version, scope, audit |
| Goal:Approve | UpdateRetirementPlan | authenticated Principal, policy version, scope, audit |
| Goal:Export | EvaluateScenario | authenticated Principal, policy version, scope, audit |
| Goal:Share | AcceptRecommendation | authenticated Principal, policy version, scope, audit |
| Goal:Restore | RejectRecommendation | authenticated Principal, policy version, scope, audit |
| Asset:Create | ReplayScenario | authenticated Principal, policy version, scope, audit |
| Asset:Read | RecordIncome | authenticated Principal, policy version, scope, audit |
| Asset:Update | RecordExpense | authenticated Principal, policy version, scope, audit |
| Asset:Delete | CreatePortfolio | authenticated Principal, policy version, scope, audit |
| Asset:Execute | BuySecurity | authenticated Principal, policy version, scope, audit |
| Asset:Approve | SellSecurity | authenticated Principal, policy version, scope, audit |
| Asset:Export | RebalancePortfolio | authenticated Principal, policy version, scope, audit |
| Asset:Share | CreateLoan | authenticated Principal, policy version, scope, audit |
| Asset:Restore | RecordLoanPayment | authenticated Principal, policy version, scope, audit |
| Liability:Create | RefinanceLoan | authenticated Principal, policy version, scope, audit |
| Liability:Read | PurchaseHome | authenticated Principal, policy version, scope, audit |
| Liability:Update | SellHome | authenticated Principal, policy version, scope, audit |
| Liability:Delete | UpdatePropertyValue | authenticated Principal, policy version, scope, audit |
| Liability:Execute | IssuePolicy | authenticated Principal, policy version, scope, audit |
| Liability:Approve | PayPremium | authenticated Principal, policy version, scope, audit |
| Liability:Export | UpdateRetirementPlan | authenticated Principal, policy version, scope, audit |
| Liability:Share | EvaluateScenario | authenticated Principal, policy version, scope, audit |
| Liability:Restore | AcceptRecommendation | authenticated Principal, policy version, scope, audit |
| Scenario:Create | RejectRecommendation | authenticated Principal, policy version, scope, audit |
| Scenario:Read | ReplayScenario | authenticated Principal, policy version, scope, audit |
| Scenario:Update | RecordIncome | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | RecordExpense | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | CreatePortfolio | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | BuySecurity | authenticated Principal, policy version, scope, audit |
| Scenario:Export | SellSecurity | authenticated Principal, policy version, scope, audit |
| Scenario:Share | RebalancePortfolio | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | CreateLoan | authenticated Principal, policy version, scope, audit |
| Decision:Create | RecordLoanPayment | authenticated Principal, policy version, scope, audit |
| Decision:Read | RefinanceLoan | authenticated Principal, policy version, scope, audit |
| Decision:Update | PurchaseHome | authenticated Principal, policy version, scope, audit |
| Decision:Delete | SellHome | authenticated Principal, policy version, scope, audit |
| Decision:Execute | UpdatePropertyValue | authenticated Principal, policy version, scope, audit |
| Decision:Approve | IssuePolicy | authenticated Principal, policy version, scope, audit |
| Decision:Export | PayPremium | authenticated Principal, policy version, scope, audit |
| Decision:Share | UpdateRetirementPlan | authenticated Principal, policy version, scope, audit |
| Decision:Restore | EvaluateScenario | authenticated Principal, policy version, scope, audit |
| Policy:Create | AcceptRecommendation | authenticated Principal, policy version, scope, audit |
| Policy:Read | RejectRecommendation | authenticated Principal, policy version, scope, audit |
| Policy:Update | ReplayScenario | authenticated Principal, policy version, scope, audit |
| Policy:Delete | RecordIncome | authenticated Principal, policy version, scope, audit |
| Policy:Execute | RecordExpense | authenticated Principal, policy version, scope, audit |
| Policy:Approve | CreatePortfolio | authenticated Principal, policy version, scope, audit |
| Policy:Export | BuySecurity | authenticated Principal, policy version, scope, audit |
| Policy:Share | SellSecurity | authenticated Principal, policy version, scope, audit |
| Policy:Restore | RebalancePortfolio | authenticated Principal, policy version, scope, audit |
| Configuration:Create | CreateLoan | authenticated Principal, policy version, scope, audit |
| Configuration:Read | RecordLoanPayment | authenticated Principal, policy version, scope, audit |
| Configuration:Update | RefinanceLoan | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | PurchaseHome | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | SellHome | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | UpdatePropertyValue | authenticated Principal, policy version, scope, audit |
| Configuration:Export | IssuePolicy | authenticated Principal, policy version, scope, audit |
| Configuration:Share | PayPremium | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | UpdateRetirementPlan | authenticated Principal, policy version, scope, audit |
| Report:Create | EvaluateScenario | authenticated Principal, policy version, scope, audit |
| Report:Read | AcceptRecommendation | authenticated Principal, policy version, scope, audit |
| Report:Update | RejectRecommendation | authenticated Principal, policy version, scope, audit |
| Report:Delete | ReplayScenario | authenticated Principal, policy version, scope, audit |
| Report:Execute | RecordIncome | authenticated Principal, policy version, scope, audit |
| Report:Approve | RecordExpense | authenticated Principal, policy version, scope, audit |
| Report:Export | CreatePortfolio | authenticated Principal, policy version, scope, audit |
| Report:Share | BuySecurity | authenticated Principal, policy version, scope, audit |
| Report:Restore | SellSecurity | authenticated Principal, policy version, scope, audit |
| Administration:Create | RebalancePortfolio | authenticated Principal, policy version, scope, audit |
| Administration:Read | CreateLoan | authenticated Principal, policy version, scope, audit |
| Administration:Update | RecordLoanPayment | authenticated Principal, policy version, scope, audit |
| Administration:Delete | RefinanceLoan | authenticated Principal, policy version, scope, audit |
| Administration:Execute | PurchaseHome | authenticated Principal, policy version, scope, audit |
| Administration:Approve | SellHome | authenticated Principal, policy version, scope, audit |
| Administration:Export | UpdatePropertyValue | authenticated Principal, policy version, scope, audit |
| Administration:Share | IssuePolicy | authenticated Principal, policy version, scope, audit |
| Administration:Restore | PayPremium | authenticated Principal, policy version, scope, audit |

## Permission Repository Matrix

| Permission | Repository | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | UserRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | AssetRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | GoalRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | LoanRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Goal:Create | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Goal:Read | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Goal:Update | AuditRepository | authenticated Principal, policy version, scope, audit |
| Goal:Delete | UserRepository | authenticated Principal, policy version, scope, audit |
| Goal:Execute | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Goal:Approve | AssetRepository | authenticated Principal, policy version, scope, audit |
| Goal:Export | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Goal:Share | GoalRepository | authenticated Principal, policy version, scope, audit |
| Goal:Restore | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Asset:Create | LoanRepository | authenticated Principal, policy version, scope, audit |
| Asset:Read | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Asset:Update | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Asset:Delete | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Asset:Execute | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Asset:Approve | AuditRepository | authenticated Principal, policy version, scope, audit |
| Asset:Export | UserRepository | authenticated Principal, policy version, scope, audit |
| Asset:Share | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Asset:Restore | AssetRepository | authenticated Principal, policy version, scope, audit |
| Liability:Create | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Liability:Read | GoalRepository | authenticated Principal, policy version, scope, audit |
| Liability:Update | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Liability:Delete | LoanRepository | authenticated Principal, policy version, scope, audit |
| Liability:Execute | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Liability:Approve | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Liability:Export | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Liability:Share | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Liability:Restore | AuditRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Create | UserRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Read | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Update | AssetRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | GoalRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Export | LoanRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Share | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Decision:Create | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Decision:Read | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Decision:Update | AuditRepository | authenticated Principal, policy version, scope, audit |
| Decision:Delete | UserRepository | authenticated Principal, policy version, scope, audit |
| Decision:Execute | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Decision:Approve | AssetRepository | authenticated Principal, policy version, scope, audit |
| Decision:Export | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Decision:Share | GoalRepository | authenticated Principal, policy version, scope, audit |
| Decision:Restore | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Policy:Create | LoanRepository | authenticated Principal, policy version, scope, audit |
| Policy:Read | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Policy:Update | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Policy:Delete | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Policy:Execute | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Policy:Approve | AuditRepository | authenticated Principal, policy version, scope, audit |
| Policy:Export | UserRepository | authenticated Principal, policy version, scope, audit |
| Policy:Share | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Policy:Restore | AssetRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Create | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Read | GoalRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Update | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | LoanRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Export | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Share | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | AuditRepository | authenticated Principal, policy version, scope, audit |
| Report:Create | UserRepository | authenticated Principal, policy version, scope, audit |
| Report:Read | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Report:Update | AssetRepository | authenticated Principal, policy version, scope, audit |
| Report:Delete | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Report:Execute | GoalRepository | authenticated Principal, policy version, scope, audit |
| Report:Approve | PortfolioRepository | authenticated Principal, policy version, scope, audit |
| Report:Export | LoanRepository | authenticated Principal, policy version, scope, audit |
| Report:Share | PropertyRepository | authenticated Principal, policy version, scope, audit |
| Report:Restore | ScenarioRepository | authenticated Principal, policy version, scope, audit |
| Administration:Create | DecisionRepository | authenticated Principal, policy version, scope, audit |
| Administration:Read | NotificationRepository | authenticated Principal, policy version, scope, audit |
| Administration:Update | AuditRepository | authenticated Principal, policy version, scope, audit |
| Administration:Delete | UserRepository | authenticated Principal, policy version, scope, audit |
| Administration:Execute | HouseholdRepository | authenticated Principal, policy version, scope, audit |
| Administration:Approve | AssetRepository | authenticated Principal, policy version, scope, audit |
| Administration:Export | LiabilityRepository | authenticated Principal, policy version, scope, audit |
| Administration:Share | GoalRepository | authenticated Principal, policy version, scope, audit |
| Administration:Restore | PortfolioRepository | authenticated Principal, policy version, scope, audit |

## Permission Workflow Matrix

| Permission | Workflow | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Goal:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Asset:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Liability:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Decision:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Policy:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Report:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Create | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Read | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Update | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Delete | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Execute | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Approve | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Export | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Share | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |
| Administration:Restore | Workflow Engine Framework | authenticated Principal, policy version, scope, audit |

## Permission Scheduler Matrix

| Permission | Scheduler | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Goal:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Asset:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Liability:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Decision:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Policy:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Report:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Create | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Read | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Update | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Delete | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Execute | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Approve | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Export | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Share | Scheduler Framework | authenticated Principal, policy version, scope, audit |
| Administration:Restore | Scheduler Framework | authenticated Principal, policy version, scope, audit |

## Permission Automation Matrix

| Permission | Automation | Evaluation Requirement |
| --- | --- | --- |
| Dashboard:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Dashboard:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Goal:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Asset:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Liability:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Scenario:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Decision:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Policy:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Configuration:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Report:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Create | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Read | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Update | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Delete | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Execute | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Approve | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Export | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Share | Automation Framework | authenticated Principal, policy version, scope, audit |
| Administration:Restore | Automation Framework | authenticated Principal, policy version, scope, audit |

