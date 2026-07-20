# Prompt 06 — 核心財務資料閉環

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

建立可日常使用的真實資料輸入、維護與本機保存流程。

## 執行內容

1. 依 Catalog 盤點 User/Household、Asset、Liability、Loan/Mortgage、Income、Expense、CashFlow、Goal、Portfolio、Position 的既有完成度。
2. 只實作 Catalog 已存在且 v1 使用的概念。
3. 每個功能至少提供 List/Summary、Detail、Create、Update、Archive/Restore 或 Delete（依 lifecycle）、Validation、Empty State。
4. 資料保存 IndexedDB，且相容 Backup/Restore。
5. 建立共用 Money、Currency、Date、Percentage、Status、Form Field 元件和 parser/formatter。
6. Demo fixture 與 user data 完全分離；個人資料不得寫入 static JSON 或 Git。
7. 每完成一個 feature，補 repository integration 與 browser workflow tests。

## 驗收標準

- 空資料使用者可建立基本財務狀態。
- Reload、offline、關閉再開後資料仍存在。
- 可安全修改、封存與復原。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
