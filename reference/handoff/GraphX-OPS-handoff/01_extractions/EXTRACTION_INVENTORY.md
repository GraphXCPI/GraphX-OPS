# Extraction Inventory

## Raw Extracted HTML

Location:

`/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-source-html`

Count at handoff: 116 HTML files.

These files are the current source of truth for rebuilding the OPS frontend
simulation. They are not sanitized. They preserve the live navbar/sidebar shell,
Font Awesome markup, jqPlot references, scripts, links, form values, page-specific
DOM, and native CSS classes.

Raw referenced assets:

`/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-assets`

Raw run manifest:

`/Users/cderamos/Projects/OPS Simulator/reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-crawl-manifest.json`

Important pages:

- `115-welcome.html`: OPS dashboard.
- `046-order_listing.html`: List Orders.
- `047-order_payment_request.html`: Payment Request.
- `025-export_orders.html`: Export/API Orders.
- `033-job_board_order_grid.html`: Job Board grid.
- `034-job_board_order.html`: Job Board order view.
- `056-product_listing.html`: Print Products list.
- `049-predefined_product_listing.html`: Ready To Buy Products list.
- `054-product_category_listing.html`: Product Categories.
- `041-media_gallery_listing.html`: current Media Gallery / Help Media reference.
- `007-cms_listing.html`: CMS Contents list.
- `010-configuration_settings.html`: Site Settings.
- `002-admin_constants.html`: Admin Panel Text References.
- `031-imposition_sheet_size_listing.html`: Imposition Beta / Product Imposition.

Do not publish this raw folder directly. Build a redacted or reconstructed
simulator from it.

## Historical Sanitized HTML

Location:

`/Users/cderamos/Projects/OPS Simulator/reference/handoff/GraphX-OPS-handoff/01_extractions/html-sanitized`

Count at handoff: 116 HTML files.

These files are from the earlier over-sanitized capture. Keep them only as a
historical artifact. Do not use them as the rebuild source.

Important pages:

- `115-welcome.html`: OPS dashboard.
- `046-order_listing.html`: List Orders.
- `047-order_payment_request.html`: Payment Request.
- `025-export_orders.html`: Export/API Orders.
- `033-job_board_order_grid.html`: Job Board grid.
- `034-job_board_order.html`: Job Board order view.
- `056-product_listing.html`: Print Products list.
- `049-predefined_product_listing.html`: Ready To Buy Products list.
- `054-product_category_listing.html`: Product Categories.
- `041-media_gallery_listing.html`: current Media Gallery / Help Media reference.
- `007-cms_listing.html`: CMS Contents list.
- `010-configuration_settings.html`: Site Settings.
- `002-admin_constants.html`: Admin Panel Text References.
- `031-imposition_sheet_size_listing.html`: Imposition Beta / Product Imposition.

## Live Screenshots

Location:

`/Users/cderamos/Projects/OPS Simulator/live-screenshots`

Count at handoff: 21 image files.

Use these for visual parity. The extracted HTML alone is not enough because global CSS, charts, fixed bars, spacing, and visual state matter.

Notable screenshots:

- `dashboard-current-live.png`
- `dashboard-gx002.png`
- `orders-menu.png`
- `print-products-list.png`
- `ready-to-buy-products-list.png`
- `product-category-seo.png`
- `cms-fixed-content.png`
- `cms-dynamic-page-seo.png`
- `cms-hidden-help.png`
- `image-manager.png`
- `stores-list.png`
- `duplicate-store-data.png`
- `markup-master.png`
- `edit-store-markup.png`
- `store-config-cards.png`
- `export-api-orders.png`
- `export-api-settings.png`
- `hot-folder-settings.png`
- `advanced-api.png`
- `webhook-settings.png`
- `product-settings.png`
