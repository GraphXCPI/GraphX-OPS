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

const liveReferences = {
  "115-welcome": [
    { label: "GX-002 Dashboard", src: "./live-screenshots/dashboard-gx002.png" }
  ],
  "012-corporate_listing": [
    { label: "Stores list", src: "./live-screenshots/stores-list.png" },
    { label: "Duplicate Store Data modal", src: "./live-screenshots/duplicate-store-data.png" },
    { label: "Markup Master from Stores", src: "./live-screenshots/markup-master.png" },
    { label: "Store edit markup assignment", src: "./live-screenshots/edit-store-markup.png" }
  ],
  "007-cms_listing": [
    { label: "Fixed CMS content", src: "./live-screenshots/cms-fixed-content.png" },
    { label: "Hidden CMS help editor", src: "./live-screenshots/cms-hidden-help.png" }
  ],
  "041-media_gallery_listing": [
    { label: "Current image manager", src: "./live-screenshots/image-manager.png" }
  ],
  "025-export_orders": [
    { label: "Export/API Orders", src: "./live-screenshots/export-api-orders.png" },
    { label: "Export/API Settings", src: "./live-screenshots/export-api-settings.png" },
    { label: "Hot Folder Settings", src: "./live-screenshots/hot-folder-settings.png" },
    { label: "Advanced API", src: "./live-screenshots/advanced-api.png" },
    { label: "Webhook Settings", src: "./live-screenshots/webhook-settings.png" }
  ],
  "010-configuration_settings": [
    { label: "Store configuration cards", src: "./live-screenshots/store-config-cards.png" }
  ],
  "056-product_listing": [
    { label: "Print Products list", src: "./live-screenshots/print-products-list.png" },
    { label: "Product settings", src: "./live-screenshots/product-settings.png" }
  ],
  "049-predefined_product_listing": [
    { label: "Ready To Buy Products list", src: "./live-screenshots/ready-to-buy-products-list.png" }
  ],
  "054-product_category_listing": [
    { label: "Product category SEO", src: "./live-screenshots/product-category-seo.png" }
  ],
  "093-seo_all": [
    { label: "Dynamic CMS page SEO", src: "./live-screenshots/cms-dynamic-page-seo.png" }
  ],
  "046-order_listing": [
    { label: "Orders menu structure", src: "./live-screenshots/orders-menu.png" }
  ]
};

const currentLabelOverrides = {
  "115-welcome": "Dashboard",
  "093-seo_all": "Page title, Keyword setting"
};

const state = {
  mode: "baseline",
  currentPage: "115-welcome",
  currentView: "dashboard",
  search: "",
  selectedStore: "All Store",
  activeStoreTab: "Overview",
  activeApiTab: "Order Exports",
  activeCatalogFilter: "All",
  activeOpsMenu: "Dashboard",
  activeOpsChild: "",
  opsOpen: {}
};

const currentOpsPageMap = {
  "Dashboard": "115-welcome",
  "List Orders": "046-order_listing",
  "Payment Request": "047-order_payment_request",
  "Add New Order": "016-create_order_user",
  "Export/API Orders": "025-export_orders",
  "Order Status": "053-process_status_listing",
  "Coupons / Discount": "015-coupon_listing",
  "Store Credit": "090-reward_point_listing",
  "Unpaid Orders": "048-order_pending_listing",
  "Archive Orders": "045-order_archive_listing",
  "Quotes": "065-quote_listing",
  "Add New Quote": "065-quote_listing",
  "Vendor Quotes": "066-quote_product_printer_listing",
  "Vendors": "052-printer_listing",
  "Sales Agents & Partners": "092-sales_agent_listing",
  "Customers": "114-user_listing",
  "Customer Groups": "114-user_listing",
  "Import Customers": "114-user_listing",
  "Stores": "012-corporate_listing",
  "Store Fields": "013-corporate_store_profile_listing",
  "Print Products": "056-product_listing",
  "Ready To Buy Products": "049-predefined_product_listing",
  "Product Options": "057-product_master_option_listing",
  "Product Categories": "054-product_category_listing",
  "Product Weight/Days/SKU": "062-product_weight",
  "Products Tax/VAT Settings": "061-product_tax_setting",
  "Product Price": "058-product_price_all",
  "Product Price - Bulk": "060-product_price_bulk_update",
  "Product Option Price - Bulk": "059-product_price_bulk_option_update",
  "Product Price - Excel": "044-modify_products_price",
  "Percentage (+/-)": "005-all_products_price_bulk_update",
  "Product Templates": "040-master_template_manager",
  "PDF Blocks": "106-template_manager",
  "Art Layouts": "018-design_layout_listing",
  "Template Categories": "105-template_category_listing",
  "Contents": "007-cms_listing",
  "FAQs": "026-faq_listing",
  "Testimonials": "109-testimonial_listing",
  "Banners": "111-top_banner_listing",
  "Email Templates": "023-emailtemplate_listing",
  "SMS Templates": "098-sms_notification_listing",
  "Email Reminders": "024-emailtemplate_reminder_listing",
  "Help Media": "041-media_gallery_listing",
  "Page title, Keyword setting": "093-seo_all",
  "Sitemaps": "097-sitemap_xml",
  "Metatags Settings": "043-metatag",
  "Robots": "091-robot_creation",
  "Manage URL Redirection": "112-url_redirection_listing",
  "Image Alt Text": "094-seo_image_alt_text",
  "Site Settings": "010-configuration_settings",
  "Languages": "036-language_listing",
  "Currency": "017-currency_listing",
  "Country / States": "014-country_listing",
  "Web Optimization": "038-manage_image_optimization",
  "Manage Site Access": "006-block_ip_action",
  "Admin Panel Text References": "002-admin_constants",
  "Product Imposition": "031-imposition_sheet_size_listing",
  "Studio Settings": "100-studio_configuration_setting-c54df0",
  "Studio Events": "064-promotional_listing",
  "Mask Image": "051-preview_image_settings",
  "Reports": "084-report_sales_order_summary",
  "System Logs": "068-report_audit_log",
  "Admin Users": "004-admin_listing",
  "Roles": "003-admin_group",
  "Permissions": "003-admin_group"
};

