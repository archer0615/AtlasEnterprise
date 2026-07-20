import assert from "node:assert/strict";
import { buildCommandPalette, buildRelatedDocuments, buildRelationshipGraph, createRecentSearches, rankKnowledgeDocuments } from "../src/knowledge-explorer.js";
import { classifyPwaStorageFailure, createOfflineUxState, diffCacheManifest } from "../src/pwa-offline-state.js";

const docs = [
  { id: "asset", title: "Asset Catalog", category: "entity", keywords: ["portfolio"], headings: [{ text: "Asset Rules" }], summary: "Asset list and detail", links: ["goal"] },
  { id: "goal", title: "Goal Progress", category: "goal", keywords: ["funding"], headings: [{ text: "Funding Gap" }], summary: "Goal target and progress" },
];

const ranked = rankKnowledgeDocuments(docs, "asset portfolio");
assert.equal(ranked[0].id, "asset");
assert.ok(ranked[0].highlights.length > 0);
assert.equal(ranked[0].headingAnchors[0].anchor, "asset-rules");

const commands = buildCommandPalette(docs, [{ id: "app-backup", type: "App Command", title: "Export Backup" }]);
assert.ok(commands.some((item) => item.type === "Navigation"));
assert.ok(commands.some((item) => item.type === "Knowledge Search"));
assert.ok(commands.some((item) => item.type === "App Command"));

const recent = createRecentSearches(["goal"], "asset");
assert.deepEqual(recent.slice(0, 2), ["asset", "goal"]);

const related = buildRelatedDocuments("asset", docs);
assert.equal(related.backlinks.length, 0);

const graph = buildRelationshipGraph(docs);
assert.equal(graph.edges[0].target, "goal");

const offlineState = createOfflineUxState({ isOnline: false, waitingServiceWorker: true, cacheVersion: "v1", latestVersion: "v2", usageRatio: 0.9, hoursSinceLastBackup: 30 });
assert.equal(offlineState.offlineIndicator, "Offline");
assert.equal(offlineState.updateAvailable, true);
assert.equal(offlineState.staleData, true);
assert.equal(offlineState.quotaWarning, true);
assert.equal(offlineState.backupReminder, true);

const diff = diffCacheManifest(["/AtlasEnterprise/index.html"], ["/AtlasEnterprise/index.html", "/AtlasEnterprise/sw.js"]);
assert.deepEqual(diff.added, ["/AtlasEnterprise/sw.js"]);
assert.equal(classifyPwaStorageFailure(new Error("IndexedDB is not available")), "IndexedDB Unavailable");

console.log("Knowledge explorer and PWA UX tests passed.");
