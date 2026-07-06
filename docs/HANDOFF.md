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

### Staging OPS Extraction

- Path: `reference/extractions/GraphX-OPS-staging-extraction-2026-07-06`
- This is the newest staging reference package and is intentionally ignored by Git.
- Full-source archive:
  - Path: `full-source-cdp-capture-2026-07-06`
  - Contents: 122 page manifests, 122 rendered DOM HTML files, 122 authenticated server HTML files, 122 screenshots, and downloaded CSS/JS asset copies.
  - Status: 121 OK, 1 login/denied (`changepassword`).
- Tab-state archive:
  - Path: `interactive-tab-state-capture-2026-07-06`
  - Contents: 93 tab-state manifests and screenshots.
  - Status: 93 discovered, 93 captured, 0 remaining.
  - Capture modes: 56 live-clicked states, 37 source-derived active-tab variants from authenticated staging DOM after Chrome automation timed out.
- Missing action/detail page audit:
  - Path: `expanded-safe-page-capture-2026-07-06`
  - Key index: `indexes/canonical-safe-page-capture-queue.csv`
  - Status: queue only, not live-captured yet.
  - Counts: 177 canonical safe page/action targets, 7,527 safe uncaptured URL variants, 292 unsafe/mutation-like targets excluded from the safe queue.
- Use the staging package before changing parity-sensitive simulator screens. Treat source-derived tab screenshots as source reference; local-rendered screenshots may show square placeholder icons where webfonts did not load.

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

- Current OPS exact-match pass was refreshed on 2026-07-06:
  - `ops-extracted-pages.js` now builds from `full-source-cdp-capture-2026-07-06/page-content-rendered-html` so Ajax-loaded datatable rows and nested order structures render in the simulator;
  - `scripts/build-extracted-pages.mjs` supports the full CDP folder names (`server-html`, `page-content-rendered-html`, and rendered breadcrumb captures);
  - Orders collapse controls are synced after render so OPS plus/minus icons, `aria-expanded`, and visible child rows stay aligned.
- Staging extraction gap pass was expanded on 2026-07-06:
  - tab states are now fully indexed (`93/93`, zero remaining);
  - missed safe action/detail pages are queued for a resumed authenticated capture (`177` canonical targets);
  - source-derived tab states are clearly marked in their manifests.
- Dashboard quick-link cards were corrected to OPS-like fixed dimensions, rounded corners, and thicker colored top borders.
- Sidebar icon/text spacing was corrected.
- Proposed notes were moved into a bottom dock and draggable modeless note window.
- Proposed combined-list filters should use OPS tab styling, not standalone button rows.

## Known Open Work

- Resume authenticated staging capture for the 177 canonical safe page/action targets in `expanded-safe-page-capture-2026-07-06/indexes/canonical-safe-page-capture-queue.csv`.
- Do not claim the action/detail page gap is captured until the queue has rendered DOM/source/screenshot manifests, not just target rows.
- Continue screen-by-screen parity verification.
- Do not assume a page is done because the route exists.
- Review Product Catalog, Orders, Stock & Settings, Product Tax/VAT, and dashboard surfaces against live OPS references before changing adjacent pages.
- Keep legacy handoff docs as context, but prefer the active root simulator over old `03_simulator_repo_snapshot` files.
