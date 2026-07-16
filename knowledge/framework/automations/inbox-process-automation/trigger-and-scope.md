# Inbox Process Trigger and Scope

## Purpose
This split document isolates inbox processing triggers, message scope, and processing eligibility from the parent InboxProcessAutomation specification.

## Source
- Parent specification: [InboxProcessAutomation](../inbox-process-automation.md)

## Trigger Scope
Triggers include scheduled inbox polling, message arrival, retry due time, failed processing recovery, and manual replay requests.

## Eligibility
Eligibility preserves inbox status, message version, tenant scope, ordering key, retry window, idempotency key, and dead-letter policy.

