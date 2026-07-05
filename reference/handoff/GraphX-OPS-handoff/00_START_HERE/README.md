# GraphX OPS Simulator Handoff

This folder packages the OPS admin extraction and simulator work so another agent or developer can continue without relying on chat history.

## Current Situation

The goal is a full front-end simulation of the OnPrintShop admin experience for Visual Graphx, then a proposed version with the requested information architecture changes, then a more radical GraphX-styled concept.

The current simulator is not acceptable as a final reference yet. The user specifically rejected the simulator because it did not match the live OPS interface closely enough. The most important correction for the next pass is to compare each rebuilt page against the live OPS page or live screenshot before moving on.

## Key Paths

- Simulator repo: `/Users/cderamos/Projects/OPS Simulator`
- Handoff folder: `/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff`
- Raw unsanitized OPS extraction: `/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03`
- Rendered OPS extraction: `/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-rendered-extraction-2026-07-04`
- Historical simulator archive: `/Users/cderamos/Projects/OPS Simulator/archive/ops-admin-simulator-2026-07-03`
- Live reference screenshots: `/Users/cderamos/Projects/OPS Simulator/live-screenshots`
- Simulator source snapshot: `/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/03_simulator_repo_snapshot`
- Verification screenshots and rejected output: `/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/04_verification`
- GitHub notes: `/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/05_github/GITHUB.md`
- Continuation instructions: `/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/06_next_agent_context/NEXT_AGENT.md`

## What Is Included

- 116 raw unsanitized HTML pages extracted from the authed OPS admin panel in `/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-source-html`.
- 73 raw referenced CSS/JS/image assets in `/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-assets`.
- 116 sanitized HTML pages from the earlier extraction, retained only as a historical artifact.
- 21 live reference screenshots covering the pages and workflows discussed.
- Historical static simulator snapshot files: `index.html`, `app.js`, `styles.css`, and `capture-data.js`.
- Current active simulator source files are in `/Users/cderamos/Projects/OPS Simulator`: `index.html`, `simulator.js`, `simulator.css`, `assets/`, and `icon-mapping/`.
- A latest List Orders parity screenshot from the local simulator.
- A rejected screenshot showing the nested shell issue that must not recur.
- Process instructions for rebuilding page-by-page against live OPS.

## Non-Negotiable Acceptance Standard

For every page added or modified:

1. Open the live OPS page or the matching live reference screenshot.
2. Open the simulator page at the same viewport.
3. Compare top bar, sidebar, breadcrumb/admin bar, typography, spacing, table headers, forms, buttons, scroll behavior, and interactions.
4. Fix the simulator until it visually matches the live OPS page in Current OPS mode.
5. Only then apply the proposed IA/design changes in Proposed mode.

Do not build from memory or from an approximate dashboard mockup.

Use the raw extraction as the source of truth for structure. It preserves the live
navbar, sidebar, Font Awesome stack markup, jqPlot references, scripts, links,
form fields, and page-specific DOM that the sanitized capture obscured.
