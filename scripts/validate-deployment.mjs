import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const runner = await readFile(path.join(root, "scripts", "run-validation-profile.mjs"), "utf8");
const cachePolicy = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "generated-fixture-cache-policy.json"), "utf8"));
const dashboardRuntime = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));
const artifactManifest = JSON.parse(await readFile(path.join(root, "deployment", "artifact-manifest.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(packageJson.scripts["validate:release"], "release validation profile script is missing");
assert(runner.includes('"validate:deployment"'), "release validation profile must include deployment validation");
assert(cachePolicy.policyVersion === "generated-fixture-cache-policy.v2", "deployment cache policy version mismatch");
assert(dashboardRuntime.generatedBy === "dashboard-runtime-generator.v1", "deployment dashboard runtime artifact missing generator marker");
assert(dashboardRuntime.snapshots.every((snapshot) => snapshot.runtimeBinding?.scorePolicyVersion), "deployment dashboard runtime snapshots missing score policy version");
assert(artifactManifest.manifestVersion === "deployment-artifact-manifest.v1", "deployment artifact manifest version mismatch");
assert(Array.isArray(artifactManifest.artifacts) && artifactManifest.artifacts.length > 0, "deployment artifact manifest missing artifacts");

for (const artifact of artifactManifest.artifacts) {
  const info = await stat(path.join(root, artifact)).catch(() => null);
  assert(info?.isFile(), `deployment artifact missing: ${artifact}`);
}

console.log(`Deployment validation passed with ${artifactManifest.artifacts.length} artifacts.`);
