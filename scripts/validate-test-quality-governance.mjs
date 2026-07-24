import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const reportDir = path.join(root, "docs", "reports");
const reportPath = path.join(reportDir, "testing-architecture-quality-report.json");

const sourceRoots = ["frontend", "backend", "simulator", "scripts"];
const testScriptPattern = /(^|[\\/])(test-|validate-|benchmark-)[^\\/]+\.mjs$/;
const productionSourcePattern = /(^|[\\/])src[\\/].+\.js$/;
const violations = [];

const categories = {
  Domain: [/domain/i, /formula|score-policy|fixtures/i],
  Application: [/application/i, /bootstrap|readiness-policy|decision-workbench/i],
  Infrastructure: [/repository|persistence|dashboard-api|portfolio-reporting/i],
  Contract: [/contract|validation/i],
  Architecture: [/boundary|architecture|traceability|profile/i],
  Feature: [/feature|dashboard|widget/i],
  UI: [/dom|browser|visual|knowledge-pwa-ux/i],
  E2E: [/e2e|workflow/i],
  Security: [/security|backup-security/i],
  Validation: [/validate|validation/i],
  Persistence: [/persistence|indexeddb|cache|backup|restore/i],
  PWA: [/pwa|offline|service-worker|cache/i],
  Accessibility: [/accessibility|a11y/i],
  Performance: [/performance|benchmark/i],
};

const files = await listFiles(root);
const testFiles = files.filter((file) => testScriptPattern.test(relative(file)));
const productionFiles = files.filter((file) => productionSourcePattern.test(relative(file)));
const inventory = buildInventory(testFiles);
const coverageBaseline = await buildStaticCoverageBaseline(testFiles, productionFiles);
const gapMatrix = buildGapMatrix(inventory, coverageBaseline);

