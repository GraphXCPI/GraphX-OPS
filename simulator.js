const OPS = {
  mode: "current",
  page: "dashboard",
  openMenu: "dashboard",
  openChild: "",
  loginAs: "cderamos",
};

window.OPS = OPS;

const icon = {
  dashboard: "tachometer-alt",
  orders: "shopping-cart",
  quotes: "file-alt",
  customers: "user",
  stores: "store",
  products: "tags",
  templates: "columns",
  content: "file-alt",
  personalization: "cog",
  seo: "globe",
  partners: "handshake",
  config: "cogs",
  imposition: "th-large",
  studio: "edit",
  reports: "chart-line",
  admin: "user-shield",
  api: "sync-alt",
  builder: "sitemap",
  alerts: "bell",
  media: "images",
};

const currentMenu = [
  { id: "dashboard", label: "Dashboard", icon: icon.dashboard, page: "dashboard" },
  { id: "orders", label: "Orders", icon: icon.orders, children: [
	    { label: "List Orders", page: "orders", children: [
	      { label: "List Orders", page: "orders" },
	      { label: "Payment Request", page: "payment-request" },
	    ] },
	    { label: "Add New Order", page: "add-order" },
	    { label: "Export/API Orders", page: "export-api-orders" },
	    { label: "Job Board", page: "job-board", children: [
	      { label: "Summary", page: "job-board" },
	      { label: "Grid View", page: "job-board-grid" },
	    ] },
	    { label: "Order Status", page: "order-status" },
	    { label: "Coupons / Discount", page: "coupons" },
	    { label: "Store Credit", page: "reward-points" },
	    { label: "Unpaid Orders", page: "unpaid-orders" },
	    { label: "Archive Orders", page: "archive-orders" },
	  ] },
  { id: "quotes", label: "Quote Management", icon: icon.quotes, children: [
	    { label: "Quotes", page: "quotes" },
	    { label: "Add New Quote", page: "add-quote" },
	    { label: "Printer Quotes", page: "vendor-quotes" },
	    { label: "Predefined Text", page: "predefined-quotes" },
	    { label: "Quote Status", page: "quote-status" },
	  ] },
  { id: "customer", label: "Customer", icon: icon.customers, children: [
	    { label: "Customers", page: "customers" },
	    { label: "Newsletter", page: "newsletter" },
	    { label: "Design Proofs", page: "design-proofs" },
	    { label: "Customer Templates", page: "customer-designs" },
	  ] },
  { id: "stores", label: "Store Management", icon: icon.stores, children: [
    { label: "Stores", page: "stores" },
    { label: "Store Fields", page: "store-fields" },
  ] },
  { id: "products", label: "Products", icon: icon.products, children: [
    { label: "Print Products", page: "print-products" },
    { label: "Ready To Buy Products", page: "ready-products" },
	    { label: "Product Options", page: "product-options" },
	    { label: "Product Categories", page: "product-categories" },
	    { label: "Product Weight/Days/SKU", page: "product-weight" },
	    { label: "Products Tax/VAT Settings", page: "product-tax" },
	    { label: "Preview Image DPI", page: "preview-image-settings" },
	    { label: "Product Price", page: "product-price", children: [
	      { label: "Product Price", page: "product-price" },
	      { label: "Product Price - Bulk", page: "product-price-bulk" },
	      { label: "Product Option Price - Bulk", page: "product-option-price-bulk" },
	      { label: "Product Price - Excel", page: "product-price-excel" },
	      { label: "Import Modified Price", page: "product-price-modify" },
	      { label: "Percentage (+/-)", page: "product-price-percent" },
	    ] },
	  ] },
	  { id: "templates", label: "Templates", icon: icon.templates, children: [
	    { label: "Product Templates", page: "templates" },
	    { label: "Product Master Templates", page: "template-master" },
	    { label: "PDF Block Templates", page: "pdf-blocks" },
	    { label: "Art Layouts", page: "art-layouts" },
	    { label: "Template Categories", page: "template-categories" },
  ] },
  { id: "content", label: "Content Management", icon: icon.content, children: [
    { label: "Contents", page: "cms-pages" },
	    { label: "FAQs", page: "faqs" },
	    { label: "Testimonials", page: "testimonials" },
	    { label: "Banners", page: "banners" },
	    { label: "Promotional Message", page: "promotional" },
	    { label: "Email/SMS", page: "email-templates", children: [
	      { label: "Email Templates", page: "email-templates" },
	      { label: "SMS Templates", page: "sms-templates" },
      { label: "Email Reminders", page: "email-reminders" },
    ] },
    { label: "Media Gallery", page: "media-gallery" },
  ] },
  { id: "personalization", label: "Store Personalization", icon: icon.personalization, children: [
    { label: "Product Page Layout", page: "product-page-layout" },
    { label: "Language Text References", page: "language-text" },
    { label: "Links - Header / Footer", page: "links" },
    { label: "Sidebar Management", page: "sidebar-management", children: [
      { label: "Sidebar Management", page: "sidebar-management" },
      { label: "Sidebar Widget", page: "sidebar-widget" },
    ] },
    { label: "Website Themes", page: "themes" },
  ] },
  { id: "seo", label: "SEO", icon: icon.seo, children: [
	    { label: "Page title, Keyword setting", page: "seo-global" },
	    { label: "HTML Help", page: "html-help" },
	    { label: "Sitemaps", page: "sitemaps" },
	    { label: "Metatags Settings", page: "metatags" },
    { label: "Robots", page: "robots" },
    { label: "Manage URL Redirection", page: "redirects" },
    { label: "Image Alt Text", page: "image-alt" },
  ] },
  { id: "partners", label: "Business Partners", icon: icon.partners, children: [
    { label: "Printer", page: "vendors" },
    { label: "Sales Agent", page: "sales-agents" },
  ] },
  { id: "config", label: "Store Configuration", icon: icon.config, children: [
	    { label: "Site Settings", page: "site-settings" },
	    { label: "Languages", page: "languages" },
	    { label: "Currency", page: "currency" },
	    { label: "Country / States", page: "countries" },
	    { label: "Web Optimization", page: "image-optimization" },
	    { label: "Manage Site Access", page: "blocked-ips" },
	    { label: "Manage Web Storage", page: "web-storage" },
	    { label: "Payments Method", page: "payments" },
	    { label: "Shipping Method", page: "shipping" },
	    { label: "Tax / Vat Settings", page: "tax-settings" },
	    { label: "External Service Settings", page: "external-services" },
	    { label: "Admin Panel Text References", page: "admin-text" },
	    { label: "Add on Plugins/Services", page: "addons" },
	  ] },
  { id: "imposition", label: "Imposition Beta", icon: icon.imposition, children: [
	    { label: "Sheet Size Management", page: "sheet-sizes" },
	    { label: "Schema Manager", page: "schemas" },
	    { label: "Marks Management", page: "imposition-symbols" },
	    { label: "Impose Job", page: "impose-job" },
    { label: "Product Schema Settings", page: "product-schema-settings" },
  ] },
	  { id: "studio", label: "Designer Studio", icon: icon.studio, children: [
	    { label: "Studio Settings", page: "studio-settings" },
	    { label: "Language Text References", page: "studio-language-text" },
	    { label: "Images", page: "studio-images" },
	    { label: "Image Categories", page: "studio-image-categories" },
	    { label: "Color Settings", page: "studio-colors" },
	    { label: "Custom CSS", page: "studio-css" },
	    { label: "Real Preview", page: "studio-models" },
	    { label: "Studio Fonts", page: "studio-fonts" },
	  ] },
	  { id: "reports", label: "Reports", icon: icon.reports, children: [
	    { label: "Order Summary", page: "sales-order-summary" },
	    { label: "Order Detail", page: "sales-order-details" },
	    { label: "Order Product Detail", page: "sales-order-product-details" },
	    { label: "Quote Summary", page: "sales-quote-summary" },
	    { label: "Product Sales", page: "product-sales-report" },
	    { label: "Template Sales", page: "template-sales-report" },
	    { label: "Coupon Summary", page: "coupon-report" },
	    { label: "Shipping Summary", page: "shipping-report" },
	    { label: "Tax Summary", page: "tax-report" },
	    { label: "Payment Request", page: "payment-request-report" },
	    { label: "Account Summary", page: "pay-on-account-report" },
	    { label: "Customer Details", page: "customer-details-report" },
	    { label: "Customer Order Summary", page: "customer-order-summary" },
	    { label: "Printer Commission", page: "vendor-commission-report" },
	    { label: "Printer Order Summary", page: "vendor-order-summary" },
	    { label: "Sales Agent Commission", page: "sales-agent-commission-report" },
	    { label: "Inventory Report", page: "inventory-report" },
	    { label: "Inventory Request", page: "inventory-request-report" },
	    { label: "Product Stock", page: "stock-summary-report" },
	    { label: "Order Delivery", page: "production-day-report" },
	    { label: "Order Product Wise", page: "production-time-report" },
	    { label: "Log", page: "system-logs" },
	  ] },
	  { id: "admin", label: "Admin", icon: icon.admin, children: [
	    { label: "Admin", page: "admin-users" },
	    { label: "Admin Group / Role", page: "roles" },
	    { label: "Workflow Admin", page: "workflow-admin" },
	  ] },
];

const proposedMenu = [
  { id: "dashboard", label: "Dashboard", icon: icon.dashboard, page: "dashboard" },
  { id: "orders", label: "Orders", icon: icon.orders, children: [
    { label: "Orders", page: "orders" },
    { label: "Add New Order", page: "add-order" },
    { label: "Order Status", page: "order-status" },
    { label: "Coupons / Discount", page: "coupons" },
    { label: "Store Credit", page: "store-credit" },
  ] },
  { id: "quotes", label: "Quotes", icon: icon.quotes, children: [
    { label: "Quotes", page: "quotes" },
    { label: "Add New Quote", page: "add-quote" },
    { label: "Quote Status", page: "quote-status" },
  ] },
  { id: "partners", label: "Vendors & Partners", icon: icon.partners, children: [
    { label: "Vendor Quotes", page: "vendor-quotes" },
    { label: "Vendors", page: "vendors" },
    { label: "Sales Agents & Partners", page: "sales-agents" },
  ] },
  { id: "customers", label: "Customer Accounts", icon: icon.customers, children: [
    { label: "Customers", page: "customers" },
    { label: "B2B Account Users", page: "b2b-account-users" },
    { label: "Store Admins", page: "store-admins" },
    { label: "User Groups", page: "user-groups" },
    { label: "Newsletter", page: "newsletter" },
    { label: "Design Proofs", page: "design-proofs" },
  ] },
  { id: "stores", label: "Store Management", icon: icon.stores, children: [
    { label: "Stores", page: "stores" },
    { label: "B2B Store Theme", page: "b2b-store-theme" },
    { label: "Store Fields", page: "store-fields" },
    { label: "Store Workspace", page: "store-workspace" },
    { label: "Duplicate Store Data", page: "duplicate-store-data" },
  ] },
  { id: "catalog", label: "Product Catalog", icon: icon.products, children: [
    { label: "Products", page: "product-catalog" },
    { label: "Product Options", page: "product-options" },
    { label: "Product Categories", page: "product-categories" },
    { label: "Stock & Settings", page: "stock-settings" },
    { label: "Pricing", page: "product-price" },
    { label: "Markup Master", page: "markup-master" },
  ] },
  { id: "templates", label: "Templates", icon: icon.templates, children: [
    { label: "Product Templates", page: "templates" },
    { label: "PDF Blocks", page: "pdf-blocks" },
    { label: "Art Layouts", page: "art-layouts" },
    { label: "Template Categories", page: "template-categories" },
  ] },
  { id: "site-builder", label: "Site Builder", icon: icon.builder, children: [
    { label: "Pages", page: "cms-pages" },
    { label: "Page Categories", page: "page-categories" },
    { label: "Links & Menus", page: "links" },
    { label: "Sidebar Management", page: "sidebar-management" },
    { label: "Sidebar Widget", page: "sidebar-widget" },
    { label: "Themes", page: "themes" },
    { label: "Account Pages", page: "account-pages" },
    { label: "Product Layout Builder", page: "product-page-layout" },
    { label: "Product Showcase", page: "product-showcase" },
    { label: "Content Management", page: "site-content", children: [
      { label: "Website Logos", page: "website-logos" },
      { label: "Storefront Text References", page: "language-text" },
      { label: "Banners", page: "banners" },
      { label: "Asset Manager", page: "asset-manager" },
      { label: "Help Media", page: "help-media" },
      { label: "Form Management", page: "form-management" },
      { label: "Breadcrumbs", page: "breadcrumbs" },
      { label: "FAQs", page: "faqs" },
      { label: "Testimonials", page: "testimonials" },
    ] },
  ] },
  { id: "alerts", label: "Alerts & Notifications", icon: icon.alerts, children: [
    { label: "Email Templates", page: "email-templates" },
    { label: "SMS Templates", page: "sms-templates" },
    { label: "Alert Automations", page: "email-reminders" },
  ] },
  { id: "config", label: "Store Configuration", icon: icon.config, children: [
    { label: "Site Settings", page: "site-settings" },
    { label: "Languages", page: "languages" },
    { label: "Currency", page: "currency" },
    { label: "Country / States", page: "country-states" },
    { label: "Web Optimization", page: "web-optimization" },
    { label: "Manage Site Access", page: "site-access" },
    { label: "Payments", page: "payments" },
    { label: "Shipping", page: "shipping" },
    { label: "Tax / VAT Settings", page: "tax-settings" },
    { label: "External Service Settings", page: "external-services" },
    { label: "Admin Panel Text References", page: "admin-text" },
  ] },
  { id: "api", label: "Export & API", icon: icon.api, children: [
    { label: "Order Exports", page: "order-exports" },
    { label: "API & Webhooks", page: "api-webhooks" },
  ] },
  { id: "seo", label: "SEO", icon: icon.seo, children: [
    { label: "Global SEO", page: "seo-global" },
    { label: "Product SEO", page: "product-seo" },
    { label: "Category SEO", page: "category-seo" },
    { label: "Category Group SEO", page: "category-group-seo" },
    { label: "Page Category SEO", page: "page-category-seo" },
    { label: "Content SEO", page: "content-seo" },
    { label: "Asset SEO", page: "asset-seo" },
    { label: "Redirects", page: "redirects" },
  ] },
  { id: "imposition", label: "Product Imposition", icon: icon.imposition, children: [
    { label: "Sheet Sizes", page: "sheet-sizes" },
    { label: "Schemas", page: "schemas" },
    { label: "Impose Job", page: "impose-job" },
    { label: "Product Schema Settings", page: "product-schema-settings" },
  ] },
  { id: "studio", label: "Designer Studio", icon: icon.studio, children: [
    { label: "Studio Settings", page: "studio-settings" },
    { label: "Language Text", page: "studio-language" },
    { label: "Images", page: "studio-images" },
    { label: "Fonts", page: "studio-fonts" },
  ] },
  { id: "reports", label: "Reports & System Logs", icon: icon.reports, children: [
    { label: "Sales Reports", page: "sales-reports" },
    { label: "Production Reports", page: "production-reports" },
    { label: "Inventory Reports", page: "inventory-reports" },
    { label: "System Logs", page: "system-log" },
  ] },
  { id: "admin", label: "Admin Users", icon: icon.admin, children: [
    { label: "Users", page: "admin-users" },
    { label: "Roles", page: "roles" },
  ] },
];

const orders = [
  ["3052", "New Order", "2 Items", "$519.33", "6 hr 11 min ago", "Alex Loudenslager", "info@thelabna.com", ["Arlon V9700 - Vehicle Wrap Film (1 Qty)", "Window Perf (1 Qty)"]],
  ["3051", "New Order", "4 Items", "$686.00", "23 hr 27 min ago", "Drew Neverett", "drew.neverett@positionsports.com", ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "+2"]],
  ["3050", "New Order", "4 Items", "$686.00", "23 hr 29 min ago", "Drew Neverett", "drew.neverett@positionsports.com", ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "+2"]],
  ["3049", "New Order", "4 Items", "$692.35", "23 hr 31 min ago", "Drew Neverett", "drew.neverett@positionsports.com", ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "More"]],
];

const quotes = [
  ["2285", "Active Quote", "Pair of Vehicle ...", "07-02-2026", "Misty Galica", "Misty@Azsmithpainting.com", ["Magnets"]],
  ["2284", "Active Quote", "Decals/ Floor- ...", "07-02-2026", "Gerald Sherrill", "gerald@commandlink.com", ["Wraps - Walls", "Decals - Floor,", "+1"]],
  ["2283", "Draft", "Decals - Cut Vinyl", "07-02-2026", "Derek Petrucci", "derek.petrucci@hotmail.com", ["Decals - Cut Vinyl"]],
  ["2282", "Active Quote", "1/2 MDO Direct...", "07-01-2026", "Jake Kungl", "jake@kungljunglesigns.com", ["1/2 MDO Direct Print 8' x 4'", "+1"]],
];

const products = [
  ["288", "NOW HIRING DECAL", "Size : 5 x 15", "Available To : All Store", "Fixed Quantity & Price", "Off"],
  ["301", "T-Shirt OPS", "Size : T-Shirt / Page : Front - Left Chest", "Available To : All Store", "Range Based With Multiplication", "Off"],
  ["302", "DTF Prints [ DTF Prints (Outsource) ]", "Size : 3 x 3 - Sleeve", "Available To : All Store", "Range Based With Multiplication", "Off"],
  ["314", "Straight Tension Fabric Displays - 8ft", "Size : 8ft", "Available To : All Store", "Range Based With Multiplication", "On"],
  ["321", "10ft Event Tent", "Size : 10ft Event Tent", "Available To : All Store", "Range Based With Multiplication", "Off"],
];

