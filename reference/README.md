# Reference Folder

This folder contains source evidence and handoff context for the OPS simulator. The active simulator lives in the project root, not in this folder.

## Contents

- `extractions/GraphX-OPS-raw-extraction-2026-07-03/`: raw authenticated OPS admin capture. Use as a structure and CSS reference only. Do not publish directly.
- `extractions/GraphX-OPS-rendered-extraction-2026-07-04/`: rendered/page-content extraction for easier inspection.
- `handoff/GraphX-OPS-handoff/`: older handoff package with inventory, live-reference notes, rejected-state screenshots, and next-agent instructions.

Large or sensitive reference folders are intentionally ignored by Git. Keep them local unless a redacted derivative is explicitly requested.

## Use Order

1. Start with the active simulator in `/Users/cderamos/Projects/OPS Simulator`.
2. Use `docs/HANDOFF.md` for the current project map.
3. Use `reference/handoff/GraphX-OPS-handoff/06_next_agent_context/NEXT_AGENT.md` for historical context and warnings.
4. Use raw/rendered extraction files only to verify OPS structure, class names, and page-specific DOM.

Keep new verification artifacts in the root `screenshots/` folder unless the task specifically asks to update an archived handoff package.