for (const file of testFiles) {
  const text = await readFile(file, "utf8");
  assertNoMatch(file, text, /\.only\s*\(/, "Focused test is prohibited");
  assertNoMatch(file, text, /\b(skip|xit|xdescribe)\s*\(/, "Permanent skipped test is prohibited");
  assertNoMatch(file, text, /expect\s*\(\s*true\s*\)\s*\.toBe\s*\(\s*true\s*\)/, "Placeholder assertion is prohibited");
  assertNoMatch(file, text, /(?:^|\n)\s*\/\/.*(?:TODO|FIXME|Placeholder)/i, "TODO or placeholder test comment is prohibited");
  assertHasAssertion(file, text);
}

for (const file of productionFiles) {
  const text = await readFile(file, "utf8");
  assertNoMatch(file, text, /from\s+["'][^"']*(?:scripts|fixtures)[^"']*["']/, "Production source must not import test scripts or fixtures");
  assertNoMatch(file, text, /@ts-ignore|@ts-nocheck|as unknown as/, "Type-safety suppression is prohibited in production source");
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(root, "scripts", "validation-profiles.json"), "utf8"));

for (const scriptName of ["test:quality-governance", "validate:quality-gates", "validate:full", "build"]) {
  if (!packageJson.scripts[scriptName]) {
    violations.push({ file: "package.json", rule: "quality command wiring", detail: `Missing script: ${scriptName}` });
  }
}

for (const profileName of ["quick", "feature", "full", "release"]) {
  const steps = manifest.profiles?.[profileName]?.steps || [];
  if (!steps.includes("quality-governance")) {
    violations.push({ file: "scripts/validation-profiles.json", rule: "quality gate profile coverage", detail: `${profileName} profile does not include quality-governance` });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  runner: "Node.js built-in assert with npm validation profiles",
  assertionLibrary: "node:assert/strict",
  mockLibrary: "Repository-local fakes and explicit dependency injection only",
  browserFramework: "Playwright for browser and visual validation",
  coverageTool: "Static module reference baseline; executable line/branch coverage is not configured",
  mutationTool: "Not configured; guarded as Not Applicable",
  testFileCount: testFiles.length,
  productionFileCount: productionFiles.length,
  inventory,
  staticCoverageBaseline: coverageBaseline,
  gapMatrix,
  violations,
};

await mkdir(reportDir, { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Atlas Test Quality Governance");
console.log(`Test files: ${testFiles.length}`);
console.log(`Production files scanned: ${productionFiles.length}`);
console.log(`Static module coverage: ${coverageBaseline.coveredProductionFiles}/${coverageBaseline.productionFileCount} (${coverageBaseline.coveragePercent}%)`);
for (const [category, entries] of Object.entries(inventory)) {
  console.log(`${category}: ${entries.fileCount}`);
}
console.log(`Violations: ${violations.length}`);
console.log(`Report: ${path.relative(root, reportPath)}`);

if (violations.length) {
  for (const violation of violations) {
    console.log(`${violation.file}: ${violation.rule} - ${violation.detail}`);
  }
  process.exit(1);
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", ".tmp"].includes(entry.name)) return [];
      return listFiles(full);
    }
    return entry.isFile() ? [full] : [];
  }));
  return nested.flat();
}

function relative(file) {
  return path.relative(root, file);
}

function assertNoMatch(file, text, pattern, rule) {
  const match = text.match(pattern);
  if (match) violations.push({ file: relative(file), rule, detail: match[0] });
}

function assertHasAssertion(file, text) {
  if (!/\bassert\.(equal|deepEqual|ok|throws|rejects|doesNotThrow|match|notEqual)|\bassert\s*\(|process\.exit\s*\(\s*1\s*\)|throw new Error/.test(text)) {
    violations.push({ file: relative(file), rule: "test assertion coverage", detail: "No assertion or explicit failing validation detected" });
  }
}

function buildInventory(paths) {
  return Object.fromEntries(Object.entries(categories).map(([category, matchers]) => {
    const matched = paths.map(relative).filter((file) => matchers.some((matcher) => matcher.test(file)));
    return [category, { fileCount: matched.length, files: matched }];
  }));
}

async function buildStaticCoverageBaseline(testPaths, sourcePaths) {
  const referenced = new Set();
  for (const file of testPaths) {
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/from\s+["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g)) {
      const specifier = match[1] || match[2];
      if (!specifier?.startsWith(".")) continue;
      const resolved = path.normalize(path.join(path.dirname(file), specifier.endsWith(".js") ? specifier : `${specifier}.js`));
      if (sourcePaths.includes(resolved)) referenced.add(resolved);
    }
  }
  const byLayer = Object.fromEntries(["domain", "application", "runtime", "repositories", "features", "shared", "infrastructure"].map((layer) => {
    const filesInLayer = sourcePaths.filter((file) => relative(file).includes(`src${path.sep}${layer}${path.sep}`));
    const covered = filesInLayer.filter((file) => referenced.has(file));
    return [layer, {
      productionFileCount: filesInLayer.length,
      coveredProductionFiles: covered.length,
      coveragePercent: percent(covered.length, filesInLayer.length),
      uncoveredFiles: filesInLayer.filter((file) => !referenced.has(file)).map(relative),
    }];
  }));
  return {
    type: "static-import-reference",
    productionFileCount: sourcePaths.length,
    coveredProductionFiles: referenced.size,
    coveragePercent: percent(referenced.size, sourcePaths.length),
    byLayer,
  };
}

function buildGapMatrix(testInventory, coverageBaseline) {
  return Object.entries(coverageBaseline.byLayer).map(([module, baseline]) => ({
    module,
    layer: module,
    risk: ["domain", "application", "repositories", "infrastructure"].includes(module) ? "High" : "Medium",
    existingTests: Object.entries(testInventory)
      .filter(([, entry]) => entry.files.some((file) => file.toLowerCase().includes(module)))
      .map(([category]) => category),
    missingTests: baseline.uncoveredFiles.slice(0, 20),
    addedTests: ["quality-governance"],
    finalCoverage: `${baseline.coveragePercent}% static module reference`,
    remainingGap: baseline.uncoveredFiles.length ? `${baseline.uncoveredFiles.length} production files are not directly referenced by test scripts` : "None",
  }));
}

function percent(numerator, denominator) {
  return denominator ? Number(((numerator / denominator) * 100).toFixed(2)) : 100;
}