const pageFamilies = {
  orders: ["orders", "payment-request", "add-order", "order-status", "coupons", "store-credit", "reward-points", "unpaid-orders", "archive-orders", "job-board", "job-board-grid"],
  quotes: ["quotes", "add-quote", "quote-status", "predefined-quotes"],
  vendor: ["vendor-quotes", "vendors", "sales-agents"],
  customer: ["customers", "newsletter", "design-proofs", "customer-designs", "b2b-account-users", "store-admins", "user-groups"],
  store: ["stores", "store-fields", "store-workspace", "store-workspace-edit", "store-workspace-customers", "store-workspace-products", "store-workspace-markup", "store-workspace-addresses", "store-workspace-credit", "store-workspace-builder", "store-workspace-alerts", "store-workspace-fields", "duplicate-store-data", "b2b-store-theme"],
  product: ["print-products", "ready-products", "product-catalog", "product-options", "product-categories", "category-groups", "product-category-edit", "category-group-edit", "product-weight", "production-days", "products-sku", "stock-settings", "product-tax", "product-price", "product-price-bulk", "product-option-price-bulk", "product-price-excel", "product-price-modify", "product-price-percent", "preview-image-settings", "markup-master", "manage-stock"],
  template: ["templates", "template-master", "pdf-blocks", "art-layouts", "template-categories"],
  builder: ["cms-pages", "site-content", "page-categories", "links", "sidebar-management", "sidebar-widget", "themes", "account-pages", "product-page-layout", "product-showcase", "website-logos", "language-text", "banners", "promotional", "asset-manager", "help-media", "media-gallery", "form-management", "breadcrumbs", "faqs", "testimonials"],
  alerts: ["email-templates", "sms-templates", "email-reminders"],
  seo: ["seo-global", "html-help", "sitemaps", "metatags", "robots", "redirects", "image-alt", "product-seo", "category-seo", "category-group-seo", "page-category-seo", "content-seo", "asset-seo"],
  config: ["site-settings", "languages", "currency", "countries", "country-states", "image-optimization", "web-optimization", "blocked-ips", "site-access", "web-storage", "payments", "shipping", "tax-settings", "external-services", "admin-text", "addons"],
  api: ["export-api-orders", "order-exports", "api-webhooks"],
  imposition: ["sheet-sizes", "schemas", "imposition-symbols", "impose-job", "product-schema-settings"],
  studio: ["studio-settings", "studio-language", "studio-language-text", "studio-images", "studio-image-categories", "studio-colors", "studio-css", "studio-models", "studio-fonts"],
  reports: ["sales-reports", "production-reports", "inventory-reports", "system-log", "system-logs", "coupon-report", "customer-details-report", "customer-order-summary", "inventory-request-report", "inventory-report", "payment-request-report", "pay-on-account-report", "vendor-commission-report", "vendor-order-summary", "stock-summary-report", "production-day-report", "production-time-report", "product-sales-report", "sales-agent-commission-report", "sales-order-product-details", "sales-order-summary", "sales-order-details", "sales-quote-summary", "shipping-report", "tax-report", "template-sales-report"],
  admin: ["admin-users", "roles", "workflow-admin"],
};

const pageAliases = {
  "store-workspace-edit": "Edit Store",
  "store-workspace-customers": "Store Customers",
  "store-workspace-products": "Store Products",
  "store-workspace-markup": "Store Markup",
  "store-workspace-addresses": "Store Addresses",
  "store-workspace-credit": "Credit Summary",
  "store-workspace-builder": "Store Site Builder",
  "store-workspace-alerts": "Store Alerts & Notifications",
  "store-workspace-fields": "Store Fields",
  "category-groups": "Category group",
  "product-category-edit": "Edit Product Category",
  "category-group-edit": "Edit Category Group",
  "production-days": "Production Days",
  "products-sku": "Products SKU",
  "product-price-bulk": "Product Price - Bulk",
  "product-option-price-bulk": "Product Option Price - Bulk",
  "product-price-excel": "Product Price - Excel",
  "product-price-percent": "Percentage (+/-)",
};

function familyFor(page) {
  return Object.entries(pageFamilies).find(([, pages]) => pages.includes(page))?.[0] || "general";
}

function flattenMenu(group) {
  const items = [];
  const visit = item => {
    if (item.page) items.push(item);
    (item.children || []).forEach(visit);
  };
  visit(group);
  return items;
}

const modePageMap = {
  proposed: {
    "print-products": "product-catalog",
    "ready-products": "product-catalog",
    "manage-stock": "stock-settings",
    "payment-request": "orders",
    "unpaid-orders": "orders",
    "archive-orders": "orders",
    "export-api-orders": "order-exports",
    "stores": "stores",
  },
  current: {
    "product-catalog": "print-products",
    "stock-settings": "product-weight",
    "order-exports": "export-api-orders",
    "api-webhooks": "export-api-orders",
    "stores": "stores",
  },
};

const proposedProductSettingsPages = new Set(["product-weight", "production-days", "products-sku", "stock-settings", "manage-stock", "product-tax"]);

function pagesForMode(mode) {
  return (mode === "current" ? currentMenu : proposedMenu).flatMap(flattenMenu).map(item => item.page).filter(Boolean);
}

function isKnownPage(page) {
  return page === "dashboard" || Object.values(pageFamilies).some(pages => pages.includes(page));
}

function pageForModeSwitch(page, nextMode) {
  const mapped = modePageMap[nextMode]?.[page];
  if (mapped) return mapped;
  if (pagesForMode(nextMode).includes(page) || isKnownPage(page)) return page;
  return "dashboard";
}

function setOpenMenuForPage() {
  const menuItems = OPS.mode === "current" ? currentMenu : proposedMenu;
  let menu = menuItems.find(group => isActiveGroupForPage(group, OPS.page));
  if (!menu && OPS.mode === "proposed" && proposedProductSettingsPages.has(OPS.page)) {
    menu = proposedMenu.find(group => group.id === "catalog");
  }
  OPS.openMenu = menu?.id || "dashboard";
  const openChild = menu?.children?.find(child => child.page === OPS.page || (child.children || []).some(grand => grand.page === OPS.page));
  OPS.openChild = openChild?.children?.some(grand => grand.page === OPS.page) ? `${menu.id}:${openChild.label}` : "";
}

