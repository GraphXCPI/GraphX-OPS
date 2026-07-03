const capture = window.OPS_CAPTURE;

const currentMenu = [
  { label: "Dashboard", icon: "▣", pages: ["115-welcome"] },
  { label: "Orders", icon: "□", pages: ["046-order_listing", "047-order_payment_request", "016-create_order_user", "025-export_orders", "044-order_process", "048-order_pending_listing", "045-order_archive_listing"] },
  { label: "Quote Management", icon: "◇", pages: ["065-quote_listing", "066-quote_product_printer_listing", "067-quote_status_listing"] },
  { label: "Customer", icon: "○", pages: ["114-user_listing", "103-subscriber_listing", "113-user_designs", "019-design_proofs_listing"] },
  { label: "Store Management", icon: "▤", pages: ["012-corporate_listing", "013-corporate_store_profile_listing"] },
  { label: "Products", icon: "◇", pages: ["056-product_listing", "049-predefined_product_listing", "057-product_master_option_listing", "054-product_category_listing", "061-product_weight", "104-tax_listing", "058-product_price_all", "060-product_price_bulk_update"] },
  { label: "Templates", icon: "▥", pages: ["106-template_manager", "107-template_manager-717761", "018-design_layout_listing", "040-master_template_manager", "108-template_properties_master", "105-template_category_listing"] },
  { label: "Content Management", icon: "▧", pages: ["007-cms_listing", "026-faq_listing", "109-testimonial_listing", "111-top_banner_listing", "023-emailtemplate_listing", "035-sms_notification_listing", "024-emailtemplate_reminder_listing", "041-media_gallery_listing"] },
  { label: "Store Personalization", icon: "⚙", pages: ["055-product_info_layout_listing", "037-language_constant_action", "042-menulink_listing", "095-sidebar_management", "096-sidebar_widget", "064-promotional_listing", "110-theme_listing"] },
  { label: "SEO", icon: "◎", pages: ["091-seo_all", "097-sitemap_xml", "043-metatag", "089-robot_creation", "112-url_redirection_listing", "093-seo_image_alt_text"] },
  { label: "Business Partners", icon: "✥", pages: ["052-printer_listing", "092-sales_agent_listing"] },
  { label: "Store Configuration", icon: "⚙", pages: ["010-configuration_settings", "036-language_listing", "015-currency_listing", "014-country_listing", "038-manage_image_optimization", "006-block_ip_action", "039-manage_web_storage", "037-manage_form_listing", "009-configuration_payment_listing", "011-configuration_shipping_listing", "104-tax_listing", "008-configuration_external_service_listing", "002-admin_constants"] },
  { label: "Imposition Beta", icon: "▦", pages: ["031-imposition_sheet_size_listing", "030-imposition_schema_listing", "028-imposition_impose_job", "032-imposition_symbol_listing", "029-imposition_products_schema_setting"] },
  { label: "Designer Studio", icon: "✎", pages: ["098-studio_configuration_setting", "102-studio_language_constant_action", "099-studio_color_setting_listing", "100-studio_css_setting_action", "050-predefined_quote_listing", "063-products_studio_models_listing", "051-preview_image_settings", "020-designer_image_gallery_listing", "021-designer_imagecategory_listing", "022-designer_studio_font_listing"] },
  { label: "Reports", icon: "☰", pages: ["084-report_sales_order", "085-report_sales_orderdetails", "083-report_sales_order_product_details", "074-report_payment_request", "087-report_shipping_summary", "088-report_tax_summary", "071-report_coupon_summary", "086-report_sales_quote_summary", "081-report_products_sales", "073-report_inventory_request", "078-report_product_stock_summary", "072-report_customer_order_summary", "075-report_payon_account", "070-report_customers", "076-report_printer_commission", "077-report_printer_order_summary", "082-report_sales_agent_commission", "079-report_production_day_summary", "080-report_production_time_spent", "068-report_audit_log"] },
  { label: "Admin", icon: "♙", pages: ["004-admin_listing", "003-admin_group"] }
];

