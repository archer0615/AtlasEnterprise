# Inbox Process Execution

## Purpose
This split document isolates inbox process execution, handler dispatch, status update, and retry behavior from the parent InboxProcessAutomation specification.

## Source
- Parent specification: [InboxProcessAutomation](../inbox-process-automation.md)

## Execution
Execution selects pending messages, validates compatibility, dispatches handlers, updates status, increments retry state, records audit, and routes failed messages to retry or dead-letter handling.

