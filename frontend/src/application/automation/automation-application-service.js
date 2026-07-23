import { validateAutomationRule } from "../../domain/notification/notification-validation.js";
import { evaluateAutomationRules } from "../../runtime/automation-runtime.js";

export function createAutomationApplicationService({ repository, auditRepository, now = () => new Date() } = {}) {
  return Object.freeze({
    async evaluate(ownerId, facts = {}) {
      const rules = await repository.listByOwner(ownerId, {});
      const errors = rules.flatMap((rule) => validateAutomationRule(rule));
      if (errors.length) return { ok: false, errors };
      const results = evaluateAutomationRules({ rules, facts });
      await auditRepository?.save?.({ eventType: "Automation Evaluated", ownerId, entityType: "Automation", entityId: "automation", occurredAt: now().toISOString() });
      return { ok: true, results };
    },
  });
}
