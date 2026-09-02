export function todayDate(clock = () => new Date()) {
  return clock().toISOString().slice(0, 10);
}

export function getLocalActionGroupLabel(action, clock = () => new Date()) {
  if (action.status === "done") return "已完成";
  if (!action.dueDate) return "未設定期限";
  return action.dueDate <= todayDate(clock) ? "已到期" : "未來期限";
}

export function getLocalActionSortRank(action, clock = () => new Date()) {
  if (action.status === "done") return 4;
  if (!action.dueDate) return 3;
  return action.dueDate <= todayDate(clock) ? 1 : 2;
}

export function compareLocalActions(a, b, clock = () => new Date()) {
  const today = todayDate(clock);
  return getLocalActionSortRankForDate(a, today) - getLocalActionSortRankForDate(b, today)
    || String(a.dueDate || "9999-12-31").localeCompare(String(b.dueDate || "9999-12-31"))
    || String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
}

function getLocalActionSortRankForDate(action, today) {
  if (action.status === "done") return 4;
  if (!action.dueDate) return 3;
  return action.dueDate <= today ? 1 : 2;
}

export function getVisibleLocalActions(actions, filter = "open", keyword = "", clock = () => new Date()) {
  const normalizedKeyword = String(keyword || "").trim().toLowerCase();
  const visible = actions.filter((action) => {
    if (filter !== "all" && filter !== "open" && action.status !== filter) return false;
    if (filter === "open" && action.status === "done") return false;
    const searchableText = [
      action.title, action.dueDate, action.status, action.createdFrom,
      action.sourceRecommendationId ? "建議轉入" : "手動新增",
    ].map((value) => String(value || "")).join(" ").toLowerCase();
    return !normalizedKeyword || searchableText.includes(normalizedKeyword);
  });
  const today = todayDate(clock);
  return visible.sort((left, right) => getLocalActionSortRankForDate(left, today) - getLocalActionSortRankForDate(right, today)
    || String(left.dueDate || "9999-12-31").localeCompare(String(right.dueDate || "9999-12-31"))
    || String(right.createdAt || "").localeCompare(String(left.createdAt || "")));
}

export function summarizeLocalActions(actions, clock = () => new Date()) {
  const today = todayDate(clock);
  const summary = actions.reduce((result, action) => {
    if (action.status === "done") {
      result.doneCount += 1;
      return result;
    }
    result.openCount += 1;
    if (action.dueDate && action.dueDate <= today) result.dueCount += 1;
    if (action.dueDate && action.dueDate > today && action.dueDate < result.nextDueDate) result.nextDueDate = action.dueDate;
    return result;
  }, { openCount: 0, dueCount: 0, doneCount: 0, nextDueDate: "9999-12-31" });
  return {
    ...summary,
    nextDueDate: summary.nextDueDate === "9999-12-31" ? "未設定" : summary.nextDueDate,
  };
}
