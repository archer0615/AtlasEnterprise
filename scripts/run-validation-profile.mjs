import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const profileName = process.argv[2] || "quick";
const logDir = path.join(root, "docs", "reports", "validation-profiles");
const logPathRoot = "docs/reports/validation-profiles";

const profiles = {
  quick: [
    "validate:frontend",
    "validate:runtime-boundaries",
    "validate:status-traceability",
    "validate:roadmap-architecture",
    "test:runtime-projection",
    "validate:roadmap-data-projection",
    "test:decision-workbench",
    "validate:roadmap-decision-workbench",
    "test:knowledge-pwa-ux",
    "validate:roadmap-ux-pwa",
    "test:readiness-policy",
    "test:application-bootstrap",
    "test:dom-registry",
    "test:event-listener-registry",
    "test:feature-lifecycle",
    "test:feature-integration",
    "validate:roadmap-final-readiness",
    "validate:formula-registry",
    "validate:score-policy",
    "validate:fixtures",
  ],
  feature: [
    "validate:frontend",
    "validate:runtime-boundaries",
    "validate:status-traceability",
    "validate:roadmap-architecture",
    "test:runtime-projection",
    "validate:roadmap-data-projection",
    "test:decision-workbench",
    "validate:roadmap-decision-workbench",
    "test:knowledge-pwa-ux",
    "validate:roadmap-ux-pwa",
    "test:readiness-policy",
    "test:application-bootstrap",
    "test:dom-registry",
    "test:event-listener-registry",
    "test:feature-lifecycle",
    "test:feature-integration",
    "validate:roadmap-final-readiness",
    "validate:cache-policy",
    "validate:dashboard-drift",
    "validate:runtime-fixture-drift",
    "validate:portfolio-reporting",
    "validate:cache-invalidation",
    "test:local-repositories",
    "validate:browser-workflow",
    "validate:pwa",
    "validate:offline",
    "validate:simulator",
  ],
  full: [
    "validate:frontend",
    "validate:runtime-boundaries",
    "validate:status-traceability",
    "validate:roadmap-architecture",
    "test:runtime-projection",
    "validate:roadmap-data-projection",
    "test:decision-workbench",
    "validate:roadmap-decision-workbench",
    "test:knowledge-pwa-ux",
    "validate:roadmap-ux-pwa",
    "test:readiness-policy",
    "test:application-bootstrap",
    "test:dom-registry",
    "test:event-listener-registry",
    "test:feature-lifecycle",
    "test:feature-integration",
    "validate:roadmap-final-readiness",
    "validate:formula-registry",
    "validate:score-policy",
    "validate:cache-policy",
    "validate:fixtures",
    "validate:dashboard-drift",
    "validate:runtime-fixture-drift",
    "validate:dashboard-api",
    "validate:portfolio-reporting",
    "test:dashboard-projection",
    "validate:cache-invalidation",
    "test:local-repositories",
    "validate:browser-workflow",
    "test:backup-restore-e2e",
    "validate:backup-security",
    "validate:visual-regression",
    "validate:pwa",
    "validate:offline",
    "validate:simulator",
    "validate:deployment",
    "validate:preview-smoke",
    "validate:planning-baseline",
    "validate:candidate-readiness",
  ],
  release: [
    "validate:frontend",
    "validate:runtime-boundaries",
    "validate:status-traceability",
    "validate:roadmap-architecture",
    "test:runtime-projection",
    "validate:roadmap-data-projection",
    "test:decision-workbench",
    "validate:roadmap-decision-workbench",
    "test:knowledge-pwa-ux",
    "validate:roadmap-ux-pwa",
    "test:readiness-policy",
    "test:application-bootstrap",
    "test:dom-registry",
    "test:event-listener-registry",
    "test:feature-lifecycle",
    "test:feature-integration",
    "validate:roadmap-final-readiness",
    "validate:formula-registry",
    "validate:score-policy",
    "validate:cache-policy",
    "validate:fixtures",
    "validate:dashboard-drift",
    "validate:runtime-fixture-drift",
    "validate:dashboard-api",
    "validate:portfolio-reporting",
    "test:dashboard-projection",
    "validate:cache-invalidation",
    "test:local-repositories",
    "validate:browser-workflow",
    "test:backup-restore-e2e",
    "validate:backup-security",
    "validate:visual-regression",
    "validate:pwa",
    "validate:offline",
    "validate:simulator",
    "validate:deployment",
    "validate:preview-smoke",
    "validate:release-governance",
    "validate:long-task-governance",
    "validate:release-operations",
    "validate:release-acceptance",
    "validate:release-signoff",
    "validate:archive-closure",
    "validate:post-release-monitoring",
    "validate:maintenance-readiness",
    "validate:next-release-planning",
    "validate:planning-baseline",
    "validate:candidate-readiness",
    "validate:release-backlog-acceptance",
    "validate:evidence-freeze-review",
    "validate:release-evidence-lock",
    "validate:final-release-review",
    "validate:release-closure-lock",
    "validate:handoff-readiness-review",
    "validate:archive-readiness-lock",
    "validate:archive-closure-verification",
    "validate:post-archive-monitoring",
    "validate:retirement-evidence-review",
    "validate:retirement-closure-verification",
    "validate:archive-retirement-lock",
    "validate:final-archive-audit",
  ],
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(profiles[profileName], `Unknown validation profile: ${profileName}`);

await mkdir(logDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logPath = path.join(logDir, `${profileName}-${timestamp}.log`);
const results = [];

async function runStep(scriptName) {
  const startedAt = Date.now();
  const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";
  const npmArgs = process.platform === "win32" ? ["/d", "/s", "/c", "npm", "run", scriptName] : ["run", scriptName];

  return new Promise((resolve) => {
    const child = spawn(npmCommand, npmArgs, {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });

    let output = "";
    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(text);
    });
    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stderr.write(text);
    });
    child.on("close", (exitCode) => {
      const durationMs = Date.now() - startedAt;
      resolve({ scriptName, exitCode, durationMs, output });
    });
  });
}

let failed = false;

for (const scriptName of profiles[profileName]) {
  const result = await runStep(scriptName);
  results.push(result);
  if (result.exitCode !== 0) {
    failed = true;
    break;
  }
}

const report = [
  `Validation profile: ${profileName}`,
  `Started: ${timestamp}`,
  `Log path: ${path.relative(root, logPath)}`,
  "",
  ...results.flatMap((result) => [
    `Step: ${result.scriptName}`,
    `Duration ms: ${result.durationMs}`,
    `Exit code: ${result.exitCode}`,
    "",
    result.output.trim(),
    "",
  ]),
].join("\n");

await writeFile(logPath, report, "utf8");

console.log(`Validation profile ${profileName} ${failed ? "failed" : "passed"}.`);
console.log(`Log path: ${path.relative(root, logPath)}`);

if (failed) process.exit(1);