const proposedOpsPageMap = {
  "Dashboard": "dashboard",
  "Master Orders": "orders",
  "Payment Requests": "orders",
  "Job Board": "orders",
  "Status & Filters": "orders",
  "Customer Quotes": "quotes",
  "Quote Status": "quotes",
  "Customers": "customers",
  "Newsletter": "customers",
  "Design Proofs": "customers",
  "Stores": "stores",
  "Store Fields": "stores",
  "Store Workspace": "stores",
  "Products": "catalog",
  "Product Options": "catalog",
  "Categories": "catalog",
  "Category Groups": "catalog",
  "Page Categories": "catalog",
  "Pricing": "catalog",
  "Product Templates": "templates",
  "PDF Blocks": "templates",
  "Art Layouts": "templates",
  "Template Categories": "templates",
  "CMS Pages": "content",
  "Help Media": "content",
  "FAQs": "content",
  "Banners": "content",
  "Email/SMS": "content",
  "Global SEO": "seo",
  "Product SEO": "seo",
  "Category SEO": "seo",
  "Content SEO": "seo",
  "Redirects": "seo",
  "Vendor Quotes": "partners",
  "Vendors": "partners",
  "Sales Agents & Partners": "partners",
  "Order Exports": "api",
  "API & Webhooks": "api",
  "Site Settings": "config",
  "Languages": "config",
  "Payments": "config",
  "Shipping": "config",
  "Admin Panel Text References": "config",
  "Sheet Sizes": "imposition",
  "Schemas": "imposition",
  "Impose Job": "imposition",
  "Product Schema Settings": "imposition",
  "Studio Settings": "studio",
  "Language Text": "studio",
  "Images": "studio",
  "Fonts": "studio",
  "Sales Reports": "reports",
  "Production Reports": "reports",
  "Inventory Reports": "reports",
  "System Logs": "reports",
  "Users": "admin",
  "Roles": "admin"
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

function pageLabel(p) {
  return currentLabelOverrides[p?.slug] || p?.label || p?.title || "Dashboard";
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
  return `./html-sanitized/${slug}.html`;
}

function appShell(content) {
  if (state.mode === "baseline" || state.mode === "revised") return currentOpsShell();
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

const opsOrders = [
  { id: "3052", status: "New Order", items: "2 Items", amount: "$519.33", age: "6 hr 11 min ago", customer: "Alex Loudenslager", email: "info@thelabna.com", products: ["Arlon V9700 - Vehicle Wrap Film (1 Qty)", "Window Perf (1 Qty)"] },
  { id: "3051", status: "New Order", items: "4 Items", amount: "$686.00", age: "23 hr 27 min ago", customer: "Drew Neverett", email: "drew.neverett@positionsports.com", products: ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "+2"] },
  { id: "3050", status: "New Order", items: "4 Items", amount: "$686.00", age: "23 hr 29 min ago", customer: "Drew Neverett", email: "drew.neverett@positionsports.com", products: ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "+2"] },
  { id: "3049", status: "New Order", items: "4 Items", amount: "$692.35", age: "23 hr 31 min ago", customer: "Drew Neverett", email: "drew.neverett@positionsports.com", products: ["PolyBoard (1 Qty)", "Large Retractable Pull-Up Banner (1 Qty)", "More"] }
];

const opsQuotes = [
  { id: "2285", status: "Active Quote", title: "Pair of Vehicle ...", date: "07-02-2026", customer: "Misty Galica", email: "Misty@Azsmithpainting.com", products: ["Magnets"] },
  { id: "2284", status: "Active Quote", title: "Decals/ Floor- ...", date: "07-02-2026", customer: "Gerald Sherrill", email: "gerald@commandlink.com", products: ["Wraps - Walls", "Decals - Floor,", "+1"] },
  { id: "2283", status: "Draft", title: "Decals - Cut Vinyl", date: "07-02-2026", customer: "Derek Petrucci", email: "derek.petrucci@hotmail.com", products: ["Decals - Cut Vinyl"] },
  { id: "2282", status: "Active Quote", title: "1/2 MDO Direct...", date: "07-01-2026", customer: "Jake Kungl", email: "jake@kungljunglesigns.com", products: ["1/2 MDO Direct Print 8' x 4'", "+1"] },
  { id: "2281", status: "Active Quote", title: "RCS VARIOUS SI...", date: "07-01-2026", customer: "Clarissa Gouws", email: "", products: ["Decals - Cut Vinyl"] }
];

