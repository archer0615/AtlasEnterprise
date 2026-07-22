import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { performance } from "node:perf_hooks";

const root = process.cwd();
const profileName = process.argv[2] || "quick";
const isDryRun = process.argv.includes("--dry-run");
const manifest = JSON.parse(await readFile(path.join(root, "scripts", "validation-profiles.json"), "utf8"));
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const profile = manifest.profiles[profileName];

assert(profile, `Unknown validation profile: ${profileName}`);

const startedAt = new Date();
const runId = startedAt.toISOString().replace(/[:.]/g, "-");
const logDir = path.join(root, ".tmp", "validation", runId);
const stepsDir = path.join(logDir, "steps");
await mkdir(stepsDir, { recursive: true });

const beforeStatus = await captureGitStatus();
const environment = {
  node: process.version,
  platform: process.platform,
  profile: profileName,
  dryRun: isDryRun,
};
await writeFile(path.join(logDir, "environment.json"), `${JSON.stringify(environment, null, 2)}\n`, "utf8");

const results = [];
let failed = false;

for (const stepId of profile.steps) {
  const step = manifest.steps[stepId];
  assert(step, `Profile ${profileName} references missing step: ${stepId}`);
  validateStepCommand(step);

  if (shouldSkip(step)) {
    results.push({ ...baseStepResult(step), result: "SKIPPED", exitCode: 0, durationMs: 0, failureClassification: "", failureSummary: "Platform not applicable", logPath: "" });
    continue;
  }

  const result = await runStep(step);
  results.push(result);
  if (result.result !== "PASS") {
    failed = true;
    break;
  }
}

const afterStatus = await captureGitStatus();
const sideEffects = detectSideEffects(beforeStatus, afterStatus);
if (sideEffects.length && profile.sideEffectGuard !== false) {
  failed = true;
  results.push({
    id: "side-effect-guard",
    category: "REPOSITORY_GOVERNANCE",
    command: "git status --porcelain",
    description: "Detect tracked or untracked validation side effects",
    critical: true,
    timeout: 0,
    environment: "git",
    sideEffect: "none",
    platform: "cross-platform",
    startedAt: new Date().toISOString(),
    durationMs: 0,
    result: "FAIL",
    exitCode: 1,
    failureClassification: "VALIDATION_SIDE_EFFECT",
    failureSummary: sideEffects.join("; "),
    logPath: "",
  });
}

const finishedAt = new Date();
const summary = {
  profile: profileName,
  startedAt: startedAt.toISOString(),
  finishedAt: finishedAt.toISOString(),
  durationMs: Math.round(performance.now()),
  result: failed ? "FAIL" : "PASS",
  dryRun: isDryRun,
  steps: results,
  sideEffects,
};

