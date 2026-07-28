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
    const repository = module.indexedDbInsurancePolicyRepository;
    await repository.create({
      policyId: "insurance-indexeddb-1",
      ownerId: "owner-1",
      householdId: "household-1",
      providerName: "Atlas Life",
      policyName: "IndexedDB Protection",
      coverageType: "life",
      coverageAmount: 3000000,
      premiumAmount: 2500,
      premiumFrequency: "monthly",
      currency: "TWD",
      status: "active",
      beneficiarySummary: "Family",
      effectiveDate: "2026-07-28",
      renewalDate: "2027-07-28",
      updatedAt: "2026-07-28T00:00:00.000Z",
    });
    const listed = await repository.listByOwner("owner-1");
    const ownerIsolated = await repository.listByOwner("owner-2");
    const duplicate = await repository.existsByOwnerAndName("owner-1", "IndexedDB Protection");
    const backup = await module.indexedDbBackupRepository.exportBackup();
    const dryRun = await module.indexedDbBackupRepository.dryRunImport(backup);
    return {
      listedCount: listed.length,
      ownerIsolatedCount: ownerIsolated.length,
      duplicate,
      backupDatabaseVersion: backup.databaseVersion,
      hasInsurancePolicies: Array.isArray(backup.insurancePolicies),
      insuranceBackupCount: backup.insurancePolicies.length,
      storePlanNames: dryRun.storePlan.map((item) => item.storeName),
      inventory: module.getIndexedDbPersistenceInventory(),
    };
  });

  assert(result.listedCount === 1, "insurance policy repository did not list owner record");
  assert(result.ownerIsolatedCount === 0, "insurance policy repository leaked another owner");
  assert(result.duplicate, "insurance policy repository duplicate owner/name check failed");
  assert(result.backupDatabaseVersion === 8, "insurance backup did not use database v8");
  assert(result.hasInsurancePolicies, "backup export did not include insurancePolicies array");
  assert(result.insuranceBackupCount === 1, "backup export did not include insurance policy record");
  assert(result.storePlanNames.includes("insurancePolicies"), "backup dry-run did not include insurancePolicies store");
  assert(result.inventory.databaseVersion === 8, "persistence inventory did not expose database v8");
  assert(result.inventory.stores.insurancePolicies.backup === true, "insurance store is not backup-enabled");

  await page.close();
  console.log("Insurance IndexedDB repository tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
