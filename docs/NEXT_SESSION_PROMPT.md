# Next Session Prompt

Use this prompt to start a fresh Codex session.

```text
We are working in:
/Users/cderamos/Projects/OPS Simulator

Goal:
Continue the standalone OPS Simulator project. Current OPS must match the live OnPrintShop admin UI. Proposed must use the same OPS styling/layout and show only explicitly requested IA/layout changes.

Start by reading:
- /Users/cderamos/Projects/OPS Simulator/docs/HANDOFF.md
- /Users/cderamos/Projects/OPS Simulator/README.md
- /Users/cderamos/Projects/OPS Simulator/simulator.js
- /Users/cderamos/Projects/OPS Simulator/assets/admin_style.css
- /Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/06_next_agent_context/NEXT_AGENT.md
- /Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/06_next_agent_context/PARITY_CHECKLIST.md

Critical rules:
- Do not redesign OPS.
- Do not approximate with generic CSS.
- Use actual OPS CSS/HTML patterns and classes wherever possible.
- Separate/custom CSS is only for gaps from OPS CSS or proposed-only deltas.
- Preserve OPS font, weight, spacing, table density, buttons, tabs, headers, breadcrumbs, footer, and sidebar behavior.
- Work one screen/section at a time and verify in browser before claiming done.
- Do not batch pages unless each page is actually verified.
- Current OPS / Proposed toggle must preserve the current route.
- Current OPS must not include Proposed changes.
- Proposed pages must not show broken bare tables or browser-default controls.
- When combining screens into one proposed screen, use OPS tab styling, not standalone button rows.
- Before rebuilding a screen, check the newest staging reference package:
  `/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-staging-extraction-2026-07-06`
- The staging tab-state archive is complete: 93 discovered, 93 captured, 0 remaining.
- Template and block management pages are live-only; capture those read-only from `https://visualgraphx.com/admin`, not staging.
- The generated route-link gap pass is current as of 2026-07-06:
  `ops-extracted-pages.js` has 387 extracted pages, the full generated route-link scan has 0 missing linked targets across 372 local linked targets, and the product/settings/template/email/shipping/SEO focused scan also remains clean.
- The tracked targeted capture queues are:
  `docs/targeted-product-settings-gap-capture-queue-2026-07-06.csv`,
  `docs/targeted-template-email-gap-capture-queue-2026-07-06.csv`, and
  `docs/targeted-current-route-link-gap-capture-queue-2026-07-06.csv`.
- For newly discovered action/detail pages, resume from the canonical safe queue or the tracked targeted queues in `docs/`, and do not claim those pages captured until rendered DOM/source manifests and browser verification exist.

Before editing:
- Run `git status --short`.
- Start or confirm the local server:
  `python3 -m http.server 4179`
- Use Playwright/browser screenshots for verification.

Current known project state:
- Active simulator files are in the project root.
- Reference/handoff material is under `reference/`.
- Older simulator attempt is archived under `archive/`.
- Recent fixes include dashboard quick-link cards, sidebar icon/text spacing, and contextual Proposed notes.
- Latest extraction passes added a full-source archive, completed tab-state archive, queued safe action/detail-page target list, and targeted live queues for product/settings/template/email gaps. See `docs/HANDOFF.md` for exact counts and paths.

Report back with exact files changed, exact routes/screens verified, and what remains.
```
