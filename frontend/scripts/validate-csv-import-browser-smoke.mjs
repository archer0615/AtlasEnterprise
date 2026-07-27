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
  ".csv": "text/csv; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
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
  await page.setInputFiles("#csvImportInput", {
    name: "csv-import-assets-valid.csv",
    mimeType: "text/csv",
    buffer: await readFile(path.join(frontendRoot, "fixtures", "csv-import-assets-valid.csv")),
  });
  await page.click("#csvDryRunButton");
  await page.waitForFunction(() => document.querySelector("#csvImportDryRunPanel")?.textContent.includes("CSV 匯入預演"));
  const text = await page.locator("#csvImportDryRunPanel").textContent();
  assert(text.includes("寫入：0"), "CSV dry-run UI did not preserve write boundary");
  assert(text.includes("接受：1"), "CSV dry-run UI did not show accepted row count");
  await page.setInputFiles("#csvImportInput", {
    name: "csv-import-formula-injection.csv",
    mimeType: "text/csv",
    buffer: await readFile(path.join(frontendRoot, "fixtures", "csv-import-formula-injection.csv")),
  });
  await page.click("#csvDryRunButton");
  await page.waitForFunction(() => document.querySelector("#csvImportDryRunPanel")?.textContent.includes("FORMULA_INJECTION"));
  const errorText = await page.locator("#csvImportDryRunPanel").textContent();
  assert(errorText.includes("拒絕：1"), "CSV dry-run UI did not reject unsafe fixture");
  await page.close();
  console.log("CSV import browser smoke validation passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
