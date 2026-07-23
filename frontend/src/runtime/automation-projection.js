export function projectAutomationSummary(input = {}) {
  const rules = Array.isArray(input.rules) ? input.rules : [];
  const results = Array.isArray(input.results) ? input.results : [];
  return Object.freeze({
    automationRuleCount: rules.length,
    enabledAutomationRuleCount: rules.filter((rule) => rule.enabled !== false).length,
    automationAlerts: results.filter((result) => result.matched).length,
  });
}
