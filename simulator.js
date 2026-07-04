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
    { label: "Master Orders", page: "orders" },
    { label: "Payment Requests", page: "payment-request" },
    { label: "Job Board", page: "job-board" },
    { label: "Status & Filters", page: "order-status" },
  ] },
  { id: "quotes", label: "Quotes", icon: icon.quotes, children: [
    { label: "Customer Quotes", page: "quotes" },
    { label: "Quote Status", page: "quote-status" },
  ] },
  { id: "customers", label: "Customer Accounts", icon: icon.customers, children: [
    { label: "Customers", page: "customers" },
    { label: "Newsletter", page: "newsletter" },
    { label: "Design Proofs", page: "design-proofs" },
  ] },
  { id: "stores", label: "Store Management", icon: icon.stores, children: [
    { label: "Stores", page: "stores" },
    { label: "Store Fields", page: "store-fields" },
    { label: "Store Workspace", page: "store-workspace" },
  ] },
  { id: "catalog", label: "Product Catalog", icon: icon.products, children: [
    { label: "Products", page: "product-catalog" },
    { label: "Product Options", page: "product-options" },
    { label: "Categories", page: "product-categories" },
    { label: "Category Groups", page: "category-groups" },
    { label: "Page Categories", page: "page-categories" },
    { label: "Pricing", page: "product-price" },
  ] },
  { id: "templates", label: "Templates", icon: icon.templates, children: [
    { label: "Product Templates", page: "templates" },
    { label: "PDF Blocks", page: "pdf-blocks" },
    { label: "Art Layouts", page: "art-layouts" },
    { label: "Template Categories", page: "template-categories" },
  ] },
  { id: "content", label: "Content & Help Media", icon: icon.content, children: [
    { label: "CMS Pages", page: "cms-pages" },
    { label: "Help Media", page: "help-media" },
    { label: "FAQs", page: "faqs" },
    { label: "Banners", page: "banners" },
    { label: "Email/SMS", page: "email-templates" },
  ] },
  { id: "seo", label: "SEO", icon: icon.seo, children: [
    { label: "Global SEO", page: "seo-global" },
    { label: "Product SEO", page: "product-seo" },
    { label: "Category SEO", page: "category-seo" },
    { label: "Content SEO", page: "content-seo" },
    { label: "Redirects", page: "redirects" },
  ] },
  { id: "partners", label: "Vendors & Partners", icon: icon.partners, children: [
    { label: "Vendor Quotes", page: "vendor-quotes" },
    { label: "Vendors", page: "vendors" },
    { label: "Sales Agents & Partners", page: "sales-agents" },
  ] },
  { id: "api", label: "Export, API & Webhooks", icon: icon.api, children: [
    { label: "Order Exports", page: "export-api-orders" },
    { label: "API & Webhooks", page: "api-webhooks" },
  ] },
  { id: "config", label: "Store Configuration", icon: icon.config, children: [
    { label: "Site Settings", page: "site-settings" },
    { label: "Languages", page: "languages" },
    { label: "Payments", page: "payments" },
    { label: "Shipping", page: "shipping" },
    { label: "Admin Panel Text References", page: "admin-text" },
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
        <span class="fa-stack fa-md pr-2 d-inline-block" title="Admin">
          <span class="ops-home-line fa-stack-2x"></span>
          <i class="fas fa-user-alt fa-stack-1x fa-lg"></i>
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
  if (OPS.page === "orders") return ordersPage();
  if (OPS.page === "quotes") return quotesPage();
  if (OPS.page === "print-products" || OPS.page === "ready-products" || OPS.page === "product-catalog") return productPage();
  if (OPS.page === "stores") return storesPage();
  if (OPS.page === "export-api-orders" || OPS.page === "api-webhooks") return apiPage();
  if (OPS.page === "cms-pages" || OPS.page === "media-gallery" || OPS.page === "help-media") return contentPage();
  return genericPage(pageTitle());
}

function dashboard() {
  if (OPS.mode === "proposed") return proposedDashboard();
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
  return `<button class="tile ${tone}" data-page="${label === "Orders" ? "orders" : label === "Quotes" ? "quotes" : label === "Products" ? "print-products" : "dashboard"}"><span class="fa fa-${ico}"></span><span>${label}</span></button>`;
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
  return `<section class="page">${pageHead("List Orders", ["Payment Request", "Job Board", "Order Shipment"])}${filters(["Search:", "Company Name", "Order Date", "From", "To", "13 Selected"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Order Details</th><th>Customer</th><th>Products</th><th>Status</th><th>Action</th></tr></thead><tbody>${orders.map(o => `<tr><td><a>${o[0]}</a></td><td><b>${o[1]}</b><br>${o[3]}<br><small>${o[4]}</small></td><td><a>${o[5]}</a><br><small>${o[6]}</small></td><td>${o[7].join("<br>")}</td><td><span class="toggle off"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div></section>`;
}

function quotesPage() {
  return `<section class="page">${pageHead("Quotes", ["Add", "Import"])}${filters(["Search", "Quote Status", "Date"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Quote Details</th><th>Customer</th><th>Products</th><th>Status</th><th>Action</th></tr></thead><tbody>${quotes.map(q => `<tr><td><a>${q[0]}</a></td><td>${q[2]}<br><small>${q[3]}</small></td><td><a>${q[4]}</a><br><small>${q[5]}</small></td><td>${q[6].join("<br>")}</td><td><span class="badge">${q[1]}</span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div></section>`;
}

function productPage() {
  return `<section class="page">${pageHead(OPS.mode === "proposed" ? "Product Catalog" : pageTitle(), ["Add", "Import Products", "Related Product", "Manage Stock", "Publish"])}${filters(["Search", "Product Category", "Select Store", "Price Category"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Images</th><th>Product Details</th><th>Configuration</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead><tbody>${products.map(p => `<tr><td><a>${p[0]}</a></td><td><div class="thumb"></div></td><td><a>${p[1]}</a><br><small>${p[2]}</small></td><td>${p[3]}<br>Price Category : ${p[4]}</td><td>0</td><td><span class="toggle ${p[5] === "On" ? "on" : "off"}"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div></section>`;
}

function storesPage() {
  const rows = [["1", "Demo Store", "johnDoe@graphxcpi.com"], ["2", "Konala", "rdickson@alphagraphics.com"], ["3", "Socure", "rdickson+socure@alphagraphics.com"]];
  return `<section class="page">${pageHead("Stores", ["Add", "Import Department", "Duplicate Store Data", "Markup Master", "Store Settings Templates"])}${filters(["Search"])}<div class="table-card"><table><thead><tr><th>Sr#</th><th>Logo</th><th>Store Details</th><th>Settings</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td><div class="thumb logo"></div></td><td><a>${r[1]}</a><br>${r[2]}<br>Username : ${r[2]}</td><td>Department : No<br>Quick Checkout : No<br>Show Price To Customer : Yes</td><td><span class="toggle on"></span></td><td><button>Action</button></td></tr>`).join("")}</tbody></table></div></section>`;
}

function apiPage() {
  return `<section class="page">${pageHead(OPS.mode === "proposed" ? "Export, API & Webhooks" : "Export/API Orders", ["Export", "Manual Transfer", "Export/API Settings"])}<div class="grid two"><div>${filters(["Order Range", "Date Range", "Order Status"])}${panel("Order Exports", "<p>Export style, export format, hot folder, and manual transfer controls live here.</p>")}</div><div>${panel("API & Webhooks", "<p>Global API credentials, webhook event options, and future context-aware API questions for B2C, B2B, and franchise/reseller stores.</p>")}</div></div></section>`;
}

function contentPage() {
  const media = OPS.page === "help-media" || OPS.page === "media-gallery";
  return `<section class="page">${pageHead(media ? (OPS.mode === "proposed" ? "Help Media" : "Media Gallery") : "Contents", ["Add", "Upload", "New Folder"])}<div class="grid two"><div>${panel(media ? "Image Manager" : "CMS Pages", media ? mediaGrid() : "<p>Homepage & Fixed Content, Dynamic Pages, Category pages, FAQs, banners, and testimonials.</p>")}</div><div>${panel("Improvements", "<p>Folder organization, external media links, audio/video references, image tagging, and content-context ownership.</p>")}</div></div></section>`;
}

function mediaGrid() {
  return `<div class="media-grid">${["1__1.png","1.jpg","17 Year Printing.png","2__1.png","20230627_114339.jpg","2ctmedia_logo.webp","3__1.png","4.jpg","Adam_Bostrom.jpg"].map(name => `<div><div class="media-thumb"></div><span>${name}</span><small>06-04-2026</small></div>`).join("")}</div>`;
}

function genericPage(title) {
  return `<section class="page">${pageHead(title, ["Add", "Save", "Reset"])}${filters(["Search", "Status", "Store"])}<div class="grid two"><div>${panel(`${title} Details`, formRows(["Name", "Type", "Status", "Sort", "Description"]))}</div><div>${panel("Current OPS Reference", "<p>This simulator page is rebuilt locally from the OPS admin structure. It is not loading PHP, captured HTML, or live async widgets.</p>")}</div></div></section>`;
}

function proposedDashboard() {
  const rows = [
    ["Print Products + Ready To Buy Products", "Product Catalog", "One list with product type tags and directed Add buttons"],
    ["List Orders + Payment Request + Unpaid + Archive", "Orders", "One master list with fast filters"],
    ["Business Partners + Quote Management vendor screens", "Vendors & Partners", "Vendor Quotes, Vendors, and Sales Agents belong together"],
    ["Media Gallery + hidden CMS image manager", "Content & Help Media", "Asset folders, links, and tags"],
    ["Export/API Orders", "Export, API & Webhooks", "Global system settings should not live under Orders only"],
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
