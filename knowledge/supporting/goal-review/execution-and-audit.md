# Goal Review Execution and Audit

## Purpose
This split document isolates Goal Review commands, state machine behavior, persistence, API, audit, and testing concerns from the parent Goal Review specification.

## Source
- Parent specification: [Goal Review](../goal-review.md)

## States
Goal Review states include Draft, Scheduled, InProgress, Completed, Approved, Rejected, Archived, Restored, and Deleted.

## Commands
- CreateReview
- UpdateReview
- StartReview
- CompleteReview
- ApproveReview
- RejectReview
- ArchiveReview
- RestoreReview
- DeleteReview

## Domain Events
- ReviewCreated
- ReviewStarted
- ReviewCompleted
- ReviewApproved
- ReviewRejected
- ReviewArchived
- ReviewUpdated

## Audit
Review history, review trail, and versioning must record operator, source, timestamp, reason, prior state, next state, and correlation identifier.

## Testing
Testing covers unit, integration, validation, performance, state transition, API, repository, audit, cache, security, and edge-case behavior.

