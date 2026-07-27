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
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  const result = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    const inventory = module.getIndexedDbPersistenceInventory();
    const database = await new Promise((resolve, reject) => {
      const request = indexedDB.open("atlas-pwa-runtime", inventory.databaseVersion);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const storeNames = [...database.objectStoreNames];
    const scenarios = database.transaction("scenarios", "readonly").objectStore("scenarios");
    database.close();
    return {
      databaseVersion: inventory.databaseVersion,
      hasPositionsStore: storeNames.includes("positions"),
      hasScenariosStore: storeNames.includes("scenarios"),
      scenarioKeyPath: scenarios.keyPath,
      inventoryHasPositions: Boolean(inventory.stores.positions),
    };
  });
  assert(result.hasScenariosStore, "existing scenarios store must remain available");
  assert(result.scenarioKeyPath === "scenarioId", "existing scenario key path changed");
  assert(!result.hasPositionsStore, "positions IndexedDB store must not exist before selected migration batch");
  assert(!result.inventoryHasPositions, "positions inventory must not exist before selected migration batch");
  await page.close();
  console.log("Position IndexedDB migration gate tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
