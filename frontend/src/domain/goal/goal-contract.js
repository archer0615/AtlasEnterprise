export const goalContract = Object.freeze({
  schema: "atlas-enterprise.goal-contract.v1",
  key: "id",
  ownerField: "ownerId",
  amountFields: Object.freeze(["targetAmount", "currentAmount"]),
  lifecycleStatuses: Object.freeze(["draft", "active", "inactive", "completed", "cancelled", "archived"]),
});
