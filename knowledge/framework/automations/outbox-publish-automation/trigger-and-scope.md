# Outbox Publish Trigger and Scope

## Purpose
This split document isolates outbox publish automation triggers, message scope, and publish eligibility from the parent OutboxPublishAutomation specification.

## Source
- Parent specification: [OutboxPublishAutomation](../outbox-publish-automation.md)

## Trigger Scope
Triggers include scheduled outbox polling, domain event creation, retry due time, failed publish recovery, and manual replay requests.

## Eligibility
Eligibility preserves outbox status, message version, tenant scope, ordering key, retry window, idempotency key, and dead-letter policy.

