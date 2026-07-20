import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const outputRoot = path.join(root, "docs", "roadmap", "visual-artifacts");
const manifestPath = path.join(outputRoot, "visual-baselines.json");
const screenshots = [
  "playwright-desktop-dashboard.png",
  "playwright-mobile-dashboard.png",
];
const maxPixelDriftRatio = 0.35;

const baselines = new Map();
for (const screenshot of screenshots) {
  const baselinePath = path.join(outputRoot, screenshot);
  try {
    baselines.set(screenshot, await readFile(baselinePath));
  } catch {
    baselines.set(screenshot, null);
  }
}

await import("./capture-playwright-screenshots.mjs");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
assert(manifest.schema === "atlas-visual-baselines.v1", "visual baseline manifest schema mismatch");
assert(Array.isArray(manifest.artifacts), "visual baseline manifest missing artifacts");

for (const screenshot of screenshots) {
  const screenshotPath = path.join(outputRoot, screenshot);
  const info = await stat(screenshotPath);
  if (!info.isFile() || info.size < 10_000) {
    throw new Error(`${screenshot} is missing or unexpectedly small`);
  }
  const manifestArtifact = manifest.artifacts.find((artifact) => artifact.name === screenshot);
  assert(manifestArtifact, `${screenshot} missing from visual baseline manifest`);

  const baseline = baselines.get(screenshot);
  if (!baseline || process.env.CI === "true") {
    continue;
  }

  const current = await readFile(screenshotPath);
  const currentPng = decodePng(current);
  assert(manifestArtifact.dimensions?.width === currentPng.width, `${screenshot} manifest width mismatch`);
  assert(manifestArtifact.dimensions?.height === currentPng.height, `${screenshot} manifest height mismatch`);
  const diffRatio = calculatePngPixelDiffRatio(decodePng(baseline), currentPng);
  console.log(`${screenshot} pixel drift ${formatPercent(diffRatio)}`);
  if (diffRatio > maxPixelDriftRatio) {
    throw new Error(`${screenshot} pixel drift ${formatPercent(diffRatio)} exceeds ${formatPercent(maxPixelDriftRatio)}`);
  }
}

console.log("Visual regression pixel validation passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function calculatePngPixelDiffRatio(expected, actual) {
  if (expected.width !== actual.width || expected.height !== actual.height) {
    throw new Error(`Screenshot dimensions changed from ${expected.width}x${expected.height} to ${actual.width}x${actual.height}`);
  }
  let differentPixels = 0;
  const totalPixels = expected.width * expected.height;
  for (let index = 0; index < expected.pixels.length; index += 4) {
    const delta = Math.abs(expected.pixels[index] - actual.pixels[index])
      + Math.abs(expected.pixels[index + 1] - actual.pixels[index + 1])
      + Math.abs(expected.pixels[index + 2] - actual.pixels[index + 2])
      + Math.abs(expected.pixels[index + 3] - actual.pixels[index + 3]);
    if (delta > 12) {
      differentPixels += 1;
    }
  }
  return differentPixels / totalPixels;
}

function decodePng(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Screenshot is not a PNG file");
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += length + 12;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      const bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
      const interlace = data.readUInt8(12);
      if (bitDepth !== 8 || interlace !== 0 || ![2, 6].includes(colorType)) {
        throw new Error(`Unsupported PNG format bitDepth=${bitDepth} colorType=${colorType} interlace=${interlace}`);
      }
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  const channels = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * channels;
  const pixels = Buffer.alloc(width * height * 4);
  let rawOffset = 0;
  let previous = Buffer.alloc(stride);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[rawOffset];
    rawOffset += 1;
    const scanline = Buffer.from(raw.subarray(rawOffset, rawOffset + stride));
    rawOffset += stride;
    unfilterScanline(scanline, previous, channels, filter);

    for (let x = 0; x < width; x += 1) {
      const source = x * channels;
      const target = (y * width + x) * 4;
      pixels[target] = scanline[source];
      pixels[target + 1] = scanline[source + 1];
      pixels[target + 2] = scanline[source + 2];
      pixels[target + 3] = channels === 4 ? scanline[source + 3] : 255;
    }
    previous = scanline;
  }

  return { width, height, pixels };
}

function unfilterScanline(scanline, previous, bytesPerPixel, filter) {
  for (let index = 0; index < scanline.length; index += 1) {
    const left = index >= bytesPerPixel ? scanline[index - bytesPerPixel] : 0;
    const up = previous[index] || 0;
    const upLeft = index >= bytesPerPixel ? previous[index - bytesPerPixel] || 0 : 0;
    if (filter === 1) {
      scanline[index] = (scanline[index] + left) & 0xff;
    } else if (filter === 2) {
      scanline[index] = (scanline[index] + up) & 0xff;
    } else if (filter === 3) {
      scanline[index] = (scanline[index] + Math.floor((left + up) / 2)) & 0xff;
    } else if (filter === 4) {
      scanline[index] = (scanline[index] + paethPredictor(left, up, upLeft)) & 0xff;
    } else if (filter !== 0) {
      throw new Error(`Unsupported PNG filter ${filter}`);
    }
  }
}

function paethPredictor(left, up, upLeft) {
  const estimate = left + up - upLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upLeftDistance = Math.abs(estimate - upLeft);
  if (leftDistance <= upDistance && leftDistance <= upLeftDistance) return left;
  if (upDistance <= upLeftDistance) return up;
  return upLeft;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}
