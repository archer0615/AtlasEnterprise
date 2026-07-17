import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const simulatorResults = await readFile(path.join(root, "simulator", "outputs", "scenario-results.json"), "utf8");
const frontendResults = await readFile(path.join(root, "frontend", "fixtures", "scenario-results.json"), "utf8");

if (simulatorResults !== frontendResults) {
  throw new Error("frontend scenario-results fixture is out of sync with simulator output");
}

console.log("Runtime fixture drift validation passed.");
