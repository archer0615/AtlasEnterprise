import { stat } from "node:fs/promises";
import path from "node:path";
import "./capture-playwright-screenshots.mjs";

const root = process.cwd();
const outputRoot = path.join(root, "docs", "roadmap", "visual-artifacts");
const screenshots = [
  "playwright-desktop-dashboard.png",
  "playwright-mobile-dashboard.png",
];

for (const screenshot of screenshots) {
  const info = await stat(path.join(outputRoot, screenshot));
  if (!info.isFile() || info.size < 10_000) {
    throw new Error(`${screenshot} is missing or unexpectedly small`);
  }
}

console.log("Visual regression screenshot validation passed.");