const orderBoard = [
  { label: "Watch list", className: "watch", chips: ["2664", "2570", "2215"] },
  { label: "New Order", className: "new", chips: ["3052", "3051", "3050", "3049", "3048", "3044", "3043", "3042", "3040", "3039", "3001", "2979"], overdue: ["2979"] },
  { label: "Order Review", className: "review", chips: ["3030", "2978"], overdue: ["2978"] },
  { label: "In Production", className: "production", chips: ["3047", "3046", "3045", "3041", "3035", "3034", "3029", "3022", "3021", "2998", "2988"], overdue: ["3022", "2998"] },
  { label: "Ready for Fulfillment", className: "ready", chips: ["3023", "3017"], overdue: ["3023", "3017"] }
];

const productBoardRows = [
  { label: "Watch list", className: "watch", chips: ["2664", "2570", "2215"] },
  { label: "", className: "muted", chips: ["3052-9587", "3052-9586", "3051-9585", "3051-9584", "3051-9583", "3051-9582", "3050-9581", "3050-9580", "3050-9579", "3050-9578", "3049-9576", "3049-9575", "3049-9574", "3049-9577", "3048-9563", "3048-9572", "3048-9558", "3048-9567", "3048-9562", "3048-9571", "3048-9557"] },
  { label: "Awaiting Artwork", className: "muted", chips: ["3048-9566", "3048-9561", "3048-9570", "3048-9556", "3048-9565", "3048-9560", "3048-9569", "3048-9555", "3048-9564", "3048-9559", "3048-9568", "3044-9540", "3044-9544", "3044-9539", "3044-9543", "3044-9538", "3044-9542", "3044-9537", "3044-9541", "3044-9536", "3044-9545"] },
  { label: "", className: "muted", chips: ["3043-9534", "3042-9531", "3042-9530", "3042-9529", "3042-9528", "3042-9532", "3039-9515", "3039-9510", "3039-9514", "3039-9509", "3039-9513", "3039-9508", "3039-9511", "3039-9512", "3039-9516", "3039-9511", "3035-9503", "3035-9504", "3001-9406", "3001-9410", "3001-9405"] }
];

function currentOpsShell() {
  return `
    <div class="ops-app">
      ${currentOpsTopbar()}
      <div class="ops-layout">
        ${currentOpsSidebar()}
        <section class="ops-content">
          ${currentOpsAdminBar()}
          ${currentOpsMainContent()}
        </section>
      </div>
      <div class="review-switch" aria-label="review mode">
        <button data-mode="baseline" class="active">Current OPS</button>
        <button data-mode="revised">Proposed</button>
      </div>
    </div>
  `;
}

function currentOpsTopbar() {
  return `
    <header class="ops-topbar">
      <div class="ops-brand"><span class="fa-stack fa-md pr-2 d-inline-block ops-home-icon" title="Admin"><i class="far fa-home fa-stack-2x"></i><i class="fas fa-user-alt fa-stack-1x fa-lg"></i></span><span>Visual Graphx, LLC.</span></div>
      <div class="ops-search"><input value="${esc(state.search)}" data-action="search" placeholder="Search here....."><button><i class="fa-solid fa-magnifying-glass"></i></button><button><i class="fa-regular fa-bookmark"></i></button></div>
      <div class="ops-utilities">
        <div class="ops-cache">Cache <span>YES</span><b><i class="fa-solid fa-bars"></i></b><em><i class="fa-regular fa-trash-can"></i></em></div>
        <button class="ops-utility-button"><i class="fa-solid fa-chevron-down"></i></button>
        <button class="ops-monitor"><i class="fa-solid fa-desktop"></i></button>
        <button class="ops-chat"><i class="fa-regular fa-comments"></i></button>
        <div class="ops-user"><i class="fa-solid fa-user"></i><strong>Welcome,<br>cderamos</strong> <i class="fa-solid fa-caret-down"></i></div>
      </div>
    </header>
  `;
}

