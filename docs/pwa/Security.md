# PWA Security Specification

## Threat Model

Primary risks: shared device access, XSS, malicious imports, repository secret leakage, browser data clearing, compromised dependencies, and unencrypted backups.

## Controls

- Strict Content Security Policy.
- No inline scripts unless hashed.
- Dependency lockfile and automated audit.
- Zod validation for all imported data.
- Web Crypto encryption for backups.
- No API keys or credentials in client code.
- No personal data in logs, analytics, or Git.
- Optional application lock is convenience protection, not equivalent to server authentication.
- Sensitive values are masked in screenshots and exported diagnostics.
