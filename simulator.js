const OPS = {
  mode: "current",
  page: "dashboard",
  openMenu: "dashboard",
  openChild: "",
  loginAs: "cderamos",
};

const icon = {
  dashboard: "gauge-high",
  orders: "cart-shopping",
  quotes: "file-lines",
  customers: "user",
  stores: "store",
  products: "tags",
  templates: "table-columns",
  content: "file-alt",
  personalization: "gear",
  seo: "globe",
  partners: "handshake",
  config: "gears",
  imposition: "table-cells",
  studio: "pen-to-square",
  reports: "chart-line",
  admin: "user-shield",
  api: "rotate",
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
    { label: "Order Status", page: "order-status" },
    { label: "Coupons / Discount", page: "coupons" },
    { label: "Store Credit", page: "store-credit" },
    { label: "Unpaid Orders", page: "unpaid-orders" },
    { label: "Archive Orders", page: "archive-orders" },
  ] },
  { id: "quotes", label: "Quote Management", icon: icon.quotes, children: [
    { label: "Quotes", page: "quotes" },
    { label: "Add New Quote", page: "add-quote" },
    { label: "Printer Quotes", page: "vendor-quotes" },
    { label: "Quote Status", page: "quote-status" },
  ] },
  { id: "customer", label: "Customer", icon: icon.customers, children: [
    { label: "Customers", page: "customers" },
    { label: "Newsletter", page: "newsletter" },
    { label: "Design Proofs", page: "design-proofs" },
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
    { label: "Product Price", page: "product-price", children: [
      { label: "Product Price", page: "product-price" },
      { label: "Product Price - Bulk", page: "product-price-bulk" },
      { label: "Product Option Price - Bulk", page: "product-option-price-bulk" },
      { label: "Product Price - Excel", page: "product-price-excel" },
      { label: "Percentage (+/-)", page: "product-price-percent" },
    ] },
  ] },
  { id: "customer2", label: "Customer", icon: icon.customers, children: [
    { label: "Customers", page: "customers" },
    { label: "Newsletter", page: "newsletter" },
    { label: "Design Proofs", page: "design-proofs" },
  ] },
  { id: "stores2", label: "Store Management", icon: icon.stores, children: [
    { label: "Stores", page: "stores" },
    { label: "Store Fields", page: "store-fields" },
  ] },
  { id: "products2", label: "Products", icon: icon.products, children: [
    { label: "Print Products", page: "print-products" },
    { label: "Ready To Buy Products", page: "ready-products" },
    { label: "Product Options", page: "product-options" },
    { label: "Product Categories", page: "product-categories" },
    { label: "Product Weight/Days/SKU", page: "product-weight" },
    { label: "Products Tax/VAT Settings", page: "product-tax" },
    { label: "Product Price", page: "product-price" },
  ] },
  { id: "templates", label: "Templates", icon: icon.templates, children: [
    { label: "Product Templates", page: "templates" },
    { label: "PDF Block Templates", page: "pdf-blocks" },
    { label: "Art Layouts", page: "art-layouts" },
    { label: "Template Categories", page: "template-categories" },
  ] },
  { id: "content", label: "Content Management", icon: icon.content, children: [
    { label: "Contents", page: "cms-pages" },
    { label: "FAQs", page: "faqs" },
    { label: "Testimonials", page: "testimonials" },
    { label: "Banners", page: "banners" },
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
    { label: "Country / States", page: "country-states" },
    { label: "Web Optimization", page: "web-optimization" },
    { label: "Manage Site Access", page: "site-access" },
    { label: "Payments Method", page: "payments" },
    { label: "Shipping Method", page: "shipping" },
    { label: "Tax / Vat Settings", page: "tax-settings" },
    { label: "External Service Settings", page: "external-services" },
    { label: "Admin Panel Text References", page: "admin-text" },
  ] },
  { id: "imposition", label: "Imposition Beta", icon: icon.imposition, children: [
    { label: "Sheet Size Management", page: "sheet-sizes" },
    { label: "Schema Manager", page: "schemas" },
    { label: "Impose Job", page: "impose-job" },
    { label: "Product Schema Settings", page: "product-schema-settings" },
  ] },
  { id: "studio", label: "Designer Studio", icon: icon.studio, children: [
    { label: "Studio Settings", page: "studio-settings" },
    { label: "Language Text References", page: "studio-language" },
    { label: "Images", page: "studio-images" },
    { label: "Image Categories", page: "studio-image-categories" },
    { label: "Studio Fonts", page: "studio-fonts" },
  ] },
  { id: "reports", label: "Reports", icon: icon.reports, children: [
    { label: "Sales Reports", page: "sales-reports" },
    { label: "Production Reports", page: "production-reports" },
    { label: "Inventory Reports", page: "inventory-reports" },
    { label: "Log", page: "system-log" },
  ] },
  { id: "admin", label: "Admin", icon: icon.admin, children: [
    { label: "Admin", page: "admin-users" },
    { label: "Admin Group / Role", page: "roles" },
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
    { label: "Product Tax/VAT Settings", page: "product-tax" },
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
    { label: "Order Exports", page: "export-api-orders" },
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
  orders: ["orders", "payment-request", "add-order", "order-status", "coupons", "store-credit", "unpaid-orders", "archive-orders", "job-board"],
  quotes: ["quotes", "add-quote", "quote-status"],
  vendor: ["vendor-quotes", "vendors", "sales-agents"],
  customer: ["customers", "newsletter", "design-proofs", "b2b-account-users", "store-admins", "user-groups"],
  store: ["stores", "store-fields", "store-workspace", "duplicate-store-data", "b2b-store-theme"],
  product: ["print-products", "ready-products", "product-catalog", "product-options", "product-categories", "category-groups", "page-categories", "product-weight", "stock-settings", "product-tax", "product-price", "product-price-bulk", "product-option-price-bulk", "product-price-excel", "product-price-percent", "markup-master", "manage-stock"],
  template: ["templates", "pdf-blocks", "art-layouts", "template-categories"],
  builder: ["cms-pages", "site-content", "links", "sidebar-management", "sidebar-widget", "themes", "account-pages", "product-page-layout", "product-showcase", "website-logos", "language-text", "banners", "asset-manager", "help-media", "media-gallery", "form-management", "breadcrumbs", "faqs", "testimonials"],
  alerts: ["email-templates", "sms-templates", "email-reminders"],
  seo: ["seo-global", "sitemaps", "metatags", "robots", "redirects", "image-alt", "product-seo", "category-seo", "category-group-seo", "page-category-seo", "content-seo", "asset-seo"],
  config: ["site-settings", "languages", "currency", "country-states", "web-optimization", "site-access", "payments", "shipping", "tax-settings", "external-services", "admin-text"],
  api: ["export-api-orders", "api-webhooks"],
  imposition: ["sheet-sizes", "schemas", "impose-job", "product-schema-settings"],
  studio: ["studio-settings", "studio-language", "studio-images", "studio-image-categories", "studio-fonts"],
  reports: ["sales-reports", "production-reports", "inventory-reports", "system-log"],
  admin: ["admin-users", "roles"],
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

function h(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function app() {
  const menu = OPS.mode === "current" ? currentMenu : proposedMenu;
  return `
    <div class="ops">
      ${topbar()}
      <div class="body">
        ${sidebar(menu)}
        <main class="main">
          ${subbar()}
          ${content()}
        </main>
      </div>
      <div class="mode-switch">
        <button data-mode="current" class="${OPS.mode === "current" ? "on" : ""}">Current OPS</button>
        <button data-mode="proposed" class="${OPS.mode === "proposed" ? "on" : ""}">Proposed</button>
      </div>
    </div>
  `;
}

function topbar() {
  return `
    <header class="top">
      <a class="brand" data-page="dashboard">
        <span class="ops-home-stack" title="Admin">
          <svg class="ops-home-house" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M4 15.5 16 5l12 10.5" />
            <path d="M8 14.5V28h16V14.5" />
            <path d="M12 28v-7h8v7" />
          </svg>
          <svg class="ops-home-user" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="12" />
            <circle cx="16" cy="12.5" r="4" />
            <path d="M8.5 24c1.8-4.1 5-6.1 7.5-6.1s5.7 2 7.5 6.1" />
          </svg>
        </span>
        <strong>Visual Graphx, LLC.</strong>
      </a>
      <div class="search"><input placeholder="Search here....."><button class="fa fa-search"></button><button class="fa fa-bookmark"></button></div>
      <div class="tools">
        <div class="cache">Cache <b>YES</b><span class="fa fa-bars"></span><span class="fa fa-trash"></span></div>
        <button class="top-square fa fa-chevron-down"></button>
        <button class="top-square fa fa-desktop"></button>
        <button class="chat fa fa-comments"></button>
        <button class="user"><span class="fa fa-user"></span><b>Welcome,<br>${h(OPS.loginAs)}</b><span class="fa fa-caret-down"></span></button>
      </div>
    </header>
  `;
}

function subbar() {
  return `
    <div class="subbar">
      <div class="crumb"><span class="fa fa-home"></span><a data-page="dashboard">Home</a><span>›</span><span>${h(pageTitle())}</span></div>
      <div class="admin-tools">
        <button class="workflow"><span class="fa fa-rotate"></span> Workflow</button>
        <label><span class="radio"></span> Filter by Store</label>
        <label><span class="radio checked"></span> Login As</label>
        <select><option>${h(OPS.loginAs)}</option><option>gx002_admin</option><option>Demo Store</option></select>
        <button class="fa fa-expand"></button>
      </div>
    </div>
  `;
}

function sidebar(menu) {
  return `
    <aside class="side">
      <div class="quick">
        <button class="green fa fa-cart-shopping"></button>
        <button class="gold fa fa-user"></button>
        <button class="blue fa fa-tag"></button>
        <button class="orange fa fa-file-pdf"></button>
        <button class="red fa fa-gears"></button>
      </div>
      <nav>${menu.map(renderMenuGroup).join("")}</nav>
      <button class="collapse fa fa-angle-left"></button>
    </aside>
  `;
}

function renderMenuGroup(group) {
  const open = OPS.openMenu === group.id;
  const active = isActiveGroup(group);
  return `
    <section class="menu ${open ? "open" : ""}">
      <button class="menu-head ${active ? "active" : ""}" data-menu="${h(group.id)}" ${group.page ? `data-page="${h(group.page)}"` : ""}>
        <span><span class="fa fa-${h(group.icon)}"></span>${h(group.label)}</span>
        ${group.children ? `<span class="fa fa-${open ? "angle-up" : "angle-down"}"></span>` : ""}
      </button>
      ${group.children && open ? `<div class="submenu">${group.children.map(child => renderChild(child, group.id)).join("")}</div>` : ""}
    </section>
  `;
}

function renderChild(item, parent) {
  const key = `${parent}:${item.label}`;
  const open = OPS.openChild === key;
  const active = OPS.page === item.page || (item.children || []).some(c => c.page === OPS.page);
  return `
    <div class="child ${open ? "open" : ""}">
      <button class="child-head ${active ? "active" : ""}" data-child="${h(key)}" ${item.page ? `data-page="${h(item.page)}"` : ""}>
        <span>${h(item.label)}</span>${item.children ? `<span class="fa fa-${open ? "angle-up" : "angle-down"}"></span>` : ""}
      </button>
      ${item.children && open ? `<div class="grand">${item.children.map(grand => `<button class="${OPS.page === grand.page ? "active" : ""}" data-page="${h(grand.page)}">${h(grand.label)}</button>`).join("")}</div>` : ""}
    </div>
  `;
}

function isActiveGroup(group) {
  return group.page === OPS.page || (group.children || []).some(child => child.page === OPS.page || (child.children || []).some(grand => grand.page === OPS.page));
}

function pageTitle() {
  if (OPS.mode === "proposed" && OPS.page === "dashboard") return "Dashboard";
  return labelForPage(OPS.page) || "Dashboard";
}

function labelForPage(page) {
  const menu = OPS.mode === "current" ? currentMenu : proposedMenu;
  return menu.flatMap(flattenMenu).find(item => item.page === page)?.label;
}

function content() {
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

function dashboard() {
  return `
    <section class="dashboard">
      <div class="tiles">
        ${tile("Orders", "cart-shopping", "blue")}
        ${tile("Quotes", "file-lines", "green")}
        ${tile("Customers", "user", "brown")}
        ${tile("Products", "tags", "orange")}
        ${tile("Templates", "table-columns", "cyan")}
        ${tile("Site Settings", "gear", "slate")}
        ${tile("Studio Settings", "gears", "pink")}
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
  return `<section class="panel"><header><h2>${title}</h2><div><a>View All</a><button class="fa fa-refresh"></button></div></header><div class="panel-body">${body}</div></section>`;
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
  return `<div class="tabs"><button class="active">Orders</button><button>Customers</button><button>Quotes</button></div>${orderRows()}`;
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
  const fast = proposed ? fastFilters(["Open", "Unpaid", "Payment Requested", "Paid", "Archived", "Overdue", "Store", "Customer"]) : "";
  const stateCols = proposed ? "<th>Invoice</th><th>Payment</th><th>Archive</th>" : "";
  const stateCells = proposed ? "<td><span class=\"badge muted\">Invoice Ready</span></td><td><span class=\"badge warn\">Requested</span></td><td><span class=\"badge muted\">No</span></td>" : "";
  return `<section class="page">${pageHead(title, proposed ? ["Add New Order", "Saved Views", "Job Board"] : ["Payment Request", "Job Board", "Order Shipment"])}${fast}${filters(proposed ? ["Search:", "Company Name", "Store", "Order Status", "Product Status", "Date From", "Date To"] : ["Search:", "Company Name", "Order Date", "From", "To", "13 Selected"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Order Details</th><th>Customer</th><th>Products</th>${stateCols}<th>Status</th><th>Action</th></tr></thead><tbody>${orders.map(o => `<tr><td><a>${o[0]}</a></td><td><b>${o[1]}</b><br>${o[3]}<br><small>${o[4]}</small></td><td><a>${o[5]}</a><br><small>${o[6]}</small></td><td>${o[7].join("<br>")}</td>${stateCells}<td><span class="toggle ${o[0] === "3052" ? "on" : "off"}"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div>${proposed ? changeNote("Orders now contains unpaid, payment request, and archive states as filters/actions instead of separate navigation fragments.") : originalNote("Original Orders splits List Orders, Payment Request, Unpaid Orders, Archive Orders, Export/API Orders, and status utilities across separate menu entries.")}</section>`;
}

function quotesPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add New Quote", "Quote Status"])}${filters(["Search", "Quote Status", "Customer", "Date"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Quote Details</th><th>Customer</th><th>Products</th><th>Status</th><th>Action</th></tr></thead><tbody>${quotes.map(q => `<tr><td><a>${q[0]}</a></td><td>${q[2]}<br><small>${q[3]}</small></td><td><a>${q[4]}</a><br><small>${q[5]}</small></td><td>${q[6].join("<br>")}</td><td><span class="badge">${q[1]}</span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div>${OPS.mode === "proposed" ? changeNote("Quotes is reserved for customer quote workflows. Vendor quotes move to Vendors & Partners.") : originalNote("Original Quote Management mixes customer quotes with printer/vendor quote screens.")}</section>`;
}

function productPage() {
  if (OPS.mode === "proposed" && OPS.page === "markup-master") return markupMasterPage();
  if (OPS.page === "product-categories" || OPS.page === "category-groups") return productCategoriesPage();
  if (["product-weight", "stock-settings", "manage-stock"].includes(OPS.page)) return stockSettingsPage();
  const proposed = OPS.mode === "proposed";
  const actions = proposed ? ["Add Print Product", "Add Ready To Buy", "Add Kit Product", "Add Related Product"] : ["Add", "Import Products", "Related Product", "Manage Stock", "Publish"];
  const tagCols = proposed ? "<th>Product Type</th><th>System Tags</th>" : "";
  const tagCells = proposed ? "<td><span class=\"badge muted\">Print Product</span></td><td><span class=\"pill\">Fixed System</span><span class=\"pill\">Store Scope</span></td>" : "";
  return `<section class="page">${pageHead(proposed && OPS.page === "product-catalog" ? "Product Catalog" : pageTitle(), actions)}${proposed ? fastFilters(["Print Products", "Ready To Buy", "Kit Product", "Related Product", "Stock Enabled", "Store Scope", "Status"]) : ""}${filters(["Search", "Product Category", "Select Store", "Price Category"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Images</th><th>Product Details</th>${tagCols}<th>Configuration</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead><tbody>${products.map(p => `<tr><td><a>${p[0]}</a></td><td><div class="thumb"></div></td><td><a>${p[1]}</a><br><small>${p[2]}</small></td>${tagCells}<td>${p[3]}<br>Price Category : ${p[4]}</td><td>0</td><td><span class="toggle ${p[5] === "On" ? "on" : "off"}"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div>${proposed ? changeNote("Print Products and Ready To Buy Products are represented as one catalog list with product type and fixed system tags. Focused edit pages stay intact.") : originalNote("Original Products separates Print Products and Ready To Buy Products into different lists, with related tools scattered below the menu.")}</section>`;
}

function productCategoriesPage() {
  const rows = [
    ["1", "All [ featured ]", "Featured", "-10", "on"],
    ["2", "Yellowstone Landscape", "Custom", "-1", "on"],
    ["3", "Vehicle Kits", "Custom", "-1", "on"],
    ["4", "Vehicle Kit Parts", "Custom", "-1", "on"],
    ["5", "ER2", "Custom", "-1", "on"],
    ["6", "RCS", "Custom", "-1", "on"],
    ["7", "Town of Queen Creek", "Custom", "-1", "on"],
    ["13", "Decals", "Decals", "0", "on"],
    ["14", "Architectural Signage", "by-use-case", "0", "on"],
    ["15", "Commercial Advertising", "by-use-case", "0", "on"],
    ["16", "Construction & Industrial", "by-industry", "0", "on"],
    ["17", "Job Site & Safety Signage", "by-use-case", "0", "on"],
  ];
  return `<section class="page">${pageHead("Product Categories", ["Add Product Category", "Add Category Group"])}${tabStrip(["Product Category", "Category group"])}${filters(["Search:"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Category Image</th><th>Category Title</th><th>Category group</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td><div class="thumb category-thumb"></div></td><td><b>${h(r[1])}</b><br><button class="tiny-action">Add to cart</button></td><td>${h(r[2])}</td><td>${h(r[3])}</td><td><span class="toggle on"></span></td><td><button class="icon-btn fa fa-pencil"></button><button class="icon-btn danger fa fa-trash"></button></td></tr>`).join("")}</tbody></table></div>${OPS.mode === "proposed" ? changeNote("Product Categories and Category Groups remain in one Product Categories screen as tabbed contexts. The sidebar should not split Category Groups into its own Product Catalog link.") : originalNote("Original OPS keeps Product Category and Category group together under the Product Categories link.")}</section>`;
}

function stockSettingsPage() {
  const proposed = OPS.mode === "proposed";
  const title = proposed ? "Stock & Settings" : "Product Weight";
  const actions = proposed ? ["Import Product Weight", "Import Stock", "Save"] : ["Import Product Weight"];
  const tabs = tabStrip(["Product Weight", "Production Days", "Products SKU", "Stock"]);
  const rows = [
    ["1", "Decals", "Only Size", "Warning - KHF Inside C...  Not set<br>Exit - 37.5&quot; W x 9.5&quot; H : <span class=\"status-chip unset\">Not set</span>", "12 in stock"],
    ["2", "Ticket Number Decals", "Only Size", "2 : <span class=\"status-chip unset\">Not set</span><br>7 : <span class=\"status-chip unset\">Not set</span><br>12 : <span class=\"status-chip unset\">Not set</span>", "0 stock"],
    ["6", "H-Stakes 10\" x 30\"", "Only Size", "None : 0.050000", "31 in stock"],
    ["10", "Signicade Deluxe", "Only Size", "White : 21.000000<br>Black : 21.000000", "5 in stock"],
    ["18", "Retractable Banner Stand", "Only Size", "33&quot; Double Sided - Stan... 21.000000", "8 in stock"],
    ["21", "T-Shirt OPS", "Only Size", "T-Shirt : <span class=\"status-chip unset\">Not set</span>", "0 stock"],
    ["24", "Adhesive Products", "Only Size", "Custom Size : <span class=\"status-chip unset\">Not set</span>", "17 in stock"],
  ];
  const stockCol = proposed ? "<th>Stock</th>" : "";
  const stockCell = row => proposed ? `<td>${row[4]}</td>` : "";
  return `<section class="page">${pageHead(title, actions)}${tabs}<div class="info-box"><p>You can set up product weight based on product sizes, product options, or product option combinations. Production days, SKU, and stock now share this same product-setting context.</p><p><b>Weight is always defined for only 1 quantity/unit of the product.</b></p></div>${filters(["Search", "Product Weight", "Both"])}<h2 class="section-title">${proposed ? "Stock & Settings Summary" : "Product Weight Summary"}</h2><div class="table-card"><table><thead><tr><th>Sr#</th><th>Product Details</th><th>Setting Type</th><th>Product Weight</th>${stockCol}<th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td><b>${h(r[1])}</b></td><td>${h(r[2])}</td><td>${r[3]}</td>${stockCell(r)}<td><button class="icon-btn fa fa-pencil"></button></td></tr>`).join("")}</tbody></table></div>${proposed ? changeNote("Product Weight / Days / SKU and Manage Stock are combined into Stock & Settings. Stock is a tab in the same product-setting workflow instead of a separate sidebar link.") : changeNote("The original Product Weight/Days/SKU screen gains a Stock tab so stock can be managed without leaving the product-setting context.")}</section>`;
}

function storesPage() {
  if (OPS.mode === "proposed" && OPS.page === "store-workspace") return storeWorkspacePage();
  if (OPS.mode === "proposed" && OPS.page === "duplicate-store-data") return duplicateStorePage();
  const rows = [["1", "Demo Store", "johnDoe@graphxcpi.com"], ["2", "Konala", "rdickson@alphagraphics.com"], ["3", "Socure", "rdickson+socure@alphagraphics.com"]];
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), proposed ? ["Add", "Duplicate Store Data", "Open Store Workspace", "Store Settings Templates"] : ["Add", "Import Department", "Duplicate Store Data", "Markup Master", "Store Settings Templates"])}${filters(["Search"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Logo</th><th>Store Details</th><th>Settings</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td><div class="thumb logo"></div></td><td><a>${r[1]}</a><br>${r[2]}<br>Username : ${r[2]}</td><td>Department : No<br>Quick Checkout : No<br>Show Price To Customer : Yes</td><td><span class="toggle on"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div>${proposed ? changeNote("Store Management keeps the store list and store-specific assignment workflows. B2B Store Theme remains here because it is only for B2B stores.") : originalNote("Original Stores page includes broad controls like Markup Master even when the system is not store-only.")}</section>`;
}

function apiPage() {
  const proposed = OPS.mode === "proposed";
  const tabs = proposed ? tabStrip(["Order Exports", "API & Webhooks"]) : tabStrip(["Export/API Settings", "Hot Folder Settings", "Advanced API", "Webhook"]);
  const apiText = proposed ? "Global-only API credentials, webhook events, and the open question for context-aware B2C, B2B, franchise, and reseller automation." : "Current Export/API Orders lives under Orders and mixes export execution with export/API settings.";
  return `<section class="page">${pageHead(proposed ? "Export & API" : "Export/API Orders", proposed ? ["Save", "Test Connection"] : ["Export", "Manual Transfer", "Export/API Settings"])}${tabs}<div class="grid two"><div>${filters(["Order Range", "Date Range", "Order Status"])}${panel("Order Exports", "<p>Export style, file naming, hot folder, order status selection, manual transfer, and connection controls.</p>")}</div><div>${panel("API & Webhooks", `<p>${apiText}</p>${formRows(["Client Id", "Client Secret", "Endpoint URL", "Webhook URL", "Event Type"])}`)}</div></div>${proposed ? changeNote("Export/API Orders is removed from Orders and becomes a global Export & API section with two areas: Order Exports and API & Webhooks.") : originalNote("Original export/API controls are reached through the Orders menu.")}</section>`;
}

function siteBuilderPage() {
  const media = ["help-media", "media-gallery", "asset-manager"].includes(OPS.page);
  const title = OPS.mode === "proposed" ? pageTitle() : pageTitle();
  if (media) return assetManagerPage();
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(title, ["Add", "Save", "Preview"])}${proposed ? siteBuilderTabs() : tabStrip(["Homepage & Fixed Content", "Dynamic Pages", "Category"])}<div class="grid two"><div>${panel(pageTitle(), formRows(["Page Category", "Key", "Page Heading", "Sort", "Status"]))}</div><div>${panel(proposed ? "Context Ownership" : "SEO", proposed ? "<p>Global Site Builder owns broad site pages, menus, themes, account pages, content groups, and asset references. Store-level Site Builder locks the selected store.</p>" : formRows(["Page Title", "Meta Description", "Canonical Reference"]))}</div></div>${proposed ? changeNote("Content Management and Store Personalization are reorganized as Site Builder, with the same page primitives available globally and in store context.") : originalNote("Original CMS and Store Personalization split page, theme, menu, sidebar, and asset tools across different areas.")}</section>`;
}

function mediaGrid() {
  return `<div class="media-grid">${["1__1.png","1.jpg","17 Year Printing.png","2__1.png","20230627_114339.jpg","2ctmedia_logo.webp","3__1.png","4.jpg","Adam_Bostrom.jpg"].map(name => `<div><div class="media-thumb"></div><span>${name}</span><small>06-04-2026</small></div>`).join("")}</div>`;
}

function genericPage(title) {
  return `<section class="page">${pageHead(title, ["Add", "Save", "Reset"])}${filters(["Search", "Status", "Store"])}<div class="grid two"><div>${panel(`${title} Details`, formRows(["Name", "Type", "Status", "Sort", "Description"]))}</div><div>${panel(`${OPS.mode === "proposed" ? "Proposed" : "Current OPS"} Layout`, `<p>${routeSummary()}</p>`)}</div></div></section>`;
}

function vendorPage() {
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Export"])}${filters(["Search", "Status", "Type"])}${dataTable(["Sr#", proposed ? "Vendor / Partner" : "Business Partner", "Email", "Role", "Status", "Action"], [
    ["1", proposed ? "Arizona Trade Printer" : "Printer", "vendor@example.com", proposed ? "Vendor" : "Printer", "Active", "Action"],
    ["2", "CPI Sales Channel", "partner@example.com", proposed ? "Sales Agent & Partner" : "Sales Agent", "Active", "Action"],
  ])}${proposed ? changeNote("Vendor Quotes, Vendors, and Sales Agents & Partners move out of Quote Management into Vendors & Partners.") : originalNote("Original partner/vendor screens are split between Business Partners and Quote Management.")}</section>`;
}

function customerPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Export"])}${filters(["Search", "Customer Group", "Store", "Status"])}${dataTable(["Sr#", "Customer", "Email", "Store Scope", "Status", "Action"], [
    ["1", "Alex Loudenslager", "info@thelabna.com", "Visual Graphx", "Active", "Action"],
    ["2", "Drew Neverett", "drew.neverett@positionsports.com", "All Stores", "Active", "Action"],
  ])}${OPS.mode === "proposed" ? changeNote("Customer becomes Customer Accounts and owns account users, store admins, user groups, and account access context.") : originalNote("Original Customer label is broad and repeats in the sidebar.")}</section>`;
}

function templatePage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Import", "Duplicate"])}${filters(["Search", "Template Category", "Status"])}${dataTable(["Sr#", "Template", "Category", "Last Updated", "Status", "Action"], [
    ["1", "Business Card", "Print", "07-03-2026", "Active", "Action"],
    ["2", "Window Perf", "Vehicle Graphics", "07-02-2026", "Active", "Action"],
  ])}${routeNote()}</section>`;
}

function alertsPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save", "Preview"])}${tabStrip(["Email Templates", "SMS Templates", "Alert Automations"])}${filters(["Search", "Trigger", "Store", "Status"])}${dataTable(["Sr#", "Template / Automation", "Trigger", "Scope", "Status", "Action"], [
    ["1", "Order Status Update", "Order Updated", OPS.mode === "proposed" ? "Global or Store Locked" : "Global", "Active", "Action"],
    ["2", "Payment Request Reminder", "Scheduled", OPS.mode === "proposed" ? "Global or Store Locked" : "Global", "Active", "Action"],
  ])}${OPS.mode === "proposed" ? changeNote("Email/SMS and reminders are grouped as Alerts & Notifications, with matching store-context pages that lock the selected store.") : originalNote("Original Email/SMS is nested inside Content Management.")}</section>`;
}

function seoPage() {
  const proposed = OPS.mode === "proposed";
  return `<section class="page">${pageHead(pageTitle(), ["Save", "Reset"])}${filters(["Search", "Object Type", "Store", "Status"])}<div class="grid two"><div>${panel("SEO Fields", formRows(["Page Title", "Meta Description", "Canonical Reference", "Additional Schema Mark-up", "Exclude In Sitemap"]))}</div><div>${panel(proposed ? "Contextual SEO Ownership" : "Global SEO Utility", proposed ? "<p>Object-specific SEO belongs on pages, products, product categories, category groups, page categories, and assets. Central SEO remains for global defaults, sitemap, robots, redirects, and technical controls.</p>" : "<p>Original SEO menu centralizes page title, metatags, robots, URL redirects, and image alt text.</p>")}</div></div>${routeNote()}</section>`;
}

function configPage() {
  const adminText = OPS.page === "admin-text" ? "<p><b>Target link:</b> https://{siteurl}/admin/admin_constants.php</p>" : "";
  return `<section class="page">${pageHead(pageTitle(), ["Save", "Reset"])}${tabStrip(["Site Settings", "Languages", "Payments", "Shipping", "Admin Panel Text References"])}<div class="grid two"><div>${panel("Configuration Settings", formRows(["Setting", "Default", "Custom", "Status"]))}</div><div>${panel("Reference", `${adminText}<p>Store Configuration contains setup utilities and site-wide configuration records.</p>`)}</div></div>${routeNote()}</section>`;
}

function impositionPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save", "Reset"])}${filters(["Search", "Schema", "Product", "Status"])}${dataTable(["Sr#", "Schema / Sheet", "Product Scope", "Updated", "Status", "Action"], [
    ["1", "24 x 36 Sheet", "All Print Products", "07-03-2026", "Active", "Action"],
    ["2", "Vehicle Wrap Panel", "Vehicle Graphics", "07-02-2026", "Active", "Action"],
  ])}${OPS.mode === "proposed" ? changeNote("Imposition Beta is renamed Product Imposition to match product terminology.") : originalNote("Original sidebar label is Imposition Beta.")}</section>`;
}

function studioPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add", "Save"])}${filters(["Search", "Category", "Status"])}${dataTable(["Sr#", "Studio Resource", "Type", "Updated", "Status", "Action"], [
    ["1", "Default Font Pack", "Fonts", "07-01-2026", "Active", "Action"],
    ["2", "Language Text", "Text Reference", "06-30-2026", "Active", "Action"],
  ])}${routeNote()}</section>`;
}

function reportsPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Export", "Refresh"])}${filters(["Search", "Report Type", "Date From", "Date To"])}${dataTable(["Sr#", "Report / Log", "Category", "Last Run", "Status", "Action"], [
    ["1", "Sales Report", "Sales", "07-03-2026", "Ready", "View"],
    ["2", "Email Error Log", "System Log", "07-03-2026", "Ready", "View"],
  ])}${OPS.mode === "proposed" ? changeNote("Reports is renamed Reports & System Logs to make audit/error/export/email logs easier to find.") : originalNote("Original Reports label hides log visibility.")}</section>`;
}

function adminPage() {
  return `<section class="page">${pageHead(pageTitle(), ["Add User", "Save"])}${filters(["Search", "Role", "Status"])}${dataTable(["Sr#", "Admin User", "Email", "Role", "Status", "Action"], [
    ["1", "Christian De Ramos", "christian@visualgraphx.com", "Admin", "Active", "Action"],
    ["2", "Developer", "dev@example.com", "Limited", "Active", "Action"],
  ])}${OPS.mode === "proposed" ? changeNote("Admin is renamed Admin Users for clearer staff-user ownership.") : originalNote("Original Admin label is terse and mixes users and roles.")}</section>`;
}