function currentOpsSidebar() {
  const currentGroups = [
    { label: "Dashboard", icon: "fa-solid fa-gauge-high" },
    { label: "Orders", icon: "fa-solid fa-cart-shopping", children: [
      { label: "List Orders", children: ["List Orders", "Payment Request"] },
      "Add New Order", "Export/API Orders", "Order Status", "Coupons / Discount", "Store Credit", "Unpaid Orders", "Archive Orders"
    ] },
    { label: "Quote Management", icon: "fa-regular fa-file-lines", children: ["Quotes", "Add New Quote", "Vendor Quotes", "Vendors", "Sales Agents & Partners"] },
    { label: "Customer", icon: "fa-regular fa-user", children: ["Customers", "Customer Groups", "Import Customers"] },
    { label: "Store Management", icon: "fa-solid fa-store", children: ["Stores", "Store Fields"] },
    { label: "Products", icon: "fa-solid fa-tags", children: [
      "Print Products", "Ready To Buy Products", "Product Options", "Product Categories", "Product Weight/Days/SKU", "Products Tax/VAT Settings",
      { label: "Product Price", children: ["Product Price", "Product Price - Bulk", "Product Option Price - Bulk", "Product Price - Excel", "Percentage (+/-)"] }
    ] },
    { label: "Customer", icon: "fa-regular fa-user", duplicate: true, children: ["Customers", "Customer Groups", "Import Customers"] },
    { label: "Store Management", icon: "fa-solid fa-store", duplicate: true, children: ["Stores", "Store Fields"] },
    { label: "Products", icon: "fa-solid fa-tags", duplicate: true, children: [
      "Print Products", "Ready To Buy Products", "Product Options", "Product Categories", "Product Weight/Days/SKU", "Products Tax/VAT Settings",
      { label: "Product Price", children: ["Product Price", "Product Price - Bulk", "Product Option Price - Bulk", "Product Price - Excel", "Percentage (+/-)"] }
    ] },
    { label: "Templates", icon: "fa-solid fa-table-columns", children: ["Product Templates", "PDF Blocks", "Art Layouts", "Template Categories"] },
    { label: "Content Management", icon: "fa-regular fa-file-lines", children: [
      "Contents", "FAQs", "Testimonials", "Banners", { label: "Email/SMS", children: ["Email Templates", "SMS Templates", "Email Reminders"] }, "Help Media"
    ] },
    { label: "Store Personalization", icon: "fa-solid fa-gear", children: [
      "Product Page Layout", "Language Text References", "Links - Header / Footer", { label: "Sidebar Management", children: ["Sidebar Management", "Sidebar Widget"] }, "Website Themes"
    ] },
    { label: "SEO", icon: "fa-solid fa-globe", children: ["Page title, Keyword setting", "Sitemaps", "Metatags Settings", "Robots", "Manage URL Redirection", "Image Alt Text"] },
    { label: "Business Partners", icon: "fa-regular fa-handshake", children: ["Vendors", "Vendor Quotes", "Sales Agents & Partners"] },
    { label: "Store Configuration", icon: "fa-solid fa-gears", children: ["Site Settings", "Languages", "Currency", "Country / States", "Web Optimization", "Manage Site Access", "Admin Panel Text References"] },
    { label: "Imposition Beta", icon: "fa-solid fa-table-cells-large", children: ["Product Imposition"] },
    { label: "Designer Studio", icon: "fa-regular fa-pen-to-square", children: ["Studio Settings", "Studio Events", "Mask Image"] },
    { label: "Reports", icon: "fa-solid fa-chart-bar", children: ["Reports", "System Logs"] },
    { label: "Admin", icon: "fa-regular fa-user", children: ["Admin Users", "Roles", "Permissions"] }
  ];
  const proposedGroups = revisedMenu.map(group => ({
    label: group.label,
    icon: opsIconFor(group.label),
    children: group.children
  }));
  const groups = state.mode === "revised" ? proposedGroups : currentGroups;
  return `
    <aside class="ops-sidebar">
      <div class="ops-quick-buttons">
        <button class="cart"><i class="fa-solid fa-cart-shopping"></i></button><button class="person"><i class="fa-regular fa-user"></i></button><button class="tag"><i class="fa-solid fa-tags"></i></button><button class="file"><i class="fa-regular fa-file-pdf"></i></button><button class="gear"><i class="fa-solid fa-gears"></i></button>
      </div>
      <nav>
        ${groups.map((group, index) => renderOpsMenuGroup(group, index)).join("")}
      </nav>
      <button class="ops-collapse"><i class="fa-solid fa-angle-left"></i></button>
    </aside>
  `;
}

function opsMenuKey(group, index) {
  return `${group.label}-${index}`;
}

function renderOpsMenuGroup(group, index) {
  const menuKey = opsMenuKey(group, index);
  const isDashboard = group.label === "Dashboard";
  const isOpen = !isDashboard && !!state.opsOpen[menuKey];
  const active = state.activeOpsMenu === menuKey || (isDashboard && state.activeOpsMenu === "Dashboard");
  const pageSlug = state.mode === "baseline" ? currentOpsPageMap[group.label] : proposedOpsPageMap[group.label];
  return `
    <div class="ops-nav-group ${isOpen ? "open" : ""}">
      <button class="ops-nav-item ${active ? "active" : ""}" data-ops-menu="${esc(menuKey)}" ${pageSlug ? `data-ops-page="${esc(pageSlug)}"` : ""}>
        <span><i class="${group.icon}"></i>${esc(group.label)}</span>
        ${group.children ? `<b><i class="fa-solid fa-angle-${isOpen ? "up" : "down"}"></i></b>` : ""}
      </button>
      ${group.children && isOpen ? `<div class="ops-subnav">${group.children.map(child => renderOpsChild(child, menuKey, 1)).join("")}</div>` : ""}
    </div>
  `;
}

