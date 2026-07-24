export function normalizeScenario(input = {}, context = {}) {
  const timestamp = (context.now?.() || new Date()).toISOString();
  const id = input.id || input.scenarioId || context.createId?.() || `scenario-${new Date(timestamp).getTime()}`;
  return Object.freeze({
    id,
    scenarioId: id,
    ownerId: input.ownerId,
    name: String(input.name || "").trim(),
    type: input.type || input.scenarioType || "baseline",
    status: input.status || "draft",
    description: String(input.description || input.note || ""),
    baseScenarioId: input.baseScenarioId || "",
    goalId: input.goalId || "",
    assumptions: Object.freeze({ ...(input.assumptions || {}) }),
    projectionHorizon: Object.freeze({ start: input.projectionHorizon?.start || input.projectionStart || "", end: input.projectionHorizon?.end || input.projectionEnd || "" }),
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || input.aggregateVersion || 0) + 1,
  });
}
