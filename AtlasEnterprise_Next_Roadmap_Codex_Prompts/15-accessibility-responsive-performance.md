# Prompt 15 — Accessibility、Responsive、Performance

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

讓核心流程可由鍵盤與輔助科技操作，並維持大型資料下的效能。

## 執行內容

1. 改善 semantic HTML、landmark、heading、label/error association、focus、keyboard、dialog、contrast、reduced motion。
2. 測試 320px mobile、tablet、desktop、large desktop；處理 table/chart overflow 和 accessible summary。
3. 量測 startup、knowledge load、search、IndexedDB query、projection、scenario run、render。
4. 建立 performance budget 與 regression threshold，不宣稱未量測改善。
5. 避免一次載入所有 Knowledge body；大型 list 依需求使用 pagination/incremental rendering/virtualization。
6. 補 Playwright accessibility 與 viewport tests。

## 驗收標準

- 核心流程全鍵盤可用。
- Mobile 無主要橫向溢出。
- 效能有 baseline 和 threshold。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