const revisedMenu = [
  { label: "Dashboard", icon: "▣", view: "dashboard" },
  { label: "Orders", icon: "□", view: "orders", children: ["Master Orders", "Payment Requests", "Job Board", "Status & Filters"] },
  { label: "Quotes", icon: "◇", view: "quotes", children: ["Customer Quotes", "Quote Status"] },
  { label: "Customer Accounts", icon: "○", view: "customers", children: ["Customers", "Newsletter", "Design Proofs"] },
  { label: "Store Management", icon: "▤", view: "stores", children: ["Stores", "Store Fields", "Store Workspace"] },
  { label: "Product Catalog", icon: "◇", view: "catalog", children: ["Products", "Product Options", "Categories", "Category Groups", "Page Categories", "Pricing"] },
  { label: "Templates", icon: "▥", view: "templates", children: ["Product Templates", "PDF Blocks", "Art Layouts", "Template Categories"] },
  { label: "Content & Help Media", icon: "▧", view: "content", children: ["CMS Pages", "Help Media", "FAQs", "Banners", "Email/SMS"] },
  { label: "SEO", icon: "◎", view: "seo", children: ["Global SEO", "Product SEO", "Category SEO", "Content SEO", "Redirects"] },
  { label: "Vendors & Partners", icon: "✥", view: "partners", children: ["Vendor Quotes", "Vendors", "Sales Agents & Partners"] },
  { label: "Export, API & Webhooks", icon: "⇄", view: "api", children: ["Order Exports", "API & Webhooks"] },
  { label: "Store Configuration", icon: "⚙", view: "config", children: ["Site Settings", "Languages", "Payments", "Shipping", "Admin Panel Text References"] },
  { label: "Product Imposition", icon: "▦", view: "imposition", children: ["Sheet Sizes", "Schemas", "Impose Job", "Product Schema Settings"] },
  { label: "Designer Studio", icon: "✎", view: "studio", children: ["Studio Settings", "Language Text", "Images", "Fonts"] },
  { label: "Reports & System Logs", icon: "☰", view: "reports", children: ["Sales Reports", "Production Reports", "Inventory Reports", "System Logs"] },
  { label: "Admin Users", icon: "♙", view: "admin", children: ["Users", "Roles"] }
];

const state = {
  mode: "revised",
  currentPage: "115-welcome",
  currentView: "dashboard",
  search: "",
  selectedStore: "All Store",
  activeStoreTab: "Overview",
  activeApiTab: "Order Exports",
  activeCatalogFilter: "All"
};

function page(slug) {
  return capture.pages.find(p => p.slug === slug) || capture.key[slug];
}

function key(slug) {
  return capture.key[slug] || page(slug);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[ch]));
}

function short(text, max = 140) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

function pathName(hrefOrPath) {
  try { return new URL(hrefOrPath).pathname; } catch { return hrefOrPath || ""; }
}

function allRows(slug) {
  const p = key(slug);
  return (p?.tables || []).flatMap(t => t.sampleRows || []);
}

function firstTable(slug) {
  const p = key(slug);
  return (p?.tables || []).find(t => (t.headers || []).length) || { headers: [], sampleRows: [] };
}

function routeLink(slug) {
  return `../ops-admin-deconstruction-2026-07-03/html-sanitized/${slug}.html`;
}

function appShell(content) {
  const menu = state.mode === "baseline" ? currentMenu : revisedMenu;
  return `
    <div class="app">
      ${topbar()}
      <div class="main">
        <aside class="sidebar">
          <div class="quick-rail">
            <button>□</button><button>○</button><button>◇</button><button>▥</button><button>⚙</button>
          </div>
          ${menu.map(renderMenuGroup).join("")}
        </aside>
        <section class="content">
          ${breadcrumb()}
          ${toolbar()}
          ${content}
        </section>
      </div>
    </div>
  `;
}

function topbar() {
  return `
    <header class="topbar">
      <div class="brand"><span class="home-mark"></span><span>GX-002</span></div>
      <div class="searchbar"><input value="${esc(state.search)}" data-action="search" placeholder="Search here....."><button data-action="search-click">⌕</button><button>▯</button></div>
      <div class="utility">
        <span class="cache">Cache&nbsp; <span class="status on">YES</span></span>
        <div class="mode-switch">
          <button data-mode="baseline" class="${state.mode === "baseline" ? "active" : ""}">Current OPS</button>
          <button data-mode="revised" class="${state.mode === "revised" ? "active" : ""}">Proposed</button>
        </div>
        <div class="user">Welcome,<br>gx002_admin ▾</div>
      </div>
    </header>
  `;
}