function storeWorkspacePage() {
  return `<section class="page">${pageHead("Store Workspace » Konala", ["Save", "Save & Back", "Back"])}${tabStrip(["View", "Edit", "Customers", "Products", "Markup", "Addresses", "Credit Summary", "Site Builder", "Alerts & Notifications", "Store Fields"])}<div class="grid two"><div>${panel("Store Details", formRows(["Store Name", "User", "URL Type", "Directory Name", "Status"]))}${panel("Store-Level Site Builder", "<p>Pages, Links & Menus, Sidebar Management, Themes, Account Pages, Product Layout Builder, Product Showcase, Asset Manager, Help Media, SEO, FAQs, and Testimonials are locked to this store.</p>")}</div><div>${panel("Settings", formRows(["Markup Type", "Markup Master", "Department", "Quick Checkout", "Allowed Domains"]))}${panel("Store-Level Alerts", "<p>Email Templates, SMS Templates, and Alert Automations use the selected store context and do not require hunting through global menus.</p>")}</div></div>${changeNote("Store context keeps focused tools beside the selected store while broad/global tools stay in their global areas.")}</section>`;
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
  return tabStrip(["Pages", "Links & Menus", "Sidebar", "Themes", "Account Pages", "Product Layout Builder", "Content Management"]);
}

