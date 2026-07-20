const databaseName = "atlas-pwa-runtime";
const databaseVersion = 3;
const backupSchemaVersion = "atlas-pwa-runtime-backup.v1";
const encryptedBackupFormatVersion = "atlas-pwa-runtime-encrypted-backup.v1";
const keyRotationFormatVersion = "atlas-enterprise.backup-key-rotation-report.v1";
const disasterRecoveryDrillFormatVersion = "atlas-enterprise.backup-disaster-recovery-drill.v1";
const restoreAuditReportFormatVersion = "atlas-enterprise.restore-audit-report.v1";
const backupScheduleHealthFormatVersion = "atlas-enterprise.backup-schedule-health-report.v1";
const backupOffsiteCopyFormatVersion = "atlas-enterprise.backup-offsite-copy-report.v1";
const backupRtoFormatVersion = "atlas-enterprise.backup-rto-report.v1";
const backupCapacityGrowthFormatVersion = "atlas-enterprise.backup-capacity-growth-report.v1";
const backupFailureAlertFormatVersion = "atlas-enterprise.backup-failure-alert-report.v1";
const backupIntegrityAuditFormatVersion = "atlas-enterprise.backup-integrity-periodic-audit.v1";
const backupAccessPermissionAuditFormatVersion = "atlas-enterprise.backup-access-permission-audit.v1";
const backupDeletionProtectionValidationFormatVersion = "atlas-enterprise.backup-deletion-protection-validation.v1";
const backupComplianceEvidenceArchiveFormatVersion = "atlas-enterprise.backup-compliance-evidence-archive.v1";
const backupSchedulePolicy = {
  schema: "atlas-enterprise.backup-schedule-policy.v1",
  intervalHours: 24,
  warningAfterHours: 30,
  failureAfterHours: 48,
};
const backupRtoPolicy = {
  schema: "atlas-enterprise.backup-rto-policy.v1",
  targetMs: 5000,
};
const backupCapacityPolicy = {
  schema: "atlas-enterprise.backup-capacity-policy.v1",
  warningGrowthRatio: 0.25,
  failureGrowthRatio: 0.5,
};
const backupFailureAlertPolicy = {
  schema: "atlas-enterprise.backup-failure-alert-policy.v1",
  alertAfterConsecutiveFailures: 1,
};
const backupAccessPermissionPolicy = {
  schema: "atlas-enterprise.backup-access-permission-policy.v1",
  allowedRoles: ["backup-admin", "compliance-auditor"],
  exportOperations: ["backup-export", "backup-encrypted-export", "backup-restore", "backup-delete", "backup-evidence-archive"],
  requireMfa: true,
};
const backupDeletionProtectionPolicy = {
  schema: "atlas-enterprise.backup-deletion-protection-policy.v1",
  protectedOperations: ["backup-delete", "backup-purge", "backup-retention-prune"],
  requiredApprovals: 2,
  requireLegalHoldCheck: true,
  requireRecentIntegrityAudit: true,
};
const backupComplianceEvidencePolicy = {
  schema: "atlas-enterprise.backup-compliance-evidence-policy.v1",
  requiredEvidenceTypes: ["access-permission-audit", "deletion-protection-validation", "integrity-audit", "retention-policy", "restore-audit"],
  archiveRetentionYears: 7,
  immutableArchiveRequired: true,
};
const supportedBackupDatabaseVersions = [2, databaseVersion];
const backupRetentionPolicy = {
  schema: "atlas-enterprise.backup-retention-policy.v1",
  auditRetentionDays: 90,
  retainedAuditActions: ["backup-restore", "scenario-delete", "offline-repair"],
};
const backupSensitiveFieldNames = new Set([
  "passphrase",
  "password",
  "secret",
  "token",
  "credential",
  "authorization",
  "email",
  "phone",
  "address",
  "nationalId",
  "taxId",
]);
const migrationRecordKey = "schema";
const migrationLockKey = "migration-lock";
const coordinationChannelName = "atlas-pwa-runtime-coordination";
const lockTimeoutMs = 30000;
const runtimeTabId = `tab-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const stores = {
  metadata: "metadata",
  recommendationDecisions: "recommendationDecisions",
  scenarios: "scenarios",
  settings: "settings",
  auditEntries: "auditEntries",
};
const backupRecordFieldAllowlist = {
  [stores.scenarios]: ["scenarioId", "name", "score", "status", "sourceSnapshotId", "aggregateVersion", "updatedAt", "savedAt"],
  [stores.recommendationDecisions]: ["decisionId", "decision", "fixtureId", "snapshotId", "status", "score", "decidedAt"],
  [stores.settings]: ["key", "value"],
  [stores.auditEntries]: ["auditId", "action", "recordedAt", "schema", "payload"],
};

let databasePromise;
const coordinationChannel = "BroadcastChannel" in window ? new BroadcastChannel(coordinationChannelName) : null;

function publishCoordinationMessage(message) {
  const payload = { tabId: runtimeTabId, occurredAt: new Date().toISOString(), ...message };
  coordinationChannel?.postMessage(payload);
  return payload;
}

function isExpiredLock(lock) {
  return !lock?.acquiredAt || Date.now() - Date.parse(lock.acquiredAt) > lockTimeoutMs;
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function backupPayload(backup) {
  return {
    schema: backup?.schema,
    databaseVersion: backup?.databaseVersion,
    retentionPolicy: backup?.retentionPolicy,
    scenarios: backup?.scenarios || [],
    recommendationDecisions: backup?.recommendationDecisions || [],
    settings: backup?.settings || [],
    auditEntries: backup?.auditEntries || [],
  };
}

function isBackupSensitiveField(key) {
  const normalized = String(key || "").replace(/[-_\s]/g, "").toLowerCase();
  return [...backupSensitiveFieldNames].some((field) => normalized === field.toLowerCase() || normalized.endsWith(field.toLowerCase()));
}

function maskBackupSensitiveFields(value) {
  if (Array.isArray(value)) {
    return value.map((item) => maskBackupSensitiveFields(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, fieldValue]) => [
      key,
      isBackupSensitiveField(key) ? "[MASKED]" : maskBackupSensitiveFields(fieldValue),
    ]));
  }
  return value;
}

function minimizeBackupData(backup) {
  const allowedBackupFields = ["schema", "exportedAt", "databaseVersion", "retentionPolicy", "scenarios", "recommendationDecisions", "settings", "auditEntries"];
  const minimized = Object.fromEntries(allowedBackupFields.filter((field) => backup[field] !== undefined).map((field) => [field, backup[field]]));
  minimized.scenarios = minimizeBackupRecords(stores.scenarios, minimized.scenarios || []);
  minimized.recommendationDecisions = minimizeBackupRecords(stores.recommendationDecisions, minimized.recommendationDecisions || []);
  minimized.settings = minimizeBackupRecords(stores.settings, minimized.settings || []);
  minimized.auditEntries = minimizeBackupRecords(stores.auditEntries, minimized.auditEntries || []);
  return minimized;
}

function minimizeBackupRecords(storeName, records) {
  const allowlist = backupRecordFieldAllowlist[storeName] || [];
  return records.map((record) => Object.fromEntries(allowlist.filter((field) => record?.[field] !== undefined).map((field) => [field, record[field]])));
}

function validateBackupRetentionPolicy(backup, now = new Date()) {
  const cutoff = new Date(now.getTime() - backupRetentionPolicy.auditRetentionDays * 24 * 60 * 60 * 1000);
  const retainedActions = new Set(backupRetentionPolicy.retainedAuditActions);
  const retainedAuditEntries = (backup.auditEntries || []).filter((entry) => {
    const recordedAt = Date.parse(entry?.recordedAt || "");
    return retainedActions.has(entry?.action) || (!Number.isNaN(recordedAt) && recordedAt >= cutoff.getTime());
  });
  return {
    ...backup,
    retentionPolicy: backupRetentionPolicy,
    auditEntries: retainedAuditEntries,
  };
}

function prepareBackupForExport(backup) {
  return validateBackupRetentionPolicy(maskBackupSensitiveFields(minimizeBackupData(backup)));
}

function toBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function deriveBackupKey(passphrase, salt, iterations) {
  if (!passphrase || passphrase.length < 8) {
    throw new Error("Backup passphrase must be at least 8 characters");
  }
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(stores.metadata)) {
        database.createObjectStore(stores.metadata, { keyPath: "key" });
      }
      if (!database.objectStoreNames.contains(stores.scenarios)) {
        database.createObjectStore(stores.scenarios, { keyPath: "scenarioId" });
      }
      if (!database.objectStoreNames.contains(stores.recommendationDecisions)) {
        database.createObjectStore(stores.recommendationDecisions, { keyPath: "decisionId" });
      }
      if (!database.objectStoreNames.contains(stores.settings)) {
        database.createObjectStore(stores.settings, { keyPath: "key" });
      }
      if (!database.objectStoreNames.contains(stores.auditEntries)) {
        database.createObjectStore(stores.auditEntries, { keyPath: "auditId" });
      }
    };

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

  return databasePromise;
}

async function withStore(storeName, mode, action) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = action(store);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function getAll(storeName) {
  return withStore(storeName, "readonly", (store) => store.getAll());
}

export const indexedDbSettingsRepository = {
  async get(key) {
    const record = await withStore(stores.settings, "readonly", (store) => store.get(key));
    return record?.value || "";
  },

  async set(key, value) {
    await withStore(stores.settings, "readwrite", (store) => store.put({ key, value }));
  },
};

export const indexedDbMigrationRepository = {
  async current() {
    const record = await withStore(stores.metadata, "readonly", (store) => store.get(migrationRecordKey));
    return record?.value || { databaseVersion: 0, backupSchemaVersion: "" };
  },

  async markCurrent() {
    const value = {
      databaseVersion,
      backupSchemaVersion,
      migratedAt: new Date().toISOString(),
    };
    await withStore(stores.metadata, "readwrite", (store) => store.put({ key: migrationRecordKey, value }));
    return value;
  },

  async acquireLock(reason = "migration") {
    const currentLock = await withStore(stores.metadata, "readonly", (store) => store.get(migrationLockKey));
    if (currentLock?.value && currentLock.value.ownerTabId !== runtimeTabId && !isExpiredLock(currentLock.value)) {
      throw new Error("Another Atlas tab is already changing local data");
    }
    const value = {
      ownerTabId: runtimeTabId,
      reason,
      databaseVersion,
      targetDatabaseVersion: databaseVersion,
      acquiredAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + lockTimeoutMs).toISOString(),
    };
    await withStore(stores.metadata, "readwrite", (store) => store.put({ key: migrationLockKey, value }));
    publishCoordinationMessage({ messageType: "lock-acquired", recordType: "metadata", recordId: migrationLockKey, targetVersion: databaseVersion, reason });
    return value;
  },

  async releaseLock(reason = "migration") {
    const currentLock = await withStore(stores.metadata, "readonly", (store) => store.get(migrationLockKey));
    if (currentLock?.value?.ownerTabId === runtimeTabId || isExpiredLock(currentLock?.value)) {
      await withStore(stores.metadata, "readwrite", (store) => store.delete(migrationLockKey));
      publishCoordinationMessage({ messageType: "lock-released", recordType: "metadata", recordId: migrationLockKey, baseVersion: databaseVersion, reason });
    }
  },
};

export const indexedDbScenarioRepository = {
  async list() {
    return getAll(stores.scenarios);
  },

  async save(scenario) {
    await this.saveWithVersionCheck(scenario, scenario.baseVersion ?? scenario.aggregateVersion ?? 0);
  },

  async saveWithVersionCheck(scenario, baseVersion = 0) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      const getRequest = store.get(scenario.scenarioId);

      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        const current = getRequest.result;
        const currentVersion = current?.aggregateVersion || 0;
        if (current && currentVersion !== baseVersion) {
          reject(new Error("Scenario version conflict"));
          transaction.abort();
          return;
        }
        const nextVersion = currentVersion + 1;
        const now = new Date().toISOString();
        const record = {
          ...scenario,
          aggregateVersion: nextVersion,
          updatedAt: now,
          savedAt: scenario.savedAt || now,
        };
        delete record.baseVersion;
        store.put(record);
        publishCoordinationMessage({ messageType: "scenario-saved", recordType: "scenario", recordId: record.scenarioId, baseVersion, targetVersion: nextVersion });
      };
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },

  async delete(scenarioId) {
    await withStore(stores.scenarios, "readwrite", (store) => store.delete(scenarioId));
  },

  async clear() {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      store.clear();
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },

  async replaceAll(scenarios) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      store.clear();
      for (const scenario of scenarios) {
        store.put(scenario);
      }
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },

  async replaceAllStaged(scenarios) {
    const stagedRecords = scenarios.map((scenario) => ({
      ...scenario,
      aggregateVersion: scenario.aggregateVersion || 1,
      updatedAt: scenario.updatedAt || new Date().toISOString(),
      savedAt: scenario.savedAt || scenario.updatedAt || new Date().toISOString(),
    }));
    const stagedIds = new Set();
    for (const record of stagedRecords) {
      if (!record.scenarioId || stagedIds.has(record.scenarioId)) {
        throw new Error("Scenario staging validation failed");
      }
      stagedIds.add(record.scenarioId);
    }
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      store.clear();
      for (const record of stagedRecords) {
        store.put(record);
      }
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve({ staged: stagedRecords.length, committed: stagedRecords.length, rejected: 0 });
    });
  },
};

export const indexedDbRecommendationDecisionRepository = {
  async list() {
    return getAll(stores.recommendationDecisions);
  },

  async save(decision) {
    await withStore(stores.recommendationDecisions, "readwrite", (store) => store.put(decision));
  },

  async clear() {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.recommendationDecisions, "readwrite");
      const store = transaction.objectStore(stores.recommendationDecisions);
      store.clear();
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },
};

export const indexedDbAuditRepository = {
  async list() {
    return getAll(stores.auditEntries);
  },

  async save(entry) {
    await withStore(stores.auditEntries, "readwrite", (store) => store.put(entry));
  },

  async clear() {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.auditEntries, "readwrite");
      const store = transaction.objectStore(stores.auditEntries);
      store.clear();
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },
};

export const indexedDbBackupRepository = {
  async exportBackup() {
    await indexedDbMigrationRepository.markCurrent();
    const backup = prepareBackupForExport({
      schema: backupSchemaVersion,
      exportedAt: new Date().toISOString(),
      databaseVersion,
      scenarios: await indexedDbScenarioRepository.list(),
      recommendationDecisions: await indexedDbRecommendationDecisionRepository.list(),
      settings: await getAll(stores.settings),
      auditEntries: await indexedDbAuditRepository.list(),
    });
    backup.checksum = await sha256Hex(stableStringify(backupPayload(backup)));
    return backup;
  },

  async exportEncryptedBackup(passphrase) {
    const backup = await this.exportBackup();
    return this.exportEncryptedBackupForPayload(backup, passphrase);
  },

  async decryptEncryptedBackup(envelope, passphrase) {
    if (envelope?.backupFormatVersion !== encryptedBackupFormatVersion || envelope.payloadEncoding !== "base64") {
      throw new Error("Unsupported encrypted backup format");
    }
    const salt = fromBase64(envelope.kdf?.salt || "");
    const iv = fromBase64(envelope.encryption?.iv || "");
    const encryptedPayload = fromBase64(envelope.encryptedPayload || "");
    const key = await deriveBackupKey(passphrase, salt, envelope.kdf?.iterations || 0);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedPayload);
    const payloadText = new TextDecoder().decode(decrypted);
    if (await sha256Hex(payloadText) !== envelope.checksum) {
      throw new Error("Encrypted backup checksum mismatch");
    }
    const backup = JSON.parse(payloadText);
    if (!await this.validateBackup(backup)) {
      throw new Error("Encrypted backup payload is invalid");
    }
    return backup;
  },

  async rotateEncryptedBackupKey(envelope, currentPassphrase, nextPassphrase) {
    const backup = await this.decryptEncryptedBackup(envelope, currentPassphrase);
    const rotatedEnvelope = await this.exportEncryptedBackupForPayload(backup, nextPassphrase);
    return {
      envelope: rotatedEnvelope,
      report: {
        schema: keyRotationFormatVersion,
        rotatedAt: new Date().toISOString(),
        sourceBackupFormatVersion: envelope.backupFormatVersion,
        targetBackupFormatVersion: rotatedEnvelope.backupFormatVersion,
        databaseSchemaVersion: rotatedEnvelope.databaseSchemaVersion,
        payloadChecksumPreserved: envelope.checksum === rotatedEnvelope.checksum,
        kdfChanged: envelope.kdf?.salt !== rotatedEnvelope.kdf?.salt || envelope.kdf?.iterations !== rotatedEnvelope.kdf?.iterations,
        encryptionIvChanged: envelope.encryption?.iv !== rotatedEnvelope.encryption?.iv,
      },
    };
  },

  async exportEncryptedBackupForPayload(backup, passphrase) {
    if (!await this.validateBackup(backup)) {
      throw new Error("Unsupported backup schema");
    }
    const payload = stableStringify(backup);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const iterations = 120000;
    const key = await deriveBackupKey(passphrase, salt, iterations);
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(payload));
    return {
      backupFormatVersion: encryptedBackupFormatVersion,
      applicationVersion: "atlas-enterprise-pwa.v1",
      databaseSchemaVersion: backup.databaseVersion || databaseVersion,
      exportTimestamp: backup.exportedAt || new Date().toISOString(),
      payloadEncoding: "base64",
      kdf: { name: "PBKDF2", hash: "SHA-256", iterations, salt: toBase64(salt) },
      encryption: { name: "AES-GCM", iv: toBase64(iv), tagLength: 128 },
      checksum: await sha256Hex(payload),
      encryptedPayload: toBase64(encrypted),
    };
  },

  async runDisasterRecoveryDrill(backup) {
    if (!await this.validateBackup(backup)) {
      throw new Error("Unsupported backup schema");
    }
    const before = {
      scenarios: (await indexedDbScenarioRepository.list()).length,
      recommendationDecisions: (await indexedDbRecommendationDecisionRepository.list()).length,
      settings: (await getAll(stores.settings)).length,
      auditEntries: (await indexedDbAuditRepository.list()).length,
    };
    const dryRun = await this.dryRunImport(backup);
    const after = {
      scenarios: (await indexedDbScenarioRepository.list()).length,
      recommendationDecisions: (await indexedDbRecommendationDecisionRepository.list()).length,
      settings: (await getAll(stores.settings)).length,
      auditEntries: (await indexedDbAuditRepository.list()).length,
    };
    const mutationFree = stableStringify(before) === stableStringify(after);
    return {
      schema: disasterRecoveryDrillFormatVersion,
      drilledAt: new Date().toISOString(),
      sourceBackupFormatVersion: backup.schema,
      sourceDatabaseSchemaVersion: backup.databaseVersion || 0,
      targetDatabaseSchemaVersion: databaseVersion,
      checksum: backup.checksum || "N/A",
      mutationFree,
      dryRun,
      readiness: mutationFree && dryRun.migrationPlan?.supported !== false && dryRun.rejects === 0 ? "ready" : "blocked",
      storeCountsBefore: before,
      storeCountsAfter: after,
    };
  },

  validateRestoreAuditReport(report) {
    if (report?.schema !== restoreAuditReportFormatVersion) return false;
    if (!report.restoredAt || Number.isNaN(Date.parse(report.restoredAt))) return false;
    if (!["replace-all", "skip-existing"].includes(report.conflictPolicy)) return false;
    if (!Number.isFinite(report.scenarioCount) || report.scenarioCount < 0) return false;
    if (!report.restoredRecords || typeof report.restoredRecords !== "object") return false;
    return [stores.scenarios, stores.recommendationDecisions, stores.settings, stores.auditEntries]
      .every((storeName) => Number.isFinite(report.restoredRecords[storeName] || 0));
  },

  validateBackupScheduleHealth(lastBackupMetadata, now = new Date()) {
    const exportedAt = Date.parse(lastBackupMetadata?.exportedAt || lastBackupMetadata?.exportTimestamp || "");
    const ageHours = Number.isNaN(exportedAt) ? Infinity : (now.getTime() - exportedAt) / (60 * 60 * 1000);
    const status = ageHours <= backupSchedulePolicy.warningAfterHours
      ? "healthy"
      : (ageHours <= backupSchedulePolicy.failureAfterHours ? "warning" : "failed");
    return {
      schema: backupScheduleHealthFormatVersion,
      checkedAt: now.toISOString(),
      policy: backupSchedulePolicy,
      lastBackupAt: Number.isNaN(exportedAt) ? "N/A" : new Date(exportedAt).toISOString(),
      ageHours: Number.isFinite(ageHours) ? Number(ageHours.toFixed(2)) : null,
      status,
      due: status !== "healthy",
    };
  },

  async validateOffsiteCopy(sourceEnvelope, offsiteEnvelope) {
    const sourceChecksum = sourceEnvelope?.checksum || "";
    const offsiteChecksum = offsiteEnvelope?.checksum || "";
    const metadataMatches = sourceEnvelope?.backupFormatVersion === offsiteEnvelope?.backupFormatVersion
      && sourceEnvelope?.databaseSchemaVersion === offsiteEnvelope?.databaseSchemaVersion
      && sourceEnvelope?.payloadEncoding === offsiteEnvelope?.payloadEncoding;
    return {
      schema: backupOffsiteCopyFormatVersion,
      checkedAt: new Date().toISOString(),
      sourceBackupFormatVersion: sourceEnvelope?.backupFormatVersion || "N/A",
      offsiteBackupFormatVersion: offsiteEnvelope?.backupFormatVersion || "N/A",
      checksumMatches: Boolean(sourceChecksum) && sourceChecksum === offsiteChecksum,
      metadataMatches,
      encryptedPayloadPresent: Boolean(offsiteEnvelope?.encryptedPayload),
      status: Boolean(sourceChecksum) && sourceChecksum === offsiteChecksum && metadataMatches && Boolean(offsiteEnvelope?.encryptedPayload)
        ? "verified"
        : "mismatch",
    };
  },

  async validateRecoveryTimeObjective(backup, targetMs = backupRtoPolicy.targetMs) {
    const startedAt = performance.now();
    const drill = await this.runDisasterRecoveryDrill(backup);
    const durationMs = Math.round(performance.now() - startedAt);
    return {
      schema: backupRtoFormatVersion,
      checkedAt: new Date().toISOString(),
      policy: { ...backupRtoPolicy, targetMs },
      durationMs,
      targetMet: durationMs <= targetMs,
      readiness: drill.readiness,
      status: durationMs <= targetMs && drill.readiness === "ready" ? "within-target" : "outside-target",
      drill,
    };
  },

  monitorBackupCapacityGrowth(previousMetadata, currentEnvelope) {
    const previousBytes = Number(previousMetadata?.sizeBytes || previousMetadata?.encryptedPayloadBytes || 0);
    const currentBytes = Number(currentEnvelope?.sizeBytes || currentEnvelope?.encryptedPayload?.length || stableStringify(currentEnvelope || {}).length);
    const growthRatio = previousBytes > 0 ? (currentBytes - previousBytes) / previousBytes : 0;
    const status = growthRatio >= backupCapacityPolicy.failureGrowthRatio
      ? "failed"
      : (growthRatio >= backupCapacityPolicy.warningGrowthRatio ? "warning" : "healthy");
    return {
      schema: backupCapacityGrowthFormatVersion,
      checkedAt: new Date().toISOString(),
      policy: backupCapacityPolicy,
      previousBytes,
      currentBytes,
      growthRatio: Number(growthRatio.toFixed(4)),
      status,
    };
  },

  validateBackupFailureAlert(failureEvents) {
    const events = Array.isArray(failureEvents) ? failureEvents : [];
    const consecutiveFailures = events.slice().reverse().findIndex((event) => event?.status === "success");
    const failureCount = consecutiveFailures === -1 ? events.length : consecutiveFailures;
    const shouldAlert = failureCount >= backupFailureAlertPolicy.alertAfterConsecutiveFailures;
    return {
      schema: backupFailureAlertFormatVersion,
      checkedAt: new Date().toISOString(),
      policy: backupFailureAlertPolicy,
      failureCount,
      shouldAlert,
      status: shouldAlert ? "alert" : "clear",
      latestFailure: events.slice().reverse().find((event) => event?.status === "failure") || null,
    };
  },

  async runBackupIntegrityPeriodicAudit(backups) {
    const backupList = Array.isArray(backups) ? backups : [];
    const results = [];
    for (const item of backupList) {
      const encryptedEnvelopeValid = item?.backupFormatVersion === encryptedBackupFormatVersion
        && item.payloadEncoding === "base64"
        && Boolean(item.checksum)
        && Boolean(item.encryptedPayload)
        && Boolean(item.kdf?.salt)
        && Boolean(item.encryption?.iv);
      results.push({
        backupFormatVersion: item?.backupFormatVersion || item?.schema || "N/A",
        valid: item?.backupFormatVersion ? encryptedEnvelopeValid : await this.validateBackup(item),
        checksum: item?.checksum || "N/A",
      });
    }
    const failed = results.filter((result) => !result.valid).length;
    return {
      schema: backupIntegrityAuditFormatVersion,
      auditedAt: new Date().toISOString(),
      checkedCount: results.length,
      failedCount: failed,
      status: failed === 0 ? "passed" : "failed",
      results,
    };
  },

  auditBackupAccessPermissions(assignments) {
    const records = Array.isArray(assignments) ? assignments : [];
    const reviewed = records.map((record) => {
      const operations = Array.isArray(record?.operations) ? record.operations : [];
      const forbiddenOperations = operations.filter((operation) => !backupAccessPermissionPolicy.exportOperations.includes(operation));
      const allowedRole = backupAccessPermissionPolicy.allowedRoles.includes(record?.role);
      const mfaSatisfied = !backupAccessPermissionPolicy.requireMfa || record?.mfaEnabled === true;
      return {
        principalId: record?.principalId || "unknown",
        role: record?.role || "unknown",
        operations,
        allowedRole,
        mfaSatisfied,
        forbiddenOperations,
        status: allowedRole && mfaSatisfied && forbiddenOperations.length === 0 ? "compliant" : "violation",
      };
    });
    const violations = reviewed.filter((record) => record.status === "violation");
    return {
      schema: backupAccessPermissionAuditFormatVersion,
      auditedAt: new Date().toISOString(),
      policy: backupAccessPermissionPolicy,
      reviewedCount: reviewed.length,
      violationCount: violations.length,
      status: violations.length === 0 && reviewed.length > 0 ? "passed" : "failed",
      reviewed,
    };
  },

  validateBackupDeletionProtection(request) {
    const approvals = Array.isArray(request?.approvals) ? request.approvals : [];
    const uniqueApprovers = new Set(approvals.map((approval) => approval?.approverId).filter(Boolean));
    const operationProtected = backupDeletionProtectionPolicy.protectedOperations.includes(request?.operation);
    const approvalSatisfied = uniqueApprovers.size >= backupDeletionProtectionPolicy.requiredApprovals;
    const legalHoldSatisfied = !backupDeletionProtectionPolicy.requireLegalHoldCheck || request?.legalHoldClear === true;
    const integrityAuditSatisfied = !backupDeletionProtectionPolicy.requireRecentIntegrityAudit || request?.recentIntegrityAuditStatus === "passed";
    const protectedFromDeletion = operationProtected && (!approvalSatisfied || !legalHoldSatisfied || !integrityAuditSatisfied);
    return {
      schema: backupDeletionProtectionValidationFormatVersion,
      validatedAt: new Date().toISOString(),
      policy: backupDeletionProtectionPolicy,
      backupId: request?.backupId || "unknown",
      operation: request?.operation || "unknown",
      operationProtected,
      approvalCount: uniqueApprovers.size,
      approvalSatisfied,
      legalHoldSatisfied,
      integrityAuditSatisfied,
      protectedFromDeletion,
      status: operationProtected && approvalSatisfied && legalHoldSatisfied && integrityAuditSatisfied ? "approved" : "blocked",
    };
  },

  async archiveBackupComplianceEvidence(evidencePackage) {
    const evidenceItems = Array.isArray(evidencePackage?.items) ? evidencePackage.items : [];
    const presentTypes = new Set(evidenceItems.map((item) => item?.type).filter(Boolean));
    const missingEvidenceTypes = backupComplianceEvidencePolicy.requiredEvidenceTypes.filter((type) => !presentTypes.has(type));
    const archiveManifest = {
      schema: backupComplianceEvidenceArchiveFormatVersion,
      archivedAt: new Date().toISOString(),
      policy: backupComplianceEvidencePolicy,
      archiveId: evidencePackage?.archiveId || `backup-compliance-${Date.now()}`,
      immutable: evidencePackage?.immutable === true,
      retentionUntil: evidencePackage?.retentionUntil || "N/A",
      evidenceCount: evidenceItems.length,
      missingEvidenceTypes,
      evidenceItems: evidenceItems.map((item) => ({
        type: item?.type || "unknown",
        schema: item?.schema || "N/A",
        checksum: item?.checksum || "N/A",
      })),
    };
    archiveManifest.checksum = await sha256Hex(stableStringify({
      archiveId: archiveManifest.archiveId,
      immutable: archiveManifest.immutable,
      retentionUntil: archiveManifest.retentionUntil,
      evidenceItems: archiveManifest.evidenceItems,
    }));
    archiveManifest.status = archiveManifest.immutable && missingEvidenceTypes.length === 0 ? "archived" : "incomplete";
    return archiveManifest;
  },

  async importBackup(backup, options = {}) {
    if (!await this.validateBackup(backup)) {
      throw new Error("Unsupported backup schema");
    }
    const migratedBackup = migrateBackupToCurrent(backup);
    await indexedDbMigrationRepository.acquireLock("backup-restore");
    try {
      const stagingResult = await replaceAllBackupStoresStaged(migratedBackup, options);
      publishCoordinationMessage({ messageType: "backup-restored", recordType: "user-stores", targetVersion: databaseVersion, stagingResult });
      return stagingResult;
    } finally {
      await indexedDbMigrationRepository.releaseLock("backup-restore");
    }
  },

  async dryRunImport(backup) {
    if (!await this.validateBackup(backup)) {
      throw new Error("Unsupported backup schema");
    }
    const migratedBackup = migrateBackupToCurrent(backup);
    const currentScenarios = await indexedDbScenarioRepository.list();
    const currentRecommendationDecisions = await indexedDbRecommendationDecisionRepository.list();
    const currentSettings = await getAll(stores.settings);
    const currentAuditEntries = await indexedDbAuditRepository.list();
    const existingIds = new Set(currentScenarios.map((scenario) => scenario.scenarioId));
    const updates = migratedBackup.scenarios.filter((scenario) => existingIds.has(scenario.scenarioId));
    const creates = migratedBackup.scenarios.filter((scenario) => !existingIds.has(scenario.scenarioId));
    const storePlan = [
      createStoreImportPlan(stores.scenarios, "scenarioId", currentScenarios, migratedBackup.scenarios),
      createStoreImportPlan(stores.recommendationDecisions, "decisionId", currentRecommendationDecisions, migratedBackup.recommendationDecisions || []),
      createStoreImportPlan(stores.settings, "key", currentSettings, migratedBackup.settings || []),
      createStoreImportPlan(stores.auditEntries, "auditId", currentAuditEntries, migratedBackup.auditEntries || []),
    ];
    const migrationPlan = createBackupMigrationPlan(backup.databaseVersion || 0);
    return {
      sourceBackupFormatVersion: backup.schema,
      sourceDatabaseSchemaVersion: backup.databaseVersion || 0,
      targetDatabaseSchemaVersion: databaseVersion,
      migrationPlan,
      migrationSteps: migrationPlan.steps,
      migratedDatabaseSchemaVersion: migratedBackup.databaseVersion,
      creates: creates.length,
      updates: updates.length,
      skips: 0,
      rejects: 0,
      conflicts: storePlan.reduce((total, item) => total + item.conflicts, 0),
      storePlan,
      checksum: backup.checksum || "N/A",
    };
  },

  async validateBackup(backup) {
    if (backup?.schema !== backupSchemaVersion || !Array.isArray(backup.scenarios)) {
      return false;
    }
    if (!supportedBackupDatabaseVersions.includes(backup.databaseVersion || 0)) {
      return false;
    }
    if (backup.checksum) {
      const expected = await sha256Hex(stableStringify(backupPayload(backup)));
      if (backup.checksum !== expected) {
        return false;
      }
    }
    if (!["recommendationDecisions", "settings", "auditEntries"].every((field) => backup[field] === undefined || Array.isArray(backup[field]))) {
      return false;
    }
    if (backup.retentionPolicy && backup.retentionPolicy.schema !== backupRetentionPolicy.schema) {
      return false;
    }
    const scenarioIds = new Set();
    const scenarioValid = backup.scenarios.every((scenario) => {
      if (!scenario?.scenarioId || scenarioIds.has(scenario.scenarioId)) {
        return false;
      }
      scenarioIds.add(scenario.scenarioId);
      return typeof scenario.name === "string"
        && scenario.name.trim().length >= 2
        && (typeof scenario.score === "string" || Number.isFinite(scenario.score))
        && typeof scenario.status === "string";
    });
    const decisionIds = new Set();
    const decisionsValid = (backup.recommendationDecisions || []).every((decision) => {
      if (!decision?.decisionId || decisionIds.has(decision.decisionId)) return false;
      decisionIds.add(decision.decisionId);
      return typeof decision.fixtureId === "string" && typeof decision.decision === "string";
    });
    const settingKeys = new Set();
    const settingsValid = (backup.settings || []).every((setting) => {
      if (!setting?.key || settingKeys.has(setting.key)) return false;
      settingKeys.add(setting.key);
      return typeof setting.value === "string";
    });
    const auditIds = new Set();
    const auditValid = (backup.auditEntries || []).every((entry) => {
      if (!entry?.auditId || auditIds.has(entry.auditId)) return false;
      auditIds.add(entry.auditId);
      return typeof entry.action === "string" && typeof entry.recordedAt === "string";
    });
    return scenarioValid && decisionsValid && settingsValid && auditValid;
  },
};

function createBackupMigrationPlan(sourceDatabaseVersion) {
  const requiresMigration = sourceDatabaseVersion !== databaseVersion;
  const supported = supportedBackupDatabaseVersions.includes(sourceDatabaseVersion);
  return {
    requiresMigration,
    supported,
    status: requiresMigration ? (supported ? "migration-required" : "unsupported-version") : "current-version",
    steps: requiresMigration ? [`database-${sourceDatabaseVersion}-to-${databaseVersion}`] : [],
    message: requiresMigration
      ? (supported ? "匯入前會套用版本遷移。" : "此備份版本尚無可用遷移路徑。")
      : "備份版本與目前資料庫一致。",
  };
}

function migrateBackupToCurrent(backup) {
  const sourceDatabaseVersion = backup.databaseVersion || 0;
  const migrationPlan = createBackupMigrationPlan(sourceDatabaseVersion);
  if (!migrationPlan.supported) throw new Error("Unsupported backup migration path");
  const migrated = JSON.parse(JSON.stringify(backup));
  migrated.recommendationDecisions = migrated.recommendationDecisions || [];
  migrated.settings = migrated.settings || [];
  migrated.auditEntries = migrated.auditEntries || [];
  migrated.scenarios = (migrated.scenarios || []).map((scenario) => ({
    ...scenario,
    score: String(scenario.score),
    status: scenario.status || "review",
  }));
  migrated.databaseVersion = databaseVersion;
  migrated.migrationHistory = [
    ...(migrated.migrationHistory || []),
    ...migrationPlan.steps.map((step) => ({ step, migratedAt: new Date().toISOString(), sourceDatabaseVersion, targetDatabaseVersion: databaseVersion })),
  ];
  delete migrated.checksum;
  return migrated;
}

function createStoreImportPlan(storeName, keyField, currentRecords, incomingRecords) {
  const currentKeys = new Set(currentRecords.map((record) => record?.[keyField]).filter(Boolean));
  const conflictKeys = incomingRecords.map((record) => record?.[keyField]).filter((key) => key && currentKeys.has(key));
  return {
    storeName,
    keyField,
    incoming: incomingRecords.length,
    current: currentRecords.length,
    creates: incomingRecords.length - conflictKeys.length,
    conflicts: conflictKeys.length,
    conflictKeys: conflictKeys.slice(0, 5),
  };
}

async function replaceAllBackupStoresStaged(backup, options = {}) {
  const valid = await indexedDbBackupRepository.validateBackup(backup);
  if (!valid) throw new Error("Backup staging validation failed");
  const conflictPolicy = options.conflictPolicy || "replace-all";
  const database = await openDatabase();
  let plan = [
    { storeName: stores.scenarios, records: backup.scenarios || [] },
    { storeName: stores.recommendationDecisions, records: backup.recommendationDecisions || [] },
    { storeName: stores.settings, records: backup.settings || [] },
    { storeName: stores.auditEntries, records: backup.auditEntries || [] },
  ];
  if (conflictPolicy === "skip-existing") {
    const [currentScenarios, currentDecisions, currentSettings, currentAudits] = await Promise.all([
      indexedDbScenarioRepository.list(),
      indexedDbRecommendationDecisionRepository.list(),
      getAll(stores.settings),
      indexedDbAuditRepository.list(),
    ]);
    plan = [
      mergeWithoutReplacing(stores.scenarios, "scenarioId", currentScenarios, backup.scenarios || []),
      mergeWithoutReplacing(stores.recommendationDecisions, "decisionId", currentDecisions, backup.recommendationDecisions || []),
      mergeWithoutReplacing(stores.settings, "key", currentSettings, backup.settings || []),
      mergeWithoutReplacing(stores.auditEntries, "auditId", currentAudits, backup.auditEntries || []),
    ];
  }
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(plan.map((item) => item.storeName), "readwrite");
    for (const item of plan) {
      const store = transaction.objectStore(item.storeName);
      store.clear();
      for (const record of item.records) store.put(record);
    }
    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve({
      staged: true,
      conflictPolicy,
      replacedStoreCount: plan.length,
      restoredRecords: Object.fromEntries(plan.map((item) => [item.storeName, item.records.length])),
    });
  });
}

function mergeWithoutReplacing(storeName, keyField, currentRecords, incomingRecords) {
  const currentKeys = new Set(currentRecords.map((record) => record?.[keyField]).filter(Boolean));
  const creates = incomingRecords.filter((record) => !currentKeys.has(record?.[keyField]));
  return { storeName, records: [...currentRecords, ...creates] };
}
