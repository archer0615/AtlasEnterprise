# Outbox Publish Execution

## Purpose
This split document isolates outbox publish execution, message dispatch, status update, and retry behavior from the parent OutboxPublishAutomation specification.

## Source
- Parent specification: [OutboxPublishAutomation](../outbox-publish-automation.md)

## Execution
Execution selects pending messages, respects ordering, publishes to the message bus, updates status, increments retry state, records audit, and routes failed messages to retry or dead-letter handling.

