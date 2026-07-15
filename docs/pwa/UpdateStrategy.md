# PWA Update Strategy

The update strategy coordinates application shell changes, generated knowledge artifacts, service worker activation, and local data migrations.

## Runtime Rules

- Each deployment has an application build version.
- The service worker detects a waiting version.
- The UI shows a non-blocking update notice.
- Unsaved edits prevent immediate reload.
- Database migration executes after application update and before normal use.
- Failed migration enters recovery mode.
- Release notes identify schema and calculation changes.
- Formula and rule version changes invalidate only affected cached calculation results.

## User Experience

Updates should not interrupt active editing or scenario comparison. The application may announce that a new version is available, but activation should wait until the user reaches a safe point or confirms reload.

## Validation

- Confirm a newly installed service worker can wait without breaking the active shell.
- Confirm reload activates the new shell and generated knowledge version together.
- Confirm unsaved local edits block immediate reload.
- Confirm failed migrations route to recovery mode with export guidance.
