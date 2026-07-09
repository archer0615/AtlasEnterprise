# permission-framework.md

# Atlas Enterprise Specification
## Permission Framework

Version: 1.0

## 1. Purpose
Define authorization, role-based access control (RBAC), and permission governance across Atlas.

## 2. Objectives
- Least privilege
- Centralized authorization
- Auditable permission changes
- Fine-grained resource control

## 3. Security Model
User → Role → Permission → Resource → Action

## 4. Resource Types
- Dashboard
- Goal
- Asset
- Liability
- Scenario
- Decision
- Policy
- Configuration
- Report
- Administration

## 5. Actions
Create, Read, Update, Delete, Execute, Approve, Export, Share, Restore.

## 6. Built-in Roles
- System Administrator
- Tenant Administrator
- Financial Advisor
- Standard User
- Read-only Auditor

## 7. Permission Evaluation
1. System deny
2. Explicit deny
3. Explicit allow
4. Role inheritance
5. Default deny

## 8. Scope
Global → Tenant → User Group → User

## 9. Audit
Log all permission grants, revocations, failed authorization attempts, and privileged operations.

## 10. Integration
Feature Flags, Policy Management, Configuration, Audit, Notification.

## 11. KPIs
Unauthorized access rate, privilege escalation attempts, role coverage, audit completeness.

## 12. Future
Attribute-based access control (ABAC), Just-In-Time access, delegated administration.
