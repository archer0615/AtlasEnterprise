import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const policy = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "generated-fixture-cache-policy.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(policy.policyVersion === "generated-fixture-cache-policy.v1", "generated fixture cache policy version mismatch");
assert(Array.isArray(policy.artifacts) && policy.artifacts.length > 0, "generated fixture cache policy missing artifacts");

for (const artifact of policy.artifacts) {
  const target = path.join(root, artifact.path);
  const info = await stat(target).catch(() => null);
  assert(info?.isFile(), `generated fixture cache policy references missing artifact: ${artifact.path}`);
  const payload = JSON.parse(await readFile(target, "utf8"));
  assert(artifact.generatedBy, `${artifact.path} missing generatedBy in cache policy`);
  if (payload.generatedBy) assert(payload.generatedBy === artifact.generatedBy, `${artifact.path} generatedBy mismatch`);
  if (payload.mode) assert(payload.mode === artifact.generatedBy, `${artifact.path} mode mismatch`);
  assert(Array.isArray(artifact.cacheKeyFields) && artifact.cacheKeyFields.length > 0, `${artifact.path} missing cache key fields`);
}

console.log(`Generated fixture cache policy validation passed with ${policy.artifacts.length} artifacts.`);
