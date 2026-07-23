export function evaluateAutomationRules(input = {}) {
  const rules = Array.isArray(input.rules) ? input.rules : [];
  const facts = input.facts || {};
  return Object.freeze(rules.filter((rule) => rule.enabled !== false).map((rule) => {
    const actual = facts[rule.condition?.fact];
    const matched = compare(actual, rule.condition?.operator, rule.condition?.value);
    return Object.freeze({
      ruleId: rule.id,
      ownerId: rule.ownerId,
      title: rule.title,
      type: rule.type,
      matched,
      result: matched ? rule.result : "none",
      priority: rule.condition?.priority || "medium",
      summary: matched ? `${rule.condition?.fact} matched ${rule.condition?.operator} ${rule.condition?.value}` : "",
    });
  }));
}

function compare(actual, operator, expected) {
  if (operator === "lt") return Number(actual) < Number(expected);
  if (operator === "lte") return Number(actual) <= Number(expected);
  if (operator === "gt") return Number(actual) > Number(expected);
  if (operator === "gte") return Number(actual) >= Number(expected);
  if (operator === "eq") return actual === expected;
  return false;
}
