import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
const documentAssets = JSON.parse(await readFile(path.join(frontendRoot, "knowledge", "document-assets.json"), "utf8"));

const requiredShellAssets = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw-version.js",
  "/src/main.js",
  "/src/dashboard-model.js",
  "/src/styles.css",
  "/fixtures/dashboard-snapshot.json",
  "/fixtures/dashboard-snapshots.json",
  "/fixtures/dashboard-runtime-snapshots.json",
  "/fixtures/generated-fixture-cache-policy.json",
  "/knowledge/index.json",
  "/knowledge/search-index.json",
  "/knowledge/document-assets.json",
  "/icons/atlas-icon.svg"
];

for (const asset of requiredShellAssets) {
  if (!serviceWorker.includes(`"${asset}"`)) {
    throw new Error(`service worker APP_SHELL is missing ${asset}`);
  }
}

if (!Array.isArray(documentAssets.documents) || documentAssets.documents.length === 0) {
  throw new Error("document asset manifest must include generated documents");
}

console.log(`Offline cache validation passed with ${requiredShellAssets.length} shell assets and ${documentAssets.documents.length} document assets.`);
