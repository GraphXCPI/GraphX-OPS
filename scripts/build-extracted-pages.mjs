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
const outputFile = path.join(root, "ops-extracted-pages.js");
const auditFile = path.join(root, "raw-reference", "extracted-page-structure-audit.json");

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

function stripNumberAndExt(filename) {
  return filename.replace(/^\d+-/, "").replace(/\.html$/, "");
}

function fallbackRoute(slug) {
  return slug.replace(/_/g, "-").toLowerCase();
}

function titleFromHtml(html, slug) {
  const h1 = html.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/i)?.[1];
  const title = h1 || html.match(/<title[^>]*>\s*(?:Admin\s*::\s*)?([\s\S]*?)\s*<\/title>/i)?.[1];
  return (title || slug.replace(/[-_]/g, " ")).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
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

function cleanExtractedContent(content, fileRouteMap) {
  let cleaned = content
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)="[^"]*"/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)='[^']*'/gi, "")
    .replace(/\sdata-cf-modified-[^=]+="[^"]*"/gi, "");

  cleaned = cleaned.replace(/\b(action|href)=["'](?:https?:\/\/(?:staging\.)?visualgraphx\.com)?\/?admin\/([^"'?#]+)([^"']*)["']/gi, (full, attr, file, suffix) => {
    const base = path.basename(file, ".php");
    const route = fileRouteMap.get(base) || routeAliases[base] || fallbackRoute(base);
    if (attr.toLowerCase() === "href") return `href="#current/${route}" data-page="${route}"`;
    return `action="#current/${route}"`;
  });

  cleaned = cleaned.replace(/\bdata-link=["']https?:\/\/(?:staging\.)?visualgraphx\.com\/admin\/([^"'?#]+)([^"']*)["']/gi, (full, file) => {
    const base = path.basename(file, ".php");
    const route = fileRouteMap.get(base) || routeAliases[base] || fallbackRoute(base);
    return `data-link="#current/${route}" data-page="${route}"`;
  });

  cleaned = cleaned.replace(/\bhref=["']([^"']+\.php)([^"']*)["']/gi, (full, file) => {
    const base = path.basename(file, ".php");
    const route = fileRouteMap.get(base) || routeAliases[base] || fallbackRoute(base);
    return `href="#current/${route}" data-page="${route}"`;
  });

  cleaned = cleaned.replace(/\bhref=(["'])#([^"']+)\1/gi, 'href="javascript:void(0)" data-tab-target="$2"');

  cleaned = cleaned.replace(/\bsrc=["']https?:\/\/(?:staging\.)?visualgraphx\.com\/([^"']+)["']/gi, 'src="https://staging.visualgraphx.com/$1"');

  return cleaned.trim();
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
    const contentRel = manifest.files?.pageContentRenderedHtml;
    const contentPath = contentRel ? path.join(tabExtractionRoot, contentRel) : "";
    if (!contentPath || !fs.existsSync(contentPath)) {
      audit.push({ file, parentSlug, route, status: "missing-content" });
      continue;
    }

    const rawContent = fs.readFileSync(contentPath, "utf8");
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
  else if (!checks.hasPageHeader && !checks.hasTable && !checks.hasFormControls && !checks.hasRowsOrPanels) status = "review";

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
const fileRouteMap = new Map();
for (const file of allFiles) {
  const slug = stripNumberAndExt(file);
  if (invalidExtractedSlugs.has(slug)) continue;
  const route = routeAliases[slug] || fallbackRoute(slug);
  fileRouteMap.set(slug, route);
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
  const sourceKind = hasRendered ? "rendered" : "raw";
  const html = fs.readFileSync(sourcePath, "utf8");
  const rawContent = hasRendered ? html : extractPageContent(html);
  const bodyHtml = cleanExtractedContent(rawContent, fileRouteMap);
  const breadcrumbsPath = hasRendered && fs.existsSync(path.join(breadcrumbsDir, file))
    ? path.join(breadcrumbsDir, file)
    : "";
  const fullHtmlPath = hasRendered && fs.existsSync(path.join(renderedFullDir, file))
    ? path.join(renderedFullDir, file)
    : rawPath;
  const fullHtml = fs.existsSync(fullHtmlPath) ? fs.readFileSync(fullHtmlPath, "utf8") : html;
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
  tabExtractionRoot,
  tabStatesAvailable: tabStates.total,
  tabStatesLoaded: tabStates.loaded,
  total: audit.length,
  ok: audit.filter(page => page.status === "ok").length,
  review: audit.filter(page => page.status === "review").length,
  reextract: audit.filter(page => page.status === "reextract").length,
  pages: audit,
  tabStates: tabStates.audit
}, null, 2)}\n`);
console.log(`Generated ${routes.length} extracted OPS pages at ${outputFile}`);
console.log(`Loaded ${tabStates.loaded}/${tabStates.total} captured OPS tab states`);
console.log(`Wrote structure audit at ${auditFile}`);