function renderOpsChild(child, parentKey, depth) {
  const item = typeof child === "string" ? { label: child } : child;
  const childKey = `${parentKey}:${item.label}`;
  const hasChildren = !!item.children?.length;
  const isOpen = !!state.opsOpen[childKey];
  const active = state.activeOpsChild === childKey;
  const target = state.mode === "baseline" ? currentOpsPageMap[item.label] : proposedOpsPageMap[item.label];
  return `
    <div class="ops-subnav-group ${isOpen ? "open" : ""}">
      <button class="ops-subnav-item depth-${depth} ${active ? "active" : ""}" data-ops-child="${esc(childKey)}" ${hasChildren ? `data-ops-menu="${esc(childKey)}"` : ""} ${target ? `data-ops-page="${esc(target)}"` : ""}>
        <span>${esc(item.label)}</span>${hasChildren ? `<b><i class="fa-solid fa-angle-${isOpen ? "up" : "down"}"></i></b>` : ""}
      </button>
      ${hasChildren && isOpen ? `<div class="ops-subnav nested">${item.children.map(grandchild => renderOpsChild(grandchild, childKey, depth + 1)).join("")}</div>` : ""}
    </div>
  `;
}

function currentOpsAdminBar() {
  const title = state.mode === "revised"
    ? (revisedMenu.find(menu => menu.view === state.currentView)?.label || "Dashboard")
    : pageLabel(page(state.currentPage) || page("115-welcome"));
  return `
    <div class="ops-breadcrumb">
      <div><strong><i class="fa-solid fa-house"></i></strong><span>Home</span><b>›</b><span>${esc(title)}</span></div>
      <div class="ops-admin-tools">
        <button class="ops-workflow"><i class="fa-solid fa-rotate"></i> Workflow</button>
        <label><span></span>Filter by Store</label>
        <label><span class="checked"></span>Login As</label>
        <select><option>cderamos</option></select>
        <button><i class="fa-solid fa-expand"></i></button>
      </div>
    </div>
  `;
}

function currentOpsMainContent() {
  if (state.mode === "revised") return revisedPage();
  if (state.currentPage === "115-welcome") return currentOpsDashboard();
  return currentOpsCapturedPage();
}

function currentOpsCapturedPage() {
  const current = page(state.currentPage) || page("115-welcome");
  return `
    <main class="ops-captured-page">
      <iframe class="ops-captured-frame" title="${esc(pageLabel(current))}" src="${routeLink(current.slug)}" sandbox=""></iframe>
    </main>
  `;
}

function opsIconFor(label) {
  const map = {
    "Dashboard": "fa-solid fa-gauge-high",
    "Orders": "fa-solid fa-cart-shopping",
    "Quotes": "fa-regular fa-file-lines",
    "Customer Accounts": "fa-regular fa-user",
    "Store Management": "fa-solid fa-store",
    "Product Catalog": "fa-solid fa-tags",
    "Templates": "fa-solid fa-table-columns",
    "Content & Help Media": "fa-regular fa-file-lines",
    "SEO": "fa-solid fa-globe",
    "Vendors & Partners": "fa-regular fa-handshake",
    "Export, API & Webhooks": "fa-solid fa-right-left",
    "Store Configuration": "fa-solid fa-gears",
    "Product Imposition": "fa-solid fa-table-cells-large",
    "Designer Studio": "fa-regular fa-pen-to-square",
    "Reports & System Logs": "fa-solid fa-chart-bar",
    "Admin Users": "fa-regular fa-user"
  };
  return map[label] || "fa-regular fa-square";
}

function currentOpsDashboard() {
  return `
    <main class="ops-dashboard">
      ${quickCards()}
      <div class="ops-dashboard-grid">
        ${opsPanel("Recent Orders", orderSearchTools(), recentOrdersTable(), "orders")}
        ${opsPanel("Job Board - Summary [Order Wise]", boardTools(), jobBoard(orderBoard), "job-board")}
        ${opsPanel("Recent", recentTabs(), recentMiniList(), "recent")}
        ${opsPanel("Sales Statistics", refreshTool(), salesStats(), "stats")}
        ${opsPanel("Sales Orders <small>(Last 12 months)</small>", salesHeaderToggle(), salesChart(), "chart")}
        ${opsPanel("Recent Quotes", quoteSearchTools(), recentQuotesTable(), "quotes")}
        ${opsPanel("Job Board - Summary [Order Product Wise]", boardTools(), productJobBoard(), "product-board")}
      </div>
      <footer class="ops-footer"><span>07-03-2026 14:15</span><b>|</b><a>OnPrintShop Updates</a><b>|</b><a>Add on Plugins/Services</a><span>Copyright ©2026. All rights reserved.</span></footer>
    </main>
  `;
}

