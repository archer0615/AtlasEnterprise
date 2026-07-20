# Visual Artifacts

## Purpose

This document records generated visual validation artifacts that do not require a browser automation dependency.

## Current Artifact

- [PWA visual fixture report](visual-artifacts/pwa-visual-fixture-report.html)
- `visual-artifacts/playwright-desktop-dashboard.png`
- `visual-artifacts/playwright-mobile-dashboard.png`
- `visual-artifacts/visual-baselines.json`

## Baseline Policy

- Playwright baselines are captured from the local static frontend shell.
- `visual-baselines.json` records viewport, rendered PNG dimensions, and SHA-256 for each screenshot.
- Local validation compares current screenshots against the checked-in PNG baselines with a 0.35 pixel-drift threshold.
- CI keeps screenshot generation and size validation while skipping local pixel-drift comparison to avoid OS renderer noise.

## Commands

- `npm run report:visual`
- `npm run visual:screenshots`
- `npm run validate:visual-regression`
- `npm run validate:frontend`
- `npm run validate`

## Follow-up

- Keep generated artifacts small and reviewable.
- Refresh baselines only after an intentional UI change and a passing visual regression run.
