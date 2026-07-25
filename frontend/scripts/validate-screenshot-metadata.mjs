import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const artifactRoot = path.join(root, "docs", "roadmap", "visual-artifacts");
const manifestPath = path.join(artifactRoot, "visual-baselines.json");
const requiredArtifacts = new Set([
  "playwright-desktop-dashboard.png",
  "playwright-mobile-dashboard.png",
]);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
assert(manifest.schema === "atlas-visual-baselines.v1", "visual baseline manifest schema mismatch");
assert(manifest.source === "frontend/scripts/capture-playwright-screenshots.mjs", "visual baseline manifest source mismatch");
assert(Array.isArray(manifest.artifacts), "visual baseline manifest missing artifacts");

const names = new Set();
for (const artifact of manifest.artifacts) {
  assert(requiredArtifacts.has(artifact.name), `unexpected visual artifact: ${artifact.name}`);
  assert(!names.has(artifact.name), `duplicate visual artifact: ${artifact.name}`);
  names.add(artifact.name);

  assert(artifact.viewport?.name, `${artifact.name} missing viewport name`);
  assert(Number.isInteger(artifact.viewport?.width) && artifact.viewport.width > 0, `${artifact.name} invalid viewport width`);
  assert(Number.isInteger(artifact.viewport?.height) && artifact.viewport.height > 0, `${artifact.name} invalid viewport height`);
  assert(Number.isInteger(artifact.dimensions?.width) && artifact.dimensions.width > 0, `${artifact.name} invalid screenshot width`);
  assert(Number.isInteger(artifact.dimensions?.height) && artifact.dimensions.height >= artifact.viewport.height, `${artifact.name} invalid screenshot height`);
  assert(/^[a-f0-9]{64}$/.test(artifact.sha256 || ""), `${artifact.name} invalid sha256`);

  const artifactPath = path.join(artifactRoot, artifact.name);
  const info = await stat(artifactPath);
  assert(info.isFile() && info.size > 10_000, `${artifact.name} missing or too small`);

  const buffer = await readFile(artifactPath);
  const dimensions = readPngDimensions(buffer);
  assert(dimensions.width === artifact.dimensions.width, `${artifact.name} width mismatch`);
  assert(dimensions.height === artifact.dimensions.height, `${artifact.name} height mismatch`);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  assert(sha256 === artifact.sha256, `${artifact.name} sha256 mismatch`);
}

for (const required of requiredArtifacts) {
  assert(names.has(required), `${required} missing from visual baseline manifest`);
}

console.log(`Screenshot metadata validation passed with ${manifest.artifacts.length} artifacts.`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readPngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Screenshot is not a PNG file");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}
