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
  await page.waitForFunction(() => document.querySelector("#localActionListPanel")?.textContent.includes("Persisted action"));
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

  await page.selectOption("#localActionFilterInput", "done");
  assert(!(await page.locator("#localActionListPanel").textContent()).includes("Manual follow up"), "done filter should hide open actions");
  await page.selectOption("#localActionFilterInput", "all");
  assert((await page.locator("#localActionListPanel").textContent()).includes("Manual follow up"), "all filter should show open actions");

  await page.locator(".rationale-templates button").first().click();
  assert((await page.locator("#recommendationRationaleInput").inputValue()).length > 0, "rationale template did not fill textarea");

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
