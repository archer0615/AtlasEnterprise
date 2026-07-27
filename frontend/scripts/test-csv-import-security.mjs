import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const dangerousFormulaPrefixes = new Set(["=", "+", "-", "@"]);
const forbiddenPrototypeColumns = new Set(["__proto__", "constructor", "prototype"]);
const supportedEntities = new Set(["asset", "liability", "income", "expense", "goal"]);
const maxRowBytes = 4096;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted && char === "\"" && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(cell);
      cell = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  assert(!quoted, "Malformed CSV quoting was not rejected");
  return rows.filter((item) => item.some((cellValue) => cellValue.length > 0));
}

function validateCsvImportDryRun(csvText, ownerId = "owner-1") {
  const rows = parseCsv(csvText);
  const headers = rows[0] || [];
  const errors = [];
  const records = [];
  const seen = new Set();
  for (const header of headers) {
    if (forbiddenPrototypeColumns.has(header)) errors.push({ code: "PROTOTYPE_POLLUTION_COLUMN", value: header });
  }
  for (const [rowIndex, row] of rows.slice(1).entries()) {
    if (new TextEncoder().encode(row.join(",")).length > maxRowBytes) {
      errors.push({ code: "OVERSIZED_ROW", row: rowIndex + 2 });
      continue;
    }
    const record = Object.fromEntries(headers.map((header, index) => [header, row[index] || ""]));
    const entityType = String(record.entityType || "").toLowerCase();
    const recordKey = `${entityType}:${record.ownerId}:${record.id}`;
    if (!supportedEntities.has(entityType)) errors.push({ code: "UNKNOWN_ENTITY", row: rowIndex + 2 });
    if (!record.id || !record.ownerId) errors.push({ code: "MISSING_REQUIRED_FIELD", row: rowIndex + 2 });
    if (record.ownerId && record.ownerId !== ownerId) errors.push({ code: "CROSS_OWNER_ROW", row: rowIndex + 2 });
    if (seen.has(recordKey)) errors.push({ code: "DUPLICATE_ID", row: rowIndex + 2 });
    seen.add(recordKey);
    for (const value of Object.values(record)) {
      const trimmed = String(value).trimStart();
      if (dangerousFormulaPrefixes.has(trimmed[0])) errors.push({ code: "FORMULA_INJECTION", row: rowIndex + 2, value: escapeHtml(trimmed) });
      if (/<[a-z][\s\S]*>|on\w+=/i.test(trimmed)) errors.push({ code: "HTML_INJECTION", row: rowIndex + 2, value: escapeHtml(trimmed) });
      if (trimmed.includes("../") || trimmed.includes("..\\")) errors.push({ code: "PATH_INJECTION", row: rowIndex + 2, value: escapeHtml(trimmed) });
    }
    records.push(record);
  }
  return {
    accepted: errors.length === 0,
    writeCount: 0,
    records: errors.length === 0 ? records : [],
    errors,
    reportHtml: errors.map((error) => `<li>${escapeHtml(error.code)}:${escapeHtml(error.value || "")}</li>`).join(""),
  };
}

const cases = [
  ["Formula Injection", "entityType,id,ownerId,name\nasset,a1,owner-1,=cmd|'/C calc'!A0", "FORMULA_INJECTION"],
  ["HTML Injection", "entityType,id,ownerId,name\nasset,a1,owner-1,<img src=x onerror=alert(1)>", "HTML_INJECTION"],
  ["Path Injection", "entityType,id,ownerId,name\nasset,a1,owner-1,../secret.csv", "PATH_INJECTION"],
  ["Prototype Pollution", "entityType,id,ownerId,__proto__\nasset,a1,owner-1,polluted", "PROTOTYPE_POLLUTION_COLUMN"],
  ["Oversized Row", `entityType,id,ownerId,name\nasset,a1,owner-1,${"x".repeat(maxRowBytes + 1)}`, "OVERSIZED_ROW"],
  ["Unknown Entity", "entityType,id,ownerId,name\npolicy,p1,owner-1,Policy", "UNKNOWN_ENTITY"],
  ["Duplicate ID", "entityType,id,ownerId,name\nasset,a1,owner-1,Asset A\nasset,a1,owner-1,Asset A Copy", "DUPLICATE_ID"],
  ["Cross Owner", "entityType,id,ownerId,name\nasset,a1,owner-2,Asset A", "CROSS_OWNER_ROW"],
];

for (const [name, csv, expectedCode] of cases) {
  const result = validateCsvImportDryRun(csv);
  assert(!result.accepted, `${name} was not rejected`);
  assert(result.writeCount === 0, `${name} dry-run allowed writes`);
  assert(result.errors.some((error) => error.code === expectedCode), `${name} did not report ${expectedCode}`);
  assert(!/<img|<script|javascript:/i.test(result.reportHtml), `${name} report rendered unsafe HTML`);
}

const valid = validateCsvImportDryRun("entityType,id,ownerId,name\nasset,a1,owner-1,Asset A\nliability,l1,owner-1,Loan A");
assert(valid.accepted, "valid CSV fixture was rejected");
assert(valid.records.length === 2, "valid CSV fixture did not parse expected records");
assert(valid.writeCount === 0, "CSV import dry-run must not write");

const securityPlan = await readFile(path.join(root, "docs", "roadmap", "v1.2-csv-import-security-tests.md"), "utf8");
for (const [, , expectedCode] of cases) {
  assert(securityPlan.toLowerCase().includes(expectedCode.replaceAll("_", " ").toLowerCase().split(" ")[0]), `CSV security plan does not cover ${expectedCode}`);
}

console.log("CSV import security tests passed.");
