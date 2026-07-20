# Prompt 10 — Scenario Workbench

## Atlas 強制邊界

- 先讀取 `README.md`、`package.json`、`.codex/`、相關 Catalog、Entity、Framework、現有程式與測試。
- 以 Repository 現況與既有 Knowledge Base 為準；不重新設計 Atlas，不修改既有 Domain，不新增 Catalog 不存在的 Business Concept。
- 所有命名遵循 Atlas 已建立的 Catalog。
- `knowledge/**/*.md` 是 Canonical Source；`frontend/knowledge/**` 是 Generated Output，不得直接維護。
- Atlas v1 維持 Static-first、Local-first、Offline-first GitHub Pages PWA。
- ASP.NET Core、PostgreSQL、EF Core、Server API、Cloud Database、Authentication Server、Multi-device Sync 不得成為 v1 Runtime Dependency。
- `backend/`、`database/`、`ai/` 僅為 Future Optional Architecture、Prototype、Build-time 或 Test-time 區域。
- 不得移除有效驗證換取通過；Fixture 僅用於 Demo、Development、Test、Visual Regression。
- 優先小步修改、保持向後相容，不更換前端框架。

## 目標

把 Scenario 從 Fixture/表格提升為可建立、執行、比較和封存的本機工作台。

## 執行內容

1. 依 Scenario Entity、Framework、Simulator fixture schema 實作。
2. 支援規格允許的 Create、Update、Clone、Run、Compare、Archive/Restore。
3. Base 與 Alternative Scenario 清楚區分；override 不修改 actual data。
4. 執行結果保存 input/formula/assumption version、timestamp、output、warning。
5. 建立 Goal、Loan、Mortgage、Retirement 等既有 milestone timeline。
6. Compare 支援 2–3 scenarios，顯示差異、風險、關鍵指標。
7. 結果 stale detection；建立 simulator/runtime consistency test。

## 驗收標準

- Scenario run 可重現。
- Assumption 變更會標記舊結果 stale。
- Scenario 不污染 Actual Data。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
