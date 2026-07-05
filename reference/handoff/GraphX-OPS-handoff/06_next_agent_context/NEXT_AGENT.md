# Next Agent Context

## User Intent

The user wants a faithful OPS admin front-end simulator that can be used as a design contract for the dev team. The simulator must first match the current OPS experience, then provide a Proposed version that implements the documented IA changes, then a more radical GraphX-feeling concept.

The user is not asking for a loose redesign. They are asking for a live-faithful simulation with changes layered on top.

## Current Frustration

The simulator was rejected because:

- It did not match the live OPS visual system closely enough.
- A page navigation attempt nested a second OPS shell inside the simulator.
- Sidebar links did not reliably navigate to their pages.
- Sidebar accordion behavior did not match OPS. In OPS, opening one collapsible closes the previously open one.
- The fixed top bar was missing or incorrect in some simulator states.
- Font Awesome icons and the top-bar stacked home/admin icon were off.
- Margins, padding, and fonts were visibly different.

Do not claim a page is done without a screenshot comparison.

## Required Page-Build Process

For each page:

1. Identify the live source HTML in `01_extractions/html-sanitized`.
2. Identify the best live screenshot in `02_live_references/live-screenshots`.
3. Build or adjust the simulator page.
4. Use Playwright at the same viewport as the reference screenshot.
5. Save a screenshot to `04_verification`.
6. Compare the screenshot visually against the live reference.
7. Fix shell, spacing, typography, table layout, buttons, icons, and scroll behavior before moving on.

## Important Current OPS Requirements

- One shell only. Never render a captured `#navbar`, `#sidebar`, `.navbar`, or `.sidebar` inside the content pane.
- Top bar is fixed/sticky at the top.
- Sidebar uses OPS visual styling and single-open accordion behavior.
- Sidebar links must navigate to their respective pages.
- Dashboard cards, job board chips, jqPlot-style chart area, tables, and hover/popover behavior should look like OPS.
- Current OPS mode should be a visual baseline, not a redesigned version.

## Proposed Version Requirements From The Planning Doc

The planning doc is:

`https://docs.google.com/document/d/1IpGwmG36bhYnlPFxPIgLs5TQfu5kq0REIkeiBxc1VEc/edit?usp=sharing`

Core requested IA changes:

- Rename `Customer` to `Customer Accounts`.
- Rename `Business Partners` to `Vendors & Partners`.
- Move Quote Management vendor-related screens into `Vendors & Partners`:
  - `Printer Quotes` becomes `Vendor Quotes`.
  - `Printer` becomes `Vendors`.
  - `Sales Agent` becomes `Sales Agents & Partners`.
- Rename `Admin` to `Admin Users`.
- Rename `Reports` to `Reports & System Logs`.
- Rename `Imposition Beta` to `Product Imposition`.
- Add Store Configuration link:
  - label: `Admin Panel Text References`
  - URL pattern: `https://{siteurl}/admin/admin_constants.php`
- Move Export and API Settings to its own sidebar menu:
  - `Order Exports`
  - `API & Webhooks`
- Global API remains global for now. Add a future question for context-aware API/webhooks by B2C, B2B, and Franchise/Reseller store type.
- Product navigation should become `Product Catalog`.
- Combine split product types into one list:
  - Print Products
  - Ready To Buy Products
  - product type tags/columns
  - add buttons direct to the proper page/type.
- Orders should stay named `Orders`.
- Flatten List Orders, Payment Requests, Unpaid Orders, and Archive Orders into the master Orders area with fast filters.
- CMS/media should become `Content & Help Media`.
- Current `Media Gallery` is not the same as Help Media. Hidden CMS/image manager should be brought forward and improved.
- Help Media should support better asset management, folder organization, external media links such as audio/video, and image tagging.
- Store-level context and global context both matter.
- Markup Master should live in both broad/multi-context and focused store-context areas:
  - Markup Master is the template list/builder.
  - Store Markup assignment only assigns a markup template to the store.
  - Markup can also apply to users and groups, so burying it only under Store Management breaks context.
- Include future addendum note for additional pages.

## GraphX Concept Later

After Current OPS and Proposed are solid, pull design direction from:

`/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage`

Useful files found:

- `/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage/src/apps/proof-admin/app/globals.css`
- `/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage/src/apps/proof-admin/app/admin-shell.tsx`
- `/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage/src/apps/proof-admin/app/page.tsx`
- `/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage/src/apps/proof-admin/app/components/Icon.tsx`
- `/Volumes/Servers/DockerServer/server/mnt/data-d/docker/graphx-manage/src/apps/portal-web/app/globals.css`

Do not start the GraphX concept until the current OPS simulator and Proposed version are functionally stable.

