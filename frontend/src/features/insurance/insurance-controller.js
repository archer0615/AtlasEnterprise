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
    const summary = summarizeCoverage(policies);
    const audits = (await indexedDbAuditRepository.list()).filter((entry) => entry?.detail?.entityType === "InsurancePolicy").slice(-5).reverse();
    panel.dataset.insuranceState = "ready";
    panel.dataset.insuranceMode = "local-indexeddb";
    panel.innerHTML = [
      message ? `<p>${escapeHtml(message)}</p>` : "",
      `<p>保單數：${policies.length}</p>`,
      `<p>保障總額：${escapeHtml(summary.currency)} ${summary.coverageAmount} / 每月保費：${summary.monthlyPremium}</p>`,
      `<p>保障類型：${escapeHtml(summary.coverageTypes.join("、") || "無")}</p>`,
      ...policies.map((policy) => `<article><strong>${escapeHtml(policy.policyName)}</strong><span>${escapeHtml(policy.providerName)} / ${escapeHtml(policy.coverageType)} / ${escapeHtml(policy.status)}</span><small>${escapeHtml(policy.currency)} ${policy.coverageAmount}，保費 ${policy.premiumAmount} ${escapeHtml(policy.premiumFrequency)}</small><button type="button" data-insurance-action="increase-premium" data-policy-id="${escapeHtml(policy.policyId)}">更新保費</button><button type="button" data-insurance-action="cancel" data-policy-id="${escapeHtml(policy.policyId)}">取消保單</button></article>`),
      audits.length ? `<div><strong>保險稽核</strong>${audits.map((entry) => `<small>${escapeHtml(entry.action)} ${escapeHtml(entry.detail?.entityId || "")}</small>`).join("")}</div>` : "",
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
        await render(result.ok ? "保單已新增。" : formatErrors(result.errors));
      });
      listeners.add(dom.optional("#insurancePolicyListPanel"), "click", async (event) => {
        const button = event.target?.closest?.("[data-insurance-action]");
        if (!button) return;
        const policyId = button.dataset.policyId;
        const action = button.dataset.insuranceAction;
        const result = action === "cancel"
          ? await service.cancelPolicy(policyId)
          : await service.updatePolicy(policyId, { premiumAmount: Number(value("#insurancePremiumAmountInput") || 0) });
        await render(result.ok ? "保單已更新。" : formatErrors(result.errors));
      });
    },
    dispose() {},
  };
}

function formatErrors(errors = []) {
  return errors.map((item) => `${item.code}${item.message ? ` ${item.message}` : ""}`).join(", ");
}

function summarizeCoverage(policies = []) {
  const activePolicies = policies.filter((policy) => policy.status !== "cancelled");
  const coverageAmount = activePolicies.reduce((total, policy) => total + Number(policy.coverageAmount || 0), 0);
  const monthlyPremium = activePolicies.reduce((total, policy) => total + normalizeMonthlyPremium(policy), 0);
  return {
    currency: activePolicies[0]?.currency || "TWD",
    coverageAmount,
    monthlyPremium,
    coverageTypes: [...new Set(activePolicies.map((policy) => policy.coverageType).filter(Boolean))],
  };
}

function normalizeMonthlyPremium(policy = {}) {
  const amount = Number(policy.premiumAmount || 0);
  const factors = { monthly: 1, quarterly: 1 / 3, semiannual: 1 / 6, annual: 1 / 12 };
  return Math.round(amount * (factors[policy.premiumFrequency] || 1));
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
