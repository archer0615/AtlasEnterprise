const allowedPolicyStatuses = new Set(["draft", "active", "lapsed", "cancelled"]);
const allowedCoverageTypes = new Set(["life", "health", "property", "disability", "liability"]);

export function normalizeInsurancePolicy(input = {}, context = {}) {
  const now = context.now?.().toISOString?.() || new Date(0).toISOString();
  return Object.freeze({
    policyId: String(input.policyId || input.id || "").trim(),
    ownerId: String(input.ownerId || context.ownerId || "").trim(),
    householdId: String(input.householdId || context.householdId || "").trim(),
    providerName: String(input.providerName || "").trim(),
    policyName: String(input.policyName || input.name || "").trim(),
    coverageType: String(input.coverageType || "").trim().toLowerCase(),
    coverageAmount: Number(input.coverageAmount ?? 0),
    premiumAmount: Number(input.premiumAmount ?? 0),
    premiumFrequency: String(input.premiumFrequency || "monthly").trim().toLowerCase(),
    currency: String(input.currency || "TWD").trim().toUpperCase(),
    status: String(input.status || "draft").trim().toLowerCase(),
    beneficiarySummary: String(input.beneficiarySummary || "").trim(),
    effectiveDate: String(input.effectiveDate || "").trim(),
    renewalDate: String(input.renewalDate || "").trim(),
    updatedAt: String(input.updatedAt || now).trim(),
  });
}

export function validateInsurancePolicy(policy = {}) {
  const errors = [];
  if (!policy.policyId) errors.push(error("ATLAS_INSURANCE_POLICY_ID_REQUIRED", "policyId", "Insurance policy id is required."));
  if (!policy.ownerId) errors.push(error("ATLAS_INSURANCE_OWNER_REQUIRED", "ownerId", "Insurance policy owner is required."));
  if (!policy.householdId) errors.push(error("ATLAS_INSURANCE_HOUSEHOLD_REQUIRED", "householdId", "Insurance household is required."));
  if (!policy.providerName) errors.push(error("ATLAS_INSURANCE_PROVIDER_REQUIRED", "providerName", "Insurance provider is required."));
  if (!policy.policyName) errors.push(error("ATLAS_INSURANCE_POLICY_NAME_REQUIRED", "policyName", "Insurance policy name is required."));
  if (!allowedCoverageTypes.has(policy.coverageType)) errors.push(error("ATLAS_INSURANCE_COVERAGE_TYPE_INVALID", "coverageType", "Insurance coverage type is not supported."));
  if (!Number.isFinite(policy.coverageAmount) || policy.coverageAmount <= 0) errors.push(error("ATLAS_INSURANCE_COVERAGE_AMOUNT_INVALID", "coverageAmount", "Insurance coverage amount must be positive."));
  if (!Number.isFinite(policy.premiumAmount) || policy.premiumAmount < 0) errors.push(error("ATLAS_INSURANCE_PREMIUM_AMOUNT_INVALID", "premiumAmount", "Insurance premium amount must be non-negative."));
  if (!allowedPolicyStatuses.has(policy.status)) errors.push(error("ATLAS_INSURANCE_STATUS_INVALID", "status", "Insurance policy status is not supported."));
  if (/<[a-z][\s\S]*>|on\w+=|https?:\/\//i.test(policy.beneficiarySummary)) errors.push(error("ATLAS_INSURANCE_BENEFICIARY_UNSAFE", "beneficiarySummary", "Insurance beneficiary summary must not contain markup, event handlers, or external links."));
  return errors;
}

export function createInsurancePolicyEvent(policy = {}, action = "insurance-policy-upserted", context = {}) {
  return Object.freeze({
    eventId: `${action}-${policy.policyId || "unknown"}-${context.sequence ?? 0}`,
    action,
    schema: "atlas-enterprise.insurance-policy-event.v1",
    aggregateId: policy.policyId || "",
    ownerId: policy.ownerId || "",
    householdId: policy.householdId || "",
    occurredAt: context.now?.().toISOString?.() || policy.updatedAt || new Date(0).toISOString(),
    payload: Object.freeze({
      policyId: policy.policyId || "",
      status: policy.status || "draft",
      coverageType: policy.coverageType || "",
      coverageAmount: policy.coverageAmount ?? 0,
      premiumAmount: policy.premiumAmount ?? 0,
      currency: policy.currency || "TWD",
    }),
  });
}

function error(code, field, message) {
  return { code, field, message };
}
