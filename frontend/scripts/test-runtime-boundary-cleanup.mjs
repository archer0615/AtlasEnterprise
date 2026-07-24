import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createFrontendCompositionRoot } from "../src/app/composition-root.js";

const root = process.cwd();
const frontendSrc = path.join(root, "frontend", "src");
const files = await listJavaScriptFiles(frontendSrc);

const groups = {
  domain: files.filter((file) => file.includes(`${path.sep}domain${path.sep}`)),
  application: files.filter((file) => file.includes(`${path.sep}application${path.sep}`)),
  features: files.filter((file) => file.includes(`${path.sep}features${path.sep}`)),
  repositories: files.filter((file) => file.includes(`${path.sep}repositories${path.sep}`)),
  app: files.filter((file) => file.includes(`${path.sep}app${path.sep}`)),
};

await assertNoPattern(groups.domain, /\b(window|document|navigator|localStorage|sessionStorage|indexedDB|BroadcastChannel|caches)\b|indexeddb-runtime|Date\.now\(|crypto\.randomUUID/, "Domain must not depend on browser, store, cache, or infrastructure APIs");
await assertNoPattern(groups.application, /\b(window|document|navigator|localStorage|sessionStorage|indexedDB|BroadcastChannel|caches)\b|indexeddb-runtime|crypto\.randomUUID|Date\.now\(/, "Application must use injected platform contracts");
await assertNoPattern(groups.features, /from\s+["'][^"']*features\/|from\s+["'][^"']*indexeddb-runtime|import\(["'][^"']*indexeddb-runtime/, "Feature modules must not deep import other features or IndexedDB infrastructure");
await assertNoPattern(groups.repositories, /from\s+["'][^"']*features\/|from\s+["'][^"']*app\/|from\s+["'][^"']*state-store/, "Repository contracts must not depend on UI, app runtime, or store");
await assertNoPattern(files, /@ts-ignore|@ts-nocheck|TODO|FIXME|Placeholder/, "Runtime boundary cleanup must not add suppressions or placeholders");

const compositionRoot = await readFile(path.join(frontendSrc, "app", "composition-root.js"), "utf8");
assert.match(compositionRoot, /getBackupRepository/, "Composition root must own concrete backup repository resolution");
assert.match(compositionRoot, /createLazyBackupRepository/, "Feature backup repository access must be injected through an adapter");

const runtimeContext = await readFile(path.join(frontendSrc, "app", "runtime-context.js"), "utf8");
assert(!/resolve\(|indexedDb|transaction|objectStore/.test(runtimeContext), "Runtime context must not expose service locator or persistence internals");

const documentRef = { querySelector() { return null; } };
const backupRepository = {
  async dryRunImport() { return { ok: true }; },
  async importBackup() { return { restoredRecords: {} }; },
};
const rootInstance = createFrontendCompositionRoot({ documentRef, backupRepository, loadRuntime: async () => ({}) });
await rootInstance.initialize();
assert.deepEqual(rootInstance.stores.list().map((item) => item.id), ["runtime", "session", "user", "dashboard", "navigation", "notification", "dialog", "theme", "preference", "cache", "feature"]);
assert.throws(() => rootInstance.services.register("dom", () => ({})), /Duplicate service registration/);
rootInstance.dispose();

console.log("Runtime boundary cleanup tests passed.");

async function assertNoPattern(targetFiles, pattern, message) {
  const violations = [];
  for (const file of targetFiles) {
    const text = await readFile(file, "utf8");
    if (pattern.test(text)) violations.push(path.relative(root, file));
  }
  assert.deepEqual(violations, [], message);
}

async function listJavaScriptFiles(directory) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listJavaScriptFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".js")) return [fullPath];
    return [];
  }));
  return nested.flat();
}
