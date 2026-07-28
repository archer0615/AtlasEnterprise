import assert from "node:assert/strict";
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
  await page.fill("#insuranceProviderInput", "Atlas Life");
  await page.fill("#insurancePolicyNameInput", "Integration Protection");
  await page.selectOption("#insuranceCoverageTypeInput", "life");
  await page.fill("#insuranceCoverageAmountInput", "3000000");
  await page.fill("#insurancePremiumAmountInput", "2500");
  await page.selectOption("#insurancePremiumFrequencyInput", "monthly");
  await page.fill("#insuranceBeneficiaryInput", "Family");
  await page.fill("#insuranceEffectiveDateInput", "2026-07-28");
  await page.click("#createInsurancePolicyButton");
  await page.waitForFunction(() => document.querySelector("#insurancePolicyListPanel")?.textContent.includes("Integration Protection"));

  const panel = await page.locator("#insurancePolicyListPanel").textContent();
  assert(panel.includes("Atlas Life"), "insurance UI did not render provider");
  assert(panel.includes("保單數：1"), "insurance UI did not render policy count");
  await page.click("#createInsurancePolicyButton");
  await page.waitForFunction(() => document.querySelector("#insurancePolicyListPanel")?.textContent.includes("ATLAS_INSURANCE_POLICY_ALREADY_EXISTS"));
  const duplicatePanel = await page.locator("#insurancePolicyListPanel").textContent();
  assert(duplicatePanel.includes("Insurance policy name already exists"), "insurance duplicate UI did not render readable error");
  await page.fill("#insurancePremiumAmountInput", "2750");
  await page.click("[data-insurance-action='increase-premium']");
  await page.waitForFunction(() => document.querySelector("#insurancePolicyListPanel")?.textContent.includes("2750"));
  await page.click("[data-insurance-action='cancel']");
  await page.waitForFunction(() => document.querySelector("#insurancePolicyListPanel")?.textContent.includes("cancelled"));

  await page.setInputFiles("#csvImportInput", {
    name: "csv-import-insurance-valid.csv",
    mimeType: "text/csv",
    buffer: await readFile(path.join(frontendRoot, "fixtures", "csv-import-insurance-valid.csv")),
  });
  await page.click("#csvDryRunButton");
  await page.waitForFunction(() => document.querySelector("#csvImportDryRunPanel")?.textContent.includes("接受：1"));
  const csvPanel = await page.locator("#csvImportDryRunPanel").textContent();
  assert(csvPanel.includes("寫入：0"), "insurance CSV dry-run did not preserve write boundary");
  assert(csvPanel.includes("insurance"), "insurance CSV dry-run did not report entity type");

  await page.close();
  console.log("Insurance integration tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
