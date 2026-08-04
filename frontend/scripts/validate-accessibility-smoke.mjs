import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, "http://127.0.0.1").pathname;
    const filePath = path.join(frontendRoot, pathname === "/" ? "index.html" : pathname);
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

  for (const selector of ["main", "aside", "nav[aria-label]", "section[aria-label]", "footer[aria-label]"]) {
    assert(await page.locator(selector).count() >= 1, `${selector} is missing`);
  }

  for (const selector of ["#homeSummaryPanel", "#assetLiabilitySummaryPanel", "#cashflowSummaryPanel", "#goalSummaryPanel", "#insuranceSummaryPanel", "#recommendationRationaleInput", ".rationale-templates", "#createActionFromRecommendationButton", ".raw-data-panel", ".settings-grid", "#resetScenarioConfirmInput", "#localActionTitleInput", "#localActionDueInput", "#localActionSearchInput", "#localActionFilterInput", "#exportLocalActionsButton", "#importLocalActionsInput", "#completeDueLocalActionsButton", "#clearDoneLocalActionsButton", "#localActionReminderPanel", "#localActionImportPreviewPanel", "#localActionListPanel"]) {
    assert(await page.locator(selector).count() === 1, `${selector} is missing`);
  }

  await page.goto(`http://127.0.0.1:${server.address().port}/#settings`, { waitUntil: "networkidle" });
  assert(await page.locator("#settings[open]").count() === 1, "settings must open from hash navigation");
  assert(await page.locator('.workflow-nav a[href="#settings"][aria-current="page"]').count() === 1, "settings navigation active state missing");

  await page.goto(`http://127.0.0.1:${server.address().port}/#loan`, { waitUntil: "networkidle" });
  assert(await page.locator('.workflow-nav a[href="#dashboard"][aria-current="page"]').count() === 1, "loan hash must map to dashboard navigation");

  const statusAnnouncements = await page.locator('[role="status"][aria-live][aria-atomic="true"]').count();
  assert(statusAnnouncements >= 2, "status announcements must expose atomic aria-live regions");

  const buttonsWithoutText = await page.locator("button").evaluateAll((buttons) => buttons.filter((button) => !button.textContent.trim() && !button.getAttribute("aria-label")).length);
  assert(buttonsWithoutText === 0, "button missing text or aria-label");

  const missingLabels = await page.locator("input, select, textarea").evaluateAll((controls) => controls.filter((control) => {
    const id = control.id;
    return !control.getAttribute("aria-label") && !(id && document.querySelector(`label[for="${id}"]`)) && !control.closest("label");
  }).map((control) => `${control.tagName.toLowerCase()}#${control.id || "(no-id)"}`));
  assert(missingLabels.length === 0, `form control missing label: ${missingLabels.join(", ")}`);

  await page.keyboard.press("Tab");
  const activeTag = await page.evaluate(() => document.activeElement?.tagName);
  assert(["A", "BUTTON", "INPUT", "SELECT"].includes(activeTag), "keyboard focus did not reach an interactive element");

  console.log("Accessibility smoke validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
