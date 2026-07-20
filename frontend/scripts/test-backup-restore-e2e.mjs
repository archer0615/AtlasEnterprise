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

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://127.0.0.1").pathname;
  return path.join(frontendRoot, pathname === "/" ? "/index.html" : pathname);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
    schema: "atlas-pwa-runtime-backup.v1",
    exportedAt: "2026-07-20T00:00:00.000Z",
    databaseVersion: 2,
    scenarios: [
      { scenarioId: "e2e-restore-scenario", name: "端到端還原情境", score: 77, status: "review", updatedAt: "2026-07-20T00:00:00.000Z" },
    ],
    recommendationDecisions: [
      { decisionId: "e2e-restore-decision", decision: "accepted", fixtureId: "e2e-fixture", status: "review", score: "77", decidedAt: "2026-07-20T00:00:00.000Z" },
    ],
    settings: [
      { key: "e2e.restore.setting", value: "enabled" },
    ],
    auditEntries: [
      { auditId: "e2e-restore-audit", action: "e2e-seed", recordedAt: "2026-07-20T00:00:00.000Z", schema: "atlas-enterprise.audit-entry.v1" },
    ],
  };

  await page.setInputFiles("#importBackupInput", {
    name: "atlas-e2e-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup), "utf8"),
  });
  try {
    await page.waitForFunction(() => document.querySelector("#backupDryRunPanel")?.textContent.includes("建議決策"), { timeout: 5000 });
  } catch {
    const feedback = await page.locator("#runtimeFeedback").textContent();
    const preview = await page.locator("#backupPreview").textContent();
    const dryRun = await page.locator("#backupDryRunPanel").textContent();
    throw new Error(`Backup preview did not render. feedback=${feedback} preview=${preview} dryRun=${dryRun}`);
  }
  const dryRunText = await page.locator("#backupDryRunPanel").textContent();
  assert(dryRunText.includes("需要遷移"), "backup migration preview did not show required migration");
  assert(dryRunText.includes("database-2-to-3"), "backup migration preview did not show migration step");
  await page.selectOption("#backupConflictPolicySelect", "skip-existing");
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  await page.waitForFunction(() => document.querySelector("#scenarioList")?.textContent.includes("端到端還原情境"));
  await page.waitForFunction(() => document.querySelector("#restoreAuditPanel")?.textContent.includes("建議決策 1"));

  const restoreAuditText = await page.locator("#restoreAuditPanel").textContent();
  assert(restoreAuditText.includes("保留本機"), "restore audit did not record conflict policy");
  assert(restoreAuditText.includes("稽核紀錄"), "restore audit did not include audit store counts");

  await page.close();
  console.log("Backup restore end-to-end validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
