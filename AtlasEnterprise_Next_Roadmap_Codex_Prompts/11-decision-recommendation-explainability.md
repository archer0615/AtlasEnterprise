# Prompt 11 — Decision、Recommendation、Explainability

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

完成 Atlas 核心差異化的可追溯決策支援流程。

## 執行內容

1. 讀取 Decision、Recommendation、Rule Catalog、Explainability、Scoring、Constraint、Execution 文件。
2. 依 Catalog 實作 summary、confidence/score、evidence、constraint、trade-off、alternative、risk、explainability、lifecycle。
3. 嚴格區分 Fact、Assumption、Projection、Rule Evaluation、Recommendation。
4. 不得以生成式文案取代 deterministic rule explanation。
5. Recommendation 保存 input snapshot、rule/version、scenario/version、created time。
6. 建立 Decision Center：Summary、Why、Evidence、Alternatives、Impact、Next Action。
7. 不自動執行高影響財務行動；建立 insufficient-data、conflict、illegal-transition tests。

## 驗收標準

- 每個結論可追溯規則與資料。
- 使用者能理解原因與限制。
- 不足資料會停止或降級，不猜測。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