function breadcrumb() {
  const title = state.mode === "baseline" ? (page(state.currentPage)?.label || "Dashboard") : (revisedMenu.find(m => m.view === state.currentView)?.label || "Dashboard");
  return `<div class="breadcrumb">⌂ <span>Home</span> › <span>${esc(title)}</span></div>`;
}

function toolbar() {
  return `
    <div class="toolbar">
      <label><input type="radio" name="store-mode"> Filter by Store</label>
      <label><input type="radio" name="store-mode" checked> Login As</label>
      <select data-action="store-select"><option>gx002_admin</option><option>Demo Store</option><option>Konala</option><option>Socure</option></select>
      <button class="btn light">⛶</button>
    </div>
  `;
}

function renderMenuGroup(group) {
  const active = state.mode === "baseline" ? group.pages?.includes(state.currentPage) : group.view === state.currentView;
  const childItems = state.mode === "baseline"
    ? group.pages.map(slug => page(slug)).filter(Boolean).map(p => `<button class="nav-item ${state.currentPage === p.slug ? "active" : ""}" data-page="${p.slug}">${esc(p.label)}</button>`).join("")
    : (group.children || []).map(c => `<button class="nav-item ${active && c === group.children?.[0] ? "active" : ""}" data-view="${group.view}">${esc(c)}</button>`).join("");
  return `
    <div class="nav-group">
      <button class="nav-title ${active ? "active" : ""}" ${state.mode === "baseline" ? `data-page="${group.pages[0]}"` : `data-view="${group.view}"`}>
        <span><span class="nav-icon">${group.icon}</span>${esc(group.label)}</span><span>⌄</span>
      </button>
      <div class="nav-items">${childItems}</div>
    </div>
  `;
}

function pageHeader(title, actions = []) {
  return `
    <div class="page-title-row">
      <h1>${esc(title)}</h1>
      <div class="actions">${actions.map(a => `<button class="btn ${a.kind || ""}">${esc(a.label)}</button>`).join("")}</div>
    </div>
  `;
}

function tabs(labels, active = labels[0], action = "") {
  return `<div class="tabs">${labels.map(label => `<button class="tab ${label === active ? "active" : ""}" ${action ? `data-${action}="${esc(label)}"` : ""}>${esc(label)}</button>`).join("")}</div>`;
}

function panel(title, body) {
  return `<section class="panel"><div class="panel-title"><span>${esc(title)}</span><span>⌃</span></div><div class="panel-body">${body}</div></section>`;
}

