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
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function policy(input = {}) {
  return {
    policyId: "insurance-conflict-1",
    ownerId: "owner-1",
    householdId: "household-1",
    providerName: "Conflict Life",
    policyName: "Local Conflict Protection",
    coverageType: "life",
    coverageAmount: 1000000,
    premiumAmount: 1000,
    premiumFrequency: "monthly",
    currency: "TWD",
    status: "active",
    beneficiarySummary: "Family",
    effectiveDate: "2026-07-28",
    renewalDate: "2027-07-28",
    updatedAt: "2026-07-28T00:00:00.000Z",
    ...input,
  };
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
  await page.locator(".advanced-controls summary").click();
  await page.evaluate(async (localPolicy) => {
    const module = await import("./src/indexeddb-runtime.js");
    await module.indexedDbInsurancePolicyRepository.create(localPolicy);
  }, policy());

  const backup = {
    schema: "atlas-pwa-runtime-backup.v2",
    exportedAt: "2026-07-28T00:00:00.000Z",
    databaseVersion: 8,
    scenarios: [],
    recommendationDecisions: [],
    settings: [],
    auditEntries: [],
    assets: [],
    liabilities: [],
    incomes: [],
    expenses: [],
    goals: [],
    positions: [],
    insurancePolicies: [policy({ policyName: "Incoming Conflict Protection", coverageAmount: 9000000 })],
  };

  await page.setInputFiles("#importBackupInput", {
    name: "atlas-insurance-conflict-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup), "utf8"),
  });
  await page.waitForFunction(() => document.querySelector("#backupDryRunPanel")?.textContent.includes("保險保單"));
  const dryRunText = await page.locator("#backupDryRunPanel").textContent();
  assert(dryRunText.includes("衝突 1"), "insurance restore dry-run did not show conflict count");
  assert(dryRunText.includes("insurance-conflict-1"), "insurance restore dry-run did not show conflict key");

  await page.selectOption("#backupConflictPolicySelect", "skip-existing");
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  await page.waitForFunction(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    const records = await module.indexedDbInsurancePolicyRepository.listByOwner("owner-1", { includeArchived: true });
    return records.some((item) => item.policyName === "Local Conflict Protection" && item.coverageAmount === 1000000);
  });

  const result = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    return (await module.indexedDbInsurancePolicyRepository.listByOwner("owner-1", { includeArchived: true })).map((item) => item.policyName);
  });
  assert(!result.includes("Incoming Conflict Protection"), "skip-existing restore replaced local insurance policy");

  await page.close();
  console.log("Insurance restore conflict browser tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
