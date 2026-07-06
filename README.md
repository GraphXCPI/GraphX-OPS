# GraphX OPS Admin Simulator

Static, self-contained simulator for reviewing the current OPS admin baseline and proposed GraphX OPS information architecture.

## Current Location

This project now lives at:

`/Users/cderamos/Projects/OPS Simulator`

The active simulator is the project root. Historical extraction and handoff material is documented in:

- `docs/HANDOFF.md`
- `reference/README.md`
- `reference/handoff/GraphX-OPS-handoff/`

For a fresh session prompt, use `docs/NEXT_SESSION_PROMPT.md`.

The newest staging OPS reference package is documented in `docs/HANDOFF.md`. The raw extraction folders are intentionally ignored by Git; the tracked docs record the current capture counts and remaining action/detail-page queue.

## Live Modes

- **Current OPS** renders a code-native reconstruction of the live OPS dashboard so layout, tables, job boards, Font Awesome-style controls, and the jqPlot-style sales chart can be tested interactively.
- **Proposed** renders the revised navigation and workflow model for review with the dev team.

## Scope

This is a front-end review artifact. It does not include hidden PHP source or production backend logic.

The simulator is intentionally closed from OPS systems:

- `index.html`
- `simulator.css`
- `simulator.js`

It does not load captured HTML, live OPS pages, iframes, `capture-data.js`, PHP, backend data, or live admin endpoints. All representative workflow data used by the simulator is local inside `simulator.js`.

The only external runtime assets are public presentation dependencies:

- Google Fonts for typography
- Font Awesome for maintained icon rendering

Raw extraction material remains outside this published simulator as source-reference material only. The simulator itself is rebuilt as HTML/CSS/JS so it can be evolved into the requested revisions without coupling to OPS or any extraction artifact.

## Key Review Areas

- Product Catalog consolidation
- Orders consolidation
- Store-context workspace
- Content & Help Media
- Export, API & Webhooks
- Vendors & Partners
- SEO context ownership
- Product Imposition rename
- Admin Users and Reports & System Logs
