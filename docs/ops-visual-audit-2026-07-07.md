# OPS Visual Parity And PII Audit

Generated: 2026-07-07T00:36:33.108Z

## Scope

- Built Current OPS routes audited: 387
- Routes with source reference screenshots: 118
- Routes pixel-compared in this run: 118
- PII risk counts: high=94, low=101, medium=192
- Anonymization priority counts: P0=94, P1=192, P2=101

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

- P0, anonymize before next public deploy: 94
- P1, anonymize during route parity pass: 192
- High-risk PII routes: 94

P0 anonymization queue, first 30:

- `addons` (addon_buy_plugin): address_fields|email|order_customer_context
- `admin-users` (admin_listing): address_fields|email|sensitive_business_context|user_admin_identity
- `archive-orders` (order_archive_listing): address_fields|customer_artwork_asset|email|order_customer_context|phone|user_admin_identity
- `art-layouts` (design_layout_listing): order_customer_context|phone
- `banners` (top_banner_listing): address_fields|order_customer_context|phone|user_admin_identity
- `configuration-email-action` (configuration_email_action): address_fields|email|user_admin_identity
- `configuration-shipping-action` (configuration_shipping_action): order_customer_context|phone
- `configuration-shipping-price-import` (configuration_shipping_price_import): address_fields|order_customer_context|phone
- `corporate-action` (corporate_action): address_fields|email|order_customer_context|sensitive_business_context|user_admin_identity
- `corporate-dashboard` (corporate_dashboard): address_fields|email|order_customer_context|user_admin_identity
- `corporate-invoice-account` (corporate_invoice_account): address_fields|email|order_customer_context
- `corporate-invoice-account-request` (corporate_invoice_account_request): address_fields|email|order_customer_context
- `corporate-invoice-print` (corporate_invoice_print): address_fields|email|order_customer_context
- `corporate-manage-address` (corporate_manage_address): address_fields|order_customer_context|phone
- `coupon-action` (coupon_action): order_customer_context|phone
- `coupons` (coupon_listing): address_fields|order_customer_context|phone
- `customer-designs` (user_designs): address_fields|order_customer_context|phone|sensitive_business_context|user_admin_identity
- `customers` (user_listing): address_fields|email|order_customer_context|phone|user_admin_identity
- `default-order-product-status` (default_order_product_status): order_customer_context|phone|sensitive_business_context
- `design-proofs-action` (design_proofs_action): address_fields|order_customer_context|phone
- `designer-imagecategory-action` (designer_imagecategory_action): address_fields|order_customer_context|phone
- `email-templates` (emailtemplate_listing): address_fields|email|order_customer_context|phone|user_admin_identity
- `emailtemplate-action` (emailtemplate_action): address_fields|email|order_customer_context|phone|user_admin_identity
- `emailtemplate-configure` (emailtemplate_configure): address_fields|email|order_customer_context|phone|user_admin_identity
- `emailtemplate-signature` (emailtemplate_signature): order_customer_context|phone|user_admin_identity
- `html-help` (htmlhelp): address_fields|email|order_customer_context|phone|user_admin_identity
- `imposition-schema-action` (imposition_schema_action): order_customer_context|phone
- `index` (index): address_fields|email|order_customer_context|user_admin_identity
- `manage-form-field-listing` (manage_form_field_listing): address_fields|order_customer_context|phone|user_admin_identity
- `master-option-studio-events` (master_option_studio_events): order_customer_context|phone

## Anonymization Schedule

- 2026-07-07: Freeze new public pushes of generated OPS data until P0 anonymization is applied or explicitly accepted.
- 2026-07-07: Add generator-level anonymization for emails, phone numbers, relogin/session URLs, copied mail fields, order/customer identities, PO/order/customer references, and customer-uploaded artwork filenames.
- 2026-07-08: Rebuild `ops-extracted-pages.js`, rerun this audit, and require zero `admin_relogin_token`, zero email, and zero phone indicators in published simulator files.
- 2026-07-08: Resume one-screen visual parity fixes, starting with `orders`, after P0 risk is cleared.

## Notes

- Visual comparison is only conclusive where both a reference screenshot and a local screenshot exist.
- PII detection is conservative and category-based; it avoids writing detected values into tracked docs.
- See the CSV for the full route queue.
