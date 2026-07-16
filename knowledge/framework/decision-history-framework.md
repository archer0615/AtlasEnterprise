# Decision History Framework

Version: 1.0

## Split Navigation
- [Decision history records and versions](decision-history/records-and-versioning.md)
- [Decision history outcomes and analytics](decision-history/outcomes-and-analytics.md)

## Purpose
Defines how Project Atlas records, versions, and analyzes the complete lifecycle of financial decisions after they have been generated. Unlike the Decision Audit Framework, which focuses on reproducibility and traceability, this framework focuses on decision evolution and outcome tracking.

## Objectives
- Preserve historical decisions.
- Track recommendation evolution.
- Measure decision effectiveness.
- Support continuous improvement.

## Scope
Applies to:
- Decision Engine
- Recommendation Engine
- Scenario Engine
- House Decision Engine
- Loan Engine
- Investment Engine
- Retirement Engine

## Core Principles
- History is immutable.
- Every decision has a persistent Decision ID.
- Every revision creates a new Decision Version.
- User actions are recorded independently.

## Decision Lifecycle
Draft
→ Generated
→ Presented
→ User Reviewed
→ Accepted / Rejected / Deferred
→ Executed
→ Outcome Measured
→ Archived

## History Record

Detailed history record and versioning rules are maintained in [Decision history records and versions](decision-history/records-and-versioning.md).
Each record contains:
- Decision ID
- Version
- Parent Version
- Timestamp
- User / Household
- Decision Type
- Scenario ID
- Recommendation ID
- Status

## Versioning
Each version stores:
- Changed assumptions
- Changed inputs
- Rule differences
- Metric differences
- Recommendation changes

## User Actions
Supported actions:
- View
- Accept
- Reject
- Dismiss
- Snooze
- Execute
- Undo
- Add Notes

## Outcome Tracking

Detailed outcome tracking, analytics, and KPI rules are maintained in [Decision history outcomes and analytics](decision-history/outcomes-and-analytics.md).
Track:
- Expected outcome
- Actual outcome
- Variance
- Completion date
- Success status

## Business Rules
- Historical versions are immutable.
- Accepted decisions remain linked to execution records.
- Deleted decisions are never physically removed.
- Major financial events create new decision versions.

## Explainability
Every history entry provides:
- Previous recommendation
- New recommendation
- Reason for change
- Triggering events
- KPI deltas

## Integration
Consumes:
- Decision Audit Framework
- Recommendation Priority Framework
- Decision Metrics Framework
- Financial Projection Framework

Produces:
- Decision Timeline
- Dashboard
- Executive Reports
- Analytics

## KPIs
- Decision Acceptance Rate
- Decision Execution Rate
- Recommendation Stability
- Decision Accuracy
- Average Time to Decision
- Outcome Success Rate

## Analytics
- Recommendation evolution
- User behavior trends
- Rule effectiveness
- Decision reversal frequency
- Scenario adoption

## Testing
- Multiple revisions
- User rejection
- Accepted then executed
- Outcome mismatch
- Historical replay
- Concurrent updates

## Future Enhancements
- AI recommendation learning
- Household decision timelines
- Decision knowledge graph
- Cross-device synchronization
