# Mortgage Persistence and API

## Purpose
This split document isolates Mortgage commands, events, repository, services, REST API, DTO, database mapping, PostgreSQL DDL, EF Core mapping, and cache strategy from the parent Mortgage Entity Specification.

## Source
- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Commands and Events
Mortgage commands and events must align with Loan aggregate ownership and preserve payment, refinance, close, archive, restore, and replay behavior.

## API
Mortgage API behavior is exposed through loan-aligned routes and must preserve permissions, idempotency, error handling, and audit evidence.

## Persistence
Persistence includes mortgage or loan-backed tables, repository query methods, EF Core mapping, amortization cache invalidation, and consistency verification.

