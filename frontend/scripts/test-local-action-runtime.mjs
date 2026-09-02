import assert from "node:assert/strict";
import {
  getLocalActionGroupLabel,
  getVisibleLocalActions,
  summarizeLocalActions,
  todayDate,
} from "../src/runtime/local-action-runtime.js";

const clock = () => new Date("2026-09-02T08:00:00.000Z");
const actions = [
  { id: "done", title: "完成", status: "done", dueDate: "2026-09-01", createdAt: "2026-09-01T08:00:00Z" },
  { id: "due", title: "繳費", status: "pending-review", dueDate: "2026-09-02", createdAt: "2026-09-02T08:00:00Z" },
  { id: "future", title: "檢查", status: "defer", dueDate: "2026-09-05", createdAt: "2026-09-01T08:00:00Z" },
  { id: "none", title: "整理", status: "pending-review", createdAt: "2026-09-01T07:00:00Z" },
];

assert.equal(todayDate(clock), "2026-09-02");
assert.equal(getLocalActionGroupLabel(actions[1], clock), "已到期");
assert.deepEqual(getVisibleLocalActions(actions, "open", "繳", clock).map(({ id }) => id), ["due"]);
assert.deepEqual(getVisibleLocalActions(actions, "open", "", clock).map(({ id }) => id), ["due", "future", "none"]);
assert.deepEqual(summarizeLocalActions(actions, clock), {
  openCount: 3,
  dueCount: 1,
  doneCount: 1,
  nextDueDate: "2026-09-05",
});

console.log("local action runtime tests passed");
