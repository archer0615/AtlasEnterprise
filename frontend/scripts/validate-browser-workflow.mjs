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

  for (const selector of [
    "#releaseDashboardPanel", "#sampleExportButton", "#sampleBackupButton", "#cacheVersionText",
    "#reportVersionPanel", "#reportVersionHistoryPanel", "#exportValidationButton",
    "#validationExportPanel", "#offlineRepairButton", "#offlineRepairPanel", "#offlineRepairAuditPanel",
    "#exportPreviewPanel", "#scenarioComparisonPanel", "#backupDryRunPanel",
    "#recommendationHistoryPanel", "#resetLoanButton", "#metricGrid", "#scenarioList", "#actionList",
  ]) {
    assert(await page.locator(selector).count() === 1, `${selector} is missing`);
  }

  for (const selector of ["#searchInput", "#categoryNav", "#documentList", "#documentViewer", ".internal-knowledge"]) {
    assert(await page.locator(selector).count() === 0, `${selector} should not be visible in the user UI`);
  }

  await page.close();
  console.log("Browser workflow validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
