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
const readme = await readText("README.md");
const currentStatus = await readText("docs", "status", "current-status.md");
const featureMatrix = await readText("docs", "status", "feature-matrix.md");
const architectureStatus = await readText("docs", "status", "architecture-status.md");
const validationStatus = await readText("docs", "status", "validation-status.md");
const nextPriority = await readText("docs", "status", "next-priority.md");
const traceability = JSON.parse(await readText("docs", "status", "specification-runtime-traceability.json"));

const statusFiles = [
  "docs/status/current-status.md",
  "docs/status/feature-matrix.md",
  "docs/status/architecture-status.md",
  "docs/status/validation-status.md",
  "docs/status/next-priority.md",
  "docs/status/specification-runtime-traceability.json",
];

for (const statusFile of statusFiles) {
  assert(readme.includes(statusFile), `README missing status link: ${statusFile}`);
}

for (const requiredText of [
  "Static-first",
  "Local-first",
  "Offline-first",
  "knowledge/**/*.md",
  "frontend/knowledge/**",
  "Future optional architecture",
]) {
  assert(currentStatus.includes(requiredText), `Current status missing: ${requiredText}`);
}

for (const requiredText of ["Knowledge catalog", "PWA shell", "IndexedDB runtime", "Simulator fixtures", "Backend API"]) {
  assert(featureMatrix.includes(requiredText), `Feature matrix missing: ${requiredText}`);
}

for (const requiredText of ["metadata", "scenarios", "recommendationDecisions", "settings", "auditEntries"]) {
  assert(architectureStatus.includes(requiredText), `Architecture status missing IndexedDB store: ${requiredText}`);
}

for (const command of ["npm run build:knowledge", "npm run validate:frontend", "npm run validate:pwa", "npm run validate:offline"]) {
  assert(validationStatus.includes(command), `Validation status missing command: ${command}`);
}

assert(nextPriority.includes("Not Implemented"), "Next priority must preserve explicit Not Implemented guidance");
assert(traceability.schema === "atlas-enterprise.specification-runtime-traceability.v1", "Traceability schema mismatch");
assert(traceability.runtimeBoundary.canonicalSource === "knowledge/**/*.md", "Traceability canonical source mismatch");
assert(traceability.runtimeBoundary.generatedOutput === "frontend/knowledge/**", "Traceability generated output mismatch");

const requiredDomains = [
  "User",
  "Asset",
  "Liability",
  "Loan/Mortgage",
  "Income",
  "Expense",
  "CashFlow",
  "Goal",
  "Portfolio",
  "Position",
  "Scenario",
  "Decision",
  "Recommendation",
  "Notification",
];

const domains = new Set(traceability.items.map((item) => item.domain));
for (const domain of requiredDomains) {
  assert(domains.has(domain), `Traceability missing domain: ${domain}`);
}

for (const item of traceability.items) {
  assert(item.status, `Traceability item missing status: ${item.domain}`);
  assert(Array.isArray(item.specification), `Traceability item missing specification array: ${item.domain}`);
  assert(Array.isArray(item.runtimeModel), `Traceability item missing runtimeModel array: ${item.domain}`);
  assert(Array.isArray(item.repository), `Traceability item missing repository array: ${item.domain}`);
  assert(Array.isArray(item.serviceOrProjection), `Traceability item missing serviceOrProjection array: ${item.domain}`);
  assert(Array.isArray(item.fixture), `Traceability item missing fixture array: ${item.domain}`);
  assert(Array.isArray(item.ui), `Traceability item missing ui array: ${item.domain}`);
  assert(Array.isArray(item.test), `Traceability item missing test array: ${item.domain}`);
}

assert(packageJson.scripts["validate:status-traceability"], "Status traceability validation script is missing");
assert(packageJson.scripts["validate:quick"]?.includes("run-validation-profile.mjs quick"), "Quick validation profile is missing");
assert(packageJson.scripts.validate === "npm run validate:quick", "Default validation must use quick profile");

console.log("Status traceability validation passed.");
