import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const legacyMain = await readFile(path.join(frontendRoot, "src", "legacy-main.js"), "utf8");

const lines = legacyMain.split(/\r?\n/);
const unsafeInnerHtmlLines = [];
for (let index = 0; index < lines.length; index += 1) {
  if (!lines[index].includes(".innerHTML")) continue;
  const assignment = collectAssignment(lines, index);
  if (!isSafeInnerHtmlAssignment(assignment.text)) {
    unsafeInnerHtmlLines.push(assignment.startLine);
  }
}

assert(unsafeInnerHtmlLines.length === 0, `unsafe innerHTML assignment: ${unsafeInnerHtmlLines.join(", ")}`);
assert(!/location\.href\s*=|window\.location\s*=/.test(legacyMain), "direct location navigation assignment is not allowed");
assert(!/setAttribute\(\s*["']href["']/.test(legacyMain), "dynamic href setAttribute must use an approved URL sanitizer");
assert(legacyMain.includes("new URLSearchParams(window.location.hash.replace(/^#/, \"\"))"), "hash parsing must stay bounded to URLSearchParams");
assert(legacyMain.includes("`#doc=${encodeURIComponent(id)}`"), "document hash writes must URL-encode document ids");

console.log("Static security audit passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function collectAssignment(lines, startIndex) {
  const block = [];
  for (let index = startIndex; index < lines.length; index += 1) {
    block.push(lines[index]);
    if (lines[index].trim().endsWith(";")) break;
  }
  return { startLine: startIndex + 1, text: block.join("\n") };
}

function isSafeInnerHtmlAssignment(text) {
  if (!text.includes("${")) return true;
  return [
    "escapeHtml(",
    "renderBackupDryRun(",
    "renderHeadingLinks(",
  ].some((marker) => text.includes(marker));
}
