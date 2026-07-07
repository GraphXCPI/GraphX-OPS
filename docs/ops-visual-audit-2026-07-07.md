# OPS Visual Parity And PII Audit

Generated: 2026-07-07T00:54:27.105Z

## Scope

- Built Current OPS routes audited: 387
- Routes with source reference screenshots: 118
- Routes pixel-compared in this run: 118
- PII risk counts: low=115, medium=272
- Anonymization priority counts: P1=272, P2=115

Raw screenshots and pixel diffs are intentionally written under ignored `raw-reference/` only. This tracked report does not include raw PII samples.

## Visual Status

- Match: 0
- Needs review: 109
- Mismatch: 9
- Too large for pixel diff: 0
- Capture/compare errors: 0
- Missing reference screenshot: 269

Highest priority visual review routes:

- `html-help` (htmlhelp): mismatch, diff 0.14591, 1688x1619 vs 1688x1619
- `order-status` (process_status_listing): mismatch, diff 0.11241, 1688x1148 vs 1688x1148
- `template-manager-design` (template_manager_design): mismatch, diff 0.10964, 1200x900 vs 1200x900
- `payments` (configuration_payment_listing): mismatch, diff 0.10566, 1688x1201 vs 1688x1201
- `studio-settings` (studio_configuration_setting): mismatch, diff 0.09072, 1703x1102 vs 1703x1102
- `stores` (corporate_listing): mismatch, diff 0.08993, 1688x3120 vs 1688x3120
- `preview-image-settings` (preview_image_settings): mismatch, diff 0.08374, 1703x1020 vs 1703x1020
- `product-options` (product_master_option_listing): mismatch, diff 0.08143, 1688x1783 vs 1688x1783
- `payment-request` (order_payment_request): mismatch, diff 0.08073, 1688x2245 vs 1688x2245
- `addons` (addon_buy_plugin): review, diff 0.07986, 1688x2155 vs 1688x2155
- `email-reminders` (emailtemplate_reminder_listing): review, diff 0.07975, 1703x900 vs 1703x900
- `roles` (admin_group): review, diff 0.07644, 1703x900 vs 1703x900
- `coupons` (coupon_listing): review, diff 0.07627, 1688x1459 vs 1688x1459
- `redirects` (url_redirection_listing): review, diff 0.07621, 1688x1769 vs 1688x1769
- `countries` (country_listing): review, diff 0.07419, 1688x1426 vs 1688x1426
- `quotes` (quote_listing): review, diff 0.07408, 1688x2643 vs 1688x2643
- `external-services` (configuration_external_service_listing): review, diff 0.07328, 1703x951 vs 1703x951
- `studio-fonts` (designer_studio_font_listing): review, diff 0.07251, 1688x1586 vs 1688x1586
- `index` (index): review, diff 0.07216, 1688x1303 vs 1688x1303
- `orders` (order_listing): review, diff 0.07211, 1688x8170 vs 1688x8170

## PII Status

- P0, anonymize before next public deploy: 0
- P1, anonymize during route parity pass: 272
- High-risk PII routes: 0

P0 anonymization queue, first 30:

- None.

## Anonymization Schedule

- 2026-07-07: Generator-level anonymization is active for published extracted pages by default.
- 2026-07-07: Static checks require zero non-demo emails, zero relogin/session URLs, zero customer artwork asset paths, zero live admin URLs, and zero known captured-name terms in `ops-extracted-pages.js`.
- 2026-07-08: Continue reducing P1 category risk during route parity passes by replacing remaining customer/company/address context where it is not structurally required.
- 2026-07-08: Resume one-screen visual parity fixes, starting with `orders`.

## Notes

- Visual comparison is only conclusive where both a reference screenshot and a local screenshot exist.
- PII detection is conservative and category-based; it avoids writing detected values into tracked docs.
- See the CSV for the full route queue.
