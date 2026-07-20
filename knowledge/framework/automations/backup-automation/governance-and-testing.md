# Backup Governance and Testing

## Purpose
This split document isolates backup governance, security, audit, retention, restore verification, testing, and edge cases from the parent BackupAutomation specification.

## Source
- Parent specification: [BackupAutomation](../backup-automation.md)

## Governance
Governance covers encryption, access control, retention, restore readiness, audit, storage protection, and failure recovery.

## Backup Access Permission Audit
Backup access permission audit verifies that backup export, encrypted export, restore, delete, and evidence archive operations are limited to `backup-admin` and `compliance-auditor` roles with MFA enabled. Any unapproved role, missing MFA state, or unknown backup operation fails the audit and must be recorded as `atlas-enterprise.backup-access-permission-audit.v1` evidence.

## Backup Deletion Protection Validation
Backup deletion protection validation treats backup delete, purge, and retention prune as protected operations. Protected deletion is blocked unless two unique approvals are present, legal hold is clear, and the latest integrity audit passed. The validation report uses `atlas-enterprise.backup-deletion-protection-validation.v1` so unsafe deletion attempts remain auditable.

## Backup Compliance Evidence Archiving
Backup compliance evidence archiving seals access permission audit, deletion protection validation, integrity audit, retention policy, and restore audit evidence into an immutable archive with a seven-year retention expectation. Missing evidence or a mutable archive marks `atlas-enterprise.backup-compliance-evidence-archive.v1` incomplete.

## Testing
Testing covers backup creation, integrity validation, retention, restore metadata, permission checks, failure recovery, and edge cases.
