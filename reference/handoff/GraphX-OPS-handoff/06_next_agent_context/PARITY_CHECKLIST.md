# OPS Page Parity Checklist

Use this before marking a page complete.

## Shell

- One top bar only.
- One sidebar only.
- No captured nested `#navbar`, `#sidebar`, `.navbar`, or `.sidebar`.
- Top bar stays fixed/sticky while content scrolls.
- Sidebar width matches OPS at the test viewport.
- Opening one sidebar group closes the previous group.

## Visual Details

- Font family and size match OPS.
- Blue top bar color and left brand area match OPS.
- Icons render from Font Awesome and match the live icon family closely.
- Page title weight, size, and color match OPS.
- Breadcrumb/admin bar position matches OPS.
- Panel borders, table header gradients, and light-blue table backgrounds match OPS.
- Forms use OPS input heights, borders, spacing, and button colors.

## Interaction

- Sidebar links navigate.
- Parent collapsibles open and close like OPS.
- Current menu/page active state is visible.
- Dashboard order hover/popover behavior is represented where relevant.
- Mode switch only changes between Current OPS and Proposed; it must not change the shell into a different visual system in Current OPS.

## Verification Artifacts

Save screenshots in:

`/Users/cderamos/Projects/OPS Simulator/screenshots`

Name them:

`<mode>-<page-slug>-<date-or-pass>.png`

Example:

`current-046-order_listing-pass2.png`
