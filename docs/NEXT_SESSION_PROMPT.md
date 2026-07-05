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

Report back with exact files changed, exact routes/screens verified, and what remains.
```
