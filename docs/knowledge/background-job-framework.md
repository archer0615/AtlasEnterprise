# Background Job Framework

Job Categories
- Import
- Calculation
- Notification
- Cleanup
- Backup
- Reporting
- Synchronization

Lifecycle
Queued
→ Running
→ Succeeded
→ Failed
→ Retrying
→ Cancelled

Requirements
- Idempotent
- Observable
- Retry policy
- Dead-letter handling
- Audit logging
