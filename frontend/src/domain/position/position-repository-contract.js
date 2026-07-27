export function createInMemoryPositionRepository(initialRecords = []) {
  const records = new Map(initialRecords.map((record) => [record.positionId, normalizePosition(record)]));
  return {
    async create(position) {
      const normalized = normalizePosition(position);
      assertPositionOwner(normalized);
      if (records.has(normalized.positionId)) throw new Error("Position already exists");
      records.set(normalized.positionId, normalized);
      return normalized;
    },
    async update(positionId, patch, ownerContext) {
      const existing = await this.getById(positionId, ownerContext);
      const updated = normalizePosition({ ...existing, ...patch, positionId: existing.positionId });
      assertPositionOwner(updated);
      records.set(positionId, updated);
      return updated;
    },
    async getById(positionId, ownerContext) {
      const record = records.get(positionId);
      if (!record || !matchesOwner(record, ownerContext)) return null;
      return record;
    },
    async listByOwner(ownerContext) {
      return [...records.values()].filter((record) => matchesOwner(record, ownerContext));
    },
    async listByPortfolio(portfolioId, ownerContext) {
      return [...records.values()].filter((record) => record.portfolioId === portfolioId && matchesOwner(record, ownerContext));
    },
  };
}

export function normalizePosition(input = {}) {
  return Object.freeze({
    positionId: String(input.positionId || "").trim(),
    ownerId: String(input.ownerId || "").trim(),
    householdId: String(input.householdId || "").trim(),
    portfolioId: String(input.portfolioId || "").trim(),
    assetId: String(input.assetId || "").trim(),
    quantity: Number(input.quantity ?? 0),
    unitCost: Number(input.unitCost ?? 0),
    marketValue: Number(input.marketValue ?? 0),
    currency: input.currency || "TWD",
    status: input.status || "active",
    updatedAt: input.updatedAt || new Date(0).toISOString(),
  });
}

function assertPositionOwner(record) {
  if (!record.positionId || !record.ownerId || !record.householdId || !record.portfolioId) {
    throw new Error("Position requires positionId, ownerId, householdId, and portfolioId");
  }
  if (!Number.isFinite(record.quantity) || record.quantity < 0) throw new Error("Position quantity must be non-negative");
  if (!Number.isFinite(record.marketValue)) throw new Error("Position marketValue must be finite");
}

function matchesOwner(record, ownerContext = {}) {
  return record.ownerId === ownerContext.ownerId && record.householdId === ownerContext.householdId;
}