function h(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function app() {
  const menu = OPS.mode === "current" ? currentMenu : proposedMenu;
  return `
    <div class="body-container gx-sim">
      ${topbar()}
      <div class="main-container" id="main-container">
        ${sidebar(menu)}
        <div class="main-content">
          ${subbar()}
          <div class="page-content">
            ${content()}
          </div>
          ${footer()}
        </div>
      </div>
      <div class="mode-switch">
        <button data-mode="current" class="${OPS.mode === "current" ? "on" : ""}">Current OPS</button>
        <button data-mode="proposed" class="${OPS.mode === "proposed" ? "on" : ""}">Proposed</button>
      </div>
    </div>
  `;
}

function footer() {
  return `
          <div class="footer h-auto">
            <div class="footer-inner">
              <div class="py-1 border-none border-t-1 brc-grey-l1">
                <span class="text-muted">
                  <small><i>07-04-2026 06:28</i> </small>
                  <span class="px-2">|</span>
                </span>
                <span class="text-muted">
                  <small>Copyright &copy2026. All rights reserved.</small>
                </span>
              </div>
            </div>
          </div>
          <div class="footer-tools">
            <a id="btn-scroll-up" href="#" class="btn-scroll-up btn btn-dark btn-smd mb-2 mr-2 scroll-btn-visible">
              <i class="fa fa-angle-double-up mx-1"></i>
            </a>
          </div>
  `;
}

function topbar() {
  return `
    <div id="navbar" class="navbar navbar-expand-lg navbar-fixed navbar-default">
      <noscript>
        <div class="alert alert-danger text-center">Currently JavaScript is disabled in your browser, Administrator panel does not work properly.</div>
      </noscript>
      <div class="navbar-inner flex-wrap" id="navbar-container">
        <div class="navbar-intro">
          <button type="button" class="btn btn-burger burger-arrowed static ml-2 d-flex d-xl-none collapsed" aria-label="Toggle sidebar">
            <span class="bars"></span>
          </button>
          <a href="#" class="admin_link navbar-brand text-white d-flex align-items-center py-0 mx-1 h-100" data-page="dashboard">
            <small class="text-center mr-2 py-1 px-2 text-50"><span class="fa-stack fa-md pr-2 d-inline-block" title="Admin">
                <i class="far fa-home fa-stack-2x"></i>
                <i class="fas fa-user-alt fa-stack-1x fa-lg"></i>
            </span><i class="ace-icon fa fa-angle-down pl-1 d-inline-block d-lg-none text-140"></i></small>
            <span class="d-inline-block resize-font">Visual Graphx, LLC.</span>
          </a>
          <i class="d-md-none fa fa-spinner fa-spin text-150 ajax_loader mt-2 orange2" style="display:none;"></i>
        </div>
        <div class="d-lg-none align-self-center header_icon_alignment">
          <button class="navbar-toggler collapsed quickSearchMobile btn btn-info" type="button">
            <i class="fa fa-search"></i>
          </button>
          <button class="navbar-toggler collapsed btn btn-info mr-1" type="button">
            <span class="sr-only">Toogle User Menu</span>
            <i class="fa fa-user text-90"></i>
          </button>
        </div>
        <div class="navbar-content flex-wrap d-lg-flex d-none position-relative quickSearch">
          <form id="quick-search-form" class="form-inline-block mx-auto py-15">
            <div class="input-group px-2">
              <input type="text" class="form-control" aria-label="Text input with dropdown button" id="advance-search" autocomplete="off" placeholder="Search here...." data-searched="">
              <div class="input-group-append" id="button-addon4">
                <button class="btn btn-info" type="button" id="search-btn"><i class="fa fa-search"></i></button>
              </div>
              <div class="dropdown ml-2 d-lg-block">
                <button class="btn btn-info dropdown-toggle" type="button" id="showquickpinpages" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-bookmark text-90"></i>
                </button>
                <div class="dropdown-menu p-0" id="pinpagesdown" aria-labelledby="showquickpinpages">
                  <div class="quickpinpagelist"><input type="text" name="quickpinpagelist" id="quickpinpagelist" value="" class="form-control"></div>
                </div>
              </div>
            </div>
            <div class="bg-white search-result p-3 position-absolute" style="display: none;" id="advance-search-content">
              <div class="menu-list" id="search-menu-items"></div>
            </div>
          </form>
        </div>
        <div class="navbar-menu collapse navbar-collapse navbar-backdrop" id="navbar-menu" role="navigation">
          <div class="navbar-nav">
            <ul class="nav align-items-md-center">
              <li class="btn-danger nav-item d-flex align-items-center py-2 CatchTrash">
                <label href="javascript:void();" class="text-white px-2 mb-0">Cache</label>
                <input id="togglecache" checked="checked" class="ace-switch ace-switch-yesno ace-switch-bars bgc-blue-d2" type="checkbox">
                <a href="#" class="text-white px-2 catch-trash" title="Clear website cache" id="clearcache"><i class="fa fa-lg fa-trash-alt"></i></a>
              </li>
              <li class="nav-item dropdown border-right-0">
                <a href="#" class="nav-link dropdown-toggle d-none d-md-flex"><i class="fa fa-angle-down"></i></a>
                <ul class="dropdown-menu py-0 dropdown-animated brc-primary-m3 info-dropdown">
                  <li class="transparent btn-purple dropdown-item"><a href="#" class="btn-a-purple btn-h-purple"><i class="far fa-file-code"></i> <i class="fa fa-question d-none d-lg-inline-block"></i></a></li>
                  <li class="transparent btn-dark dropdown-item solution-help"><a href="#" class="btn-a-dark btn-h-dark"><i class="fa fa-question-circle"></i></a></li>
                  <li class="transparent btn-blue dropdown-item"><a class="btn-a-blue btn-h-blue" href="#" style="text-decoration:none;">v12.2</a></li>
                </ul>
              </li>
              <li class="btn-info nav-item">
                <a href="#" target="_blank" class="nav-link"><i class="fa fa-desktop"></i></a>
              </li>
              <li class="transparent d-none d-md-flex nav-item opclso align-items-center btn-success" id="lchat">
                <a href="#" class="px-2 lz_cbl"><i class="fa fa-2x fa-comments text-white"></i></a>
              </li>
              <li class="nav-item user-dropdown d-flex d-md-block border-right-0">
                <a href="#" class="dropdown-toggle nav-link">
                  <i class="fa fa-user mr-2"></i>
                  <span class="user-info"><small>Welcome, </small> ${h(OPS.loginAs)}</span>
                  <i class="ace-icon fa fa-caret-down ml-2 d-none d-lg-inline-block"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

function subbar() {
  const extractedBreadcrumbs = extractedBreadcrumbsForPage();
  if (extractedBreadcrumbs) return extractedBreadcrumbs;

  const dashboardControls = OPS.page === "dashboard" ? `
          <div class="col-auto px-0"><label class="mb-0"><input type="radio" class="ace"> <span class="lbl">Filter by Store</span></label></div>
          <div class="col-auto px-2"><label class="mb-0"><input type="radio" class="ace" checked> <span class="lbl">Login As</span></label></div>
          <div class="col-auto px-0"><select class="form-control form-control-sm"><option>${h(OPS.loginAs)}</option><option>gx002_admin</option></select></div>
  ` : "";
  return `
    <div class="breadcrumbs fixed-top d-flex align-items-center bg-light border-bottom flex-wrap" id="breadcrumbs">
      <ul class="breadcrumb py-2">
        <li class="breadcrumb-item text-95"><i class="fa fa-home home-icon"></i> <a href="#" data-page="dashboard">Home</a> </li><li class="active breadcrumb-item text-95">${h(pageTitle())} </li>
      </ul>
      <i class="fa fa-spinner fa-spin text-150 ajax_loader" style="display:none;"></i>
      <div class="pin_icon_data d-flex align-items-center store_header">
        <div class="row align-items-center d-lg-flex d-none flex-nowrap">
          <div class="col-auto px-0">
            <a href="#" class="btn btn-primary btn-sm mr-3"><i class="fa fa-sync-alt"></i> Workflow</a>
          </div>
${dashboardControls}
        </div>
        <div class="d-flex flex-row-reverse align-items-center ml-2 text-120">
          <a class="ml-2 full_screen_icon" href="#"><i class="fa fa-expand"></i></a>
          <a class="ml-2 pr-1" href="#"><i class="fa fa-question-circle"></i></a>
          <span class="pr-1" id="pin_icon"><i class="fa fa-thumbtack pin-icon pinpagebtn fa-sm"></i></span>
        </div>
      </div>
    </div>
  `;
}

function extractedBreadcrumbsForPage() {
  if (OPS.mode !== "current" || OPS.page === "dashboard") return "";
  return extractedPageFor(OPS.page)?.breadcrumbsHtml || "";
}

function sidebar(menu) {
  return `
    <div id="sidebar" class="sidebar sidebar-fixed hoverable  sidebar-default" data-gotoactive="true" data-pullup="true" data-subscroll="true">
      <div class="sidebar-inner">
        <div class="ace-scroll flex-grow-1" ace-scroll>
          <div class="sidebar-section">
            <div class="sidebar-section-item fadeable-left">
              <div class="fadeable">
                <a class="btn btn-success " title="List Orders" data-page="orders"><i class="ace-icon fa fa-shopping-cart"></i></a>
                <a class="btn btn-warning " title="Website Customers" data-page="customers"><i class="ace-icon fa fa-user"></i></a>
                <a class="btn btn-info " title="Print Products" data-page="print-products"><i class="ace-icon fa fa-tags"></i></a>
                <a class="btn btn-warning " title="PDF Block Templates" data-page="pdf-blocks"><i class="ace-icon fa fa-file-pdf"></i></a>
                <a class="btn btn-danger " title="Site Settings" data-page="site-settings"><i class="ace-icon fa fa-cogs"></i></a>
              </div>
              <div class="fadeinable sidebar-shortcuts-mini">
                <span class="btn btn-success p-0"></span>
                <span class="btn btn-info p-0"></span>
                <span class="btn btn-warning p-0"></span>
                <span class="btn btn-danger p-0"></span>
              </div>
            </div>
          </div>
          <ul class="nav has-active-border">${menu.map(renderMenuGroup).join("")}</ul>
        </div>
        <div class="sidebar-toggle sidebar-collapse text-center" id="sidebar-collapse">
          <button type="button" class="btn btn-burger burger-arrowed static collapsed"><i class="ace-icon fa fa-angle-left"></i></button>
        </div>
      </div>
    </div>
  `;
}

function renderMenuGroup(group) {
  const open = OPS.openMenu === group.id;
  const active = isActiveGroup(group);
  const iconClass = opsIconClass(group);
  return `
    <li class="nav-item ${open ? "open" : ""} ${active ? "active" : ""}">
      <a href="#" class="nav-link${group.children ? " dropdown-toggle" : ""}" data-menu="${h(group.id)}" ${group.page ? `data-page="${h(group.page)}"` : ""}>
        <i class="nav-icon ${h(iconClass)}"></i>
        <span class="nav-text fadeable">${h(group.label)}</span>
        ${group.children ? `<i class="arrow fa fa-${open ? "angle-up" : "angle-down"}"></i>` : ""}
      </a>
      <b class="sub-arrow"></b>
      ${group.children && open ? `<div class="submenu collapse hideable show"><ul class="submenu-inner">${group.children.map(child => renderChild(child, group.id)).join("")}</ul></div>` : ""}
    </li>
  `;
}

function renderChild(item, parent) {
  const key = `${parent}:${item.label}`;
  const open = OPS.openChild === key;
  const active = OPS.page === item.page || (item.children || []).some(c => c.page === OPS.page);
  return `
    <li class="nav-item ${open ? "open" : ""} ${active ? "active" : ""}">
      <a href="#" class="nav-link${item.children ? " dropdown-toggle" : ""}" data-child="${h(key)}" ${item.page ? `data-page="${h(item.page)}"` : ""}>
        <span class="nav-text">${h(item.label)}</span>${item.children ? `<i class="arrow fa fa-${open ? "angle-up" : "angle-down"}"></i>` : ""}
      </a>
      ${item.children && open ? `<div class="submenu collapse hideable show"><ul class="submenu-inner">${item.children.map(grand => `<li class="nav-item ${OPS.page === grand.page ? "active" : ""}"><a href="#" class="nav-link" data-page="${h(grand.page)}"><span class="nav-text">${h(grand.label)}</span></a></li>`).join("")}</ul></div>` : ""}
    </li>
  `;
}

function opsIconClass(group) {
  const map = {
    dashboard: "fa fa-tachometer-alt",
    orders: "fa fa-shopping-cart",
    quotes: "fak fa-quote-management",
    customer: "fa fa-user",
    customer2: "fa fa-user",
    customers: "fa fa-user",
    stores: "fa fa-store",
    stores2: "fa fa-store",
    products: "fa fa-tags",
    products2: "fa fa-tags",
    catalog: "fa fa-tags",
    templates: "fa fa-columns",
    content: "fa fa-file-alt",
    "site-builder": "fa fa-sitemap",
    alerts: "fa fa-bell",
    personalization: "fa fa-cog",
    seo: "fa fa-globe",
    partners: "fa fa-handshake",
    config: "fa fa-cogs",
    api: "fa fa-sync-alt",
    imposition: "fa fa-th-large",
    studio: "fa fa-edit",
    reports: "fa fa-chart-line",
    admin: "fa fa-user-shield",
    "admin-users": "fa fa-user-shield",
  };
  return map[group.id] || `fa fa-${group.icon}`;
}

function isActiveGroup(group) {
  return group.page === OPS.page || (group.children || []).some(child => child.page === OPS.page || (child.children || []).some(grand => grand.page === OPS.page));
}

function pageTitle() {
  if (OPS.mode === "proposed" && OPS.page === "dashboard") return "Dashboard";
  if (OPS.mode === "proposed" && OPS.page === "product-tax") return "Stock & Settings";
  return labelForPage(OPS.page) || "Dashboard";
}

function labelForPage(page) {
  const menu = OPS.mode === "current" ? currentMenu : proposedMenu;
  return menu.flatMap(flattenMenu).find(item => item.page === page)?.label || pageAliases[page] || extractedPageFor(page)?.title;
}

function content() {
  if (OPS.mode === "current" && OPS.page !== "dashboard") {
    const extracted = extractedPageFor(OPS.page);
    if (extracted) return extractedOpsPage(extracted);
  }
  if (OPS.page === "dashboard") return dashboard();
  const family = familyFor(OPS.page);
  if (family === "orders") return ordersPage();
  if (family === "quotes") return quotesPage();
  if (family === "vendor") return vendorPage();
  if (family === "customer") return customerPage();
  if (family === "store") return storesPage();
  if (family === "product") return productPage();
  if (family === "template") return templatePage();
  if (family === "builder") return siteBuilderPage();
  if (family === "alerts") return alertsPage();
  if (family === "seo") return seoPage();
  if (family === "config") return configPage();
  if (family === "api") return apiPage();
  if (family === "imposition") return impositionPage();
  if (family === "studio") return studioPage();
  if (family === "reports") return reportsPage();
  if (family === "admin") return adminPage();
  return genericPage(pageTitle());
}

function extractedPageFor(page) {
  return window.OPS_EXTRACTED_PAGES?.[page];
}

function extractedOpsPage(page) {
  const html = page.bodyHtml || `<div class="alert alert-warning">No extracted OPS body was captured for ${h(page.sourceFile || page.slug || page.route)}.</div>`;
  return `<div class="ops-extracted-page" data-source-file="${h(page.sourceFile || "")}">${html}</div>`;
}

function dashboard() {
  return opsDashboard();
}

function opsDashboard() {
  return `
    <div class="row" id="welcome_content">
      <div class="col-12">
        <div class="dashboard-page">
          <div class="row mb-4 align-items-center" id="main_div_quick_links">
            <div class="col-12 col-md d-none d-md-block">
              <div id="quick_links">
                <div id="quick_links_body" class="desk-quicklink-button d-flex align-items-center flex-wrap justify-content-center justify-content-md-start">
                  ${opsQuickLink("Orders", "fa-shopping-cart", "text-primary", "border-primary", "orders")}
                  ${opsQuickLink("Quotes", "fa-file-alt", "text-success", "border-success", "quotes")}
                  ${opsQuickLink("Customers", "fa-user", "text-brown", "border-brown", "customers")}
                  ${opsQuickLink("Products", "fa-tags", "text-warning", "border-warning", "print-products")}
                  ${opsQuickLink("Templates", "fa-columns", "text-info", "border-info", "templates")}
                  ${opsQuickLink("Site Settings", "fa-cog", "text-secondary", "border-secondary", "site-settings")}
                  ${opsQuickLink("Studio Settings", "fa-cogs", "text-pink", "border-pink", "studio-settings")}
                  ${opsQuickLink("Stores", "fa-store", "text-purple", "border-purple", "stores")}
                </div>
              </div>
            </div>
          </div>
          <div class="row" id="sortable">
            <div class="col-12 col-lg-6 DragableDiv">${opsRecentOrdersCard()}</div>
            <div class="col-12 col-lg-6 DragableDiv">${opsJobBoardCard(false)}</div>
            <div class="col-12 col-md-6 col-xl-3 DragableDiv">${opsRecentCard()}</div>
            <div class="col-12 col-md-6 col-xl-3 DragableDiv">${opsSalesStatsCard()}</div>
            <div class="col-12 col-lg-6 DragableDiv">${opsSalesChartCard()}</div>
            <div class="col-12 col-lg-6 DragableDiv">${opsRecentQuotesCard()}</div>
            <div class="col-12 col-lg-6 DragableDiv">${opsJobBoardCard(true)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function opsQuickLink(label, iconName, tone, border, page) {
  return `
    <div class="text-center mx-1 my-0">
      <a href="#" data-page="${h(page)}" class="btn btn-outline-default ${border} btn-h-outline-primary btn-a-outline-primary d-flex flex-column justify-content-center align-items-center px-4 py-2 text-nowrap">
        <i class="fa ${iconName} ${tone} text-180 mb-1"></i>
        <span class="text-dark">${h(label)}</span>
      </a>
    </div>
  `;
}

function opsCard(id, title, iconClass, body, tools = "", options = {}) {
  const viewAll = options.viewAll !== false;
  const bodyClass = options.bodyClass || "card-body p-0";
  const bodyStyle = options.bodyStyle ? ` style="${h(options.bodyStyle)}"` : "";
  const bodyId = options.bodyId ? ` id="${h(options.bodyId)}"` : "";
  const toolbar = options.toolbar || `
          <div class="card-toolbar align-self-center ml-2">
            <a href="#" data-action="reload" class="card-toolbar-btn mx-1"><i class="text-primary far text-90 fa-sync-alt"></i></a>
          </div>`;
  return `
    <div id="${h(id)}" class="card mb-4">
      <div class="card-header border-b-1 bg-transparent p-1 align-items-center ui-sortable-handle">
        <h5 class="card-title mb-2 mb-md-0">
          <i class="ace-icon ${iconClass} pr-1"></i>${title}
        </h5>
        <div class="d-flex align-items-center">
          ${tools}
          ${viewAll ? `<a href="#" class="text-90">View All</a>` : ""}
${toolbar}
        </div>
      </div>
      <div${bodyId} class="${bodyClass}"${bodyStyle}>${body}</div>
    </div>
  `;
}

function opsSearchTool(placeholder) {
  return `
    <div class="form-group mb-0 mx-1">
      <div class="input-group">
        <input type="text" class="form-control form-control-sm input-mask-product " placeholder="${h(placeholder)}">
        <div class="input-group-append">
          <a href="#" class="btn btn-light lineheight-normal search_order">
            <i class="ace-icon far fa-search"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

function opsRecentOrdersCard() {
  return opsCard("recent_orders", "Recent Orders", "far fa-shopping-cart text-warning", `
    ${opsOrderRows()}
  `, opsSearchTool("Order No."), { bodyId: "recent_orders_body", bodyClass: "card-body p-0 scroll-content", bodyStyle: "height: 275px;" });
}

function opsRecentQuotesCard() {
  return opsCard("recent_quotes", "Recent Quotes", "ace-icon fak fa-quote-management text-orange", `
    ${opsQuoteRows()}
  `, opsSearchTool("Recent Quotes"), { bodyId: "recent_quotes_body", bodyClass: "card-body p-0 scroll-content", bodyStyle: "height: 275px;" });
}

function opsOrderRows() {
  return `
    <div class="profile-user-info profile-user-info-striped w-100 mx-0">
      ${orders.map(order => `
        <div class="profile-info-row">
          <div class="profile-info-name text-center">
            <a href="#">${h(order[0])}</a><br>
            <span class="badge badge-primary radius-1">${h(order[1])}</span>
          </div>
          <div class="profile-info-value text-center">
            <span class="badge badge-pill badge-success label-white">${h(order[2])}</span><br>
            <span class="badge badge-pill badge-info label-white mt-1">${h(order[3])}</span><br>
            <small>${h(order[4])}</small>
          </div>
          <div class="profile-info-value">
            <a href="#"><span class="table-customer-name">${h(order[5])}</span></a>
            <small class="d-block">${h(order[6])}</small>
          </div>
          <div class="profile-info-value">
            <ul class="mb-0 pl-3">${order[7].map((item, index) => `<li>${index === 2 || item === "+2" ? `<a href="#">${h(item)}</a>` : h(item)}</li>`).join("")}</ul>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function opsQuoteRows() {
  return `
    <div class="profile-user-info profile-user-info-striped w-100 mx-0">
      ${quotes.map(quote => `
        <div class="profile-info-row">
          <div class="profile-info-name text-center">
            <a href="#">${h(quote[0])}</a><br>
            <span class="badge ${quote[1] === "Draft" ? "badge-warning" : "badge-primary"} radius-1">${h(quote[1])}</span>
          </div>
          <div class="profile-info-value">
            <span>${h(quote[2])}</span><br><small>${h(quote[3])}</small>
          </div>
          <div class="profile-info-value">
            <a href="#"><span class="table-customer-name">${h(quote[4])}</span></a>
            <small class="d-block">${h(quote[5])}</small>
          </div>
          <div class="profile-info-value">
            <ul class="mb-0 pl-3">${quote[6].map(item => `<li>${item.startsWith("+") ? `<a href="#">${h(item)}</a>` : h(item)}</li>`).join("")}</ul>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function opsRecentCard() {
  return `
    <div id="recent-box" class="card mb-4">
      <div class="card-header bg-transparent border-b-1 align-items-center ui-sortable-handle">
        <h5 class="card-title mb-2 mb-md-0">
          <i class="fal fa-copy fa-sm text-warning pr-1"> </i>Recent
        </h5>
        <div class="card-toolbar align-self-start no-border tabs-above pl-0 pl-md-2">
          <ul class="nav nav-tabs card-header-tabs mr-0 flex-nowrap">
            <li class="nav-item"><a class="nav-link radius-0 active text-90" href="#">Orders</a></li>
            <li class="nav-item"><a class="nav-link radius-0 text-90" href="#">Customers</a></li>
            <li class="nav-item"><a class="nav-link radius-0 text-90" href="#">Quotes</a></li>
          </ul>
        </div>
        <div class="card-toolbar align-self-end no-border ml-0 mb-n15">
          <a data-action="reload" class="card-toolbar-btn mx-1 mb-1" href="#">
            <i class="ace-icon text-primary far text-90 fa-sync-alt"></i>
          </a>
        </div>
      </div>
      <div class="card-body p-0 scroll-content" style="height: 275px;">
        <div class="tab-content border-0 card-inner p-0">
          <div id="order_data" class="tab-pane active">${opsOrderRows()}</div>
          <div id="cust_data" class="tab-pane"></div>
          <div id="quote_data" class="tab-pane"></div>
        </div>
      </div>
    </div>
  `;
}

function opsSalesStatsCard() {
  const stats = [["Today", "$0.00", "(0 Orders)"], ["Yesterday", "$519.33", "(1 Orders)"], ["This Week", "$83,144.93", "(21 Orders)"], ["Last Week", "$13,275.50", "(14 Orders)"], ["This Month", "$79,439.62", "(13 Orders)"], ["Last Month", "$87,449.45", "(64 Orders)"], ["This Year", "$720,430.63", "(421 Orders)"], ["Last Year", "$987,449.45", "(664 Orders)"]];
  return opsCard("sales_stat", "Sales Statistics", "far fa-dollar-sign text-warning", `
    <div class="scroll-content" style="height:275px;">
      <div class="row mx-0 ops-sales-stat">
        ${stats.map(stat => `
          <div class="col-6 py-2">
            <a href="#">${h(stat[0])}</a><br>
            <span>${h(stat[1])}</span><br>
            <small>${h(stat[2])}</small>
          </div>
        `).join("")}
      </div>
    </div>
  `, "", { bodyId: "sales_stat_body" });
}

function opsSalesChartCard() {
  return opsCard("sales_order", "Sales Orders <small>(Last 12 months)</small>", "far fa-chart-line text-danger", `
    <div id="sales_graph" class="ord_grph p-3 ops-chart-wrap">
      ${opsChartSvg()}
    </div>
  `, `<span class="mr-2 text-90">This Month :</span><input id="showHideCurrentMonth" class="ace-switch ace-switch-yesno bgc-secondary-d1" type="checkbox">`, {
    viewAll: false,
    bodyClass: "card-body p-0 scroll-content collapse show overflow-auto",
    bodyStyle: "height: 275px;",
    toolbar: `
          <div class="card-toolbar align-self-center ml-2">
            <a data-action="toggle" href="#" class="card-toolbar-btn mx-1"><i class="fa fa-chevron-up text-primary"></i></a>
          </div>`
  });
}

function opsChartSvg() {
  const amount = [78, 38, 48, 51, 66, 60, 29, 69, 91, 73, 61, 42, 39];
  const count = [64, 51, 67, 67, 58, 42, 53, 71, 76, 69, 67, 47, 18];
  const amountLabels = ["200623.15", "66131.79", "98858.76", "105663.58", "149163.11", "133490.53", "53183.11", "158142.54", "222032.74", "166490.26", "128324.72", "87449.45", "79439.62"];
  const point = (v, i, scale) => `${38 + i * 44},${220 - v * scale}`;
  return `
    <svg class="ops-chart" viewBox="0 0 640 285" preserveAspectRatio="none" role="img" aria-label="Sales Orders chart">
      <rect x="25" y="10" width="585" height="235" fill="#f7f7f7" stroke="#9c9c9c"/>
      ${Array.from({ length: 13 }, (_, i) => `<line x1="${38 + i * 44}" y1="10" x2="${38 + i * 44}" y2="245" stroke="#ccc"/>`).join("")}
      ${Array.from({ length: 7 }, (_, i) => `<line x1="25" y1="${25 + i * 34}" x2="610" y2="${25 + i * 34}" stroke="#ccc"/>`).join("")}
      <polyline points="${amount.map((v, i) => point(v, i, 2.25)).join(" ")}" fill="none" stroke="#de3d3d" stroke-width="3"/>
      <polyline points="${count.map((v, i) => point(v, i, 1.9)).join(" ")}" fill="none" stroke="#ffb43b" stroke-width="3"/>
      ${amount.map((v, i) => `<circle cx="${38 + i * 44}" cy="${220 - v * 2.25}" r="5" fill="#de3d3d"/><text x="${25 + i * 44}" y="${210 - v * 2.25}" class="ops-chart-label blue">${h(amountLabels[i])}</text>`).join("")}
      ${count.map((v, i) => `<circle cx="${38 + i * 44}" cy="${220 - v * 1.9}" r="5" fill="#ffb43b"/><text x="${32 + i * 44}" y="${208 - v * 1.9}" class="ops-chart-label green">${[96,82,104,104,87,59,80,111,117,107,104,64,13][i]}</text>`).join("")}
      <rect x="525" y="28" width="12" height="12" fill="#de3d3d"/><text x="542" y="39" class="ops-chart-legend">Total Amount</text>
      <rect x="525" y="47" width="12" height="12" fill="#ffb43b"/><text x="542" y="58" class="ops-chart-legend">Orders</text>
    </svg>
  `;
}

function opsJobBoardCard(productWise) {
  const rows = productWise
    ? [["Watch list", "badge-purple", ["2664", "2570", "2215"]], ["Awaiting Artwork", "badge-secondary", ["3052-9587", "3052-9586", "3051-9585", "3051-9584", "3050-9581", "3050-9580", "3049-9575", "3049-9574", "3048-9563", "3048-9562", "3044-9540", "3039-9515"]]]
    : [["Watch list", "badge-purple", ["2664", "2570", "2215"]], ["New Order", "badge-primary", ["3052", "3051", "3050", "3049", "3048", "3044", "3043", "3042", "3040", "3039", "3001", "2979"]], ["Order Review", "badge-danger", ["3030", "2978"]], ["In Production", "badge-success", ["3047", "3046", "3045", "3041", "3035", "3034", "3029", "3022", "3021", "2998"]], ["Ready for Fulfillment", "badge-primary", ["3023", "3017"]]];
  return opsCard(productWise ? "order_product_status" : "order_status", `Job Board - Summary [${productWise ? "Order Product" : "Order"} Wise]`, "fal fa-copy text-warning", `
    <div id="${productWise ? "job_board_product" : "job_board"}" class="ops-job-board">
      ${rows.map(row => `
        <div class="d-flex align-items-center border-bottom brc-default-l2 py-2">
          <div class="ops-board-label text-right pr-3"><span class="badge ${row[1]} radius-1">${h(row[0])}</span></div>
          <div class="ops-board-chips flex-grow-1">${row[2].map((chip, index) => `<span class="badge label-white radius-1 ${index > row[2].length - 3 ? "border-danger text-danger" : "border-primary text-primary"}">${h(chip)}</span>`).join("")}</div>
        </div>
      `).join("")}
      ${productWise ? "" : `<div class="text-right pt-2 pr-2 ops-board-legend"><span class="legend-square overdue"></span> Overdue <span class="legend-square today"></span> Delivery Today <span class="legend-square tomorrow"></span> Delivery Tomorrow</div>`}
    </div>
  `, "", { bodyId: productWise ? "order_product_status_body" : "order_status_body", bodyClass: "card-body p-0 scroll-content", bodyStyle: "height: 275px;" });
}

function oldDashboardMarkup() {
  return `
    <section class="dashboard">
      <div class="tiles">
        ${tile("Orders", "shopping-cart", "blue")}
        ${tile("Quotes", "file-alt", "green")}
        ${tile("Customers", "user", "brown")}
        ${tile("Products", "tags", "orange")}
        ${tile("Templates", "columns", "cyan")}
        ${tile("Site Settings", "cog", "slate")}
        ${tile("Studio Settings", "cogs", "pink")}
        ${tile("Stores", "store", "purple")}
      </div>
      <div class="grid two">
        ${panel("Recent Orders", searchHead("Order No.") + orderRows())}
        ${panel("Job Board - Summary [Order Wise]", jobBoard(false))}
      </div>
      <div class="grid three">
        ${panel("Recent", recentTabs())}
        ${panel("Sales Statistics", salesStats())}
        ${panel("Sales Orders <small>(Last 12 months)</small>", chart())}
      </div>
      <div class="grid two">
        ${panel("Recent Quotes", searchHead("Recent Quotes") + quoteRows())}
        ${panel("Job Board - Summary [Order Product Wise]", jobBoard(true))}
      </div>
    </section>
  `;
}

function tile(label, ico, tone) {
  const targets = {
    Orders: "orders",
    Quotes: "quotes",
    Customers: "customers",
    Products: OPS.mode === "proposed" ? "product-catalog" : "print-products",
    Templates: "templates",
    "Site Settings": "site-settings",
    "Studio Settings": "studio-settings",
    Stores: "stores",
  };
  return `<button class="tile ${tone}" data-page="${targets[label] || "dashboard"}"><span class="fa fa-${ico}"></span><span>${label}</span></button>`;
}

function panel(title, body) {
  return `<section class="panel"><header><h2>${title}</h2><div><a>View All</a><button class="fa fa-sync-alt"></button></div></header><div class="panel-body">${body}</div></section>`;
}

function searchHead(ph) {
  return `<div class="mini-search"><input placeholder="${h(ph)}"><button class="fa fa-search"></button></div>`;
}

function orderRows() {
  return `<div class="order-table">${orders.map(order => `
    <div class="order-row">
      <div class="order-num"><a>${order[0]}</a><span>${order[1]}</span></div>
      <div class="money"><b>${order[2]}</b><strong>${order[3]}</strong><small>${order[4]}</small></div>
      <div><a>${order[5]}</a><small>${order[6]}</small></div>
      <ul>${order[7].map(p => `<li>${h(p)}</li>`).join("")}</ul>
    </div>`).join("")}</div>`;
}

function quoteRows() {
  return `<div class="order-table quote-table">${quotes.map(q => `
    <div class="order-row">
      <div class="order-num"><a>${q[0]}</a><span class="${q[1] === "Draft" ? "draft" : ""}">${q[1]}</span></div>
      <div><b>${q[2]}</b><small>${q[3]}</small></div>
      <div><a>${q[4]}</a><small>${q[5]}</small></div>
      <ul>${q[6].map(p => `<li>${h(p)}</li>`).join("")}</ul>
    </div>`).join("")}</div>`;
}

function jobBoard(productWise) {
  const rows = productWise
    ? [["Watch list", ["2664", "2570", "2215"]], ["Awaiting Artwork", ["3052-9587", "3052-9586", "3051-9585", "3051-9584", "3050-9581", "3049-9576", "3048-9563", "3048-9572", "3044-9540", "3039-9515"]]]
    : [["Watch list", ["2664", "2570", "2215"]], ["New Order", ["3052", "3051", "3050", "3049", "3048", "3044", "3043", "3042", "3040", "3039", "3001", "2979"]], ["Order Review", ["3030", "2978"]], ["In Production", ["3047", "3046", "3045", "3041", "3035", "3034", "3029", "3022", "3021", "2998"]], ["Ready for Fulfillment", ["3023", "3017"]]];
  return `<div class="board">${rows.map(row => `<div class="board-row"><span>${row[0]}</span><div>${row[1].map((chip, i) => `<button class="${i > row[1].length - 3 ? "late" : ""}">${chip}</button>`).join("")}</div></div>`).join("")}</div><div class="legend"><span class="red-dot"></span>Overdue <span class="gold-dot"></span>Delivery Today <span class="yellow-dot"></span>Delivery Tomorrow</div>`;
}

function recentTabs() {
  return `<div class="tabs"><button type="button" class="active">Orders</button><button type="button" class="tab-btn">Customers</button><button type="button" class="tab-btn">Quotes</button></div>${orderRows()}`;
}

function salesStats() {
  return `<div class="stats">
    ${[["Today", "$519.33", "(1 Orders)"], ["Yesterday", "$75,244.30", "(7 Orders)"], ["This Week", "$83,144.93", "(21 Orders)"], ["Last Week", "$13,275.50", "(14 Orders)"], ["This Month", "$79,439.62", "(13 Orders)"], ["Last Month", "$87,449.45", "(64 Orders)"]].map(s => `<div><a>${s[0]}</a><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join("")}
  </div>`;
}

function chart() {
  const vals = [70, 25, 42, 47, 59, 53, 18, 63, 89, 66, 51, 35, 31];
  const counts = [61, 48, 66, 66, 53, 34, 44, 72, 76, 70, 66, 39, 8];
  return `<div class="chart">${vals.map((v, i) => `<span class="bar amount" style="--x:${i};--y:${v}">${["200623.15","66131.79","98858.76","105663.58","149163.11","133490.53","53183.11","158142.54","222032.74","166490.26","128324.72","87449.45","78920.29"][i]}</span>`).join("")}${counts.map((v, i) => `<span class="bar count" style="--x:${i};--y:${v}">${[96,82,104,104,87,59,80,111,117,107,104,64,12][i]}</span>`).join("")}<svg viewBox="0 0 620 250" preserveAspectRatio="none"><polyline points="${vals.map((v,i)=>`${30+i*47},${220-v*2}`).join(" ")}"/><polyline class="orders-line" points="${counts.map((v,i)=>`${30+i*47},${220-v*1.4}`).join(" ")}"/></svg><div class="chart-legend"><b></b>Total Amount <i></i>Orders</div></div>`;
}

function ordersPage() {
  const proposed = OPS.mode === "proposed";
  const title = proposed ? pageTitle() : pageTitle() || "List Orders";
  const fast = proposed ? proposedFilterTabs(["All Orders", "Open", "Fulfilled & Unpaid", "Closed & Archived"]) : "";
  const headers = ["Sr#", "Order Details", "Customer", "Products", ...(proposed ? ["Invoice", "Payment", "Archive"] : []), "Status", "Action"];
  const orderStates = [
    { status: "Open", invoice: "Pending", payment: "Open", archive: "No", toggle: "on" },
    { status: "Fulfilled & Unpaid", invoice: "Invoice Ready", payment: "Unpaid", archive: "No", toggle: "on" },
    { status: "Closed & Archived", invoice: "Paid", payment: "Paid", archive: "Archived", toggle: "off" },
    { status: "Closed & Archived", invoice: "Cancelled", payment: "Cancelled", archive: "Archived", toggle: "off" },
  ];
  const rows = orders.map((o, index) => {
    const state = orderStates[index % orderStates.length];
    return [
    `<a>${o[0]}</a>`,
    `<b>${o[1]}</b><br>${o[3]}<br><small>${o[4]}</small>`,
    `<a>${o[5]}</a><br><small>${o[6]}</small>`,
    o[7].join("<br>"),
    ...(proposed ? [
      `<span class="badge ${state.invoice === "Paid" ? "success" : "muted"}">${h(state.invoice)}</span>`,
      `<span class="badge ${state.payment === "Unpaid" ? "warn" : "muted"}">${h(state.payment)}</span>`,
      `<span class="badge muted">${h(state.archive)}</span>`,
    ] : []),
    proposed ? `<span class="badge ${state.status === "Open" ? "success" : "muted"}">${h(state.status)}</span>` : `<span class="toggle ${o[0] === "3052" ? "on" : "off"}"></span>`,
    actionButton("Action"),
  ];
  });
  return `<section class="page">${pageHead(title, proposed ? ["Add New Order", "Saved Views", "Job Board"] : ["Payment Request", "Job Board", "Order Shipment"])}${fast}${filters(proposed ? ["Search:", "Company Name", "Store", "Order Group", "Product Status", "Date From", "Date To"] : ["Search:", "Company Name", "Order Date", "From", "To", "13 Selected"])}${dataTable(headers, rows, "ops-orders-table")}${proposed ? changeNote("Orders remains one list. The quick filters group orders by workflow state: open work, fulfilled but still unpaid work, and closed or archived work where the order is fulfilled and paid or cancelled.") : originalNote("Original Orders splits List Orders, Payment Request, Unpaid Orders, Archive Orders, Export/API Orders, and status utilities across separate menu entries.")}</section>`;
}

function quotesPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add New Quote", "Quote Status"])}${filters(["Search", "Quote Status", "Customer", "Date"])}${dataTable(["Sr#", "Quote Details", "Customer", "Products", "Status", "Action"], quotes.map(q => [
    `<a>${q[0]}</a>`,
    `${q[2]}<br><small>${q[3]}</small>`,
    `<a>${q[4]}</a><br><small>${q[5]}</small>`,
    q[6].join("<br>"),
    `<span class="badge">${q[1]}</span>`,
    actionButton("Action"),
  ]), "ops-quotes-table")}${OPS.mode === "proposed" ? changeNote("Quotes is reserved for customer quote workflows. Vendor quotes move to Vendors & Partners.") : originalNote("Original Quote Management mixes customer quotes with printer/vendor quote screens.")}</section>`;
}

function productPage() {
  if (OPS.mode === "proposed" && OPS.page === "product-catalog") return proposedProductCatalogPage();
  if (OPS.mode === "proposed" && OPS.page === "markup-master") return markupMasterPage();
  if (OPS.page === "product-category-edit" || OPS.page === "category-group-edit") return productCategoryEditPage();
  if (OPS.page === "product-categories" || OPS.page === "category-groups") return productCategoriesPage();
  if (["product-weight", "production-days", "products-sku", "stock-settings", "manage-stock"].includes(OPS.page) || (OPS.mode === "proposed" && OPS.page === "product-tax")) return stockSettingsPage();
  if (OPS.page === "product-options") return productOptionsPage();
  if (OPS.page === "product-tax") return productTaxPage();
  if (OPS.page.startsWith("product-price")) return productPricingPage();
  const proposed = OPS.mode === "proposed";
  const actions = proposed ? ["Add Print Product", "Add Ready To Buy", "Add Kit Product", "Add Related Product"] : ["Add", "Import Products", "Related Product", "Manage Stock", "Publish"];
  const headers = ["Sr#", "Images", "Product Details", ...(proposed ? ["Product Type", "System Tags"] : []), "Configuration", "Sort", "Status", "Action"];
  const catalogProducts = proposed
    ? products.concat([
      ["125", "H-Stakes 10\" x 30\"", "Hardware<br>Size : 10\" x 30\"", "Available To : All Store", "Range Based With Multiplication", "On", "Ready To Buy"],
      ["134", "Removal - Labor (Hourly)", "Labor Services", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
      ["214", "Creative Design Services (Hourly)", "Design", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
      ["216", "Installation - Labor (Hourly)", "Labor Services", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
      ["218", "Signicade Deluxe", "Hardware<br>Size : White, Black", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
      ["282", "Retractable Banner Stand", "Hardware<br>Size : 33\" Single Sided - Stand...", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
    ])
    : products;
  const rows = catalogProducts.map(p => [
    `<a>${p[0]}</a>`,
    `<div class="thumb"></div>`,
    `<a>${p[1]}</a><br><small>${p[2]}</small>`,
    ...(proposed ? [
      `<span class="badge muted">${h(p[6] || "Print Product")}</span>`,
      `<span class="pill">Fixed System</span><span class="pill">Store Scope</span>`,
    ] : []),
    `${p[3]}<br>Price Category : ${p[4]}`,
    "0",
    `<span class="toggle ${p[5] === "On" ? "on" : "off"}"></span>`,
    actionButton("Action"),
  ]);
  return `<section class="page">${pageHead(proposed && OPS.page === "product-catalog" ? "Product Catalog" : pageTitle(), actions)}${proposed ? fastFilters(["Print Products", "Ready To Buy", "Kit Product", "Related Product", "Stock Enabled", "Store Scope", "Status"]) : ""}${filters(["Search", "Product Category", "Select Store", "Price Category"])}${dataTable(headers, rows, "ops-products-table")}${proposed ? changeNote("Print Products and Ready To Buy Products are represented as one catalog list with product type and fixed system tags. Focused edit pages stay intact.") : originalNote("Original Products separates Print Products and Ready To Buy Products into different lists, with related tools scattered below the menu.")}</section>`;
}

function proposedProductCatalogPage() {
  const extracted = extractedPageFor("print-products");
  if (!extracted?.bodyHtml) return proposedProductCatalogFallbackPage();
  const doc = new DOMParser().parseFromString(`<div class="ops-extracted-page ops-proposed-page ops-proposed-product-catalog">${extracted.bodyHtml}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  const heading = root.querySelector(".page-header h1, .page-head h1, h1");
  if (heading) heading.textContent = "Product Catalog";
  const actionArea = root.querySelector(".page-header .action_area, .page-head .action_area, .action_area");
  if (actionArea) {
    actionArea.innerHTML = `
      <a href="#" class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add Print Product</a>
      <a href="#" class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add Ready To Buy</a>
      <a href="#" class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add Kit Product</a>
      <a href="#" class="btn btn-secondary btn-sm rounded"><i class="fa fa-link pr-1"></i> Add Related Product</a>
      <a href="#" class="btn btn-secondary btn-sm rounded"><i class="fa fa-upload pr-1"></i> Import Products</a>
      <a href="#" class="btn btn-secondary btn-sm rounded"><i class="fa fa-boxes pr-1"></i> Manage Stock</a>
      <a href="#" class="btn btn-success btn-sm rounded"><i class="fa fa-search pr-1"></i> Publish</a>`;
  }
  const filterTabs = proposedFilterTabs(["All Products", "Print Products", "Ready To Buy", "Kit Product", "Related Product", "Stock Enabled"]);
  const table = root.querySelector("table");
  const tableBlock = table?.closest(".table-responsive, .dataTables_wrapper, .card, .row") || table;
  if (tableBlock) {
    tableBlock.insertAdjacentHTML("beforebegin", `${filterTabs}${proposalCallout("Product Catalog is one list across all product types. These controls are quick filters, not separate lists: Print Products, Ready To Buy, Kit Product, Related Product, stock-enabled products, store scope, and status all stay visible as table context.")}`);
  } else if (heading) {
    heading.closest(".page-header, .page-head")?.insertAdjacentHTML("afterend", `${filterTabs}${proposalCallout("Product Catalog is one list across all product types. These controls are quick filters, not separate lists: Print Products, Ready To Buy, Kit Product, Related Product, stock-enabled products, store scope, and status all stay visible as table context.")}`);
  }
  const tableBody = root.querySelector("table tbody");
  if (tableBody) {
    tableBody.insertAdjacentHTML("beforeend", proposedCatalogRowsHtml());
  }
  return root.outerHTML;
}

function proposedProductCatalogFallbackPage() {
  const actions = ["Add Print Product", "Add Ready To Buy", "Add Kit Product", "Add Related Product"];
  const headers = ["Sr#", "Images", "Product Details", "Product Type", "System Tags", "Configuration", "Sort", "Status", "Action"];
  const catalogProducts = products.concat([
    ["125", "H-Stakes 10\" x 30\"", "Hardware<br>Size : 10\" x 30\"", "Available To : All Store", "Range Based With Multiplication", "On", "Ready To Buy"],
    ["134", "Removal - Labor (Hourly)", "Labor Services", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
    ["214", "Creative Design Services (Hourly)", "Design", "Available To : All Store", "Range Based With Multiplication", "Off", "Ready To Buy"],
  ]);
  const rows = catalogProducts.map(p => [
    `<a>${p[0]}</a>`,
    `<div class="thumb"></div>`,
    `<a>${p[1]}</a><br><small>${p[2]}</small>`,
    `<span class="badge muted">${h(p[6] || "Print Product")}</span>`,
    `<span class="pill">Fixed System</span><span class="pill">Store Scope</span>`,
    `${p[3]}<br>Price Category : ${p[4]}`,
    "0",
    `<span class="toggle ${p[5] === "On" ? "on" : "off"}"></span>`,
    actionButton("Action"),
  ]);
  return `<section class="page">${pageHead("Product Catalog", actions)}${proposedFilterTabs(["All Products", "Print Products", "Ready To Buy", "Kit Product", "Related Product", "Stock Enabled"])}${filters(["Search", "Product Category", "Select Store", "Price Category"])}${proposalCallout("Product Catalog is one list across all product types. These controls are quick filters, not separate lists: Print Products, Ready To Buy, Kit Product, Related Product, stock-enabled products, store scope, and status all stay visible as table context.")}${dataTable(headers, rows, "ops-products-table")}</section>`;
}

function productOptionsPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add Product Option", "Import", "Export"])}${filters(["Search", "Option Type", "Status"])}${dataTable(["Sr#", "Product Option", "Display Type", "Values", "Required", "Status", "Action"], [
    ["1", "Size", "Dropdown", "Small, Medium, Large, Custom Size", "Yes", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["2", "Material", "Dropdown", "PolyBoard, Vinyl, Coroplast", "Yes", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["3", "Finishing", "Checkbox", "Grommets, Lamination, Rounded Corners", "No", "<span class=\"toggle on\"></span>", actionButton("Action")],
  ])}${OPS.mode === "proposed" ? changeNote("Product Options remains a Product Catalog subpage. It is not the product list, category list, or stock page.") : originalNote("Original Product Options is a distinct Products menu page.")}</section>`;
}

function productTaxPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add Tax/VAT Rule", "Save", "Reset"])}${filters(["Search", "Tax Type", "Store", "Status"])}${dataTable(["Sr#", "Rule Name", "Applies To", "Rate", "Store Scope", "Status", "Action"], [
    ["1", "Arizona Retail Tax", "Products", "8.60%", "All Stores", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["2", "Tax Exempt Products", "Selected Categories", "0.00%", "B2B Stores", "<span class=\"toggle on\"></span>", actionButton("Action")],
  ])}${routeNote()}</section>`;
}

function productPricingPage() {
  const proposed = OPS.mode === "proposed";
  const tabs = tabStrip([
    { label: "Product Price", page: "product-price" },
    { label: "Bulk Price", page: "product-price-bulk" },
    { label: "Option Price", page: "product-option-price-bulk" },
    { label: "Excel Import", page: "product-price-excel" },
    { label: "Percentage (+/-)", page: "product-price-percent" },
  ]);
  return `<section class="page">${pageHead(proposed ? "Pricing" : pageTitle(), ["Save", "Import", "Export"])}${tabs}${filters(["Search", "Product", "Price Category", "Store"])}${dataTable(["Sr#", "Product", "Price Category", "Pricing Mode", "Base Price", "Status", "Action"], [
    ["1", "NOW HIRING DECAL", "Fixed Quantity & Price", "Fixed", "$25.00", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["2", "T-Shirt OPS", "Range Based With Multiplication", "Range", "$12.00", "<span class=\"toggle off\"></span>", actionButton("Action")],
    ["3", "DTF Prints", "Size based Price", "Dynamic Size", "$0.00", "<span class=\"toggle off\"></span>", actionButton("Action")],
  ])}${proposed ? changeNote("Pricing is a Product Catalog subpage that groups the existing Product Price tabs under one label.") : originalNote("Original Product Price exposes Product Price, Bulk, Option Bulk, Excel, and Percentage as nested links.")}</section>`;
}

function productCategoriesPage() {
  const groupView = OPS.page === "category-groups";
  const categoryImageName = title => title
    .toLowerCase()
    .replace(/\[[^\]]*\]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  const categoryImageSrc = row => {
    if (!row.img) return "";
    const clean = row.img.split("?")[0];
    const ext = (clean.match(/\.(png|jpe?g|webp)$/i)?.[1] || "jpg").toLowerCase().replace("jpeg", "jpg");
    return `./assets/product-category-images/${categoryImageName(row.title)}.${ext}`;
  };
  const categoryRows = [
    { sr: 1, title: "All [ featured ]", group: "Featured", sort: "-10", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Decals-General-Performance_1_1752668747185__1___1__jpg_1769184948518.jpg" },
    { sr: 2, title: "Yellowstone Landscape", group: "Custom", sort: "-1" },
    { sr: 3, title: "Vehicle Kits", group: "Custom", sort: "-1" },
    { sr: 4, title: "Vehicle Kit Parts", group: "Custom", sort: "-1" },
    { sr: 5, title: "ER2", group: "Custom", sort: "-1", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/2022_ER2_LOGO_1711890989288.png" },
    { sr: 6, title: "RCS", group: "Custom", sort: "-1" },
    { sr: 7, title: "Town of Queen Creek", group: "Custom", sort: "-1", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/12in_-_TOQC_Logo_1718972917609.jpg" },
    { sr: 8, title: "PAI Products", group: "Custom", sort: "-1" },
    { sr: 9, title: "Visual Graphx", group: "Custom", sort: "-1" },
    { sr: 10, title: "Silent-Aire", group: "Custom", sort: "-1" },
    { sr: 11, title: "IT Printing", group: "Custom", sort: "-1" },
    { sr: 12, title: "SRS", group: "Custom", sort: "-1", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Oval_SRS_Regulator_Decal_-_2_5x1_25_1752854901176.png" },
    { sr: 13, title: "Decals", group: "Decals", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Decals_1756197957902.jpg" },
    { sr: 14, title: "Architectural Signage", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Architectural-Signage_1754564415171.jpg" },
    { sr: 15, title: "Commercial Advertising", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Commercial-Advertising_1756197807588.jpg" },
    { sr: 16, title: "Construction & Industrial", group: "by-industry", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Construction-_-Industrial_1756197835124.jpg" },
    { sr: 17, title: "Job Site & Safety Signage", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Group_1000006313_1751367898881_jpg_1769184465704.jpg" },
    { sr: 18, title: "Corporate & Office Branding", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Corporate___Office_Branding_1756197861376.jpg" },
    { sr: 19, title: "Custom Graphics", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Custom_Graphics_1756197922266.jpg" },
    { sr: 20, title: "Education & Schools", group: "by-industry", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Education___Schools_1756198011592.jpg" },
    { sr: 21, title: "Event Signage [ Event Signage ]", group: "by-industry", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Events_1754481837770.jpg" },
    { sr: 22, title: "Fleet Graphics", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Fleet-Graphics_1756964232490.jpg" },
    { sr: 23, title: "Small Business Advertising [ Small Business Advertising ]", group: "by-industry", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Banner-Stand-Film_1_1752665660199_jpg_1769184753950.jpg" },
    { sr: 24, title: "Signs & Graphics", group: "by-use-case", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Decals-Floor-_Heavy-Duty__1_1752668642343_jpg_1769184633589.jpg" },
    { sr: 25, title: "Healthcare & Public Services [ Healthcare & Public Services ]", group: "by-industry", sort: "0", img: "https://ctmediaimg.s3.us-west-1.amazonaws.com/ctmediaon/images/product/Healthcare-_-Public-Services_1756198166879.jpg" },
  ];
  const groupRows = [
    { sr: 1, title: "Featured", key: "featured", sort: "-10" },
    { sr: 2, title: "Custom", key: "custom", sort: "-2" },
    { sr: 3, title: "Decals / Stickers [ Decals ]", key: "decals", sort: "3" },
    { sr: 4, title: "Wraps", key: "wraps", sort: "4" },
    { sr: 5, title: "Banners", key: "banners", sort: "5" },
    { sr: 6, title: "Roll Stock", key: "roll-stock", sort: "20" },
    { sr: 7, title: "Rigid Stock", key: "rigid-stock", sort: "21" },
    { sr: 8, title: "Services", key: "services", sort: "23" },
    { sr: 9, title: "Hardware & Frames", key: "hardware", sort: "24" },
    { sr: 10, title: "By Finish & Specialty [ by-finish ]", key: "by-finish", sort: "4030" },
    { sr: 11, title: "Shop by Audience [ by-audience ]", key: "by-audience", sort: "4040" },
    { sr: 12, title: "Industries [ by-industry ]", key: "by-industry", sort: "9999" },
    { sr: 13, title: "Use Cases [ by-use-case ]", key: "by-use-case", sort: "9999" },
    { sr: 14, title: "By Brand [ by-brand ]", key: "by-brand", sort: "9999" },
  ];
  const noImage = `<div style="height: 100px; width: 100px;" class="badge badge-white noimage"><div class="fa-stack fa-3x"><i class="fa fa-camera-retro fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x"></i></div></div>`;
  const thumb = row => row.img
    ? `<a data-page-label="" data-fancybox class="thumbnail" data-src="${h(categoryImageSrc(row))}"><img alt="" src="${h(categoryImageSrc(row))}" class="img-fluid"><div class="zoom"><i class="fa fa-search"></i></div></a><div class="fancydetails d-none">${h(row.title)}</div>`
    : noImage;
  const status = `<input type="checkbox" name="status" id="status" checked="checked" value="1" class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-success text-danger change_status"><span class="d-none">1</span>`;
  const editPage = groupView ? "category-group-edit" : "product-category-edit";
  const actions = id => `<div class="btn-group col-btn-actions inline-action-btn"><a href="#${OPS.mode}/${editPage}" data-page="${editPage}" data-original-title="Edit" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-pencil icon-on-left btn btn-outline-lightgrey btn-sm mr-15 p-2"></i></a><a href="#${OPS.mode}/${OPS.page}" data-original-title="Delete" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-trash-alt btn-lighter-danger btn btn-sm mr-15 icon-on-left p-2"></i></a></div>`;
  const optimize = row => `<a data-original-title="Optimize Image" data-toggle="tooltip" data-placement="bottom" class="btn btn-link btn-sm float-right pl-1 py-0 optimize_image" data-category_id="${h(row.sr)}"><i class="fa fa-rocket text-120"></i></a>`;
  const categoryBody = categoryRows.map(row => `<tr id="category_id:${h(row.sr)}" class="odd">
    <td class="text-center">${h(row.sr)}</td>
    <td class="width-10 no-print">${thumb(row)}</td>
    <td><a href="#${OPS.mode}/product-category-edit" data-page="product-category-edit" class="categoryTitle">${h(row.title)}</a>${optimize(row)}<br><span class="badge label-sm label-white middle mr-1 badge-grey">Add to cart</span></td>
    <td>${h(row.group)}</td>
    <td class="text-center edit_sort">${h(row.sort)}</td>
    <td class="text-center">${status}</td>
    <td class="no-print">${actions(row.sr)}</td>
  </tr>`).join("");
  const groupBody = groupRows.map(row => `<tr id="category_group_id:${h(row.sr)}" class="odd">
    <td class="text-center">${h(row.sr)}</td>
    <td><a href="#${OPS.mode}/category-group-edit" data-page="category-group-edit" class="categoryTitle">${h(row.title)}</a></td>
    <td>${h(row.key)}</td>
    <td class="text-center edit_sort">${h(row.sort)}</td>
    <td class="text-center">${status}</td>
    <td class="no-print">${actions(row.sr)}</td>
  </tr>`).join("");
  const activeCategory = groupView ? "" : "active";
  const activeGroup = groupView ? "active" : "";
  const tableHeader = groupView
    ? `<tr><th data-data="sr" data-class-name="text-center">Sr#</th><th data-data="group_name">Category Group</th><th data-data="group_key">Internal Key</th><th data-data="sort_order" data-class="text-center edit_sort">Sort</th><th data-data="status" data-type="html" data-class-name="text-center">Status</th><th data-data="Action" data-orderable="false" data-searchable="false" data-class-name="no-print">Action</th></tr>`
    : `<tr><th data-data="sr" data-class-name="text-center">Sr#</th><th data-data="category_image" data-class-name="width-10 no-print">Category Image</th><th data-data="category_name">Category Title</th><th data-data="parent_category_name">Category group</th><th data-data="sort_order" data-class="text-center edit_sort">Sort</th><th data-data="status" data-type="html" data-class-name="text-center">Status</th><th data-data="Action" data-orderable="false" data-searchable="false" data-class-name="no-print">Action</th></tr>`;
  const tableBody = groupView ? groupBody : categoryBody;
  const tableId = groupView ? "ops-table-product-category-group" : "ops-table";
  const total = groupView ? 14 : 227;
  const last = groupView ? 14 : 25;
  const pagination = groupView
    ? `<ul class="pagination"><li class="paginate_button page-item previous disabled"><a class="page-link"><i class="fa fa-angle-left"></i></a></li><li class="paginate_button page-item active"><a class="page-link">1</a></li><li class="paginate_button page-item next disabled"><a class="page-link"><i class="fa fa-angle-right"></i></a></li></ul>`
    : `<ul class="pagination"><li class="paginate_button page-item previous disabled"><a class="page-link"><i class="fa fa-angle-left"></i></a></li><li class="paginate_button page-item active"><a class="page-link">1</a></li><li class="paginate_button page-item"><a class="page-link">2</a></li><li class="paginate_button page-item"><a class="page-link">3</a></li><li class="paginate_button page-item"><a class="page-link">4</a></li><li class="paginate_button page-item"><a class="page-link">5</a></li><li class="paginate_button page-item disabled"><a class="page-link">...</a></li><li class="paginate_button page-item"><a class="page-link">10</a></li><li class="paginate_button page-item next"><a class="page-link"><i class="fa fa-angle-right"></i></a></li></ul>`;
  return `<section class="page ops-product-category-page">
    <div class="row" id="product_category_listing_content">
      <div class="col-12">
        <div class="page-header">
          <h1>Product Categories</h1>
          <div class="float-right action_area">
            <a href="#${OPS.mode}/product-category-edit" data-page="product-category-edit" class="btn btn-success btn-sm btn-sm ml-1 rounded"><i class="fa fa-plus-circle pr-1"></i> Add Product Category</a><a href="#${OPS.mode}/category-group-edit" data-page="category-group-edit" class="btn btn-success btn-sm btn-sm ml-1 rounded"><i class="fa fa-plus-circle pr-1"></i> Add Category Group</a>
          </div>
        </div>
        <div class="tabs-above">
          <ul id="productCategoryTab" class="nav nav-tabs">
            <li class="nav-item"><a href="#${OPS.mode}/product-categories" data-page="product-categories" class="nav-link ${activeCategory}">Product Category</a></li>
            <li class="nav-item"><a href="#${OPS.mode}/category-groups" data-page="category-groups" class="nav-link ${activeGroup}">Category group</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade active show" id="${groupView ? "productCategoryGroup" : "productCategory"}">
              <div id="${tableId}_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer ops-static-datatable">
                <div class="row align-items-center mb-2">
                  <div class="col-sm-6">
                    <div id="${tableId}_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="${tableId}"></label></div>
                  </div>
                  <div class="col-sm-6 text-right"><button class="btn btn-outline-lightgrey btn-sm p-2 no-print" title="Print"><i class="fa fa-print"></i></button></div>
                </div>
                <table id="${tableId}" class="table table-striped table-bordered table-hover dataTable no-footer" role="grid">
                  <thead>${tableHeader}</thead>
                  <tbody>${tableBody}</tbody>
                </table>
                <div class="row dataTables-footer align-items-center">
                  <div class="col-sm-5"><div class="dataTables_info" role="status" aria-live="polite">Showing 1 to ${last} of ${total} entries</div></div>
                  <div class="col-sm-2 text-center"><div class="dataTables_length"><label>Show <select class="custom-select custom-select-sm form-control form-control-sm"><option selected>25</option><option>50</option><option>100</option></select> records</label></div></div>
                  <div class="col-sm-5"><div class="dataTables_paginate paging_simple_numbers">${pagination}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function productCategoryEditPage() {
  const isGroup = OPS.page === "category-group-edit";
  if (isGroup) {
    return `<section class="page ops-category-edit-page">
      <div class="page-header">
        <h1>Edit Category Group <small><i class="fa fa-angle-double-right"></i> Featured</small></h1>
        <div class="float-right action_area">
          <a href="#${OPS.mode}/category-groups" data-page="category-groups" class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</a>
          <a href="#${OPS.mode}/category-groups" data-page="category-groups" class="btn btn-info btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Save &amp; Back</a>
          <a href="#${OPS.mode}/category-group-edit" class="btn btn-grey btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</a>
          <a href="#${OPS.mode}/category-groups" data-page="category-groups" class="btn btn-grey btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Back</a>
        </div>
      </div>
      <div class="card bcard">
        <div class="card-header"><h3 class="card-title"><i class="fa fa-list pr-1"></i> Category Group Details</h3><div class="card-toolbar"><a href="#" class="card-toolbar-btn"><i class="fa fa-chevron-up"></i></a></div></div>
        <div class="card-body">
          <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category Group Title</label><div class="col-sm-5"><input class="form-control form-control-sm" value="Featured"><span class="text-danger pl-1">*</span></div></div>
          <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Internal Key</label><div class="col-sm-5"><input class="form-control form-control-sm" value="featured"></div></div>
          <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Sort</label><div class="col-sm-2"><input class="form-control form-control-sm" value="-10"></div></div>
          <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Status</label><div class="col-sm-5"><input type="checkbox" checked class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-success text-danger"></div></div>
        </div>
      </div>
    </section>`;
  }
  const editor = label => `<div class="form-group row ops-editor-row">
    <label class="col-sm-3 col-form-label text-sm-right">${h(label)}</label>
    <div class="col-sm-8">
      <div class="ops-editor-toolbar">
        <i class="fa fa-expand"></i><i class="fa fa-eye"></i><i class="fa fa-cog"></i><i class="fa fa-code"></i><span></span>
        <b>B</b><i>I</i><u>U</u><i class="fa fa-list-ol"></i><i class="fa fa-list-ul"></i><i class="fa fa-link"></i><i class="fa fa-image"></i><i class="fa fa-table"></i>
      </div>
      <div class="ops-editor-box"></div>
    </div>
  </div>`;
  return `<section class="page ops-category-edit-page">
    <div class="page-header">
      <h1>Edit Product Category <small><i class="fa fa-angle-double-right"></i> All</small></h1>
      <div class="float-right action_area">
        <a href="#${OPS.mode}/product-categories" data-page="product-categories" class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</a>
        <a href="#${OPS.mode}/product-categories" data-page="product-categories" class="btn btn-info btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Save &amp; Back</a>
        <a href="#${OPS.mode}/product-category-edit" class="btn btn-grey btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</a>
        <a href="#${OPS.mode}/product-categories" data-page="product-categories" class="btn btn-grey btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Back</a>
      </div>
    </div>
    <div class="card bcard mb-3">
      <div class="card-header"><h3 class="card-title"><i class="fa fa-list pr-1"></i> Product Category Details</h3><div class="card-toolbar"><a href="#" class="card-toolbar-btn"><i class="fa fa-chevron-up"></i></a></div></div>
      <div class="card-body">
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category Title</label><div class="col-sm-5"><input class="form-control form-control-sm" value="All"><span class="text-danger pl-1">*</span></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category Internal Title</label><div class="col-sm-5"><input class="form-control form-control-sm" value="featured"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category URL</label><div class="col-sm-5"><input class="form-control form-control-sm" value="featured-products"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category group</label><div class="col-sm-4"><select class="form-control form-control-sm"><option>Featured</option><option>Custom</option><option>by-use-case</option><option>by-industry</option></select></div></div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label text-sm-right">Category Image</label>
          <div class="col-sm-3"><button class="btn btn-info btn-sm"><i class="fa fa-upload pr-1"></i>Select File</button><div class="ops-file-preview mt-2"><img src="./assets/product-category-images/all.jpg" alt=""><button class="btn btn-danger btn-xs"><i class="fa fa-times"></i></button><small>Decals-General...</small></div></div>
          <label class="col-sm-2 col-form-label text-sm-right">Category Icon</label>
          <div class="col-sm-3"><div class="ops-upload-box"><i class="fa fa-upload"></i><br>Drag a file OR <a>Upload File</a></div><small class="text-purple">Upload category header icon</small></div>
        </div>
        ${editor("Category Header Menu Content")}
        ${editor("Short Description")}
        ${editor("Long Description")}
        ${editor("Long Description 2")}
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category Badge Pattern</label><div class="col-sm-4"><select class="form-control form-control-sm"><option>Ribbon</option><option>Badge</option><option>None</option></select></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Enable promotional text on title</label><div class="col-sm-5"><input type="checkbox" class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-danger text-danger"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Category Promotional Text</label><div class="col-sm-4"><input class="form-control form-control-sm"><span class="badge badge-warning text-dark mt-1">Badge</span></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Sort</label><div class="col-sm-2"><input class="form-control form-control-sm" value="-10"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Status</label><div class="col-sm-5"><input type="checkbox" checked class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-success text-danger"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Add to cart</label><div class="col-sm-5"><input type="checkbox" class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-danger text-danger"></div></div>
      </div>
    </div>
    <div class="card bcard mb-3">
      <div class="card-header"><h3 class="card-title"><i class="fa fa-list-alt pr-1"></i> SEO content description</h3><div class="card-toolbar"><a href="#" class="card-toolbar-btn"><i class="fa fa-chevron-up"></i></a></div></div>
      <div class="card-body">
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Page Title</label><div class="col-sm-5"><input class="form-control form-control-sm" value="Top Featured Products in Arizona | Visual Graphx Graphics & Printing"></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Meta Description</label><div class="col-sm-5"><textarea class="form-control form-control-sm" rows="3">Shop Arizona's featured printing solutions from Visual Graphx. Quality decals, signage, banners, and graphics built for businesses that stand out.</textarea></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Canonical Reference</label><div class="col-sm-3"><select class="form-control form-control-sm"><option>None</option></select></div></div>
        <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Additional Schema Mark-up</label><div class="col-sm-5"><textarea class="form-control form-control-sm" rows="4"></textarea></div></div>
      </div>
    </div>
  </section>`;
}

function stockSettingsPage() {
  const proposed = OPS.mode === "proposed";
  const active = OPS.page === "production-days"
    ? "Production Days"
    : OPS.page === "products-sku"
      ? "Products SKU"
      : proposed && OPS.page === "product-tax"
        ? "Product Tax/VAT Settings"
        : proposed && (OPS.page === "stock-settings" || OPS.page === "manage-stock")
          ? "Stock"
          : "Product Weight";
  const title = proposed ? "Stock & Settings" : active;
  const tabs = [
    ["Product Weight", "product-weight", "fa fa-balance-scale"],
    ["Production Days", "production-days", "fa fa-calendar"],
    ["Products SKU", "products-sku", "fa fa-barcode"],
    ...(proposed ? [
      ["Stock", "stock-settings", "fa fa-boxes"],
      ["Product Tax/VAT Settings", "product-tax", "fa fa-percent"],
    ] : []),
  ].map(([label, page, iconClass]) => `<li class="nav-item"><a href="#${OPS.mode}/${page}" data-page="${page}" class="nav-link ${active === label ? "active" : ""}"><i class="${iconClass}"></i><br>${label}</a></li>`).join("");
  const rows = [
    ["1", "Decals", "Only Size", "Warning - KHF Inside C...  Not set<br>Exit - 37.5&quot; W x 9.5&quot; H : <span class=\"status-chip unset\">Not set</span>", "12 in stock"],
    ["2", "Ticket Number Decals", "Only Size", "2 : <span class=\"status-chip unset\">Not set</span><br>7 : <span class=\"status-chip unset\">Not set</span><br>12 : <span class=\"status-chip unset\">Not set</span>", "0 stock"],
    ["6", "H-Stakes 10\" x 30\"", "Only Size", "None : 0.050000", "31 in stock"],
    ["10", "Signicade Deluxe", "Only Size", "White : 21.000000<br>Black : 21.000000", "5 in stock"],
    ["18", "Retractable Banner Stand", "Only Size", "33&quot; Double Sided - Stan... 21.000000", "8 in stock"],
    ["21", "T-Shirt OPS", "Only Size", "T-Shirt : <span class=\"status-chip unset\">Not set</span>", "0 stock"],
    ["24", "Adhesive Products", "Only Size", "Custom Size : <span class=\"status-chip unset\">Not set</span>", "17 in stock"],
  ];
  const detailHeader = active === "Production Days" ? "Production Days" : active === "Products SKU" ? "Products SKU" : active === "Stock" ? "Current Stock" : "Product Weight";
  const detailValue = row => {
    if (active === "Production Days") return row[0] === "1" ? "3 days production, 1 day rush" : row[0] === "10" ? "5 days production" : "<span class=\"status-chip unset\">Not set</span>";
    if (active === "Products SKU") return `SKU-${String(row[0]).padStart(4, "0")}`;
    if (active === "Stock") return row[4];
    return row[3];
  };
  const isTax = active === "Product Tax/VAT Settings";
  const importLabel = isTax ? "" : active === "Stock" ? "Import Stock" : "Import Product Weight";
  const taxRows = [
    ["1", "Arizona Retail Tax", "Products", "8.60%", "All Stores", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["2", "Tax Exempt Products", "Selected Categories", "0.00%", "B2B Stores", "<span class=\"toggle on\"></span>", actionButton("Action")],
  ];
  const settingsBody = isTax
    ? `<div class="page-header sim-inner-header">
        <h2 class="sim-section-title mb-0">Product Tax/VAT Settings</h2>
        <div class="float-right action_area">
          <a href="#" class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add Tax/VAT Rule</a>
          <a href="#" class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</a>
          <a href="#" class="btn btn-light btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</a>
        </div>
      </div>
      <div class="form-inline sim-filter-row">
        <input class="form-control form-control-sm mr-1" placeholder="Search">
        <select class="form-control form-control-sm mr-1"><option>Tax Type</option></select>
        <select class="form-control form-control-sm mr-1"><option>Store</option></select>
        <select class="form-control form-control-sm mr-1"><option>Status</option></select>
        <button class="btn btn-info btn-sm"><i class="fa fa-search pr-1"></i> Search</button>
        <a href="#" class="ml-2">Reset</a>
      </div>
      ${currentOpsDataTable(["Sr#", "Rule Name", "Applies To", "Rate", "Store Scope", "Status", "Action"], taxRows, "ops-product-tax-proposed")}
      ${changeNote("Product Tax/VAT Settings is grouped into Stock & Settings instead of living as a separate Product Catalog destination.")}`
    : `<div class="alert alert-info sim-weight-help">
        <p>You can set up weight for products based on three different methods. Weight will be considered for only one method at a time.</p>
        <p>1. Only Size: Weight can be defined based on product sizes. Sizes can be managed from the Designer tab of the product configuration.</p>
        <p>2. Size with Option: Weight can be defined for each size option. In this case, weight will only be calculated based on selected options weight during checkout.</p>
        <p>3. Size with Option Combination: Weight can be defined for each size-option combination. In this case, the weight will only be calculated based on selected options combination weight during checkout.</p>
        <p class="text-danger mb-0">Weight is always defined for only 1 quantity/unit of the product.</p>
      </div>
      <div class="form-group row align-items-center sim-product-selector">
        <label class="col-auto col-form-label pr-2 mb-0">Set ${active === "Stock" ? "Stock" : active.replace("Products", "Product")} For</label>
        <div class="col-sm-2 px-0">
          <select class="form-control form-control-sm"><option>Select Product</option></select>
        </div>
      </div>
      <hr class="sim-weight-divider">
      <div class="form-inline sim-filter-row">
        <input class="form-control form-control-sm mr-1" placeholder="Search">
        <label class="mr-1 mb-0">${h(active)}</label>
        <select class="form-control form-control-sm mr-1"><option>Both</option></select>
        <button class="btn btn-info btn-sm"><i class="fa fa-search pr-1"></i> Search</button>
        <a href="#" class="ml-2">Reset</a>
      </div>
      <h2 class="sim-section-title">${h(active)} Summary</h2>
      <div class="ops-static-datatable sim-weight-table"><table class="table table-striped table-bordered table-hover dataTable no-footer"><thead><tr><th>Sr#</th><th>Product Details</th><th>Setting Type</th><th>${h(detailHeader)}</th><th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td><b>${h(r[1])}</b></td><td>${h(r[2])}</td><td>${detailValue(r)}</td><td><a class="sim-edit-action"><i class="fa fa-pencil"></i></a></td></tr>`).join("")}</tbody></table></div>`;
  return `<section class="page ops-stock-settings-page">
    <div class="row">
      <div class="col-12">
        <div class="tabs-above ops-context-tabs">
          <ul class="nav nav-tabs">${tabs}</ul>
        </div>
      </div>
    </div>
    <div class="page-header">
      <h1>${h(title)}</h1>
      <div class="float-right action_area">
        ${importLabel ? `<a href="#" class="btn btn-secondary btn-sm rounded"><i class="fa fa-upload pr-1"></i> ${h(importLabel)}</a>` : ""}
      </div>
    </div>
    ${proposed ? proposalCallout("Stock & Settings groups Product Weight, Production Days, Products SKU, Stock, and Product Tax/VAT Settings into one product-settings context. Current OPS only has Product Weight, Production Days, and Products SKU on this tab set.") : ""}
    ${settingsBody}
  </section>`;
}

function storesPage() {
  if (OPS.mode === "proposed" && OPS.page.startsWith("store-workspace")) return storeWorkspacePage();
  if (OPS.mode === "proposed" && OPS.page === "duplicate-store-data") return duplicateStorePage();
  const rows = [["1", "Demo Store", "johnDoe@graphxcpi.com"], ["2", "Konala", "rdickson@alphagraphics.com"], ["3", "Socure", "rdickson+socure@alphagraphics.com"]];
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), proposed ? ["Add", "Duplicate Store Data", "Open Store Workspace", "Store Settings Templates"] : ["Add", "Import Department", "Duplicate Store Data", "Markup Master", "Store Settings Templates"])}${filters(["Search"])}${dataTable(["Sr#", "Logo", "Store Details", "Settings", "Status", "Action"], rows.map(r => [
    r[0],
    `<div class="thumb logo"></div>`,
    `<a>${r[1]}</a><br>${r[2]}<br>Username : ${r[2]}`,
    "Department : No<br>Quick Checkout : No<br>Show Price To Customer : Yes",
    `<span class="toggle on"></span>`,
    actionButton("Action"),
  ]), "ops-stores-table")}${proposed ? changeNote("Store Management keeps the store list and store-specific assignment workflows. B2B Store Theme remains here because it is only for B2B stores.") : originalNote("Original Stores page includes broad controls like Markup Master even when the system is not store-only.")}</section>`;
}

function apiPage() {
  const proposed = OPS.mode === "proposed";
  const title = OPS.page === "api-webhooks" ? "API & Webhooks" : (OPS.page === "order-exports" ? "Order Exports" : pageTitle());
  const tabs = proposed ? tabStrip([{ label: "Order Exports", page: "order-exports" }, { label: "API & Webhooks", page: "api-webhooks" }]) : tabStrip(["Export/API Settings", "Hot Folder Settings", "Advanced API", "Webhook"]);
  const apiText = proposed ? "Global-only API credentials, webhook events, and the open question for context-aware B2C, B2B, franchise, and reseller automation." : "Current Export/API Orders lives under Orders and mixes export execution with export/API settings.";
  const body = OPS.page === "api-webhooks"
    ? `<div class="grid two"><div>${panel("API Auth Settings", formRows(["Client Id", "Client Secret", "Endpoint URL", "Max Count", "IP Addresses"]))}</div><div>${panel("Webhook Events", `<p>${apiText}</p>${dataTable(["Event", "Created", "Updated", "Deleted"], [["Orders", "Yes", "Yes", "Yes"], ["Quote", "Yes", "Yes", "Yes"], ["Customer", "Yes", "Yes", "Yes"], ["Product", "Yes", "Yes", "Yes"]])}`)}</div></div>`
    : `<div class="grid two"><div>${filters(["Order Range", "Date Range", "Order Status"])}${panel("Order Exports", "<p>Export style, file naming, hot folder, order status selection, manual transfer, and connection controls.</p>")}</div><div>${panel("Current Export Order Settings", formRows(["Export Style", "Export Format", "Export File Name Format", "Hot Folder Settings", "Folder Location", "Folder Structure"]))}</div></div>`;
  return `<section class="page">${pageHead(title, proposed ? ["Save", "Test Connection"] : ["Export", "Manual Transfer", "Export/API Settings"])}${tabs}${body}${proposed ? changeNote("Export/API Orders is removed from Orders and becomes a global Export & API section with two areas: Order Exports and API & Webhooks.") : originalNote("Original export/API controls are reached through the Orders menu.")}</section>`;
}

function siteBuilderPage() {
  const media = ["help-media", "media-gallery", "asset-manager"].includes(OPS.page);
  const title = OPS.mode === "proposed" ? pageTitle() : pageTitle();
  if (OPS.mode === "current") {
    if (OPS.page === "cms-pages") return currentCmsEditorPage();
    if (["faqs", "testimonials", "banners"].includes(OPS.page)) return currentContentListPage();
    if (["links", "sidebar-management", "sidebar-widget", "themes", "product-page-layout", "language-text"].includes(OPS.page)) return currentStorePersonalizationPage();
  }
  if (OPS.page === "page-categories") return sitePageCategoriesPage();
  if (media) return assetManagerPage();
  const proposed = OPS.mode === "proposed";
  if (proposed) {
    if (OPS.page === "links") return siteBuilderSubpage("Links & Menus", "Navigation Groups", ["Header Menu", "Footer Menu", "Account Links", "Storefront Links"], "Menus are built beside the page and store-context tools instead of buried under Store Personalization.");
    if (OPS.page === "sidebar-management" || OPS.page === "sidebar-widget") return siteBuilderSubpage(pageTitle(), "Sidebar Configuration", ["Sidebar Management", "Sidebar Widget", "Store Locked Widgets", "Display Rules"], "Sidebar tools stay under Site Builder and are also available from Store Workspace when locked to a store.");
    if (OPS.page === "themes") return siteBuilderSubpage("Themes", "Theme Configuration", ["Website Theme", "Custom CSS", "Custom JS", "Theme Assets"], "Theme tools move into Site Builder where page, menu, and asset context already lives.");
    if (OPS.page === "account-pages") return siteBuilderSubpage("Account Pages", "Account Page Controls", ["My Account Links", "Customer Dashboard", "Checkout Help", "Profile Pages"], "Account pages are Site Builder content, with store-focused overrides available in Store Workspace.");
    if (OPS.page === "product-page-layout") return siteBuilderSubpage("Product Layout Builder", "Product Layout Controls", ["Product Page Layout", "Additional Info Page", "Visual Price Calculator", "Product Showcase"], "Product layout controls remain in Site Builder while product data stays in Product Catalog.");
    if (OPS.page === "product-showcase") return siteBuilderSubpage("Product Showcase", "Showcase Settings", ["Product Showcase Settings", "Featured Products", "Store-Specific Rules"], "Product Showcase stays with Site Builder because it controls storefront presentation, not catalog data.");
    if (["site-content", "website-logos", "language-text", "banners", "form-management", "breadcrumbs", "faqs", "testimonials"].includes(OPS.page)) return siteBuilderSubpage(pageTitle(), "Content Management", ["Website Logos", "Storefront Text References", "Banners", "Forms", "Breadcrumbs", "FAQs", "Testimonials"], "Content Management keeps CMS content primitives together and links to Asset Manager / Help Media when media is needed.");
  }
  return `<section class="page">${pageHead(title, ["Add", "Save", "Preview"])}${proposed ? siteBuilderTabs() : tabStrip(["Homepage & Fixed Content", "Dynamic Pages", "Category"])}<div class="grid two"><div>${panel(pageTitle(), formRows(["Page Category", "Key", "Page Heading", "Sort", "Status"]))}</div><div>${panel(proposed ? "Context Ownership" : "SEO", proposed ? "<p>Global Site Builder owns broad site pages, menus, themes, account pages, content groups, and asset references. Store-level Site Builder locks the selected store.</p>" : formRows(["Page Title", "Meta Description", "Canonical Reference"]))}</div></div>${proposed ? changeNote("Content Management and Store Personalization are reorganized as Site Builder, with the same page primitives available globally and in store context.") : originalNote("Original CMS and Store Personalization split page, theme, menu, sidebar, and asset tools across different areas.")}</section>`;
}

function currentCmsTabs(active = "Homepage & Fixed Content") {
  return `<div class="top-tabs sim-ops-tabs">
    ${["Homepage & Fixed Content", "Dynamic Pages", "Category"].map(label => `<button type="button" class="sim-tab-btn ${label === active ? "active" : ""}"><i class="fa ${label === "Category" ? "fa-folder" : "fa-file-alt"}"></i><span>${h(label)}</span></button>`).join("")}
    <div class="select-page"><i class="fa fa-bars"></i><small>Select Page</small></div>
  </div>`;
}

function currentCmsEditorToolbar() {
  return `<div class="ops-editor-toolbar">
    <i class="fa fa-expand"></i><i class="fa fa-eye"></i><i class="fa fa-cog"></i><i class="fa fa-code"></i><i class="fa fa-undo"></i><i class="fa fa-redo"></i>
    <b>B</b><i>I</i><u>U</u><s>S</s><i class="fa fa-list-ol"></i><i class="fa fa-list-ul"></i><i class="fa fa-align-left"></i><i class="fa fa-align-center"></i><i class="fa fa-align-right"></i>
    <i class="fa fa-link"></i><i class="fa fa-file"></i><i class="fa fa-image"></i><i class="fa fa-flag"></i><i class="fa fa-table"></i>
  </div>`;
}

function currentCmsEditorRow(label, opts = {}) {
  const height = opts.height || 250;
  const upload = opts.upload ? `<div class="form-group row mt-3">
    <label class="col-sm-3 col-form-label text-sm-right">Upload File</label>
    <div class="col-sm-4"><div class="ops-upload-drop"><i class="fa fa-upload"></i><br>Drag a file OR <a>Upload File</a></div></div>
  </div>
  <div class="form-group row"><label class="col-sm-3 col-form-label text-sm-right">Upload File Alt Text</label><div class="col-sm-3"><input class="form-control form-control-sm"></div></div>` : "";
  return `<div class="form-group row ops-editor-row">
    <label class="col-sm-3 col-form-label text-sm-right">${h(label)}</label>
    <div class="col-sm-8">
      <div class="cms-paste-warning">First paste content to Notepad (or other text editor), and then copy plain text from Notepad and paste here again.</div>
      ${currentCmsEditorToolbar()}
      <div class="ops-editor-box" style="height:${height}px">${opts.preview || ""}</div>
      <div class="text-right text-muted small">Characters : ${opts.chars || 0}</div>
    </div>
  </div>${upload}`;
}

function currentOpsCard(title, body, icon = "fa-list") {
  return `<div class="card bcard">
    <div class="card-header">
      <h3 class="card-title"><i class="fa ${h(icon)} pr-1"></i> ${h(title)}</h3>
      <div class="card-toolbar"><a href="#" class="card-toolbar-btn"><i class="fa fa-chevron-up"></i></a></div>
    </div>
    <div class="card-body">${body}</div>
  </div>`;
}

function currentFormRow(label, controlHtml) {
  return `<div class="form-group row">
    <label class="col-sm-3 col-form-label text-sm-right">${h(label)}</label>
    <div class="col-sm-5">${controlHtml}</div>
  </div>`;
}

function currentTextInput(value = "") {
  return `<input class="form-control form-control-sm" value="${h(value)}">`;
}

function currentTextarea(value = "", rows = 3) {
  return `<textarea class="form-control form-control-sm" rows="${rows}">${h(value)}</textarea>`;
}

function currentSelect(values, selected) {
  return `<select class="form-control form-control-sm">${values.map(value => `<option ${value === selected ? "selected" : ""}>${h(value)}</option>`).join("")}</select>`;
}

function currentStatusToggle(on = true) {
  return `<input type="checkbox" ${on ? "checked" : ""} class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-${on ? "success" : "danger"} text-danger">`;
}

function currentCmsGeneralForm(dynamic) {
  if (dynamic) {
    return `<div class="row">
      <div class="col-lg-6">
        ${currentOpsCard("General Information", [
          currentFormRow("Page Category", currentSelect(["Select", "About", "Support"], "Select")),
          currentFormRow("Key", `${currentTextInput("about-us-new-v")}<div class="text-purple small mt-1">The Page Name (Key) will be considered to generate the page URL for the storefront.</div>`),
          currentFormRow("URL", currentTextInput("about-us-new-v")),
          currentFormRow("Page Heading", currentTextInput("")),
          currentFormRow("Full Layout", `<label class="mr-3"><input type="radio"> Default</label><label class="mr-3"><input type="radio"> Full Html With Header / Footer</label><label><input type="radio" checked> Full Html Without Header / Footer</label>`),
          currentFormRow("Blog Page", currentStatusToggle(false)),
          currentFormRow("Sort", currentTextInput("0")),
          currentFormRow("Status", currentStatusToggle(false)),
        ].join(""), "fa-cog")}
      </div>
      <div class="col-lg-6">${currentSeoCard()}</div>
    </div>`;
  }
  return currentOpsCard("General Information", [
    currentFormRow("Filter Category", `${currentSelect(["Select", "Header", "Footer"], "Select")} <button class="btn btn-info btn-sm ml-2 rounded"><i class="fa fa-plus"></i></button>`),
    currentFormRow("Key", `<span class="form-control-plaintext">cms_header</span>`),
    currentFormRow("Page Heading", currentTextInput("Header Content")),
    currentFormRow("Sort", currentTextInput("0")),
    currentFormRow("Status", currentStatusToggle(false)),
  ].join(""), "fa-cog");
}

function currentSeoCard() {
  return currentOpsCard("SEO", [
    currentFormRow("Page Title", currentTextInput("")),
    currentFormRow("Meta Description", currentTextarea("", 4)),
    currentFormRow("Canonical Reference", currentSelect(["None"], "None")),
    currentFormRow("Additional Schema Mark-up", currentTextarea("", 5)),
    currentFormRow("Additional Meta Tag", currentTextarea("", 5)),
    currentFormRow("Exclude In Sitemap", currentStatusToggle(false)),
  ].join(""), "fa-search");
}

function currentOpsDataTable(headers, rows, id = "ops-current-table") {
  return `<div id="${h(id)}_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer ops-static-datatable">
    <div class="row align-items-center mb-2">
      <div class="col-sm-6">
        <div id="${h(id)}_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="${h(id)}"></label></div>
      </div>
      <div class="col-sm-6 text-right"><button class="btn btn-outline-lightgrey btn-sm p-2 no-print" title="Print"><i class="fa fa-print"></i></button></div>
    </div>
    <table id="${h(id)}" class="table table-striped table-bordered table-hover dataTable no-footer" role="grid">
      <thead><tr>${headers.map(head => `<th>${h(head)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
    <div class="row dataTables-footer align-items-center">
      <div class="col-sm-5"><div class="dataTables_info" role="status" aria-live="polite">Showing 1 to ${rows.length} of ${rows.length} entries</div></div>
      <div class="col-sm-2 text-center"><div class="dataTables_length"><label>Show <select class="custom-select custom-select-sm form-control form-control-sm"><option selected>25</option><option>50</option></select> records</label></div></div>
      <div class="col-sm-5"><div class="dataTables_paginate paging_simple_numbers"><ul class="pagination"><li class="paginate_button page-item previous disabled"><a class="page-link"><i class="fa fa-angle-left"></i></a></li><li class="paginate_button page-item active"><a class="page-link">1</a></li><li class="paginate_button page-item next disabled"><a class="page-link"><i class="fa fa-angle-right"></i></a></li></ul></div></div>
    </div>
  </div>`;
}

function currentCmsEditorPage() {
  const dynamic = OPS.page === "dynamic-pages";
  const title = dynamic ? "about-us-new-v" : "Header Content";
  const preview = dynamic ? `<div class="cms-preview-hero">Dedicated to excellence and fueled by creativity, we provide high-quality visual solutions that elevate your brand.</div>` : `<div class="cms-logo-strip">Trusted by <b>100's</b> of companies of all sizes <span>ARCLINE</span><span>FORGE</span><span>Prism</span><span>CREST LINE</span></div><h2>Best-Selling Products</h2>`;
  return `<section class="page ops-cms-page">
    ${currentCmsTabs(dynamic ? "Dynamic Pages" : "Homepage & Fixed Content")}
    <div class="page-header">
      <h1>Edit Content <small><i class="fa fa-angle-double-right"></i> ${h(title)}</small></h1>
      <div class="float-right action_area">
        <button class="btn btn-info btn-sm rounded"><i class="fa fa-info-circle pr-1"></i></button>
        <button class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</button>
        <button class="btn btn-info btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Save &amp; Back</button>
        <button class="btn btn-grey btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</button>
        <button class="btn btn-grey btn-sm rounded"><i class="fa fa-arrow-left pr-1"></i> Back</button>
      </div>
    </div>
    ${currentCmsGeneralForm(dynamic)}
    ${currentOpsCard("Contents", `${currentCmsEditorRow("Page Contents", { height: dynamic ? 320 : 285, preview, chars: dynamic ? 33300 : 35324 })}${dynamic ? currentCmsEditorRow("Short Description", { height: 260 }) : ""}${dynamic ? currentCmsEditorRow("Upload File", { height: 0, upload: true }) : ""}`, "fa-cog")}
  </section>`;
}

function currentContentListPage() {
  const rows = {
    faqs: [["1", "General questions", "All Stores", "0", "<span class=\"toggle on\"></span>", actionButton("Action")], ["2", "Artwork help", "Visual Graphx", "1", "<span class=\"toggle on\"></span>", actionButton("Action")]],
    testimonials: [["1", "Customer quote", "Homepage", "0", "<span class=\"toggle on\"></span>", actionButton("Action")], ["2", "B2B review", "Store Page", "1", "<span class=\"toggle on\"></span>", actionButton("Action")]],
    banners: [["1", "Home hero", "Desktop", "0", "<span class=\"toggle on\"></span>", actionButton("Action")], ["2", "Mobile promo", "Mobile", "1", "<span class=\"toggle off\"></span>", actionButton("Action")]],
  }[OPS.page] || [];
  return `<section class="page ops-cms-page">
    ${currentCmsTabs()}
    <div class="page-header">
      <h1>${h(pageTitle())}</h1>
      <div class="float-right action_area">
        <button class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add</button>
        <button class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</button>
        <button class="btn btn-grey btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</button>
      </div>
    </div>
    ${currentOpsDataTable(["Sr#", pageTitle(), "Scope", "Sort", "Status", "Action"], rows, `ops-${OPS.page}`)}
    ${originalNote("Original Content Management keeps these list pages beside Contents, Email/SMS, and Media Gallery.")}
  </section>`;
}

function currentStorePersonalizationPage() {
  const cards = {
    links: ["Header Menu", "Footer Menu", "Account Links", "Storefront Links"],
    "sidebar-management": ["Sidebar Management", "Sidebar Widget", "Store Locked Widgets"],
    "sidebar-widget": ["Sidebar Widget", "Display Rule", "Widget Content"],
    themes: ["Website Themes", "Custom CSS", "Custom JS"],
    "product-page-layout": ["Product Page Layout", "Additional Info Page", "Visual Price Calculator"],
    "language-text": ["Language Text References", "Storefront Labels", "Checkout Text"],
  }[OPS.page] || ["Settings"];
  return `<section class="page ops-cms-page">
    <div class="page-header">
      <h1>${h(pageTitle())}</h1>
      <div class="float-right action_area">
        <button class="btn btn-success btn-sm rounded"><i class="fa fa-plus-circle pr-1"></i> Add</button>
        <button class="btn btn-info btn-sm rounded"><i class="fa fa-save pr-1"></i> Save</button>
        <button class="btn btn-grey btn-sm rounded"><i class="fa fa-undo pr-1"></i> Reset</button>
      </div>
    </div>
    ${currentOpsDataTable(["Area", "Scope", "Status", "Action"], cards.map(item => [item, "Global / Store", currentStatusToggle(true), actionButton("Action")]), `ops-${OPS.page}`)}
    ${originalNote("Original Store Personalization owns this presentation tool outside Content Management.")}
  </section>`;
}

function sitePageCategoriesPage() {
  return `<section class="page">${pageHead("Page Categories", ["Add Page Category", "Save", "Reset"])}${OPS.mode === "proposed" ? siteBuilderTabs() : ""}${tabStrip(["Page Categories", "Assigned Pages", "SEO"])}${filters(["Search", "Status"])}${dataTable(["Sr#", "Page Category", "Internal Key", "Assigned Pages", "Sort", "Status", "Action"], [
    ["1", "About", "about", "About Us, Team", "0", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["2", "Support", "support", "FAQs, Help Center", "1", "<span class=\"toggle on\"></span>", actionButton("Action")],
    ["3", "Marketing", "marketing", "Landing Pages", "2", "<span class=\"toggle on\"></span>", actionButton("Action")],
  ])}${changeNote("Page Categories belongs in Site Builder, not Product Catalog. Product Categories keeps only Product Category and Category group tabs.")}</section>`;
}

function siteBuilderSubpage(title, panelTitle, items, note) {
  return `<section class="page">${pageHead(title, ["Add", "Save", "Preview"])}${siteBuilderTabs()}<div class="grid two"><div>${panel(panelTitle, dataTable(["Item", "Scope", "Status", "Action"], items.map(item => [item, "Global + Store Override", "<span class=\"toggle on\"></span>", actionButton("Action")])))}</div><div>${panel("Context Ownership", `<p>${note}</p>${formRows(["Default Scope", "Store Override", "Status"])}`)}</div></div>${changeNote("This proposed subpage keeps related page, menu, theme, account, and content controls in the same working context.")}</section>`;
}

function mediaGrid() {
  return `<div class="media-grid">${["1__1.png","1.jpg","17 Year Printing.png","2__1.png","20230627_114339.jpg","2ctmedia_logo.webp","3__1.png","4.jpg","Adam_Bostrom.jpg"].map(name => `<div><div class="media-thumb"></div><span>${name}</span><small>06-04-2026</small></div>`).join("")}</div>`;
}

function genericPage(title) {
  const rows = [
    ["1", `${h(title)} configuration`, "Global", `<span class="toggle on"></span>`, actionButton("Action")],
    ["2", `${h(title)} store override`, "Store Context", `<span class="toggle on"></span>`, actionButton("Action")],
  ];
  return `<section class="page">${pageHead(title, ["Add", "Save", "Reset"])}${filters(["Search", "Status", "Store"])}${dataTable(["Sr#", "Record", "Scope", "Status", "Action"], rows)}${routeNote()}</section>`;
}

function vendorPage() {
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Export"])}${filters(["Search", "Status", "Type"])}${dataTable(["Sr#", proposed ? "Vendor / Partner" : "Business Partner", "Email", "Role", "Status", "Action"], [
    ["1", proposed ? "Arizona Trade Printer" : "Printer", "vendor@example.com", proposed ? "Vendor" : "Printer", "Active", actionButton("Action")],
    ["2", "CPI Sales Channel", "partner@example.com", proposed ? "Sales Agent & Partner" : "Sales Agent", "Active", actionButton("Action")],
  ])}${proposed ? changeNote("Vendor Quotes, Vendors, and Sales Agents & Partners move out of Quote Management into Vendors & Partners.") : originalNote("Original partner/vendor screens are split between Business Partners and Quote Management.")}</section>`;
}

function customerPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Export"])}${filters(["Search", "Customer Group", "Store", "Status"])}${dataTable(["Sr#", "Customer", "Email", "Store Scope", "Status", "Action"], [
    ["1", "Alex Loudenslager", "info@thelabna.com", "Visual Graphx", "Active", actionButton("Action")],
    ["2", "Drew Neverett", "drew.neverett@positionsports.com", "All Stores", "Active", actionButton("Action")],
  ])}${OPS.mode === "proposed" ? changeNote("Customer becomes Customer Accounts and owns account users, store admins, user groups, and account access context.") : originalNote("Original Customer label is broad and repeats in the sidebar.")}</section>`;
}

function templatePage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Duplicate"])}${filters(["Search", "Template Category", "Status"])}${dataTable(["Sr#", "Template", "Category", "Last Updated", "Status", "Action"], [
    ["1", "Business Card", "Print", "07-03-2026", "Active", actionButton("Action")],
    ["2", "Window Perf", "Vehicle Graphics", "07-02-2026", "Active", actionButton("Action")],
  ])}${routeNote()}</section>`;
}

function alertsPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save", "Preview"])}${tabStrip([{ label: "Email Templates", page: "email-templates" }, { label: "SMS Templates", page: "sms-templates" }, { label: "Alert Automations", page: "email-reminders" }])}${filters(["Search", "Trigger", "Store", "Status"])}${dataTable(["Sr#", "Template / Automation", "Trigger", "Scope", "Status", "Action"], [
    ["1", "Order Status Update", "Order Updated", OPS.mode === "proposed" ? "Global or Store Locked" : "Global", "Active", actionButton("Action")],
    ["2", "Payment Request Reminder", "Scheduled", OPS.mode === "proposed" ? "Global or Store Locked" : "Global", "Active", actionButton("Action")],
  ])}${OPS.mode === "proposed" ? changeNote("Email/SMS and reminders are grouped as Alerts & Notifications, with matching store-context pages that lock the selected store.") : originalNote("Original Email/SMS is nested inside Content Management.")}</section>`;
}

function seoPage() {
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), ["Save", "Reset"])}${filters(["Search", "Object Type", "Store", "Status"])}<div class="grid two"><div>${panel("SEO Fields", formRows(["Page Title", "Meta Description", "Canonical Reference", "Additional Schema Mark-up", "Exclude In Sitemap"]))}</div><div>${panel(proposed ? "Contextual SEO Ownership" : "Global SEO Utility", proposed ? "<p>Object-specific SEO belongs on pages, products, product categories, category groups, page categories, and assets. Central SEO remains for global defaults, sitemap, robots, redirects, and technical controls.</p>" : "<p>Original SEO menu centralizes page title, metatags, robots, URL redirects, and image alt text.</p>")}</div></div>${routeNote()}</section>`;
}

function configPage() {
  const adminText = OPS.page === "admin-text" ? "<p><b>Target link:</b> https://{siteurl}/admin/admin_constants.php</p>" : "";
  return `<section class="page">${pageHead(pageTitle(), ["Save", "Reset"])}${tabStrip([{ label: "Site Settings", page: "site-settings" }, { label: "Languages", page: "languages" }, { label: "Payments", page: "payments" }, { label: "Shipping", page: "shipping" }, { label: "Admin Panel Text References", page: "admin-text" }])}<div class="grid two"><div>${panel("Configuration Settings", formRows(["Setting", "Default", "Custom", "Status"]))}</div><div>${panel("Reference", `${adminText}<p>Store Configuration contains setup utilities and site-wide configuration records.</p>`)}</div></div>${routeNote()}</section>`;
}

function impositionPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save", "Reset"])}${filters(["Search", "Schema", "Product", "Status"])}${dataTable(["Sr#", "Schema / Sheet", "Product Scope", "Updated", "Status", "Action"], [
    ["1", "24 x 36 Sheet", "All Print Products", "07-03-2026", "Active", actionButton("Action")],
    ["2", "Vehicle Wrap Panel", "Vehicle Graphics", "07-02-2026", "Active", actionButton("Action")],
  ])}${OPS.mode === "proposed" ? changeNote("Imposition Beta is renamed Product Imposition to match product terminology.") : originalNote("Original sidebar label is Imposition Beta.")}</section>`;
}

function studioPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save"])}${filters(["Search", "Category", "Status"])}${dataTable(["Sr#", "Studio Resource", "Type", "Updated", "Status", "Action"], [
    ["1", "Default Font Pack", "Fonts", "07-01-2026", "Active", actionButton("Action")],
    ["2", "Language Text", "Text Reference", "06-30-2026", "Active", actionButton("Action")],
  ])}${routeNote()}</section>`;
}

function reportsPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Export", "Refresh"])}${filters(["Search", "Report Type", "Date From", "Date To"])}${dataTable(["Sr#", "Report / Log", "Category", "Last Run", "Status", "Action"], [
    ["1", "Sales Report", "Sales", "07-03-2026", "Ready", actionButton("View")],
    ["2", "Email Error Log", "System Log", "07-03-2026", "Ready", actionButton("View")],
  ])}${OPS.mode === "proposed" ? changeNote("Reports is renamed Reports & System Logs to make audit/error/export/email logs easier to find.") : originalNote("Original Reports label hides log visibility.")}</section>`;
}

function adminPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add User", "Save"])}${filters(["Search", "Role", "Status"])}${dataTable(["Sr#", "Admin User", "Email", "Role", "Status", "Action"], [
    ["1", "Christian De Ramos", "christian@visualgraphx.com", "Admin", "Active", actionButton("Action")],
    ["2", "Developer", "dev@example.com", "Limited", "Active", actionButton("Action")],
  ])}${OPS.mode === "proposed" ? changeNote("Admin is renamed Admin Users for clearer staff-user ownership.") : originalNote("Original Admin label is terse and mixes users and roles.")}</section>`;
}

function storeWorkspacePage() {
  return `<section class="page">${pageHead("Store Workspace » Konala", ["Save", "Save & Back", "Back"])}${storeWorkspaceTabs()}${storeWorkspaceBody()}${changeNote("Store context keeps focused tools beside the selected store while broad/global tools stay in their global areas.")}</section>`;
}

function storeWorkspaceTabs() {
  return tabStrip([
    { label: "View", page: "store-workspace" },
    { label: "Edit", page: "store-workspace-edit" },
    { label: "Customers", page: "store-workspace-customers" },
    { label: "Products", page: "store-workspace-products" },
    { label: "Markup", page: "store-workspace-markup" },
    { label: "Addresses", page: "store-workspace-addresses" },
    { label: "Credit Summary", page: "store-workspace-credit" },
    { label: "Site Builder", page: "store-workspace-builder" },
    { label: "Alerts & Notifications", page: "store-workspace-alerts" },
    { label: "Store Fields", page: "store-workspace-fields" },
  ]);
}

function storeWorkspaceBody() {
  const key = OPS.page === "store-workspace" ? "store-workspace-view" : OPS.page;
  const screens = {
    "store-workspace-view": ["Store Snapshot", ["Store Name", "Status", "Directory", "Default User"], "Store Details"],
    "store-workspace-edit": ["Edit Store", ["Store Name", "User", "URL Type", "Directory Name", "Allowed Domains"], "Settings"],
    "store-workspace-customers": ["Store Customers", ["Store Customers", "Store Admins", "User Groups", "B2B Account Users"], "Customer Access"],
    "store-workspace-products": ["Store Products", ["Assigned Products", "Product Categories", "Category Groups", "Pricing Scope"], "Product Assignment"],
    "store-workspace-markup": ["Store Markup", ["Markup Type", "Markup Master", "Flat Markup", "User Group Overrides"], "Markup Assignment"],
    "store-workspace-addresses": ["Store Addresses", ["Billing Addresses", "Shipping Addresses", "Pickup Locations"], "Address Context"],
    "store-workspace-credit": ["Credit Summary", ["Store Credit Mode", "Credit Limit", "Open Invoices", "Payment Requests"], "Credit Summary"],
    "store-workspace-builder": ["Store Site Builder", ["Pages", "Links & Menus", "Sidebar", "Themes", "Account Pages", "Help Media", "SEO"], "Store-Locked Site Builder"],
    "store-workspace-alerts": ["Store Alerts & Notifications", ["Email Templates", "SMS Templates", "Alert Automations", "Reminder Rules"], "Store-Locked Alerts"],
    "store-workspace-fields": ["Store Fields", ["Field Rules", "Required Customer Fields", "Checkout Fields"], "Store Field Rules"],
  };
  const [title, rows, sideTitle] = screens[key] || screens["store-workspace-view"];
  return `<div class="grid two"><div>${panel(title, dataTable(["Area", "Scope", "Status", "Action"], rows.map(row => [row, "Konala store", "<span class=\"toggle on\"></span>", actionButton("Open")])))}</div><div>${panel(sideTitle, formRows(["Default", "Custom", "Store Override", "Status"]))}${panel("Focused Context", `<p>${title} is locked to the selected store. Global versions of these systems remain in their own broad menu sections.</p>`)}</div></div>`;
}

function duplicateStorePage() {
  return `<section class="page">${pageHead("Duplicate Store Data", ["Submit", "Cancel"])}<div class="grid two"><div>${panel("Open From Store List", formRows(["Source Store", "Destination Store", "Sections to Duplicate", "Override Existing Content"]))}</div><div>${panel("Store Context Version", "<p>When launched inside a store workspace, the source store is locked to the active store. The user only chooses the destination and sections.</p>")}</div></div>${changeNote("Duplicate Store Data has two entry points: broad from Stores and focused from a selected store context.")}</section>`;
}

function markupMasterPage() {
  return `<section class="page">${pageHead("Markup Master", ["Save", "Reset"])}<div class="grid two"><div>${panel("Template Builder", formRows(["Markup Title", "Markup Type", "Fixed Markup", "Applied On", "Status"]))}</div><div>${panel("Assignment Context", "<p>Markup Master is the global markup template list and builder under Product Catalog/Pricing. Store-level markup assignment remains in Edit Store because it assigns one of these templates to a store.</p>")}</div></div>${changeNote("Markup Master moves out of Store Management because markup templates can apply beyond a single store, including users and user groups.")}</section>`;
}

function assetManagerPage() {
  const title = OPS.mode === "proposed" ? pageTitle() : pageTitle();
  return `<section class="page">${pageHead(title, ["New Folder", "Upload", "Add External Link"])}${filters(["Find", "Folder", "Tag", "Asset Type"])}<div class="grid two"><div>${panel(OPS.mode === "proposed" ? "Asset Manager" : "Image Manager", mediaGrid())}</div><div>${panel("Asset Metadata", formRows(["Folder", "Tags", "Alt Text", "External URL", "Owner Context"]))}</div></div>${OPS.mode === "proposed" ? changeNote("Hidden CMS Image Manager is brought forward as Asset Manager; Media Gallery is renamed Help Media and remains distinct.") : originalNote("Original Browse Server/Image Manager is hidden behind CMS editor image controls, and Media Gallery is separate.")}</section>`;
}

function siteBuilderTabs() {
  return tabStrip([
    { label: "Pages", page: "cms-pages" },
    { label: "Page Categories", page: "page-categories" },
    { label: "Links & Menus", page: "links" },
    { label: "Sidebar", page: "sidebar-management" },
    { label: "Themes", page: "themes" },
    { label: "Account Pages", page: "account-pages" },
    { label: "Product Layout Builder", page: "product-page-layout" },
    { label: "Content Management", page: "site-content" },
  ]);
}

function fastFilters(items) {
  return `<div class="fast-filters">${items.map(item => `<button type="button" class="btn btn-light btn-sm">${h(item)}</button>`).join("")}</div>`;
}

function proposedFilterTabs(items) {
  return `<div class="ops-proposed-filter-tabs btn-group" role="tablist">${items.map((item, index) => `<button type="button" class="btn btn-sm ${index === 0 ? "btn-primary active" : "btn-light"}">${h(item)}</button>`).join("")}</div>`;
}

function tabStrip(items, activePage = OPS.page) {
  const normalized = items.map(item => typeof item === "string" ? { label: item } : item);
  const activeIndex = normalized.findIndex(item => item.page === activePage);
  return `<ul class="nav nav-tabs sim-subtabs">${normalized.map((item, index) => {
    const isActive = item.page ? item.page === activePage : (activeIndex === -1 && index === 0);
    const dataPage = item.page ? ` data-page="${h(item.page)}" href="#${OPS.mode}/${h(item.page)}"` : ` href="#"`;
    return `<li class="nav-item"><a${dataPage} class="nav-link ${isActive ? "active" : ""}">${h(item.label)}</a></li>`;
  }).join("")}</ul>`;
}

function dataTable(headers, rows, id = "") {
  const tableId = id || `ops-${OPS.page}-${headers.join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return currentOpsDataTable(headers, rows, tableId);
}