function dataTable(headers, rows, opts = {}) {
  if (!headers.length) return `<div class="empty">No records found</div>`;
  const limitedRows = (rows || []).length ? rows : [["No records found"]];
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map(h => `<th>${esc(h || "")}</th>`).join("")}</tr></thead>
        <tbody>
          ${limitedRows.slice(0, opts.limit || 12).map(row => `<tr>${headers.map((_, i) => `<td>${formatCell(row[i], headers[i])}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function formatCell(value, header = "") {
  const v = esc(short(value || "", 420));
  if (/status/i.test(header)) return v.includes("1") || /active|completed|paid/i.test(v) ? `<span class="status on">${v === "1" ? "Active" : v}</span>` : `<span class="status off">${v || "Inactive"}</span>`;
  if (/action/i.test(header)) return `<button class="btn light">Action ▾</button>`;
  return v;
}

function filters(fields) {
  return `<div class="filters">${fields.map(f => f.type === "select" ? `<select><option>${esc(f.label)}</option></select>` : `<input placeholder="${esc(f.label)}">`).join("")}<button class="btn">Search</button><button class="btn light">Reset</button></div>`;
}

function baselinePage() {
  const p = page(state.currentPage) || capture.pages[0];
  const table = (p.tables || [])[0] || { headers: [], sampleRows: [] };
  const form = (p.forms || [])[0];
  return `
    <main class="page">
      ${pageHeader(p.title?.replace(/^Admin ::\s*/, "") || p.label, [
        { label: "Source HTML", kind: "light" },
        { label: "Model JSON", kind: "gray" }
      ])}
      ${p.tabs?.length ? tabs(p.tabs.map(t => t.text).filter(Boolean).slice(0, 8), p.tabs.find(t => t.active)?.text || p.tabs[0].text) : ""}
      <div class="info">Baseline contract pulled from <code>${esc(pathName(p.href))}</code>. This view renders captured labels, panels, forms, buttons, table headers, and representative live rows.</div>
      <div class="split">
        <div>
          ${filters([{label:"Search"}, {label:"Select Store", type:"select"}, {label:"Status", type:"select"}])}
          ${panel("Captured Table", dataTable(table.headers || [], table.sampleRows || []))}
          ${panel("Captured Buttons", `<div>${(p.buttons || []).filter(b => b.text).slice(0, 18).map(b => `<span class="pill">${esc(short(b.text, 35))}</span>`).join("") || "No visible buttons captured."}</div>`)}
        </div>
        <aside class="drawer">
          <h3>Page Model</h3>
          <p><strong>Route:</strong> <a class="html-link" href="${routeLink(p.slug)}">${esc(pathName(p.href))}</a></p>
          <p><strong>Forms:</strong> ${(p.forms || []).length} &nbsp; <strong>Tables:</strong> ${(p.tables || []).length}</p>
          <p><strong>Headings:</strong></p>
          <div class="mini-list">${(p.headings || []).slice(0, 6).map(h => `<div>${esc(h)}</div>`).join("") || "<div>No headings captured</div>"}</div>
          ${form ? `<h3>Primary Form</h3><div class="mini-list">${form.fields.slice(0, 10).map(f => `<div>${esc(f.label || f.name || f.type || f.tag)} <span class="pill">${esc(f.value || f.placeholder || "")}</span></div>`).join("")}</div>` : ""}
        </aside>
      </div>
    </main>
  `;
}

function revisedPage() {
  const view = state.currentView;
  if (view === "orders") return revisedOrders();
  if (view === "catalog") return revisedCatalog();
  if (view === "stores") return revisedStores();
  if (view === "content") return revisedContent();
  if (view === "api") return revisedApi();
  if (view === "partners") return revisedPartners();
  if (view === "quotes") return revisedQuotes();
  if (view === "config") return revisedConfig();
  if (view === "seo") return revisedSeo();
  if (view === "imposition") return genericRevised("Product Imposition", ["Sheet Sizes", "Schemas", "Impose Job", "Product Schema Settings"], ["031-imposition_sheet_size_listing", "030-imposition_schema_listing", "028-imposition_impose_job", "029-imposition_products_schema_setting"]);
  if (view === "reports") return genericRevised("Reports & System Logs", ["Sales Reports", "Production Reports", "Inventory Reports", "System Logs"], ["084-report_sales_order", "079-report_production_day_summary", "078-report_product_stock_summary", "068-report_audit_log"]);
  if (view === "admin") return genericRevised("Admin Users", ["Users", "Roles"], ["004-admin_listing", "003-admin_group"]);
  if (view === "customers") return genericRevised("Customer Accounts", ["Customers", "Newsletter", "Design Proofs"], ["114-user_listing", "103-subscriber_listing", "019-design_proofs_listing"]);
  if (view === "templates") return genericRevised("Templates", ["Product Templates", "PDF Blocks", "Art Layouts", "Template Categories"], ["106-template_manager", "107-template_manager-717761", "018-design_layout_listing", "105-template_category_listing"]);
  if (view === "studio") return genericRevised("Designer Studio", ["Studio Settings", "Language Text", "Images", "Fonts"], ["098-studio_configuration_setting", "102-studio_language_constant_action", "020-designer_image_gallery_listing", "022-designer_studio_font_listing"]);
  return revisedDashboard();
}

function revisedDashboard() {
  return `
    <main class="page">
      ${pageHeader("Dashboard", [{label:"Review Email log", kind:"green"}, {label:"Mark as Resolved", kind:"light"}])}
      <div class="cards">
        <div class="metric"><strong>116</strong>captured baseline screens</div>
        <div class="metric"><strong>6</strong>major IA revisions modeled</div>
        <div class="metric"><strong>3</strong>store-context systems promoted</div>
        <div class="metric"><strong>0</strong>write actions in simulator</div>
      </div>
      <div class="workflow-grid">
        <div class="flow-card"><h3>Baseline parity</h3><p>Current OPS routes, labels, tables, and controls are available in the Current OPS mode.</p></div>
        <div class="flow-card"><h3>Revised navigation</h3><p>The proposed mode flattens fragmented areas and puts context-sensitive controls beside the store, product, content, and order workflows.</p></div>
        <div class="flow-card"><h3>Functional reference</h3><p>Live reference rows and field names are preserved so discussions can stay grounded in actual OPS behavior.</p></div>
      </div>
      ${panel("Revision Map", dataTable(["Current area", "Proposed area", "Reason"], [
        ["Print Products + Ready To Buy Products", "Product Catalog", "One list with product type tags and directed Add buttons"],
        ["List Orders + Payment Request + Unpaid + Archive", "Orders", "One master list with fast filters instead of fragmented order context"],
        ["Business Partners + Quote Management vendor screens", "Vendors & Partners", "Vendor Quotes, Vendors, and Sales Agents & Partners belong together"],
        ["Media Gallery + hidden CMS image manager", "Content & Help Media", "Rename and improve asset management with folders, external links, and tagging"],
        ["Export/API Orders", "Export, API & Webhooks", "Global system settings should not live under Orders only"],
        ["Imposition Beta", "Product Imposition", "Use current product terminology"]
      ]))}
    </main>
  `;
}

function revisedOrders() {
  const order = firstTable("046-order_listing");
  const payment = firstTable("047-order_payment_request");
  const archive = firstTable("045-order_archive_listing");
  const rows = [...(order.sampleRows || []), ...(payment.sampleRows || []), ...(archive.sampleRows || [])]
    .filter(r => /^\d{3,}/.test(String(r[0] || "")));
  return `
    <main class="page">
      ${pageHeader("Orders", [{label:"Add Order", kind:"green"}, {label:"Payment Request", kind:"purple"}, {label:"Export", kind:"gray"}])}
      ${tabs(["Master Orders", "Payment Requests", "Job Board", "Archive", "Status Setup"], "Master Orders")}
      <div class="info">Unpaid and Archive become fast filters on the master list. Payment Requests stay available without breaking order context.</div>
      ${filters([{label:"Search order/customer"}, {label:"Store", type:"select"}, {label:"Payment State", type:"select"}, {label:"Production Status", type:"select"}, {label:"Archived", type:"select"}])}
      ${panel("Master Order List", dataTable(["ID", "Order Details", "Date / Amount", "Due Dates", "Status", "Actions"], rows.map(r => [
        r[0],
        r[1] || r[2],
        r[2] || r[3],
        r[3] || r[4],
        normalizeOrderStatus(r),
        "View / Shipment / Payment / Archive"
      ]), {limit: 9}))}
    </main>
  `;
}

function revisedCatalog() {
  const printRows = firstTable("056-product_listing").sampleRows || [];
  const readyRows = firstTable("049-predefined_product_listing").sampleRows || [];
  const categoryRows = firstTable("054-product_category_listing").sampleRows || [];
  const optionRows = firstTable("057-product_master_option_listing").sampleRows || [];
  const rows = [
    ...printRows.map(r => ["Print Product", r[0], productName(r), productConfig(r), "Product", productStatus(r)]),
    ...readyRows.map(r => ["Ready To Buy", r[0], productName(r), productConfig(r), "Product", productStatus(r)]),
    ...categoryRows.map(r => ["Category", r[0], r[2] || r[1], r[3] || "", "Category", productStatus(r)]),
    ...optionRows.map(r => ["Option", r[0], short(r[1], 180), r[3] || r[2], "Primitive", productStatus(r)])
  ];
  return `
    <main class="page">
      ${pageHeader("Product Catalog", [{label:"Add Print Product", kind:"green"}, {label:"Add Ready To Buy", kind:"green"}, {label:"Add Product Option", kind:"gray"}, {label:"Add Category", kind:"purple"}])}
      ${tabs(["Products", "Product Options", "Categories", "Category Groups", "Page Categories", "Pricing"], "Products")}
      <div class="info">Combines split product types into one list, adds type tags, and keeps directed add actions so users land on the proper existing workflow.</div>
      ${filters([{label:"Search products"}, {label:"Product Type", type:"select"}, {label:"Category", type:"select"}, {label:"Store Availability", type:"select"}, {label:"Status", type:"select"}])}
      ${panel("Unified Product Catalog", dataTable(["Type", "ID", "Name / Details", "Configuration", "Context", "Status"], rows, {limit: 14}))}
    </main>
  `;
}

function normalizeOrderStatus(row) {
  const joined = row.join(" ");
  if (/Unpaid/i.test(joined)) return "Unpaid";
  if (/Paid/i.test(joined)) return "Paid";
  if (/Order Completed/i.test(joined)) return "Order Completed";
  if (/In Production/i.test(joined)) return "In Production";
  if (/New Order/i.test(joined)) return "New Order";
  return "Active";
}

function productStatus(row) {
  const value = row[row.length - 2];
  if (String(value).trim() === "1") return "Active";
  if (String(value).trim() === "0") return "Inactive";
  return value || "Draft";
}

function productName(row) {
  if (row.length >= 7) return row[2] || row[1] || row[0];
  return row[1] || row[2] || row[0];
}

function productConfig(row) {
  const value = row.length >= 7 ? row[3] || row[2] || "" : row[2] || row[3] || "";
  return String(value).trim().toLowerCase() === "wait" ? "Captured pricing / rules" : value;
}

function revisedStores() {
  const table = firstTable("012-corporate_listing");
  return `
    <main class="page">
      ${pageHeader("Store Management", [{label:"Add Store", kind:"green"}, {label:"Duplicate Store Data", kind:"gray"}, {label:"Markup Master", kind:"purple"}])}
      ${tabs(["Overview", "Edit", "Customers", "Products", "Markup", "Addresses", "Credit Summary", "Configuration", "Store Fields", "Help Media", "SEO"], state.activeStoreTab, "store-tab")}
      <div class="info">Markup Master remains globally accessible while store-specific Markup assignment is locked into Store context. CMS/help media and SEO are also exposed where the user is already working.</div>
      <div class="split">
        <div>${panel("Stores", dataTable(table.headers, table.sampleRows, {limit: 8}))}</div>
        <aside class="drawer">
          <h3>Store Context Workspace</h3>
          <div class="mini-list">
            <div><strong>Markup</strong><br>Assign a markup template to this store. Markup Master opens the global template list/builder.</div>
            <div><strong>Help Media</strong><br>Store-scoped help assets, folders, external media links, and tagging.</div>
            <div><strong>SEO</strong><br>Store-level SEO plus links into product/category/content SEO.</div>
            <div><strong>Future addendum</strong><br>Additional B2B store pages can be promoted in a later request.</div>
          </div>
        </aside>
      </div>
    </main>
  `;
}

function revisedContent() {
  const cms = firstTable("007-cms_listing");
  const media = firstTable("041-media_gallery_listing");
  return `
    <main class="page">
      ${pageHeader("Content & Help Media", [{label:"Add CMS Page", kind:"green"}, {label:"Add Media", kind:"green"}, {label:"New Folder", kind:"gray"}])}
      ${tabs(["CMS Pages", "Help Media", "FAQs", "Banners", "Email/SMS"], "Help Media")}
      <div class="info">Media Gallery is renamed Help Media and expanded into asset management: folders, external audio/video links, image tagging, and contextual attachment to stores, products, categories, and content pages.</div>
      <div class="split">
        ${panel("CMS Pages", dataTable(cms.headers, cms.sampleRows, {limit: 7}))}
        ${panel("Help Media Assets", dataTable(media.headers, media.sampleRows, {limit: 7}))}
      </div>
    </main>
  `;
}

function revisedApi() {
  return `
    <main class="page">
      ${pageHeader("Export, API & Webhooks", [{label:"Save", kind:"green"}, {label:"Test Connection", kind:"gray"}])}
      ${tabs(["Order Exports", "API & Webhooks"], state.activeApiTab, "api-tab")}
      <div class="info">This area is global today. The spec should ask the team to evaluate context-aware API and webhook behavior for B2C, B2B, and Franchise/Reseller stores.</div>
      <div class="split">
        ${panel("Order Exports", `
          <div class="form-grid">
            <label>Export Style</label><select><option>Separate files per order</option></select>
            <label>Export Format</label><select><option>XML</option><option>CSV</option><option>JSON</option></select>
            <label>Hot Folder</label><select><option>Enabled</option><option>Disabled</option></select>
            <label>Folder Structure</label><select><option>Order wise Folder</option></select>
          </div>
        `)}
        ${panel("API & Webhooks", `
          <div class="form-grid">
            <label>Endpoint URL</label><input value="https://gx002.graphxcpi.com/api" readonly>
            <label>Webhook URL</label><input placeholder="https://automation.example/webhook">
            <label>Context Scope</label><select><option>Global System</option><option>B2B Store</option><option>B2C Store</option><option>Franchise / Reseller</option></select>
            <label>Events</label><textarea>Orders: Created, Updated, Archived&#10;Products: Created, Updated&#10;Customer: Created, Updated</textarea>
          </div>
        `)}
      </div>
    </main>
  `;
}

function revisedPartners() {
  return genericRevised("Vendors & Partners", ["Vendor Quotes", "Vendors", "Sales Agents & Partners"], ["066-quote_product_printer_listing", "052-printer_listing", "092-sales_agent_listing"]);
}

function revisedQuotes() {
  return genericRevised("Quotes", ["Customer Quotes", "Quote Status"], ["065-quote_listing", "067-quote_status_listing"]);
}

function revisedConfig() {
  return genericRevised("Store Configuration", ["Site Settings", "Languages", "Payments", "Shipping", "Admin Panel Text References"], ["010-configuration_settings", "036-language_listing", "009-configuration_payment_listing", "011-configuration_shipping_listing", "002-admin_constants"]);
}

function revisedSeo() {
  return genericRevised("SEO", ["Global SEO", "Product SEO", "Category SEO", "Content SEO", "Redirects"], ["091-seo_all", "056-product_listing", "054-product_category_listing", "007-cms_listing", "112-url_redirection_listing"], "Each content page/category and product/category owns SEO in its own context, while global SEO remains available for broad system management.");
}

function genericRevised(title, tabLabels, slugs, note = "") {
  const pages = slugs.map(s => page(s)).filter(Boolean);
  return `
    <main class="page">
      ${pageHeader(title, [{label:"Add", kind:"green"}, {label:"Save", kind:"gray"}])}
      ${tabs(tabLabels, tabLabels[0])}
      ${note ? `<div class="info">${esc(note)}</div>` : ""}
      <div class="workflow-grid">
        ${pages.map(p => {
          const table = (p.tables || [])[0] || { headers: [], sampleRows: [] };
          return `<div class="flow-card"><h3>${esc(p.label)}</h3><p>${esc(p.title || "")}</p><p><a class="html-link" href="${routeLink(p.slug)}">${esc(pathName(p.href))}</a></p><p>${table.headers.slice(0, 5).map(h => `<span class="pill">${esc(h)}</span>`).join("")}</p></div>`;
        }).join("")}
      </div>
      ${pages[0] ? panel(`${pages[0].label} Reference`, dataTable((pages[0].tables?.[0]?.headers || []), (pages[0].tables?.[0]?.sampleRows || []), {limit: 7})) : ""}
    </main>
  `;
}

function render() {
  const content = state.mode === "baseline" ? baselinePage() : revisedPage();
  document.getElementById("app").innerHTML = appShell(content);
}

window.__opsSimulator = {
  set(nextState) {
    Object.assign(state, nextState || {});
    render();
  },
  state
};

document.addEventListener("click", event => {
  const mode = event.target.closest("[data-mode]")?.dataset.mode;
  if (mode) {
    state.mode = mode;
    render();
    return;
  }
  const pageSlug = event.target.closest("[data-page]")?.dataset.page;
  if (pageSlug) {
    state.mode = "baseline";
    state.currentPage = pageSlug;
    render();
    return;
  }
  const view = event.target.closest("[data-view]")?.dataset.view;
  if (view) {
    state.mode = "revised";
    state.currentView = view;
    render();
    return;
  }
  const storeTab = event.target.closest("[data-store-tab]")?.dataset.storeTab;
  if (storeTab) {
    state.activeStoreTab = storeTab;
    render();
    return;
  }
  const apiTab = event.target.closest("[data-api-tab]")?.dataset.apiTab;
  if (apiTab) {
    state.activeApiTab = apiTab;
    render();
  }
});

document.addEventListener("input", event => {
  if (event.target.matches("[data-action='search']")) {
    state.search = event.target.value;
  }
});

render();
