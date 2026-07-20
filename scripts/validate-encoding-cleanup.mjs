import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const checkedExtensions = new Set([".md", ".js", ".mjs", ".json", ".html", ".css"]);
const checkedRoots = ["frontend", "knowledge", "docs", "simulator"];
const mojibakePatterns = [/�/u, /Ã/u, /Â/u];

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (checkedExtensions.has(path.extname(entry.name))) {
      yield fullPath;
    }
  }
}

const violations = [];
for (const checkedRoot of checkedRoots) {
  for await (const file of walk(path.join(root, checkedRoot))) {
    const content = await readFile(file, "utf8");
    const relativePath = path.relative(root, file).replaceAll("\\", "/");
    for (const pattern of mojibakePatterns) {
      if (pattern.test(content)) {
        violations.push(`${relativePath} contains ${pattern}`);
      }
    }
  }
}

if (violations.length) {
  throw new Error(`Encoding cleanup validation failed:\n${violations.join("\n")}`);
}

console.log("Encoding cleanup validation passed.");
