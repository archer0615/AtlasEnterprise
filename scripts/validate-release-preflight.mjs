import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const requiredFiles = [
  "frontend/index.html",
  "frontend/sw.js",
  "frontend/manifest.webmanifest",
  "frontend/src/main.js",
  "frontend/knowledge/index.json",
  "package.json",
  "package-lock.json",
  "README.md",
  "docs/status/validation-status.md",
  "docs/status/validation-profiles.md"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function git(args) {
  return spawnSync("git", args, { cwd: root, encoding: "utf8" });
}

assert(git(["rev-parse", "--verify", "HEAD"]).status === 0, "HEAD does not exist");

const status = git(["status", "--porcelain"]).stdout.trim().split(/\r?\n/).filter(Boolean);
if (!dryRun) {
  assert(status.length === 0, "Release validation requires a clean working tree");
}

for (const file of requiredFiles) {
  await access(path.join(root, file));
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
for (const scriptName of ["validate:quick", "validate:feature", "validate:full", "validate:release", "validate:runtime-boundaries"]) {
  assert(packageJson.scripts[scriptName], `Missing package script: ${scriptName}`);
}

const serviceWorker = await readFile(path.join(root, "frontend", "sw.js"), "utf8");
const manifest = await readFile(path.join(root, "frontend", "manifest.webmanifest"), "utf8");
assert(serviceWorker.includes("index.html"), "Service worker cache asset paths are incomplete");
assert(manifest.includes("icons/atlas-icon.svg"), "Manifest icon path is missing");

console.log(`Release preflight validation passed${dryRun ? " in dry-run mode" : ""}.`);
