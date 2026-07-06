// Small route corrections layered over the generated OPS extraction.
// Keep raw/staging HTML out of this file; clone only already-sanitized extracted pages.
(function applyOpsExtractedOverrides() {
  const pages = window.OPS_EXTRACTED_PAGES || {};
  const routes = window.OPS_EXTRACTED_PAGE_ROUTES || [];

  function cloneRoute(targetRoute, sourceRoute, overrides = {}) {
    const source = pages[sourceRoute];
    if (!source) return;
    pages[targetRoute] = {
      ...source,
      route: targetRoute,
      sourceRoute,
      sourceKind: overrides.sourceKind || source.sourceKind,
      title: overrides.title || source.title
    };
    upsertRoute(targetRoute, pages[targetRoute]);
  }

  function upsertRoute(route, page) {
    const routeRecord = {
      route,
      title: page.title,
      slug: page.slug,
      sourceFile: page.sourceFile,
      sourceKind: page.sourceKind,
      sourceRoute: page.sourceRoute
    };
    const existingIndex = routes.findIndex(item => item.route === route);
    if (existingIndex === -1) routes.push(routeRecord);
    else routes[existingIndex] = { ...routes[existingIndex], ...routeRecord };
  }

  const percentageSource = pages["product-price-percent"] || pages["product-price-excel"];
  if (percentageSource) {
    pages["product-price-percent"] = {
      ...percentageSource,
      route: "product-price-percent",
      title: "Percentage (+/-)",
      sourceRoute: percentageSource.route
    };
    upsertRoute("product-price-percent", pages["product-price-percent"]);
  }

  cloneRoute("product-price-excel", "product-price-modify", { title: "Product Price - Excel" });
  cloneRoute("add-quote", "add-order", { title: "Add New Order" });

  window.OPS_EXTRACTED_PAGES = pages;
  window.OPS_EXTRACTED_PAGE_ROUTES = routes;
})();
