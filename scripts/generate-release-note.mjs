import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "docs", "reports", "pwa-generated-release-note.md");

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

const commitSummary = git(["log", "-5", "--oneline"]);
const status = git(["status", "--short"]) || "clean";
const validationSummary = [
  "frontend",
  "formula-registry",
  "score-policy",
  "cache-policy",
  "fixtures",
  "dashboard-drift",
  "runtime-fixture-drift",
  "dashboard-api",
  "portfolio-reporting",
  "dashboard-projection",
  "cache-invalidation",
  "local-repositories",
  "browser-workflow",
  "visual-regression",
  "pwa",
  "offline",
  "simulator",
  "deployment",
  "preview-smoke",
].map((item) => `- ${item}: planned in npm run validate`).join("\n");

const body = `# PWA Generated Release Note

Date: 2026-07-17

## Local Commit Summary

\`\`\`
${commitSummary}
\`\`\`

## Working Tree

\`\`\`
${status}
\`\`\`

## Validation Status Summary

${validationSummary}
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, body, "utf8");
console.log(`Generated ${path.relative(root, outputPath)}`);
