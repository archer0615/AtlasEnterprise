# Outbox Publish Governance and Testing

## Purpose
This split document isolates outbox publish governance, validation, audit, retry, dead-letter handling, testing, and edge cases from the parent OutboxPublishAutomation specification.

## Source
- Parent specification: [OutboxPublishAutomation](../outbox-publish-automation.md)

## Governance
Governance covers idempotency, ordering, duplicate prevention, retry limits, dead-letter rules, audit, replay control, and message compatibility.

## Testing
Testing covers message selection, publish success, publish failure, retry, ordering, idempotency, dead-letter, replay, audit, and edge cases.