function routeSummary() {
  const title = h(pageTitle());
  if (OPS.mode === "proposed") {
    return `${title} uses the OPS admin frame, controls, and data-table treatment for the proposed information architecture.`;
  }
  return `${title} follows the current OPS navigation and page treatment.`;
}

function routeNote() {
  return OPS.mode === "proposed" ? changeNote(routeSummary()) : originalNote(routeSummary());
}

function actionButton(label = "Action") {
  return `<button type="button" class="btn btn-outline-lightgrey btn-sm">${h(label)}</button>`;
}

function proposedCatalogRowsHtml() {
  const mixedProducts = [
    { sr: "125", name: "H-Stakes 10\" x 30\"", type: "Ready To Buy", className: "ready", details: "Hardware<br>Size : 10\" x 30\"", config: "Available To : All Store<br>Price Category : Range Based With Multiplication<br>Stock Enabled : Yes (Only Size)", on: false },
    { sr: "134", name: "Removal - Labor (Hourly)", type: "Ready To Buy", className: "ready", details: "Labor Services", config: "Available To : All Store<br>Price Category : Range Based With Multiplication<br>Allow Free Shipping : Yes", on: false },
    { sr: "900", name: "Vehicle Wrap Install Kit", type: "Kit Product", className: "kit", details: "Kit Product<br>Includes wrap, laminate, and labor primitives", config: "Available To : Specific Stores<br>Price Category : Fixed System Kit<br>Stock Enabled : No", on: true },
    { sr: "901", name: "NOW HIRING DECAL Related Setup", type: "Related Product", className: "related", details: "Related Product<br>Attached to NOW HIRING DECAL", config: "Available To : Default Store<br>Price Category : Fixed Quantity & Price<br>Store Scope : Default Store", on: true },
  ];
  const status = product => `<input type="checkbox" ${product.on ? "checked" : ""} class="form-control ace ace-switch ace-switch-check ace-switch-times bgc-success text-danger"><span class="d-none">${product.on ? "1" : "0"}</span>`;
  return mixedProducts.map(product => `<tr class="ops-proposed-mixed-row">
    <td class="text-center"><a>${h(product.sr)}</a></td>
    <td class="no-print"><div class="badge badge-white noimage"><div class="fa-stack fa-2x"><i class="fa fa-camera-retro fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x"></i></div></div></td>
    <td><a href="#${OPS.mode}/product-catalog">${h(product.name)}</a><br><span class="product-type-chip ${h(product.className)}">${h(product.type)}</span><br><small>${product.details}</small></td>
    <td>${product.config}</td>
    <td class="text-center">0</td>
    <td class="text-center">${status(product)}</td>
    <td class="no-print">${actionButton("Action")}</td>
  </tr>`).join("");
}

