import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "knowledge", "catalog", "financial-formula-catalog.md");
const productRoot = path.join(root, "knowledge", "product");
const fixtureRoot = path.join(root, "simulator", "fixtures");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const catalog = await readFile(catalogPath, "utf8");
const formulaIds = [...catalog.matchAll(/\| (FORM-[A-Z0-9-]+) \|/g)].map((match) => match[1]);
const uniqueFormulaIds = new Set(formulaIds);

assert(formulaIds.length > 0, "financial formula catalog has no formula IDs");
assert(uniqueFormulaIds.size === formulaIds.length, "financial formula catalog has duplicate formula IDs");

const productFiles = (await readdir(productRoot)).filter((file) => file.endsWith(".md"));
const productContent = [];
for (const file of productFiles) {
  productContent.push(await readFile(path.join(productRoot, file), "utf8"));
}
const combinedProductContent = productContent.join("\n");

for (const formulaId of uniqueFormulaIds) {
  assert(combinedProductContent.includes(formulaId) || catalog.includes(formulaId), `${formulaId} is not referenced by product specifications`);
}

const fixtureFiles = (await readdir(fixtureRoot)).filter((file) => file.endsWith(".json") && !file.endsWith(".schema.json"));
for (const file of fixtureFiles) {
  const fixture = JSON.parse(await readFile(path.join(fixtureRoot, file), "utf8"));
  assert(fixture.formulaVersion, `${fixture.fixtureId} missing formulaVersion`);
  assert(fixture.references.some((reference) => reference.includes("knowledge/")), `${fixture.fixtureId} missing knowledge reference`);
}

console.log(`Formula registry validation passed with ${uniqueFormulaIds.size} formula IDs and ${fixtureFiles.length} fixtures.`);
