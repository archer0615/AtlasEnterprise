# Role Matrix Boundary Summary

Source: [role-and-matrix-catalog.md](role-and-matrix-catalog.md)

## Purpose

This split document summarizes role boundaries, permission matrix semantics, and execution boundary mappings from the parent Role and Matrix Catalog while preserving the parent as the exhaustive matrix source.

## Role Catalog

| Role | Purpose | Scope |
| --- | --- | --- |
| System Administrator | Catalog-approved permission grouping for System Administrator. | Global, Tenant, User Group, User, and Household where applicable. |
| Tenant Administrator | Catalog-approved permission grouping for Tenant Administrator. | Global, Tenant, User Group, User, and Household where applicable. |
| Financial Advisor | Catalog-approved permission grouping for Financial Advisor. | Global, Tenant, User Group, User, and Household where applicable. |
| Standard User | Catalog-approved permission grouping for Standard User. | Global, Tenant, User Group, User, and Household where applicable. |
| Read-only Auditor | Catalog-approved permission grouping for Read-only Auditor. | Global, Tenant, User Group, User, and Household where applicable. |

## Role Boundary Rules

- Permission Boundary follows least privilege and does not bypass Permission Evaluation.
- Assignment Audit is required for grant, revoke, and role change.
- Role Mapping remains catalog-controlled and is evaluated with policy version, scope, and audit requirements.
- Read-only Auditor appears on read-oriented mappings in the parent catalog and does not appear on create, update, delete, execute, approve, export, share, or restore rows.

## Permission Matrix Semantics

The parent Permission Matrix maps each permission to:
- Mapping ID.
- Permission.
- Resource.
- Operation.
- Role Mapping.
- Policy Mapping.

Policy Mapping consistently requires ownership, scope, tenant, household, and deny-before-allow evaluation.

## Execution Boundary Matrices

The parent catalog includes dedicated matrices for these execution boundaries:
- Permission Resource Matrix maps permissions to protected resources.
- Permission API Matrix maps permissions to protected API boundaries.
- Permission Command Matrix maps permissions to protected commands.
- Permission Repository Matrix maps permissions to protected repositories.
- Permission Workflow Matrix maps permissions to workflow-governed steps.
- Permission Scheduler Matrix maps permissions to scheduler-governed executions.
- Permission Automation Matrix maps permissions to automation-governed actions.

## Evaluation Requirement

Role Permission Matrix rows require authenticated Principal, policy version, scope, and audit. These requirements preserve the Security Framework and Permission Framework rule that roles group permissions but never bypass authorization decisions.
