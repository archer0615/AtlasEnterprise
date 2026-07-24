export function normalizeDecision(input = {}, context = {}) {
  const timestamp = (context.now?.() || new Date()).toISOString();
  const id = input.id || input.decisionId || context.createId?.() || `decision-${new Date(timestamp).getTime()}`;
  return Object.freeze({
    id,
    decisionId: id,
    ownerId: input.ownerId,
    title: String(input.title || input.name || "").trim(),
    type: input.type || input.decisionType || "scenario-selection",
    status: input.status || "draft",
    scenarioId: input.scenarioId || "",
    goalId: input.goalId || "",
    recommendationId: input.recommendationId || "",
    selectedOption: String(input.selectedOption || ""),
    rationale: String(input.rationale || ""),
    decisionDate: input.decisionDate || timestamp.slice(0, 10),
    effectiveDate: input.effectiveDate || "",
    reviewDate: input.reviewDate || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}
