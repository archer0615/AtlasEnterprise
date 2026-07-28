import { createInsuranceApplicationService } from "../../application/insurance/insurance-application-service.js";
import { indexedDbAuditRepository, indexedDbInsurancePolicyRepository } from "../../indexeddb-runtime.js";

export function createInsuranceController({ dom, listeners }) {
  const ownerProvider = { getCurrentOwner: async () => ({ ownerId: "owner-1" }) };
  const service = createInsuranceApplicationService({
    repository: indexedDbInsurancePolicyRepository,
    ownerProvider,
    auditRepository: indexedDbAuditRepository,
    createId: () => `insurance-policy-${Date.now()}`,
  });

  async function render(message = "") {
    const panel = dom.optional("#insurancePolicyListPanel");
    if (!panel) return;
    const policies = await service.listPolicies({ includeArchived: true });
    panel.dataset.insuranceState = "ready";
    panel.dataset.insuranceMode = "local-indexeddb";
    panel.innerHTML = [
      message ? `<p>${escapeHtml(message)}</p>` : "",
      `<p>保單數：${policies.length}</p>`,
      ...policies.map((policy) => `<article><strong>${escapeHtml(policy.policyName)}</strong><span>${escapeHtml(policy.providerName)} / ${escapeHtml(policy.coverageType)} / ${escapeHtml(policy.status)}</span><small>${escapeHtml(policy.currency)} ${policy.coverageAmount}，保費 ${policy.premiumAmount} ${escapeHtml(policy.premiumFrequency)}</small></article>`),
    ].join("");
  }

  function value(selector) {
    return dom.optional(selector)?.value || "";
  }

  return {
    initialize() {
      render();
      listeners.add(dom.optional("#createInsurancePolicyButton"), "click", async () => {
        const result = await service.createPolicy({
          householdId: "household-1",
          providerName: value("#insuranceProviderInput"),
          policyName: value("#insurancePolicyNameInput"),
          coverageType: value("#insuranceCoverageTypeInput"),
          coverageAmount: value("#insuranceCoverageAmountInput"),
          premiumAmount: value("#insurancePremiumAmountInput"),
          premiumFrequency: value("#insurancePremiumFrequencyInput"),
          status: "active",
          beneficiarySummary: value("#insuranceBeneficiaryInput"),
          effectiveDate: value("#insuranceEffectiveDateInput"),
        });
        await render(result.ok ? "保單已新增。" : result.errors.map((item) => item.code).join(", "));
      });
    },
    dispose() {},
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}