function quickCards() {
  const cards = [
    ["fa-solid fa-cart-shopping", "Orders", "blue"],
    ["fa-regular fa-file-lines", "Quotes", "green"],
    ["fa-solid fa-user", "Customers", "brown"],
    ["fa-solid fa-tags", "Products", "orange"],
    ["fa-solid fa-table-columns", "Templates", "cyan"],
    ["fa-solid fa-gear", "Site Settings", "gray"],
    ["fa-solid fa-gears", "Studio Settings", "pink"],
    ["fa-solid fa-store", "Stores", "purple"]
  ];
  return `<div class="ops-quick-cards">${cards.map(([icon, label, color]) => `<button class="${color}"><i class="${icon}"></i><span>${label}</span></button>`).join("")}</div>`;
}

function opsPanel(title, tools, body, className = "") {
  const icons = {
    orders: "fa-solid fa-cart-shopping",
    "job-board": "fa-regular fa-note-sticky",
    recent: "fa-regular fa-note-sticky",
    stats: "fa-solid fa-dollar-sign",
    chart: "fa-solid fa-chart-line",
    quotes: "fa-regular fa-file-lines",
    "product-board": "fa-regular fa-note-sticky"
  };
  return `
    <section class="ops-panel ${className}">
      <header><h2><i class="${icons[className] || "fa-regular fa-square"}"></i>${title}</h2><div>${tools || ""}</div></header>
      <div class="ops-panel-body">${body}</div>
    </section>
  `;
}

function orderSearchTools() {
  return `<div class="ops-panel-tools"><input placeholder="Order No."><button><i class="fa-solid fa-magnifying-glass"></i></button><a>View All</a><button><i class="fa-solid fa-arrows-rotate"></i></button></div>`;
}

function quoteSearchTools() {
  return `<div class="ops-panel-tools"><input placeholder="Recent Quotes"><button><i class="fa-solid fa-magnifying-glass"></i></button><a>View All</a><button><i class="fa-solid fa-arrows-rotate"></i></button></div>`;
}

function boardTools() {
  return `<div class="ops-panel-tools"><a>View All</a><button><i class="fa-solid fa-arrows-rotate"></i></button></div>`;
}

function refreshTool() {
  return `<div class="ops-panel-tools"><button><i class="fa-solid fa-arrows-rotate"></i></button></div>`;
}

function salesHeaderToggle() {
  return `<div class="ops-sales-toggle"><span>This Month :</span><b>NO</b><button><i class="fa-solid fa-chevron-up"></i></button></div>`;
}

function recentTabs() {
  return `<div class="ops-recent-tabs"><button class="active">Orders</button><button>Customers</button><button>Quotes</button></div><button class="ops-refresh"><i class="fa-solid fa-arrows-rotate"></i></button>`;
}

