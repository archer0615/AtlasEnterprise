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
      ...policies.map((policy) => `<article><strong>${escapeHtml(policy.policyName)}</strong><span>${escapeHtml(policy.providerName)} / ${escapeHtml(policy.coverageType)} / ${escapeHtml(policy.status)}</span><small>${escapeHtml(policy.currency)} ${policy.coverageAmount}，保費 ${policy.premiumAmount} ${escapeHtml(policy.premiumFrequency)}</small><button type="button" data-insurance-action="increase-premium" data-policy-id="${escapeHtml(policy.policyId)}">更新保費</button><button type="button" data-insurance-action="cancel" data-policy-id="${escapeHtml(policy.policyId)}">取消保單</button></article>`),
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
      listeners.add(dom.optional("#insurancePolicyListPanel"), "click", async (event) => {
        const button = event.target?.closest?.("[data-insurance-action]");
        if (!button) return;
        const policyId = button.dataset.policyId;
        const action = button.dataset.insuranceAction;
        const result = action === "cancel"
          ? await service.cancelPolicy(policyId)
          : await service.updatePolicy(policyId, { premiumAmount: Number(value("#insurancePremiumAmountInput") || 0) });
        await render(result.ok ? "保單已更新。" : result.errors.map((item) => item.code).join(", "));
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
