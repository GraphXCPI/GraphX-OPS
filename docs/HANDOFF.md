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
  - Runtime status: `ops-extracted-pages.js` now includes these 93 tab states. Current OPS tab clicks swap to captured tab DOM while preserving the current hash route.
- Missing action/detail page audit:
  - Path: `expanded-safe-page-capture-2026-07-06`
  - Key index: `indexes/canonical-safe-page-capture-queue.csv`
  - Status: canonical queue plus ignored live CDP capture folders for completed safe targets and targeted retries.
  - Counts: 177 canonical safe page/action targets, 7,527 safe uncaptured URL variants, 292 unsafe/mutation-like targets excluded from the safe queue.
  - Preferred resume script: `node scripts/capture-staging-safe-pages-cdp.mjs --start <queueIndex> --wait-ms 90000 --no-screenshots --new-tab --cdp-timeout-ms 120000 --server-fetch-timeout-ms 8000 --network-quiet-ms 3000 --settle-ms 2500 --stable-polls 6` uses the logged-in Chrome debug-port session and writes ignored `live-capture-cdp-*` folders.
  - Apple Events resume script: `node scripts/capture-staging-safe-pages.mjs --start <queueIndex>` remains a fallback only when Chrome JavaScript automation is enabled.
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
  - generated Current OPS routes now use captured tab-state DOM for OPS tabs, including PHP-query style tab links;
  - missed safe action/detail pages were captured through Chrome DevTools Protocol from a logged-in staging debug-port session (`177` canonical targets; `174` ok, `2` timed-out-captured with usable DOM, `1` retried with DOM-only fallback);
  - `scripts/build-extracted-pages.mjs` can merge completed safe action/detail live-capture folders into the existing `OPS_EXTRACTED_PAGES` bundle via `OPS_SAFE_CAPTURE_ROOTS`;
  - `scripts/capture-staging-safe-pages-cdp.mjs` was added for repeatable safe captures that wait for network quiet, DOM stability, and final settle before saving page content;
  - source-derived tab states are clearly marked in their manifests;
  - `scripts/capture-staging-safe-pages.mjs` was added for resumed safe-page capture once Chrome Apple Events JavaScript permission and staging auth are available.
- Final generated bundle status from the 2026-07-06 CDP merge:
  - `ops-extracted-pages.js` generated `290` extracted OPS routes;
  - safe capture roots loaded `178/182` available safe pages plus `93/93` captured tab states;
  - static generated-bundle scan found `0` live `visualgraphx.com/admin` URLs and `0` full-document bodies in generated route content;
  - `product_popover` is decoded from OPS JSON popup payload, and `template_manager_design` falls back to usable full rendered DOM because it does not render inside `.page-content`;
  - `send_custom_mail_popup` was recaptured with a valid staging order data ID and is now available as `#current/send-custom-mail-popup`;
  - live-only template/block pages were recaptured read-only from `visualgraphx.com` because staging returns `Temporary Down`: `#current/template-block-manager`, `#current/template-manage-block-properties-listing`, and `#current/template-properties-assign` now use the live Tritium RTM75/PKM150 template flow;
  - four skipped safe queue entries remain in the audit: the original errored `quote_request`, original empty-`dataId` `send_custom_mail_popup`, and original staging `template_manage_block_properties_listing` entries are superseded by loaded retry/live captures, while `user_print_ready_file` is a file-download endpoint on live and should not be committed as a customer PDF artifact.
- Browser verification on 2026-07-06 covered:
  - `#current/order-status` tabs `Order Product Status` and `Order Product Status Rules`;
  - `#current/product-categories` tab `Category group`;
  - `#current/site-settings` tab `Product`;
  - `#current/payment-request` tab `Completed`;
  - `#current/cms-pages` tab `Dynamic Pages`.
  - safe action/detail routes `#current/order-action`, `#current/quote-request`, `#current/product-action`, `#current/theme-css-action`, `#current/user-action`, `#current/workflow-listing`, `#current/product-popover`, `#current/template-manager-design`, and `#current/quote-product-assign-printer`.
  - direct route checks also covered `#current/sales-agents`, `#current/sales-order-details`, `#current/sales-order-product-details`, `#current/sales-order-summary`, `#current/schemas`, and `#current/seo-global`.
  - targeted retry verification covered `#current/send-custom-mail-popup` and confirmed `#proposed/send-custom-mail-popup` preserves the same OPS route because no proposed delta exists.
  - live-only template/block route verification covered `#current/template-block-manager`, `#current/template-manage-block-properties-listing`, and `#current/template-properties-assign`; each rendered the live Tritium RTM75/PKM150 content locally with `0` live admin links.
  - mode switching was verified from `#current/order-action` to `#proposed/order-action` and back to `#current/order-action`.
  - Evidence screenshots: `screenshots/qa-current-*-2026-07-06.png`.
- Current OPS generated-route smoke on 2026-07-06:
  - `290/290` generated Current OPS routes render locally without missing extracted roots, route mismatches, live admin links, or thin renders after the live-only template/block merge.
  - Two naive fallback-string hits were verified as source-content false positives: `coupons` has a real `Coming Soon` coupon state/filter, and `designer-studio-font-action` includes the Google font name `Coming Soon`.
  - Earlier smoke before the expanded action/detail capture covered `121/121` generated Current OPS routes.
  - Static generated-bundle scan found `0` full-document bodies/tab states and `0` remaining `staging.visualgraphx.com/admin` or `visualgraphx.com/admin` URL references.
  - `relogin` is excluded as a non-admin re-login endpoint; `html-help` uses its first captured tab state as the route body because the base page-content fragment was empty.
- Dashboard quick-link cards were corrected to OPS-like fixed dimensions, rounded corners, and thicker colored top borders.
- Sidebar icon/text spacing was corrected.
- Proposed notes were moved into a bottom dock and draggable modeless note window.
- Proposed combined-list filters should use OPS tab styling, not standalone button rows.

## Known Open Work

- Continue authenticated staging capture only for newly discovered routes or the source-reference entries whose `.page-content` fragments were empty.
- For repeat captures, prefer `scripts/capture-staging-safe-pages-cdp.mjs` with Chrome running on debug port `9222`; the Apple Events script remains a fallback only when Chrome JavaScript automation is enabled.
- Do not claim a page is parity-complete until the generated route is visually checked against staging/current OPS, not just because rendered DOM/source manifests exist.
- Continue screen-by-screen parity verification.
- Do not assume a page is done because the route exists.
- Review Product Catalog, Orders, Stock & Settings, Product Tax/VAT, and dashboard surfaces against live OPS references before changing adjacent pages.
- Keep legacy handoff docs as context, but prefer the active root simulator over old `03_simulator_repo_snapshot` files.