function pageButton(label) {
  const normalized = String(label || "");
  const icon = normalized.includes("Add") ? "fa-plus-circle"
    : normalized.includes("Save") ? "fa-save"
      : normalized.includes("Import") ? "fa-upload"
        : normalized.includes("Export") ? "fa-download"
          : normalized.includes("Reset") ? "fa-undo"
            : normalized.includes("Back") ? "fa-arrow-left"
              : normalized.includes("Search") ? "fa-search"
                : normalized.includes("Preview") ? "fa-eye"
                  : normalized.includes("Publish") ? "fa-search"
                    : "";
  const cls = normalized.includes("Reset") || normalized.includes("Back") || normalized.includes("Cancel")
    ? "btn btn-grey btn-sm rounded"
    : normalized.includes("Import") || normalized.includes("Manage") || normalized.includes("Related") || normalized.includes("Duplicate") || normalized.includes("Saved")
      ? "btn btn-secondary btn-sm rounded"
      : normalized.includes("Export") || normalized.includes("Search") || normalized.includes("Save") || normalized.includes("Job Board") || normalized.includes("Payment")
        ? "btn btn-info btn-sm rounded"
        : "btn btn-success btn-sm rounded";
  return `<button type="button" class="${cls}">${icon ? `<i class="fa ${icon} pr-1"></i>` : ""}${h(normalized)}</button>`;
}

