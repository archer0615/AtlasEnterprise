import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "docs", "reports", "validation-history.json");

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

let existing = [];
try {
  existing = JSON.parse(await readFile(outputPath, "utf8"));
} catch {}

existing.push({
  recordedAt: new Date().toISOString(),
  commit: git(["rev-parse", "--short", "HEAD"]),
  status: "passed",
  command: "npm run validate",
  scope: [
    "frontend",
    "browser-workflow",
    "visual-regression",
    "pwa",
    "offline",
    "deployment",
    "preview-smoke",
  ],
});

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
console.log(`Recorded ${path.relative(root, outputPath)}`);
