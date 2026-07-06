import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const extractionRoot = process.env.OPS_EXTRACTION_ROOT
  ? path.resolve(root, process.env.OPS_EXTRACTION_ROOT)
  : "";
function firstExistingPath(paths) {
  return paths.find(candidate => fs.existsSync(candidate)) || paths[0];
}

function optionalExistingPath(paths) {
  return paths.find(candidate => candidate && fs.existsSync(candidate)) || "";
}

const rawDir = firstExistingPath([
  ...(extractionRoot ? [
    path.join(extractionRoot, "raw-source-html"),
    path.join(extractionRoot, "server-html")
  ] : [
    path.resolve(root, "reference/extractions/GraphX-OPS-raw-extraction-2026-07-03/raw-source-html"),
    path.resolve(root, "../GraphX-OPS-raw-extraction-2026-07-03/raw-source-html")
  ])
].filter(Boolean));
const renderedDir = firstExistingPath([
  ...(extractionRoot ? [
    path.join(extractionRoot, "page-content-html"),
    path.join(extractionRoot, "page-content-rendered-html")
  ] : [
    path.resolve(root, "reference/extractions/GraphX-OPS-rendered-extraction-2026-07-04/page-content-html"),
    path.resolve(root, "../GraphX-OPS-rendered-extraction-2026-07-04/page-content-html")
  ])
].filter(Boolean));
const renderedFullDir = firstExistingPath([
  ...(extractionRoot ? [
    path.join(extractionRoot, "rendered-source-html"),
    path.join(extractionRoot, "full-rendered-dom-html"),
    path.join(extractionRoot, "full-rendered-html")
  ] : [
    path.resolve(root, "reference/extractions/GraphX-OPS-rendered-extraction-2026-07-04/rendered-source-html"),
    path.resolve(root, "../GraphX-OPS-rendered-extraction-2026-07-04/rendered-source-html")
  ])
].filter(Boolean));
const breadcrumbsDir = firstExistingPath([
  ...(extractionRoot ? [
    path.join(extractionRoot, "breadcrumbs-html"),
    path.join(extractionRoot, "breadcrumbs-rendered-html")
  ] : [
    path.resolve(root, "reference/extractions/GraphX-OPS-rendered-extraction-2026-07-04/breadcrumbs-html")
  ])
].filter(Boolean));
const tabExtractionRoot = process.env.OPS_TAB_EXTRACTION_ROOT
  ? path.resolve(root, process.env.OPS_TAB_EXTRACTION_ROOT)
  : optionalExistingPath([
    extractionRoot ? path.join(path.dirname(extractionRoot), "interactive-tab-state-capture-2026-07-06") : "",
    path.resolve(root, "reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/interactive-tab-state-capture-2026-07-06")
  ]);
const defaultSafeCaptureSearchRoot = path.resolve(root, "reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/expanded-safe-page-capture-2026-07-06");
const safeCaptureRoots = resolveSafeCaptureRoots(process.env.OPS_SAFE_CAPTURE_ROOTS || "");
const outputFile = path.join(root, "ops-extracted-pages.js");
const auditFile = path.join(root, "raw-reference", "extracted-page-structure-audit.json");
const remoteImageAssetMap = loadRemoteImageAssetMap();

const routeAliases = {
  addon_buy_plugin: "addons",
  admin_constants: "admin-text",
  admin_group: "roles",
  admin_listing: "admin-users",
  all_products_price_bulk_update: "product-price-percent",
  block_ip_action: "blocked-ips",
  cms_listing: "cms-pages",
  configuration_external_service_listing: "external-services",
  configuration_payment_listing: "payments",
  configuration_settings: "site-settings",
  configuration_shipping_listing: "shipping",
  corporate_listing: "stores",
  corporate_store_profile_listing: "store-fields",
  country_listing: "countries",
  coupon_listing: "coupons",
  create_order_user: "add-order",
  currency_listing: "currency",
  design_layout_listing: "art-layouts",
  design_proofs_listing: "design-proofs",
  designer_image_gallery_listing: "studio-images",
  designer_imagecategory_listing: "studio-image-categories",
  designer_studio_font_listing: "studio-fonts",
  emailtemplate_listing: "email-templates",
  emailtemplate_reminder_listing: "email-reminders",
  export_orders: "export-api-orders",
  faq_listing: "faqs",
  htmlhelp: "html-help",
  imposition_impose_job: "impose-job",
  imposition_products_schema_setting: "product-schema-settings",
  imposition_schema_listing: "schemas",
  imposition_sheet_size_listing: "sheet-sizes",
  imposition_symbol_listing: "imposition-symbols",
  job_board_order_grid: "job-board-grid",
  job_board_order: "job-board",
  language_constant_action: "language-text",
  language_listing: "languages",
  manage_form_listing: "form-management",
  manage_image_optimization: "image-optimization",
  manage_web_storage: "web-storage",
  master_template_manager: "template-master",
  media_gallery_listing: "media-gallery",
  menulink_listing: "links",
  metatag: "metatags",
  modify_products_price: "product-price-modify",
  order_archive_listing: "archive-orders",
  order_listing: "orders",
  order_payment_request: "payment-request",
  order_pending_listing: "unpaid-orders",
  predefined_product_listing: "ready-products",
  predefined_quote_listing: "predefined-quotes",
  preview_image_settings: "preview-image-settings",
  printer_listing: "vendors",
  process_status_listing: "order-status",
  product_category_listing: "product-categories",
  product_info_layout_listing: "product-page-layout",
  product_listing: "print-products",
  product_master_option_listing: "product-options",
  product_price_all: "product-price",
  product_price_bulk_option_update: "product-option-price-bulk",
  product_price_bulk_update: "product-price-bulk",
  product_tax_setting: "product-tax",
  product_weight: "product-weight",
  products_studio_models_listing: "studio-models",
  promotional_listing: "promotional",
  quote_listing: "quotes",
  quote_product_printer_listing: "vendor-quotes",
  quote_status_listing: "quote-status",
  report_audit_log: "system-logs",
  report_coupon_summary: "coupon-report",
  report_customer_details: "customer-details-report",
  report_customer_order_summary: "customer-order-summary",
  report_inventory_request: "inventory-request-report",
  report_inventory: "inventory-report",
  report_payment_request: "payment-request-report",
  report_payon_account: "pay-on-account-report",
  report_printer_commission: "vendor-commission-report",
  report_printer_order_summary: "vendor-order-summary",
  report_product_stock_summary: "stock-summary-report",
  report_production_day_summary: "production-day-report",
  report_production_time_spent: "production-time-report",
  report_products_sales: "product-sales-report",
  report_sales_agent_commission: "sales-agent-commission-report",
  report_sales_order_product_details: "sales-order-product-details",
  report_sales_order_summary: "sales-order-summary",
  report_sales_orderdetails: "sales-order-details",
  report_sales_quote_summary: "sales-quote-summary",
  report_shipping_summary: "shipping-report",
  report_tax_summary: "tax-report",
  report_templates_sales: "template-sales-report",
  reward_point_listing: "reward-points",
  robot_creation: "robots",
  sales_agent_listing: "sales-agents",
  seo_all: "seo-global",
  seo_image_alt_text: "image-alt",
  sidebar_management: "sidebar-management",
  sidebar_widget: "sidebar-widget",
  sitemap_xml: "sitemaps",
  sms_notification_listing: "sms-templates",
  studio_color_setting_listing: "studio-colors",
  studio_configuration_setting: "studio-settings",
  studio_css_setting_action: "studio-css",
  studio_language_constant_action: "studio-language-text",
  subscriber_listing: "newsletter",
  tax_listing: "tax-settings",
  template_category_listing: "template-categories",
  template_manager: "templates",
  template_properties_master: "pdf-blocks",
  testimonial_listing: "testimonials",
  theme_listing: "themes",
  top_banner_listing: "banners",
  url_redirection_listing: "redirects",
  user_designs: "customer-designs",
  user_listing: "customers",
  welcome: "dashboard",
  workflow_admin_listing: "workflow-admin"
};