function changeNote(text) {
  return `<div class="note proposed-note"><b>Proposed change:</b> ${text}</div>`;
}

function proposalCallout(text) {
  return `<div class="alert alert-info ops-proposal-callout"><b>Proposed change:</b> ${h(text)}</div>`;
}

function originalNote(text) {
  return `<div class="note current-note"><b>Current OPS:</b> ${text}</div>`;
}

function pageHead(title, actions) {
  return `<div class="page-head"><h1 class="page-title">${h(title)}</h1><div class="action_area">${actions.map(a => pageButton(a)).join("")}</div></div>`;
}

function filters(items) {
  return `<div class="filters form-inline">${items.map(i => i.includes("Selected") ? `<button type="button" class="btn btn-light btn-sm">${h(i)} <span class="fa fa-angle-down"></span></button>` : `<input class="form-control form-control-sm" placeholder="${h(i)}">`).join("")}<button type="button" class="btn btn-info btn-sm search-btn"><i class="fa fa-search pr-1"></i>Search</button><button type="button" class="btn btn-link btn-sm link-btn">Reset</button></div>`;
}

function formRows(items) {
  return `<div class="form">${items.map(i => `<label><span>${h(i)}</span><input></label>`).join("")}<label><span>Status</span><span class="toggle on"></span></label></div>`;
}

