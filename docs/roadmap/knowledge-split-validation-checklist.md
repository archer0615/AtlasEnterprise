# Knowledge Split Validation Checklist

## Purpose

Standardize validation reporting for future split workers.

## Required Worker Evidence

| Check | Required Evidence |
| --- | --- |
| Parent navigation | Parent file path and `Split Navigation` line confirmed. |
| Child files | New child file paths listed. |
| Canonical preservation | Statement that parent body content was preserved, or explicit migration notes. |
| Link resolution | Relative parent-to-child links checked. |
| Generated artifacts | State whether `frontend/knowledge/**` was untouched or rebuilt by `npm run build:knowledge`. |
| Validation command | Record `npm run validate:frontend` for narrow documentation edits or `npm run validate` for batch completion. |
| Git state | State that no commit was created unless the user explicitly requested one. |

## Recommended Commands

```powershell
Select-String -Path <parent-files> -Pattern 'Split Navigation'
npm run build:knowledge
npm run validate:frontend
git diff --check
git status --short
```

## Batch-Level Completion

For multi-worker batches, run:

```powershell
npm run validate
```

Then record generated document count, validation result, and any remaining high-line-count files without split navigation or legacy marking.
