# Asset Liability Specification Traceability

| Runtime Field | Canonical Entity | Canonical Property | Type | Validation | Persistence | UI | Test |
| ------------- | ---------------- | ------------------ | ---- | ---------- | ----------- | -- | ---- |
| `id` | Asset | Id | string | Required persisted record | `assets.id` | Hidden key | `test:asset-liability-domain` |
| `ownerId` | Asset | OwnerId | string | Required owner | `assets.ownerId` | Current owner | `test:asset-liability-application` |
| `name` | Asset | Name | string | Required | `assets.name` | Asset form/list | `test:asset-liability-domain` |
| `assetType` | Asset | AssetType | enum | Catalog enum | `assets.assetType` | Select | `test:asset-liability-domain` |
| `currency` | Asset | Currency | enum | Supported currency | `assets.currency` | Select/list | `test:asset-liability-domain` |
| `currentValue` | Asset | CurrentValue | number | Finite number | `assets.currentValue` | Value input | `test:asset-liability-domain` |
| `valuationDate` | Asset | ValuationDate | date | Valid date | `assets.valuationDate` | Runtime date | `test:asset-liability-domain` |
| `status` | Asset | Status | enum | Lifecycle enum | `assets.status` | Archive/restore | `test:asset-liability-application` |
| `id` | Liability | Id | string | Required persisted record | `liabilities.id` | Hidden key | `test:asset-liability-domain` |
| `ownerId` | Liability | OwnerId | string | Required owner | `liabilities.ownerId` | Current owner | `test:asset-liability-application` |
| `name` | Liability | Name | string | Required | `liabilities.name` | Liability form/list | `test:asset-liability-domain` |
| `liabilityType` | Liability | LiabilityType | enum | Catalog enum | `liabilities.liabilityType` | Select | `test:asset-liability-domain` |
| `currency` | Liability | Currency | enum | Supported currency | `liabilities.currency` | Select/list | `test:asset-liability-domain` |
| `outstandingBalance` | Liability | OutstandingBalance | number | Finite non-negative number | `liabilities.outstandingBalance` | Balance input | `test:asset-liability-domain` |
| `asOfDate` | Liability | AsOfDate | date | Valid date | `liabilities.asOfDate` | Runtime date | `test:asset-liability-domain` |
| `status` | Liability | Status | enum | Lifecycle enum | `liabilities.status` | Archive/restore | `test:asset-liability-application` |
