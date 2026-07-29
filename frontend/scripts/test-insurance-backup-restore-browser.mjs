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
    insurancePolicies: [{
      policyId: "insurance-restore-browser-1",
      ownerId: "owner-1",
      householdId: "household-1",
      providerName: "Restore Life",
      policyName: "Restore Protection",
      coverageType: "life",
      coverageAmount: 5000000,
      premiumAmount: 3200,
      premiumFrequency: "monthly",
      currency: "TWD",
      status: "active",
      beneficiarySummary: "Family",
      effectiveDate: "2026-07-28",
      renewalDate: "2027-07-28",
      updatedAt: "2026-07-28T00:00:00.000Z",
    }],
  };

  await page.setInputFiles("#importBackupInput", {
    name: "atlas-insurance-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup), "utf8"),
  });
  try {
    await page.waitForFunction(() => document.querySelector("#backupDryRunPanel")?.textContent.includes("保險保單"), { timeout: 5000 });
  } catch {
    const feedback = await page.locator("#runtimeFeedback").textContent();
    const preview = await page.locator("#backupPreview").textContent();
    const dryRun = await page.locator("#backupDryRunPanel").textContent();
    throw new Error(`Insurance backup preview did not render. feedback=${feedback} preview=${preview} dryRun=${dryRun}`);
  }
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  const restoredCount = await waitForRestoredInsurancePolicy(page, "owner-1", "insurance-restore-browser-1");
  assert(restoredCount >= 1, "insurance backup restore did not persist policies");

  await page.close();
  console.log("Insurance backup restore browser validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

async function waitForRestoredInsurancePolicy(page, ownerId, policyId) {
  const deadline = Date.now() + 5000;
  let latestCount = 0;
  while (Date.now() < deadline) {
    latestCount = await page.evaluate(async ({ ownerId, policyId }) => {
      const module = await import("./src/indexeddb-runtime.js");
      const policies = await module.indexedDbInsurancePolicyRepository.listByOwner(ownerId, { includeArchived: true });
      return policies.some((policy) => policy.policyId === policyId) ? policies.length : 0;
    }, { ownerId, policyId });
    if (latestCount >= 1) return latestCount;
    await page.waitForTimeout(100);
  }
  return latestCount;
}
