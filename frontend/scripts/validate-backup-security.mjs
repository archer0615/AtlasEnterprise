import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://127.0.0.1").pathname;
  return path.join(frontendRoot, pathname === "/" ? "/index.html" : pathname);
}

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url);
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": contentTypes[path.extname(filePath)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

const { port } = server.address();
const browser = await chromium.launch();
const context = await browser.newContext();

try {
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });

  const result = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    await module.indexedDbScenarioRepository.saveWithVersionCheck({
      scenarioId: "backup-security-scenario",
      name: "Backup Security Scenario",
      score: 88,
      status: "review",
      secret: "scenario-secret",
      contactEmail: "owner@example.com",
      unexpectedRuntimeField: "must-not-export",
    });
    await module.indexedDbSettingsRepository.set("backup.security.token", "plain-token");
    await module.indexedDbAuditRepository.save({
      auditId: "backup-security-old-audit",
      action: "scenario-save",
      recordedAt: "2026-01-01T00:00:00.000Z",
      schema: "atlas-enterprise.audit-entry.v1",
      authorization: "bearer-token",
    });
    await module.indexedDbAuditRepository.save({
      auditId: "backup-security-retained-audit",
      action: "backup-restore",
      recordedAt: "2026-01-01T00:00:00.000Z",
      schema: "atlas-enterprise.audit-entry.v1",
      payload: { token: "restore-token" },
    });

    const backup = await module.indexedDbBackupRepository.exportBackup();
    return {
      backup,
      backupText: JSON.stringify(backup),
      valid: await module.indexedDbBackupRepository.validateBackup(backup),
    };
  });

  const topLevelFields = Object.keys(result.backup).sort();
  const allowedFields = ["auditEntries", "checksum", "databaseVersion", "exportedAt", "recommendationDecisions", "retentionPolicy", "scenarios", "schema", "settings"].sort();
  assert(JSON.stringify(topLevelFields) === JSON.stringify(allowedFields), `backup export fields are not minimized: ${topLevelFields.join(",")}`);
  assert(result.valid, "sampled backup export did not pass validation");
  assert(result.backup.retentionPolicy?.auditRetentionDays === 90, "backup retention policy metadata is missing");
  assert(!result.backup.auditEntries.some((entry) => entry.auditId === "backup-security-old-audit"), "expired non-retained audit entry was exported");
  assert(result.backup.auditEntries.some((entry) => entry.auditId === "backup-security-retained-audit"), "retained recovery audit entry was removed");
  assert(!result.backupText.includes("scenario-secret"), "sensitive scenario secret leaked into backup");
  assert(!result.backupText.includes("owner@example.com"), "sensitive contact email leaked into backup");
  assert(!result.backupText.includes("bearer-token"), "sensitive authorization value leaked into backup");
  assert(!result.backupText.includes("restore-token"), "sensitive token value leaked into backup");
  assert(result.backupText.includes("[MASKED]"), "sensitive fields were not masked");
  assert(!result.backupText.includes("unexpectedRuntimeField"), "unexpected runtime field leaked into backup");

  const runtimeChecks = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    const before = await module.indexedDbScenarioRepository.list();
    const backup = await module.indexedDbBackupRepository.exportBackup();
    const tamperedBackup = JSON.parse(JSON.stringify(backup));
    tamperedBackup.scenarios[0].score = "1";
    const unsupportedBackup = { ...backup, schema: "atlas-pwa-runtime-backup.v0" };
    const duplicateBackup = JSON.parse(JSON.stringify(backup));
    duplicateBackup.scenarios = [duplicateBackup.scenarios[0], { ...duplicateBackup.scenarios[0] }];
    const encrypted = await module.indexedDbBackupRepository.exportEncryptedBackup("correct-passphrase");
    const rotation = await module.indexedDbBackupRepository.rotateEncryptedBackupKey(encrypted, "correct-passphrase", "rotated-passphrase");
    const rotatedBackup = await module.indexedDbBackupRepository.decryptEncryptedBackup(rotation.envelope, "rotated-passphrase");
    const disasterRecoveryDrill = await module.indexedDbBackupRepository.runDisasterRecoveryDrill(backup);
    const scheduleHealthy = module.indexedDbBackupRepository.validateBackupScheduleHealth({ exportedAt: new Date().toISOString() });
    const scheduleFailed = module.indexedDbBackupRepository.validateBackupScheduleHealth({ exportedAt: "2026-01-01T00:00:00.000Z" }, new Date("2026-01-04T01:00:00.000Z"));
    const offsiteCopy = await module.indexedDbBackupRepository.validateOffsiteCopy(encrypted, { ...encrypted });
    const offsiteMismatch = await module.indexedDbBackupRepository.validateOffsiteCopy(encrypted, { ...encrypted, checksum: "mismatch" });
    const rtoReport = await module.indexedDbBackupRepository.validateRecoveryTimeObjective(backup, 5000);
    const capacityHealthy = module.indexedDbBackupRepository.monitorBackupCapacityGrowth({ sizeBytes: encrypted.encryptedPayload.length }, encrypted);
    const capacityWarning = module.indexedDbBackupRepository.monitorBackupCapacityGrowth({ sizeBytes: 1000 }, { ...encrypted, encryptedPayload: "x".repeat(1300) });
    const capacityFailed = module.indexedDbBackupRepository.monitorBackupCapacityGrowth({ sizeBytes: 1000 }, { ...encrypted, encryptedPayload: "x".repeat(1600) });
    const failureAlert = module.indexedDbBackupRepository.validateBackupFailureAlert([{ status: "success" }, { status: "failure", errorCode: "BACKUP_EXPORT_FAILED" }]);
    const failureClear = module.indexedDbBackupRepository.validateBackupFailureAlert([{ status: "failure" }, { status: "success" }]);
    const integrityAudit = await module.indexedDbBackupRepository.runBackupIntegrityPeriodicAudit([backup, encrypted]);
    const integrityAuditFailed = await module.indexedDbBackupRepository.runBackupIntegrityPeriodicAudit([backup, { ...encrypted, checksum: "" }]);
    const tamperedEnvelope = { ...encrypted, encryptedPayload: encrypted.encryptedPayload.replace(/.$/, encrypted.encryptedPayload.endsWith("A") ? "B" : "A") };

    const failures = {};
    failures.checksumTamperRejected = !await module.indexedDbBackupRepository.validateBackup(tamperedBackup);
    failures.unsupportedPlaintextRejected = !await module.indexedDbBackupRepository.validateBackup(unsupportedBackup);
    failures.duplicateKeysRejected = !await module.indexedDbBackupRepository.validateBackup(duplicateBackup);
    try {
      await module.indexedDbBackupRepository.decryptEncryptedBackup({ ...encrypted, backupFormatVersion: "atlas-pwa-runtime-encrypted-backup.v0" }, "correct-passphrase");
      failures.unsupportedEncryptedRejected = false;
    } catch {
      failures.unsupportedEncryptedRejected = true;
    }
    try {
      await module.indexedDbBackupRepository.decryptEncryptedBackup(encrypted, "wrong-passphrase");
      failures.wrongPassphraseRejected = false;
    } catch {
      failures.wrongPassphraseRejected = true;
    }
    try {
      await module.indexedDbBackupRepository.decryptEncryptedBackup(tamperedEnvelope, "correct-passphrase");
      failures.encryptedTamperRejected = false;
    } catch {
      failures.encryptedTamperRejected = true;
    }
    try {
      await module.indexedDbBackupRepository.decryptEncryptedBackup(rotation.envelope, "correct-passphrase");
      failures.rotatedOldPassphraseRejected = false;
    } catch {
      failures.rotatedOldPassphraseRejected = true;
    }
    const after = await module.indexedDbScenarioRepository.list();

    return {
      failures,
      scenarioCountBefore: before.length,
      scenarioCountAfter: after.length,
      encryptedEnvelopeFields: Object.keys(encrypted).sort(),
      rotatedEnvelopeFields: Object.keys(rotation.envelope).sort(),
      rotationReport: rotation.report,
      rotatedBackupValid: await module.indexedDbBackupRepository.validateBackup(rotatedBackup),
      rotatedChecksumMatches: rotatedBackup.checksum === backup.checksum,
      disasterRecoveryDrill,
      scheduleHealthy,
      scheduleFailed,
      offsiteCopy,
      offsiteMismatch,
      rtoReport,
      capacityHealthy,
      capacityWarning,
      capacityFailed,
      failureAlert,
      failureClear,
      integrityAudit,
      integrityAuditFailed,
      plaintextHasChecksum: Boolean(backup.checksum),
      plaintextHasRetentionPolicy: Boolean(backup.retentionPolicy),
      dryRun: await module.indexedDbBackupRepository.dryRunImport({ ...backup, databaseVersion: 2, checksum: undefined }),
    };
  });

  assert(runtimeChecks.failures.checksumTamperRejected, "backup checksum tamper was not rejected");
  assert(runtimeChecks.failures.unsupportedPlaintextRejected, "unsupported plaintext backup format was not rejected");
  assert(runtimeChecks.failures.unsupportedEncryptedRejected, "unsupported encrypted backup format was not rejected");
  assert(runtimeChecks.failures.duplicateKeysRejected, "duplicate backup keys were not rejected");
  assert(runtimeChecks.failures.wrongPassphraseRejected, "wrong passphrase did not fail decrypt");
  assert(runtimeChecks.failures.encryptedTamperRejected, "tampered encrypted payload did not fail decrypt");
  assert(runtimeChecks.failures.rotatedOldPassphraseRejected, "rotated encrypted backup still opened with old passphrase");
  assert(runtimeChecks.scenarioCountBefore === runtimeChecks.scenarioCountAfter, "failure path mutated local scenario data");
  assert(runtimeChecks.rotatedBackupValid, "rotated encrypted backup did not decrypt to a valid backup");
  assert(runtimeChecks.rotatedChecksumMatches, "backup key rotation changed the plaintext payload checksum");
  assert(runtimeChecks.rotationReport.schema === "atlas-enterprise.backup-key-rotation-report.v1", "backup key rotation report schema is missing");
  assert(runtimeChecks.rotationReport.payloadChecksumPreserved, "backup key rotation report did not prove checksum preservation");
  assert(runtimeChecks.rotationReport.kdfChanged, "backup key rotation did not change KDF metadata");
  assert(runtimeChecks.rotationReport.encryptionIvChanged, "backup key rotation did not change encryption IV");
  assert(runtimeChecks.disasterRecoveryDrill.schema === "atlas-enterprise.backup-disaster-recovery-drill.v1", "disaster recovery drill report schema is missing");
  assert(runtimeChecks.disasterRecoveryDrill.readiness === "ready", "disaster recovery drill did not report ready");
  assert(runtimeChecks.disasterRecoveryDrill.mutationFree, "disaster recovery drill mutated local data");
  assert(runtimeChecks.disasterRecoveryDrill.dryRun.storePlan.length === 4, "disaster recovery drill did not cover all backup stores");
  assert(runtimeChecks.scheduleHealthy.schema === "atlas-enterprise.backup-schedule-health-report.v1", "backup schedule health report schema is missing");
  assert(runtimeChecks.scheduleHealthy.status === "healthy", "fresh backup schedule did not report healthy");
  assert(runtimeChecks.scheduleFailed.status === "failed", "stale backup schedule did not report failed");
  assert(runtimeChecks.offsiteCopy.schema === "atlas-enterprise.backup-offsite-copy-report.v1", "backup offsite copy report schema is missing");
  assert(runtimeChecks.offsiteCopy.status === "verified", "matching offsite backup copy did not verify");
  assert(runtimeChecks.offsiteMismatch.status === "mismatch", "mismatched offsite backup copy was not rejected");
  assert(runtimeChecks.rtoReport.schema === "atlas-enterprise.backup-rto-report.v1", "backup RTO report schema is missing");
  assert(runtimeChecks.rtoReport.status === "within-target", `backup RTO validation exceeded target: ${runtimeChecks.rtoReport.durationMs}ms`);
  assert(runtimeChecks.capacityHealthy.schema === "atlas-enterprise.backup-capacity-growth-report.v1", "backup capacity growth report schema is missing");
  assert(runtimeChecks.capacityHealthy.status === "healthy", "stable backup capacity did not report healthy");
  assert(runtimeChecks.capacityWarning.status === "warning", "backup capacity warning threshold did not trigger");
  assert(runtimeChecks.capacityFailed.status === "failed", "backup capacity failure threshold did not trigger");
  assert(runtimeChecks.failureAlert.schema === "atlas-enterprise.backup-failure-alert-report.v1", "backup failure alert report schema is missing");
  assert(runtimeChecks.failureAlert.status === "alert", "backup failure alert did not trigger after failure");
  assert(runtimeChecks.failureClear.status === "clear", "backup failure alert did not clear after success");
  assert(runtimeChecks.integrityAudit.schema === "atlas-enterprise.backup-integrity-periodic-audit.v1", "backup integrity periodic audit schema is missing");
  assert(runtimeChecks.integrityAudit.status === "passed" && runtimeChecks.integrityAudit.checkedCount === 2, "backup integrity audit did not pass valid backups");
  assert(runtimeChecks.integrityAuditFailed.status === "failed", "backup integrity audit did not fail invalid backup");
  assert(runtimeChecks.dryRun.migrationPlan.status === "migration-required", "backup version migration regression did not report migration");
  assert(runtimeChecks.dryRun.migrationSteps.includes("database-2-to-3"), "backup version migration step is missing");
  assert(runtimeChecks.plaintextHasChecksum && runtimeChecks.plaintextHasRetentionPolicy, "plaintext backup downgrade risk controls are missing");
  assert(JSON.stringify(runtimeChecks.encryptedEnvelopeFields) === JSON.stringify(["applicationVersion", "backupFormatVersion", "checksum", "databaseSchemaVersion", "encryptedPayload", "encryption", "exportTimestamp", "kdf", "payloadEncoding"].sort()), "encrypted backup metadata is not minimized");
  assert(JSON.stringify(runtimeChecks.rotatedEnvelopeFields) === JSON.stringify(runtimeChecks.encryptedEnvelopeFields), "rotated encrypted backup metadata is not minimized");

  await page.locator(".advanced-controls summary").click();
  await page.click("#applyBackupButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("請先勾選確認覆蓋本機情境。"));
  const uiGuardText = await page.locator("#runtimeFeedback").textContent();
  assert(uiGuardText.includes("請先勾選確認覆蓋本機情境。"), "backup UI misoperation guard did not block restore");

  await page.setInputFiles("#importBackupInput", {
    name: "atlas-security-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(result.backup), "utf8"),
  });
  await page.waitForFunction(() => document.querySelector("#backupDryRunPanel")?.textContent.includes("Checksum"));
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  await page.waitForFunction(() => document.querySelector("#restoreAuditPanel")?.textContent.includes("atlas-enterprise.restore-audit-report.v1"));
  const restoreAuditText = await page.locator("#restoreAuditPanel").textContent();
  assert(restoreAuditText.includes("atlas-enterprise.restore-audit-report.v1"), "restore audit report evidence was not rendered");
  const auditReportValid = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    return module.indexedDbBackupRepository.validateRestoreAuditReport(window.__atlasDebugState.restoreAuditReports[0]);
  });
  assert(auditReportValid, "restore audit report structure did not pass validation");

  const lockPage = await context.newPage();
  await lockPage.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  const lockResult = await lockPage.evaluate(async (backup) => {
    const module = await import("./src/indexeddb-runtime.js");
    await module.indexedDbMigrationRepository.acquireLock("backup-security-lock-test");
    return backup.schema;
  }, result.backup);
  assert(lockResult === "atlas-pwa-runtime-backup.v1", "lock setup did not load backup schema");
  await lockPage.waitForFunction(() => new Promise((resolve) => {
    const request = indexedDB.open("atlas-pwa-runtime", 3);
    request.onerror = () => resolve(false);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction("metadata", "readonly");
      const getRequest = transaction.objectStore("metadata").get("migration-lock");
      getRequest.onerror = () => resolve(false);
      getRequest.onsuccess = () => resolve(Boolean(getRequest.result?.value));
    };
  }));
  const blockedByLock = await page.evaluate(async (backup) => {
    const module = await import("./src/indexeddb-runtime.js");
    const lockBefore = await new Promise((resolve) => {
      const request = indexedDB.open("atlas-pwa-runtime", 3);
      request.onerror = () => resolve(null);
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction("metadata", "readonly");
        const getRequest = transaction.objectStore("metadata").get("migration-lock");
        getRequest.onerror = () => resolve(null);
        getRequest.onsuccess = () => resolve(getRequest.result?.value || null);
      };
    });
    try {
      await module.indexedDbBackupRepository.importBackup(backup);
      return { blocked: false, message: "restore completed", lockBefore };
    } catch (error) {
      return { blocked: String(error.message).includes("Another Atlas tab"), message: String(error.message), lockBefore };
    }
  }, result.backup);
  await lockPage.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    await module.indexedDbMigrationRepository.releaseLock("backup-security-lock-test");
  });
  await lockPage.close();
  assert(blockedByLock.blocked, `multi-tab restore lock did not block concurrent restore: ${blockedByLock.message} lock=${JSON.stringify(blockedByLock.lockBefore)}`);

  await page.close();
  console.log("Backup security validation suite passed.");
} finally {
  await context.close();
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
