# Prompt 09 — Financial Health 與 Goal Progress

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

把既有評分、Goal Funding、Goal Progress 規格轉成可解釋 Runtime。

## 執行內容

1. 讀取 Financial Health、Score Policy、Formula Registry、Goal Entity/Catalog。
2. 實作 overall/component score、freshness、missing evidence、explanation、goal target/current/gap/progress、completion projection、at-risk state。
3. 不創造新評分因素、權重或狀態。
4. 區分 Actual、Estimated、Projected、Insufficient Data。
5. Goal lifecycle/status transition 符合規格。
6. 提供 Detail、Summary、Dashboard card，補計算、轉移、空資料、邊界測試。

## 驗收標準

- 每個分數可追溯到輸入、規則、公式和日期。
- 不足資料不輸出假精確分數。
- Goal 修改後 projection 同步。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
