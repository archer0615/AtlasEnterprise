# Notification Identity and Delivery

## Purpose
This split document isolates Notification identity, properties, delivery lifecycle, state machine, validation, and business rules from the parent Notification Entity Specification.

## Source
- Parent specification: [Notification Entity Specification](../Notification.md)

## Identity
Notification represents a user-visible or system-generated message with type, category, priority, severity, channel, references, status, scheduling, delivery, read, acknowledgement, retry, provider, template, and audit fields.

## Delivery
Delivery behavior covers scheduled, sent, delivered, read, acknowledged, expired, retry, archived, and deleted states.

