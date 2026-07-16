# Permission Integration Boundaries

## Purpose
This split document groups how the Permission Framework applies across Atlas execution boundaries, including APIs, UI, application services, domain services, repositories, commands, events, workflows, scheduler jobs, automation actions, background jobs, notifications, audit, and integrations.

## Source
- Parent specification: [Permission Framework](../permission-framework.md)

## Protected Boundaries
- Permission Framework applies to every protected Atlas resource, operation, API, command, repository method, workflow step, scheduler job, automation action, background job, message contract, notification action, and audit-visible authorization decision.
- Protected resources include Dashboard, Goal, Asset, Liability, Scenario, Decision, Policy, Configuration, Report, and Administration.
- Protected operations include Create, Read, Update, Delete, Execute, Approve, Export, Share, and Restore.

## Service and Data Access
- Application Services, Domain Services, Repositories, Commands, Domain Events, Workflows, Automation, Scheduler, Background Jobs, APIs, UI, Notification, Audit, and Integration consume permission decisions.
- Repository and command access must preserve resource ownership, operation sensitivity, tenant membership, household membership, explicit deny, explicit allow, and default deny.
- Domain events and message contracts must avoid exposing protected data without the required resource and operation permission.

## UI, API, and Notification
- UI actions must request required permissions before protected operation rendering.
- APIs must map endpoints to permissions and preserve authentication, authorization, audit, and observability.
- Notification actions must avoid exposing protected resource data without the required permission.

