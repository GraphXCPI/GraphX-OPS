# OPS Simulator Handoff

This project was moved out of `GraphX_Platform` so OPS simulator work can continue as a standalone project.

## Active Project

- Project root: `/Users/cderamos/Projects/OPS Simulator`
- Active simulator source: project root files and folders
  - `index.html`
  - `simulator.js`
  - `simulator.css`
  - `assets/`
  - `icon-mapping/`
  - `ops-extracted-pages.js`
- Local preview command:

```bash
cd "/Users/cderamos/Projects/OPS Simulator"
python3 -m http.server 4179
```

- Local preview URL: `http://127.0.0.1:4179/`
- Git remote: `https://github.com/GraphXCPI/GraphX-OPS.git`
- Branch: `main`

## Reference Material

All OPS simulator reference material now lives inside this project under `reference/` and `archive/`.

### Handoff Package

- Path: `reference/handoff/GraphX-OPS-handoff`
- Purpose: older handoff package with extraction inventory, live reference notes, rejected-state screenshots, GitHub/deployment notes, and next-agent context.
- Start here when reviewing old handoff details:
  - `reference/handoff/GraphX-OPS-handoff/00_START_HERE/README.md`
  - `reference/handoff/GraphX-OPS-handoff/00_START_HERE/FOLDER_MAP.md`
  - `reference/handoff/GraphX-OPS-handoff/06_next_agent_context/NEXT_AGENT.md`
  - `reference/handoff/GraphX-OPS-handoff/06_next_agent_context/PARITY_CHECKLIST.md`

### Raw OPS Extraction

- Path: `reference/extractions/GraphX-OPS-raw-extraction-2026-07-03`
- Important subfolders:
  - `raw-source-html/`: 116 authenticated OPS admin HTML pages.
  - `raw-assets/`: downloaded OPS CSS, JS, and image assets.
  - `page-metadata/`: route metadata.
  - `raw-crawl-manifest.json`: extraction manifest.
- This material is source-reference only. Do not publish it directly.
- This folder is intentionally ignored by Git.

### Rendered OPS Extraction

- Path: `reference/extractions/GraphX-OPS-rendered-extraction-2026-07-04`
- Important subfolders:
  - `rendered-source-html/`
  - `page-content-html/`
  - `page-metadata/`
  - `rendered-crawl-manifest.json`
- Use this when a rendered content fragment is easier to inspect than the raw full-page HTML.
- This folder is intentionally ignored by Git.

### Historical Simulator Archive

- Path: `archive/ops-admin-simulator-2026-07-03`
- Purpose: older static simulator attempt retained for comparison only. The active simulator is the project root.
- This folder is intentionally ignored by Git.

## Verification Artifacts

- Active screenshots: `screenshots/`
- Live reference screenshots from the active simulator work: `live-screenshots/`
- Older handoff verification images: `reference/handoff/GraphX-OPS-handoff/04_verification/`

When verifying a screen, save new evidence under `screenshots/` unless a task explicitly asks to update the old handoff package.

## Current Working Rules

- `Current OPS` must match the live OPS admin UI.
- `Proposed` must keep OPS styling and layout unless a requested IA/layout change says otherwise.
- Do not redesign OPS.
- Use real OPS CSS/HTML classes and patterns wherever possible.
- Keep `simulator.css` and custom CSS limited to gaps from the OPS CSS.
- Verify one screen at a time in a browser before claiming it is done.
- Do not batch all routes unless each route was actually checked.
- Current/Proposed mode switching must preserve the current route.

## Most Recent Local Priorities

- Dashboard quick-link cards were corrected to OPS-like fixed dimensions, rounded corners, and thicker colored top borders.
- Sidebar icon/text spacing was corrected.
- Proposed notes were moved into a bottom dock and draggable modeless note window.
- Proposed combined-list filters should use OPS tab styling, not standalone button rows.

## Known Open Work

- Continue screen-by-screen parity verification.
- Do not assume a page is done because the route exists.
- Review Product Catalog, Orders, Stock & Settings, Product Tax/VAT, and dashboard surfaces against live OPS references before changing adjacent pages.
- Keep legacy handoff docs as context, but prefer the active root simulator over old `03_simulator_repo_snapshot` files.
