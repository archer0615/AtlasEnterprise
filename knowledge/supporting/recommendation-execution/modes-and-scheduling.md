# Recommendation Execution Modes and Scheduling

## Purpose
This split document isolates execution modes, scheduling behavior, resource checks, progress tracking, verification, and completion from the parent Recommendation Execution specification.

## Source
- Parent specification: [Recommendation Execution Overview](../recommendation-execution.md)

## Execution Modes
Recommendation Execution supports manual, automatic, scheduled, event-driven, workflow-driven, batch, parallel, incremental, simulation, dry-run, and emergency execution modes. Mode selection must preserve existing Recommendation ownership and must not imply that execution owns Recommendation content.

## Scheduling
Scheduling uses business calendar resolution, dependency checks, resource checks, approval state, priority, timeout policy, and execution window constraints. Scheduled execution must remain reproducible and auditable with request time, scheduled time, actor, reason, and correlation identifier.

## Dispatch and Progress
Task dispatch follows the generated execution plan and records execution status, progress, health, metrics, errors, warnings, KPIs, forecast, timeline, and logs. Progress tracking must not mutate Goal, Decision, Portfolio, CashFlow, Scenario, Risk, Optimization, Simulation, Workflow, Automation, or Notification state unless the owning domain command is invoked.

## Verification and Completion
Verification confirms expected execution evidence, validation results, completion criteria, and result records. Completion records outcome, execution evidence, status transition, audit information, and any linked Recommendation or Decision execution references.

## Dry Run and Simulation
Dry-run and simulation modes validate feasibility and expected impact without committing execution side effects. Their outputs remain execution evidence and do not replace Recommendation Evaluation or Scenario ownership.
