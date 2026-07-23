# Release Guide

## Version

v1.0.0

## Release Steps

1. Confirm working tree is clean.
2. Run `npm run validate:quick`.
3. Run `npm run validate:feature`.
4. Run `npm run validate:full`.
5. Run `npm run validate:visual-regression`.
6. Run `npm run validate:release`.
7. Review `release/release-checklist.md`.
8. Package static frontend assets for GitHub Pages.

## GitHub Pages Rules

- Use static HTML, CSS, JS, images, fonts, and manifest assets.
- Do not require backend services.
- Do not cache user data in the service worker.
- Keep IndexedDB data local to the browser.
