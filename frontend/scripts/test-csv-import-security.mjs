import { readFile } from "node:fs/promises";
import path from "node:path";
import { dryRunCsvImport } from "../src/domain/import/csv-import-dry-run.js";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const maxRowBytes = 4096;

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
  const result = dryRunCsvImport(csv, { ownerId: "owner-1" });
  assert(!result.accepted, `${name} was not rejected`);
  assert(result.writeCount === 0, `${name} dry-run allowed writes`);
  assert(result.errors.some((error) => error.code === expectedCode), `${name} did not report ${expectedCode}`);
  assert(!/<img|<script|javascript:/i.test(result.reportHtml), `${name} report rendered unsafe HTML`);
}

const valid = dryRunCsvImport("entityType,id,ownerId,name,currentValue,valuationDate,assetType,currency,status,outstandingBalance,asOfDate,liabilityType\nasset,a1,owner-1,Asset A,100,2026-07-27,other,TWD,active,,,\nliability,l1,owner-1,Loan A,,,,TWD,active,50,2026-07-27,other", { ownerId: "owner-1" });
assert(valid.accepted, "valid CSV fixture was rejected");
assert(valid.records.length === 2, "valid CSV fixture did not parse expected records");
assert(valid.writeCount === 0, "CSV import dry-run must not write");

const validPosition = dryRunCsvImport(
  "entityType,id,ownerId,name,householdId,portfolioId,assetId,quantity,unitCost,marketValue,currency,status\nposition,p1,owner-1,Position A,household-1,portfolio-1,asset-1,2,10,20,TWD,active",
  { ownerId: "owner-1" },
);
assert(validPosition.accepted, "valid position CSV fixture was rejected");
assert(validPosition.records[0].record.positionId === "p1", "position CSV did not map id to positionId");

const validInsurance = dryRunCsvImport(
  "entityType,id,ownerId,name,householdId,providerName,coverageType,coverageAmount,premiumAmount,premiumFrequency,currency,status,beneficiarySummary,effectiveDate\ninsurance,insurance-1,owner-1,Policy A,household-1,Atlas Life,life,3000000,2500,monthly,TWD,active,Family,2026-07-28",
  { ownerId: "owner-1" },
);
assert(validInsurance.accepted, "valid insurance CSV fixture was rejected");
assert(validInsurance.records[0].record.policyId === "insurance-1", "insurance CSV did not map id to policyId");

const securityPlan = await readFile(path.join(root, "docs", "roadmap", "v1.2-csv-import-security-tests.md"), "utf8");
for (const [, , expectedCode] of cases) {
  assert(securityPlan.toLowerCase().includes(expectedCode.replaceAll("_", " ").toLowerCase().split(" ")[0]), `CSV security plan does not cover ${expectedCode}`);
}

console.log("CSV import security tests passed.");
