import { strict as assert } from "node:assert";
import { normalizeAsset, validateAsset } from "../src/domain/asset/asset-validation.js";
import { normalizeLiability, validateLiability } from "../src/domain/liability/liability-validation.js";
import { projectNetWorth } from "../src/runtime/net-worth-projection.js";

const context = { now: () => new Date("2026-07-22T00:00:00.000Z"), createId: () => "fixed-id" };
const asset = normalizeAsset({ ownerId: "owner-1", name: "Cash", assetType: "cash", currency: "TWD", currentValue: "1000", valuationDate: "2026-07-22" }, context);
const liability = normalizeLiability({ ownerId: "owner-1", name: "Loan", liabilityType: "loan", currency: "TWD", outstandingBalance: "300", asOfDate: "2026-07-22" }, context);

assert.equal(validateAsset(asset).length, 0);
assert.equal(validateLiability(liability).length, 0);
assert.equal(validateAsset({ ...asset, name: "" })[0].code, "ATLAS_ASSET_NAME_REQUIRED");
assert.equal(validateAsset({ ...asset, assetType: "invalid" })[0].code, "ATLAS_ASSET_TYPE_INVALID");
assert.equal(validateLiability({ ...liability, outstandingBalance: -1 })[0].code, "ATLAS_LIABILITY_BALANCE_INVALID");
assert.equal(validateLiability({ ...liability, liabilityType: "invalid" })[0].code, "ATLAS_LIABILITY_TYPE_INVALID");

const input = { assets: [asset, { ...asset, id: "archived", status: "archived", currentValue: 9999 }], liabilities: [liability] };
const before = JSON.stringify(input);
const projection = projectNetWorth(input);
assert.equal(projection.totalAssets, 1000);
assert.equal(projection.totalLiabilities, 300);
assert.equal(projection.netWorth, 700);
assert.equal(JSON.stringify(input), before);

console.log("Asset and liability domain tests passed.");
