# Backup and Restore Specification

## Export

- Serialize a consistent snapshot.
- Include schema and application versions.
- Validate before encryption.
- Encrypt using Web Crypto AES-GCM.
- Derive the key using PBKDF2 or an approved modern KDF available in the target browsers.
- Generate a checksum for the encrypted envelope.
- Never store the passphrase.

## Import

- Treat the file as untrusted.
- Validate envelope, checksum, size, schema, and record shapes.
- Decrypt in memory.
- Migrate in staging.
- Present a summary before replacing or merging.
- Commit atomically.
- Produce an import audit entry.

## Recovery

Support replace, validated merge where safe, and cancel. Automatic merge is forbidden for conflicting aggregate versions.
