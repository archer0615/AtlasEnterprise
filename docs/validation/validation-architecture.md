# Validation Architecture

## Purpose
Validation profiles provide deterministic, inspectable gates for local development, feature work, full repository validation, and release readiness.

## Profile Model
Profiles live in `scripts/validation-profiles.json`. Each profile references stable step IDs instead of shell chains.

## Quick Profile
Fast critical checks: package/frontend validation, runtime boundary validation, unit tests, repository contracts, projection, decision, knowledge, readiness, PWA static checks, and fixture basics. Visual and browser workflow checks are excluded.

## Feature Profile
Includes quick-level checks plus browser workflow, IndexedDB integration, backup/restore-oriented checks, PWA offline checks, fixture drift, and feature integration.

## Full Profile
Includes feature-level checks plus visual regression, deployment smoke, generated artifact drift, backup security, browser workflow, and broader repository readiness checks.

## Release Profile
Starts with release preflight, then runs full release governance gates. Release validation is read-only and must not push, tag, publish, modify versions, or update artifacts.

## Step Manifest
Each step declares `id`, `command`, `description`, `category`, `critical`, `timeout`, `environment`, `sideEffect`, and `platform`.

## Orchestrator
`scripts/run-validation-profile.mjs` resolves profiles, validates package scripts, executes steps sequentially, enforces timeouts, captures logs, classifies failures, detects side effects, and propagates exit codes.

## Failure Classification
Failures are classified as syntax, unit, integration, browser, visual regression, runtime boundary, generated artifact drift, PWA, repository governance, release gate, timeout, validation side effect, or unknown.

## Timeout Policy
Every step has an explicit timeout. Timeout failures are reported as `TIMEOUT` and terminate the current profile.

## Side Effect Guard
Profiles compare `git status --porcelain` before and after execution. Any changed tracked or untracked repository state outside ignored `.tmp/validation` fails the run as `VALIDATION_SIDE_EFFECT`.

## Visual Regression Policy
`validate:visual-regression` validates baseline drift only. Baseline updates require a separate explicit command and are not part of release validation.

## Browser Test Policy
Browser tests use headless Playwright, temporary server/profile resources, and must clean up processes and temp state.

## Cross-platform Policy
Profile steps declare platform support. Cross-platform Node scripts are preferred. Windows-only steps must not silently enter Linux release profiles.

## CI Mapping
Pull requests run `validate:feature`; master branch pushes run `validate:full`; manual release workflow runs `validate:release`.

## Release Gate
Release preflight validates HEAD, clean working tree when not dry-run, required files, package scripts, service worker asset paths, and manifest icon paths.

## Log Contract
Each profile writes `.tmp/validation/<timestamp>/summary.json`, `summary.md`, `environment.json`, and `steps/<step-id>.log`.

## Illegal Validation Behavior
Validation must not skip failing tests, hide timeouts, retry assertion failures, update baselines, change tracked files, commit, push, publish, or alter domain/runtime contracts.
