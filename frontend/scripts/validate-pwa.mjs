import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const requiredFiles = [
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  "sw-version.js",
  "src/main.js",
  "src/indexeddb-runtime.js",
  "src/pwa-runtime-resilience.js",
  "src/dashboard-model.js",
  "src/styles.css",
  "fixtures/dashboard-snapshot.json",
  "fixtures/dashboard-snapshots.json",
  "fixtures/dashboard-runtime-snapshots.json",
  "fixtures/dashboard-field-traceability.json",
  "fixtures/scenario-results.json",
  "knowledge/index.json",
  "knowledge/search-index.json",
  "knowledge/document-assets.json",
  "icons/atlas-icon.svg",
];

async function assertFile(relativePath) {
  const file = path.join(frontendRoot, relativePath);
  const info = await stat(file);
  if (!info.isFile()) {
    throw new Error(`${relativePath} is not a file`);
  }
}

for (const file of requiredFiles) {
  await assertFile(file);
}

const manifest = JSON.parse(await readFile(path.join(frontendRoot, "manifest.webmanifest"), "utf8"));
if (manifest.display !== "standalone") {
  throw new Error("manifest.display must be standalone");
}
if (!manifest.start_url) {
  throw new Error("manifest.start_url is required");
}
if (manifest.scope !== "./") {
  throw new Error("manifest.scope must stay within the frontend app");
}
if (manifest.orientation !== "any") {
  throw new Error("manifest.orientation must support desktop and mobile recovery");
}
if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
  throw new Error("manifest.icons must include at least one icon");
}

const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
const serviceWorkerVersion = await readFile(path.join(frontendRoot, "sw-version.js"), "utf8");
if (!serviceWorker.includes('importScripts("sw-version.js")')) {
  throw new Error("service worker must import sw-version.js");
}
if (!serviceWorker.includes("ATLAS_SW_HEALTH") || !serviceWorker.includes("ATLAS_SW_SKIP_WAITING")) {
  throw new Error("service worker must expose health and update lifecycle messages");
}
for (const file of requiredFiles.filter((item) => item !== "sw.js")) {
  const url = file.replaceAll("\\", "/");
  if (!serviceWorker.includes(url)) {
    throw new Error(`service worker cache is missing ${url}`);
  }
}

const knowledgeIndex = JSON.parse(await readFile(path.join(frontendRoot, "knowledge", "index.json"), "utf8"));
if (!Array.isArray(knowledgeIndex.documents) || knowledgeIndex.documents.length === 0) {
  throw new Error("knowledge index has no documents");
}

const searchIndex = JSON.parse(await readFile(path.join(frontendRoot, "knowledge", "search-index.json"), "utf8"));
const documentAssets = JSON.parse(await readFile(path.join(frontendRoot, "knowledge", "document-assets.json"), "utf8"));
const documentFiles = (await readdir(path.join(frontendRoot, "knowledge", "documents"))).filter((file) => file.endsWith(".json"));
if (!knowledgeIndex.buildId || searchIndex.buildId !== knowledgeIndex.buildId || documentAssets.buildId !== knowledgeIndex.buildId) {
  throw new Error("generated knowledge files must share the same buildId");
}
if (!serviceWorkerVersion.includes(`atlas-knowledge-${knowledgeIndex.buildId}`)) {
  throw new Error("service worker cache version must match knowledge buildId");
}
if (!Array.isArray(searchIndex.documents) || searchIndex.documents.length !== knowledgeIndex.documents.length) {
  throw new Error("search index document count must match knowledge index");
}
if (documentFiles.length !== knowledgeIndex.documents.length) {
  throw new Error("generated document file count must match knowledge index");
}
if (!Array.isArray(documentAssets.documents) || documentAssets.documents.length !== knowledgeIndex.documents.length) {
  throw new Error("document asset count must match knowledge index");
}
for (const doc of knowledgeIndex.documents) {
  if (!documentFiles.includes(`${doc.id}.json`)) {
    throw new Error(`generated document is missing ${doc.id}.json`);
  }
  if (!documentAssets.documents.includes(`knowledge/documents/${doc.id}.json`)) {
    throw new Error(`document asset list is missing ${doc.id}.json`);
  }
}

console.log(`PWA validation passed with ${knowledgeIndex.documents.length} knowledge documents.`);