function fastFilters(items) {
  return `<div class="fast-filters">${items.map(item => `<button>${h(item)}</button>`).join("")}</div>`;
}

function tabStrip(items) {
  return `<div class="subtabs">${items.map((item, index) => `<button class="${index === 0 ? "active" : ""}">${h(item)}</button>`).join("")}</div>`;
}

function dataTable(headers, rows) {
  return `<div class="table-card"><table><thead><tr>${headers.map(head => `<th>${h(head)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function routeSummary() {
  const mode = OPS.mode === "proposed" ? "Proposed" : "Current OPS";
  return `${mode} route for ${h(pageTitle())}. This subpage is locally rendered from the simulator route registry and does not depend on live OPS, PHP, sanitized captures, or iframe content.`;
}

function routeNote() {
  return OPS.mode === "proposed" ? changeNote(routeSummary()) : originalNote(routeSummary());
}

function changeNote(text) {
  return `<div class="note proposed-note"><b>Proposed change:</b> ${text}</div>`;
}

function originalNote(text) {
  return `<div class="note current-note"><b>Current OPS:</b> ${text}</div>`;
}

function proposedDashboard() {
  const rows = [
    ["Print Products + Ready To Buy Products", "Product Catalog", "One list with product type tags and directed Add buttons"],
    ["List Orders + Payment Request + Unpaid + Archive", "Orders", "One master list with fast filters"],
    ["Business Partners + Quote Management vendor screens", "Vendors & Partners", "Vendor Quotes, Vendors, and Sales Agents belong together"],
    ["Content Management + Store Personalization", "Site Builder", "Pages, menus, themes, account pages, content groups, and asset references belong together"],
    ["Media Gallery + hidden CMS image manager", "Asset Manager / Help Media", "Asset folders, external links, tags, and help media are separated clearly"],
    ["Email/SMS + Email Reminders", "Alerts & Notifications", "Templates and automations move into one notification area"],
    ["Export/API Orders", "Export & API", "Global system settings should not live under Orders only"],
    ["Imposition Beta", "Product Imposition", "Use current product terminology"],
  ];
  return `<section class="page">${pageHead("Dashboard", ["Review Email log", "Mark as Resolved"])}<div class="cards"><div class="metric"><b>116</b><span>baseline screens</span></div><div class="metric"><b>6</b><span>major IA revisions</span></div><div class="metric"><b>3</b><span>store-context systems</span></div><div class="metric"><b>0</b><span>backend writes</span></div></div>${panel("Revision Map", `<table><thead><tr><th>Current area</th><th>Proposed area</th><th>Reason</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table>`)}</section>`;
}

function pageHead(title, actions) {
  return `<div class="page-head"><h1 class="page-title">${h(title)}</h1><div>${actions.map(a => `<button>${h(a)}</button>`).join("")}</div></div>`;
}

function filters(items) {
  return `<div class="filters">${items.map(i => i.includes("Selected") ? `<button>${h(i)} <span class="fa fa-angle-down"></span></button>` : `<input placeholder="${h(i)}">`).join("")}<button class="search-btn">Search</button><button class="link-btn">Reset</button></div>`;
}

function formRows(items) {
  return `<div class="form">${items.map(i => `<label><span>${h(i)}</span><input></label>`).join("")}<label><span>Status</span><span class="toggle on"></span></label></div>`;
}

function render() {
  document.getElementById("app").innerHTML = app();
}

document.addEventListener("click", event => {
  const mode = event.target.closest("[data-mode]")?.dataset.mode;
  if (mode) {
    OPS.mode = mode;
    OPS.page = "dashboard";
    OPS.openMenu = "dashboard";
    OPS.openChild = "";
    render();
    return;
  }

  const menu = event.target.closest("[data-menu]")?.dataset.menu;
  if (menu) {
    const clicked = [...(OPS.mode === "current" ? currentMenu : proposedMenu)].find(item => item.id === menu);
    OPS.openMenu = OPS.openMenu === menu ? "" : menu;
    OPS.openChild = "";
    if (clicked?.page) OPS.page = clicked.page;
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
  }
  render();
});

function isActiveGroupForPage(group, page) {
  return group.page === page || (group.children || []).some(child => child.page === page || (child.children || []).some(grand => grand.page === page));
}

render();
