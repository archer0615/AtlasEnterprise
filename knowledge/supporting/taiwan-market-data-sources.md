# knowledge/taiwan-market-data-sources.md

## Purpose
Defines authoritative Taiwan financial market data sources used by Project Atlas.

### Primary Sources
- TWSE
- TPEx
- Central Bank of Taiwan
- DGBAS
- Ministry of the Interior
- ETF issuer official websites
- Major domestic banks

### Data Domains
- Equity prices
- ETF NAV, holdings, dividends
- Mortgage rates
- Deposit rates
- CPI and inflation
- Salary statistics
- House price index
- Exchange rates

### Metadata Required
- Source
- CollectedAt
- EffectiveDate
- Version
- ConfidenceScore
- Checksum

### Confidence Levels
|Score|Meaning|
|---:|---|
|100|Official government/exchange|
|90|Issuer|
|80|Financial institution|
|70|Validated third party|
|50|Manual input|

### Fallback Priority
1. Official source
2. Exchange
3. Issuer
4. Bank
5. Cached snapshot

### Architecture
External Source
→ Collector
→ Validator
→ Normalizer
→ Snapshot Storage
→ Domain Service
→ Decision Engine

### Codex Notes
Business rules must consume normalized snapshots rather than querying external providers directly.
