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
const knowledgeModule = await readText("frontend", "src", "knowledge-explorer.js");
const pwaModule = await readText("frontend", "src", "pwa-offline-state.js");
const testText = await readText("frontend", "scripts", "test-knowledge-pwa-ux.mjs");
const knowledgeDoc = await readText("docs", "architecture", "knowledge-explorer-search.md");
const designDoc = await readText("docs", "architecture", "home-navigation-design-system.md");
const pwaDoc = await readText("docs", "architecture", "pwa-offline-update-storage.md");
const runner = await readText("scripts", "run-validation-profile.mjs");
const validationProfiles = await readText("scripts", "validation-profiles.json");

for (const exportName of ["rankKnowledgeDocuments", "buildCommandPalette", "createRecentSearches", "buildRelatedDocuments", "buildRelationshipGraph"]) {
  assert(knowledgeModule.includes(`export function ${exportName}`), `Knowledge explorer missing export: ${exportName}`);
}

for (const exportName of ["createOfflineUxState", "diffCacheManifest", "classifyPwaStorageFailure"]) {
  assert(pwaModule.includes(`export function ${exportName}`), `PWA offline state missing export: ${exportName}`);
}

for (const requiredText of ["title", "heading", "keyword", "catalog", "entity", "rule", "command", "event", "Ctrl/Cmd+K", "Related documents", "Relationship graph"]) {
  assert(knowledgeDoc.includes(requiredText), `Knowledge explorer doc missing: ${requiredText}`);
}

for (const requiredText of ["Color", "Typography", "Spacing", "Radius", "Elevation", "Motion", "Breakpoints", "Desktop", "Tablet", "Mobile", "Financial Health", "Net Worth", "Cash Flow", "Goal", "Recommendation"]) {
  assert(designDoc.includes(requiredText), `Design system doc missing: ${requiredText}`);
}

for (const requiredText of ["App shell versioning", "Knowledge cache manifest", "Cache cleanup", "Update detection", "Safe activation", "Offline Indicator", "Update Available", "Apply Update", "Stale Data", "Quota Warning", "Backup Reminder", "/AtlasEnterprise/"]) {
  assert(pwaDoc.includes(requiredText), `PWA doc missing: ${requiredText}`);
}

for (const testCoverage of ["rankKnowledgeDocuments", "buildCommandPalette", "Offline", "quotaWarning", "IndexedDB Unavailable"]) {
  assert(testText.includes(testCoverage), `UX/PWA tests missing: ${testCoverage}`);
}

for (const reportName of [
  "knowledge-explorer-search-execution-report.md",
  "home-navigation-design-system-execution-report.md",
  "pwa-offline-update-storage-execution-report.md",
]) {
  const report = await readText("docs", "roadmap", reportName);
  for (const section of ["## Summary", "## Changed Files", "## Validation", "## Remaining Risks", "## Recommended Next Prompt"]) {
    assert(report.includes(section), `${reportName} missing section: ${section}`);
  }
}

assert(packageJson.scripts["test:knowledge-pwa-ux"], "Missing test:knowledge-pwa-ux script");
assert(packageJson.scripts["validate:roadmap-ux-pwa"], "Missing validate:roadmap-ux-pwa script");
assert(runner.includes('"validate:roadmap-ux-pwa"') || validationProfiles.includes('"command": "npm run validate:roadmap-ux-pwa"'), "Validation profiles must include UX/PWA validation");

console.log("Roadmap UX/PWA validation passed.");
