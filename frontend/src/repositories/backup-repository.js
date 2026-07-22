export const backupRepositoryContract = Object.freeze({
  requiredOperations: ["exportPlain", "exportEncrypted", "dryRunImport", "restore"],
  input: "Backup payload, optional passphrase, and explicit conflict policy.",
  output: "Minimized backup data, dry-run plan, or restore audit report.",
  errors: "Atlas backup or persistence errors without passphrases, keys, or raw payloads.",
});
