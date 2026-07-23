# Known Limitations

- Runtime is local-only and does not sync across devices.
- Notifications are local records only and do not send email, SMS, push, or cloud messages.
- Scheduler is on-demand and does not run as a background service.
- Automation generates notifications and review items only; it does not execute financial transactions.
- IndexedDB data is browser local and must be exported through backup for portability.
- Multi-user collaboration is outside the v1.0.0 scope.
