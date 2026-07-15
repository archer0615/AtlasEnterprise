# Asset Identity and Ownership

## Purpose

This split document isolates Asset identity and ownership rules from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## Identity Rules

- Asset keeps a stable `AssetId`.
- Optional `AssetNumber` is an external or user-facing identifier and must not replace `AssetId`.
- Asset identity is separate from Portfolio Holding or Position identity.
- Asset is owned inside `AssetPortfolio` and is not an aggregate root.

## Ownership Rules

- Asset must maintain `HouseholdId` scope.
- Optional `OwnerUserId` can identify the user context authorized to manage the Asset.
- Household isolation is required even when tenant support exists.
- Tenant concepts must not replace Household ownership semantics.

## Related References

- [Asset Entity Specification](../Asset.md)
- [Portfolio Entity](../Portfolio.md)
- [Household Entity](../Household.md)
- [Permission Framework](../../security/permission-framework.md)
