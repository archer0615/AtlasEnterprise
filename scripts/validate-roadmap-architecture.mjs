import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readText(...segments) {
  return readFile(path.join(root, ...segments), "utf8");
}

const packageJson = JSON.parse(await readText("package.json"));
const runtimeBoundary = await readText("docs", "architecture", "runtime-boundary.md");
const frontendMap = await readText("docs", "architecture", "frontend-module-map.md");
const localData = await readText("docs", "architecture", "local-data-platform.md");
const runner = await readText("scripts", "run-validation-profile.mjs");
const indexedDbRuntime = await readText("frontend", "src", "indexeddb-runtime.js");
const main = [
  await readText("frontend", "src", "main.js"),
  await readText("frontend", "src", "legacy-main.js"),
].join("\n");
const futureReport = await readText("docs", "roadmap", "future-architecture-boundary-execution-report.md");
const modularizationReport = await readText("docs", "roadmap", "frontend-modularization-execution-report.md");
const localDataReport = await readText("docs", "roadmap", "local-data-platform-execution-report.md");

for (const requiredText of [
  "Static-first",
  "Local-first",
  "Offline-first",
  "GitHub Pages PWA",
  "backend/",
  "database/",
  "ai/",
  "Prohibited",
  "Promotion Criteria",
]) {
  assert(runtimeBoundary.includes(requiredText), `Runtime boundary missing: ${requiredText}`);
}

const serverOnlyPatterns = [
  /from\s+["'][.\/]*(?:backend|database|ai)\//,
  /fetch\(["']https?:\/\//,
  /postgres(?:ql)?:\/\//i,
  /Server=.+Database=/i,
];

for (const pattern of serverOnlyPatterns) {
  assert(!pattern.test(main), `Production frontend has prohibited server-only dependency: ${pattern}`);
}

for (const requiredText of [
  "flowchart TD",
  "Bootstrap",
  "Routing/hash selection",
  "State",
  "Rendering",
  "Events",
  "Data access",
  "Projection",
  "Formatting",
  "Search",
  "Backup",
  "frontend/src/app/",
  "frontend/src/core/",
  "frontend/src/features/",
  "frontend/src/repositories/",
  "frontend/src/services/",
  "frontend/src/components/",
]) {
  assert(frontendMap.includes(requiredText), `Frontend module map missing: ${requiredText}`);
}

for (const requiredText of [
  "atlas-pwa-runtime",
  "Database version",
  "`3`",
  "metadata",
  "scenarios",
  "recommendationDecisions",
  "settings",
  "auditEntries",
  "migration-lock",
  "atlas-pwa-runtime-backup.v1",
  "atlas-pwa-runtime-encrypted-backup.v1",
  "atlas-pwa-runtime-coordination",
  "No secondary indexes",
  "Rollback policy",
]) {
  assert(localData.includes(requiredText), `Local data platform missing: ${requiredText}`);
}

for (const runtimeText of [
  'const databaseName = "atlas-pwa-runtime"',
  "const databaseVersion = 3",
  'const backupSchemaVersion = "atlas-pwa-runtime-backup.v1"',
  'const encryptedBackupFormatVersion = "atlas-pwa-runtime-encrypted-backup.v1"',
  'const coordinationChannelName = "atlas-pwa-runtime-coordination"',
  'const migrationLockKey = "migration-lock"',
]) {
  assert(indexedDbRuntime.includes(runtimeText), `IndexedDB runtime constant missing: ${runtimeText}`);
}

for (const report of [futureReport, modularizationReport, localDataReport]) {
  for (const section of ["## Summary", "## Changed Files", "## Validation", "## Remaining Risks", "## Recommended Next Prompt"]) {
    assert(report.includes(section), `Roadmap report missing section: ${section}`);
  }
}

assert(packageJson.scripts["validate:roadmap-architecture"], "Missing validate:roadmap-architecture script");
assert(runner.includes('"validate:roadmap-architecture"'), "Validation profiles must include roadmap architecture validation");

console.log("Roadmap architecture validation passed.");
