import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import os from "node:os";
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
  return path.join(frontendRoot, pathname === "/" ? "index.html" : pathname);
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
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: "networkidle" });

  await page.evaluate(() => {
    localStorage.setItem("atlas.local.actions.v1", JSON.stringify([{
      id: "persisted-action",
      title: "Persisted action",
      dueDate: "2020-01-01",
      status: "pending-review",
      createdFrom: "test",
      createdAt: "2020-01-01T00:00:00.000Z",
    }, {
      id: "undated-action",
      title: "Undated action",
      dueDate: "",
      status: "pending-review",
      createdFrom: "test",
      createdAt: "2020-01-02T00:00:00.000Z",
    }]));
  });
  await page.reload({ waitUntil: "networkidle" });
  assert(await page.evaluate(() => Number.isFinite(window.__atlasDebugState?.performanceMetrics?.firstInteractive)), "first interactive timing missing");
  assert(await page.evaluate(() => Number.isFinite(window.__atlasDebugState?.runtimeCacheStats?.misses) && window.__atlasDebugState.runtimeCacheStats.misses > 0), "runtime cache miss metrics missing");
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("Persisted action"));
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("已到期"));
  await page.waitForFunction(() => {
    const text = document.querySelector("#localActionListPanel")?.textContent || "";
    return text.indexOf("Persisted action") < text.indexOf("Undated action");
  });
  await page.waitForFunction(() => document.querySelector("#localActionReminderPanel")?.textContent.includes("已到期"));
  await page.waitForFunction(() => document.querySelector("#businessCalendarPanel")?.textContent.includes("Persisted action"));
  await page.waitForFunction(() => document.querySelector("#notificationListPanel")?.textContent.includes("行動到期"));

  await page.goto(`http://127.0.0.1:${server.address().port}/#maintenance-settings`, { waitUntil: "networkidle" });
  await page.waitForSelector("#settings[open]");
  await page.waitForSelector("#maintenance-settings details[open]");
  assert(await page.locator("#maintenance-settings").evaluate((element) => getComputedStyle(element).borderTopColor !== "rgba(0, 0, 0, 0)"), "settings deep link target should be visually addressable");

  await page.goto(`http://127.0.0.1:${server.address().port}/#execution`, { waitUntil: "networkidle" });
  await page.waitForSelector("#localActionTitleInput", { state: "visible" });
  await page.fill("#localActionTitleInput", "Manual follow up");
  await page.fill("#localActionDueInput", "2026-08-10");
  await page.click("#addLocalActionButton");
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("Manual follow up"));
  assert(await page.evaluate(() => Number.isFinite(window.__atlasDebugState?.performanceMetrics?.localActionUpdate)), "local action timing missing");

  await page.selectOption("#localActionFilterInput", "done");
  assert(!(await page.locator("#localActionListPanel").textContent()).includes("Manual follow up"), "done filter should hide open actions");
  await page.selectOption("#localActionFilterInput", "all");
  assert((await page.locator("#localActionListPanel").textContent()).includes("Manual follow up"), "all filter should show open actions");
  await page.fill("#localActionSearchInput", "Manual");
  await page.waitForTimeout(180);
  assert((await page.locator("#localActionListPanel").textContent()).includes("Manual follow up"), "keyword search should show matching actions");
  assert(!(await page.locator("#localActionListPanel").textContent()).includes("Undated action"), "keyword search should hide non-matching actions");
  await page.fill("#localActionSearchInput", "");

  await page.locator(".rationale-templates button").first().click();
  assert((await page.locator("#recommendationRationaleInput").inputValue()).length > 0, "rationale template did not fill textarea");
  await page.waitForFunction(() => document.querySelector(".recommendation-compact-summary")?.textContent.includes("可轉入"));
  await page.fill("#recommendationRationaleInput", "Test accepted rationale");
  await page.click("#acceptRecommendationButton");
  await page.waitForFunction(() => document.querySelector(".recommendation-history-item")?.textContent.includes("接受"));

  await page.click("#createActionFromRecommendationButton");
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("建議轉入"));
  await page.click("#createActionFromRecommendationButton");
  await page.waitForFunction(() => document.querySelector("#statusText")?.textContent.includes("已存在未完成行動"));

  await page.click("#completeDueLocalActionsButton");
  await page.waitForFunction(() => {
    const text = document.querySelector("#localActionReminderPanel")?.textContent || "";
    return text.includes("已到期") && text.includes("0 個");
  });
  await page.selectOption("#localActionFilterInput", "done");
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("Persisted action"));
  await page.click("#clearDoneLocalActionsButton");
  await page.waitForFunction(() => !document.querySelector("#localActionListPanel")?.textContent.includes("Persisted action"));
  await page.selectOption("#localActionFilterInput", "all");
  await page.locator("select[data-local-action-status]").first().selectOption("done");
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("完成"));

  const importPath = path.join(os.tmpdir(), `atlas-local-actions-import-${Date.now()}.json`);
  await writeFile(importPath, JSON.stringify({
    schema: "atlas-enterprise.local-actions.v1",
    actions: [{
      id: "imported-action",
      title: "Imported restore action",
      dueDate: "2026-08-11",
      status: "pending-review",
      createdFrom: "import-test",
      createdAt: "2026-08-04T00:00:00.000Z",
    }],
  }));
  await page.setInputFiles("#importLocalActionsInput", importPath);
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("Imported restore action"));
  await page.waitForFunction(() => document.querySelector("#localActionImportPreviewPanel")?.textContent.includes("匯入預覽"));
  await page.setInputFiles("#importLocalActionsInput", importPath);
  await page.waitForFunction(() => {
    const text = document.querySelector("#localActionImportPreviewPanel")?.textContent || "";
    return text.includes("重複 1 筆") && text.includes("接受 0 筆");
  });

  const invalidImportPath = path.join(os.tmpdir(), `atlas-local-actions-invalid-${Date.now()}.json`);
  await writeFile(invalidImportPath, JSON.stringify({ items: [] }));
  await page.setInputFiles("#importLocalActionsInput", invalidImportPath);
  await page.waitForFunction(() => document.querySelector("#localActionImportPreviewPanel")?.textContent.includes("找不到 actions"));

  const oversizedImportPath = path.join(os.tmpdir(), `atlas-local-actions-oversized-${Date.now()}.json`);
  await writeFile(oversizedImportPath, JSON.stringify({
    schema: "atlas-enterprise.local-actions.v1",
    actions: Array.from({ length: 60 }, (_, index) => ({
      id: `oversized-action-${index}`,
      title: `Oversized action ${index}`,
      status: "pending-review",
      createdFrom: "capacity-test",
      createdAt: `2026-08-04T00:${String(index).padStart(2, "0")}:00.000Z`,
    })),
  }));
  await page.setInputFiles("#importLocalActionsInput", oversizedImportPath);
  await page.waitForFunction(() => document.querySelector("#localActionImportPreviewPanel")?.textContent.includes("容量略過"));
  assert((await page.locator("#localActionListPanel .local-action-row").count()) === 50, "local action capacity must remain 50");

  const downloadPromise = page.waitForEvent("download");
  await page.click("#exportLocalActionsButton");
  const download = await downloadPromise;
  assert(download.suggestedFilename() === "atlas-local-actions.json", "local action export filename changed");

  await page.close();
  console.log("Local action workflow tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
