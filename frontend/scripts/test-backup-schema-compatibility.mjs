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

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });

  const result = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    await module.indexedDbScenarioRepository.saveWithVersionCheck({
      scenarioId: "backup-compat-current",
      name: "Backup Compatibility Current",
      score: 91,
      status: "review",
      updatedAt: "2026-07-27T00:00:00.000Z",
    });
    const currentBackup = await module.indexedDbBackupRepository.exportBackup();
    const currentDryRun = await module.indexedDbBackupRepository.dryRunImport(currentBackup);
    const legacyBackup = JSON.parse(JSON.stringify(currentBackup));
    legacyBackup.databaseVersion = 2;
    delete legacyBackup.checksum;
    const legacyDryRun = await module.indexedDbBackupRepository.dryRunImport(legacyBackup);
    const legacyPositionBackup = { ...currentBackup, schema: "atlas-pwa-runtime-backup.v1", positions: [] };
    const unknownBackup = { ...currentBackup, schema: "atlas-pwa-runtime-backup.unknown" };
    const encrypted = await module.indexedDbBackupRepository.exportEncryptedBackup("compatibility-passphrase");
    const decrypted = await module.indexedDbBackupRepository.decryptEncryptedBackup(encrypted, "compatibility-passphrase");
    const futureEncrypted = await module.indexedDbBackupRepository.exportEncryptedBackup("compatibility-passphrase");
    const legacyPlaintextWithPositions = { ...decrypted, schema: "atlas-pwa-runtime-backup.v1", positions: [] };
    const before = await module.indexedDbScenarioRepository.list();
    let futureRejectedBeforeMutation = false;
    try {
      await module.indexedDbBackupRepository.importBackup(legacyPositionBackup);
    } catch {
      futureRejectedBeforeMutation = true;
    }
    const after = await module.indexedDbScenarioRepository.list();
    return {
      currentBackup,
      currentDryRun,
      legacyDryRun,
      currentValid: await module.indexedDbBackupRepository.validateBackup(currentBackup),
      legacyValid: await module.indexedDbBackupRepository.validateBackup(legacyBackup),
      currentVersion: currentBackup.schema,
      currentDatabaseVersion: currentBackup.databaseVersion,
      hasPositionsArray: Array.isArray(currentBackup.positions),
      legacyPositionValid: await module.indexedDbBackupRepository.validateBackup(legacyPositionBackup),
      unknownValid: await module.indexedDbBackupRepository.validateBackup(unknownBackup),
      decryptedValid: await module.indexedDbBackupRepository.validateBackup(decrypted),
      decryptedVersion: decrypted.schema,
      decryptedHasPositionsArray: Array.isArray(decrypted.positions),
      futureEncryptedEnvelopeVersion: futureEncrypted.backupFormatVersion,
      legacyPlaintextWithPositionsRejectedAfterDecrypt: !await module.indexedDbBackupRepository.validateBackup(legacyPlaintextWithPositions),
      futureRejectedBeforeMutation,
      scenarioCountBefore: before.length,
      scenarioCountAfter: after.length,
    };
  });

  assert(result.currentValid, "current backup payload was not accepted");
  assert(result.currentVersion === "atlas-pwa-runtime-backup.v2", "current backup payload did not use v2 schema");
  assert(result.currentDatabaseVersion === 8, "current backup payload did not use database v8");
  assert(result.hasPositionsArray, "current backup payload did not include positions array");
  assert(result.legacyValid, "legacy compatible backup payload was not accepted");
  assert(result.currentDryRun.sourceBackupFormatVersion === "atlas-pwa-runtime-backup.v2", "dry-run did not report payload version");
  assert(result.currentDryRun.migrationPlan.status === "current-version", "current backup dry-run did not report current version");
  assert(result.legacyDryRun.migrationPlan.status === "migration-required", "legacy backup dry-run did not report migration-required");
  assert(result.legacyDryRun.migrationSteps.includes("database-2-to-3"), "legacy backup dry-run did not include migration chain");
  assert(result.currentDryRun.storePlan.length === 11, "backup dry-run did not cover current restore stores");
  assert(result.currentDryRun.storePlan.some((item) => item.storeName === "positions"), "positions did not appear in backup dry-run after schema acceptance");
  assert(!result.legacyPositionValid, "legacy backup with positions was not rejected");
  assert(!result.unknownValid, "unknown backup version was not rejected");
  assert(result.futureRejectedBeforeMutation, "legacy positions backup import did not reject before mutation");
  assert(result.scenarioCountBefore === result.scenarioCountAfter, "legacy positions backup rejection mutated local data");
  assert(result.decryptedValid, "encrypted backup did not decrypt to a valid plaintext backup");
  assert(result.decryptedVersion === "atlas-pwa-runtime-backup.v2", "decrypted backup did not expose plaintext schema version");
  assert(result.decryptedHasPositionsArray, "decrypted v2 backup did not include positions array");
  assert(result.futureEncryptedEnvelopeVersion === "atlas-pwa-runtime-encrypted-backup.v1", "encrypted envelope format version changed unexpectedly");
  assert(result.legacyPlaintextWithPositionsRejectedAfterDecrypt, "legacy plaintext with positions was not rejected after decrypt step");

  const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
  assert(!serviceWorker.includes("backup"), "service worker cache references backup payloads");

  await page.close();
  console.log("Backup schema compatibility tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
