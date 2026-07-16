# Knowledge Split Worker V Progress Report

## Scope
- `knowledge/framework/background-job-framework.md`
- `knowledge/framework/background-job/matrices-and-controls.md`
- `knowledge/framework/automation-framework.md`
- `knowledge/framework/automation/matrices-and-controls.md`
- New split documents under `knowledge/framework/background-job/` and `knowledge/framework/automation/`

## Completed Changes
- Added Split Navigation links from `background-job-framework.md` to:
  - `background-job/strategy-and-recovery.md`
  - `background-job/operational-controls.md`
- Added Split Navigation links from `automation-framework.md` to:
  - `automation/strategy-and-recovery.md`
  - `automation/operational-controls.md`
- Added `knowledge/framework/background-job/strategy-and-recovery.md` to isolate retry, checkpoint, resume, and failure recovery strategy content.
- Added `knowledge/framework/background-job/operational-controls.md` to isolate validation, business rules, security, audit, and performance controls.
- Added `knowledge/framework/automation/strategy-and-recovery.md` to isolate retry, compensation, escalation, approval, and failure recovery strategy content.
- Added `knowledge/framework/automation/operational-controls.md` to isolate validation, business rules, security, audit, and performance controls.

## Split Rationale
- The existing matrices-and-controls documents combine matrix mappings, strategy sections, validation rules, business rules, and operational controls in one large surface.
- The new strategy-and-recovery files make execution behavior easier to find without changing the canonical parent body.
- The new operational-controls files make governance checks, audit, security, and performance obligations independently readable.
- Parent documents keep their original正文 and only gain Split Navigation links.

## Verification
- Confirmed new child document paths are under the allowed worker scope.
- Confirmed parent updates are limited to Split Navigation links.
- No `frontend/knowledge/**`, package files, lockfiles, or git commit were modified.

