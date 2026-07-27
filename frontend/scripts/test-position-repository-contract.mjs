import assert from "node:assert/strict";
import { createInMemoryPositionRepository } from "../src/domain/position/position-repository-contract.js";

const owner = { ownerId: "owner-1", householdId: "household-1" };
const otherOwner = { ownerId: "owner-2", householdId: "household-2" };
const repository = createInMemoryPositionRepository();

await repository.create({
  positionId: "position-1",
  ownerId: owner.ownerId,
  householdId: owner.householdId,
  portfolioId: "portfolio-1",
  assetId: "asset-1",
  quantity: 10,
  marketValue: 1000,
});
await repository.create({
  positionId: "position-2",
  ownerId: owner.ownerId,
  householdId: owner.householdId,
  portfolioId: "portfolio-2",
  assetId: "asset-2",
  quantity: 5,
  marketValue: 500,
});
await repository.create({
  positionId: "position-3",
  ownerId: otherOwner.ownerId,
  householdId: otherOwner.householdId,
  portfolioId: "portfolio-1",
  assetId: "asset-3",
  quantity: 2,
  marketValue: 200,
});

assert.equal((await repository.listByOwner(owner)).length, 2);
assert.equal((await repository.listByPortfolio("portfolio-1", owner)).length, 1);
assert.equal(await repository.getById("position-3", owner), null);
const updated = await repository.update("position-1", { quantity: 12, marketValue: 1200 }, owner);
assert.equal(updated.quantity, 12);
assert.equal(updated.marketValue, 1200);
await assert.rejects(() => repository.create({ positionId: "position-bad", ownerId: owner.ownerId }), /requires/);
await assert.rejects(() => repository.create({
  positionId: "position-negative",
  ownerId: owner.ownerId,
  householdId: owner.householdId,
  portfolioId: "portfolio-1",
  quantity: -1,
}), /quantity/);

console.log("Position repository contract tests passed.");
