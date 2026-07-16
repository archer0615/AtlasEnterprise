# Backup Execution

## Purpose
This split document isolates backup execution, verification, storage, and restore metadata behavior from the parent BackupAutomation specification.

## Source
- Parent specification: [BackupAutomation](../backup-automation.md)

## Execution
Execution creates backup snapshot, validates integrity, stores metadata, applies retention policy, emits audit records, and reports backup status.

