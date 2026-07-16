# Notification Dispatch Execution

## Purpose
This split document isolates notification dispatch execution, provider calls, retry behavior, and status updates from the parent NotificationDispatchAutomation specification.

## Source
- Parent specification: [NotificationDispatchAutomation](../notification-dispatch-automation.md)

## Execution
Execution selects recipients, applies preferences and permissions, formats payloads, invokes providers, records delivery status, schedules retry, and updates notification projections.

