import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const outputRoot = path.join(root, "docs", "roadmap", "visual-artifacts");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://127.0.0.1").pathname;
  const normalized = pathname === "/" ? "/index.html" : pathname;
  return path.join(frontendRoot, normalized);
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

await mkdir(outputRoot, { recursive: true });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

const { port } = server.address();
const browser = await chromium.launch();

try {
  const viewports = [
    { name: "desktop", width: 1440, height: 1100 },
    { name: "mobile", width: 390, height: 1200 },
  ];
  const artifacts = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    const filename = `playwright-${viewport.name}-dashboard.png`;
    const screenshotPath = path.join(outputRoot, filename);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    const screenshot = await readFile(screenshotPath);
    artifacts.push({
      name: filename,
      viewport,
      dimensions: readPngDimensions(screenshot),
      sha256: createHash("sha256").update(screenshot).digest("hex"),
    });
    await page.close();
  }

  await writeFile(path.join(outputRoot, "visual-baselines.json"), JSON.stringify({
    schema: "atlas-visual-baselines.v1",
    source: "frontend/scripts/capture-playwright-screenshots.mjs",
    artifacts,
  }, null, 2), "utf8");

  console.log(`Captured Playwright screenshots in ${path.relative(root, outputRoot)}`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

function readPngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Screenshot is not a PNG file");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}