function recentOrdersTable() {
  return `
    <div class="ops-order-table">
      ${opsOrders.map(order => `
        <div class="ops-order-row">
          <div class="order-id"><a>${order.id}</a><span>${order.status}</span></div>
          <div><b class="item-pill">${order.items}</b><strong>${order.amount}</strong><small>${order.age}</small></div>
          <div><a>${order.customer}</a><small>${order.email}</small></div>
          <div class="product-list">${order.products.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function jobBoard(rows) {
  return `
    <div class="ops-board">
      ${rows.map(row => `
        <div class="ops-board-row">
          <span class="board-label ${row.className}">${row.label}</span>
          <div>${row.chips.map(chip => `<button class="${row.overdue?.includes(chip) ? "overdue" : ""}">${chip}</button>`).join("")}</div>
        </div>
      `).join("")}
      <div class="ops-legend"><span class="red"></span>Overdue <span class="orange"></span>Delivery Today <span class="yellow"></span>Delivery Tomorrow</div>
    </div>
  `;
}

function productJobBoard() {
  return `
    <div class="ops-board product">
      ${productBoardRows.map(row => `
        <div class="ops-board-row">
          <span class="board-label ${row.className}">${row.label}</span>
          <div>${row.chips.map(chip => `<button>${chip}</button>`).join("")}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function recentMiniList() {
  return `<div class="ops-mini-list">${opsOrders.map(o => `<div><a>${o.id}</a><span>${o.amount}<small>${o.age}</small></span><b>${o.customer}<small>${o.email}</small></b></div>`).join("")}</div>`;
}

function salesStats() {
  const rows = [
    ["Today", "Yesterday", "$519.33<br><small>(1 Orders)</small>", "$75,244.30<br><small>(7 Orders)</small>"],
    ["This Week", "Last Week", "$83,144.93<br><small>(21 Orders)</small>", "$13,275.50<br><small>(14 Orders)</small>"],
    ["This Month", "Last Month", "$79,439.62<br><small>(13 Orders)</small>", "$87,449.45<br><small>(64 Orders)</small>"],
    ["This Year", "Last Year", "", ""]
  ];
  return `<div class="ops-stat-table">${rows.map(r => `<div class="stat-head">${r[0]}</div><div class="stat-head">${r[1]}</div><div>${r[2]}</div><div>${r[3]}</div>`).join("")}</div>`;
}

function salesChart() {
  const months = ["07 2025", "08 2025", "09 2025", "10 2025", "11 2025", "12 2025", "01 2026", "02 2026", "03 2026", "04 2026", "05 2026", "06 2026", "07 2026"];
  const amountLabels = ["200623.15", "66131.79", "98858.76", "105663.58", "149163.11", "133490.53", "53183.11", "158142.54", "222032.74", "166490.26", "128324.72", "87449.45", "78920.29"];
  const orderLabels = ["96", "82", "104", "104", "87", "59", "80", "111", "117", "107", "104", "64", "12"];
  return `
    <div id="sales_graph" class="ord_grph jqplot-target ops-jqplot-chart">
      <canvas class="jqplot-base-canvas"></canvas>
      <div class="jqplot-title"></div>
      <div class="jqplot-axis jqplot-xaxis">${months.map((month, index) => `<span class="jqplot-xaxis-tick" style="left:${9 + index * 7.05}%">${month}</span>`).join("")}</div>
      <div class="jqplot-axis jqplot-yaxis">
        ${["0.00", "", "50000.00", "", "100000.00", "", "150000.00", "", "200000.00", "", "250000.00"].map((tick, index) => `<span class="jqplot-yaxis-tick" style="bottom:${index * 9.3}%">${tick}</span>`).join("")}
      </div>
      <div class="jqplot-axis jqplot-y2axis">${["0", "30", "60", "90", "120", "150"].map((tick, index) => `<span class="jqplot-y2axis-tick" style="bottom:${index * 18.6}%">${tick}</span>`).join("")}</div>
      <canvas class="jqplot-grid-canvas"></canvas>
      <canvas class="jqplot-series-shadowCanvas"></canvas>
      <canvas class="jqplot-series-shadowCanvas"></canvas>
      <canvas class="jqplot-series-canvas ops-amount-series"></canvas>
      <canvas class="jqplot-series-canvas ops-orders-series"></canvas>
      ${amountLabels.map((label, index) => `<div class="jqplot-point-label jqplot-series-0 jqplot-point-${index}">${label}</div>`).join("")}
      ${orderLabels.map((label, index) => `<div class="jqplot-point-label jqplot-series-1 jqplot-point-${index}">${label}</div>`).join("")}
      <table class="jqplot-table-legend">
        <tr class="jqplot-table-legend"><td class="jqplot-table-legend jqplot-table-legend-swatch"><div class="jqplot-table-legend-swatch-outline"><div class="jqplot-table-legend-swatch total"></div></div></td><td class="jqplot-table-legend jqplot-table-legend-label">Total Amount</td></tr>
        <tr class="jqplot-table-legend"><td class="jqplot-table-legend jqplot-table-legend-swatch"><div class="jqplot-table-legend-swatch-outline"><div class="jqplot-table-legend-swatch orders"></div></div></td><td class="jqplot-table-legend jqplot-table-legend-label">Orders</td></tr>
      </table>
      <canvas class="jqplot-highlight-canvas"></canvas>
      <div class="jqplot-highlighter-tooltip"></div>
      <canvas class="jqplot-lineRenderer-highlight-canvas"></canvas>
      <canvas class="jqplot-event-canvas"></canvas>
    </div>
  `;
}

function drawOpsJqPlotChart() {
  const chart = document.getElementById("sales_graph");
  if (!chart) return;
  const amount = [200623.15, 66131.79, 98858.76, 105663.58, 149163.11, 133490.53, 53183.11, 158142.54, 222032.74, 166490.26, 128324.72, 87449.45, 78920.29];
  const orders = [96, 82, 104, 104, 87, 59, 80, 111, 117, 107, 104, 64, 12];
  const width = Math.max(520, chart.clientWidth);
  const height = Math.max(238, chart.clientHeight);
  const plot = { left: 58, top: 10, width: width - 95, height: height - 42 };
  const maxAmount = 250000;
  const maxOrders = 150;
  const x = index => plot.left + (plot.width * index / (amount.length - 1));
  const amountY = value => plot.top + plot.height - (value / maxAmount * plot.height);
  const ordersY = value => plot.top + plot.height - (value / maxOrders * plot.height);
  const setup = canvas => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    return canvas.getContext("2d");
  };
  const grid = setup(chart.querySelector(".jqplot-grid-canvas"));
  grid.clearRect(0, 0, width, height);
  grid.strokeStyle = "#b8b8b8";
  grid.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const y = plot.top + (plot.height * i / 10);
    grid.beginPath(); grid.moveTo(plot.left, y); grid.lineTo(plot.left + plot.width, y); grid.stroke();
  }
  for (let i = 0; i < amount.length; i++) {
    const px = x(i);
    grid.beginPath(); grid.moveTo(px, plot.top); grid.lineTo(px, plot.top + plot.height); grid.stroke();
  }
  drawSeries(setup(chart.querySelector(".ops-amount-series")), amount, x, amountY, "#d53f40", true);
  drawSeries(setup(chart.querySelector(".ops-orders-series")), orders, x, ordersY, "#ffc657", false);
  chart.querySelectorAll(".jqplot-series-0").forEach((label, index) => {
    label.style.left = `${x(index) - 4}px`;
    label.style.top = `${amountY(amount[index]) - 23}px`;
  });
  chart.querySelectorAll(".jqplot-series-1").forEach((label, index) => {
    label.style.left = `${x(index) + 8}px`;
    label.style.top = `${ordersY(orders[index]) - 19}px`;
  });
}

function drawSeries(ctx, data, x, y, color, fillMarkers) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  data.forEach((value, index) => {
    const px = x(index);
    const py = y(value);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();
  data.forEach((value, index) => {
    const px = x(index);
    const py = y(value);
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    if (fillMarkers) ctx.fill();
    else {
      ctx.fillStyle = "#ffc657";
      ctx.fill();
    }
  });
}

function recentQuotesTable() {
  return `
    <div class="ops-order-table quote-table">
      ${opsQuotes.map(quote => `
        <div class="ops-order-row">
          <div class="order-id"><a>${quote.id}</a><span class="${quote.status === "Draft" ? "draft" : ""}">${quote.status}</span></div>
          <div><strong>${quote.title}</strong><small>${quote.date}</small></div>
          <div><a>${quote.customer}</a><small>${quote.email}</small></div>
          <div class="product-list">${quote.products.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderLiveReferences(refs, current) {
  return `
    <div class="live-reference-pane">
      <div class="live-reference-note">
        Showing live GX-002 screenshots supplied during review. Captured sanitized HTML is still available from the button above for DOM/field reference.
      </div>
      ${refs.map(ref => `
        <figure class="live-reference">
          <figcaption>${esc(ref.label)}</figcaption>
          <img src="${esc(ref.src)}" alt="${esc(ref.label)}">
        </figure>
      `).join("")}
      <details class="captured-html-details">
        <summary>Show sanitized captured HTML for ${esc(pageLabel(current))}</summary>
        <iframe class="baseline-frame embedded" title="Captured HTML ${esc(pageLabel(current))}" src="${routeLink(current.slug)}" sandbox=""></iframe>
      </details>
    </div>
  `;
}

function renderBaselineMenuGroup(group) {
  const active = group.pages?.includes(state.currentPage);
  return `
    <div class="baseline-nav-group">
      <button class="baseline-nav-title ${active ? "active" : ""}" data-page="${group.pages[0]}">
        <span><span class="nav-icon">${group.icon}</span>${esc(group.label)}</span><span>⌄</span>
      </button>
      <div class="baseline-nav-items">
        ${group.pages.map(slug => page(slug)).filter(Boolean).map(p => `
          <button class="baseline-nav-item ${state.currentPage === p.slug ? "active" : ""}" data-page="${p.slug}">
            ${esc(pageLabel(p))}
          </button>
        `).join("")}
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
  const content = state.mode === "baseline" ? "" : revisedPage();
  document.getElementById("app").innerHTML = appShell(content);
  drawOpsJqPlotChart();
}

window.__opsSimulator = {
  set(nextState) {
    Object.assign(state, nextState || {});
    render();
  },
  state
};

document.addEventListener("click", event => {
  const opsMenu = event.target.closest("[data-ops-menu]")?.dataset.opsMenu;
  if (opsMenu) {
    if (opsMenu.startsWith("Dashboard-")) {
      state.activeOpsMenu = "Dashboard";
      state.activeOpsChild = "";
      state.opsOpen = {};
      if (state.mode === "baseline") state.currentPage = "115-welcome";
      else state.currentView = "dashboard";
    } else if (opsMenu.includes(":")) {
      state.opsOpen[opsMenu] = !state.opsOpen[opsMenu];
    } else {
      const shouldOpen = !state.opsOpen[opsMenu];
      state.opsOpen = shouldOpen ? { [opsMenu]: true } : {};
      state.activeOpsMenu = shouldOpen ? opsMenu : "Dashboard";
      if (!shouldOpen || !state.activeOpsChild.startsWith(`${opsMenu}:`)) state.activeOpsChild = "";
    }
    render();
    return;
  }
  const opsChild = event.target.closest("[data-ops-child]")?.dataset.opsChild;
  if (opsChild) {
    state.activeOpsChild = opsChild;
    const menuKey = opsChild.split(":")[0];
    state.activeOpsMenu = menuKey;
    const target = event.target.closest("[data-ops-page]")?.dataset.opsPage;
    if (target && state.mode === "baseline") state.currentPage = target;
    if (target && state.mode === "revised") state.currentView = target;
    render();
    return;
  }
  const mode = event.target.closest("[data-mode]")?.dataset.mode;
  if (mode) {
    state.mode = mode;
    state.activeOpsMenu = "Dashboard";
    state.activeOpsChild = "";
    state.opsOpen = {};
    if (mode === "baseline") state.currentPage = "115-welcome";
    if (mode === "revised") state.currentView = "dashboard";
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