const invalidExtractedSlugs = new Set([
  "relogin",
  "studio_configuration_setting-c54df0",
  "template_manager-717761"
]);

const validFragmentSlugs = new Set([
  "product_popover"
]);

const shelllessFullDocumentSlugs = new Set([
  "template_manager_design"
]);

const standaloneFullDocumentSlugs = new Set([
  "htmlhelp"
]);

const localTabOnlySlugs = new Set([
  "template_manager_duplicate"
]);

const nonNavigableAdminSlugs = new Set([
  "admin_constants_import",
  "breadcrumbs",
  "document_download",
  "corporate_department_import_csv",
  "corporate_import_address",
  "coupon_action_import_csv",
  "dashboard_ajax",
  "language_constant_import",
  "offline_reorder",
  "order_action_delete",
  "order_update_import",
  "product_master_option_attribute_googlesheet_import",
  "relogin",
  "report_download_print_file",
  "seo_image_alt_text_import",
  "studio_color_palette_import",
  "studio_language_constant_import",
  "studio_rgb_cmyk_mapping_import",
  "url_redirection_import",
  "user_action_import_address",
  "user_action_import_csv",
  "user_import_extra_fields",
  "user_print_ready_file"
]);

function stripNumberAndExt(filename) {
  return filename.replace(/^\d+-/, "").replace(/\.html$/, "");
}

function fallbackRoute(slug) {
  return slug.replace(/_/g, "-").toLowerCase();
}

function routeForSlug(slug) {
  return routeAliases[slug] || fallbackRoute(slug);
}

function fallbackTitleFromSlug(slug) {
  return slug.replace(/[-_]/g, " ");
}

function cleanTitleText(value) {
  return decodeHtmlEntities(String(value || ""))
    .replace(/<[^>]+>/g, "")
    .replace(/^\s*Admin\s*::\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromHtml(html, slug) {
  const h1 = html.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/i)?.[1];
  const title = h1 || html.match(/<title[^>]*>\s*(?:Admin\s*::\s*)?([\s\S]*?)\s*<\/title>/i)?.[1];
  return cleanTitleText(title || fallbackTitleFromSlug(slug));
}

function titleFromSafeCapture(rawContent, entry, slug) {
  const htmlTitle = titleFromHtml(rawContent, slug);
  const fallbackTitle = cleanTitleText(fallbackTitleFromSlug(slug));
  if (htmlTitle && htmlTitle !== fallbackTitle) return htmlTitle;
  return cleanTitleText(entry.heading || entry.title || htmlTitle || fallbackTitle);
}

function extractPageContent(html) {
  const marker = html.search(/<div[^>]*class=["'][^"']*\bpage-content\b[^"']*["'][^>]*>/i);
  if (marker === -1) return extractDivByIdInner(html, "page-wrapper") || extractStandaloneBody(html);

  const openEnd = html.indexOf(">", marker);
  if (openEnd === -1) return "";

  let depth = 1;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = openEnd + 1;
  let match;
  while ((match = tagRe.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag) && !/\/>$/.test(tag)) depth += 1;
    if (/^<\/div/i.test(tag)) depth -= 1;
    if (depth === 0) {
      return html.slice(openEnd + 1, match.index);
    }
  }
  return html.slice(openEnd + 1);
}

function extractDivById(html, id) {
  const marker = html.search(new RegExp(`<div[^>]*id=["']${id}["'][^>]*>`, "i"));
  if (marker === -1) return "";

  let depth = 0;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = marker;
  let match;
  while ((match = tagRe.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag) && !/\/>$/.test(tag)) depth += 1;
    if (/^<\/div/i.test(tag)) depth -= 1;
    if (depth === 0) return html.slice(marker, tagRe.lastIndex);
  }
  return html.slice(marker);
}

function extractDivByIdInner(html, id) {
  const outer = extractDivById(html, id);
  if (!outer) return "";
  const openEnd = outer.indexOf(">");
  const closeStart = outer.lastIndexOf("</div>");
  if (openEnd === -1 || closeStart === -1 || closeStart <= openEnd) return "";
  return outer.slice(openEnd + 1, closeStart).trim();
}

function extractStandaloneBody(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) return "";
  return body.trim();
}

function extractedContentFragment(html, slug = "") {
  if (/<(?:!doctype|html|body)\b/i.test(html)) {
    if (standaloneFullDocumentSlugs.has(slug)) {
      return extractStandaloneFullDocumentFragment(html, slug) || extractPageContent(html) || extractStandaloneBody(html) || html;
    }
    return extractPageContent(html) || extractStandaloneBody(html) || html;
  }
  return html;
}

