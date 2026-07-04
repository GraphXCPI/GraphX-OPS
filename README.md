# GraphX OPS Admin Simulator

Static simulator for reviewing the current OPS admin baseline and proposed GraphX OPS information architecture.

## Live Modes

- **Current OPS** renders a code-native reconstruction of the live OPS dashboard so layout, tables, job boards, Font Awesome controls, and the jqPlot-style sales chart can be tested interactively.
- **Proposed** renders the revised navigation and workflow model for review with the dev team.

## Scope

This is a front-end review artifact. It uses rendered HTML/DOM reference data and does not include hidden PHP source or production backend logic.

The simulator preserves business labels, menus, forms, table structure, representative rows, and workflow placement. Secret-like values, API keys, CSRF tokens, emails, and phone numbers were masked during capture.

The July 3 captured HTML remains useful for page structure, live CSS classes, Font Awesome usage, jqPlot chart markup, and field/table references. The Current OPS dashboard is rebuilt as HTML/CSS/JS rather than displayed as a static screenshot, so it can be evolved into the requested revisions.

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
