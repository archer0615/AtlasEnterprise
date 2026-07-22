import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "frontend", "src");
const violations = [];
const warnings = [];

async function listJsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listJsFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".js") ? [fullPath] : [];
  }));
  return nested.flat();
}

function normalizeImport(sourceFile, specifier) {
  if (!specifier.startsWith(".")) return specifier;
  return path.normalize(path.join(path.dirname(sourceFile), specifier));
}

function addViolation(rule, sourceFile, importedFile, statement, direction) {
  violations.push({
    rule,
    sourceFile: path.relative(root, sourceFile),
    importedFile: importedFile.startsWith(root) ? path.relative(root, importedFile) : importedFile,
    statement,
    direction,
  });
}

function isInside(file, segment) {
  return path.relative(path.join(srcRoot, segment), file).startsWith("..") === false;
}

const files = await listJsFiles(srcRoot);
const graph = new Map();

for (const file of files) {
  const text = await readFile(file, "utf8");
  const imports = [...text.matchAll(/import\s+(?:[^"']+\s+from\s+)?["']([^"']+)["']/g)];
  graph.set(file, imports.map((match) => normalizeImport(file, match[1])));

  for (const match of imports) {
    const statement = match[0];
    const imported = normalizeImport(file, match[1]);
    const importedText = imported;

    if (path.basename(file) === "main.js" && !importedText.includes(`${path.sep}app${path.sep}`)) {
      addViolation("main.js only imports app layer", file, imported, statement, "main -> app");
    }
    if (file.includes(`${path.sep}features${path.sep}`) && file.endsWith("-view.js") && /indexeddb-runtime|runtime-projection|decision-workbench|knowledge-explorer|pwa-offline-state|readiness-policy|repositories/.test(importedText)) {
      addViolation("views do not import repositories or runtime modules", file, imported, statement, "controller -> runtime/repository, view -> shared");
    }
    if (/runtime-projection|decision-workbench|knowledge-explorer|pwa-offline-state|readiness-policy|dashboard-model/.test(path.basename(file)) && importedText.includes(`${path.sep}features${path.sep}`)) {
      addViolation("runtime modules do not import features", file, imported, statement, "features -> runtime");
    }
    if (isInside(file, "shared") && importedText.includes(`${path.sep}features${path.sep}`)) {
      addViolation("shared does not import features", file, imported, statement, "features -> shared");
    }
    if (file.includes(`${path.sep}features${path.sep}`) && importedText.includes(`${path.sep}fixtures${path.sep}`)) {
      addViolation("feature modules do not import fixtures", file, imported, statement, "test/demo adapter -> fixtures");
    }
    if (importedText.includes(`${path.sep}scripts${path.sep}`)) {
      addViolation("production modules do not import test scripts", file, imported, statement, "scripts -> production");
    }
    if (importedText.includes(`${path.sep}knowledge${path.sep}`) && !importedText.includes(`${path.sep}src${path.sep}features${path.sep}knowledge${path.sep}`) && !importedText.includes(`${path.sep}frontend${path.sep}knowledge${path.sep}`)) {
      addViolation("browser runtime does not import canonical knowledge", file, imported, statement, "generator -> canonical knowledge -> generated artifact");
    }
    if (file.includes(`${path.sep}service-worker.js`) && importedText.includes(`${path.sep}features${path.sep}`)) {
      addViolation("service worker does not import feature modules", file, imported, statement, "PWA adapter -> service worker contract");
    }
  }

  if (/runtime-projection|decision-workbench|knowledge-explorer|readiness-policy|dashboard-model/.test(path.basename(file)) && /\b(HTMLElement|alert|localStorage|indexedDB)\b/.test(text)) {
    addViolation("runtime modules do not depend on DOM or persistence globals", file, file, "browser global reference", "application/infrastructure injects environment");
  }
}

const visiting = new Set();
const visited = new Set();
function visit(file, stack = []) {
  if (visiting.has(file)) {
    addViolation("no circular imports", file, file, stack.concat(file).map((item) => path.relative(root, item)).join(" -> "), "acyclic dependency graph");
    return;
  }
  if (visited.has(file)) return;
  visiting.add(file);
  for (const imported of graph.get(file) || []) {
    const resolved = imported.endsWith(".js") ? imported : `${imported}.js`;
    if (graph.has(resolved)) visit(resolved, stack.concat(file));
  }
  visiting.delete(file);
  visited.add(file);
}
files.forEach((file) => visit(file));

console.log("Runtime Boundary Validation");
console.log(`Files scanned: ${files.length}`);
console.log("Rules evaluated: 10");
console.log(`Violations: ${violations.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const violation of violations) {
  console.log(`\nRule: ${violation.rule}`);
  console.log(`Source file: ${violation.sourceFile}`);
  console.log(`Imported file: ${violation.importedFile}`);
  console.log(`Import statement: ${violation.statement}`);
  console.log(`Recommended dependency direction: ${violation.direction}`);
}
console.log(`\nResult: ${violations.length ? "FAIL" : "PASS"}`);

if (violations.length) process.exit(1);
