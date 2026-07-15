# policy-management-framework.md

# Atlas Enterprise Specification
## Policy Management Framework

Version: 1.0

## 1. Purpose

This specification defines how business policies are modeled, governed, versioned, approved, executed, and audited across Project Atlas. Policies provide configurable business behavior without requiring code changes.

---

# 2. Objectives

- Centralize business policies.
- Separate policy from application logic.
- Support versioning and approvals.
- Enable policy explainability.
- Maintain complete audit history.

---

# 3. Policy Domains

| Domain | Examples |
|---------|----------|
| Investment | IPS, allocation limits, rebalancing |
| Cash Flow | Emergency fund, savings rate |
| Loan | LTV, DTI, refinance rules |
| Retirement | Withdrawal policy, retirement age |
| Risk | Risk score thresholds |
| Recommendation | Priority and ranking |
| Notification | Alert triggers |
| Automation | Scheduled actions |

---

# 4. Policy Structure

Every policy contains:

- Policy ID
- Name
- Domain
- Description
- Scope
- Version
- Status
- Effective Date
- Expiration Date
- Owner
- Approver
- Rule Definitions
- Exceptions
- Dependencies
- Audit Metadata

---

# 5. Lifecycle

Draft
→ Review
→ Approved
→ Scheduled
→ Active
→ Deprecated
→ Archived

Only one active version is allowed for the same policy scope.

---

# 6. Scope

Policies may apply to:

- Entire system
- Tenant
- User group
- Individual user
- Financial plan
- Scenario
- Decision session

Priority:

User
→ Group
→ Tenant
→ Global

---

# 7. Version Management

Each revision records:

- Semantic version
- Change summary
- Business reason
- Risk assessment
- Approval record
- Rollback reference

Older versions remain immutable.

---

# 8. Rule Representation

Policies should reference:

- AREL expressions
- Decision rules
- Constraint rules
- Scoring models
- Formula catalog

---

# 9. Approval Workflow

Author
→ Reviewer
→ Business Owner
→ Technical Validation
→ Approval
→ Publish

Emergency changes require post-deployment review.

---

# 10. Runtime Evaluation

Execution order:

1. Load applicable policies
2. Resolve scope
3. Resolve conflicts
4. Validate constraints
5. Execute rules
6. Produce explanation
7. Record audit

---

# 11. Conflict Resolution

Priority:

1. Regulatory policy
2. Hard constraints
3. User-specific policy
4. Tenant policy
5. Global defaults

---

# 12. Audit Requirements

Capture:

- Policy version
- Evaluation timestamp
- Decision session
- Inputs
- Outputs
- User
- Execution duration

---

# 13. Security

- RBAC-controlled editing
- Immutable approval history
- Environment isolation
- Digital audit trail

---

# 14. Integration

Integrated with:

- Decision Engine
- Rule Engine
- Explainability Framework
- Notification Framework
- Automation Framework
- Execution Plan Framework

---

# 15. KPIs

- Active policy count
- Approval lead time
- Policy evaluation latency
- Policy conflict rate
- Rollback frequency
- Policy compliance rate

---

# 16. Future Enhancements

- Policy simulation
- AI-assisted policy drafting
- Dependency graph visualization
- Automatic impact analysis
- Regulatory policy packages

---

# 17. Phase 2 Executable Specification

## Policy Lifecycle Contract

| Field | Requirement |
|---|---|
| Aggregate | PolicyVersion |
| Identity | policyId + version |
| Scope | global, tenant, group, user, scenario, decisionSession |
| Required State | domain, status, effectiveDate, owner, approver, rules, dependencies |
| Immutable State | Approved, active, deprecated, and archived versions are immutable. |
| Invariant | Only one active version is allowed per policy scope. |

## Required Commands

| Command | Purpose |
|---|---|
| CreatePolicyDraft | Create draft policy version. |
| SubmitPolicyForReview | Move draft into review. |
| ApprovePolicyVersion | Approve policy after validation. |
| SchedulePolicyActivation | Set activation date for approved policy. |
| ActivatePolicyVersion | Make policy version active for scope. |
| DeprecatePolicyVersion | Retire active policy version. |
| RollBackPolicyVersion | Restore approved prior version. |
| EvaluatePolicy | Execute applicable policy rules for a context. |

## Domain Events

| Event | Trigger |
|---|---|
| PolicyDraftCreated | Draft version is created. |
| PolicySubmittedForReview | Review workflow starts. |
| PolicyVersionApproved | Version is approved. |
| PolicyActivationScheduled | Activation date is set. |
| PolicyVersionActivated | Version becomes active. |
| PolicyVersionDeprecated | Version is retired. |
| PolicyEvaluationCompleted | Runtime evaluation completes. |

## Validation Rules

1. Policy version must include change summary, business reason, owner, and approver.
2. Active policy conflicts must be resolved before activation.
3. Emergency changes require post-deployment review record.
4. Policy evaluation must record policy version and input hash.
5. Rollback must reference an approved immutable prior version.

## API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/policies | POST | Create policy draft. |
| /api/policies/{policyId}/versions/{version}/submit | POST | Submit for review. |
| /api/policies/{policyId}/versions/{version}/approve | POST | Approve policy version. |
| /api/policies/{policyId}/versions/{version}/activate | POST | Activate policy version. |
| /api/policies/{policyId}/versions/{version}/deprecate | POST | Deprecate policy version. |
| /api/policies/evaluate | POST | Evaluate applicable policies. |

## Testing Matrix

| Scenario | Expected Result |
|---|---|
| Activate second policy in same scope | Prior active policy is deprecated or activation is rejected by rule. |
| Approve without approver | Validation fails. |
| Evaluate policy context | PolicyEvaluationCompleted records version and outputs. |
| Rollback to unapproved version | Command is rejected. |
| Emergency activation | Post-deployment review requirement is recorded. |

## Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
