# PWA Update Strategy

- Each deployment has an application build version.
- The service worker detects a waiting version.
- The UI shows a non-blocking update notice.
- Unsaved edits prevent immediate reload.
- Database migration executes after application update and before normal use.
- Failed migration enters recovery mode.
- Release notes identify schema and calculation changes.
- Formula and rule version changes invalidate only affected cached calculation results.
