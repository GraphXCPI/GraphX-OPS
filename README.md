# GraphX OPS Admin Simulator

Static simulator for reviewing the current OPS admin baseline and proposed GraphX OPS information architecture.

## Live Modes

- **Current OPS** prioritizes live GX-002 screenshots supplied during review when available, with sanitized captured HTML available from each page as DOM/field reference.
- **Proposed** renders the revised navigation and workflow model for review with the dev team.

## Scope

This is a front-end review artifact. It uses rendered HTML/DOM reference data and does not include hidden PHP source or production backend logic.

The simulator preserves business labels, menus, forms, table structure, representative rows, and workflow placement. Secret-like values, API keys, CSRF tokens, emails, and phone numbers were masked during capture.

The July 3 captured HTML remains useful for page structure, but some captured context was stale versus the live GX-002 screen review. The live screenshot references are therefore treated as the visual baseline where present.

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
