# PWA Entry Governance Alignment Report

## 修改檔案

| File | 修改原因 |
| --- | --- |
| `README.md` | 將 Repository 入口明確定義為 GitHub Pages、Static PWA、Browser Runtime、Offline-first、IndexedDB Persistence、Local Calculation Runtime，並將 ASP.NET Core、PostgreSQL、EF Core、Server REST API、Cloud Database、Authentication Server、Multi-device Sync 降級為 Future Optional Architecture。 |
| `.codex/architecture-pwa.md` | 將 Codex PWA 架構規則對齊 `docs/architecture/ADR-001-static-local-first-pwa.md`，明確 v1 使用 IndexedDB Repository Adapter，Future Cloud Architecture 不得成為 v1 必要依賴。 |
| `.codex/database-pwa.md` | 補明 Atlas v1 Persistence 是 Repository Interface + IndexedDB Repository Adapter，並禁止 frontend startup 或 Browser Runtime calculation 依賴 server database。 |
| `.codex/roadmap.md` | 將 Roadmap 改為 Repository Baseline、Static PWA Foundation、Browser Domain/Application Runtime、IndexedDB Persistence、Calculation Runtime、Scenario and Decision Runtime、Dashboard Workflow、Backup and Migration、GitHub Pages Deployment，並把雲端/後端項目移至 Future Cloud Phase。 |
| `.codex/project-context.md` | 新增入口治理上下文，明確 PWA v1 Runtime、Future Optional Architecture 與禁止修改 Domain/Rule/Formula/Entity/Calculation 的邊界。 |
| `.codex/deployment-pages.md` | 補明 GitHub Pages Static PWA 是 v1 deployment，且 deployment 不得依賴 ASP.NET Core、PostgreSQL、EF Core、Server REST API、Cloud Database、Authentication Server、Multi-device Sync 或 always-online backend。 |
| `frontend/README.md` | 將 frontend 入口改為 Static-first、Local-first GitHub Pages PWA shell，補明 Browser Runtime、Offline-first、IndexedDB Persistence、Knowledge JSON、Local Calculation Runtime 與 Future Optional Architecture 邊界。 |
| `backend/README.md` | 明確 `backend/` 非 v1 核心 Runtime，不得成為 frontend 啟動與運作依賴，只能作為 Future Adapter、Future Optional Architecture 或 prototype 保留。 |
| `simulator/README.md` | 明確 simulator 必須對齊 Browser Runtime、Local Calculation Runtime、Scenario and Decision Runtime，不得引入必要後端/雲端依賴，也不得修改 Business Rule、Formula、Entity、Calculation 或 fixture expected result。 |
| `docs/README.md` | 新增 docs 入口，將文件治理導向 ADR-001 Static Local First PWA，並列出 PWA v1 Architecture 與 Future Optional Architecture 邊界。 |
| `docs/architecture/ADR-001-Local-First-PWA.md` | 保留歷史 ADR，新增治理優先順序註記，避免與新 ADR 互相競爭。 |
| `docs/architecture/ADR-001-PWA-Architecture.md` | 保留既有架構文件，新增治理優先順序註記，指向新 ADR 作為統一治理入口。 |

## 未修改但仍可能衝突的檔案

| File | 可能衝突原因 |
| --- | --- |
| `.codex/reports/final-validation-report-2026-07-15.md` | 歷史報告提到 `No runtime database` 與 `No backend API`，需下一批判斷是否標記為 historical snapshot 或改成 PWA v1 / Future Optional Architecture 語意。 |
| `.codex/reports/knowledge-repository-structure-governance-report.md` | 提到 `Runtime Database Requirement`，需確認是否與 IndexedDB Persistence 術語衝突。 |
| `.codex/reports/knowledge-repository-migration-plan.md` | 提到 `Runtime Database Requirement`，需確認是否與 IndexedDB Persistence 術語衝突。 |
| `docs/pwa/StaticDeploymentChecklist.md` | 提到不要加入 runtime database / backend API requirement，需下一批補清楚 IndexedDB Persistence 與 Future Optional Architecture 邊界。 |
| `database/README.md` | 仍使用 Future Architecture server database 語意，建議下一批統一為 Future Optional Architecture。 |

## 建議下一批處理範圍

- `docs/pwa/**`
- `.codex/reports/**` historical governance reports
- `database/README.md`
- `docs/reports/**` architecture audit reports
- GitHub Pages workflow files if `.github/workflows/**` is later added

## Validation

- Passed: `npm run validate:pwa`
- Passed: `npm run validate:offline`
- Passed: `npm run validate:deployment`