function extractJsonPayloadFragment(content) {
  const trimmed = String(content || "").trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    const payload = JSON.parse(trimmed);
    const html = typeof payload?.html === "string" ? payload.html : "";
    if (!html) return null;
    const normalizedHtml = decodeHtmlEntities(html)
      .replace(/\\\//g, "/")
      .replace(/\sstyle=(["'])[^"']*display\s*:\s*none;?[^"']*\1/gi, "");
    return {
      html: normalizedHtml.trim(),
      title: cleanTitleText(payload.product_title || payload.title || payload.heading || "")
    };
  } catch {
    return null;
  }
}

function extractedCaptureFragment(html, slug = "") {
  const isShelllessFullDocument = shelllessFullDocumentSlugs.has(slug) && /<(?:!doctype|html|body)\b/i.test(html);
  const fragment = isShelllessFullDocument ? extractShelllessFullDocumentSnapshot(html) : extractedContentFragment(html, slug);
  const payloadFragment = extractJsonPayloadFragment(fragment);
  if (payloadFragment?.html) {
    return {
      rawContent: payloadFragment.html,
      title: payloadFragment.title,
      payloadType: "json-html"
    };
  }
  return {
    rawContent: fragment,
    title: "",
    payloadType: isShelllessFullDocument ? "full-document-snapshot" : ""
  };
}

function extractShelllessFullDocumentSnapshot(html) {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const body = extractStandaloneBody(html);
  const headStyles = [
    ...head.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi)
  ].map(match => rewriteLocalStudioAssetLinks(rewriteStudioAssetUrls(match[0])).replace(/\s+onload=(["'])[\s\S]*?\1/gi, ""));
  headStyles.push(...(head.match(/<style\b[\s\S]*?<\/style>/gi) || []));
  const snapshotBody = replaceCanvasSnapshots(stripStudioPreloadLinks(rewriteLocalStudioAssetLinks(rewriteStudioAssetUrls(body))));
  return `<div class="ops-shellless-snapshot ops-template-designer-snapshot">${headStyles.join("\n")}\n${snapshotBody}</div>`;
}

function extractStandaloneFullDocumentFragment(html, slug) {
  if (slug !== "htmlhelp") return "";
  const body = extractStandaloneBody(html);
  if (!body) return "";
  const contentStart = body.search(/<div[^>]*class=["'][^"']*\bcontainer-fluid\b[^"']*["'][^>]*>/i);
  return (contentStart === -1 ? body : body.slice(contentStart)).trim();
}

function rewriteStudioAssetUrls(html) {
  return String(html || "")
    .replace(/\b(href|src)=["']\/studio\/app\/browser\/([^"']+)["']/gi, '$1="https://visualgraphx.com/studio/app/browser/$2"')
    .replace(/\b(href|src)=["'](?!https?:|data:|#|javascript:|mailto:|tel:|\/)([^"']+)["']/gi, '$1="https://visualgraphx.com/studio/app/browser/$2"');
}

function stripStudioPreloadLinks(html) {
  return String(html || "").replace(/<link\b(?=[^>]*\brel=(["'])(?:modulepreload|preload)\1)(?=[^>]*(?:studio\/app\/browser|chunk-|\.js\b))[^>]*>/gi, "");
}

function rewriteLocalStudioAssetLinks(html) {
  return String(html || "").replace(/\b(href|src)=(["'])([^"']+)\2/gi, (full, attr, quote, src) => {
    const localSrc = localStudioAssetPathForSrc(src);
    return localSrc ? `${attr}=${quote}${localSrc}${quote}` : full;
  });
}

function localStudioAssetPathForSrc(src) {
  const normalized = decodeHtmlEntities(String(src || "").trim())
    .replace(/^https?:\/\/(?:staging\.)?visualgraphx\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/[?#].*$/, "");

  if (/^studio\/app\/browser\/styles-[^/]+\.css$/i.test(normalized)) {
    return localExistingAssetPath(`assets/ops-studio/app/browser/${path.basename(normalized)}`);
  }
  if (/^studio\/app\/browser\/fontawesome\.css$/i.test(normalized)) {
    return localExistingAssetPath("assets/ops-studio/app/browser/fontawesome.css");
  }
  if (/^studio\/Content\/css\/pdffonts\.min\.css$/i.test(normalized)) {
    return localExistingAssetPath("assets/ops-studio/Content/css/pdffonts.min.css");
  }
  return "";
}

function replaceCanvasSnapshots(html) {
  return String(html || "").replace(/<canvas\b([^>]*)\bdata-ops-canvas-snapshot=(["'])(data:image\/png;base64,[^"']+)\2([^>]*)>[\s\S]*?<\/canvas>/gi, (match, beforeAttrs, quote, dataUrl, afterAttrs) => {
    const attrs = `${beforeAttrs || ""} ${afterAttrs || ""}`;
    const className = extractHtmlAttribute(attrs, "class");
    const style = extractHtmlAttribute(attrs, "style");
    const cssWidth = extractHtmlAttribute(attrs, "data-ops-canvas-css-width");
    const cssHeight = extractHtmlAttribute(attrs, "data-ops-canvas-css-height");
    const index = extractHtmlAttribute(attrs, "data-ops-canvas-index");
    const sizing = [
      style,
      cssWidth ? `width:${cssWidth}px` : "",
      cssHeight ? `height:${cssHeight}px` : ""
    ].filter(Boolean).join(";").replace(/;+/g, ";");
    return `<img class="ops-canvas-snapshot ${escapeHtmlAttribute(className)}" src="${dataUrl}" alt="" data-ops-canvas-index="${escapeHtmlAttribute(index)}"${sizing ? ` style="${escapeHtmlAttribute(sizing)}"` : ""}>`;
  });
}

function extractHtmlAttribute(attrs, name) {
  const pattern = new RegExp(`\\b${name}=([\"'])(.*?)\\1`, "i");
  return String(attrs || "").match(pattern)?.[2] || "";
}

function escapeHtmlAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function readJsonFile(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function resolveSafeCapturePath(value) {
  return path.resolve(root, value);
}

function safeCaptureManifestPath(captureRoot) {
  return path.join(captureRoot, "safe_page_capture_manifest.json");
}

function hasSafeCaptureLayout(captureRoot) {
  return [
    "page-content-rendered-html",
    "full-rendered-dom-html",
    "breadcrumbs-rendered-html",
    "server-html",
    "page-manifests"
  ].every(dir => fs.existsSync(path.join(captureRoot, dir)));
}

function isAutoDiscoverableSafeCaptureRoot(captureRoot) {
  const manifestPath = safeCaptureManifestPath(captureRoot);
  if (!fs.existsSync(manifestPath) || !hasSafeCaptureLayout(captureRoot)) return false;
  try {
    const manifest = readJsonFile(manifestPath);
    return Boolean((manifest.updatedAt || manifest.completedAt) && Array.isArray(manifest.pages));
  } catch {
    return false;
  }
}

function discoverLatestSafeCaptureRoot() {
  if (!fs.existsSync(defaultSafeCaptureSearchRoot)) return "";
  const candidates = fs.readdirSync(defaultSafeCaptureSearchRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^live-capture-cdp-/.test(entry.name))
    .map(entry => path.join(defaultSafeCaptureSearchRoot, entry.name))
    .filter(isAutoDiscoverableSafeCaptureRoot)
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  return candidates.at(-1) || "";
}

function resolveSafeCaptureRoots(value) {
  const parts = String(value || "")
    .split(":")
    .map(part => part.trim())
    .filter(Boolean);
  const roots = [];
  for (const part of parts) {
    if (part === "auto" || part === "latest") {
      const latestRoot = discoverLatestSafeCaptureRoot();
      if (latestRoot) roots.push(latestRoot);
      continue;
    }
    roots.push(resolveSafeCapturePath(part));
  }
  return Array.from(new Set(roots));
}

function safePageCaptureEntriesFromManifest(captureRoot, manifest) {
  if (Array.isArray(manifest.pages)) {
    return manifest.pages.map(entry => ({ ...entry, manifestFile: entry.manifestFile || "" }));
  }

  const manifestDir = path.join(captureRoot, "page-manifests");
  if (!fs.existsSync(manifestDir)) return [];
  return fs.readdirSync(manifestDir)
    .filter(file => file.endsWith(".json"))
    .sort()
    .map(file => ({
      ...readJsonFile(path.join(manifestDir, file)),
      manifestFile: path.join("page-manifests", file)
    }));
}

function slugFromSafeCaptureEntry(entry) {
  const slug = String(entry.slug || "").trim();
  if (slug) return slug.replace(/\.php$/i, "");
  let urlFile = "";
  if (entry.url) {
    try {
      urlFile = path.basename(new URL(entry.url).pathname, ".php");
    } catch {
      urlFile = path.basename(String(entry.url).split("?")[0], ".php");
    }
  }
  if (urlFile) return urlFile;
  const contentFile = entry.files?.pageContentRenderedHtml ? path.basename(entry.files.pageContentRenderedHtml) : "";
  return contentFile ? stripNumberAndExt(contentFile) : "";
}

function loadSafePageCaptureEntries(roots) {
  const entries = [];
  const rootAudit = [];
  for (const captureRoot of roots) {
    const manifestPath = safeCaptureManifestPath(captureRoot);
    if (!fs.existsSync(manifestPath)) {
      throw new Error(`Missing safe page capture manifest: ${manifestPath}`);
    }
    if (!hasSafeCaptureLayout(captureRoot)) {
      throw new Error(`Safe page capture root is missing expected folders: ${captureRoot}`);
    }
    const manifest = readJsonFile(manifestPath);
    const rootEntries = safePageCaptureEntriesFromManifest(captureRoot, manifest)
      .map(entry => ({ ...entry, captureRoot, slug: slugFromSafeCaptureEntry(entry) }))
      .filter(entry => entry.slug);
    entries.push(...rootEntries);
    rootAudit.push({
      captureRoot,
      manifestPath,
      updatedAt: manifest.updatedAt || manifest.completedAt || "",
      totalSelected: manifest.totalSelected ?? rootEntries.length,
      pages: rootEntries.length
    });
  }
  return { entries, rootAudit };
}

function normalizedCaptureStatus(status) {
  return String(status || "").trim().toLowerCase().replace(/_/g, "-");
}

function isAcceptedSafeCaptureStatus(status) {
  const normalized = normalizedCaptureStatus(status);
  return normalized === "ok" || normalized === "timed-out-captured";
}

function visibleTextFromHtml(html) {
  return decodeHtmlEntities(String(html || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function meaningfulPageContent(html) {
  const content = String(html || "").trim();
  if (content.length < 50) return false;
  if (content.startsWith("{") || content.startsWith("[")) return false;
  if (visibleTextFromHtml(content).length < 20) return false;
  return /<(div|form|table|input|select|textarea|button|h[1-6]|ul|ol|p|a|span)\b/i.test(content);
}

function looksLikeLoginOrDeniedPage(entry, rawContent) {
  if (entry.state?.loginForm || entry.idle?.state?.loginForm) return true;
  const status = normalizedCaptureStatus(entry.status);
  if (/login|denied|forbidden|unauthorized|not-authorized/.test(status)) return true;
  const title = visibleTextFromHtml(`${entry.title || ""} ${entry.heading || ""}`);
  const textStart = visibleTextFromHtml(rawContent).slice(0, 500);
  return /\b(admin login|login to|sign in|forgot password|access denied|permission denied|forbidden|not authorized|unauthorized)\b/i.test(`${title} ${textStart}`);
}

function looksLikeErrorPage(entry, rawContent) {
  const status = normalizedCaptureStatus(entry.status);
  if (status.includes("error")) return true;
  const title = visibleTextFromHtml(`${entry.title || ""} ${entry.heading || ""}`);
  const textStart = visibleTextFromHtml(rawContent).slice(0, 500);
  return /\b(404 not found|server error|fatal error|uncaught exception|temporary down|temporarily unavailable)\b/i.test(`${title} ${textStart}`);
}

function resolveCaptureFile(captureRoot, relPath) {
  return relPath ? path.join(captureRoot, relPath) : "";
}

function readOptionalCaptureFile(captureRoot, relPath) {
  const file = resolveCaptureFile(captureRoot, relPath);
  return file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function breadcrumbsForSafeCapture(entry, fileRouteMap) {
  let breadcrumbsSource = readOptionalCaptureFile(entry.captureRoot, entry.files?.breadcrumbsRenderedHtml);
  if (!breadcrumbsSource.trim()) {
    const fullRendered = readOptionalCaptureFile(entry.captureRoot, entry.files?.fullRenderedDomHtml);
    breadcrumbsSource = extractDivById(fullRendered, "breadcrumbs");
  }
  if (!breadcrumbsSource.trim()) {
    const serverHtml = readOptionalCaptureFile(entry.captureRoot, entry.files?.serverHtml);
    breadcrumbsSource = extractDivById(serverHtml, "breadcrumbs");
  }
  return cleanExtractedContent(breadcrumbsSource, fileRouteMap);
}

function safeCaptureContentCandidates(entry) {
  return [
    { label: "page-content", relPath: entry.files?.pageContentRenderedHtml || "" },
    { label: "server-json", relPath: entry.files?.serverHtml || "", jsonOnly: true },
    { label: "full-rendered-dom", relPath: entry.files?.fullRenderedDomHtml || "" },
    { label: "server-html", relPath: entry.files?.serverHtml || "" }
  ].filter(candidate => candidate.relPath);
}

function pickSafeCaptureContent(entry) {
  const attempts = [];
  for (const candidate of safeCaptureContentCandidates(entry)) {
    const contentPath = resolveCaptureFile(entry.captureRoot, candidate.relPath);
    if (!contentPath || !fs.existsSync(contentPath)) {
      attempts.push({ ...candidate, status: "missing" });
      continue;
    }
    const fragment = extractedCaptureFragment(fs.readFileSync(contentPath, "utf8"), entry.slug);
    if (candidate.jsonOnly && fragment.payloadType !== "json-html") {
      attempts.push({ ...candidate, status: "not-json" });
      continue;
    }
    const visibleTextLength = visibleTextFromHtml(fragment.rawContent).length;
    const meaningful = meaningfulPageContent(fragment.rawContent);
    attempts.push({ ...candidate, status: meaningful ? "usable" : "empty", visibleTextLength, payloadType: fragment.payloadType });
    if (meaningful) {
      return { ...candidate, rawContent: fragment.rawContent, title: fragment.title, payloadType: fragment.payloadType, visibleTextLength, attempts };
    }
  }
  return { label: "", relPath: "", rawContent: "", title: "", payloadType: "", visibleTextLength: 0, attempts };
}

function loadSafePages(captureEntries, fileRouteMap) {
  const pages = [];
  const audit = [];
  for (const entry of captureEntries) {
    const slug = entry.slug;
    const route = fileRouteMap.get(slug) || routeForSlug(slug);
    const contentSelection = pickSafeCaptureContent(entry);
    const auditBase = {
      captureRoot: entry.captureRoot,
      manifestFile: entry.manifestFile || "",
      slug,
      route,
      sourceFile: contentSelection.relPath || entry.files?.pageContentRenderedHtml || "",
      contentAttempts: contentSelection.attempts || []
    };

    if (invalidExtractedSlugs.has(slug)) {
      audit.push({ ...auditBase, status: "skipped-invalid-slug" });
      continue;
    }
    if (!isAcceptedSafeCaptureStatus(entry.status)) {
      audit.push({ ...auditBase, status: "skipped-status", captureStatus: entry.status || "" });
      continue;
    }
    if (!contentSelection.rawContent) {
      audit.push({ ...auditBase, status: "missing-page-content" });
      continue;
    }

    const rawContent = contentSelection.rawContent;
    if (!meaningfulPageContent(rawContent)) {
      audit.push({ ...auditBase, status: "skipped-empty-page-content", captureStatus: entry.status || "" });
      continue;
    }
    if (looksLikeLoginOrDeniedPage(entry, rawContent)) {
      audit.push({ ...auditBase, status: "skipped-login-or-denied", captureStatus: entry.status || "" });
      continue;
    }
    if (looksLikeErrorPage(entry, rawContent)) {
      audit.push({ ...auditBase, status: "skipped-error-page", captureStatus: entry.status || "" });
      continue;
    }

    const bodyHtml = cleanExtractedContent(rawContent, fileRouteMap);
    const breadcrumbsHtml = breadcrumbsForSafeCapture(entry, fileRouteMap);
    const title = contentSelection.title || titleFromSafeCapture(rawContent, entry, slug);
    const sourceFile = contentSelection.relPath ? path.basename(contentSelection.relPath) : `${slug}.html`;
    const sourceKind = `safe-page:${normalizedCaptureStatus(entry.status)}`;
    pages.push({
      route,
      title,
      slug,
      sourceFile,
      sourceKind,
      displayMode: shelllessFullDocumentSlugs.has(slug) ? "shellless" : "",
      breadcrumbsHtml,
      bodyHtml
    });
    audit.push({
      ...auditBase,
      status: "ok",
      captureStatus: entry.status || "",
      sourceKind,
      contentSource: contentSelection.label,
      payloadType: contentSelection.payloadType,
      bodyLength: bodyHtml.length,
      visibleTextLength: visibleTextFromHtml(bodyHtml).length
    });
  }
  return { pages, audit };
}

function upsertRouteEntry(routes, routeEntry) {
  const index = routes.findIndex(existing => existing.route === routeEntry.route);
  if (index === -1) {
    routes.push(routeEntry);
    return;
  }
  routes[index] = routeEntry;
}

function cleanExtractedContent(content, fileRouteMap) {
  let cleaned = content
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)="[^"]*"/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)='[^']*'/gi, "")
    .replace(/\sdata-cf-modified-[^=]+="[^"]*"/gi, "");

  cleaned = cleaned.replace(/\b(action|href)=["'](?:https?:\/\/(?:staging\.)?visualgraphx\.com)?\/?admin\/([^"'?#]+)([^"']*)["']/gi, (full, attr, file, suffix) => {
    const base = path.basename(file, ".php");
    if (attr.toLowerCase() === "href" && nonNavigableAdminSlugs.has(base)) return 'href="javascript:void(0)"';
    const route = fileRouteMap.get(base) || routeForSlug(base);
    if (attr.toLowerCase() === "href") return `href="#current/${route}" data-page="${route}"`;
    return `action="#current/${route}"`;
  });

  cleaned = cleaned.replace(/\bdata-link=["']https?:\/\/(?:staging\.)?visualgraphx\.com\/admin\/([^"'?#]+)([^"']*)["']/gi, (full, file) => {
    const base = path.basename(file, ".php");
    const route = fileRouteMap.get(base) || routeForSlug(base);
    return `data-link="#current/${route}" data-page="${route}"`;
  });

  cleaned = cleaned.replace(/\bhref=["']([^"']+\.php)([^"']*)["']/gi, (full, file) => {
    if (/^(?:https?:|data:|javascript:|mailto:|tel:|#)/i.test(file)) return full;
    if (/[{}]/.test(file)) return full;
    const base = path.basename(file, ".php");
    if (nonNavigableAdminSlugs.has(base)) return 'href="javascript:void(0)"';
    const route = fileRouteMap.get(base) || routeForSlug(base);
    return `href="#current/${route}" data-page="${route}"`;
  });

  cleaned = cleaned.replace(/\bhref=(["'])#([^"']+)\1/gi, 'href="javascript:void(0)" data-tab-target="$2"');

  cleaned = cleaned.replace(/\bsrc=["']https?:\/\/(?:staging\.)?visualgraphx\.com\/([^"']+)["']/gi, 'src="https://staging.visualgraphx.com/$1"');

  cleaned = rewritePublicStagingLinks(cleaned);

  cleaned = rewriteLocalOpsImageSources(cleaned);

  cleaned = cleaned.replace(/https?:\/\/(?:staging\.)?visualgraphx\.com\/admin\/includes\/images\/[^"'<>\\\s)]+/gi, "");

  cleaned = cleaned.replace(/https?:\/\/(?:staging\.)?visualgraphx\.com\/admin\/([^"'<>\\\s]+\.php)([^"'<>\\\s]*)/gi, (full, file) => {
    const base = path.basename(file, ".php");
    const route = fileRouteMap.get(base) || routeForSlug(base);
    return `#current/${route}`;
  });

  cleaned = stripExtractedShellChrome(cleaned);

  return normalizeStandaloneModalContent(cleaned.trim());
}

function rewritePublicStagingLinks(html) {
  return String(html || "")
    .replace(/https?:\/\/([a-z0-9-]+)\.staging\.visualgraphx\.com\//gi, "https://$1.visualgraphx.com/")
    .replace(/https?:\/\/staging\.visualgraphx\.com\//gi, "https://visualgraphx.com/")
    .replace(/\/ctmediaon_staging\//gi, "/ctmediaon/");
}

function rewriteLocalOpsImageSources(html) {
  return String(html || "").replace(/\b(src|data-src)=(["'])([^"']+)\2/gi, (full, attr, quote, src) => {
    const localSrc = localOpsImagePathForSrc(src);
    const canonicalSrc = canonicalExternalImageSrc(src) || decodeHtmlEntities(String(src || "").trim());
    const rewrittenSrc = localSrc || remoteImageAssetPathForSrc(canonicalSrc) || unavailableImagePlaceholderSrc(canonicalSrc || src);
    return rewrittenSrc ? `${attr}=${quote}${rewrittenSrc}${quote}` : full;
  });
}

function loadRemoteImageAssetMap() {
  const manifestPath = path.join(root, "assets", "ops-remote-images", "manifest.json");
  if (!fs.existsSync(manifestPath)) return new Map();
  try {
    const manifest = readJsonFile(manifestPath);
    return new Map(Object.entries(manifest.assets || {}));
  } catch {
    return new Map();
  }
}

function remoteImageAssetPathForSrc(src) {
  const decoded = decodeHtmlEntities(String(src || "").trim());
  if (/^https?:\/\/(?:ctmediaimg\.s3\.us-west-1\.amazonaws\.com|dei4q67dwezeh\.cloudfront\.net)\/ctmediaon(?:_staging)?\/images\/orders\//i.test(decoded)) {
    return "";
  }
  return remoteImageAssetMap.get(decoded) || "";
}

function localOpsImagePathForSrc(src) {
  const normalized = decodeHtmlEntities(String(src || "").trim())
    .replace(/^https?:\/\/(?:staging\.)?visualgraphx\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\.\/+/, "");

  const adminMatch = normalized.match(/^(?:admin\/)?includes\/images\/([^?#]+)/i);
  if (adminMatch) return localOpsImageAssetPath("admin/includes/images", adminMatch[1]);

  const studioMatch = normalized.match(/^studio\/thirdparty\/colorpicker\/images\/([^?#]+)/i);
  if (studioMatch) return localOpsImageAssetPath("studio/thirdparty/colorpicker/images", studioMatch[1]);

  return "";
}

function canonicalExternalImageSrc(src) {
  const decoded = decodeHtmlEntities(String(src || "").trim());
  if (!decoded) return "";

  const nestedAnyUrl = decoded.match(/https?:\/\/[^"']*(https?:\/\/(?:ctmediaimg\.s3\.us-west-1\.amazonaws\.com|dei4q67dwezeh\.cloudfront\.net)\/ctmediaon\/[^"']+)/i)?.[1];
  if (nestedAnyUrl) return nestedAnyUrl;

  const nestedUrl = decoded.match(/https?:\/\/(?:ctmediaimg\.s3\.us-west-1\.amazonaws\.com|dei4q67dwezeh\.cloudfront\.net)\/ctmediaon_staging\/images\/[^"']*(https?:\/\/(?:ctmediaimg\.s3\.us-west-1\.amazonaws\.com|dei4q67dwezeh\.cloudfront\.net)\/ctmediaon\/[^"']+)/i)?.[1];
  if (nestedUrl) return nestedUrl;

  if (/^https?:\/\/ctmediaimg\.s3\.us-west-1\.amazonaws\.com\/ctmediaon_staging\//i.test(decoded)) {
    return decoded.replace(/\/ctmediaon_staging\//i, "/ctmediaon/");
  }

  if (/^https?:\/\/staging\.visualgraphx\.com\/(?:common_images|themes|studio\/Content\/fontimages)\//i.test(decoded)) {
    return decoded.replace(/^https?:\/\/staging\.visualgraphx\.com\//i, "https://visualgraphx.com/");
  }

  return "";
}

function unavailableImagePlaceholderSrc(src) {
  const decoded = decodeHtmlEntities(String(src || "").trim());
  if (
    !decoded ||
    /^https?:\/\/(?:www\.)?onprintshop\.com\/wp-content\/themes\/onprintshop\/assets\/images\/opsaddonservices\//i.test(decoded) ||
    isOpsPublicImageUrl(decoded)
  ) {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  }
  return "";
}

function isOpsPublicImageUrl(src) {
  return (
    /^https?:\/\/(?:ctmediaimg\.s3\.us-west-1\.amazonaws\.com|dei4q67dwezeh\.cloudfront\.net)\/ctmediaon(?:_staging)?\//i.test(src) ||
    /^https?:\/\/(?:staging\.)?visualgraphx\.com\/(?:common_images|themes|studio\/Content\/fontimages)\//i.test(src)
  );
}

function localOpsImageAssetPath(folder, filename) {
  const safeName = path.basename(filename);
  return localExistingAssetPath(`assets/ops-images/${folder}/${safeName}`);
}

function localExistingAssetPath(relative) {
  return fs.existsSync(path.join(root, relative)) ? relative : "";
}

function stripExtractedShellChrome(html) {
  return removeBalancedDivsByClasses(
    removeBalancedDivsByClasses(html, ["footer", "h-auto"]),
    ["footer-tools"]
  );
}

function removeBalancedDivsByClasses(html, requiredClasses) {
  let output = String(html || "");
  let searchStart = 0;
  const openDivRe = /<div\b[^>]*>/gi;
  while (searchStart < output.length) {
    openDivRe.lastIndex = searchStart;
    const match = openDivRe.exec(output);
    if (!match) break;
    const openTag = match[0];
    const classAttr = openTag.match(/\bclass=(["'])(.*?)\1/i)?.[2] || "";
    const classSet = new Set(classAttr.split(/\s+/).filter(Boolean));
    if (!requiredClasses.every(className => classSet.has(className))) {
      searchStart = openDivRe.lastIndex;
      continue;
    }
    const end = balancedDivEnd(output, match.index, openDivRe.lastIndex);
    if (end <= match.index) {
      searchStart = openDivRe.lastIndex;
      continue;
    }
    output = `${output.slice(0, match.index)}${output.slice(end)}`;
    searchStart = match.index;
  }
  return output;
}

function balancedDivEnd(html, openStart, afterOpenTag) {
  let depth = 1;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = afterOpenTag;
  let match;
  while ((match = tagRe.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag) && !/\/>$/.test(tag)) depth += 1;
    if (/^<\/div/i.test(tag)) depth -= 1;
    if (depth === 0) return tagRe.lastIndex;
  }
  return openStart;
}

function normalizeStandaloneModalContent(html) {
  const firstModal = html.search(/<[^>]+class=(["'])[^"']*\bfancybox-modal-content\b[^"']*\1/i);
  if (firstModal === -1) return html;
  const firstPageHeader = html.search(/<[^>]+class=(["'])[^"']*\bpage-header\b[^"']*\1/i);
  if (firstPageHeader !== -1 && firstPageHeader < firstModal) return html;

  return html.replace(/(<[^>]+class=(["'])[^"']*\bfancybox-modal-content\b[^"']*\2[^>]*)(>)/i, (full, open, quote, end) => {
    let updated = open.replace(/\saria-hidden=(["'])true\1/i, ' aria-hidden="false"');
    if (/\sstyle=(["'])/i.test(updated)) {
      updated = updated.replace(/\sstyle=(["'])(.*?)\1/i, (styleFull, styleQuote, value) => ` style=${styleQuote}${value};display:block;position:static;visibility:visible;opacity:1;${styleQuote}`);
    } else {
      updated += ' style="display:block;position:static;visibility:visible;opacity:1;"';
    }
    return `${updated}${end}`;
  });
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 10)));
}

function normalizeTabToken(value) {
  return decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function tabTargetFromHref(href) {
  const value = decodeHtmlEntities(href).trim();
  if (!value) return "";
  const hashMatch = value.match(/#([^?&]+)/);
  if (hashMatch?.[1]) return hashMatch[1];
  const tabMatch = value.match(/[?&]tab=([^&#]+)/);
  if (tabMatch?.[1]) return `tab:${decodeURIComponent(tabMatch[1])}`;
  return value;
}

function tabStateKey(parentSlug, text, href) {
  const target = tabTargetFromHref(href) || text;
  return `${parentSlug}:${normalizeTabToken(target || text).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function loadTabStates(fileRouteMap) {
  const manifestDir = tabExtractionRoot ? path.join(tabExtractionRoot, "state-manifests") : "";
  if (!manifestDir || !fs.existsSync(manifestDir)) {
    return { byRoute: new Map(), audit: [], total: 0, loaded: 0 };
  }

  const byRoute = new Map();
  const audit = [];
  const manifestFiles = fs.readdirSync(manifestDir).filter(file => file.endsWith(".json")).sort();
  for (const file of manifestFiles) {
    const manifestPath = path.join(manifestDir, file);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const parentSlug = manifest.parent?.slug || manifest.parentSlug || "";
    if (!parentSlug || invalidExtractedSlugs.has(parentSlug)) continue;
    const route = fileRouteMap.get(parentSlug) || routeAliases[parentSlug] || fallbackRoute(parentSlug);
    if (localTabOnlySlugs.has(parentSlug)) {
      audit.push({ file, parentSlug, route, status: "skipped-local-tab-only" });
      continue;
    }
    const contentRel = manifest.files?.pageContentRenderedHtml;
    const contentPath = contentRel ? path.join(tabExtractionRoot, contentRel) : "";
    if (!contentPath || !fs.existsSync(contentPath)) {
      audit.push({ file, parentSlug, route, status: "missing-content" });
      continue;
    }

    const rawContent = extractedContentFragment(fs.readFileSync(contentPath, "utf8"), parentSlug);
    const bodyHtml = cleanExtractedContent(rawContent, fileRouteMap);
    const breadcrumbsRel = manifest.files?.breadcrumbsRenderedHtml;
    const breadcrumbsPath = breadcrumbsRel ? path.join(tabExtractionRoot, breadcrumbsRel) : "";
    const breadcrumbsHtml = breadcrumbsPath && fs.existsSync(breadcrumbsPath)
      ? cleanExtractedContent(fs.readFileSync(breadcrumbsPath, "utf8"), fileRouteMap)
      : "";
    const text = decodeHtmlEntities(manifest.tab?.text || manifest.tabText || "").replace(/\s+/g, " ").trim();
    const href = decodeHtmlEntities(manifest.tab?.href || manifest.href || "").trim();
    const dataUrl = decodeHtmlEntities(manifest.tab?.dataUrl || manifest.dataUrl || "").trim();
    const target = tabTargetFromHref(href || dataUrl);
    const state = {
      key: tabStateKey(parentSlug, text, href || dataUrl),
      route,
      parentSlug,
      text,
      href,
      target,
      dataUrl,
      sourceFile: contentRel,
      sourceKind: `tab-state:${manifest.captureMode || "captured"}`,
      breadcrumbsHtml,
      bodyHtml
    };
    if (!byRoute.has(route)) byRoute.set(route, []);
    byRoute.get(route).push(state);
    audit.push({
      file,
      parentSlug,
      route,
      key: state.key,
      text,
      href,
      target,
      status: "ok",
      bodyLength: bodyHtml.length
    });
  }

  return {
    byRoute,
    audit,
    total: manifestFiles.length,
    loaded: audit.filter(state => state.status === "ok").length
  };
}

function auditPage({ file, slug, route, rawContent, bodyHtml, sourceKind }) {
  const checks = {
    hasPageContent: rawContent.trim().length > 0,
    hasPageHeader: /\bpage-header\b|<h1\b/i.test(bodyHtml),
    hasToolbarOrButtons: /\bbtn\b|<button\b/i.test(bodyHtml),
    hasFormControls: /<(input|select|textarea)\b/i.test(bodyHtml),
    hasTable: /<table\b|\btable\b/i.test(bodyHtml),
    hasTabs: /\bnav-tabs\b|\bdata-toggle=["']tab/i.test(bodyHtml),
    hasRowsOrPanels: /\b(row|card|widget-box|panel|accordion|page-content)\b/i.test(bodyHtml),
    hasVisibleBody: bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length > 20
  };
  const missing = Object.entries(checks).filter(([, ok]) => !ok).map(([key]) => key);
  let status = "ok";
  if (!checks.hasPageContent || !checks.hasVisibleBody) status = "reextract";
  else if (!validFragmentSlugs.has(slug) && !checks.hasPageHeader && !checks.hasTable && !checks.hasFormControls && !checks.hasRowsOrPanels) status = "review";

  return {
    file,
    slug,
    route,
    sourceKind,
    status,
    missing,
    bodyLength: bodyHtml.length,
    visibleTextLength: bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length
  };
}

if (!fs.existsSync(rawDir) && !fs.existsSync(renderedDir)) {
  throw new Error(`Missing extraction directories: ${rawDir} or ${renderedDir}`);
}

const files = fs.existsSync(rawDir) ? fs.readdirSync(rawDir).filter(file => file.endsWith(".html")).sort() : [];
const renderedFiles = fs.existsSync(renderedDir)
  ? fs.readdirSync(renderedDir).filter(file => file.endsWith(".html")).sort()
  : [];
const allFiles = Array.from(new Set([...files, ...renderedFiles])).sort();
const safeCaptureData = loadSafePageCaptureEntries(safeCaptureRoots);
const fileRouteMap = new Map();
for (const file of allFiles) {
  const slug = stripNumberAndExt(file);
  if (invalidExtractedSlugs.has(slug)) continue;
  const route = routeForSlug(slug);
  fileRouteMap.set(slug, route);
}
for (const entry of safeCaptureData.entries) {
  if (invalidExtractedSlugs.has(entry.slug)) continue;
  fileRouteMap.set(entry.slug, routeForSlug(entry.slug));
}

const pages = {};
const routes = [];
const audit = [];

for (const file of allFiles) {
  const slug = stripNumberAndExt(file);
  if (invalidExtractedSlugs.has(slug)) continue;
  const route = fileRouteMap.get(slug);
  const renderedPath = path.join(renderedDir, file);
  const rawPath = path.join(rawDir, file);
  const hasRendered = fs.existsSync(renderedPath);
  const sourcePath = hasRendered ? renderedPath : rawPath;
  if (!fs.existsSync(sourcePath)) continue;
  let sourceKind = hasRendered ? "rendered" : "raw";
  const html = fs.readFileSync(sourcePath, "utf8");
  const breadcrumbsPath = hasRendered && fs.existsSync(path.join(breadcrumbsDir, file))
    ? path.join(breadcrumbsDir, file)
    : "";
  const fullHtmlPath = hasRendered && fs.existsSync(path.join(renderedFullDir, file))
    ? path.join(renderedFullDir, file)
    : rawPath;
  const fullHtml = fs.existsSync(fullHtmlPath) ? fs.readFileSync(fullHtmlPath, "utf8") : html;
  let rawContent = hasRendered ? extractedContentFragment(html, slug) : extractPageContent(html);
  if (standaloneFullDocumentSlugs.has(slug) && !meaningfulPageContent(rawContent)) {
    const fullDocumentContent = extractedContentFragment(fullHtml, slug);
    if (meaningfulPageContent(fullDocumentContent)) {
      rawContent = fullDocumentContent;
      sourceKind = "rendered-full-document-fragment";
    }
  }
  const bodyHtml = cleanExtractedContent(rawContent, fileRouteMap);
  const breadcrumbsSource = breadcrumbsPath ? fs.readFileSync(breadcrumbsPath, "utf8") : extractDivById(fullHtml, "breadcrumbs");
  const breadcrumbsHtml = cleanExtractedContent(breadcrumbsSource, fileRouteMap);
  const title = titleFromHtml(rawContent || html, slug);
  const page = {
    route,
    title,
    slug,
    sourceFile: file,
    sourceKind,
    breadcrumbsHtml,
    bodyHtml
  };
  pages[route] = page;
  routes.push({ route, title, slug, sourceFile: file, sourceKind });
  audit.push(auditPage({ file, slug, route, rawContent, bodyHtml, sourceKind }));
}

const safePages = loadSafePages(safeCaptureData.entries, fileRouteMap);
for (const page of safePages.pages) {
  pages[page.route] = page;
  upsertRouteEntry(routes, {
    route: page.route,
    title: page.title,
    slug: page.slug,
    sourceFile: page.sourceFile,
    sourceKind: page.sourceKind
  });
  audit.push(auditPage({
    file: page.sourceFile,
    slug: page.slug,
    route: page.route,
    rawContent: page.bodyHtml,
    bodyHtml: page.bodyHtml,
    sourceKind: page.sourceKind
  }));
}

const tabStates = loadTabStates(fileRouteMap);
for (const [route, states] of tabStates.byRoute.entries()) {
  if (pages[route]) {
    pages[route].tabStates = states;
    if (!pages[route].bodyHtml && states[0]?.bodyHtml) {
      pages[route].bodyHtml = states[0].bodyHtml;
      pages[route].sourceFile = states[0].sourceFile || pages[route].sourceFile;
      pages[route].sourceKind = `${pages[route].sourceKind}+tab-state-fallback`;
    }
  }
}

const output = `// Generated by scripts/build-extracted-pages.mjs from OPS rendered captures with raw extraction fallback.\n` +
  `// Do not edit this file by hand; edit the generator or raw extraction mapping.\n` +
  `window.OPS_EXTRACTED_PAGES = ${JSON.stringify(pages, null, 2)};\n` +
  `window.OPS_EXTRACTED_PAGE_ROUTES = ${JSON.stringify(routes, null, 2)};\n`;

fs.writeFileSync(outputFile, output);
fs.mkdirSync(path.dirname(auditFile), { recursive: true });
fs.writeFileSync(auditFile, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  rawDir,
  renderedDir,
  renderedFullDir,
  renderedAvailable: renderedFiles.length,
  renderedUsed: audit.filter(page => page.sourceKind === "rendered").length,
  safeCaptureRoots,
  safeCaptureRootAudit: safeCaptureData.rootAudit,
  safePagesAvailable: safeCaptureData.entries.length,
  safePagesLoaded: safePages.pages.length,
  safePagesSkipped: safePages.audit.filter(page => page.status !== "ok").length,
  tabExtractionRoot,
  tabStatesAvailable: tabStates.total,
  tabStatesLoaded: tabStates.loaded,
  total: audit.length,
  ok: audit.filter(page => page.status === "ok").length,
  review: audit.filter(page => page.status === "review").length,
  reextract: audit.filter(page => page.status === "reextract").length,
  pages: audit,
  safePages: safePages.audit,
  tabStates: tabStates.audit
}, null, 2)}\n`);
console.log(`Generated ${routes.length} extracted OPS pages at ${outputFile}`);
console.log(`Loaded ${safePages.pages.length}/${safeCaptureData.entries.length} safe captured OPS pages`);
console.log(`Loaded ${tabStates.loaded}/${tabStates.total} captured OPS tab states`);
console.log(`Wrote structure audit at ${auditFile}`);
