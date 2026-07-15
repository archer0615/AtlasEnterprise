# PWA Overview

Atlas v1 is an installable, offline-capable, single-user, local-first web application. The PWA shell is the primary runtime surface for browsing generated knowledge, reviewing local financial context, comparing scenarios, and preserving user-owned data on the device.

## Required Capabilities

- Installability
- Offline application shell
- Offline Domain and Engine execution
- IndexedDB persistence
- Encrypted backup and restore
- Schema migration
- Update notification
- GitHub Pages deployment
- Browser compatibility diagnostics

## Architecture Direction

- Source knowledge remains in `knowledge/**/*.md`.
- Static runtime knowledge is generated into the frontend during build.
- Core user flows must start without a backend service.
- Local financial data must remain separate from generated static knowledge assets.

## Unsupported in v1

Cloud sync, multi-user collaboration, server notifications, secret API integrations, and server-side scheduled jobs are outside the v1 PWA scope.
