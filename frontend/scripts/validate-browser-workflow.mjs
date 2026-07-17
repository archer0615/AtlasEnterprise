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
  const normalized = pathname === "/" ? "/index.html" : pathname;
  return path.join(frontendRoot, normalized);
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
  await page.fill("#scenarioNameInput", "A");
  await page.click("#saveScenarioButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("至少需要 2 個字"));

  await page.fill("#scenarioNameInput", "Playwright invalid score");
  await page.fill("#scenarioScoreInput", "101");
  await page.click("#saveScenarioButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("情境分數必須是 0 到 100"));

  await page.fill("#scenarioNameInput", "Playwright local scenario");
  await page.fill("#scenarioScoreInput", "88");
  await page.click("#saveScenarioButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("已儲存"));
  assert(await page.locator("#scenarioList").getByText("Playwright local scenario").count() === 1, "saved scenario is missing");

  await page.click("#deleteScenarioButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("已刪除"));
  assert(await page.locator("#scenarioList").getByText("Playwright local scenario").count() === 0, "deleted scenario is still visible");

  await page.fill("#scenarioNameInput", "Playwright reset scenario");
  await page.fill("#scenarioScoreInput", "77");
  await page.click("#saveScenarioButton");
  await page.click("#resetScenariosButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("已重置"));
  assert(await page.locator("#scenarioList").getByText("Playwright reset scenario").count() === 0, "reset scenario is still visible");

  assert(await page.locator("#restoreConfirmInput").count() === 1, "restore confirmation is missing");

  await page.click("#applyBackupButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("請先確認覆蓋本地情境"));

  const backupFile = {
    name: "atlas-pwa-runtime-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({
      schema: "atlas-pwa-runtime-backup.v1",
      exportedAt: "2026-07-17T00:00:00.000Z",
      databaseVersion: 1,
      scenarios: [{
        scenarioId: "playwright-imported",
        name: "Playwright imported scenario",
        score: "91",
        status: "IndexedDB",
        savedAt: "2026-07-17T00:00:00.000Z",
      }],
    })),
  };
  await page.setInputFiles("#importBackupInput", backupFile);
  await page.waitForFunction(() => document.querySelector("#backupPreview")?.textContent.includes("1 筆情境"));
  await page.waitForFunction(() => document.querySelector("#backupPreview")?.textContent.includes("新增：1 筆"));
  await page.waitForFunction(() => document.querySelector("#backupPreview")?.textContent.includes("Playwright imported scenario"));
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  await page.waitForFunction(() => document.querySelector("#runtimeFeedback")?.textContent.includes("已匯入"));
  assert(await page.locator("#scenarioList").getByText("Playwright imported scenario").count() === 1, "imported scenario is missing");

  await page.close();

  console.log("Browser workflow validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
