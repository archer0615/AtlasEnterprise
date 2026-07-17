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

async function waitForText(page, selector, text) {
  await page.waitForFunction(
    ({ selector: currentSelector, text: expectedText }) => document.querySelector(currentSelector)?.textContent.includes(expectedText),
    { selector, text },
  );
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

  for (const selector of ["#releaseDashboardPanel", "#sampleExportButton", "#sampleBackupButton", "#cacheVersionText", "#exportPreviewPanel", "#scenarioComparisonPanel", "#backupDryRunPanel", "#recommendationHistoryPanel", "#resetLoanButton"]) {
    assert(await page.locator(selector).count() === 1, `${selector} is missing`);
  }
  await waitForText(page, "#releaseDashboardPanel", "驗證");
  await waitForText(page, "#cacheVersionText", "快取版本");
  await page.click("#sampleExportButton");
  await waitForText(page, "#exportPreviewPanel", "投資回撤壓力測試");
  await page.click("#sampleBackupButton");
  await waitForText(page, "#sampleLoaderPanel", "backup-sample");

  await page.getByRole("button", { name: "投資回撤壓力測試" }).click();
  await waitForText(page, "#portfolioReportPanel", "壓力後投資組合價值");
  await waitForText(page, "#exportPreviewPanel", "情境代碼");
  await page.click("#exportPortfolioReportButton");
  await waitForText(page, "#runtimeFeedback", "已匯出中文化報表");
  await page.click("#acceptRecommendationButton");
  await waitForText(page, "#runtimeFeedback", "建議已接受");
  await waitForText(page, "#recommendationDecisionLog", "接受");
  await page.selectOption("#recommendationFilterInput", "accepted");
  await waitForText(page, "#recommendationHistoryPanel", "接受");

  await page.getByRole("button", { name: "貸款轉貸利率壓力" }).click();
  await waitForText(page, "#loanScenarioPanel", "再融資月付款");
  await page.fill("#loanBalanceInput", "-1");
  await page.fill("#loanRateInput", "2.4");
  await page.fill("#loanMonthsInput", "180");
  await page.click("#calculateLoanButton");
  await waitForText(page, "#runtimeFeedback", "本金必須大於 0");
  assert(await page.locator("#loanBalanceInput.invalid-input").count() === 1, "loan validation state is missing");
  await page.click("#resetLoanButton");
  await waitForText(page, "#runtimeFeedback", "貸款輸入已重設");
  await page.fill("#loanBalanceInput", "1200000");
  await page.fill("#loanRateInput", "2.4");
  await page.fill("#loanMonthsInput", "180");
  await page.click("#calculateLoanButton");
  await waitForText(page, "#loanEditableOutput", "月付款");
  await page.click("#rejectRecommendationButton");
  await waitForText(page, "#runtimeFeedback", "建議已拒絕");

  await page.fill("#scenarioNameInput", "A");
  await page.click("#saveScenarioButton");
  await waitForText(page, "#runtimeFeedback", "情境名稱至少需要 2 個字");
  await page.fill("#scenarioNameInput", "Playwright local scenario");
  await page.fill("#scenarioScoreInput", "88");
  await page.click("#saveScenarioButton");
  await waitForText(page, "#runtimeFeedback", "自訂情境已儲存");
  await waitForText(page, "#scenarioComparisonPanel", "Playwright local scenario");

  await page.locator(".advanced-controls").evaluate((element) => { element.open = true; });
  await page.click("#applyBackupButton");
  await waitForText(page, "#runtimeFeedback", "請先勾選確認覆蓋本機情境");
  await page.setInputFiles("#importBackupInput", {
    name: "atlas-pwa-runtime-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({
      schema: "atlas-pwa-runtime-backup.v1",
      exportedAt: "2026-07-17T00:00:00.000Z",
      databaseVersion: 2,
      scenarios: [{ scenarioId: "playwright-imported", name: "Playwright imported scenario", score: "91", status: "IndexedDB", savedAt: "2026-07-17T00:00:00.000Z" }],
    })),
  });
  await waitForText(page, "#backupPreview", "備份情境：1 筆");
  await waitForText(page, "#backupDryRunPanel", "預演結果");
  await page.check("#restoreConfirmInput");
  await page.click("#applyBackupButton");
  await waitForText(page, "#runtimeFeedback", "備份已套用");
  assert(await page.locator("#scenarioList").getByText("Playwright imported scenario").count() === 1, "imported scenario is missing");

  await page.close();
  console.log("Browser workflow validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
