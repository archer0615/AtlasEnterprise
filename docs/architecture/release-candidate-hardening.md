# Release Candidate Hardening

## P0/P1 Closure

| Area | Priority |
| --- | --- |
| Knowledge validation | P0 |
| Feature validation | P0 |
| Simulator validation | P0 |
| Projection validation | P0 |
| Repository validation | P0 |
| Browser workflow validation | P0 |
| Backup/security validation | P0 |
| Visual validation | P1 |
| PWA/offline validation | P0 |
| Deployment validation | P0 |
| Release validation | P0 |

## Acceptance Matrix

- Functional.
- Data Integrity.
- Offline.
- Upgrade.
- Backup.
- Accessibility.
- Performance.
- Security.

## Hardening Sweep

- Dead code.
- Unused generated artifacts.
- Debug logs.
- Broken links.
- Archive policy lock.

## Release Documents

- Release notes.
- Known limitations.
- Upgrade notes.
- Recovery guide.
- Backup guide.

## Final Paths

Release candidate validation must cover fresh install, existing-user migration, offline use, update flow, restore flow, and GitHub Pages production path.

Atlas v1 must not require Server, Database, or Cloud runtime dependencies.
