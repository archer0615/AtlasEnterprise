import {
  createInsurancePolicyEvent,
  normalizeInsurancePolicy,
  validateInsurancePolicy,
} from "../../domain/insurance/insurance-policy-contract.js";

export function createInsuranceApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => `insurance-policy-${now().getTime()}` }) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }

  async function createPolicy(input) {
    const record = normalizeInsurancePolicy({ ...input, policyId: input.policyId || input.id || createId(), ownerId: await ownerId() }, { now });
    const errors = validateInsurancePolicy(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.policyName)) return { ok: false, errors: [{ code: "ATLAS_INSURANCE_POLICY_ALREADY_EXISTS", field: "policyName", message: "Insurance policy name already exists", rule: "unique-owner-name", valueCategory: "user-input" }] };
    await repository.create(record);
    await auditRepository?.save?.(audit("InsurancePolicyCreated", record, now)).catch(() => {});
    return { ok: true, record, event: createInsurancePolicyEvent(record, "insurance-policy-created", { now }) };
  }

  async function listPolicies(query = {}) {
    return repository.listByOwner(await ownerId(), query);
  }

  async function updatePolicy(id, input) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return notFound();
    const record = normalizeInsurancePolicy({ ...existing, ...input, policyId: id, ownerId: existing.ownerId, updatedAt: now().toISOString() }, { now });
    const errors = validateInsurancePolicy(record);
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await auditRepository?.save?.(audit("InsurancePolicyUpdated", record, now)).catch(() => {});
    return { ok: true, record, event: createInsurancePolicyEvent(record, "insurance-policy-updated", { now }) };
  }

  async function cancelPolicy(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return notFound();
    const record = { ...existing, status: "cancelled", updatedAt: now().toISOString() };
    await repository.update(record);
    await auditRepository?.save?.(audit("InsurancePolicyCancelled", record, now)).catch(() => {});
    return { ok: true, record, event: createInsurancePolicyEvent(record, "insurance-policy-cancelled", { now }) };
  }

  return { listPolicies, getPolicy: repository.getById, createPolicy, updatePolicy, cancelPolicy };
}

function notFound() {
  return { ok: false, errors: [{ code: "ATLAS_INSURANCE_POLICY_NOT_FOUND", field: "policyId", message: "Insurance policy not found", rule: "owner-isolation", valueCategory: "identifier" }] };
}

function audit(eventType, record, now) {
  return { auditId: `${eventType}-${record.policyId}-${now().getTime()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "InsurancePolicy", entityId: record.policyId, ownerId: record.ownerId, result: "ok" } };
}
