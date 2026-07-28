import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://127.0.0.1").pathname;
  return path.join(frontendRoot, pathname === "/" ? "/index.html" : pathname);
}

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url);
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": contentTypes[path.extname(filePath)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

const { port } = server.address();
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });

  const result = await page.evaluate(async () => {
    const module = await import("./src/indexeddb-runtime.js");
    const repository = module.indexedDbInsurancePolicyRepository;
    await repository.create({
      policyId: "insurance-owner-1",
      ownerId: "owner-1",
      householdId: "household-1",
      providerName: "Owner One Life",
      policyName: "Owner One Protection",
      coverageType: "life",
      coverageAmount: 1000000,
      premiumAmount: 1000,
      premiumFrequency: "monthly",
      currency: "TWD",
      status: "active",
      beneficiarySummary: "Family",
      effectiveDate: "2026-07-28",
      renewalDate: "2027-07-28",
      updatedAt: "2026-07-28T00:00:00.000Z",
    });
    await repository.create({
      policyId: "insurance-owner-2",
      ownerId: "owner-2",
      householdId: "household-2",
      providerName: "Owner Two Life",
      policyName: "Owner Two Protection",
      coverageType: "health",
      coverageAmount: 2000000,
      premiumAmount: 2000,
      premiumFrequency: "monthly",
      currency: "TWD",
      status: "active",
      beneficiarySummary: "Family",
      effectiveDate: "2026-07-28",
      renewalDate: "2027-07-28",
      updatedAt: "2026-07-28T00:00:00.000Z",
    });
    const ownerOne = await repository.listByOwner("owner-1", { includeArchived: true });
    const ownerTwo = await repository.listByOwner("owner-2", { includeArchived: true });
    const crossOwnerUpdate = await repository.update({ ...ownerOne[0], policyId: "insurance-owner-2" }).then(() => "updated", (error) => error.message);
    return {
      ownerOneNames: ownerOne.map((policy) => policy.policyName),
      ownerTwoNames: ownerTwo.map((policy) => policy.policyName),
      crossOwnerUpdate,
    };
  });

  assert(result.ownerOneNames.includes("Owner One Protection"), "owner one policy missing");
  assert(!result.ownerOneNames.includes("Owner Two Protection"), "owner one list leaked owner two policy");
  assert(result.ownerTwoNames.includes("Owner Two Protection"), "owner two policy missing");
  assert(result.crossOwnerUpdate === "ATLAS_INSURANCE_POLICY_OWNER_MISMATCH", "cross-owner update was not blocked");

  await page.close();
  console.log("Insurance owner isolation browser tests passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