function render() {
  document.getElementById("app").innerHTML = app();
}

function syncHash() {
  const next = `#${OPS.mode}/${OPS.page}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
}

function applyHash() {
  const rawHash = window.location.hash.replace(/^#/, "");
  const [mode, page] = rawHash.split("/");
  if (mode === "current" || mode === "proposed") OPS.mode = mode;
  if (page) {
    OPS.page = page;
  } else if (rawHash && mode !== "current" && mode !== "proposed") {
    OPS.page = rawHash;
  }
  setOpenMenuForPage();
}

document.addEventListener("click", event => {
  const tabAction = event.target.closest("[data-tab-target]");
  if (tabAction && !tabAction.dataset.page) {
    event.preventDefault();
    activateExtractedTab(tabAction);
    return;
  }

  const navAction = event.target.closest("a[data-mode], a[data-menu], a[data-child], a[data-page]");
  if (navAction) event.preventDefault();

  const mode = event.target.closest("[data-mode]")?.dataset.mode;
  if (mode) {
    if (mode !== OPS.mode) {
      OPS.page = pageForModeSwitch(OPS.page, mode);
      OPS.mode = mode;
      setOpenMenuForPage();
      syncHash();
      render();
    }
    return;
  }

  const menu = event.target.closest("[data-menu]")?.dataset.menu;
  if (menu) {
    const clicked = [...(OPS.mode === "current" ? currentMenu : proposedMenu)].find(item => item.id === menu);
    OPS.openMenu = OPS.openMenu === menu ? "" : menu;
    OPS.openChild = "";
    if (clicked?.page) OPS.page = clicked.page;
    syncHash();
    render();
    return;
  }

  const child = event.target.closest("[data-child]")?.dataset.child;
  if (child) {
    OPS.openChild = OPS.openChild === child ? "" : child;
  }

  const page = event.target.closest("[data-page]")?.dataset.page;
  if (page) {
    OPS.page = page;
    const menu = (OPS.mode === "current" ? currentMenu : proposedMenu).find(group => isActiveGroupForPage(group, page));
    if (menu) OPS.openMenu = menu.id;
    syncHash();
  }
  render();
});

document.addEventListener("submit", event => {
  if (event.target.closest(".ops-extracted-page")) event.preventDefault();
});

function activateExtractedTab(tabAction) {
  const target = tabAction.dataset.tabTarget;
  if (!target) return;

  const tabList = tabAction.closest(".nav-tabs, .tabs-above, .tabs-left, .tabs-right") || tabAction.closest("ul");
  const panelRoot = tabAction.closest(".ops-extracted-page") || document;
  if (tabList) {
    tabList.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    tabList.querySelectorAll("[aria-selected]").forEach(el => el.setAttribute("aria-selected", "false"));
  }
  tabAction.classList.add("active");
  tabAction.setAttribute("aria-selected", "true");
  const parent = tabAction.closest("li");
  if (parent) parent.classList.add("active");

  panelRoot.querySelectorAll(".tab-pane.active, .tab-pane.show").forEach(el => el.classList.remove("active", "show"));
  const pane = panelRoot.querySelector(`#${CSS.escape(target)}`);
  if (pane) pane.classList.add("active", "show");
}

function isActiveGroupForPage(group, page) {
  return group.page === page || (group.children || []).some(child => child.page === page || (child.children || []).some(grand => grand.page === page));
}

window.addEventListener("hashchange", () => {
  applyHash();
  render();
});

applyHash();
syncHash();
render();
