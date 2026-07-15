import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const requiredFiles = [
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  "src/main.js",
  "src/styles.css",
  "knowledge/index.json",
  "knowledge/search-index.json",
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
if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
  throw new Error("manifest.icons must include at least one icon");
}

const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
for (const file of requiredFiles.filter((item) => item !== "sw.js")) {
  const url = `/${file.replaceAll("\\", "/")}`;
  if (!serviceWorker.includes(url)) {
    throw new Error(`service worker cache is missing ${url}`);
  }
}

const knowledgeIndex = JSON.parse(await readFile(path.join(frontendRoot, "knowledge", "index.json"), "utf8"));
if (!Array.isArray(knowledgeIndex.documents) || knowledgeIndex.documents.length === 0) {
  throw new Error("knowledge index has no documents");
}

console.log(`PWA validation passed with ${knowledgeIndex.documents.length} knowledge documents.`);