await writeFile(path.join(logDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
await writeFile(path.join(logDir, "summary.md"), renderSummary(summary), "utf8");

console.log("Atlas Validation Summary");
console.log(`Profile: ${profileName}`);
console.log(`Steps: ${results.length}`);
console.log(`Passed: ${results.filter((item) => item.result === "PASS").length}`);
console.log(`Failed: ${results.filter((item) => item.result === "FAIL").length}`);
console.log(`Skipped: ${results.filter((item) => item.result === "SKIPPED").length}`);
console.log(`Duration: ${summary.durationMs}ms`);
console.log(`Side effects: ${sideEffects.length ? sideEffects.join("; ") : "none"}`);
console.log(`Log path: ${path.relative(root, logDir)}`);
console.log(`Result: ${summary.result}`);

if (failed) process.exit(1);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateStepCommand(step) {
  const match = /^npm run ([\w:-]+)$/.exec(step.command);
  assert(match, `Step ${step.id} command must be an npm script: ${step.command}`);
  assert(packageJson.scripts[match[1]], `Step ${step.id} references missing package script: ${match[1]}`);
}

function shouldSkip(step) {
  if (profileName === "release" && step.critical && step.optional) return false;
  return step.platform === "windows-only" && process.platform !== "win32";
}

function baseStepResult(step) {
  return {
    id: step.id,
    category: step.category,
    command: step.command,
    description: step.description,
    critical: step.critical,
    timeout: step.timeout,
    environment: step.environment,
    sideEffect: step.sideEffect,
    platform: step.platform,
    startedAt: new Date().toISOString(),
  };
}

async function runStep(step) {
  const started = performance.now();
  const base = baseStepResult(step);
  const scriptName = step.command.replace(/^npm run /, "");
  const logPath = path.join(stepsDir, `${step.id}.log`);
  const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";
  const npmArgs = process.platform === "win32" ? ["/d", "/s", "/c", "npm", "run", scriptName, ...(isDryRun && profileName === "release" ? ["--", "--dry-run"] : [])] : ["run", scriptName, ...(isDryRun && profileName === "release" ? ["--", "--dry-run"] : [])];

  const result = await new Promise((resolve) => {
    const child = spawn(npmCommand, npmArgs, { cwd: root, stdio: ["ignore", "pipe", "pipe"], shell: false });
    let output = "";
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      output += `\nTIMEOUT after ${step.timeout}ms\n`;
    }, step.timeout);
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
      clearTimeout(timer);
      resolve({ exitCode, output, timedOut: output.includes("TIMEOUT after") });
    });
  });

  await writeFile(logPath, result.output, "utf8");
  const durationMs = Math.round(performance.now() - started);
  const failureClassification = result.exitCode === 0 ? "" : result.timedOut ? "TIMEOUT" : classifyFailure(step, result.output);
  return {
    ...base,
    durationMs,
    result: result.exitCode === 0 ? "PASS" : "FAIL",
    exitCode: result.exitCode,
    failureClassification,
    failureSummary: result.exitCode === 0 ? "" : summarizeFailure(result.output),
    logPath: path.relative(root, logPath),
  };
}

function classifyFailure(step, output) {
  if (/ERR_MODULE|SyntaxError|Unexpected token/.test(output)) return "SYNTAX";
  if (/visual|pixel drift/i.test(output)) return "VISUAL_REGRESSION";
  if (/runtime boundary|dependency direction/i.test(output)) return "RUNTIME_BOUNDARY";
  if (/fixture|not in sync|drift/i.test(output)) return "GENERATED_ARTIFACT_DRIFT";
  if (/playwright|browser|chromium/i.test(output)) return "BROWSER_TEST";
  if (/release|working tree|untracked|branch/i.test(output)) return "RELEASE_GATE";
  return step.category || "UNKNOWN";
}

function summarizeFailure(output) {
  return output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(-6).join(" | ");
}

async function captureGitStatus() {
  return new Promise((resolve) => {
    const child = spawn("git", ["status", "--porcelain"], { cwd: root, stdio: ["ignore", "pipe", "pipe"], shell: false });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk.toString(); });
    child.on("close", () => resolve(output.trim().split(/\r?\n/).filter((line) => line && !line.includes(".tmp/validation/")).sort()));
  });
}

function detectSideEffects(before, after) {
  const beforeText = before.join("\n");
  const afterText = after.join("\n");
  return beforeText === afterText ? [] : [`git status changed from ${before.length} entries to ${after.length} entries`];
}

function renderSummary(summary) {
  return [
    `# Atlas Validation Summary`,
    ``,
    `Profile: ${summary.profile}`,
    `Result: ${summary.result}`,
    `Duration: ${summary.durationMs}ms`,
    `Side effects: ${summary.sideEffects.length ? summary.sideEffects.join("; ") : "none"}`,
    ``,
    ...summary.steps.map((step) => `- ${step.id}: ${step.result}${step.failureClassification ? ` (${step.failureClassification})` : ""}`),
    ``,
  ].join("\n");
}
