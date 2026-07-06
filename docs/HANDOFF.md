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

- Round-2 rearrangement pass (2026-07-06, approved by Christian, all beyond-doc items annotated in the proposal dock):
  - New top-level **Production** area (Production Dashboard landing page, Job Board moved from Orders, new Statuses & Workflow entry, Production Users/Roles moved from Admin Users).
  - **Customer Workspace**: tabbed customer dashboard (`customer-workspace`), same context-tab primitive as Store Workspace, linked under Customer Accounts.
  - **Design & Templates**: Templates and Designer Studio merged into one sidebar group; each landing page carries an OPS tab row over all subpages (`proposedTemplateTabs` / `proposedStudioTabs`, injected via `proposedLeadHtmlFor` for extracted passthrough routes).
  - **Store Configuration** submenu split with non-clickable section headings (Commerce Settings / System) — heading items use `{ heading: "…" }` in the menu tree.
  - Global **“+ New”** topbar action (proposed mode only): New Order / Quote / Product / Customer.
  - **Pinned** sidebar block (proposed mode only) surfacing the existing breadcrumb pin control.
  - **Statuses & Workflow** page (`statuses-workflow`) consolidating order/order-product/quote status config with cross-links to the originals (dual entry).
  - Contextual **Reports** entries in Orders, Quotes, Product Catalog, and Customer Accounts (`order-reports` etc., alias pages in the reports family).
  - Dashboard **deep links**: Job Board chips and card View All links navigate to the filtered master lists in proposed mode.
  - Rejected idea (do not revive): grouping Coupons/Store Credit/Markup/Product Price into one “Pricing & Promotions” family — they serve different objects (Christian, 2026-07-06).
  - Verified headless via `playwright-core` (scratchpad script) after the Claude preview MCP dropped: all new routes render, menu-diff classifications correct, `+ New`/pinned/headings work, current mode carries zero proposed chrome, no JS errors. Evidence: `screenshots/proposed-production-dashboard-highlights.png`, `screenshots/proposed-customer-workspace.png`, `screenshots/proposed-design-templates-tabs.png`.

- Change highlighting (2026-07-06): opening the proposal-notes window (info button, Proposed mode) now outlines everything that differs from Current OPS on the visible screen — sidebar groups/items get `data-change="new|renamed|moved"` from a computed menu diff (`proposedItemChange`/`proposedGroupChangeInfo` in `simulator.js`, with `proposedChangeOverrides` for history the menus can't derive), and page content is outlined via per-route selector rules (`proposalHighlightRules`). Colors: green = new, amber = renamed, purple = moved, blue = behavior change; a legend renders at the top of the notes window and hover tooltips give the before/after. Styles live in `assets/admin_style.css` under `.gx-sim.ops-highlighting` (bumped to `?v=19`).

- Proposed-mode doc-alignment pass (2026-07-06, later same day):
  - Fixed a routing bug where the custom proposed Orders page was shadowed by the extracted `orders` route; `proposedCustomPages` in `simulator.js` now keeps `orders` and the new `product-edit*` routes on their dedicated renderers.
  - Proposed SEO menu is central/technical only (Global SEO, Sitemaps, Metatags, Robots, Redirects, HTML Help). Per-object SEO pages were removed from the menu; their old routes render pointer screens into the owning object. `#proposed/image-alt` points to Asset Manager; mode switch from `#current/image-alt` lands on `asset-manager`.
  - New proposed product edit screens: `product-edit`, `product-edit-inventory` (SKU, weight, production days, stock), `product-edit-seo`, linked from the Product Catalog mixed rows. Category Group edit gained an SEO card.
  - Store Workspace Site Builder tab now lists the full store-locked workspace (7 builder areas + 10-item Content Management group) plus a store-locked Duplicate Store Data entry.
  - Proposed Orders search row expanded (customer/company, store, payment status, order status, product status, date range); heading is "Orders".
  - Product Catalog extracted overlay injects Product Type chips and system tag pills into every row; `.gx-sim .pill` and unscoped `.product-type-chip` styles added to `assets/admin_style.css` (bumped to `?v=18`).
  - Re-homed items in the proposed nav: Job Board (Orders), Predefined Text (Quotes), Customer Templates (Customer Accounts), Promotional Message (Site Builder content group), Preview Image DPI (Product Catalog), Manage Web Storage + Add on Plugins/Services (Store Configuration), Marks Management (Product Imposition).
  - Proposal-dock notes now flag beyond-doc consolidations (Reports grouping, Stock & Settings merge, Templates/Studio trims, Admin submenu relabels).
  - The Google requirements doc was updated in place: Unpaid/Archive contradiction resolved (filters/saved views win), duplicated "page categories" removed, and an addendum added (Unchanged/Parked Items, Additional Proposed Consolidations, changelog).
  - Note: root `simulator.css` is NOT loaded by `index.html`; active simulator styles live in `assets/admin_style.css` under `.gx-sim`. Treat `simulator.css` as legacy.
  - Verified in browser: `#proposed/orders` (tabs, chips, filters), `#proposed/product-catalog`, `#proposed/product-edit{,-inventory,-seo}`, `#proposed/store-workspace-builder`, central SEO routes, all re-homed routes, per-object SEO pointers, current-mode smoke (orders, print-products, image-alt, sitemaps, site-settings, payment-request, product-categories, media-gallery), and mode-switch round trips.

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
  - `ops-extracted-pages.js` generated `289` extracted OPS routes;
  - safe capture roots loaded `175/179` available safe pages plus `93/93` captured tab states;
  - static generated-bundle scan found `0` live `visualgraphx.com/admin` URLs and `0` full-document bodies in generated route content;
  - `product_popover` is decoded from OPS JSON popup payload, and `template_manager_design` falls back to usable full rendered DOM because it does not render inside `.page-content`;
  - `send_custom_mail_popup` was recaptured with a valid staging order data ID and is now available as `#current/send-custom-mail-popup`;
  - four skipped safe queue entries remain in the audit: the original errored `quote_request` and original empty-`dataId` `send_custom_mail_popup` entries are superseded by loaded retry captures, while `template_manage_block_properties_listing` and `user_print_ready_file` still need alternate valid source IDs.
- Browser verification on 2026-07-06 covered:
  - `#current/order-status` tabs `Order Product Status` and `Order Product Status Rules`;
  - `#current/product-categories` tab `Category group`;
  - `#current/site-settings` tab `Product`;
  - `#current/payment-request` tab `Completed`;
  - `#current/cms-pages` tab `Dynamic Pages`.
  - safe action/detail routes `#current/order-action`, `#current/quote-request`, `#current/product-action`, `#current/theme-css-action`, `#current/user-action`, `#current/workflow-listing`, `#current/product-popover`, `#current/template-manager-design`, and `#current/quote-product-assign-printer`.
  - direct route checks also covered `#current/sales-agents`, `#current/sales-order-details`, `#current/sales-order-product-details`, `#current/sales-order-summary`, `#current/schemas`, and `#current/seo-global`.
  - targeted retry verification covered `#current/send-custom-mail-popup` and confirmed `#proposed/send-custom-mail-popup` preserves the same OPS route because no proposed delta exists.
  - mode switching was verified from `#current/order-action` to `#proposed/order-action` and back to `#current/order-action`.
  - Evidence screenshots: `screenshots/qa-current-*-2026-07-06.png`.
- Current OPS generated-route smoke on 2026-07-06:
  - `121/121` generated Current OPS routes render locally without missing extracted roots, route mismatches, simulator fallback-body warnings, or thin renders.
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
