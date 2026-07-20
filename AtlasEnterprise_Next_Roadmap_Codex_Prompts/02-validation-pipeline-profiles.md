# Prompt 02 — Validation Pipeline 分層

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

降低目前超長 `npm run validate` 的日常成本，同時保留完整 Release Gate。

## 執行內容

1. 分析所有 package scripts、重複依賴、耗時與輸入輸出。
2. 建立 `validate:quick`、`validate:feature`、`validate:full`、`validate:release`。
3. 保留 `validate` 相容入口，不移除任何正式 Release 驗證。
4. 建立 runner 顯示 step、duration、exit code、log path，失敗可快速定位。
5. 文件治理、archive、retirement、release closure 類檢查放入 release profile。
6. 調整 GitHub Pages workflow 使用適當 profile，部署前仍覆蓋 frontend、knowledge、PWA、offline、deployment。
7. 建立 `docs/status/validation-profiles.md`。

## 驗收標準

- Quick 可捕捉常見錯誤。
- Full/Release 仍包含必要 Gate。
- 失敗 log 可診斷且 CI 保護未降低。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
