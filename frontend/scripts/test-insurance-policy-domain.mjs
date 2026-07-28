import assert from "node:assert/strict";
import {
  createInsurancePolicyEvent,
  normalizeInsurancePolicy,
  validateInsurancePolicy,
} from "../src/domain/insurance/insurance-policy-contract.js";

const policy = normalizeInsurancePolicy({
  id: "insurance-policy-1",
  ownerId: "owner-1",
  householdId: "household-1",
  providerName: "Atlas Life",
  name: "Family Protection",
  coverageType: "life",
  coverageAmount: "3000000",
  premiumAmount: "2500",
  beneficiarySummary: "Primary family beneficiary",
  effectiveDate: "2026-07-28",
  status: "active",
}, {
  now: () => new Date("2026-07-28T00:00:00.000Z"),
});

assert.equal(policy.policyId, "insurance-policy-1");
assert.equal(policy.policyName, "Family Protection");
assert.equal(policy.coverageAmount, 3000000);
assert.equal(validateInsurancePolicy(policy).length, 0);

const invalid = normalizeInsurancePolicy({
  id: "",
  ownerId: "owner-1",
  householdId: "household-1",
  providerName: "Atlas Life",
  name: "Unsafe Protection",
  coverageType: "unknown",
  coverageAmount: "0",
  premiumAmount: "-1",
  beneficiarySummary: "<img onerror=alert(1)> https://bad.example",
  status: "active",
});
const invalidCodes = validateInsurancePolicy(invalid).map((item) => item.code);

assert(invalidCodes.includes("ATLAS_INSURANCE_POLICY_ID_REQUIRED"));
assert(invalidCodes.includes("ATLAS_INSURANCE_COVERAGE_TYPE_INVALID"));
assert(invalidCodes.includes("ATLAS_INSURANCE_COVERAGE_AMOUNT_INVALID"));
assert(invalidCodes.includes("ATLAS_INSURANCE_PREMIUM_AMOUNT_INVALID"));
assert(invalidCodes.includes("ATLAS_INSURANCE_BENEFICIARY_UNSAFE"));

const event = createInsurancePolicyEvent(policy, "insurance-policy-issued", {
  sequence: 7,
  now: () => new Date("2026-07-28T00:00:00.000Z"),
});

assert.equal(event.schema, "atlas-enterprise.insurance-policy-event.v1");
assert.equal(event.action, "insurance-policy-issued");
assert.equal(event.aggregateId, "insurance-policy-1");
assert.equal(event.payload.coverageAmount, 3000000);

console.log("Insurance policy domain tests passed.");
