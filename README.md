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

- **Current OPS** renders the local generated OPS extraction bundle so admin routes preserve the live OPS layout, tables, tabs, row structures, icons, and controls without hitting OPS admin endpoints.
- **Proposed** renders the revised navigation and workflow model for review with the dev team.

Current OPS extracted tabs are generated from the authenticated staging tab-state archive. To resume the remaining safe action/detail-page capture after logging in to staging, enable Chrome `View > Developer > Allow JavaScript from Apple Events` and run:

```bash
node scripts/capture-staging-safe-pages.mjs --start <queueIndex>
```

## Scope

This is a front-end review artifact. It does not include hidden PHP source or production backend logic.

The simulator is intentionally closed from OPS admin systems:

- `index.html`
- `simulator.css`
- `simulator.js`
- `ops-extracted-pages.js`
- `ops-extracted-overrides.js`

It does not load live OPS pages, iframes, `capture-data.js`, PHP, backend data, or live admin endpoints. Current OPS page HTML is generated into `ops-extracted-pages.js` from authenticated reference captures and runs locally inside the simulator.

The only external runtime assets are public presentation dependencies:

- Google Fonts for typography
- Font Awesome for maintained icon rendering

Raw extraction material remains outside this published simulator as source-reference material only. The published simulator uses the generated local bundle plus local HTML/CSS/JS so it can be evolved into the requested revisions without coupling to live OPS.

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
